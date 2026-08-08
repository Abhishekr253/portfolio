import "./HeroContent.css";
import { forwardRef } from "react";

const HeroContent = forwardRef((props, ref) => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");

    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const bookACall = () => {
    window.open("https://calendly.com/abhishekrofficial129/30min", "_blank");
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
          Book a Call
        </button>

        <button className="secondaryBtn" onClick={scrollToAbout}>
          About Me
        </button>
      </div>
    </div>
  );
});

HeroContent.displayName = "HeroContent";

export default HeroContent;
