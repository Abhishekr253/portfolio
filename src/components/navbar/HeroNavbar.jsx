import "./HeroNavbar.css";
import { Menu, X } from "lucide-react";
import { forwardRef, useCallback, useState } from "react";

const NAV_LINKS = [
  { href: "#about", label: "ABOUT" },
  { href: "#projects", label: "WORK" },
  { href: "#services", label: "SERVICES" },
  { href: "#contact", label: "CONTACT" },
];

const HeroNavbar = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);

  const toggleMenu = useCallback(() => setOpen((v) => !v), []);
  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <>
      <nav ref={ref} className="heroNavbar">
        <div className="logo">ABHI</div>

        <div className="navLinks">
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </div>

        <button className="callBtn">Book a Call</button>

        <button className="menuBtn" onClick={toggleMenu} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div className={`mobileMenu ${open ? "show" : ""}`}>
        {NAV_LINKS.map(({ href, label }) => (
          <a key={href} href={href} onClick={closeMenu}>
            {label}
          </a>
        ))}
      </div>
    </>
  );
});

HeroNavbar.displayName = "HeroNavbar";

export default HeroNavbar;