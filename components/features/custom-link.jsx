import Link from "next/link";

import { parseContent } from '~/utils';

export default function ALink ( { children, className, content, style, ...props } ) {

    const preventDefault = ( e ) => {
        if ( props.href === '#' ) {
            e.preventDefault();
        }

        if ( props.onClick ) {
            props.onClick();
        }
    }

    return (
        content ?
            <Link { ...props } >
                <div className={ className } style={ style } onClick={ preventDefault } dangerouslySetInnerHTML={ parseContent( content ) }>
                    { children }
                </div>
            </Link> :
            <Link { ...props } >
                <div className={ className } style={ style } onClick={ preventDefault }>
                    { children }
                </div>
            </Link>
    )
}
