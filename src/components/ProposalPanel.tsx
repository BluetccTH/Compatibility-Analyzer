import { useState, useRef, useEffect } from "react";
import { Heart, Sparkles, Shield } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Light-weight custom canvas confetti renderer for a stunning effect
function triggerConfetti(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const colors = ["#ec4899", "#a855f7", "#6366f1", "#f43f5e", "#fb7185", "#3b82f6"];
  const pieces: Array<{
    x: number;
    y: number;
    size: number;
    color: string;
    speedX: number;
    speedY: number;
    rotation: number;
    rotationSpeed: number;
  }> = [];

  // Set canvas size based on parent container
  const parent = canvas.parentElement;
  canvas.width = parent?.clientWidth || window.innerWidth;
  canvas.height = parent?.clientHeight || 600;

  for (let i = 0; i < 150; i++) {
    pieces.push({
      x: canvas.width / 2,
      y: canvas.height + 20,
      size: Math.random() * 8 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: (Math.random() - 0.5) * 12,
      speedY: -Math.random() * 15 - 10,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 5,
    });
  }

  let animationId: number;
  function update() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let active = false;

    pieces.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.speedY += 0.35; // gravity
      p.rotation += p.rotationSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();

      if (p.y < canvas.height + 50) {
        active = true;
      }
    });

    if (active) {
      animationId = requestAnimationFrame(update);
    }
  }

  update();
  return () => cancelAnimationFrame(animationId);
}

export default function ProposalPanel({ imageUrl }: { imageUrl: string }) {
  const [accepted, setAccepted] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noHoverCount, setNoHoverCount] = useState(0);
  const [noClickedMsg, setNoClickedMsg] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const wittyNoMessages = [
    "อุ๊ย! ปุ่มนี้เหมือนจะชำรุดนะจ๊ะ กดไม่ได้หรอก 😜",
    "ขออภัย! ระบบจีบเธอไม่อนุญาตให้ตอบปฏิเสธความน่ารักนี้ ❌",
    "เอ๊ะ ยิ่งหนี ปุ่มยิ่งย้ายนะจ๊ะคนดี! 😉",
    "ทางตันแล้วล่ะนะพี่ไอซ์คนสวย กด YES ดีกว่านะ 💘",
    "ปุ่มนี้มีไว้ประดับเฉยๆ ค่ะ ไม่มีผลบังคับใช้จริง โฮะๆ 🦉",
    "เขาอุบลราชธานีถึกขนาดนี้ ปฏิเสธลงคอหรอคะ? 🥺"
  ];

  const handleNoInteraction = () => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    // Keep it safely inside card padding
    const maxX = Math.max(100, rect.width - 150);
    const maxY = Math.max(100, rect.height - 100);

    const randomX = Math.max(20, Math.floor(Math.random() * maxX));
    const randomY = Math.max(20, Math.floor(Math.random() * maxY));

    setNoButtonPosition({ x: randomX, y: randomY });
    setNoHoverCount((prev) => prev + 1);
    setNoClickedMsg(wittyNoMessages[Math.floor(Math.random() * wittyNoMessages.length)]);
  };

  useEffect(() => {
    if (accepted && canvasRef.current) {
      const cleanup = triggerConfetti(canvasRef.current);
      return cleanup;
    }
  }, [accepted]);

  return (
    <div 
      ref={containerRef}
      className="relative bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl overflow-hidden min-h-[460px] flex flex-col justify-center items-center"
    >
      <AnimatePresence mode="wait">
        {!accepted ? (
          <motion.div
            key="ask"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-xl text-center space-y-6 sm:space-y-8 py-4 relative z-10"
          >
            {/* Pulsating heart decoration */}
            <div className="relative inline-flex items-center justify-center">
              <span className="absolute animate-ping w-10 h-10 sm:w-12 sm:h-12 bg-pink-500/20 rounded-full inline-flex"></span>
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-pink-500/20 text-pink-500 border border-pink-500/30 rounded-full flex items-center justify-center relative shadow-lg shadow-pink-500/10">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 fill-current animate-pulse" />
              </div>
            </div>

            <div className="space-y-2.5 sm:space-y-3 px-1 sm:px-0">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight font-sans">
                จะยอมให้ผู้ชายคนนี้ คอยกางร่มอุ่นๆ <br className="hidden sm:inline" />
                และคอยกอดปกป้องไอซ์ไปตลอดทุกพายุฝนเลยไหมคะ? 🌧️💖
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-md mx-auto leading-relaxed">
                ในยามพายุฟ้าคะนองส่องเสียงดัง และความมืดมิดกวักมือเรียกผีร้าย... <br className="hidden sm:inline" />
                เธอจะไม่ต้องเผชิญหน้าคนเดียวอีกต่อไป ยอมให้ร่มคันนี้เป็นพื้นที่ปลอดภัยของเธอนะ
              </p>
            </div>

            {/* Witty Message Display when NO clicked */}
            <AnimatePresence>
              {noClickedMsg && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-pink-600/10 border border-pink-500/30 rounded-xl px-4 py-2 text-[11px] sm:text-xs text-pink-300 max-w-sm mx-auto"
                >
                  {noClickedMsg}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Button container */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 min-h-[100px] pt-2 relative">
              <button
                id="btn-proposal-yes"
                onClick={() => setAccepted(true)}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 rounded-2xl text-sm sm:text-base md:text-lg font-bold shadow-[0_0_30px_rgba(236,72,153,0.3)] border border-pink-400/50 scale-105 sm:scale-110 active:scale-95 transition-all duration-200 z-10 flex items-center gap-1.5 px-8 py-3 sm:px-12 sm:py-4 md:px-16 md:py-5 text-white cursor-pointer"
              >
                <Heart className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-current animate-pulse" /> ยอมค่ะ / ตกลงนะคะ 💍
              </button>

              {/* The elusive No button */}
              <button
                id="btn-proposal-no"
                onMouseEnter={handleNoInteraction}
                onClick={handleNoInteraction}
                style={
                  noHoverCount > 0
                    ? {
                        position: "absolute",
                        left: `${noButtonPosition.x}px`,
                        top: `${noButtonPosition.y}px`,
                        transition: "all 0.15s ease-out",
                      }
                    : { position: "relative" }
                }
                className="bg-slate-800 hover:bg-slate-700 text-slate-400 font-medium text-xs sm:text-sm px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border border-slate-700 hover:border-slate-500 cursor-pointer"
              >
                ไม่ยอมหรอก 🥺
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full text-center space-y-6 sm:space-y-8 py-4 relative z-10 flex flex-col items-center"
          >
            {/* Custom canvas overlay for confetti */}
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full z-20"></canvas>

            <div className="relative inline-flex items-center justify-center">
              <span className="absolute animate-ping w-20 h-20 sm:w-24 sm:h-24 bg-pink-500/10 rounded-full inline-flex"></span>
              <div className="bg-pink-500/20 border border-pink-400 p-3 sm:p-4 rounded-full text-pink-400 shadow-xl shadow-pink-500/20 relative z-10 animate-bounce">
                <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 fill-current" />
              </div>
            </div>

            <div className="space-y-2 px-1">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black leading-tight text-white">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
                  เย้! ตกลงแล้วน้าาา
                </span>{" "}
                🎉💖
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-md mx-auto leading-relaxed">
                ห้ามคืนคำเด็ดขาด! นับจากนี้ไป ทุกรอยยิ้ม ความกังวล และค่ำคืนพายุฝนฟ้าคะนองของไอซ์ จะมีเขาคนนี้กางร่มปกป้องดูแลอยู่เคียงข้างเสมอ
              </p>
            </div>

            {/* Render generated Illustration image beautifully */}
            <div className="w-full max-w-sm bg-slate-950/40 p-2 sm:p-3 rounded-2xl border border-white/10 shadow-xl relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-indigo-500/10 rounded-2xl filter blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <img
                src={imageUrl}
                alt="Cozy rain comfort"
                referrerPolicy="no-referrer"
                className="rounded-xl w-full h-auto object-cover relative z-10 border border-slate-800 shadow-md transform hover:scale-[1.01] transition-transform duration-300"
              />
              <span className="absolute bottom-3 right-3 bg-slate-950/80 border border-pink-400/30 text-[9px] sm:text-[10px] text-pink-300 px-2.5 py-1 rounded-full font-mono font-bold z-20 tracking-wider">
                Cozy Rain Guardian 🌩️ Umbrella
              </span>
            </div>

            {/* 3 Promises Card */}
            <div className="bg-slate-950/60 border border-white/10 rounded-2xl p-4 sm:p-6 text-left max-w-lg w-full space-y-3.5 sm:space-y-4">
              <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-pink-400 flex items-center gap-1.5">
                <Shield className="w-4 h-4 shrink-0 animate-pulse" /> สัญญาสามข้อจากใจผู้พิทักษ์ (The Guardian Promises):
              </h3>
              <div className="space-y-2.5 sm:space-y-3 text-slate-300">
                <div className="flex items-start gap-2.5 sm:gap-3 bg-slate-900/40 p-2.5 rounded-xl border-l-2 border-pink-500">
                  <span className="text-base sm:text-lg shrink-0 mt-0.5">🌩️</span>
                  <div>
                    <h4 className="font-bold text-white text-xs">ข้อที่ 1: สยบเสียงฟ้าร้อง</h4>
                    <p className="text-xs text-slate-400">จะคอยรวบตัวกระชับกอดและเอามือช่วยปิดหูให้ไอซ์ทุกครั้งที่พายุดังเสียงกึกก้อง</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-slate-900/40 p-2.5 rounded-xl border-l-2 border-indigo-400">
                  <span className="text-lg">🌌</span>
                  <div>
                    <h4 className="font-bold text-white text-xs">ข้อที่ 2: ขับความมืดมน</h4>
                    <p className="text-xs text-slate-400">จะเปิดไฟสีส้มสลัวอุ่นละมุน ชงโกโก้ร้อนจับมือบอกเธอให้คลายกังวลในห้องมืด</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-slate-900/40 p-2.5 rounded-xl border-l-2 border-purple-400">
                  <span className="text-lg">☔</span>
                  <div>
                    <h4 className="font-bold text-white text-xs">ข้อที่ 3: เกราะรักถาวร</h4>
                    <p className="text-xs text-slate-400">จะยืนหยัดด้วยหัวใจตรรกะอันแน่วแน่ ยืนหยัดกางร่มปกป้องถนอมเธอไปทุกพายุฝนชีวิต</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-slate-500 text-xs font-serif italic pt-2">
              "เพราะว่าความต่างคือความสมบูรณ์แบบ... และรักแท้คือการได้กางร่มปกป้องเธอ ตลอดไป ❤️"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
