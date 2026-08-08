import { BrickWallFire, CreativeCommons, Rocket, Sparkles } from "lucide-react";
import "./FloatingCards.css";
import { forwardRef } from "react";

const FloatingCards = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <div className="skillsCard">
        <span><CreativeCommons color="#ffee00" size={18}/> Creative</span>
        <span><Rocket color="#ffee00" size={18}/> Reliable</span>
        <span>
  <BrickWallFire color="#ffee00" size={18} />
  Builder
</span>
        <span><Sparkles color="#ffee00" size={18}/> Efficient</span>
      </div>

      <div className="experienceCard">
        <h2>3+</h2>
        <p>Years of Experience</p>
      </div>

      <div className="leftCaption">
        <p>Full Stack MERN Developer.</p>
        <p>Crafting premium digital experiences.</p>
      </div>

      <div className="rightCaption">
        Building modern websites that combine beautiful design,
        smooth animations and scalable development.
      </div>
    </div>
  );
});

FloatingCards.displayName = "FloatingCards";

export default FloatingCards;