import "./Footer.css";

import { FaLinkedin } from "react-icons/fa";
import { SiFiverr } from "react-icons/si";

const CALENDLY_URL = "https://calendly.com/abhishekrofficial129/30min";
const EMAIL = "abhishekrofficial129@gmail.com";

const QUICK_LINKS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
];

export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const bookACall = () => {
    window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
  };

  const getInTouch = () => {
    window.location.href = `mailto:${EMAIL}?subject=Website%20Project%20Inquiry&body=Hi%20Abhi,%0A%0AI%27m%20interested%20in%20working%20with%20you%20on%20a%20website.`;
  };

  return (
    <footer className="footer">
      <div className="footerContainer" id="contact">
        <div className="footerCTA">
          <a
            href={`mailto:${EMAIL}?subject=Website%20Project%20Inquiry`}
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
            Looking for a premium website with modern animations and
            performance? Let's work together.
          </p>

          <button className="footerBtn" onClick={bookACall}>
            Book a Call
          </button>
        </div>

        <div className="footerLinks">
          <div>
            <h4>Quick Links</h4>
            {QUICK_LINKS.map(({ id, label }) => (
              <button key={id} onClick={() => scrollTo(id)}>
                {label}
              </button>
            ))}
          </div>

          <div>
            <h4>Connect</h4>

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

            <button className="emailLink" onClick={getInTouch}>
              ✉ Email Me
            </button>
          </div>
        </div>
      </div>

      <h1 className="footerBrand">ABHI</h1>

      <div className="copyright">© 2026 Abhi • Built with React & GSAP</div>
    </footer>
  );
}