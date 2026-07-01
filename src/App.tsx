import React, { useState, useEffect } from "react";
import { CloudRain, Sparkles, Heart, HelpCircle, Moon, Info, Zap, Music, Volume2, VolumeX } from "lucide-react";
import { motion } from "motion/react";
import ChemistryCard from "./components/ChemistryCard";
import AiOracle from "./components/AiOracle";
import ProposalPanel from "./components/ProposalPanel";
import ProfileComparison from "./components/ProfileComparison";
import PasscodeGate from "./components/PasscodeGate";
import { cuteSynth } from "./utils/audio";

// Import the beautifully generated cozy rain comfort illustration
// @ts-ignore
import cozyRainComfort from "./assets/images/cozy_rain_comfort_1782860616211.jpg";

// Using a gorgeous, misty, dark blue atmospheric pine forest from Unsplash
// This ensures that GitHub Actions builds successfully without requiring the local generated asset to be committed first!
const forestBackground = "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2070&auto=format&fit=crop";

interface RaindropData {
  id: number;
  left: string;
  delay: string;
  duration: string;
}

interface StarData {
  id: number;
  left: string;
  top: string;
  size: string;
  delay: string;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("is_ice_authenticated") === "true";
  });
  const [raindrops, setRaindrops] = useState<RaindropData[]>([]);
  const [stars, setStars] = useState<StarData[]>([]);
  const [activeView, setActiveView] = useState<"analysis" | "ai" | "proposal">("analysis");
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.12);

  // Create random raindrops and glowing stars for the cute cosmic blue atmosphere
  useEffect(() => {
    const drops: RaindropData[] = [];
    for (let i = 0; i < 40; i++) {
      drops.push({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${Math.random() * 2 + 1.5}s`,
      });
    }
    setRaindrops(drops);

    const starryDots: StarData[] = [];
    for (let i = 0; i < 30; i++) {
      starryDots.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 80}%`,
        size: `${Math.random() * 3 + 1}px`,
        delay: `${Math.random() * 4}s`,
      });
    }
    setStars(starryDots);
  }, []);

  // Subscribe to the beautiful cover of "จักรวาลไหน (feat. MONICA)" as soon as the user enters!
  useEffect(() => {
    const handleStateChange = (playing: boolean) => {
      setIsPlayingMusic(playing);
    };

    cuteSynth.subscribe(handleStateChange);
    cuteSynth.setVolume(musicVolume);

    return () => {
      cuteSynth.unsubscribe(handleStateChange);
    };
  }, []);

  const handleToggleMusic = () => {
    cuteSynth.togglePlay();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setMusicVolume(vol);
    cuteSynth.setVolume(vol);
    if (!cuteSynth.getPlayingStatus()) {
      cuteSynth.start();
    }
  };

  if (!isAuthenticated) {
    return (
      <PasscodeGate
        onSuccess={() => {
          setIsAuthenticated(true);
          sessionStorage.setItem("is_ice_authenticated", "true");
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 relative overflow-x-hidden selection:bg-sky-500/30 selection:text-sky-200">
      
      {/* Deep Forest Atmospheric Background 🌲🌌 */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none"
        style={{ backgroundImage: `url(${forestBackground})` }}
      />
      
      {/* Dark tint and gradient overlay to ensure extremely clean readability */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-slate-950/80 via-slate-950/50 to-slate-950/90 pointer-events-none" />
      {/* Background Falling Rain Drops */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {raindrops.map((drop) => (
          <div
            key={drop.id}
            className="raindrop"
            style={{
              left: drop.left,
              animationDelay: drop.delay,
              animationDuration: drop.duration,
              top: "-50px",
            }}
          />
        ))}

        {/* Twinkling Stars of the INTJ Sky 🌌 */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="starry-dot"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Atmospheric Ambient Glowing Orbs - Tinted beautifully to sky-blue for her */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] max-w-[500px] bg-sky-500/10 rounded-full filter blur-[120px] pointer-events-none mix-blend-screen animate-pulse duration-[8000ms]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] max-w-[500px] bg-cyan-500/10 rounded-full filter blur-[120px] pointer-events-none mix-blend-screen animate-pulse duration-[10000ms]"></div>

      {/* Container holding the layout */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 relative z-10 space-y-8">
        
        {/* Upper Brand Header Section */}
        <div className="relative w-full flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900/40 backdrop-blur-md border border-sky-400/20 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center shadow-lg shadow-sky-500/50">
              <span className="text-2xl">💙</span>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-200 bg-clip-text text-transparent">
                Compatibility Analyzer
              </h1>
            </div>
          </div>

          {/* Cute Web Audio Synthesized Music Player 🎵 */}
          <div className="flex items-center gap-3 bg-slate-950/60 px-4 py-2.5 rounded-2xl border border-sky-500/20 relative">
            {!isPlayingMusic && (
              <span className="absolute -top-8 right-0 text-[10px] bg-sky-500/90 text-slate-950 px-2 py-0.5 rounded-md font-bold animate-bounce shadow-md whitespace-nowrap">
                ✨ แตะปุ่มนี้เพื่อเปิดเพลงนะคะ! 🎵
              </span>
            )}
            <button
              onClick={handleToggleMusic}
              className={`p-2 rounded-xl transition-all ${
                isPlayingMusic 
                  ? "bg-sky-500 text-slate-950 animate-spin" 
                  : "bg-slate-800 text-sky-300 hover:bg-slate-700 animate-pulse border border-sky-500/50"
              }`}
              title="เปิดเพลงคลายเหงาแสนน่ารัก 🎵"
            >
              <Music className="w-4 h-4" />
            </button>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-sky-300 uppercase tracking-widest flex items-center gap-1">
                {isPlayingMusic ? <Volume2 className="w-3 h-3 text-sky-400 animate-bounce" /> : <VolumeX className="w-3 h-3 text-slate-500" />}
                จักรวาลไหน (feat. MONICA) 🌌
              </span>
              <input
                type="range"
                min="0"
                max="0.25"
                step="0.01"
                value={musicVolume}
                onChange={handleVolumeChange}
                className="w-28 sm:w-36 md:w-24 h-2.5 bg-slate-800 rounded-full appearance-none cursor-pointer accent-sky-400 mt-1 border border-slate-700/50 outline-none transition-all focus:ring-1 focus:ring-sky-500/50 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-sky-400 [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(56,189,248,0.7)] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-sky-400 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer active:scale-105 touch-none"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-sky-950/60 border border-sky-500/20 px-4 py-1.5 rounded-full text-sky-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md"
          >
            <Zap className="w-3.5 h-3.5 fill-current animate-bounce text-sky-400" />
            <span>เธอชอบสีฟ้าที่สุด 💙 สบายตา สบายใจ อบอุ่นเมื่ออยู่ด้วยกัน</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white font-sans"
          >
            เมื่อชายหนุ่มผู้ชอบ <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">"พายุฝน"</span> ปลอบประโลม <br className="hidden md:inline" />
            สาวน้อยแสนหวานอย่าง <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-pink-300">"ไอซ์"</span> 💘
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl mx-auto"
          >
            ยินดีต้อนรับสู่แดนสวรรค์สีฟ้าพาสเทลแสนน่ารักที่ก้าวตั้งใจเตรียมไว้ให้พี่ไอซ์โดยเฉพาะ 🌧️✨ <br className="hidden sm:inline" />
            ก้าวพร้อมสัญญากลายเป็นบ้านปกคลุมจากเสียงฟ้าร้องที่ดังพาดฟ้า และปกป้องเธอจนถึงเช้าวันใหม่
          </motion.p>
        </div>

        {/* Global Tab Controls */}
        <div className="flex justify-center">
          <div className="bg-slate-900/80 p-1.5 rounded-2xl border border-sky-500/20 flex gap-1 sm:gap-2 max-w-full overflow-x-auto custom-scrollbar backdrop-blur-md">
            <button
              id="view-analysis"
              onClick={() => setActiveView("analysis")}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                activeView === "analysis"
                  ? "bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <CloudRain className="w-4 h-4" /> 1. เคมีพายุหัวใจ 🌩️
            </button>
            <button
              id="view-ai"
              onClick={() => setActiveView("ai")}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                activeView === "ai"
                  ? "bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Sparkles className="w-4 h-4" /> 2. จดหมายรักพิเศษ ✉️
            </button>
            <button
              id="view-proposal"
              onClick={() => setActiveView("proposal")}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                activeView === "proposal"
                  ? "bg-gradient-to-r from-sky-400 to-pink-500 text-slate-950 shadow-lg shadow-sky-500/10"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Heart className="w-4 h-4 fill-current" /> 3. ขอเป็นแฟนกันนะคะ 💍
            </button>
          </div>
        </div>

        {/* Dynamic Display of Sub-views */}
        <div className="min-h-[500px]">
          {activeView === "analysis" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Alert box clarifying the cute contrast */}
              <div className="bg-sky-950/40 border border-sky-500/20 rounded-2xl p-4 flex items-start gap-3 max-w-3xl mx-auto">
                <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-xs sm:text-sm">ขั้วตรงข้ามที่ก้าวพร้อมปกป้อง</h4>
                  <p className="text-xs text-sky-200 leading-relaxed">
                    ก้าวพร้อมเป็นเกราะบังลมพายุเมื่อฟ้าคะนอง! โดยให้พี่ไอซ์นอนสบายใจพร้อมกับความสดใส คุยเล่น และแมววิเชียรมาศแสนน่ารัก 🐱💙
                  </p>
                </div>
              </div>

              {/* MBTI Compatibility Detail Card */}
              <ChemistryCard />

              {/* Newly Created Personal Profile Comparison Card */}
              <ProfileComparison />
            </motion.div>
          )}

          {activeView === "ai" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <AiOracle />
            </motion.div>
          )}

          {activeView === "proposal" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ProposalPanel imageUrl={cozyRainComfort} />
            </motion.div>
          )}
        </div>

        {/* Footer info line */}
        <footer className="text-center text-[11px] text-slate-500 font-sans pt-8 border-t border-slate-900">
          <p>© 2026 Kao 🔭 ❤️ Ice 🧊. พัฒนาด้วยความตั้งใจเพื่อความสุขของเธอในทุกพายุฝน</p>
          <p className="mt-1">เคียงข้างดูแลกันตลอดไป 🌧️✨</p>
        </footer>
      </div>
    </div>
  );
}