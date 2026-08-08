import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { services } from "./serviceData";

export default function ServiceCarousel() {
  const [active, setActive] = useState(0);
  const total = services.length;

  const videoRef = useRef(null);
  const leftRef = useRef(null);
  const centerRef = useRef(null);
  const rightRef = useRef(null);

  const wrap = (i) => (i + total) % total;

  const leftItem = services[wrap(active - 1)];
  const centerItem = services[wrap(active)];
  const rightItem = services[wrap(active + 1)];

  const goTo = (index) => setActive(wrap(index));
  const previous = () => goTo(active - 1);
  const next = () => goTo(active + 1);

  // smooth crossfade whenever active changes
  useLayoutEffect(() => {
    gsap.fromTo(
      centerRef.current,
      { opacity: 0, scale: 0.9, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: "power3.out" },
    );

    gsap.fromTo(
      [leftRef.current, rightRef.current],
      { opacity: 0 },
      { opacity: 0.5, duration: 0.5, ease: "power2.out", delay: 0.05 },
    );
  }, [active]);

  // play only the center (active) video
useEffect(() => {
  const video = videoRef.current;
  if (!video) return;

  video.pause();
  video.src = centerItem.video;
  video.load();

  const t = setTimeout(() => {
    video.play().catch(() => {});
  }, 400);

  return () => clearTimeout(t);
}, [centerItem.video]);

  return (
    <section className="carouselSection">
      <h2 className="carouselTitle">What I Build</h2>

      <p className="carouselSubtitle">
        Premium websites crafted with modern design, smooth animation and high
        performance.
      </p>

      <div className="carouselWrapper">
        <button
          className="navBtn leftBtn"
          onClick={previous}
          aria-label="Previous project"
        >
          ←
        </button>

        <div className="carouselViewport">
          <div className="carouselTrack">
            {/* LEFT (dim, click to go prev) */}
            <div
              ref={leftRef}
              className="serviceCard sideCard"
              onClick={previous}
            >
              <div className="videoWrapper">
                <img
                  src={leftItem.poster}
                  className="poster"
                  alt={leftItem.title}
                />
              </div>
              <div className="serviceInfo">
                <span>{leftItem.type}</span>
                <h3>{leftItem.title}</h3>
              </div>
            </div>

            {/* CENTER (active, video plays) */}
            <div ref={centerRef} className="serviceCard activeCard">
              <div className="videoWrapper">
                <img
                  src={centerItem.poster}
                  className="poster"
                  alt={centerItem.title}
                />
                <video
                  key={centerItem.video}
                  ref={videoRef}
                  className="serviceVideo showVideo"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source src={centerItem.video} type="video/mp4" />
                </video>
              </div>
              <div className="serviceInfo">
                <span>{centerItem.type}</span>
                <h3>{centerItem.title}</h3>
                <p>{centerItem.description}</p>
              </div>
            </div>

            {/* RIGHT (dim, click to go next) */}
            <div ref={rightRef} className="serviceCard sideCard" onClick={next}>
              <div className="videoWrapper">
                <img
                  src={rightItem.poster}
                  className="poster"
                  alt={rightItem.title}
                />
              </div>
              <div className="serviceInfo">
                <span>{rightItem.type}</span>
                <h3>{rightItem.title}</h3>
              </div>
            </div>
          </div>
        </div>

        <button
          className="navBtn rightBtn"
          onClick={next}
          aria-label="Next project"
        >
          →
        </button>
      </div>

      <div className="carouselDots">
        {services.map((_, index) => (
          <button
            key={index}
            className={`dot ${active === index ? "activeDot" : ""}`}
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
