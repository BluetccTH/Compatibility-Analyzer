import { useState } from "react";
import { 
  Heart, 
  CloudRain, 
  Zap, 
  Ghost, 
  Shield, 
  Moon, 
  Sparkles, 
  Volume2, 
  ChevronRight, 
  CheckCircle2 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AnalysisFactor } from "../types";

export default function ChemistryCard() {
  const [selectedFactor, setSelectedFactor] = useState<string | null>("rain");
  const [showSummary, setShowSummary] = useState(false);

  const factors: AnalysisFactor[] = [
    {
      id: "rain",
      title: "ความรักในสายฝน (Rainy Sanctuary)",
      emoji: "🌧️",
      description: "เมื่อเสียงเม็ดฝนหล่นกระทบหน้าต่าง กลายเป็นความอบอุ่นในใจของเราทั้งคู่",
      intjSide: "ชอบนั่งฟังเสียงฝนตก พายุดนตรีธรรมชาติ และความสงบเงียบ",
      infpSide: "ชอบความโรแมนติกและกลิ่นอายของฝน แต่ไม่ชอบเสียงฟ้าร้องน่ากลัว",
      solution: "กางร่มคันใหญ่คอยปกป้องเธอจากพายุ และนั่งมองฝนตกไปด้วยกันในที่ที่ปลอดภัยและอุ่นใจที่สุด"
    },
    {
      id: "thunder",
      title: "ผู้พิทักษ์เสียงฟ้าผ่า (The Thunder Shield)",
      emoji: "🌩️",
      description: "ในขณะที่โลกภายนอกเสียงดังและน่ากลัว โลกภายในร่มคันนี้จะมีแต่เสียงที่นุ่มนวล",
      intjSide: "เฉยๆ กับฟ้าร้องฟ้าผ่า คอยสังเกตและวางแผนให้ปลอดภัยเสมอ",
      infpSide: "สะดุ้งและกลัวเสียงดังของฟ้าร้องฟ้าผ่า ทำให้ใจสั่นและไม่สบายใจ",
      solution: "เขาพร้อมกอดเธอไว้แน่นๆ หรือเอามือปิดหูเธอไว้ พร้อมชวนคุยเรื่องดวงดาวเพื่อเบี่ยงเบนความสนใจให้ไอซ์ยิ้มได้"
    },
    {
      id: "darkness",
      title: "แสงสว่างในคืนมืดมิด (Cozy Darkness)",
      emoji: "🌌",
      description: "เปลี่ยนความมืดมิดที่น่ากลัวให้กลายเป็นดวงดาวเต็มฟ้าที่เปล่งประกาย",
      intjSide: "รักความมืดและคืนที่เงียบสงัด เพราะเป็นเวลาของการคิดและอยู่กับตัวเอง",
      infpSide: "กลัวความมืดเพราะจินตนาการเรื่องลี้ลับหรือความว่างเปล่าจนกังวล",
      solution: "เขาจะเปิดไฟสีส้มอุ่นๆ ชงโกโก้ร้อนแก้วโปรด และจับมือเธอไว้ ให้รู้ว่าในความมืดมีเขาอยู่เป็นดวงดาวนำทาง"
    },
    {
      id: "ghosts",
      title: "คู่คิดสยบผีร้าย (Ghost-Busting Logic)",
      emoji: "👻",
      description: "ตรรกะอันมั่นคงปะทะจินตนาการอันล้นเหลือ เปลี่ยนความกลัวเป็นเสียงหัวเราะ",
      intjSide: "ใช้เหตุผลและตรรกะ ไม่กลัวผี สนใจเรื่องลึกลับในเชิงวิทยาศาสตร์",
      infpSide: "กลัวผีและสิ่งลี้ลับ เพราะเป็นคนจินตนาการสูงและเซนส์อ่อนไหว",
      solution: "เขาจะพิสูจน์ทุกเสียงก๊อกแก๊กด้วยวิทยาศาสตร์ คอยเป็นบอดี้การ์ดปกป้องไอซ์ ให้เธอหลับปุ๋ยฝันหวานอย่างไร้กังวล"
    }
  ];

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500/5 blur-3xl"></div>
      
      {/* Header with compatibility score */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10 mb-6">
        <div className="flex-1 space-y-2">
          <span className="px-3 py-1 text-xs font-semibold uppercase tracking-widest text-pink-400 bg-pink-500/10 border border-pink-500/20 rounded-full">
            INTJ + INFP Connection
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-2">
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              คะแนนความเข้ากันได้วิเคราะห์โดยระบบ
            </span>{" "}
            💘
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            ความสัมพันธ์สุดลงตัวระหว่างหนุ่มคลั่งรัก <strong className="text-indigo-400">INTJ</strong> และสาวน้อยขี้อ้อน <strong className="text-pink-400">ไอซ์ (INFP)</strong>
          </p>
        </div>

        {/* Dynamic Compatibility Score Layout matching the design HTML */}
        <div className="bg-gradient-to-br from-indigo-950/40 to-slate-900/80 rounded-2xl border border-white/10 p-5 flex flex-col items-center justify-center min-w-[200px] relative overflow-hidden">
          <span className="text-xs uppercase tracking-widest text-slate-400 mb-1">Calculated Score</span>
          <div className="text-5xl font-black text-pink-500 mb-1">
            95<span className="text-2xl text-white/50 font-light">/100</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mt-2">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "95%" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
            ></motion.div>
          </div>
          <p className="mt-2 text-slate-400 text-[10px] text-center italic">"The perfect balance of strength and sensitivity."</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* DESKTOP SIDE-BY-SIDE VIEW (Hidden on mobile/tablet, visible on lg screens) */}
        <div className="hidden lg:col-span-5 lg:flex flex-col gap-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            4 จุดพิกัดเคมีต่างขั้วแต่ลงตัวที่สุด:
          </p>
          {factors.map((factor) => {
            const isSelected = selectedFactor === factor.id;
            return (
              <button
                key={factor.id}
                id={`factor-${factor.id}`}
                onClick={() => {
                  setSelectedFactor(factor.id);
                  setShowSummary(false);
                }}
                className={`w-full flex items-center justify-between p-4 rounded-xl text-left transition-all duration-300 ${
                  isSelected
                    ? "bg-purple-900/30 border border-purple-500/40 shadow-lg shadow-purple-500/5"
                    : "bg-slate-800/40 border border-transparent hover:bg-slate-800/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl" role="img" aria-label={factor.title}>
                    {factor.emoji}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{factor.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-1">{factor.description}</p>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${isSelected ? "rotate-90 text-purple-400" : ""}`} />
              </button>
            );
          })}

          <button
            id="btn-show-summary"
            onClick={() => {
              setSelectedFactor(null);
              setShowSummary(true);
            }}
            className={`mt-2 w-full py-3 px-4 rounded-xl text-center text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              showSummary
                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/20"
                : "bg-slate-800 hover:bg-slate-700 text-slate-300"
            }`}
          >
            <Sparkles className="w-4 h-4" /> สรุปเคมีแห่งรักแบบลึกซึ้ง ✨
          </button>
        </div>

        {/* DESKTOP DETAILS PANEL (Visible only on lg) */}
        <div className="hidden lg:col-span-7 bg-white/5 border border-white/10 rounded-2xl p-5 min-h-[300px] lg:flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {selectedFactor && (
              <motion.div
                key={selectedFactor}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full justify-between"
              >
                {(() => {
                  const factor = factors.find((f) => f.id === selectedFactor)!;
                  return (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">{factor.emoji}</span>
                        <div>
                          <h3 className="text-lg font-bold text-white">{factor.title}</h3>
                          <p className="text-xs text-purple-300 font-mono tracking-wider">Opposites Attract</p>
                        </div>
                      </div>

                      <p className="text-slate-300 text-sm leading-relaxed italic bg-slate-900/40 p-3 rounded-xl border-l-2 border-purple-400">
                        "{factor.description}"
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        {/* INTJ Side */}
                        <div className="bg-slate-900/50 p-4 rounded-2xl border border-indigo-500/20">
                          <span className="text-xs font-semibold text-indigo-300 mb-1 uppercase tracking-tighter block">
                            คุณ (INTJ) - โลกสีหม่นพายุ
                          </span>
                          <p className="text-slate-200 text-xs leading-relaxed mt-1">{factor.intjSide}</p>
                        </div>
                        {/* INFP Side */}
                        <div className="bg-slate-900/50 p-4 rounded-2xl border border-pink-500/20">
                          <span className="text-xs font-semibold text-pink-300 mb-1 uppercase tracking-tighter block">
                            ไอซ์ (INFP) - หัวใจที่อ่อนโยน
                          </span>
                          <p className="text-slate-200 text-xs leading-relaxed mt-1">{factor.infpSide}</p>
                        </div>
                      </div>

                      {/* Sweet complementary outcome */}
                      <div className="mt-4 p-4 bg-gradient-to-r from-indigo-950/40 to-pink-950/40 rounded-xl border border-white/10">
                        <div className="flex items-center gap-2 mb-1.5 text-pink-300 font-bold text-sm">
                          <Shield className="w-4 h-4 text-pink-400 shrink-0" />
                          <span>จุดคลิกที่ลงตัวที่สุด (Cozy Solution):</span>
                        </div>
                        <p className="text-slate-200 text-xs md:text-sm leading-relaxed pl-6">
                          {factor.solution}
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}

            {showSummary && (
              <motion.div
                key="summary"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 text-pink-400">
                  <Heart className="w-6 h-6 fill-current" />
                  <h3 className="text-lg font-bold text-white">บทสรุปทำไมเราสองคนถึง "คลิก" กัน</h3>
                </div>

                <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                  <p>
                    ความกลัวในความมืด ฟ้าร้อง หรือผีร้ายของ <strong className="text-pink-300 font-semibold">ไอซ์ (INFP)</strong> อาจดูเหมือนเป็นขั้วตรงข้ามกับความชื่นชอบบรรยากาศเหล่านั้นของ <strong className="text-indigo-300 font-semibold">คุณ (INTJ)</strong> แต่ในทางจิตวิทยา นี่คือ **"การเติมเต็มที่สมบูรณ์แบบ"**
                  </p>
                  <p>
                    แทนที่จะแยกย้ายกันไปตามรสนิยม ความชื่นชอบของฝ่ายชายจะกลายเป็นเกราะป้องกันความกลัวให้แก่ไอซ์:
                  </p>
                  
                  <div className="space-y-2 mt-2 bg-slate-900/50 p-3.5 rounded-xl border border-white/10">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span><strong>ความชอบฝน/ความมืด</strong> ของเขา ทำให้เขาเยือกเย็น ปลอดภัย มั่นคง ในตอนที่พายุมาถึง</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span><strong>ความอ่อนโยนของไอซ์</strong> เป็นพื้นที่อบอุ่นที่ทำให้ตรรกะอันเฉียบคมของหนุ่ม INTJ กลายเป็นความอ่อนหวานเพื่อถนอมใจเธอ</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span><strong>ร่มคันเดียวในพายุ</strong> จะเปลี่ยนทุกความน่ากลัวของธรรมชาติให้กลายเป็นความโรแมนติกที่ตราตรึงใจ</span>
                    </div>
                  </div>

                  <p className="text-slate-400 text-xs text-center pt-2 italic">
                    "เพราะว่าเธอขี้กลัว... เขาจึงได้มีโอกาสปกป้องดูแลเธออย่างดีที่สุดไงล่ะ 💕"
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* MOBILE & TABLET ADAPTIVE ACCORDION VIEW (Visible on screens smaller than lg) */}
        <div className="lg:hidden col-span-1 space-y-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            แตะเลือกดูเพื่อกางข้อมูลวิเคราะห์ของแต่ละพิกัด 👇
          </p>
          
          <div className="space-y-3.5">
            {factors.map((factor) => {
              const isSelected = selectedFactor === factor.id;
              return (
                <div 
                  key={factor.id} 
                  className={`rounded-2xl overflow-hidden border transition-all duration-300 ${
                    isSelected 
                      ? "bg-slate-900/80 border-purple-500/50 shadow-md shadow-purple-500/10" 
                      : "bg-slate-800/30 border-transparent"
                  }`}
                >
                  <button
                    onClick={() => {
                      setSelectedFactor(isSelected ? null : factor.id);
                      setShowSummary(false);
                    }}
                    className={`w-full flex items-center justify-between p-4 text-left transition-colors duration-200 ${
                      isSelected ? "bg-purple-900/20" : "hover:bg-slate-800/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl" role="img" aria-label={factor.title}>
                        {factor.emoji}
                      </span>
                      <div>
                        <h3 className="text-xs sm:text-sm font-bold text-white">{factor.title}</h3>
                        <p className="text-[11px] text-slate-400 line-clamp-1">{factor.description}</p>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${isSelected ? "rotate-90 text-purple-400" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isSelected && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 border-t border-white/5 bg-slate-950/40 space-y-4">
                          <p className="text-slate-300 text-xs leading-relaxed italic bg-slate-900/60 p-3 rounded-xl border-l-2 border-purple-400">
                            "{factor.description}"
                          </p>

                          <div className="grid grid-cols-1 gap-3">
                            {/* INTJ Side */}
                            <div className="bg-slate-900/50 p-3.5 rounded-xl border border-indigo-500/15">
                              <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider block">
                                คุณ (INTJ) - โลกสีหม่นพายุ
                              </span>
                              <p className="text-slate-200 text-xs leading-relaxed mt-1">{factor.intjSide}</p>
                            </div>
                            {/* INFP Side */}
                            <div className="bg-slate-900/50 p-3.5 rounded-xl border border-pink-500/15">
                              <span className="text-[10px] font-bold text-pink-300 uppercase tracking-wider block">
                                ไอซ์ (INFP) - หัวใจที่อ่อนโยน
                              </span>
                              <p className="text-slate-200 text-xs leading-relaxed mt-1">{factor.infpSide}</p>
                            </div>
                          </div>

                          {/* Sweet complementary outcome */}
                          <div className="p-3.5 bg-gradient-to-r from-indigo-950/50 to-pink-950/50 rounded-xl border border-white/10">
                            <div className="flex items-center gap-1.5 mb-1 text-pink-300 font-bold text-xs">
                              <Shield className="w-3.5 h-3.5 text-pink-400 shrink-0 animate-pulse" />
                              <span>จุดคลิกที่ลงตัวที่สุด (Cozy Solution):</span>
                            </div>
                            <p className="text-slate-200 text-xs leading-relaxed">
                              {factor.solution}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Mobile Summary Accordion Card */}
            <div 
              className={`rounded-2xl overflow-hidden border transition-all duration-300 ${
                showSummary 
                  ? "bg-slate-900/80 border-pink-500/50 shadow-md shadow-pink-500/10" 
                  : "bg-slate-800/30 border-transparent"
              }`}
            >
              <button
                onClick={() => {
                  setSelectedFactor(null);
                  setShowSummary(!showSummary);
                }}
                className={`w-full flex items-center justify-between p-4 text-left transition-colors duration-200 ${
                  showSummary ? "bg-pink-900/15" : "hover:bg-slate-800/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl" role="img" aria-label="Heart summary">
                    💝
                  </span>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white">สรุปเคมีแห่งรักแบบลึกซึ้ง ✨</h3>
                    <p className="text-[11px] text-slate-400 line-clamp-1">ทำไมเราสองคนถึงกลายเป็นคู่แท้ที่เติมเต็มกันและกัน</p>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${showSummary ? "rotate-90 text-pink-400" : ""}`} />
              </button>

              <AnimatePresence initial={false}>
                {showSummary && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 border-t border-white/5 bg-slate-950/40 space-y-4">
                      <div className="space-y-3.5 text-slate-300 text-xs leading-relaxed">
                        <p>
                          ความกลัวในความมืด ฟ้าร้อง หรือผีร้ายของ <strong className="text-pink-300 font-semibold">ไอซ์ (INFP)</strong> อาจดูเหมือนเป็นขั้วตรงข้ามกับความชื่นชอบบรรยากาศเหล่านั้นของ <strong className="text-indigo-300 font-semibold">คุณ (INTJ)</strong> แต่ในทางจิตวิทยา นี่คือ **"การเติมเต็มที่สมบูรณ์แบบ"**
                        </p>
                        <p>
                          แทนที่จะแยกย้ายกันไปตามรสนิยม ความชื่นชอบของฝ่ายชายจะกลายเป็นเกราะป้องกันความกลัวให้แก่ไอซ์:
                        </p>
                        
                        <div className="space-y-2 bg-slate-900/60 p-3.5 rounded-xl border border-white/10">
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                            <span><strong>ความชอบฝน/ความมืด</strong> ของเขา ทำให้เขาเยือกเย็น ปลอดภัย มั่นคง ในตอนที่พายุมาถึง</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                            <span><strong>ความอ่อนโยนของไอซ์</strong> เป็นพื้นที่อบอุ่นที่ทำให้ตรรกะอันเฉียบคมของหนุ่ม INTJ กลายเป็นความอ่อนหวานเพื่อถนอมใจเธอ</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                            <span><strong>ร่มคันเดียวในพายุ</strong> จะเปลี่ยนทุกความน่ากลัวของธรรมชาติให้กลายเป็นความโรแมนติกที่ตราตรึงใจ</span>
                          </div>
                        </div>

                        <p className="text-slate-400 text-[11px] text-center pt-2 italic">
                          "เพราะว่าเธอขี้กลัว... เขาจึงได้มีโอกาสปกป้องดูแลเธออย่างดีที่สุดไงล่ะ 💕"
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
