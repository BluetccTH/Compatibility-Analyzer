import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ShieldCheck, Lock, Unlock, AlertCircle, Heart } from "lucide-react";

interface AiGateProps {
  onUnlock: () => void;
}

export default function AiGate({ onUnlock }: AiGateProps) {
  const [answer, setAnswer] = useState("");
  const [isError, setIsError] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Play sweet success sound
  const playSuccessChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const time = now + idx * 0.08;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, time);
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.2, time + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + 0.6);
      });
    } catch (e) {
      console.error(e);
    }
  };

  // Play error feedback sound
  const playErrorSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.2);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = answer.trim().replace(/\s+/g, " ").toUpperCase();
    
    if (cleanInput === "NAMA CHOCOLATE AU LAIT") {
      playSuccessChime();
      setIsUnlocked(true);
      setTimeout(() => {
        onUnlock();
      }, 800);
    } else {
      setIsError(true);
      playErrorSound();
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto py-8 px-4 flex justify-center items-center">
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="gate"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            className="w-full bg-slate-900/40 backdrop-blur-xl border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
          >
            {/* Top glowing ambient effect */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
            
            <div className="flex flex-col items-center text-center space-y-6">
              {/* Locking Icon with glowing effect */}
              <div className="relative">
                <span className="absolute animate-ping inset-0 bg-sky-500/10 rounded-full inline-flex" />
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border transition-colors relative z-10 ${
                  isError 
                    ? "bg-rose-500/20 border-rose-500 text-rose-400" 
                    : "bg-sky-500/10 border-sky-400/30 text-sky-400"
                }`}>
                  <Lock className="w-7 h-7" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-extrabold text-white tracking-wide">
                  ระบบตรวจสอบยืนยันตัวตน 🔒✨
                </h3>
                <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
                  เนื้อหานี้เป็น "จดหมายรักพิเศษและผู้ช่วย AI ส่วนตัว" เฉพาะพี่ไอซ์เท่านั้น โปรดตอบคำถามของก้าวเพื่อปลดล็อกสิทธิ์ใช้งานหัวข้อนี้ค่ะ 💙
                </p>
              </div>

              <form onSubmit={handleSubmit} className="w-full space-y-5 text-left">
                {/* Question Area */}
                <div className="bg-slate-950/80 p-4 rounded-2xl border border-sky-500/10 space-y-2">
                  <div className="flex items-center gap-1.5 text-[10px] text-sky-400 font-extrabold uppercase tracking-widest">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    <span>คำถามยืนยันตัวตน (Secret Question)</span>
                  </div>
                  <p className="text-sm sm:text-base font-bold text-slate-100 leading-relaxed">
                    ก้าวชอบกินช็อกโกแลตอะไร? 🍫🧸
                  </p>
                </div>

                {/* Input Area */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider px-1">
                    คำตอบของคุณ (ตัวสะกดภาษาอังกฤษพิมพ์ใหญ่)
                  </label>
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => {
                      setAnswer(e.target.value);
                      if (isError) setIsError(false);
                    }}
                    placeholder="เช่น ROYCE CHOCOLATE..."
                    className={`w-full bg-slate-950 border rounded-xl px-4 py-3.5 text-xs sm:text-sm font-extrabold text-slate-100 tracking-wide transition-all focus:outline-none focus:ring-1 ${
                      isError
                        ? "border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                        : "border-slate-800 focus:border-sky-500/50 focus:ring-sky-500/50 shadow-[0_0_15px_rgba(56,189,248,0.1)]"
                    }`}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 hover:from-sky-400 hover:via-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs sm:text-sm px-6 py-4 rounded-xl border border-white/10 shadow-[0_0_20px_rgba(56,189,248,0.25)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                >
                  <Unlock className="w-4 h-4" />
                  <span>ยืนยันคำตอบเพื่อเปิดมิติจดหมายรัก 🗝️💙</span>
                </button>
              </form>

              {/* Error Box */}
              <AnimatePresence>
                {isError && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[11px] text-rose-300 font-bold bg-rose-950/30 border border-rose-500/20 px-3.5 py-3 rounded-xl text-left w-full flex items-start gap-2 leading-relaxed"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                    <span>เอ๊ะ... คำตอบยังไม่ถูกต้องนะคะ ใช่พี่ไอซ์สุดที่รักของก้าวหรือเปล่านะ? 🥺 ลองพิมพ์ทวนตัวสะกดดูอีกครั้งนะคะ!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm bg-gradient-to-tr from-sky-950/40 to-cyan-950/40 border border-sky-400/30 rounded-3xl p-8 shadow-2xl text-center space-y-4"
          >
            <div className="w-16 h-16 bg-sky-500/20 text-sky-400 rounded-full flex items-center justify-center mx-auto border border-sky-400/40">
              <Unlock className="w-7 h-7 animate-bounce" />
            </div>
            <h3 className="text-lg font-black text-white">ยืนยันตัวตนสำเร็จ! 🎉</h3>
            <p className="text-xs text-sky-200">
              ถูกต้องที่สุดจ้า! ยินดีต้อนรับพี่ไอซ์สุดที่รักเข้าสู่หัวข้อ "จดหมายรักพิเศษ" ✉️💙
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
