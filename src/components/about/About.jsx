import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 2, suffix: "+", label: "Years Experience" },
  { value: 10, suffix: "+", label: "Projects Delivered" },
  { value: 10, suffix: "+", label: "Happy Clients" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
];

export default function About() {
  const sectionRef = useRef(null);
  const numberRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Split paragraph into words
      const split = new SplitType(".aboutText", {
        types: "words",
      });

      gsap.set(split.words, {
        color: "#c7c7c7",
      });

      gsap.to(split.words, {
        color: "#111111",
        stagger: {
          each: 0.08,
        },
        ease: "none",
        scrollTrigger: {
          trigger: ".aboutText",
          start: "top 75%",
          end: "bottom 35%",
          scrub: true,
        },
      });

      // Count-up numbers
      numberRefs.current.forEach((el, i) => {
        if (!el) return;

        const stat = stats[i];
        const counter = { val: 0 };

        gsap.to(counter, {
          val: stat.value,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".statsGrid",
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = Math.floor(counter.val) + stat.suffix;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="aboutSection" ref={sectionRef} id="about">
      <div className="container">
        <div className="aboutHeader">
          <span className="aboutTag">ABOUT ME</span>

          <p className="aboutText">
           I'm a Full Stack MERN Developer with 2+ years of experience building scalable, high-performance web applications that combine modern design with clean architecture. I've delivered solutions across industries, including the Lazza ERP platform, construction company websites, restaurant websites, and The Hindu Coin ecosystem, helping businesses strengthen their digital presence and improve user engagement. My expertise includes MongoDB, Express.js, React, Node.js, Tailwind CSS, Custom CSS, GSAP, JavaScript, REST APIs, Git, and web accessibility practices aligned with WCAG and AA-level standards, allowing me to create fast, responsive, accessible, and maintainable applications focused on performance, user experience, and long-term business value.

          </p>
        </div>

        <div className="statsGrid">
          {stats.map((stat, i) => (
            <div className="statCard" key={stat.label}>
              <h1 ref={(el) => (numberRefs.current[i] = el)}>0{stat.suffix}</h1>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}