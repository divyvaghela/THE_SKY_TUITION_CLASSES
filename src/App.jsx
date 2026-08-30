import React, { useEffect, useState, useMemo } from "react";
import "./App.css";

const TOTAL_FRAMES = 60;
const FOLDER_PATH = "/frames";

const TOPPERS = [
  { name: "Mustafa Jethva", score: "95.67%", grade: "A1", desc: "Top Scorer" },
  { name: "Arman Malek", score: "95.22%", grade: "A1", desc: "Mathematics Star" },
  { name: "Alveera Khan Turk", score: "94.00%", grade: "A1", desc: "Academic Excellence" },
  { name: "Ayan Sameja", score: "92.33%", grade: "A1", desc: "High Achiever" },
  { name: "Aayesha Aziz", score: "88.47%", grade: "A2", desc: "Science Distinction" },
  { name: "Mo. Faiz Khatri", score: "88.30%", grade: "A2", desc: "Language Mastery" },
  { name: "Rehan Motiwala", score: "84.56%", grade: "A2", desc: "Consistent Performer" },
  { name: "Ammar Motiwala", score: "83.89%", grade: "A2", desc: "Concept Pro" },
  { name: "Mo. Shabir Shoharvardi", score: "80.42%", grade: "A2", desc: "Analytical Mind" },
  { name: "Vali Shah Khan", score: "80.00%", grade: "A2", desc: "Dedicated Scholar" },
  { name: "Arsh Rinbloch", score: "68.71%", grade: "B2", desc: "Commerce Achiever" },
  { name: "Anzar Khan Turk", score: "68.29%", grade: "B2", desc: "Board Achiever" },
  { name: "Mohammad Bhata", score: "67.84%", grade: "B2", desc: "Board Achiever" },
];

const FACULTY = [
  {
    name: "Saqib Vidha Sir",
    role: "Director & Lead Faculty",
    qualification: "BBA (Bachelor of Business Administration) | 5+ Years Exp.",
    subject: "Specialist: Mathematics & Accountancy",
    phone: "7567277723",
    color: "#00b4d8"
  },
  {
    name: "Sahil Thank Sir",
    role: "Senior Faculty",
    qualification: "Language & Grammar Specialist",
    subject: "Specialist: English & Communication",
    phone: "6355339655",
    color: "#38bdf8"
  },
  {
    name: "Aayush Pandya Sir",
    role: "Senior Faculty",
    qualification: "Science & Concepts Specialist",
    subject: "Specialist: Science & Technology",
    phone: "6355578905",
    color: "#f59e0b"
  }
];

const RULES_LIST = [
  { cat: "શિસ્ત & સમય", rule: "દરેક વિદ્યાર્થીઓએ સમયસર ક્લાસમાં હાજર થવું." },
  { cat: "યુનિફોર્મ", rule: "કોઈપણ વિદ્યાર્થીએ ટ્યુશનમાં નાઈટસુટ કે અનૌપચારિક કપડાં પહેરીને આવવું નહીં." },
  { cat: "ગેજેટ પ્રતિબંધ", rule: "ટ્યુશન ક્લાસીસમાં મોબાઈલ ફોન, સ્માર્ટ વોચ કે અન્ય ગેજેટ્સ લાવવા સખત મનાઈ છે." },
  { cat: "હાજરી", rule: "દરરોજ લેવાતી હાજરી (Attendance) ની નોંધણીમાં નિયમિતતા રાખવી (મહિનામાં વધુમાં વધુ ૪ રજા પરવાનગી સાથે)." },
  { cat: "ગૃહકાર્ય", rule: "આપેલ ગૃહકાર્ય (Homework) દરરોજ સુવાચ્ય અક્ષરોમાં પૂર્ણ કરી ચેક કરાવવું ફરજિયાત છે." },
  { cat: "ટેસ્ટ સીરીઝ", rule: "નિયમિત લેવાતી Weekly અને Monthly ટેસ્ટ આપવી અનિવાર્ય છે. ટેસ્ટ પેપર્સ વાલીની સહી કરાવી ઘરે ફોલ્ડરમાં સાચવવા." },
  { cat: "એક્સ્ટ્રા ક્લાસ", rule: "વિદ્યાર્થીઓના શૈક્ષણિક સુધારા માટે જરૂર જણાય ત્યારે રવિવારની રજા રદ કરી એક્સ્ટ્રા ક્લાસ રાખવામાં આવશે." },
  { cat: "વાલી મિટિંગ", rule: "જરૂરિયાત અનુસાર પેરેન્ટ્સ મિટિંગ (PTM) ગોઠવવામાં આવતાં વાલીશ્રીઓએ અચૂક હાજરી આપવી." },
  { cat: "ફી પોલિસી", rule: "ટ્યુશન ફી દર માસની શરૂઆતમાં ૧ થી ૧૦ તારીખ સુધીમાં ભરી પહોંચ મેળવી લેવી (૧૦ પછી ₹૧૦૦ લેટ ફી લાગશે)." },
  { cat: "એડમિશન ડોક્યુમેન્ટ્સ", rule: "એડમિશન ફોર્મ સાથે ફોટો, આધારકાર્ડ ઝેરોક્ષ, નિયમ સંમતિ પત્ર અને અગાઉના રિઝલ્ટની નકલ જોડવી ફરજિયાત છે." }
];

export default function App() {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeGradeFilter, setActiveGradeFilter] = useState("ALL");
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [ruleSearch, setRuleSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  const getFrameSrc = (index) => {
    const pad = String(index).padStart(3, "0");
    return `${FOLDER_PATH}/ezgif-frame-${pad}.jpg`;
  };

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const trackHeight = windowHeight * 3;

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

  const filteredToppers = useMemo(() => {
    if (activeGradeFilter === "ALL") return TOPPERS;
    return TOPPERS.filter((t) => t.grade === activeGradeFilter);
  }, [activeGradeFilter]);

  const filteredRules = useMemo(() => {
    if (!ruleSearch.trim()) return RULES_LIST;
    return RULES_LIST.filter(
      (r) => r.rule.toLowerCase().includes(ruleSearch.toLowerCase()) || r.cat.toLowerCase().includes(ruleSearch.toLowerCase())
    );
  }, [ruleSearch]);

  const handleDemoBooking = (e) => {
    e.preventDefault();
    const name = document.getElementById("demoName").value.trim() || "Student";
    const std = document.getElementById("demoGrade").value;
    const medium = document.getElementById("demoMedium").value;
    const phone = document.getElementById("demoPhone").value.trim();

    const msg = `*Admission Inquiry - The Sky Tuition Classes*\n\n` +
      `*Student Name:* ${name}\n` +
      `*Standard:* ${std}\n` +
      `*Medium:* ${medium}\n` +
      `*Parent Contact:* ${phone}\n\n` +
      `I want to book a Free Demo Lecture.`;

    window.open(`https://wa.me/917567277723?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div>
      {/* Preload Overlay */}
      {isLoading && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99999, background: "#040d1a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <h2 style={{ color: "#00b4d8", marginBottom: "1rem", letterSpacing: "2px", fontSize: "1.3rem" }}>THE SKY TUITION CLASSES</h2>
          <div style={{ width: "240px", height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "4px", overflow: "hidden" }}>
            <div style={{ width: `${loadProgress}%`, height: "100%", background: "#00b4d8", transition: "width 0.2s" }} />
          </div>
          <span style={{ fontSize: "0.85rem", marginTop: "0.8rem", color: "#94a3b8" }}>Loading Experience {loadProgress}%</span>
        </div>
      )}

      {/* Header Navigation */}
      <nav style={{
        position: "fixed", top: 0, width: "100%", padding: "0.8rem 6%", display: "flex",
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
            <div style={{ fontWeight: 800, fontSize: "1.15rem", letterSpacing: "1px" }}>
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
          <a href="#vacation" style={{ color: "#cbd5e1", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600 }}>Vacation Camp</a>
          <a href="#register" className="btn-primary" style={{ padding: "0.5rem 1.2rem", fontSize: "0.85rem" }}>
            Book Demo
          </a>
        </div>
      </nav>

      {/* 3D Scrollytelling Visual Canvas */}
      <div style={{ height: "400vh", position: "relative" }}>
        <div style={{ position: "sticky", top: 0, width: "100vw", height: "100vh", overflow: "hidden" }}>
          
          <img
            src={getFrameSrc(currentFrame)}
            alt={`Scrollytelling Frame ${currentFrame}`}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />

          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(circle at center, transparent 35%, rgba(4, 13, 26, 0.88) 100%)"
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
            <h1 style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)", fontWeight: 800, margin: "0.8rem 0 0.4rem", textShadow: "0 4px 20px rgba(0,0,0,0.9)" }}>
              From Stressed to <span style={{ color: "#00d2ff" }}>Unstoppable.</span>
            </h1>
            <p style={{ color: "#e2e8f0", maxWidth: "600px", fontSize: "1.05rem", background: "rgba(4, 13, 26, 0.65)", padding: "8px 18px", borderRadius: "12px" }}>
              Admissions Open 2026–27 | Std. 5 to 10 (All Subjects) & 11-12th Commerce (GSEB Eng/Guj Med)
            </p>
          </div>

          {/* STAGE 2 (25% - 55%) */}
          <div style={{
            position: "absolute", top: "50%", left: "6%", transform: "translateY(-50%)",
            opacity: scrollProgress >= 0.25 && scrollProgress < 0.55 ? 1 : 0,
            transition: "opacity 0.3s", maxWidth: "420px", pointerEvents: "none"
          }}>
            <div className="glass-card" style={{ padding: "2rem" }}>
              <span style={{ color: "#00b4d8", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "1px" }}>DEEP CONCEPT CLARITY</span>
              <h2 style={{ fontSize: "1.7rem", margin: "0.4rem 0 0.8rem" }}>Personalized Mentorship</h2>
              <p style={{ color: "#cbd5e1", fontSize: "0.95rem", lineHeight: "1.5" }}>
                Direct guidance under Director <strong>Saqib Vidha</strong> and dedicated faculties to clear fundamentals on the same day.
              </p>
            </div>
          </div>

          {/* STAGE 3 (55% - 80%) */}
          <div style={{
            position: "absolute", top: "50%", right: "6%", transform: "translateY(-50%)",
            opacity: scrollProgress >= 0.55 && scrollProgress < 0.8 ? 1 : 0,
            transition: "opacity 0.3s", maxWidth: "420px", pointerEvents: "none"
          }}>
            <div className="glass-card" style={{ padding: "2rem", borderColor: "rgba(245, 158, 11, 0.4)" }}>
              <span style={{ color: "#f59e0b", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "1px" }}>REGULAR EVALUATIONS</span>
              <h2 style={{ fontSize: "1.7rem", margin: "0.4rem 0 0.8rem" }}>Weekly Test Series</h2>
              <p style={{ color: "#cbd5e1", fontSize: "0.95rem", lineHeight: "1.5" }}>
                Weekly test papers signed by parents, maintained in home progress files with regular parent-teacher feedback sessions.
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
            <h2 style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)", fontWeight: 800 }}>
              Building Strong Foundations for a Bright Future.
            </h2>
            <p style={{ color: "#e2e8f0", margin: "0.8rem 0 1.8rem", maxWidth: "540px" }}>
              Enroll with Junagadh's most dedicated faculty team for disciplined board preparation.
            </p>
            <a href="#register" className="btn-whatsapp">
              Book Free Academic Demo on WhatsApp
            </a>
          </div>

        </div>
      </div>

      {/* 3 Pillars Section */}
      <section style={{ padding: "4.5rem 6%", background: "linear-gradient(180deg, #040d1a 0%, #08172e 100%)" }}>
        <div style={{ maxWidth: "1200px", margin: "auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          
          <div className="glass-card" style={{ padding: "2.2rem" }}>
            <div style={{ fontSize: "2.4rem", marginBottom: "0.8rem" }}>📖</div>
            <h3 style={{ fontSize: "1.4rem", marginBottom: "0.5rem", color: "#00b4d8" }}>EDUCATION</h3>
            <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: "1.6" }}>
              Core conceptual clarity in Mathematics, Science, and Commerce for GSEB English & Gujarati mediums.
            </p>
          </div>

          <div className="glass-card" style={{ padding: "2.2rem" }}>
            <div style={{ fontSize: "2.4rem", marginBottom: "0.8rem" }}>🎯</div>
            <h3 style={{ fontSize: "1.4rem", marginBottom: "0.5rem", color: "#38bdf8" }}>DISCIPLINE</h3>
            <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: "1.6" }}>
              Strict attendance tracking, everyday homework verification, proper student attire, and no electronic gadgets.
            </p>
          </div>

          <div className="glass-card" style={{ padding: "2.2rem" }}>
            <div style={{ fontSize: "2.4rem", marginBottom: "0.8rem" }}>📈</div>
            <h3 style={{ fontSize: "1.4rem", marginBottom: "0.5rem", color: "#f59e0b" }}>FUTURE</h3>
            <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: "1.6" }}>
              Fostering logical problem-solving, computer skills, and test confidence for high GSEB board percentiles.
            </p>
          </div>

        </div>
      </section>

      {/* Results & Interactive Hall of Fame */}
      <section id="results" style={{ padding: "5rem 6%", background: "#040d1a" }}>
        <div style={{ maxWidth: "1200px", margin: "auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span style={{ color: "#f59e0b", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", fontSize: "0.85rem" }}>
              HALL OF FAME
            </span>
            <h2 style={{ fontSize: "2.4rem", margin: "0.5rem 0", color: "#fff" }}>Stars of The Sky Tuition Classes</h2>
            <p style={{ color: "#94a3b8" }}>Celebrating our outstanding academic achievers in GSEB Board Examinations</p>

            {/* Filter Tabs */}
            <div style={{ display: "inline-flex", gap: "10px", marginTop: "1.8rem", background: "rgba(10, 25, 48, 0.8)", padding: "6px", borderRadius: "30px", border: "1px solid rgba(0, 180, 216, 0.3)" }}>
              {["ALL", "A1", "A2", "B2"].map((grade) => (
                <button
                  key={grade}
                  onClick={() => setActiveGradeFilter(grade)}
                  style={{
                    background: activeGradeFilter === grade ? "#00b4d8" : "transparent",
                    color: activeGradeFilter === grade ? "#fff" : "#94a3b8",
                    border: "none",
                    padding: "6px 18px",
                    borderRadius: "20px",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  {grade === "ALL" ? "All Toppers" : `${grade} Grade`}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.5rem" }}>
            {filteredToppers.map((topper, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: "1.6rem 1rem",
                  textAlign: "center",
                  position: "relative"
                }}
              >
                <div style={{
                  position: "absolute", top: "10px", right: "10px", fontSize: "0.7rem", fontWeight: 700,
                  color: topper.grade === "A1" ? "#f59e0b" : "#00b4d8",
                  background: "rgba(0,0,0,0.5)", padding: "2px 8px", borderRadius: "10px",
                  border: `1px solid ${topper.grade === "A1" ? "#f59e0b40" : "#00b4d840"}`
                }}>
                  {topper.grade} Grade
                </div>
                <div style={{ fontSize: "2rem", marginBottom: "0.4rem" }}>🎓</div>
                <h4 style={{ color: "#fff", fontSize: "1.05rem", margin: "0.2rem 0" }}>{topper.name}</h4>
                <div style={{ color: topper.grade === "A1" ? "#f59e0b" : "#00b4d8", fontSize: "1.4rem", fontWeight: 800, margin: "0.3rem 0" }}>
                  {topper.score}
                </div>
                <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{topper.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses & Facilities */}
      <section id="courses" style={{ padding: "5rem 6%", background: "#061224" }}>
        <div style={{ maxWidth: "1200px", margin: "auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span style={{ color: "#00b4d8", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", fontSize: "0.85rem" }}>
              ACADEMIC OFFERINGS
            </span>
            <h2 style={{ fontSize: "2.4rem", margin: "0.5rem 0" }}>Standards & Curriculum</h2>
            <p style={{ color: "#94a3b8" }}>GSEB Board • English & Gujarati Medium Batches</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
            <div className="glass-card" style={{ padding: "2.5rem" }}>
              <span style={{ background: "#00b4d8", color: "#fff", padding: "4px 12px", borderRadius: "12px", fontSize: "0.8rem", fontWeight: 700 }}>PRIMARY & SECONDARY</span>
              <h3 style={{ fontSize: "1.8rem", margin: "1rem 0 0.5rem" }}>Std. 5th to 10th</h3>
              <p style={{ color: "#94a3b8", fontSize: "0.95rem", marginBottom: "1.2rem" }}>Coaching for all core subjects with weekly tests and individual doubt-solving.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {["Mathematics", "Science", "English", "Gujarati", "Hindi", "Sanskrit"].map((sub, i) => (
                  <span key={i} style={{ background: "rgba(0, 180, 216, 0.15)", color: "#38bdf8", padding: "4px 10px", borderRadius: "8px", fontSize: "0.85rem" }}>
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-card" style={{ padding: "2.5rem", borderColor: "rgba(245, 158, 11, 0.3)" }}>
              <span style={{ background: "#f59e0b", color: "#fff", padding: "4px 12px", borderRadius: "12px", fontSize: "0.8rem", fontWeight: 700 }}>HIGHER SECONDARY</span>
              <h3 style={{ fontSize: "1.8rem", margin: "1rem 0 0.5rem" }}>Std. 11th & 12th Commerce</h3>
              <p style={{ color: "#94a3b8", fontSize: "0.95rem", marginBottom: "1.2rem" }}>Specialized coaching designed for commerce board exams with practical accountancy focus.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {["Accountancy", "Statistics", "Economics", "B.A.", "English", "Gujarati"].map((sub, i) => (
                  <span key={i} style={{ background: "rgba(245, 158, 11, 0.15)", color: "#fcd34d", padding: "4px 10px", borderRadius: "8px", fontSize: "0.85rem" }}>
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Value Features */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.2rem" }}>
            {[
              { icon: "🎁", title: "Free Academic Demos", desc: "Experience interactive lectures before enrollment" },
              { icon: "📚", title: "Mini In-House Library", desc: "Question banks, guides, & reference books" },
              { icon: "🖥️", title: "Computer Learning", desc: "Projector visual education and digital fundamentals" },
              { icon: "💳", title: "Nominal Monthly Fees", desc: "Reasonable fees with flexible installment support" }
            ].map((item, idx) => (
              <div key={idx} className="glass-card" style={{ padding: "1.5rem" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>{item.icon}</div>
                <h4 style={{ fontSize: "1.05rem", marginBottom: "0.3rem" }}>{item.title}</h4>
                <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Director & Faculty Showcase */}
      <section id="faculty" style={{ padding: "5rem 6%", background: "#040d1a" }}>
        <div style={{ maxWidth: "1200px", margin: "auto" }}>
          
          <div className="glass-card" style={{
            padding: "3rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2.5rem",
            alignItems: "center",
            marginBottom: "4rem",
            border: "1px solid rgba(0, 180, 216, 0.4)"
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
              <h2 style={{ fontSize: "2.2rem", margin: "0.4rem 0 0.8rem" }}>Saqib Vidha Sir</h2>
              <p style={{ color: "#38bdf8", fontWeight: 600, fontSize: "1rem", marginBottom: "1rem" }}>
                Bachelor of Business Administration (BBA) • 5+ Years Teaching Experience
              </p>
              <p style={{ color: "#cbd5e1", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                Dedicated to mentoring students in Mathematics and Commerce with concept-driven clarity. Leading The Sky Tuition Classes to deliver academic discipline, structured assessment, and overall personal growth.
              </p>
              <a href="tel:7567277723" className="btn-primary">
                📞 Connect: +91 75672 77723
              </a>
            </div>
          </div>

          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h3 style={{ fontSize: "2rem" }}>Expert Faculty Directory</h3>
            <p style={{ color: "#94a3b8", fontSize: "0.95rem", marginTop: "0.4rem" }}>
              📞 Calling Windows: 05:00 PM – 05:30 PM & 07:30 PM – 08:00 PM (Please avoid calling during active lectures)
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.8rem" }}>
            {FACULTY.map((f, i) => (
              <div key={i} className="glass-card" style={{ padding: "2rem", border: `1px solid ${f.color}40` }}>
                <div style={{ color: f.color, fontSize: "0.85rem", fontWeight: 700 }}>{f.role}</div>
                <h4 style={{ fontSize: "1.4rem", margin: "0.4rem 0" }}>{f.name}</h4>
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

      {/* Vacation Activity Camp */}
      <section id="vacation" style={{ padding: "5rem 6%", background: "linear-gradient(180deg, #061224 0%, #0a1f3d 100%)" }}>
        <div style={{ maxWidth: "1200px", margin: "auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={{ color: "#f59e0b", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", fontSize: "0.85rem" }}>
              શિક્ષણ સાથે ગમ્મત
            </span>
            <h2 style={{ fontSize: "2.4rem", margin: "0.5rem 0" }}>Indoor Sports & Activity Week</h2>
            <p style={{ color: "#cbd5e1", maxWidth: "600px", margin: "auto" }}>
              Annual 1-Week Skill Enrichment Camp organized by The Sky Tuition Classes
            </p>
          </div>

          <div className="glass-card" style={{
            borderColor: "rgba(245, 158, 11, 0.35)",
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
                <div>📝 <strong>Language Proficiency:</strong> Gujarati, Hindi, English, Sanskrit</div>
                <div>🏆 <strong>OX Game Session</strong> with District Champion</div>
                <div>🎥 <strong>Projectorized Visual Education</strong></div>
              </div>
            </div>

            <div style={{ background: "rgba(4, 13, 26, 0.8)", padding: "2rem", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <span style={{ color: "#00b4d8", fontSize: "0.85rem", fontWeight: 700 }}>EVENT DETAILS</span>
                <h4 style={{ fontSize: "1.5rem", margin: "0.5rem 0 1rem" }}>Schedule & Venue</h4>
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
                Register on WhatsApp
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Rules Modal Trigger & Library */}
      <section style={{ padding: "4.5rem 6%", background: "#040d1a" }}>
        <div style={{ maxWidth: "1200px", margin: "auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2.5rem", alignItems: "center" }}>
          
          <div className="glass-card" style={{ padding: "2.5rem" }}>
            <span style={{ color: "#00b4d8", fontSize: "0.85rem", fontWeight: 700 }}>CODE OF CONDUCT</span>
            <h3 style={{ fontSize: "1.8rem", margin: "0.5rem 0 1rem" }}>Student & Parent Guidelines</h3>
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

      {/* Searchable Gujarati Rules Modal */}
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
            
            {/* Modal Rule Search */}
            <div style={{ padding: "1rem 2rem 0" }}>
              <input
                type="text"
                placeholder="🔍 Search rules (e.g., ફી, ટેસ્ટ, હોમવર્ક)..."
                value={ruleSearch}
                onChange={(e) => setRuleSearch(e.target.value)}
                style={{ width: "100%", padding: "0.75rem 1rem", background: "#040d1a", border: "1px solid rgba(0,180,216,0.3)", borderRadius: "8px", color: "#fff", outline: "none" }}
              />
            </div>

            <div style={{ padding: "1.5rem 2rem", overflowY: "auto", display: "flex", flexDirection: "column", gap: "1rem", color: "#cbd5e1", fontSize: "0.95rem" }}>
              {filteredRules.length > 0 ? (
                filteredRules.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", gap: "12px", alignItems: "flex-start", background: "rgba(255,255,255,0.03)", padding: "10px 14px", borderRadius: "8px" }}>
                    <span style={{ color: "#00b4d8", fontWeight: 700, minWidth: "80px", fontSize: "0.85rem" }}>[{item.cat}]</span>
                    <span>{item.rule}</span>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: "center", color: "#94a3b8", padding: "1rem" }}>કોઈ નિયમ મળ્યો નથી.</div>
              )}
            </div>

            <div style={{ padding: "1rem 2rem", borderTop: "1px solid rgba(255,255,255,0.1)", textAlign: "right" }}>
              <button
                onClick={() => setShowRulesModal(false)}
                className="btn-primary"
                style={{ padding: "0.5rem 1.5rem" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Registration & Google Maps Embed */}
      <section id="register" style={{ padding: "5rem 6%", maxWidth: "1200px", margin: "auto" }}>
        <div className="glass-card" style={{
          padding: "3rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "3.5rem"
        }}>
          <div>
            <span style={{ color: "#00b4d8", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "1px" }}>CONTACT & LOCATION</span>
            <h2 style={{ fontSize: "2.2rem", margin: "0.5rem 0 1.2rem" }}>The Sky Tuition Classes</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem", color: "#cbd5e1", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
              <div>👤 <strong>Director:</strong> Saqib Vidha (BBA | 5+ Years Exp.)</div>
              <div>📞 <strong>Phone:</strong> <a href="tel:7567277723" style={{ color: "#00b4d8", textDecoration: "none" }}>+91 75672 77723</a></div>
              <div>✉️ <strong>Email:</strong> theskytuitionclasses@gmail.com</div>
              <div>📸 <strong>Instagram:</strong> <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: "#38bdf8", textDecoration: "none" }}>@the sky tuition classes</a></div>
              <div>📍 <strong>Address:</strong> Nr. Collector Office, Opp. Kohinoor Apartment, Ghanchipat, Sardarbag, Junagadh 362001</div>
              <div>⏰ <strong>Regular Lectures:</strong> Mon – Sat: 05:30 PM – 07:30 PM</div>
              <div>🏢 <strong>Office / Calling Hours:</strong> 07:30 PM – 08:00 PM</div>
            </div>

            {/* Google Maps Embed */}
            <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(0, 180, 216, 0.3)" }}>
              <iframe
                title="Location Map"
                src="https://maps.google.com/maps?q=Collector%20Office,%20Sardarbag,%20Junagadh&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="180"
                style={{ border: 0, display: "block" }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Book a Free Academic Demo</h3>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: "1.5rem" }}>Limited seats per batch. Fill out the form to connect directly on WhatsApp.</p>
            
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
                  <option value="Std. 9th">Std. 9th</option>
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
                className="btn-whatsapp"
                style={{ marginTop: "0.5rem" }}
              >
                Submit Demo Request via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Floating Desktop WhatsApp Button */}
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

      {/* Mobile Sticky Quick Action Bar */}
      <div className="mobile-action-bar">
        <a
          href="tel:7567277723"
          style={{
            flex: 1, padding: "0.75rem", background: "#00b4d8", color: "#fff", textAlign: "center",
            borderRadius: "10px", fontWeight: 700, textDecoration: "none", fontSize: "0.9rem"
          }}
        >
          📞 Call Now
        </a>
        <a
          href="https://wa.me/917567277723?text=Hello%20Saqib%20Sir,%20I%20want%20to%20book%20a%20demo%20at%20The%20Sky%20Tuition%20Classes"
          target="_blank"
          rel="noreferrer"
          style={{
            flex: 1, padding: "0.75rem", background: "#25d366", color: "#fff", textAlign: "center",
            borderRadius: "10px", fontWeight: 700, textDecoration: "none", fontSize: "0.9rem"
          }}
        >
          💬 WhatsApp
        </a>
      </div>

      {/* Footer */}
      <footer style={{ padding: "2.5rem 6% 5.5rem", textAlign: "center", borderTop: "1px solid rgba(0, 180, 216, 0.15)", color: "#64748b", fontSize: "0.85rem" }}>
        © 2026 The Sky Tuition Classes. All Rights Reserved. • Sardarbag, Junagadh, Gujarat
      </footer>
    </div>
  );
}