// src/components/Home.js

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";

// Import all necessary icons from lucide-react
import {
    MapPin, Camera, FileText, Users, ArrowRight, BarChart3,
    Globe, Mail, GitFork, Heart, TrendingUp, Image
} from 'lucide-react';

// Import your new combined CSS file
import './Home.css';

// Import all necessary images.
// IMPORTANT: You must verify these paths are correct for your project structure.
import templeImage from "../assets/ChatGPT Image Aug 20, 2025, 11_55_49 AM (1).png";
import centerLogo from "../assets/TerrAqua Logo Experiment (2).svg";

import Ganga from "../assets/ganga3.webp";
import Ganga12 from "../assets/ganag1.jpg"
import Ganga13 from "../assets/ganga2.jpg"

import footerLogo from "../assets/TerrAqua Logo Experiment (2).svg";



// Register the GSAP plugin
gsap.registerPlugin(InertiaPlugin);

// =================================================================================
// Sub-component: Birds
// This creates the flying bird animations in the Hero section.
// =================================================================================
const Birds = () => {
    const birdCount = 15;
    const animationStyles = ['fly-right-one', 'fly-right-two'];

    return (
        <div className="birds-wrapper">
            {Array.from({ length: birdCount }).map((_, index) => {
                const animationName = animationStyles[Math.floor(Math.random() * animationStyles.length)];
                const containerDuration = Math.random() * 5 + 13;
                const containerDelay = Math.random() * 15;
                const birdAnimationDuration = Math.random() * 0.4 + 0.8;

                return (
                    <div
                        key={index}
                        className="bird-container"
                        style={{
                            animationName: animationName,
                            animationDuration: `${containerDuration}s`,
                            animationDelay: `${containerDelay}s`,
                        }}
                    >
                        <div
                            className="bird"
                            style={{ animationDuration: `${birdAnimationDuration}s` }}
                        ></div>
                    </div>
                );
            })}
        </div>
    );
};

// =================================================================================
// Sub-component: Hero
// The main landing section with waves, birds, and floating image.
// =================================================================================
const Hero = () => {
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const buttonsRef = useRef(null);
    const featuresRef = useRef(null);
    const imageRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
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
    }, []);

    const handleRedirect = () => {
        navigate("/Gallery");
    };

    return (
        
        <section className="hero">
            <div className="hero-center-logo">
                <img src={centerLogo} alt="Terraqua UAV Logo" />
            </div>
            <Birds />
            

            <div className="hero-container">
                <div className="hero-content">
                    <h1 ref={titleRef} className="hero-title">
                        Explore the Sacred <span className="highlight">River Ganga</span> Heritage
                    </h1>
                    <p ref={descriptionRef} className="hero-description">
                        Discover the rich cultural, spiritual, and geographical heritage of the River Ganga through our comprehensive geospatial data collection. Journey through millennia of history, traditions, and sacred sites along the holy river.
                    </p>
                    <div ref={buttonsRef} className="hero-buttons">
                        <button className="btn-primary" onClick={handleRedirect}>
                            Start Exploring <ArrowRight className="btn-icon" />
                        </button>
                    </div>
                    <div ref={featuresRef} className="hero-features">
                        <div className="feature-item"><BarChart3 className="feature-icon" /><span>Spatial Data</span></div>
                        <div className="feature-item"><FileText className="feature-icon" /><span>Heritage Records</span></div>
                        <div className="feature-item"><Globe className="feature-icon" /><span>Interactive Maps</span></div>
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
                <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                    <defs>
                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
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

// =================================================================================
// Sub-component: HeritageCategories
// The four cards describing different types of heritage.
// =================================================================================
const HeritageCategories = () => {
    const categories = [
        { id: 1, title: "Sacred Ghats", description: "Historic riverfront steps and ceremonial platforms", icon: <MapPin /> },
        { id: 2, title: "Cultural Heritage", description: "Temples, monuments, and architectural marvels", icon: <Camera /> },
        { id: 3, title: "Historical Documents", description: "Ancient texts, inscriptions, and manuscripts", icon: <FileText /> },
        { id: 4, title: "Living Traditions", description: "Festivals, rituals, and cultural practices", icon: <Users /> }
    ];

    return (
        <section className="heritage-categories">
            <div className="container">
                <div className="categories-grid">
                    {categories.map((category) => (
                        <div key={category.id} className="category-card">
                            <div className="category-icon">{category.icon}</div>
                            <h3>{category.title}</h3>
                            <p>{category.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// =================================================================================
// Sub-component: HeritageCollection
// The image carousel section.
// Note: Originally had 'use client' for Next.js/App Router.
// =================================================================================
const HeritageCollection = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const heritageContent = [
        { image:  Ganga13, title: "Traditional Architecture.", description: "The Ganges is a trans-boundary river in Asia that flows through India and Bangladesh. The 2,525-kilometre-long (1,569 mi) river rises in the western Himalayas in the Indian state of Uttarakhand. It flows south and east through the Gangetic plain of North India, receiving the right-bank tributary, the Yamuna." },
        { image: Ganga, title: "Modern Heritage.", description: "The Ganges is a trans-boundary river in Asia that flows through India and Bangladesh. The 2,525-kilometre-long (1,569 mi) river rises in the western Himalayas in the Indian state of Uttarakhand. It flows south and east through the Gangetic plain of North India, receiving the right-bank tributary, the Yamuna." },
        { image:  Ganga12, title: "Cultural Street Art.", description: "The Ganges is a trans-boundary river in Asia that flows through India and Bangladesh. The 2,525-kilometre-long (1,569 mi) river rises in the western Himalayas in the Indian state of Uttarakhand. It flows south and east through the Gangetic plain of North India, receiving the right-bank tributary, the Yamuna." }
    ];

    const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % heritageContent.length);
    const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + heritageContent.length) % heritageContent.length);

    return (
        <section className="heritage-section">
            <div className="heritage-container">
                <div className="heritage-grid">
                    <div className="heritage-content">
                        <h1 className="heritage-title">{heritageContent[currentImageIndex].title}</h1>
                        <p className="heritage-description">{heritageContent[currentImageIndex].description}</p>
                    </div>
                    <div className="heritage-hero">
                        <div className="heritage-hero-image-container">
                            <img src={heritageContent[currentImageIndex].image} alt={`${heritageContent[currentImageIndex].title} - Cultural heritage`} className="heritage-hero-image" />
                        </div>
                    </div>
                    <div className="heritage-gallery">
                        <div className="heritage-gallery-container">
                            {heritageContent.map((content, index) => (
                                <div key={index} className={`heritage-thumbnail ${index === currentImageIndex ? "active" : ""}`} onClick={() => setCurrentImageIndex(index)}>
                                    <img src={content.image} alt={`${content.title} thumbnail`} className="heritage-thumbnail-image" />
                                </div>
                            ))}
                        </div>
                        <div className="heritage-navigation">
                            <button onClick={prevImage} className="heritage-nav-button prev" aria-label="Previous image">
                                <svg className="heritage-nav-icon" width="24" height="24" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button onClick={nextImage} className="heritage-nav-button next" aria-label="Next image">
                                <svg className="heritage-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// =================================================================================
// Sub-component: DotGrid (and its helper functions)
// The interactive dot animation used in the footer.
// Note: Originally had 'use client' for Next.js/App Router.
// =================================================================================
const throttle = (func, limit) => {
    let lastCall = 0;
    return function (...args) {
        const now = performance.now();
        if (now - lastCall >= limit) {
            lastCall = now;
            func.apply(this, args);
        }
    };
};

function hexToRgb(hex) {
    const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (!m) return { r: 0, g: 0, b: 0 };
    return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

const DotGrid = ({
    dotSize = 16, gap = 32, baseColor = "#5227FF", activeColor = "#5227FF",
    proximity = 150, speedTrigger = 100, shockRadius = 250, shockStrength = 5,
    maxSpeed = 5000, resistance = 750, returnDuration = 1.5, className = "", style,
}) => {
    const wrapperRef = useRef(null);
    const canvasRef = useRef(null);
    const dotsRef = useRef([]);
    const pointerRef = useRef({ x: 0, y: 0, vx: 0, vy: 0, speed: 0, lastTime: 0, lastX: 0, lastY: 0 });

    const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
    const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);
    
    const circlePath = useMemo(() => {
        if (typeof window === "undefined" || !window.Path2D) return null;
        const p = new window.Path2D();
        p.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
        return p;
    }, [dotSize]);
    
    const buildGrid = useCallback(() => {
        const wrap = wrapperRef.current;
        const canvas = canvasRef.current;
        if (!wrap || !canvas) return;
        const { width, height } = wrap.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.scale(dpr, dpr);
        const cols = Math.floor((width + gap) / (dotSize + gap));
        const rows = Math.floor((height + gap) / (dotSize + gap));
        const cell = dotSize + gap;
        const gridW = cell * cols - gap;
        const gridH = cell * rows - gap;
        const extraX = width - gridW;
        const extraY = height - gridH;
        const startX = extraX / 2 + dotSize / 2;
        const startY = extraY / 2 + dotSize / 2;
        const dots = [];
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const cx = startX + x * cell;
                const cy = startY + y * cell;
                dots.push({ cx, cy, xOffset: 0, yOffset: 0, _inertiaApplied: false });
            }
        }
        dotsRef.current = dots;
    }, [dotSize, gap]);

    useEffect(() => {
        if (!circlePath) return;
        let rafId;
        const proxSq = proximity * proximity;
        const draw = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const { x: px, y: py } = pointerRef.current;
            for (const dot of dotsRef.current) {
                const ox = dot.cx + dot.xOffset;
                const oy = dot.cy + dot.yOffset;
                const dx = dot.cx - px;
                const dy = dot.cy - py;
                const dsq = dx * dx + dy * dy;
                let style = baseColor;
                if (dsq <= proxSq) {
                    const dist = Math.sqrt(dsq);
                    const t = 1 - dist / proximity;
                    const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
                    const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
                    const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
                    style = `rgb(${r},${g},${b})`;
                }
                ctx.save();
                ctx.translate(ox, oy);
                ctx.fillStyle = style;
                ctx.fill(circlePath);
                ctx.restore();
            }
            rafId = requestAnimationFrame(draw);
        };
        draw();
        return () => cancelAnimationFrame(rafId);
    }, [proximity, baseColor, activeRgb, baseRgb, circlePath]);

    useEffect(() => {
        buildGrid();
        let ro = null;
        if ("ResizeObserver" in window) {
            ro = new ResizeObserver(buildGrid);
            if(wrapperRef.current) ro.observe(wrapperRef.current);
        } else {
            window.addEventListener("resize", buildGrid);
        }
        return () => {
            if (ro) ro.disconnect();
            else window.removeEventListener("resize", buildGrid);
        };
    }, [buildGrid]);

    useEffect(() => {
        const onMove = (e) => {
            const now = performance.now();
            const pr = pointerRef.current;
            const dt = pr.lastTime ? now - pr.lastTime : 16;
            const dx = e.clientX - pr.lastX;
            const dy = e.clientY - pr.lastY;
            let vx = (dx / dt) * 1000;
            let vy = (dy / dt) * 1000;
            let speed = Math.hypot(vx, vy);
            if (speed > maxSpeed) {
                const scale = maxSpeed / speed;
                vx *= scale;
                vy *= scale;
                speed = maxSpeed;
            }
            pr.lastTime = now;
            pr.lastX = e.clientX;
            pr.lastY = e.clientY;
            pr.vx = vx;
            pr.vy = vy;
            pr.speed = speed;
            if (canvasRef.current) {
                const rect = canvasRef.current.getBoundingClientRect();
                pr.x = e.clientX - rect.left;
                pr.y = e.clientY - rect.top;
            }
            for (const dot of dotsRef.current) {
                const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y);
                if (speed > speedTrigger && dist < proximity && !dot._inertiaApplied) {
                    dot._inertiaApplied = true;
                    gsap.killTweensOf(dot);
                    const pushX = dot.cx - pr.x + vx * 0.005;
                    const pushY = dot.cy - pr.y + vy * 0.005;
                    gsap.to(dot, {
                        inertia: { xOffset: pushX, yOffset: pushY, resistance },
                        onComplete: () => {
                            gsap.to(dot, { xOffset: 0, yOffset: 0, duration: returnDuration, ease: "elastic.out(1,0.75)" });
                            dot._inertiaApplied = false;
                        },
                    });
                }
            }
        };

        const onClick = (e) => {
            if (canvasRef.current) {
                const rect = canvasRef.current.getBoundingClientRect();
                const cx = e.clientX - rect.left;
                const cy = e.clientY - rect.top;
                for (const dot of dotsRef.current) {
                    const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
                    if (dist < shockRadius && !dot._inertiaApplied) {
                        dot._inertiaApplied = true;
                        gsap.killTweensOf(dot);
                        const falloff = Math.max(0, 1 - dist / shockRadius);
                        const pushX = (dot.cx - cx) * shockStrength * falloff;
                        const pushY = (dot.cy - cy) * shockStrength * falloff;
                        gsap.to(dot, {
                            inertia: { xOffset: pushX, yOffset: pushY, resistance },
                            onComplete: () => {
                                gsap.to(dot, { xOffset: 0, yOffset: 0, duration: returnDuration, ease: "elastic.out(1,0.75)" });
                                dot._inertiaApplied = false;
                            },
                        });
                    }
                }
            }
        };

        const throttledMove = throttle(onMove, 50);
        window.addEventListener("mousemove", throttledMove, { passive: true });
        window.addEventListener("click", onClick);
        return () => {
            window.removeEventListener("mousemove", throttledMove);
            window.removeEventListener("click", onClick);
        };
    }, [maxSpeed, speedTrigger, proximity, resistance, returnDuration, shockRadius, shockStrength]);

    return (
        <section className={`dot-grid ${className}`} style={style}>
            <div ref={wrapperRef} className="dot-grid__wrap">
                <canvas ref={canvasRef} className="dot-grid__canvas" />
            </div>
        </section>
    );
};

const ByTheNumbers = () => {
    const stats = [
        { id: 1, number: "711", title: "Heritage Sites", description: "Documented locations", icon: <MapPin />, color: "blue" },
        { id: 2, number: "2,847", title: "Geographic Points", description: "Spatial coordinates", icon: <TrendingUp />, color: "green" },
        { id: 3, number: "1,924", title: "Visual Archives", description: "Photos & illustrations", icon: <Image />, color: "purple" },
        { id: 4, number: "356", title: "Research Papers", description: "Academic publications", icon: <FileText />, color: "orange" }
    ];

    return (
        <section className="by-the-numbers">
            <div className="container">
                <div className="section-header">
                    <h2>By the Numbers</h2>
                    <p>Our extensive database captures the breadth and depth of Ganga's heritage</p>
                </div>
                <div className="stats-grid">
                    {stats.map((stat) => (
                        <div key={stat.id} className="stat-card">
                            <div className={`stat-icon ${stat.color}`}>{stat.icon}</div>
                            <div className="stat-number">{stat.number}</div>
                            <h3 className="stat-title">{stat.title}</h3>
                            <p className="stat-description">{stat.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


// =================================================================================
// Sub-component: Footer
// The final section of the page, which uses the DotGrid component.
// =================================================================================
const Footer = () => {
    return (
        <footer className="footer">
            <DotGrid
                className="footer-background-animation"
                baseColor="#2d3748"
                activeColor="#4a5568"
                dotSize={6}
                gap={20}
            />
            <div className="container">
                <div className="footer-content">
                    <div className="footer-column">
                        <div className="footer-logo">
                            <div className="logo-container">
                                <img src={footerLogo} alt="Terraqua UAV Logo" className="logo-image" />
                            </div>
                        </div>
                        <p className="footer-description">
                            Preserving and sharing the rich cultural heritage of the sacred River Ganga...
                        </p>
                    </div>
                    <div className="footer-column">
                        <h4>Explore</h4>
                        <ul>
                            <li><a href="#interactive-maps" className="footer-link">Interactive Maps</a></li>
                            <li><a href="#heritage-sites" className="footer-link">Heritage Sites</a></li>
                            <li><a href="#cultural-archives" className="footer-link">Cultural Archives</a></li>
                            <li><a href="#research-data" className="footer-link">Research Data</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>Resources</h4>
                        <ul>
                            <li><a href="#api-docs" className="footer-link">API Documentation</a></li>
                            <li><a href="#download-data" className="footer-link">Download Data</a></li>
                            <li><a href="#research-papers" className="footer-link">Research Papers</a></li>
                            <li><a href="#contribute" className="footer-link">Contribute</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>Connect</h4>
                        <ul>
                            <li><a href="#contact" className="footer-link"><Mail className="link-icon" /> Contact Us</a></li>
                            <li><a href="#website" className="footer-link"><Globe className="link-icon" /> Website</a></li>
                            <li><a href="#open-source" className="footer-link"><GitFork className="link-icon" /> Open Source</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="footer-divider">
                        <div className="divider-line"></div>
                        <Heart className="divider-icon" />
                        <div className="divider-line"></div>
                    </div>
                    <div className="footer-copyright">
                        <p>
                            &copy; 2025 made by{" "}
                            <a href="https://mapzest.com" target="_blank" rel="noopener noreferrer" className="footer-link">Mapzest</a>{" "}
                            powered by{" "}
                            <a href="https://terraquauav.com" target="_blank" rel="noopener noreferrer" className="footer-link">TerraquaUAV</a>{" "}
                            <Heart className="heart-icon" /> Ganga of the past
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// =================================================================================
// Main Home Page Component
// This component assembles all the sections into the final page.
// =================================================================================
const Home = () => {
    return (
        <div>
            <main>
                <Hero />
                <HeritageCategories />
                <HeritageCollection />
                <ByTheNumbers />
            </main>
            <Footer />
        </div>
    );
};

export default Home;