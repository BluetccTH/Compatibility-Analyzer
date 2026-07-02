import React, { useState } from "react";
import { Sparkles, Heart, RefreshCw, Lock, Unlock, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LoveLetterTone } from "../types";

export default function AiOracle() {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return sessionStorage.getItem("is_ai_unlocked") === "true";
  });
  const [answer, setAnswer] = useState("");
  const [isError, setIsError] = useState(false);
  const [successAnimation, setSuccessAnimation] = useState(false);

  const [tone, setTone] = useState<LoveLetterTone>("romantic");
  const [letterText, setLetterText] = useState<string>("");
  const [loadingLetter, setLoadingLetter] = useState(false);

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
      setSuccessAnimation(true);
      setTimeout(() => {
        setIsUnlocked(true);
        sessionStorage.setItem("is_ai_unlocked", "true");
      }, 800);
    } else {
      setIsError(true);
      playErrorSound();
    }
  };

  // Fallbacks in case the API Key is not configured or fails
  const fallbackLetters: Record<LoveLetterTone, string> = {
    romantic: `ถึง พี่ไอซ์ ผู้เป็นดั่งสายฝนอันแสนอ่อนโยน... 🌧️💖

ในคืนที่พายุหมุนผ่านและฟ้าร้องเสียงดังจนเธอต้องตัวสั่นกังวล ฉันอยากบอกเธอว่า... เธอไม่ต้องกอดตัวเองด้วยความกลัวอีกต่อไปแล้วนะ

สำหรับฉัน ฟ้าร้องและสายฝนอาจเป็นสิ่งที่ฉันชอบมองและฟัง แต่สิ่งเหล่านั้นจะมีค่าก็ต่อเมื่อมีฉันคอยกางร่มเพื่อโอบกอดเธอ คอยปกป้องให้เธออบอุ่นใจอยู่ข้างๆ 

ตราบใดที่มีฉันอยู่ตรงนี้ ฉันจะขอเป็นเกราะกำบัง เป็นร่มคันกว้าง และเปลี่ยนทุกค่ำคืนที่พายุโหมกระหน่ำให้กลายเป็นคืนที่โรแมนติกและปลอดภัยที่สุดของไอซ์นะ... สัญญาเลยค่ะ 💕`,
    cozy: `พี่ไอซ์ครับ... รู้ไหมวันไหนที่ฝนตกและห้องมืดลงจนเธอกังวล ☕🕯️

ฉันอยากให้เธอหลับตาลงนึกถึงโกโก้อุ่นๆ และเสียงเพลงแจ๊สคลอเบาๆ 

ความมืดที่เธอเกลียด ฉันชอบมันนะ เพราะมันทำให้ฉันได้เห็นแววตาของเธอชัดเจนขึ้น และเป็นโอกาสที่ฉันจะได้เปิดไฟสีส้มสลัวอุ่นๆ จับมือเธอไว้ไม่ให้หนาว 

ไม่ต้องกลัวผีร้าย ไม่ต้องสะดุ้งยามฟ้าแลบสะท้อนหน้าต่าง ฉันจะคอยดูแล ปลอบโยน และชงนมร้อนๆ ปลอบใจเด็กดีของฉันจนกว่าจะหลับปุ๋ยไปเลย ฝันดีนะคะคนเก่ง`,
    playful: `นี่แน่ะ ยัยพี่ไอซ์ขี้กลัว! 😜👻🌩️

กลัวฟ้าร้องขนาดนั้นเลยหรอ? คราวหลังถ้าเสียงฟ้าร้องดังเปรี้ยงขึ้นมา ไม่ต้องวิ่งไปซ่อนใต้ผ้าห่มนะ วิ่งมากอดฉันนี่เลย! รับรองแข็งแกร่งกว่าผ้าห่มร้อยเท่า

ถ้าน้องผีโผล่มา ฉันจะเอาตรรกะวิทยาศาสตร์และตารางความรักพุ่งเข้าสู้ คอยเป็นบอดี้การ์ดปกป้องยัยขี้แยคนนี้เองแหละ 

ถ้าอยากได้ผู้ปกป้องสุดเทพคนนี้ไปดูแลถาวร ตลอดชีวิตนี้... ต้องยอมกด YES ปุ่มข้างล่างแล้วล่ะนะ ห้ามหนีไปไหนด้วย! 😉❤️`,
    poetic: `แด่ พี่ไอซ์... สายลมหนาวผู้พัดพารักมาสู่หัวใจของฉัน 🌌✨

ในคืนมืดมิดที่สายฝนพรำและฟ้าร้องคำรามก้องฟ้า 
เธออาจมองเห็นแต่พายุและความน่าสะพรึงกลัว 
แต่ฉันมองเห็นโอกาสที่ฟ้าส่งมา... ให้ฉันได้กางร่มสีเทาของตรรกะและหัวใจอุ่นๆ โอบล้อมจินตนาการอันละเอียดอ่อนของเธอ

ความแตกต่างของเราคือท่วงทำนองที่สมบูรณ์แบบที่สุด 
เธอคือผู้อ่อนไหว และฉันคือผู้พิทักษ์ 
นอนหลับเถิดแก้วตาเอ๋ย ฉันจะคอยปัดเป่าทุกฝันร้ายให้มลายหายไปชั่วนิรันดร์...`
  };

  const generateLetter = async () => {
    setLoadingLetter(true);
    try {
      const response = await fetch("/api/gemini/letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tone })
      });
      if (!response.ok) throw new Error("API Key configuration issue");
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setLetterText(data.text);
    } catch (err: any) {
      console.warn("Using sweet fallback love letter:", err.message);
      setLetterText(fallbackLetters[tone]);
    } finally {
      setLoadingLetter(false);
    }
  };

  if (!isUnlocked) {
    return (
      <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-500/5 blur-3xl"></div>
        <AnimatePresence mode="wait">
          {!successAnimation ? (
            <motion.div
              key="gate"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6 max-w-md mx-auto text-center py-4"
            >
              {/* Locking Icon with glowing effect */}
              <div className="relative inline-flex items-center justify-center">
                <span className="absolute animate-ping w-12 h-12 bg-sky-500/10 rounded-full inline-flex" />
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
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
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
                    placeholder="พิมพ์คำตอบภาษาอังกฤษตรงนี้..."
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
            </motion.div>
          ) : (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-4 max-w-sm mx-auto py-8"
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

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/5 blur-3xl"></div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-pink-400" />
            กล่องสร้างจดหมายรักปรับอารมณ์ดั่งใจหมุน 💕
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            เลือกสไตล์โทนอารมณ์จดหมายรักที่ไอซ์อยากอ่าน แล้วกดเขียนให้ก้าวสร้างข้อความหวานๆ ส่งตรงถึงใจไอซ์เลยนะคะ!
          </p>
        </div>

        {/* Tone Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {(["romantic", "cozy", "playful", "poetic"] as LoveLetterTone[]).map((t) => {
            const label = 
              t === "romantic" ? "โรแมนติกซึ้งๆ 💖" :
              t === "cozy" ? "อบอุ่นหัวใจ ☕" :
              t === "playful" ? "ขี้เล่นอ้อนๆ 🤪" : "กวีละมุนละไม 🌌";
            return (
              <button
                key={t}
                id={`tone-${t}`}
                onClick={() => setTone(t)}
                className={`py-3 px-2 rounded-xl text-[11px] sm:text-xs font-bold border transition-all ${
                  tone === t
                    ? "bg-pink-600/20 border-pink-500 text-pink-300 shadow-md shadow-pink-500/5"
                    : "bg-slate-800/50 border-transparent text-slate-400 hover:bg-slate-800"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button
            id="btn-generate-letter"
            onClick={generateLetter}
            disabled={loadingLetter}
            className="bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-pink-500/20 transition-all text-sm flex items-center gap-2 disabled:opacity-50 cursor-pointer active:scale-95"
          >
            {loadingLetter ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>กำลังเรียงร้อยตัวอักษรเพื่อเธอ...</span>
              </>
            ) : (
              <>
                <Heart className="w-4 h-4 fill-current" />
                <span>เขียนจดหมายรักฉบับพิเศษ ✉️</span>
              </>
            )}
          </button>
        </div>

        {/* Letter Paper display */}
        <AnimatePresence mode="wait">
          {letterText && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-950/80 border border-pink-500/20 rounded-2xl p-5 md:p-6 relative overflow-hidden shadow-inner"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full filter blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full filter blur-xl"></div>
              
              {/* Letter Content */}
              <div className="relative font-serif text-slate-200 text-sm sm:text-base leading-relaxed whitespace-pre-line max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                {letterText}
              </div>
              
              {/* Subtle Scroll Hint */}
              <div className="w-full flex justify-between items-center mt-4 pt-3 border-t border-white/5 text-[10px] text-slate-500 font-sans">
                <span className="animate-pulse">✨ เลื่อนเพื่ออ่านข้อความทั้งหมดได้นะคะ</span>
                <span className="font-mono">Sent via Love Courier • INTJ to INFP (Ice)</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
