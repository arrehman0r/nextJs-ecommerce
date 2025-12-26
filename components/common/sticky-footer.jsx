import { useEffect } from "react";

import ALink from "~/components/features/custom-link";

import FooterSearchBox from "~/components/common/partials/footer-search-box";
import { WhatsappIcon } from "~/public/images/svg";

// WhatsApp Button Styles
const whatsappButtonStyle = {
  position: "fixed",
  right: "24px",
  bottom: "24px",
  zIndex: 9999,
  width: "64px",
  height: "64px",
  borderRadius: "50%",
  backgroundColor: "#25D366",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
  cursor: "pointer",
  transition: "box-shadow 0.2s"
};

const whatsappIconStyle = {
  color: "#fff",
  fontSize: "2.2rem",
};

export default function StickyFooter() {
  let tmp = 0;

  useEffect(() => {
    window.addEventListener("scroll", stickyFooterHandler);

    return () => {
      window.removeEventListener("scroll", stickyFooterHandler);
    };
  }, []);

  const stickyFooterHandler = (e) => {
    let top = document.querySelector(".page-content")
      ? document.querySelector(".page-content").offsetTop +
        document.querySelector("header").offsetHeight +
        100
      : 600;
    let stickyFooter = document.querySelector(".sticky-footer.sticky-content");
    let height = 0;

    if (stickyFooter) {
      height = stickyFooter.offsetHeight;
    }

    if (
      window.pageYOffset >= top &&
      window.innerWidth < 768 &&
      e.currentTarget.scrollY >= tmp
    ) {
      if (stickyFooter) {
        stickyFooter.classList.add("fixed");
        stickyFooter.setAttribute("style", "margin-bottom: 0");
        if (!document.querySelector(".sticky-content-wrapper")) {
          let newNode = document.createElement("div");
          newNode.className = "sticky-content-wrapper";
          stickyFooter.parentNode.insertBefore(newNode, stickyFooter);
          document
            .querySelector(".sticky-content-wrapper")
            .insertAdjacentElement("beforeend", stickyFooter);
          document
            .querySelector(".sticky-content-wrapper")
            .setAttribute("style", "height: " + height + "px");
        }

        if (
          !document
            .querySelector(".sticky-content-wrapper")
            .getAttribute("style")
        ) {
          document
            .querySelector(".sticky-content-wrapper")
            .setAttribute("style", "height: " + height + "px");
        }
      }
    } else {
      if (stickyFooter) {
        stickyFooter.classList.remove("fixed");
        stickyFooter.setAttribute("style", `margin-bottom: -${height}px`);
      }

      if (document.querySelector(".sticky-content-wrapper")) {
        document
          .querySelector(".sticky-content-wrapper")
          .removeAttribute("style");
      }
    }

    if (
      window.innerWidth > 767 &&
      document.querySelector(".sticky-content-wrapper")
    ) {
      document.querySelector(".sticky-content-wrapper").style.height = "auto";
    }

    tmp = e.currentTarget.scrollY;
  };

  // Phone number to which you want to send the message
  const phoneNumber = "03188444029";

  // Message you want to send
  const message = "Hello! I have a question about your products.";

  // URL for the WhatsApp API
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;



  return (
    <>
      {/* Sticky WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        style={whatsappButtonStyle}
        className="whatsapp-sticky-btn"
      >
      <WhatsappIcon width={32} height={32} />

      </a>
     
      <div className="sticky-footer sticky-content fix-bottom">
      <ALink href="/" className="sticky-link active">
        <i className="d-icon-home"></i>
        <span>Home</span>
      </ALink>
      <ALink href="/" className="sticky-link">
        <i className="d-icon-volume"></i>
        <span>Categories</span>
      </ALink>
      <ALink href="/pages/wishlist" className="sticky-link">
        <i className="d-icon-heart"></i>
        <span>Wishlist</span>
      </ALink>
      <ALink
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="sticky-link"
      >
        <i className="d-icon-phone"></i>
        <span>Whatsapp</span>
      </ALink>

      <FooterSearchBox />
      </div>
    </>)
}
