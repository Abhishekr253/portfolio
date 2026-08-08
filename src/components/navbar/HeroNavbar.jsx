import "./HeroNavbar.css";
import { Menu, X } from "lucide-react";
import { forwardRef, useState } from "react";

const HeroNavbar = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav ref={ref} className="heroNavbar">
        <div className="logo">
          ABHI
        </div>

        <button className="callBtn">
          Book a Call
        </button>

        <button
          className="menuBtn"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobileMenu ${open ? "show" : ""}`}>
        <a href="#about" onClick={() => setOpen(false)}>ABOUT</a>
        <a href="#projects" onClick={() => setOpen(false)}>WORK</a>
        <a href="#services" onClick={() => setOpen(false)}>SERVICES</a>
        <a href="#contact" onClick={() => setOpen(false)}>CONTACT</a>
      </div>
    </>
  );
});

HeroNavbar.displayName = "HeroNavbar";

export default HeroNavbar;