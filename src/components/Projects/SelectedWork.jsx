import React, { useEffect, useRef, useState } from "react";
import projects from "./data";
import "./SelectedWork.css";

// How long the poster holds before the video takes over.
const VIDEO_DELAY_MS = 1000;

function ProjectCard({ project, index }) {
  const reversed = index % 2 === 1;
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!project.video) return undefined;

    const timer = setTimeout(() => {
      setShowVideo(true);
    }, VIDEO_DELAY_MS);

    return () => clearTimeout(timer);
  }, [project.video]);

  useEffect(() => {
    if (showVideo && videoRef.current) {
      // Some browsers need an explicit play() call even with autoPlay set.
      videoRef.current.play().catch(() => {});
    }
  }, [showVideo]);

  return (
    <div className={`sw-card ${reversed ? "sw-card--reversed" : ""}`}>
      <div className="sw-card__media">
        <div className="sw-card__browser">
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
              alt={project.title}
            />
          ) : (
            <div
              className={`sw-card__placeholder ${
                showVideo ? "sw-card__poster--hidden" : ""
              }`}
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
              autoPlay
              preload="metadata"
            />
          )}

          <div className="sw-card__stat">
            <span className="sw-card__stat-value">{project.stat.value}</span>
            <span className="sw-card__stat-label">{project.stat.label}</span>
          </div>
        </div>
      </div>

      <div className="sw-card__content">
        <span className="sw-eyebrow">{project.tag}</span>
        <h3 className="sw-card__title">{project.title}</h3>
        <p className="sw-card__desc">{project.description}</p>

        <ul className="sw-tags">
          {project.stack.map((tech) => (
            <li key={tech} className="sw-tag">
              {tech}
            </li>
          ))}
        </ul>

        <a href={project.link} className="sw-cta">
          View Project <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}

export default function SelectedWork() {
  return (
    <section className="sw-section" id="projects">
      <div className="sw-header">
        <span className="sw-badge">Featured Projects</span>
        <h2 className="sw-heading">Selected Work.</h2>
        <p className="sw-subheading">
          A collection of modern websites and digital products crafted with
          performance, animation and exceptional user experience at the core.
        </p>
      </div>

      <div className="sw-list">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}