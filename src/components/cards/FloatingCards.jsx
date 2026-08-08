import { CreativeCommons, Rocket, BrickWallFire, Sparkles } from "lucide-react";
import "./FloatingCards.css";
import { forwardRef } from "react";

const SKILLS = [
  { icon: CreativeCommons, label: "Creative" },
  { icon: Rocket, label: "Reliable" },
  { icon: BrickWallFire, label: "Builder" },
  { icon: Sparkles, label: "Efficient" },
];

const FloatingCards = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <div className="skillsCard">
        {SKILLS.map(({ icon: Icon, label }) => (
          <span key={label}>
            <Icon color="#ffee00" size={18} />
            {label}
          </span>
        ))}
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