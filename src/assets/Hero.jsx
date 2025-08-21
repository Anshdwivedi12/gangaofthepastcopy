import React, { useEffect, useRef } from "react";
import { ArrowRight, BarChart3, FileText, Globe } from "lucide-react";
import templeImage from "../assets/ChatGPT Image Aug 20, 2025, 11_55_49 AM (1).png";
import Birds from "./Birds"; // Import the new Birds component
import "./Hero.css";
import centerLogo from "../assets/TerrAqua Logo Experiment (2).svg";

const Hero = () => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const featuresRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Your animation logic remains the same
    const animateElements = () => {
      const elements = [
        { ref: titleRef, delay: 0 },
        { ref: descriptionRef, delay: 200 },
        { ref: buttonsRef, delay: 400 },
        { ref: featuresRef, delay: 600 },
        { ref: imageRef, delay: 300 },
      ];

      elements.forEach(({ ref, delay }) => {
        if (ref.current) {
          setTimeout(() => {
            ref.current.style.opacity = "1";
            ref.current.style.transform = "translateY(0)";
          }, delay);
        }
      });
    };

    animateElements();
  }, []);

  return (
    <section className="hero">
      {/* ===== NEW: Add the Birds component here ===== */}
      <Birds />
      <div className="hero-center-logo">
        <img src={centerLogo} alt="Terraqua UAV Logo" />
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <h1 ref={titleRef} className="hero-title">
            Explore the Sacred <span className="highlight">River Ganga</span>{" "}
            Heritage
          </h1>

          <p ref={descriptionRef} className="hero-description">
            Discover the rich cultural, spiritual, and geographical heritage of
            the River Ganga...
          </p>

          <div ref={buttonsRef} className="hero-buttons">
            <button className="btn-primary">
              Start Exploring <ArrowRight className="btn-icon" />
            </button>
          </div>

          <div ref={featuresRef} className="hero-features">
            {/* Feature items */}
            <div className="feature-item">
              <BarChart3 className="feature-icon" />
              <span>Spatial Data</span>
            </div>
            <div className="feature-item">
              <FileText className="feature-icon" />
              <span>Heritage Records</span>
            </div>
            <div className="feature-item">
              <Globe className="feature-icon" />
              <span>Interactive Maps</span>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img
            ref={imageRef}
            src={templeImage}
            alt="Scenic mountains on the horizon"
            className="temple-image"
          />
        </div>
      </div>

      <div className="wave-container">
        {/* Your existing wave SVG */}
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
  <g className="parallax">
  <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(72, 191, 227, 0.7)" />
  <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(86, 207, 225, 0.5)" />
  <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(113, 227, 227, 0.3)" />
  <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(255, 255, 255, 0.7)" />
</g>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
