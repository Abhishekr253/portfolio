import "./HeroContent.css";
import { forwardRef } from "react";

const CALENDLY_URL = "https://calendly.com/abhishekrofficial129/30min";

const HeroContent = forwardRef((props, ref) => {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const bookACall = () => {
    window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div ref={ref} className="heroContent">
      <h1>
        Code,
        <br />
        Crafted
        <br />
        Differently.
      </h1>

      <p>Full Stack Developer</p>

      <div className="heroButtons">
        <button className="primaryBtn" onClick={bookACall}>
          <span>Book a Call</span>
        </button>

        <button className="secondaryBtn" onClick={scrollToAbout}>
          <span>About Me</span>
        </button>
      </div>
    </div>
  );
});

HeroContent.displayName = "HeroContent";

export default HeroContent;