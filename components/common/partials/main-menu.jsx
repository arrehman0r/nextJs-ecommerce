import { useRouter } from "next/router";

import ALink from "~/components/features/custom-link";

import { mainMenu } from "~/utils/data/menu";

function MainMenu() {
  const pathname = useRouter().pathname;

  return (
    <nav className="main-nav">
      <ul className="menu">
        <li id="menu-home" className={pathname === "/" ? "active" : ""}>
          <ALink href="/">Home</ALink>
        </li>

        {/* <li className={ `  ${ pathname.includes( '/shop' ) ? 'active' : '' }` }>
                    <ALink href='/shop'>Categories</ALink> */}

        {/* <div className="megamenu">
                        <div className="row">
                            <div className="col-6 col-sm-4 col-md-3 col-lg-4">
                                <h4 className="menu-title">Variations 1</h4>
                                <ul>
                                    {
                                        mainMenu.shop.variation1.map( ( item, index ) => (
                                            <li key={ `shop-${ item.title }` }>
                                                <ALink href={ '/' + item.url }>
                                                    { item.title }
                                                    { item.hot ? <span className="tip tip-hot">Hot</span> : "" }
                                                </ALink>
                                            </li>
                                        ) )
                                    }
                                </ul>
                            </div>

                            <div className="col-6 col-sm-4 col-md-3 col-lg-4">
                                <h4 className="menu-title">Variations 2</h4>
                                <ul>
                                    {
                                        mainMenu.shop.variation2.map( ( item, index ) => (
                                            <li key={ `shop-${ item.title }` }>
                                                <ALink href={ '/' + item.url }>
                                                    { item.title }
                                                    { item.new ? <span className="tip tip-new">New</span> : "" }
                                                </ALink>
                                            </li>
                                        ) )
                                    }
                                </ul>
                            </div>
                            <div className="col-6 col-sm-4 col-md-3 col-lg-4 menu-banner menu-banner1 banner banner-fixed">
                                <figure>
                                    <img src="./images/menu/banner-1.jpg" alt="Menu banner" width="221" height="330" />
                                </figure>
                                <div className="banner-content y-50">
                                    <h4 className="banner-subtitle font-weight-bold text-primary ls-m">Sale.
                            </h4>
                                    <h3 className="banner-title font-weight-bold"><span
                                        className="text-uppercase">Up to</span>70% Off</h3>
                                    <ALink href={ "/shop" } className="btn btn-link btn-underline">shop now<i className="d-icon-arrow-right"></i></ALink>
                                </div>
                            </div>
                        </div>
                    </div> */}
        {/* </li> */}

        <li
          className={`  ${
            pathname.includes("/shop/all-products") &&
            !pathname.includes("/shop/all-products")
              ? "active"
              : ""
          }`}
        >
          <ALink href="/shop/all-products">Products</ALink>

          {/* <div className="megamenu">
                        <div className="row">
                            <div className="col-6 col-sm-4 col-md-3 col-lg-4">
                                <h4 className="menu-title">Product Pages</h4>
                                <ul>
                                    {
                                        mainMenu.product.pages.map( ( item, index ) => (
                                            <li key={ `product-${ item.title }` }>
                                                <ALink href={ '/' + item.url }>
                                                    { item.title }
                                                    { item.hot ? <span className="tip tip-hot">Hot</span> : "" }
                                                </ALink>
                                            </li>
                                        ) )
                                    }
                                </ul>
                            </div>

                            <div className="col-6 col-sm-4 col-md-3 col-lg-4">
                                <h4 className="menu-title">Product Layouts</h4>
                                <ul>
                                    {
                                        mainMenu.product.layout.map( ( item, index ) => (
                                            <li key={ `product-${ item.title }` }>
                                                <ALink href={ '/' + item.url }>
                                                    { item.title }
                                                    { item.new ? <span className="tip tip-new">New</span> : "" }
                                                </ALink>
                                            </li>
                                        ) )
                                    }
                                </ul>
                            </div>

                            <div className="col-6 col-sm-4 col-md-3 col-lg-4 menu-banner menu-banner2 banner banner-fixed">
                                <figure>
                                    <img src="./images/menu/banner-2.jpg" alt="Menu banner" width="221" height="330" />
                                </figure>
                                <div className="banner-content x-50 text-center">
                                    <h3 className="banner-title text-white text-uppercase">Sunglasses</h3>
                                    <h4 className="banner-subtitle font-weight-bold text-white mb-0">$23.00 - $120.00</h4>
                                </div>
                            </div>
                        </div>
                    </div> */}
        </li>
        {/* <li className={ `submenu  ${ pathname.includes( '/pages' ) ? 'active' : '' }` }> */}
        {/* just add submenu class */}

        <li className={`  ${pathname.includes("/pages/contact-us") ? "active" : ""}`}>
          <ALink href="/pages/contact-us">Contact</ALink>

          {/* <ul>
                        {
                            mainMenu.other.map( ( item, index ) => (
                                <li key={ `other-${ item.title }` }>
                                    <ALink href={ '/' + item.url }>
                                        { item.title }
                                        { item.new ? <span className="tip tip-new">New</span> : "" }
                                    </ALink>
                                </li>
                            ) )
                        }
                    </ul> */}
        </li>

        <li
          className={`  ${
            pathname.includes("/blog") && !pathname.includes("/elements")
              ? "active"
              : ""
          }`}
        >
          <ALink href={`/blog/classic`}>Blog</ALink>

          {/* <ul>
                        {
                            mainMenu.blog.map( ( item, index ) => (
                                <li key={ "blog" + item.title } className={ item.subPages ? "submenu" : "" }>
                                    <ALink href={ '/' + item.url }>
                                        { item.title }
                                    </ALink>

                                    {
                                        item.subPages ?
                                            <ul>
                                                {
                                                    item.subPages.map( ( item, index ) => (
                                                        <li key={ `blog-${ item.title }` }>
                                                            <ALink href={ '/' + item.url }>
                                                                { item.title }
                                                            </ALink>
                                                        </li>
                                                    ) )
                                                }
                                            </ul> : ""
                                    }
                                </li>
                            ) )
                        }
                    </ul> */}
        </li>

        {/* <li className={ `${ pathname.includes( '/elements' ) ? 'active' : '' } d-xl-show submenu` }>
                    <ALink href={ `/elements` }>About Us</ALink>

                    <ul>
                        {
                            mainMenu.element.map( ( item, index ) => (
                                <li key={ `elements-${ item.title }` }>
                                    <ALink href={ '/' + item.url }>
                                        { item.title }
                                    </ALink>
                                </li>
                            ) )
                        }
                    </ul>
                </li> */}

<li className={`  ${pathname.includes("/pages/about-us") ? "active" : ""}`}>
          <ALink href="/pages/about-us">About Us</ALink>
        </li>
      </ul>
    </nav>
  );
}

export default MainMenu;
