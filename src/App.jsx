import React, { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 60;
const FOLDER_PATH = "/frames";

export default function App() {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);

  const getFrameSrc = (index) => {
    const pad = String(index).padStart(3, "0");
    return `${FOLDER_PATH}/ezgif-frame-${pad}.jpg`;
  };

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const trackHeight = windowHeight * 3; // 400vh total - 100vh viewport = 300vh scrollable

      let progress = scrollTop / trackHeight;
      progress = Math.max(0, Math.min(progress, 1));
      setScrollProgress(progress);

      const frameIdx = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.floor(progress * TOTAL_FRAMES) + 1)
      );

      setCurrentFrame(frameIdx);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleDemoBooking = (e) => {
    e.preventDefault();
    const student = document.getElementById("demoName").value.trim() || "Student";
    const grade = document.getElementById("demoGrade").value;
    const msg = `Hello Saqib Sir, I want to book a Free Demo Class for *${student}* in *${grade}* at The Sky Tuition Classes.`;
    window.open(`https://wa.me/917567277723?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div style={{ backgroundColor: "#061224", color: "#f8fafc", fontFamily: "sans-serif" }}>
      
      {/* Sticky Navbar */}
      <nav style={{
        position: "fixed", top: 0, width: "100%", padding: "1rem 6%", display: "flex",
        justifyContent: "space-between", alignItems: "center", zIndex: 100,
        background: "rgba(6, 18, 36, 0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0, 180, 216, 0.2)"
      }}>
        <div>
          <span style={{ fontWeight: 800, fontSize: "1.3rem", color: "#ffffff", letterSpacing: "1px" }}>
            THE <span style={{ color: "#00b4d8" }}>SKY</span>
          </span>
          <div style={{ fontSize: "0.65rem", letterSpacing: "2px", color: "#94a3b8" }}>TUITION CLASSES</div>
        </div>
        <a href="tel:7567277723" style={{
          background: "linear-gradient(135deg, #0077b6, #00b4d8)", color: "#fff",
          padding: "0.55rem 1.4rem", borderRadius: "25px", textDecoration: "none", fontWeight: 700, fontSize: "0.85rem",
          boxShadow: "0 4px 15px rgba(0, 180, 216, 0.3)"
        }}>
          Call Now
        </a>
      </nav>

      {/* 3D Scrollytelling Section (400vh track) */}
      <div style={{ height: "400vh", position: "relative" }}>
        <div style={{ position: "sticky", top: 0, width: "100vw", height: "100vh", overflow: "hidden" }}>
          
          {/* Active Image Frame */}
          <img
            src={getFrameSrc(currentFrame)}
            alt={`Frame ${currentFrame}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block"
            }}
          />

          {/* Vignette Overlay */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(circle at center, transparent 40%, rgba(6, 18, 36, 0.8) 100%)"
          }} />

          {/* STAGE 1 (0% - 25%) */}
          <div style={{
            position: "absolute", inset: 0, display: "flex", flexDirection: "column",
            justifyContent: "flex-end", alignItems: "center", textAlign: "center", paddingBottom: "5rem",
            opacity: scrollProgress < 0.25 ? 1 - scrollProgress * 4 : 0,
            pointerEvents: scrollProgress < 0.25 ? "auto" : "none",
            transition: "opacity 0.2s"
          }}>
            <span style={{ color: "#f59e0b", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", fontSize: "0.85rem", background: "rgba(6, 18, 36, 0.6)", padding: "4px 14px", borderRadius: "20px" }}>
              ★ "Time to Shine" ★
            </span>
            <h1 style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)", fontWeight: 800, margin: "0.8rem 0 0.4rem", color: "#ffffff", textShadow: "0 4px 20px rgba(0, 0, 0, 0.9)" }}>
              From Stressed to <span style={{ color: "#00d2ff" }}>Unstoppable.</span>
            </h1>
            <p style={{ color: "#e2e8f0", maxWidth: "560px", fontSize: "1rem", textShadow: "0 2px 10px rgba(0,0,0,0.9)", background: "rgba(6, 18, 36, 0.5)", padding: "6px 16px", borderRadius: "10px" }}>
              Scroll down to see the student transformation journey.
            </p>
          </div>

          {/* STAGE 2 (25% - 55%) */}
          <div style={{
            position: "absolute", top: "50%", left: "6%", transform: "translateY(-50%)",
            opacity: scrollProgress >= 0.25 && scrollProgress < 0.55 ? 1 : 0,
            transition: "opacity 0.3s", maxWidth: "380px", pointerEvents: "none"
          }}>
            <div style={{ background: "rgba(10, 25, 48, 0.85)", padding: "1.8rem", borderRadius: "16px", border: "1px solid rgba(0, 180, 216, 0.4)", backdropFilter: "blur(12px)" }}>
              <span style={{ color: "#00b4d8", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "1px" }}>DEEP CONCEPT CLARITY</span>
              <h2 style={{ color: "#fff", fontSize: "1.6rem", margin: "0.4rem 0 0.8rem" }}>Personalized Mentorship</h2>
              <p style={{ color: "#cbd5e1", fontSize: "0.95rem", lineHeight: "1.5" }}>
                Direct guidance under Director <strong>Saqib Vidha</strong> to clear every doubt.
              </p>
            </div>
          </div>

          {/* STAGE 3 (55% - 80%) */}
          <div style={{
            position: "absolute", top: "50%", right: "6%", transform: "translateY(-50%)",
            opacity: scrollProgress >= 0.55 && scrollProgress < 0.8 ? 1 : 0,
            transition: "opacity 0.3s", maxWidth: "380px", pointerEvents: "none"
          }}>
            <div style={{ background: "rgba(10, 25, 48, 0.85)", padding: "1.8rem", borderRadius: "16px", border: "1px solid rgba(245, 158, 11, 0.4)", backdropFilter: "blur(12px)" }}>
              <span style={{ color: "#f59e0b", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "1px" }}>WEEKLY TEST SERIES</span>
              <h2 style={{ color: "#fff", fontSize: "1.6rem", margin: "0.4rem 0 0.8rem" }}>Disciplined Excellence</h2>
              <p style={{ color: "#cbd5e1", fontSize: "0.95rem", lineHeight: "1.5" }}>
                Continuous assessment and transparent progress reports shared directly with parents.
              </p>
            </div>
          </div>

          {/* STAGE 4 (80% - 100%) */}
          <div style={{
            position: "absolute", inset: 0, display: "flex", flexDirection: "column",
            justifyContent: "center", alignItems: "center", textAlign: "center", padding: "2rem",
            opacity: scrollProgress >= 0.8 ? (scrollProgress - 0.8) * 5 : 0,
            pointerEvents: scrollProgress >= 0.8 ? "auto" : "none",
            transition: "opacity 0.2s"
          }}>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800, textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}>
              It's Your Turn to Shine.
            </h2>
            <p style={{ color: "#e2e8f0", margin: "0.8rem 0 1.8rem", maxWidth: "500px" }}>
              Admissions Open for Standards 8th to 12th in Junagadh.
            </p>
            <a
              href="#register"
              style={{
                background: "#25d366", color: "#fff", padding: "0.9rem 2.2rem", borderRadius: "30px",
                textDecoration: "none", fontWeight: 700, fontSize: "1.05rem", boxShadow: "0 8px 25px rgba(37, 211, 102, 0.35)"
              }}
            >
              Book Free Demo on WhatsApp
            </a>
          </div>

        </div>
      </div>

      {/* 3 Core Pillars */}
      <section style={{ padding: "4rem 6%", background: "linear-gradient(180deg, #061224 0%, #091b36 100%)" }}>
        <div style={{ maxWidth: "1100px", margin: "auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          
          <div style={{ background: "rgba(10, 25, 48, 0.6)", padding: "2rem", borderRadius: "16px", border: "1px solid rgba(0, 180, 216, 0.25)", textAlign: "center" }}>
            <div style={{ fontSize: "2.2rem", marginBottom: "0.8rem" }}>📖</div>
            <h3 style={{ fontSize: "1.3rem", marginBottom: "0.4rem" }}>EDUCATION</h3>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Concept-first foundation in Mathematics & Science for GSEB and CBSE boards.</p>
          </div>

          <div style={{ background: "rgba(10, 25, 48, 0.6)", padding: "2rem", borderRadius: "16px", border: "1px solid rgba(0, 180, 216, 0.25)", textAlign: "center" }}>
            <div style={{ fontSize: "2.2rem", marginBottom: "0.8rem" }}>🎯</div>
            <h3 style={{ fontSize: "1.3rem", marginBottom: "0.4rem" }}>DISCIPLINE</h3>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Daily attendance tracking, structured routine, and regular evaluations.</p>
          </div>

          <div style={{ background: "rgba(10, 25, 48, 0.6)", padding: "2rem", borderRadius: "16px", border: "1px solid rgba(0, 180, 216, 0.25)", textAlign: "center" }}>
            <div style={{ fontSize: "2.2rem", marginBottom: "0.8rem" }}>📈</div>
            <h3 style={{ fontSize: "1.3rem", marginBottom: "0.4rem" }}>FUTURE</h3>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Equipping students with analytical problem-solving skills for future goals.</p>
          </div>

        </div>
      </section>

      {/* Registration Section */}
      <section id="register" style={{ padding: "4rem 6%", maxWidth: "1100px", margin: "auto" }}>
        <div style={{
          background: "linear-gradient(145deg, rgba(10, 25, 48, 0.9), rgba(6, 18, 36, 0.95))",
          border: "1px solid rgba(0, 180, 216, 0.3)", borderRadius: "20px", padding: "3rem",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3rem"
        }}>
          <div>
            <span style={{ color: "#00b4d8", fontSize: "0.85rem", fontWeight: 700 }}>GET IN TOUCH</span>
            <h2 style={{ fontSize: "2rem", margin: "0.5rem 0 1.5rem" }}>The Sky Tuition Classes</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", color: "#cbd5e1", fontSize: "0.95rem" }}>
              <div>👤 <strong>Director:</strong> Saqib Vidha</div>
              <div>📞 <strong>Phone:</strong> <a href="tel:7203823108" style={{ color: "#00b4d8", textDecoration: "none" }}>+91 75672 77723</a></div>
              <div>✉️ <strong>Email:</strong> theskytuitionclasses@gmail.com</div>
              <div>📍 <strong>Location:</strong> Nr. Collector Office, Opp. Kohinoor Apartment, Sardarbag, Junagadh 362001</div>
              <div>⏰ <strong>Timings:</strong> Mon – Sat: 5:30 PM – 8:00 PM</div>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>Book a Free Demo</h3>
            <form onSubmit={handleDemoBooking} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <input
                id="demoName"
                type="text"
                placeholder="Student Full Name"
                required
                style={{ padding: "0.85rem", background: "rgba(6, 18, 36, 0.8)", border: "1px solid rgba(0, 180, 216, 0.2)", borderRadius: "8px", color: "#fff", outline: "none" }}
              />
              <select
                id="demoGrade"
                style={{ padding: "0.85rem", background: "#061224", border: "1px solid rgba(0, 180, 216, 0.2)", borderRadius: "8px", color: "#fff", outline: "none" }}
              >
                <option value="Class 10th Board Batch">Class 10th (Board Special)</option>
                <option value="Class 9th Foundation">Class 9th (Foundation)</option>
                <option value="Class 8th Foundation">Class 8th (Core Subjects)</option>
                <option value="Class 11th/12th">Class 11th / 12th</option>
              </select>
              <button
                type="submit"
                style={{
                  padding: "0.9rem", background: "#25d366", color: "#fff", border: "none", borderRadius: "8px",
                  fontWeight: 700, cursor: "pointer", fontSize: "1rem"
                }}
              >
                Submit via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/917567277723?text=Hello%20Saqib%20Sir,%20I%20want%20information%20about%20The%20Sky%20Tuition%20Classes"
        target="_blank"
        rel="noreferrer"
        style={{
          position: "fixed", bottom: "25px", right: "25px", background: "#25d366", color: "#fff",
          borderRadius: "50%", width: "55px", height: "55px", display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: "1.8rem", boxShadow: "0 4px 15px rgba(37,211,102,0.4)", zIndex: 999, textDecoration: "none"
        }}
      >
        💬
      </a>

      <footer style={{ padding: "2rem 6%", textAlign: "center", borderTop: "1px solid rgba(0, 180, 216, 0.15)", color: "#64748b", fontSize: "0.85rem" }}>
        © 2026 The Sky Tuition Classes. All Rights Reserved. • Junagadh, Gujarat
      </footer>
    </div>
  );
}