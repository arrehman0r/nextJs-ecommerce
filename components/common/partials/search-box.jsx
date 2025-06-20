import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/react-hooks';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/custom-link';

import { GET_PRODUCTS } from '~/server/queries';
import withApollo from '~/server/apollo';

import { toDecimal } from '~/utils';

function SearchForm() {
    const router = useRouter();
    const [ search, setSearch ] = useState( "" );
    const [ searchProducts, { data } ] = useLazyQuery( GET_PRODUCTS );
    const [ timer, setTimer ] = useState( null );

    useEffect( () => {
        document.querySelector( "body" ).addEventListener( "click", onBodyClick );

        return ( () => {
            document.querySelector( "body" ).removeEventListener( "click", onBodyClick );
        } )
    }, [] )

    useEffect( () => {
        setSearch( "" );
    }, [ router.query.slug ] )

    useEffect( () => {
        if ( search.length > 2 ) {
            if ( timer ) clearTimeout( timer );
            let timerId = setTimeout( () => {
                searchProducts( { variables: { search: search } } );
                setTimer( null );;
            }, 500 );

            setTimer( timerId );
        }
    }, [ search ] )

    useEffect( () => {
        document.querySelector( '.header-search.show-results' ) && document.querySelector( '.header-search.show-results' ).classList.remove( 'show-results' );
    }, [ router.pathname ] )

    function removeXSSAttacks( html ) {
        const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

        // Removing the <script> tags
        while ( SCRIPT_REGEX.test( html ) ) {
            html = html.replace( SCRIPT_REGEX, "" );
        }

        // Removing all events from tags...
        html = html.replace( / on\w+="[^"]*"/g, "" );

        return {
            __html: html
        }
    }

    function matchEmphasize( name ) {
        let regExp = new RegExp( search, "i" );
        return name.replace(
            regExp,
            ( match ) => "<strong>" + match + "</strong>"
        );
    }

    function onSearchClick( e ) {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.parentNode.classList.toggle( 'show' );
    }

    function onBodyClick( e ) {
        if ( e.target.closest( '.header-search' ) ) return e.target.closest( '.header-search' ).classList.contains( 'show-results' ) || e.target.closest( '.header-search' ).classList.add( 'show-results' );

        document.querySelector( '.header-search.show' ) && document.querySelector( '.header-search.show' ).classList.remove( 'show' );
        document.querySelector( '.header-search.show-results' ) && document.querySelector( '.header-search.show-results' ).classList.remove( 'show-results' );
    }

    function onSearchChange( e ) {
        setSearch( e.target.value );
    }

    function onSubmitSearchForm( e ) {
        e.preventDefault();
        router.push( {
            pathname: '/shop',
            query: {
                search: search
            }
        } );
    }

    return (
        <div className="header-search hs-simple">
            <a href="#" className="search-toggle" role="button" onClick={ onSearchClick }><i className="icon-search-3"></i></a>
            <form action="#" method="get" onSubmit={ onSubmitSearchForm } className="input-wrapper">
                <input type="text" className="form-control" name="search" autoComplete="off" value={ search } onChange={ onSearchChange }
                    placeholder="Search..." required />

                <button className="btn btn-search" type="submit">
                    <i className="d-icon-search"></i>
                </button>

                <div className="live-search-list bg-white scrollable">
                    { search.length > 2 && data && data.products.data.map( ( product, index ) => (
                        <ALink href={ `/product/default/${ product.id }` } className="autocomplete-suggestion" key={ `search-result-${ index }` }>
                            <LazyLoadImage effect="opacity" src={    product.images[ 0 ].src } width={ 40 } height={ 40 } alt="product" />
                            <div className="search-name" dangerouslySetInnerHTML={ removeXSSAttacks( matchEmphasize( product.name ) ) }></div>
                            <span className="search-price">
                                {
                                    product.sale_price !== product.regular_price ?
                                        product.variants.length === 0 ?
                                            <>
                                                <span className="new-price mr-1">Rs.{ toDecimal( product.sale_price ) }</span>
                                                <span className="old-price">Rs.{ toDecimal( product.regular_price ) }</span>
                                            </>
                                            :
                                            < span className="new-price">Rs.{ toDecimal( product.sale_price ) } – Rs.{ toDecimal( product.regular_price ) }</span>
                                        : <span className="new-price">Rs.{ toDecimal( product.sale_price ) }</span>
                                }
                            </span>
                        </ALink>
                    ) )
                    }
                </div>
            </form>
        </div>
    );
}

export default withApollo( { ssr: typeof window === 'undefined' } )( SearchForm );