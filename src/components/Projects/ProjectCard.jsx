import React, { useEffect, useRef, useState } from "react";
import projects from "./data";
import "./SelectedWork.css";

const VIDEO_DELAY_MS = 1000;

function ProjectCard({ project, index }) {
  const reversed = index % 2 === 1;
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!project.video) return undefined;

    const cardEl = cardRef.current;
    const videoEl = videoRef.current;
    let delayTimer;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          delayTimer = setTimeout(() => {
            setShowVideo(true);

            if (videoEl) {
              videoEl.currentTime = 0;
              videoEl.play().catch(() => {});
            }
          }, VIDEO_DELAY_MS);
        } else {
          clearTimeout(delayTimer);
          setShowVideo(false);

          if (videoEl) {
            videoEl.pause();
            videoEl.currentTime = 0;
          }
        }
      },
      {
        threshold: 0.4,
      }
    );

    if (cardEl) {
      observer.observe(cardEl);
    }

    return () => {
      clearTimeout(delayTimer);
      observer.disconnect();
    };
  }, [project.video]);

  return (
    <article
      className={`sw-card ${reversed ? "sw-card--reversed" : ""}`}
      ref={cardRef}
    >
      {/* Project Preview */}
      <div className="sw-card__media">
        <div className="sw-card__browser" aria-hidden="true">
          <span className="sw-dot" />
          <span className="sw-dot" />
          <span className="sw-dot" />
        </div>

        <div className="sw-card__screen">
          {project.image ? (
            <img
              className={`sw-card__poster ${
                showVideo ? "sw-card__poster--hidden" : ""
              }`}
              src={project.image}
              alt={`${project.title} project developed by Abhishek R`}
              loading="lazy"
            />
          ) : (
            <div
              className={`sw-card__placeholder ${
                showVideo ? "sw-card__poster--hidden" : ""
              }`}
              aria-label={`${project.title} project preview`}
            >
              <span className="sw-card__placeholder-title">
                {project.title}
              </span>
            </div>
          )}

          {project.video && (
            <video
              ref={videoRef}
              className={`sw-card__video ${
                showVideo ? "sw-card__video--visible" : ""
              }`}
              src={project.video}
              poster={project.image}
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={`${project.title} project preview video`}
            />
          )}

          {/* Project Stat */}
          {project.stat && (
            <div className="sw-card__stat">
              <span className="sw-card__stat-value">
                {project.stat.value}
              </span>

              <span className="sw-card__stat-label">
                {project.stat.label}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Project Information */}
      <div className="sw-card__content">
        <span className="sw-eyebrow">{project.tag}</span>

        <h3 className="sw-card__title">{project.title}</h3>

        <p className="sw-card__desc">{project.description}</p>

        {/* Technologies */}
        <ul className="sw-tags" aria-label={`${project.title} technologies`}>
          {project.stack.map((tech) => (
            <li key={tech} className="sw-tag">
              {tech}
            </li>
          ))}
        </ul>

        {/* Uncomment when you want to show project links */}
        
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="sw-cta"
          >
            View Project
            <span aria-hidden="true">→</span>
          </a>
        )}
       
      </div>
    </article>
  );
}

export default function SelectedWork() {
  return (
    <section
      className="sw-section"
      id="projects"
      aria-labelledby="selected-work-heading"
    >
      <div className="sw-header">
        <span className="sw-badge">Featured Projects</span>

        <h2 id="selected-work-heading" className="sw-heading">
          Selected Work.
        </h2>

        <p className="sw-subheading">
          A collection of modern websites and digital products crafted with
          performance, animation and exceptional user experience at the core.
        </p>
      </div>

      <div className="sw-list">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}