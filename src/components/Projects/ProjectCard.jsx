import { useEffect, useRef, useState } from "react";

export default function ProjectCard({ title, description, tech, poster, video, link }) {
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    const videoEl = videoRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setPlayVideo(true);
            if (videoEl) {
              videoEl.currentTime = 0;
              videoEl.play().catch(() => {});
            }
          }, 1000);
        } else {
          setPlayVideo(false);
          if (videoEl) {
            videoEl.pause();
            videoEl.currentTime = 0;
          }
        }
      },
      { threshold: 0.6 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="projectCard" ref={cardRef}>
      <div className="projectMedia">
        <img src={poster} alt={title} className="projectPoster" />

        <video
          ref={videoRef}
          className={`projectVideo ${playVideo ? "showVideo" : ""}`}
          muted
          playsInline
          preload="metadata"
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>

      <div className="projectInfo">
        <span className="projectLabel">Featured Project</span>
        <h2>{title}</h2>
        <p>{description}</p>

        <div className="techStack">
          {tech.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <a href={link} target="_blank" rel="noreferrer" className="projectBtn">
          View Project →
        </a>
      </div>
    </div>
  );
}