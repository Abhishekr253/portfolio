import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Services.css";
import ServiceCarousel from "./ServiceCarousel";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef(null);
  const nextSectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      tl.from(".servicesTag", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      })
        .from(
          ".servicesTitle",
          {
            y: 80,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.3",
        )
        .from(
          ".servicesSubtitle",
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.45",
        )
        .from(
          ".exploreBtn",
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.3",
        );

      gsap.to(".exploreArrow", {
        y: 10,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        duration: 0.8,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToServices = () => {
    nextSectionRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <section className="servicesHero" ref={sectionRef}>
        {/* Background Video */}
        <video className="servicesVideo" autoPlay muted loop playsInline>
          <source src="/videos/bg-video.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="servicesOverlay" />

        {/* Content */}
        <div className="servicesContent">
          <span className="servicesTag">SERVICES</span>

          <h1 className="servicesTitle">
            Websites Crafted
            <br />
            To Grow Brands.
          </h1>

          <p className="servicesSubtitle">
            From premium business websites to immersive animated experiences,
            every project is built with performance, storytelling and modern
            design.
          </p>

          <button className="exploreBtn" onClick={scrollToServices}>
            Explore Services
            <span className="exploreArrow">↓</span>
          </button>
        </div>
      </section>

      {/* Next Section */}
      <section className="servicesShowcase" ref={nextSectionRef}>
        <ServiceCarousel />
      </section>
    </>
  );
}
