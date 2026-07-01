import { useState } from "react";
import { Sparkles, Heart, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LoveLetterTone } from "../types";

export default function AiOracle() {
  const [tone, setTone] = useState<LoveLetterTone>("romantic");
  const [letterText, setLetterText] = useState<string>("");
  const [loadingLetter, setLoadingLetter] = useState(false);

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