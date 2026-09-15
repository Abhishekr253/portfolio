import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { services } from "./serviceData";

export default function ServiceCarousel() {
  const [active, setActive] = useState(0);
  const total = services.length;

  const leftRef = useRef(null);
  const centerRef = useRef(null);
  const rightRef = useRef(null);
  const trackRef = useRef(null);

  // touch tracking
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndX = useRef(0);
  const isDragging = useRef(false);
  const isHorizontal = useRef(false);

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

  // swipe handlers — drag track live with finger, snap on release
  const SWIPE_THRESHOLD = 40; // px

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchEndX.current = e.touches[0].clientX;
    isDragging.current = true;
    isHorizontal.current = false;
    gsap.killTweensOf(trackRef.current);
  };

  const onTouchMove = (e) => {
    if (!isDragging.current) return;
    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;
    const dx = x - touchStartX.current;
    const dy = y - touchStartY.current;

    // decide gesture direction once, so vertical page scroll still works
    if (!isHorizontal.current) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      isHorizontal.current = Math.abs(dx) > Math.abs(dy);
      if (!isHorizontal.current) {
        isDragging.current = false; // hand off to native vertical scroll
        return;
      }
    }

    e.preventDefault(); // stop page scroll only once we know it's horizontal
    touchEndX.current = x;
    gsap.set(trackRef.current, { x: dx });
  };

  const onTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const delta = touchEndX.current - touchStartX.current;

    // snap track back to 0 immediately; crossfade handles the content swap
    gsap.set(trackRef.current, { x: 0 });

    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    if (delta < 0) next();
    else previous();
  };

  return (
    <section className="carouselSection">
      <h2 className="carouselTitle">What I Build</h2>

      <p className="carouselSubtitle">
        Premium websites crafted with modern design, smooth animation and high
        performance.
      </p>

      <p className="mobileSwipeHint">Tap the card to see the next one</p>

      <div className="carouselWrapper">
        <button
          className="navBtn leftBtn"
          onClick={previous}
          aria-label="Previous project"
        >
          ←
        </button>

        <div
          className="carouselViewport"
          style={{ touchAction: "pan-y" }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchEnd}
        >
          <div ref={trackRef} className="carouselTrack">
            {/* LEFT (dim, click to go prev) */}
            <div
              ref={leftRef}
              className="serviceCard sideCard"
              onClick={previous}
            >
              <div className="imageWrapper">
                <img
                  key={leftItem.poster}
                  src={leftItem.poster}
                  className="poster"
                  alt={leftItem.title}
                  loading="eager"
                />
              </div>
              <div className="serviceInfo">
                <span>{leftItem.type}</span>
                <h3>{leftItem.title}</h3>
              </div>
            </div>

            {/* CENTER (active) */}
            <div ref={centerRef} className="serviceCard activeCard">
              <div className="imageWrapper">
                <img
                  key={centerItem.poster}
                  src={centerItem.poster}
                  className="poster"
                  alt={centerItem.title}
                  loading="eager"
                />
              </div>
              <div className="serviceInfo">
                <span>{centerItem.type}</span>
                <h3>{centerItem.title}</h3>
                <p>{centerItem.description}</p>
              </div>
            </div>

            {/* RIGHT (dim, click to go next) */}
            <div ref={rightRef} className="serviceCard sideCard" onClick={next}>
              <div className="imageWrapper">
                <img
                  key={rightItem.poster}
                  src={rightItem.poster}
                  className="poster"
                  alt={rightItem.title}
                  loading="eager"
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
