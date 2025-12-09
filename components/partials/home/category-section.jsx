import Image from "next/image";
import React from "react";

import Reveal from "react-awesome-reveal";
import { LazyLoadImage } from "react-lazy-load-image-component";

import ALink from "~/components/features/custom-link";
import { ImageShimmer } from "~/public/images/svg";
import { toBase64 } from "~/utils";

import { fadeIn } from "~/utils/data/keyframes";

function CategorySection({ categories }) {


  return (
    <Reveal keyframes={fadeIn} delay={300} duration={1200} triggerOnce>
      <section className=" mt-7">
        <div className="container">
          <h2 className="title title-center mb-5">Browse Our Categories</h2>

          <div className="row">
            {categories?.map((category) => (
              <div className="col-xs-6 col-lg-3 mb-4" key={category?.id}>
                <div className="category category-default1 category-absolute banner-radius overlay-zoom">
                  <ALink
                    href={{
                      pathname: "/shop/[categoryId]",
                      query: { categoryId: category?.id },
                    }}
                  >
                    <figure className="category-media">
                      <Image
                        src={category?.image?.src}
                        alt={category?.name}
                        width={280}
                        height={280}
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(
                          ImageShimmer(280, 280)
                        )}`}
                      />
                    </figure>

                    <div className="category-content">
                      <h4
                        className="category-name font-weight-bold ls-l"
                        dangerouslySetInnerHTML={{ __html: category?.name }}
                      ></h4>
                    </div>
                  </ALink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}

export default React.memo(CategorySection);
