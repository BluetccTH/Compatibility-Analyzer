import { useState, useRef, useEffect } from "react";
import { Heart, Sparkles, Shield, ExternalLink, Compass } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Plays a gorgeous, starry celestial bell chime & warm synth pad using Web Audio API
function playCelestialChime() {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    // Arpeggio notes (sweet major 9th sparkle chord arpeggio)
    const arpeggio = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51, 1567.98, 1975.53, 2093.00];
    
    // Play the sparkling arpeggio
    arpeggio.forEach((freq, idx) => {
      const time = now + idx * 0.08;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, time);
      // Gentle slide upward for a magical "spell" sound
      osc.frequency.exponentialRampToValueAtTime(freq * 1.04, time + 0.12);
      
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.2, time + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.9);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + 0.9);
    });

    // Add 12 tiny random "glitter" notes over the next 2 seconds
    for (let i = 0; i < 12; i++) {
      const time = now + 0.4 + Math.random() * 1.6;
      const freq = 1300 + Math.random() * 1600; // super high-pitched sparkling bell
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, time);
      
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.06, time + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.35);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + 0.35);
    }

    // A beautiful warm loving synthesizer pad chord swells in below
    const chord = [261.63, 329.63, 392.00, 493.88]; // Cmaj7 warm pad
    chord.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now);
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.6); // smooth swell
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2); // long release
      
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(650, now);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 3.2);
    });
  } catch (err) {
    console.error("Audio synth failed:", err);
  }
}

// State-of-the-art interactive love particle canvas system
function triggerRomanticExplosion(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const parent = canvas.parentElement;
  canvas.width = parent?.clientWidth || window.innerWidth;
  canvas.height = parent?.clientHeight || 600;

  // Track mouse coordinates to repel particles playfully!
  let mouse = { x: -9999, y: -9999 };
  const handleMouseMove = (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  };
  const handleMouseLeave = () => {
    mouse.x = -9999;
    mouse.y = -9999;
  };
  canvas.parentElement?.addEventListener("mousemove", handleMouseMove);
  canvas.parentElement?.addEventListener("mouseleave", handleMouseLeave);

  const colors = [
    "#ec4899", // Pink 500
    "#f43f5e", // Rose 500
    "#a855f7", // Purple 500
    "#fb7185", // Rose 400
    "#f472b6", // Pink 400
    "#c084fc", // Purple 400
    "#e11d48", // Rose 600
    "#ffffff", // Crystal White
    "#38bdf8", // Sky Blue
    "#a5f3fc"  // Cyan 200
  ];

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    alpha: number;
    decay: number;
    type: "heart" | "sparkle" | "bubble";
    rotation: number;
    rotationSpeed: number;
    swing: number;
    swingSpeed: number;
  }

  const particles: Particle[] = [];

  // 1. Initial big love blast!
  const centerX = canvas.width / 2;
  const centerY = canvas.height * 0.45; // Burst centered around the mid card level

  for (let i = 0; i < 220; i++) {
    const angle = Math.random() * Math.PI * 2;
    // Higher explosive starting speeds
    const speed = Math.random() * 11 + 3;
    const typeRand = Math.random();
    let type: "heart" | "sparkle" | "bubble" = "heart";
    if (typeRand < 0.35) {
      type = "sparkle";
    } else if (typeRand < 0.55) {
      type = "bubble";
    }

    particles.push({
      x: centerX,
      y: centerY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - (Math.random() * 4 + 2), // tend upwards
      size: Math.random() * 14 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      decay: Math.random() * 0.012 + 0.005,
      type,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.08,
      swing: Math.random() * Math.PI * 2,
      swingSpeed: Math.random() * 0.04 + 0.02
    });
  }

  // 2. Translucent shockwave concentric ring effect
  interface Shockwave {
    x: number;
    y: number;
    radius: number;
    maxRadius: number;
    alpha: number;
    color: string;
    width: number;
  }
  const shockwaves: Shockwave[] = [
    { x: centerX, y: centerY, radius: 0, maxRadius: 280, alpha: 1, color: "rgba(244, 63, 94, 0.5)", width: 6 },
    { x: centerX, y: centerY, radius: 0, maxRadius: 360, alpha: 0.8, color: "rgba(236, 72, 153, 0.35)", width: 3 },
    { x: centerX, y: centerY, radius: 0, maxRadius: 180, alpha: 0.9, color: "rgba(255, 255, 255, 0.45)", width: 8 }
  ];

  function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number, rotation: number) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, -size / 4);
    ctx.bezierCurveTo(-size / 2, -size * 0.75, -size, -size / 3, 0, size * 0.8);
    ctx.bezierCurveTo(size, -size / 3, size / 2, -size * 0.75, 0, -size / 4);
    ctx.fill();
    ctx.restore();
  }

  function drawSparkle(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, color: string, alpha: number, rotation: number) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, -r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.quadraticCurveTo(0, 0, 0, r);
    ctx.quadraticCurveTo(0, 0, -r, 0);
    ctx.quadraticCurveTo(0, 0, 0, -r);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawBubble(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.fillStyle = color + "1a"; // 10% transparent fill
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Bubble sheen reflection
    ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
    ctx.beginPath();
    ctx.arc(x - size / 6, y - size / 6, size / 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  let animationId: number;

  function update() {
    if (!ctx) return;
    
    // Ensure canvas stays fitted inside the container
    if (parent && (canvas.width !== parent.clientWidth || canvas.height !== parent.clientHeight)) {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw expanding love shockwaves
    for (let i = shockwaves.length - 1; i >= 0; i--) {
      const sw = shockwaves[i];
      sw.radius += 7;
      sw.alpha = 1 - (sw.radius / sw.maxRadius);
      
      if (sw.radius >= sw.maxRadius) {
        shockwaves.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = sw.alpha;
      ctx.strokeStyle = sw.color;
      ctx.lineWidth = sw.width;
      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // Continuously spawn beautiful floating hearts from the bottom so the card remains infinitely alive!
    if (Math.random() < 0.25) {
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 20,
        vx: (Math.random() - 0.5) * 1.8,
        vy: -Math.random() * 2.2 - 0.8, // gentle upward drift
        size: Math.random() * 10 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.95,
        decay: Math.random() * 0.005 + 0.002,
        type: Math.random() < 0.7 ? "heart" : "bubble",
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        swing: Math.random() * Math.PI * 2,
        swingSpeed: Math.random() * 0.03 + 0.01
      });
    }

    // Draw and animate particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      
      // Add subtle side-to-side drift swing
      p.swing += p.swingSpeed;
      p.x += Math.sin(p.swing) * 0.35;

      p.x += p.vx;
      p.y += p.vy;

      // Damp initial explosive speeds with elegant drag, add light gravitational sink
      p.vx *= 0.975;
      p.vy += 0.04;

      p.rotation += p.rotationSpeed;
      p.alpha -= p.decay;

      // Mouse proximity check - repel particles dynamically on cursor hover!
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 90) {
        const force = (90 - dist) / 90;
        p.vx += (dx / dist) * force * 1.6;
        p.vy += (dy / dist) * force * 1.6;
        p.alpha = Math.min(1, p.alpha + 0.06); // glow up on contact!
      }

      if (p.alpha <= 0 || p.y < -30 || p.x < -30 || p.x > canvas.width + 30) {
        particles.splice(i, 1);
        continue;
      }

      if (p.type === "heart") {
        drawHeart(ctx, p.x, p.y, p.size, p.color, p.alpha, p.rotation);
      } else if (p.type === "sparkle") {
        drawSparkle(ctx, p.x, p.y, p.size, p.color, p.alpha, p.rotation);
      } else {
        drawBubble(ctx, p.x, p.y, p.size, p.color, p.alpha);
      }
    }

    animationId = requestAnimationFrame(update);
  }

  update();

  return () => {
    cancelAnimationFrame(animationId);
    canvas.parentElement?.removeEventListener("mousemove", handleMouseMove);
    canvas.parentElement?.removeEventListener("mouseleave", handleMouseLeave);
  };
}

export default function ProposalPanel({ imageUrl }: { imageUrl: string }) {
  const [accepted, setAccepted] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noHoverCount, setNoHoverCount] = useState(0);
  const [noClickedMsg, setNoClickedMsg] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
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
    if (!panelRef.current) return;
    
    const rect = panelRef.current.getBoundingClientRect();
    // Keep it safely inside the panel container frame
    const buttonWidth = 130;
    const buttonHeight = 45;
    
    const maxX = Math.max(50, rect.width - buttonWidth);
    const maxY = Math.max(50, rect.height - buttonHeight);

    const paddingX = 16;
    const paddingY = 16;

    const randomX = Math.max(paddingX, Math.floor(Math.random() * (maxX - paddingX * 2) + paddingX));
    const randomY = Math.max(paddingY, Math.floor(Math.random() * (maxY - paddingY * 2) + paddingY));

    setNoButtonPosition({ x: randomX, y: randomY });
    setNoHoverCount((prev) => prev + 1);
    setNoClickedMsg(wittyNoMessages[Math.floor(Math.random() * wittyNoMessages.length)]);
  };

  useEffect(() => {
    if (accepted && canvasRef.current) {
      // Play celestial sound effect!
      playCelestialChime();
      
      // Fire massive love particle engine on canvas!
      const cleanup = triggerRomanticExplosion(canvasRef.current);
      return cleanup;
    }
  }, [accepted]);

  return (
    <div 
      ref={containerRef}
      className={`relative border rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl overflow-hidden min-h-[460px] flex flex-col justify-center items-center transition-all duration-1000 ${
        accepted 
          ? "bg-gradient-to-b from-slate-950 via-pink-950/20 to-slate-900 border-pink-500/40 shadow-[0_0_50px_rgba(236,72,153,0.18)]" 
          : "bg-slate-900/60 backdrop-blur-xl border-white/10"
      }`}
    >
      <AnimatePresence mode="wait">
        {!accepted ? (
          <motion.div
            key="ask"
            ref={panelRef}
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
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 rounded-2xl text-sm sm:text-base md:text-lg font-bold shadow-[0_0_35px_rgba(236,72,153,0.4)] border border-pink-400/50 scale-105 sm:scale-110 active:scale-95 hover:scale-115 transition-all duration-300 z-10 flex items-center gap-2 px-8 py-3.5 sm:px-12 sm:py-4.5 md:px-16 md:py-5 text-white cursor-pointer"
              >
                <Heart className="w-5 h-5 fill-current animate-pulse" /> ยอมค่ะ / ตกลงนะคะ 💍
              </button>

              {/* The elusive No button - inline initially */}
              {noHoverCount === 0 && (
                <button
                  id="btn-proposal-no"
                  onMouseEnter={handleNoInteraction}
                  onClick={handleNoInteraction}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-400 font-medium text-xs sm:text-sm px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border border-slate-700 hover:border-slate-500 cursor-pointer"
                >
                  ไม่ยอมหรอก 🥺
                </button>
              )}
            </div>

            {/* The absolute elusive No button floating around the entire card (when hover count > 0) */}
            {noHoverCount > 0 && (
              <button
                id="btn-proposal-no"
                onMouseEnter={handleNoInteraction}
                onClick={handleNoInteraction}
                style={{
                  position: "absolute",
                  left: `${noButtonPosition.x}px`,
                  top: `${noButtonPosition.y}px`,
                  transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)", // highly playful springy bounce
                  zIndex: 50,
                }}
                className="bg-slate-800 hover:bg-slate-700 text-slate-400 font-medium text-xs sm:text-sm px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border border-slate-700 hover:border-slate-500 cursor-pointer shadow-lg shadow-black/50"
              >
                ไม่ยอมหรอก 🥺
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full text-center space-y-6 sm:space-y-8 py-4 relative z-10 flex flex-col items-center"
          >
            {/* Custom interactive love canvas overlay */}
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full z-20"></canvas>

            <div className="relative inline-flex items-center justify-center">
              <span className="absolute animate-ping w-20 h-20 sm:w-24 sm:h-24 bg-pink-500/20 rounded-full inline-flex"></span>
              <div className="bg-pink-500/25 border border-pink-400 p-4 sm:p-5 rounded-full text-pink-400 shadow-2xl shadow-pink-500/30 relative z-10 animate-bounce">
                <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 fill-current" />
              </div>
            </div>

            <div className="space-y-2 px-1">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black leading-tight text-white select-none">
                <motion.span 
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ backgroundSize: "200% auto" }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 via-purple-400 to-sky-300 animate-gradient"
                >
                  เย้! ตกลงแล้วน้าาา พี่ไอซ์ของก้าว 💖
                </motion.span>{" "}
                ✨💍
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-md mx-auto leading-relaxed">
                ห้ามคืนคำเด็ดขาด! นับจากนี้ไป ทุกรอยยิ้ม ความกังวล และค่ำคืนพายุฝนฟ้าคะนองของไอซ์ จะมีเขาคนนี้กางร่มปกป้องดูแลอยู่เคียงข้างเสมอ
              </p>
            </div>

            {/* Render generated Illustration image beautifully */}
            <div className="w-full max-w-sm bg-slate-950/40 p-2 sm:p-3 rounded-2xl border border-pink-500/20 shadow-2xl relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/15 to-indigo-500/15 rounded-2xl filter blur-xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
              <img
                src={imageUrl}
                alt="Cozy rain comfort"
                referrerPolicy="no-referrer"
                className="rounded-xl w-full h-auto object-cover relative z-10 border border-slate-800 shadow-md transform hover:scale-[1.02] transition-transform duration-300"
              />
              <span className="absolute bottom-3 right-3 bg-slate-950/80 border border-pink-400/30 text-[9px] sm:text-[10px] text-pink-300 px-2.5 py-1 rounded-full font-mono font-bold z-20 tracking-wider">
                Cozy Rain Guardian 🌩️ Umbrella
              </span>
            </div>

            {/* 3 Promises Card with beautifully staggered animations */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-slate-950/70 backdrop-blur-md border border-pink-500/20 rounded-2xl p-4 sm:p-6 text-left max-w-lg w-full space-y-3.5 sm:space-y-4 relative overflow-hidden group shadow-lg shadow-pink-950/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent pointer-events-none" />
              <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-pink-400 flex items-center gap-1.5 relative z-10">
                <Shield className="w-4 h-4 shrink-0 animate-pulse text-pink-500" /> สัญญาสามข้อของก้าว (Kao's Guardian Promises):
              </h3>
              
              <div className="space-y-2.5 sm:space-y-3 text-slate-300 relative z-10">
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-start gap-2.5 sm:gap-3 bg-slate-900/50 hover:bg-slate-900/80 p-3 rounded-xl border-l-4 border-pink-500 transition-colors duration-300"
                >
                  <span className="text-base sm:text-lg shrink-0 mt-0.5">🌩️</span>
                  <div>
                    <h4 className="font-bold text-white text-xs sm:text-sm">ข้อที่ 1: สยบเสียงฟ้าร้อง</h4>
                    <p className="text-xs text-slate-300 mt-0.5">จะคอยรวบตัวกระชับกอดและเอามือช่วยปิดหูให้พี่ไอซ์ทุกครั้งที่พายุดังเสียงกึกก้อง</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-start gap-2.5 sm:gap-3 bg-slate-900/50 hover:bg-slate-900/80 p-3 rounded-xl border-l-4 border-indigo-400 transition-colors duration-300"
                >
                  <span className="text-lg shrink-0">🌌</span>
                  <div>
                    <h4 className="font-bold text-white text-xs sm:text-sm">ข้อที่ 2: ขับความมืดมน</h4>
                    <p className="text-xs text-slate-300 mt-0.5">จะเปิดไฟสีส้มสลัวอุ่นละมุน ชงโกโก้ร้อนจับมือบอกพี่ไอซ์ให้คลายกังวลในห้องมืด</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 }}
                  className="flex items-start gap-2.5 sm:gap-3 bg-slate-900/50 hover:bg-slate-900/80 p-3 rounded-xl border-l-4 border-purple-500 transition-colors duration-300"
                >
                  <span className="text-lg shrink-0">☔</span>
                  <div>
                    <h4 className="font-bold text-white text-xs sm:text-sm">ข้อที่ 3: เกราะรักถาวร</h4>
                    <p className="text-xs text-slate-300 mt-0.5">จะยืนหยัดด้วยหัวใจตรรกะอันแน่วแน่ ยืนหยัดกางร่มปกป้องถนอมพี่ไอซ์ไปทุกพายุฝนชีวิต</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Pratu Duangdao Dimension Portal 🌌🚀 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="w-full max-w-lg bg-gradient-to-r from-pink-950/40 via-purple-950/40 to-sky-950/40 border border-pink-500/30 rounded-2xl p-4 sm:p-5 text-center relative overflow-hidden group shadow-[0_0_30px_rgba(168,85,247,0.15)] flex flex-col items-center gap-3"
            >
              <div className="absolute -inset-x-20 -inset-y-20 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 rounded-full filter blur-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-1000 pointer-events-none" />
              
              <div className="flex items-center gap-2 relative z-10">
                <Compass className="w-5 h-5 text-cyan-400 animate-[spin_6s_linear_infinite]" />
                <h4 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-pink-300 to-purple-300 select-none">
                  ประตูมิติส่วนตัวของ ก้าว & พี่ไอซ์ 🛰️✨
                </h4>
              </div>

              <p className="text-xs text-slate-300 max-w-sm relative z-10 select-none">
                ผ่านการยอมรับแล้ว! คิวปิดเปิดระบบส่งตัวไปยังพื้นที่ลับเฉพาะที่เราสร้างขึ้นด้วยกัน
              </p>

              {/* The Glowing Neon Teleport Button */}
              <motion.a
                href="https://stars.chromeexperiments.com/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 hover:from-cyan-400 hover:via-purple-500 hover:to-pink-400 text-white font-black text-xs sm:text-sm px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl border border-white/20 shadow-[0_0_25px_rgba(168,85,247,0.35)] relative z-10 transition-all duration-300 w-full justify-center group/btn"
              >
                <span>เดินทางสู่แดนสวรรค์พิเศษของเรา 🌌🚀</span>
                <ExternalLink className="w-4.5 h-4.5 text-white group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </motion.a>
            </motion.div>

            <p className="text-slate-500 text-xs font-serif italic pt-2">
              "เพราะว่าความต่างคือความสมบูรณ์แบบ... และรักแท้คือการได้กางร่มปกป้องเธอ ตลอดไป ❤️"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}