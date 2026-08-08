import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Hero.css";

import HeroNavbar from "../navbar/HeroNavbar";
import FloatingCards from "../cards/FloatingCards";
import HeroContent from "./HeroContent";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);

  const textRef = useRef(null);
  const imageRef = useRef(null);

  const navbarRef = useRef(null);
  const cardsRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const text = textRef.current;
      const image = imageRef.current;

      const setTextSize = () => {
        gsap.set(text, {
          clearProps: "fontSize",
        });

        const currentWidth = text.getBoundingClientRect().width;
        const targetWidth = window.innerWidth * 0.96;

        const currentFont = parseFloat(
          getComputedStyle(text).fontSize
        );

        const finalFont =
          currentFont * (targetWidth / currentWidth);

        gsap.set(text, {
          fontSize: finalFont,
        });
      };

      setTextSize();

      // text grows from the left edge, so the transform
      // needs to be anchored there instead of the default center
      gsap.set(text, {
        transformOrigin: "left center",
      });

      const tl = gsap.timeline();

      // ==========================
      // INTRO ANIMATION
      // ==========================

      tl.fromTo(
        text,
        {
          scaleX: 0.65,
          opacity: 0.85,
        },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.6,
          ease: "power4.out",
        }
      )

        .fromTo(
          image,
          {
            opacity: 0,
            y: 80,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.2"
        )

        .fromTo(
          navbarRef.current,
          {
            opacity: 0,
            y: -40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          }
        )

        .fromTo(
          cardsRef.current.children,
          {
            opacity: 0,
            y: 40,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        )

        .fromTo(
          contentRef.current,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.35"
        );

      // ==========================
      // PIN HERO
      // ==========================

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: true,
        scrub: false,
      });

      const handleResize = () => {
        setTextSize();
        gsap.set(text, { transformOrigin: "left center" });
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, heroRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={heroRef} className="hero">
      <HeroNavbar ref={navbarRef} />

      <h1 ref={textRef} className="bgText">
        ABHI
      </h1>

      <img
        ref={imageRef}
        src="/abhi.png"
        className="heroImage"
        alt="Abhi"
      />

      <FloatingCards ref={cardsRef} />

      <HeroContent ref={contentRef} />
    </section>
  );
}