import React, { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 60;
const FOLDER_PATH = "/frames";

// Board Toppers & Hall of Fame Data
const TOPPERS = [
  { name: "Mustafa Jethva", score: "95.67%", grade: "A1 Grade", color: "#f59e0b" },
  { name: "Arman Malek", score: "95.22%", grade: "A1 Grade", color: "#f59e0b" },
  { name: "Alveera Khan Turk", score: "94.00%", grade: "A1 Grade", color: "#f59e0b" },
  { name: "Ayan Sameja", score: "92.33%", grade: "A1 Grade", color: "#f59e0b" },
  { name: "Aayesha Aziz", score: "88.47%", grade: "A2 Grade", color: "#00b4d8" },
  { name: "Mo. Faiz Khatri", score: "88.30%", grade: "A2 Grade", color: "#00b4d8" },
  { name: "Rehan Motiwala", score: "84.56%", grade: "A2 Grade", color: "#00b4d8" },
  { name: "Ammar Motiwala", score: "83.89%", grade: "A2 Grade", color: "#00b4d8" },
  { name: "Mo. Shabir Shoharvardi", score: "80.42%", grade: "A2 Grade", color: "#00b4d8" },
  { name: "Vali Shah Khan", score: "80.00%", grade: "A2 Grade", color: "#00b4d8" },
  { name: "Arsh Rinbloch", score: "68.71%", grade: "B2 Grade", color: "#38bdf8" },
  { name: "Anzar Khan Turk", score: "68.29%", grade: "B2 Grade", color: "#38bdf8" },
  { name: "Mohammad Bhata", score: "67.84%", grade: "B2 Grade", color: "#38bdf8" },
];

// Faculty Directory Data
const FACULTY = [
  {
    name: "Saqib Vidha Sir",
    role: "Director & Head Faculty",
    qualification: "BBA (Bachelor of Business Administration) | 5+ Years Exp.",
    subject: "Specialist: Mathematics & Accounts",
    phone: "7567277723",
    color: "#00b4d8"
  },
  {
    name: "Sahil Thank Sir",
    role: "Senior Faculty",
    qualification: "Language & Grammar Specialist",
    subject: "Specialist: English & Grammar",
    phone: "6355339655",
    color: "#38bdf8"
  },
  {
    name: "Aayush Pandya Sir",
    role: "Senior Faculty",
    qualification: "Conceptual Science Specialist",
    subject: "Specialist: Science & Technology",
    phone: "6355578905",
    color: "#f59e0b"
  }
];

// Comprehensive Gujarati Rules Dataset
const RULES_LIST = [
  "દરેક વિદ્યાર્થીઓએ સમયસર ક્લાસમાં હાજર થવું.",
  "કોઈપણ વિદ્યાર્થીએ ટ્યુશનમાં નાઈટસુટ પહેરીને આવવું નહીં.",
  "ટ્યુશન ક્લાસીસમાં મોબાઈલ ફોન, સ્માર્ટ વોચ કે અન્ય સ્માર્ટ ગેજેટ લાવવા સખત મનાઈ છે.",
  "ટ્યુશનમાં લેવાતી હાજરી (Attendance) માં નિયમિતતા રાખવી.",
  "આપેલ ગૃહકાર્ય (Homework) સમયસર પૂર્ણ કરી દરરોજ ચેક કરાવવું ફરજિયાત છે.",
  "ટ્યુશનમાં લેવાતી Monthly / Weekly Test રેગ્યુલર ભરવાની રહેશે. ટેસ્ટમાં ઓછા માર્ક્સ હશે ત્યારે જરૂર જણાતાં સુધારાત્મક પગલાં લેવાશે.",
  "જો જરૂર જણાશે તો વિદ્યાર્થીઓના હિત માટે રવિવારની રજા રદ કરી એક્સ્ટ્રા ક્લાસ રાખવામાં આવશે.",
  "શાળામાં તથા ટ્યુશનમાં લેવાતી વીકલી ટેસ્ટના પેપર્સ વાલીની સહી કરાવી ઘરે એક ફોલ્ડર બનાવી સાચવીને રાખવા.",
  "જરૂરિયાત અનુસાર પેરેન્ટ્સ મિટિંગ (PTM) ગોઠવવામાં આવતાં વાલીશ્રીઓએ અચૂક હાજરી આપવી.",
  "વિદ્યાર્થીઓએ પોતાના વાહન પાર્કિંગ વ્યવસ્થિત નિયત જગ્યાએ પાર્ક કરવા.",
  "ટ્યુશન ક્લાસીસનું માસિક ફી ધોરણ અતિ વ્યાજબી હોવાથી તેમાં કોઈપણ જાતનો ફેરફાર કરવામાં આવશે નહીં.",
  "ટ્યુશન ફી દર માસની શરૂઆતમાં તારીખ ૧ થી ૧૦ સુધીમાં ભરી પહોંચ મેળવી લેવી, નહીંતર લેટ ફી બદલ રૂ. ૧૦૦ પેનલ્ટી ચૂકવવી પડશે.",
  "કોઈપણ વિદ્યાર્થીને ગૃહકાર્ય કર્યા વગર ક્લાસરૂમમાં પ્રવેશ મળશે નહીં.",
  "કોઈપણ વિષયમાં જો કશું ન સમજાય તો તે તેજ દિવસે અથવા બીજા દિવસે સોલ્વ કરાવી લેવું.",
  "જો કોઈ વિદ્યાર્થી ગેરહાજર રહેવાના હોય તો તે અંગે અગાઉથી પરવાનગી લેવી ફરજિયાત છે (એક માસમાં ૪ થી વધુ રજા મળશે નહીં).",
  "કલાસીસ શરૂ થયાના પ્રથમ દિવસ દરમિયાન આપેલ એડમિશન ફોર્મ સાથે વિદ્યાર્થીનો ફોટો, આધારકાર્ડની નકલ, નિયમ સંમતિ પત્ર અને અગાઉના પરિણામની નકલ જોડવી ફરજિયાત છે."
];

export default function App() {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  const getFrameSrc = (index) => {
    const pad = String(index).padStart(3, "0");
    return `${FOLDER_PATH}/ezgif-frame-${pad}.jpg`;
  };

  // Preload frames for smooth zero-lag scrolling
  useEffect(() => {
    let loaded = 0;
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        loaded++;
        setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
        if (loaded === TOTAL_FRAMES) setIsLoading(false);
      };
      img.onerror = () => {
        loaded++;
        if (loaded === TOTAL_FRAMES) setIsLoading(false);
      };
    }
  }, []);

  // Global smooth scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const trackHeight = windowHeight * 3; // 400vh total track - 100vh viewport

      let progress = scrollTop / trackHeight;
      progress = Math.max(0, Math.min(progress, 1));
      setScrollProgress(progress);

      const frameIdx = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.floor(progress * TOTAL_FRAMES) + 1)
      );

      setCurrentFrame(frameIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // WhatsApp Admission Lead Form Submission
  const handleDemoBooking = (e) => {
    e.preventDefault();
    const name = document.getElementById("demoName").value.trim() || "Student";
    const std = document.getElementById("demoGrade").value;
    const medium = document.getElementById("demoMedium").value;
    const phone = document.getElementById("demoPhone").value.trim();

    const msg = `*New Admission Inquiry - The Sky Tuition Classes*\n\n` +
      `*Student Name:* ${name}\n` +
      `*Standard / Course:* ${std}\n` +
      `*Medium:* ${medium}\n` +
      `*Parent Contact:* ${phone}\n\n` +
      `I want to book a Free Demo Class / Session.`;

    window.open(`https://wa.me/917567277723?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div style={{ backgroundColor: "#040d1a", color: "#f8fafc", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      
      {/* Loading Progress Screen */}
      {isLoading && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99999, background: "#040d1a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <h2 style={{ color: "#00b4d8", marginBottom: "1rem", letterSpacing: "2px" }}>THE SKY TUITION CLASSES</h2>
          <div style={{ width: "240px", height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "4px", overflow: "hidden" }}>
            <div style={{ width: `${loadProgress}%`, height: "100%", background: "#00b4d8", transition: "width 0.2s" }} />
          </div>
          <span style={{ fontSize: "0.85rem", marginTop: "0.6rem", color: "#94a3b8" }}>Loading Experience {loadProgress}%</span>
        </div>
      )}

      {/* Sticky Header Navigation */}
      <nav style={{
        position: "fixed", top: 0, width: "100%", padding: "0.85rem 6%", display: "flex",
        justifyContent: "space-between", alignItems: "center", zIndex: 1000,
        background: "rgba(4, 13, 26, 0.9)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(0, 180, 216, 0.25)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src="/logo.png"
            alt="The Sky Tuition Classes Logo"
            onError={(e) => { e.target.style.display = 'none'; }}
            style={{ width: "42px", height: "42px", borderRadius: "50%", objectFit: "cover", border: "1px solid #00b4d8" }}
          />
          <div>
            <div style={{ fontWeight: 800, fontSize: "1.2rem", letterSpacing: "1px", color: "#fff" }}>
              THE <span style={{ color: "#00b4d8" }}>SKY</span>
            </div>
            <div style={{ fontSize: "0.62rem", letterSpacing: "1.5px", color: "#94a3b8" }}>
              TUITION CLASSES • "TIME TO SHINE"
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
          <a href="#results" style={{ color: "#cbd5e1", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600 }}>Results</a>
          <a href="#courses" style={{ color: "#cbd5e1", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600 }}>Courses</a>
          <a href="#faculty" style={{ color: "#cbd5e1", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600 }}>Faculty</a>
          <a href="#vacation" style={{ color: "#cbd5e1", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600 }}>Activity Camp</a>
          <a href="#register" style={{
            background: "linear-gradient(135deg, #0077b6, #00b4d8)", color: "#fff",
            padding: "0.55rem 1.3rem", borderRadius: "20px", textDecoration: "none", fontWeight: 700, fontSize: "0.85rem",
            boxShadow: "0 4px 15px rgba(0, 180, 216, 0.3)"
          }}>
            Book Free Demo
          </a>
        </div>
      </nav>

      {/* 3D Scrollytelling Visual Track (400vh) */}
      <div style={{ height: "400vh", position: "relative" }}>
        <div style={{ position: "sticky", top: 0, width: "100vw", height: "100vh", overflow: "hidden" }}>
          
          <img
            src={getFrameSrc(currentFrame)}
            alt={`Student Journey Animation ${currentFrame}`}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />

          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(circle at center, transparent 35%, rgba(4, 13, 26, 0.85) 100%)"
          }} />

          {/* STAGE 1 (0% - 25%) */}
          <div style={{
            position: "absolute", inset: 0, display: "flex", flexDirection: "column",
            justifyContent: "flex-end", alignItems: "center", textAlign: "center", paddingBottom: "5.5rem",
            opacity: scrollProgress < 0.25 ? 1 - scrollProgress * 4 : 0,
            pointerEvents: scrollProgress < 0.25 ? "auto" : "none",
            transition: "opacity 0.2s"
          }}>
            <span style={{ color: "#f59e0b", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", fontSize: "0.85rem", background: "rgba(4, 13, 26, 0.75)", padding: "5px 16px", borderRadius: "20px", border: "1px solid rgba(245, 158, 11, 0.35)" }}>
              ★ "Time to Shine" ★
            </span>
            <h1 style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)", fontWeight: 800, margin: "0.8rem 0 0.4rem", color: "#ffffff", textShadow: "0 4px 20px rgba(0, 0, 0, 0.9)" }}>
              From Stressed to <span style={{ color: "#00d2ff" }}>Unstoppable.</span>
            </h1>
            <p style={{ color: "#e2e8f0", maxWidth: "600px", fontSize: "1.05rem", textShadow: "0 2px 10px rgba(0,0,0,0.9)", background: "rgba(4, 13, 26, 0.65)", padding: "8px 18px", borderRadius: "12px" }}>
              Admissions Open 2026–27 | Std. 5 to 10 (All Subjects) & 11-12th Commerce (GSEB Eng/Guj Med)
            </p>
          </div>

          {/* STAGE 2 (25% - 55%) */}
          <div style={{
            position: "absolute", top: "50%", left: "6%", transform: "translateY(-50%)",
            opacity: scrollProgress >= 0.25 && scrollProgress < 0.55 ? 1 : 0,
            transition: "opacity 0.3s", maxWidth: "420px", pointerEvents: "none"
          }}>
            <div style={{ background: "rgba(10, 25, 48, 0.9)", padding: "2rem", borderRadius: "16px", border: "1px solid rgba(0, 180, 216, 0.4)", backdropFilter: "blur(12px)" }}>
              <span style={{ color: "#00b4d8", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "1px" }}>DEEP CONCEPT CLARITY</span>
              <h2 style={{ color: "#fff", fontSize: "1.7rem", margin: "0.4rem 0 0.8rem" }}>Personalized Mentorship</h2>
              <p style={{ color: "#cbd5e1", fontSize: "0.95rem", lineHeight: "1.5" }}>
                Direct personal guidance under Director <strong>Saqib Vidha</strong> and experienced subject faculties to clear every doubt promptly.
              </p>
            </div>
          </div>

          {/* STAGE 3 (55% - 80%) */}
          <div style={{
            position: "absolute", top: "50%", right: "6%", transform: "translateY(-50%)",
            opacity: scrollProgress >= 0.55 && scrollProgress < 0.8 ? 1 : 0,
            transition: "opacity 0.3s", maxWidth: "420px", pointerEvents: "none"
          }}>
            <div style={{ background: "rgba(10, 25, 48, 0.9)", padding: "2rem", borderRadius: "16px", border: "1px solid rgba(245, 158, 11, 0.4)", backdropFilter: "blur(12px)" }}>
              <span style={{ color: "#f59e0b", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "1px" }}>REGULAR EVALUATIONS</span>
              <h2 style={{ color: "#fff", fontSize: "1.7rem", margin: "0.4rem 0 0.8rem" }}>Weekly Test Series</h2>
              <p style={{ color: "#cbd5e1", fontSize: "0.95rem", lineHeight: "1.5" }}>
                Continuous assessment with signed parent progress folders, homework checks, and routine parent-teacher meetings.
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
            <h2 style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)", fontWeight: 800, textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}>
              Building Strong Foundations for a Bright Future.
            </h2>
            <p style={{ color: "#e2e8f0", margin: "0.8rem 0 1.8rem", maxWidth: "540px" }}>
              Join Junagadh’s premier tuition classes for proven excellence and disciplined growth.
            </p>
            <a
              href="#register"
              style={{
                background: "#25d366", color: "#fff", padding: "0.95rem 2.4rem", borderRadius: "30px",
                textDecoration: "none", fontWeight: 700, fontSize: "1.05rem", boxShadow: "0 8px 25px rgba(37, 211, 102, 0.35)"
              }}
            >
              Book Free Demo on WhatsApp
            </a>
          </div>

        </div>
      </div>

      {/* 3 Core Pillars */}
      <section style={{ padding: "4.5rem 6%", background: "linear-gradient(180deg, #040d1a 0%, #08172e 100%)" }}>
        <div style={{ maxWidth: "1200px", margin: "auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          
          <div style={{ background: "rgba(10, 25, 48, 0.65)", padding: "2.2rem", borderRadius: "18px", border: "1px solid rgba(0, 180, 216, 0.25)" }}>
            <div style={{ fontSize: "2.4rem", marginBottom: "0.8rem" }}>📖</div>
            <h3 style={{ fontSize: "1.4rem", marginBottom: "0.5rem", color: "#00b4d8" }}>EDUCATION</h3>
            <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: "1.6" }}>
              Concept-first foundation in Mathematics, Science, and Commerce subjects for GSEB English & Gujarati medium students.
            </p>
          </div>

          <div style={{ background: "rgba(10, 25, 48, 0.65)", padding: "2.2rem", borderRadius: "18px", border: "1px solid rgba(0, 180, 216, 0.25)" }}>
            <div style={{ fontSize: "2.4rem", marginBottom: "0.8rem" }}>🎯</div>
            <h3 style={{ fontSize: "1.4rem", marginBottom: "0.5rem", color: "#38bdf8" }}>DISCIPLINE</h3>
            <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: "1.6" }}>
              Mandatory attendance tracking, strictly checked homework, dress code adherence, and complete ban on digital distractions.
            </p>
          </div>

          <div style={{ background: "rgba(10, 25, 48, 0.65)", padding: "2.2rem", borderRadius: "18px", border: "1px solid rgba(0, 180, 216, 0.25)" }}>
            <div style={{ fontSize: "2.4rem", marginBottom: "0.8rem" }}>📈</div>
            <h3 style={{ fontSize: "1.4rem", marginBottom: "0.5rem", color: "#f59e0b" }}>FUTURE</h3>
            <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: "1.6" }}>
              Equipping young minds with logical reasoning, computer literacy, and analytical skills for top board exam scores.
            </p>
          </div>

        </div>
      </section>

      {/* Board Achievements & Toppers Wall */}
      <section id="results" style={{ padding: "5rem 6%", background: "#040d1a" }}>
        <div style={{ maxWidth: "1200px", margin: "auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span style={{ color: "#f59e0b", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", fontSize: "0.85rem" }}>
              HALL OF FAME
            </span>
            <h2 style={{ fontSize: "2.4rem", margin: "0.5rem 0", color: "#fff" }}>Stars of The Sky Tuition Classes</h2>
            <p style={{ color: "#94a3b8" }}>Celebrating our outstanding academic performers in GSEB Board Examinations</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.5rem" }}>
            {TOPPERS.map((topper, idx) => (
              <div
                key={idx}
                style={{
                  background: "linear-gradient(145deg, rgba(10, 25, 48, 0.8), rgba(6, 18, 36, 0.9))",
                  border: "1px solid rgba(0, 180, 216, 0.25)",
                  borderRadius: "14px",
                  padding: "1.5rem 1rem",
                  textAlign: "center",
                  position: "relative"
                }}
              >
                <div style={{
                  position: "absolute", top: "10px", right: "10px", fontSize: "0.7rem", fontWeight: 700,
                  color: topper.color,
                  background: "rgba(0,0,0,0.45)", padding: "2px 8px", borderRadius: "10px", border: `1px solid ${topper.color}40`
                }}>
                  {topper.grade}
                </div>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🎓</div>
                <h4 style={{ color: "#fff", fontSize: "1.05rem", margin: "0.2rem 0" }}>{topper.name}</h4>
                <div style={{ color: topper.color, fontSize: "1.35rem", fontWeight: 800, marginTop: "0.4rem" }}>
                  {topper.score}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses & Academic Offerings */}
      <section id="courses" style={{ padding: "5rem 6%", background: "#061224" }}>
        <div style={{ maxWidth: "1200px", margin: "auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span style={{ color: "#00b4d8", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", fontSize: "0.85rem" }}>
              ACADEMIC OFFERINGS
            </span>
            <h2 style={{ fontSize: "2.4rem", margin: "0.5rem 0", color: "#fff" }}>Standards & Curriculum</h2>
            <p style={{ color: "#94a3b8" }}>GSEB Board • English & Gujarati Medium Batches</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
            <div style={{ background: "rgba(10, 25, 48, 0.85)", padding: "2.5rem", borderRadius: "18px", border: "1px solid rgba(0, 180, 216, 0.3)" }}>
              <span style={{ background: "#00b4d8", color: "#fff", padding: "4px 12px", borderRadius: "12px", fontSize: "0.8rem", fontWeight: 700 }}>PRIMARY & SECONDARY</span>
              <h3 style={{ fontSize: "1.8rem", margin: "1rem 0 0.5rem", color: "#fff" }}>Std. 5th to 10th</h3>
              <p style={{ color: "#94a3b8", fontSize: "0.95rem", marginBottom: "1.2rem" }}>Comprehensive coaching for all core subjects with weekly tests and individual doubt clearance.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {["Mathematics", "Science", "English", "Gujarati", "Hindi", "Sanskrit"].map((sub, i) => (
                  <span key={i} style={{ background: "rgba(0, 180, 216, 0.15)", color: "#38bdf8", padding: "4px 10px", borderRadius: "8px", fontSize: "0.85rem" }}>
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ background: "rgba(10, 25, 48, 0.85)", padding: "2.5rem", borderRadius: "18px", border: "1px solid rgba(245, 158, 11, 0.3)" }}>
              <span style={{ background: "#f59e0b", color: "#fff", padding: "4px 12px", borderRadius: "12px", fontSize: "0.8rem", fontWeight: 700 }}>HIGHER SECONDARY</span>
              <h3 style={{ fontSize: "1.8rem", margin: "1rem 0 0.5rem", color: "#fff" }}>Std. 11th & 12th Commerce</h3>
              <p style={{ color: "#94a3b8", fontSize: "0.95rem", marginBottom: "1.2rem" }}>Specialized coaching designed for commerce board aspirants, analytical mastery, and career readiness.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {["Accountancy", "Statistics", "Economics", "B.A.", "English", "Gujarati"].map((sub, i) => (
                  <span key={i} style={{ background: "rgba(245, 158, 11, 0.15)", color: "#fcd34d", padding: "4px 10px", borderRadius: "8px", fontSize: "0.85rem" }}>
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Key Value Additions */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.2rem" }}>
            {[
              { icon: "🎁", title: "Free Academic Demos", desc: "Experience interactive classroom lectures before enrollment" },
              { icon: "📚", title: "Mini In-House Library", desc: "Access to reference books, past papers, & revision material" },
              { icon: "🖥️", title: "Computer Learning", desc: "Projector visual education and digital fundamentals" },
              { icon: "💳", title: "Nominal Monthly Fees", desc: "Reasonable fees with convenient monthly installment system" }
            ].map((item, idx) => (
              <div key={idx} style={{ background: "rgba(10, 25, 48, 0.5)", padding: "1.5rem", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>{item.icon}</div>
                <h4 style={{ color: "#fff", fontSize: "1.05rem", marginBottom: "0.3rem" }}>{item.title}</h4>
                <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Director & Faculty Showcase */}
      <section id="faculty" style={{ padding: "5rem 6%", background: "#040d1a" }}>
        <div style={{ maxWidth: "1200px", margin: "auto" }}>
          
          {/* Director Showcase */}
          <div style={{
            background: "linear-gradient(145deg, rgba(10, 25, 48, 0.95), rgba(6, 18, 36, 0.95))",
            borderRadius: "20px",
            border: "1px solid rgba(0, 180, 216, 0.35)",
            padding: "3rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2.5rem",
            alignItems: "center",
            marginBottom: "4rem"
          }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src="/director.jpg"
                alt="Director Saqib Vidha"
                onError={(e) => { e.target.style.display = 'none'; }}
                style={{
                  width: "220px",
                  height: "260px",
                  objectFit: "cover",
                  borderRadius: "16px",
                  border: "2px solid #00b4d8",
                  boxShadow: "0 8px 30px rgba(0, 180, 216, 0.25)"
                }}
              />
            </div>
            <div>
              <span style={{ color: "#00b4d8", fontWeight: 700, letterSpacing: "1.5px", fontSize: "0.85rem" }}>DIRECTOR PROFILE</span>
              <h2 style={{ fontSize: "2.2rem", margin: "0.4rem 0 0.8rem", color: "#fff" }}>Saqib Vidha Sir</h2>
              <p style={{ color: "#38bdf8", fontWeight: 600, fontSize: "1rem", marginBottom: "1rem" }}>
                Bachelor of Business Administration (BBA) • 5+ Years Teaching Experience
              </p>
              <p style={{ color: "#cbd5e1", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                Dedicated to mentoring students in Mathematics and Commerce with concept-driven clarity. Leading The Sky Tuition Classes to deliver academic discipline, structured assessment, and overall personal growth.
              </p>
              <a href="tel:7567277723" style={{ background: "#00b4d8", color: "#fff", padding: "0.6rem 1.4rem", borderRadius: "20px", textDecoration: "none", fontWeight: 700, fontSize: "0.9rem" }}>
                📞 Connect: +91 75672 77723
              </a>
            </div>
          </div>

          {/* Faculty Team Cards */}
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h3 style={{ fontSize: "2rem", color: "#fff" }}>Expert Faculty Directory</h3>
            <p style={{ color: "#94a3b8", fontSize: "0.95rem", marginTop: "0.4rem" }}>
              📞 Calling Windows: 05:00 PM – 05:30 PM & 07:30 PM – 08:00 PM (No calls during active lectures)
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.8rem" }}>
            {FACULTY.map((f, i) => (
              <div key={i} style={{ background: "rgba(10, 25, 48, 0.65)", padding: "2rem", borderRadius: "16px", border: `1px solid ${f.color}40` }}>
                <div style={{ color: f.color, fontSize: "0.85rem", fontWeight: 700 }}>{f.role}</div>
                <h4 style={{ fontSize: "1.4rem", color: "#fff", margin: "0.4rem 0" }}>{f.name}</h4>
                <div style={{ color: "#cbd5e1", fontSize: "0.9rem", marginBottom: "0.6rem" }}>{f.qualification}</div>
                <div style={{ background: `${f.color}20`, color: f.color, padding: "4px 10px", borderRadius: "6px", display: "inline-block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "1.2rem" }}>
                  {f.subject}
                </div>
                <div>
                  <a href={`tel:${f.phone}`} style={{ color: "#cbd5e1", textDecoration: "none", fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "6px" }}>
                    📞 +91 {f.phone.slice(0, 5)} {f.phone.slice(5)}
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Vacation Activity - Indoor Sports Week */}
      <section id="vacation" style={{ padding: "5rem 6%", background: "linear-gradient(180deg, #061224 0%, #0a1f3d 100%)" }}>
        <div style={{ maxWidth: "1200px", margin: "auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={{ color: "#f59e0b", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", fontSize: "0.85rem" }}>
              શિક્ષણ સાથે ગમ્મત
            </span>
            <h2 style={{ fontSize: "2.4rem", margin: "0.5rem 0", color: "#fff" }}>Indoor Sports & Activity Week</h2>
            <p style={{ color: "#cbd5e1", maxWidth: "600px", margin: "auto" }}>
              Annual 1-Week Skill Enrichment Camp organized by The Sky Tuition Classes
            </p>
          </div>

          <div style={{
            background: "rgba(10, 25, 48, 0.8)",
            borderRadius: "20px",
            border: "1px solid rgba(245, 158, 11, 0.35)",
            padding: "2.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2.5rem"
          }}>
            <div>
              <h3 style={{ color: "#f59e0b", fontSize: "1.4rem", marginBottom: "1rem" }}>Key Modules & Activities</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", color: "#e2e8f0", fontSize: "0.95rem" }}>
                <div>👨‍🔬 <strong>Basic Fundamentals of Mathematics</strong></div>
                <div>🗣️ <strong>Interactive Quiz Rounds & Group Discussions</strong></div>
                <div>🙋🏻‍♂️ <strong>GK with Logical Reasoning Sessions</strong></div>
                <div>💡 <strong>Research & Student Innovation Projects</strong></div>
                <div>👥 <strong>Carrom Championship & Brain Storming Games</strong></div>
                <div>📝 <strong>Language Focus:</strong> Gujarati, Hindi, English, Sanskrit</div>
                <div>🏆 <strong>OX Game Session</strong> with District Champion</div>
                <div>🎥 <strong>Projectorized Visual Education</strong></div>
              </div>
            </div>

            <div style={{ background: "rgba(4, 13, 26, 0.8)", padding: "2rem", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <span style={{ color: "#00b4d8", fontSize: "0.85rem", fontWeight: 700 }}>EVENT DETAILS</span>
                <h4 style={{ fontSize: "1.5rem", color: "#fff", margin: "0.5rem 0 1rem" }}>Schedule & Venue</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", color: "#cbd5e1", fontSize: "0.95rem" }}>
                  <div>⌛ <strong>Duration:</strong> 1 Week (Starts 24th April)</div>
                  <div>⏰ <strong>Timings:</strong> 05:30 PM to 07:30 PM</div>
                  <div>📍 <strong>Venue:</strong> The Sky Tuition Classes, Nr. Collector Office, Sardarbag, Junagadh</div>
                </div>
              </div>
              <a
                href="https://wa.me/917567277723?text=Hello%20Saqib%20Sir,%20I%20want%20to%20register%20for%20the%20Vacation%20Indoor%20Sports%20Week"
                target="_blank"
                rel="noreferrer"
                style={{
                  marginTop: "1.5rem", background: "#f59e0b", color: "#000", padding: "0.85rem", borderRadius: "10px",
                  textAlign: "center", textDecoration: "none", fontWeight: 700, fontSize: "0.95rem"
                }}
              >
                Register for Vacation Camp on WhatsApp
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Rules & Library Showcase */}
      <section style={{ padding: "4.5rem 6%", background: "#040d1a" }}>
        <div style={{ maxWidth: "1200px", margin: "auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2.5rem", alignItems: "center" }}>
          
          <div style={{ background: "rgba(10, 25, 48, 0.7)", padding: "2.5rem", borderRadius: "18px", border: "1px solid rgba(0, 180, 216, 0.3)" }}>
            <span style={{ color: "#00b4d8", fontSize: "0.85rem", fontWeight: 700 }}>CODE OF CONDUCT</span>
            <h3 style={{ fontSize: "1.8rem", color: "#fff", margin: "0.5rem 0 1rem" }}>Student & Parent Guidelines</h3>
            <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "1.5rem" }}>
              To ensure academic discipline and top board scores, every student and parent is required to maintain strict adherence to attendance, regular homework, test files, and classroom guidelines.
            </p>
            <button
              onClick={() => setShowRulesModal(true)}
              style={{
                background: "transparent", color: "#00b4d8", border: "2px solid #00b4d8", padding: "0.75rem 1.5rem",
                borderRadius: "20px", fontWeight: 700, cursor: "pointer", fontSize: "0.9rem"
              }}
            >
              📜 View Full Rules & Regulations (નિયમો)
            </button>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src="/library.jpg"
              alt="Classroom and Reference Library"
              onError={(e) => { e.target.style.display = 'none'; }}
              style={{
                width: "100%",
                maxHeight: "340px",
                objectFit: "cover",
                borderRadius: "16px",
                border: "1px solid rgba(0, 180, 216, 0.25)"
              }}
            />
          </div>

        </div>
      </section>

      {/* Gujarati Rules Modal */}
      {showRulesModal && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
        }}>
          <div style={{
            background: "#08172e", border: "1px solid rgba(0, 180, 216, 0.4)", borderRadius: "20px",
            maxWidth: "700px", width: "100%", maxHeight: "85vh", display: "flex", flexDirection: "column"
          }}>
            <div style={{ padding: "1.5rem 2rem", borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ color: "#fff", fontSize: "1.3rem" }}>The Sky Tuition Classes - નિયમાવલી</h3>
              <button onClick={() => setShowRulesModal(false)} style={{ background: "none", border: "none", color: "#94a3b8", fontSize: "1.5rem", cursor: "pointer" }}>✕</button>
            </div>
            <div style={{ padding: "2rem", overflowY: "auto", display: "flex", flexDirection: "column", gap: "1rem", color: "#cbd5e1", fontSize: "0.95rem" }}>
              {RULES_LIST.map((rule, idx) => (
                <div key={idx} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <span style={{ color: "#00b4d8", fontWeight: 700 }}>•</span>
                  <span>{rule}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: "1rem 2rem", borderTop: "1px solid rgba(255,255,255,0.1)", textAlign: "right" }}>
              <button
                onClick={() => setShowRulesModal(false)}
                style={{ background: "#00b4d8", color: "#fff", border: "none", padding: "0.5rem 1.5rem", borderRadius: "8px", fontWeight: 700, cursor: "pointer" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admission Registration Form */}
      <section id="register" style={{ padding: "5rem 6%", maxWidth: "1200px", margin: "auto" }}>
        <div style={{
          background: "linear-gradient(145deg, rgba(10, 25, 48, 0.95), rgba(6, 18, 36, 0.98))",
          border: "1px solid rgba(0, 180, 216, 0.35)", borderRadius: "24px", padding: "3rem",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3.5rem"
        }}>
          <div>
            <span style={{ color: "#00b4d8", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "1px" }}>CONTACT & ADMISSIONS</span>
            <h2 style={{ fontSize: "2.2rem", margin: "0.5rem 0 1.2rem" }}>The Sky Tuition Classes</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", color: "#cbd5e1", fontSize: "0.95rem" }}>
              <div>👤 <strong>Director:</strong> Saqib Vidha (BBA | 5+ Years Exp.)</div>
              <div>📞 <strong>Phone:</strong> <a href="tel:7567277723" style={{ color: "#00b4d8", textDecoration: "none" }}>+91 75672 77723</a></div>
              <div>✉️ <strong>Email:</strong> theskytuitionclasses@gmail.com</div>
              <div>📸 <strong>Instagram:</strong> <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: "#38bdf8", textDecoration: "none" }}>@the sky tuition classes</a></div>
              <div>📍 <strong>Address:</strong> Nr. Collector Office, Opp. Kohinoor Apartment, Ghanchipat, Sardarbag, Junagadh 362001</div>
              <div>⏰ <strong>Regular Lectures:</strong> Mon – Sat: 05:30 PM – 07:30 PM</div>
              <div>🏢 <strong>Office / Calling Hours:</strong> 07:30 PM – 08:00 PM</div>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Book a Free Academic Demo</h3>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: "1.5rem" }}>Limited seats per batch. Fill out the details to connect on WhatsApp.</p>
            
            <form onSubmit={handleDemoBooking} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <input
                id="demoName"
                type="text"
                placeholder="Student Full Name"
                required
                style={{ padding: "0.9rem", background: "#040d1a", border: "1px solid rgba(0, 180, 216, 0.25)", borderRadius: "8px", color: "#fff", outline: "none" }}
              />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <select
                  id="demoGrade"
                  style={{ padding: "0.9rem", background: "#040d1a", border: "1px solid rgba(0, 180, 216, 0.25)", borderRadius: "8px", color: "#fff", outline: "none" }}
                >
                  <option value="Std. 10th Board">Std. 10th (Board)</option>
                  <option value="Std. 12th Commerce">Std. 12th Commerce</option>
                  <option value="Std. 11th Commerce">Std. 11th Commerce</option>
                  <option value="Std. 9th Foundation">Std. 9th</option>
                  <option value="Std. 8th">Std. 8th</option>
                  <option value="Std. 5th - 7th">Std. 5th - 7th</option>
                </select>

                <select
                  id="demoMedium"
                  style={{ padding: "0.9rem", background: "#040d1a", border: "1px solid rgba(0, 180, 216, 0.25)", borderRadius: "8px", color: "#fff", outline: "none" }}
                >
                  <option value="English Medium (GSEB)">English Medium</option>
                  <option value="Gujarati Medium (GSEB)">Gujarati Medium</option>
                </select>
              </div>

              <input
                id="demoPhone"
                type="tel"
                placeholder="Parent WhatsApp Number"
                required
                style={{ padding: "0.9rem", background: "#040d1a", border: "1px solid rgba(0, 180, 216, 0.25)", borderRadius: "8px", color: "#fff", outline: "none" }}
              />

              <button
                type="submit"
                style={{
                  padding: "0.95rem", background: "#25d366", color: "#fff", border: "none", borderRadius: "8px",
                  fontWeight: 700, cursor: "pointer", fontSize: "1rem", marginTop: "0.5rem", boxShadow: "0 4px 15px rgba(37, 211, 102, 0.3)"
                }}
              >
                Submit Demo Request via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/917567277723?text=Hello%20Saqib%20Sir,%20I%20want%20to%20inquire%20about%20admissions%20at%20The%20Sky%20Tuition%20Classes"
        target="_blank"
        rel="noreferrer"
        style={{
          position: "fixed", bottom: "25px", right: "25px", background: "#25d366", color: "#fff",
          borderRadius: "50%", width: "55px", height: "55px", display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: "1.8rem", boxShadow: "0 4px 18px rgba(37,211,102,0.45)", zIndex: 999, textDecoration: "none"
        }}
      >
        💬
      </a>

      {/* Footer */}
      <footer style={{ padding: "2.5rem 6%", textAlign: "center", borderTop: "1px solid rgba(0, 180, 216, 0.15)", color: "#64748b", fontSize: "0.85rem" }}>
        © 2026 The Sky Tuition Classes. All Rights Reserved. • Sardarbag, Junagadh, Gujarat
      </footer>
    </div>
  );
}