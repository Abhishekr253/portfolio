import "./Footer.css";

import {
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

import { SiFiverr } from "react-icons/si";

export default function Footer() {

  const scrollTo = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  // Calendly
  const bookACall = () => {
    window.open(
      "https://calendly.com/abhishekrofficial129/30min",
      "_blank",
      "noopener,noreferrer"
    );
  };

  // Email
  const getInTouch = () => {
    window.location.href =
      "mailto:abhishekrofficial129@gmail.com?subject=Website%20Project%20Inquiry&body=Hi%20Abhi,%0A%0AI%27m%20interested%20in%20working%20with%20you%20on%20a%20website.";
  };

  return (
    <footer>

      <div className="footerContainer" id="contact">

        <div className="footerCTA">

<a
  href="mailto:abhishekrofficial129@gmail.com?subject=Website%20Project%20Inquiry"
  className="footerTag"
>
  GET IN TOUCH
</a>

          <h2>
            Let's Build
            <br />
            Something Amazing.
          </h2>

          <p>
            Looking for a premium website with
            modern animations and performance?
            Let's work together.
          </p>

          <button
            className="footerBtn"
            onClick={bookACall}
          >
            Book a Call
          </button>

        </div>


        <div className="footerLinks">

          {/* QUICK LINKS */}

          <div>

            <h4>Quick Links</h4>

            <button onClick={() => scrollTo("hero")}>
              Home
            </button>

            <button onClick={() => scrollTo("about")}>
              About
            </button>

            <button onClick={() => scrollTo("services")}>
              Services
            </button>

            <button onClick={() => scrollTo("projects")}>
              Projects
            </button>

          </div>


          {/* CONNECT */}

          <div>

            <h4>Connect</h4>

            {/* <a
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram />
              Instagram
            </a> */}

            <a
              href="https://www.linkedin.com/in/abhishek-r-633385282/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
              LinkedIn
            </a>

            <a
              href="https://www.fiverr.com/abhishekr601?public_mode=true"
              target="_blank"
              rel="noreferrer"
            >
              <SiFiverr />
              Fiverr
            </a>

            {/* EMAIL */}

            <button
              className="emailLink"
              onClick={getInTouch}
            >
              ✉ Email Me
            </button>

          </div>

        </div>

      </div>


      {/* BRAND */}

      <h1 className="footerBrand">
        ABHI
      </h1>


      {/* COPYRIGHT */}

      <div className="copyright">
        © 2026 Abhi • Built with React & GSAP
      </div>

    </footer>
  );
}