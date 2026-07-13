import { useState } from "react";
import { 
  Heart, 
  Sparkles, 
  Gamepad2, 
  UtensilsCrossed, 
  Compass, 
  Users, 
  Smile, 
  MapPin, 
  CheckCircle2, 
  BookOpen, 
  SmilePlus, 
  Flame, 
  Cake,
  Lightbulb,
  Dog,
  Coffee
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

function calculateAge(birthDateStr: string): number {
  const today = new Date();
  const birthDate = new Date(birthDateStr);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export default function ProfileComparison() {
  const [activeSection, setActiveSection] = useState<"intro" | "food" | "hobbies" | "personality">("intro");

  // Custom data for Kao & Ice
  const kaoInfo = {
    nickname: "ก้าว (Kao) 🔭",
    fullName: "ชิษณุพงศ์ เรณูหอม",
    age: `${calculateAge("2009-04-03")} ปี`,
    mbti: "INTJ",
    birthday: "วันศุกร์ที่ 3 เมษายน ค.ศ. 2009 (2552)",
    province: "ปทุมธานี (ภาคกลาง)",
    favorites: {
      games: ["Roblox", "RoV", "Neverness to Everness (NTE)"],
      food: ["กะเพรา", "สเต๊ก", "ราเมง", "ไก่ทอด KFC", "พิซซ่าฮาวายเอี้ยน", "คาโบนาร่า"],
      drinks: ["น้ำเปล่าคริสตัล", "ชาเขียวมัทฉะ (หวาน 0-25%)", "Coke Zero / Pepsi Max"],
      snacks: ["KitKat รสชาเขียว", "Oreo ชาเขียว", "Pocky ชาเขียว", "Pringles Sour Cream"],
      pets: ["แมว", "หมา", "กระต่าย"],
      hobbies: ["ดูดาว / ศึกษาดาราศาสตร์ 🔭", "เขียนโปรแกรม 💻", "พัฒนา AI 🤖", "ทำโปรเจกต์"]
    }
  };

  const iceInfo = {
    nickname: "ไอซ์ (Ice) 🧊",
    fullName: "อาริตา ราชนาวี",
    age: `${calculateAge("2007-10-06")} ปี`,
    mbti: "INFP",
    birthday: "วันเสาร์ที่ 6 ตุลาคม ค.ศ. 2007 (2550)",
    province: "อุบลราชธานี (ภาคอีสาน)",
    favorites: {
      games: ["Roblox", "RoV", "Stardew Valley 🌾"],
      food: ["กะเพรา", "ก๋วยเตี๋ยว", "แกงกะหรี่ญี่ปุ่น", "หมูกระทะ", "ไก่ทอด KFC", "คาโบนาร่า"],
      drinks: ["น้ำเปล่าคริสตัล", "โออิชิรสส้ม", "เย็นเย็น", "เพียวริคุ", "โอรีโอ้ปั่น"],
      snacks: ["KitKat ธรรมดา", "Pringles Sour Cream", "Loacker แดง", "เนลี่สีฟ้า/เขียว"],
      pets: ["แมววิเชียรมาศ 🐱", "หมา 🐶"],
      hobbies: ["คุยเรื่องน่ารักๆ", "เล่นเกมผ่อนคลาย", "จินตนาการเรื่องราวแสนหวาน"]
    }
  };

  // Matched highlights to make her heart melt
  const foodMatches = [
    { name: "ผัดกะเพราจานโปรด", desc: "ทั้งคู่รักการกินกะเพราที่สุด เป็นอาหารหลักเชื่อมใจ 🍽️" },
    { name: "สปาเกตตีคาโบนาร่า", desc: "เมนูเส้นหอมชีสสุดฟินที่ถูกใจทั้งสองคน 🍝" },
    { name: "ไก่ทอด KFC แสนกรอบ", desc: "ความอร่อยฟินยามค่ำคืนคู่พายุฝน 🍗" },
    { name: "น้ำเปล่าคริสตัล", desc: "และจุดร่วมที่ตลกคือ 'เกลียดน้ำสิงห์' เหมือนกันเป๊ะ! 💧❌🦁" },
    { name: "Pringles Sour Cream", desc: "มันฝรั่งทอดกรอบซาวครีมกล่องยาวเขียว ทานคู่กันตอนเล่นเกม 🥔" }
  ];

  const gameMatches = [
    { name: "Roblox", desc: "เกมที่เปิดโลกกว้างให้ก้าวกับไอซ์ไปพจญภัยและสร้างบ้านด้วยกัน 🎮" },
    { name: "RoV", desc: "ไต่แรงค์ปกป้องเลนด้วยกัน ก้าวคอยแทงค์และเป็นบอดี้การ์ดให้ไอซ์เสมอ 🛡️" }
  ];

  const petMatches = [
    { name: "เหล่าน้องหมาน้องแมว", desc: "ก้าวรักกระต่ายและหมาแมว ส่วนไอซ์ก็เลิฟหมาแมววิเชียรมาศสุดนุ่มฟู 🐱🐶" }
  ];

  return (
    <div className="bg-gradient-to-b from-sky-950/80 to-slate-950/90 border border-sky-400/30 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      {/* Visual background details to fit her blue preference */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

      {/* Decorative Title */}
      <div className="text-center space-y-3 mb-8">
        <span className="px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-sky-300 bg-sky-500/15 border border-sky-400/30 rounded-full inline-flex items-center gap-1.5 animate-pulse">
          <Heart className="w-3.5 h-3.5 fill-current text-sky-400" />
          วิเคราะห์เจาะลึก: ชิษณุพงศ์ 💖 อาริตา
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-200 to-sky-400">
            คู่มือหัวใจสองเรา: ก้าว & ไอซ์
            
          </span>{" "}
          🌌🧊
          
        </h2>
        <p className="text-slate-300 text-sm max-w-xl mx-auto">
          เพื่อทำให้ไอซ์รู้สึกดีที่สุด เรามาดูจุดเชื่อมโยงของหนุ่มปทุมธานีผู้เงียบขรึมรักดาราศาสตร์ กับสาวอุบลผู้ใจดีที่มีจินตนาการล้นเหลือกันค่ะ
        </p>
      </div>

      {/* Section Tab bar */}
      <div className="flex w-full overflow-x-auto pb-2 mb-6 scrollbar-none justify-start md:justify-center touch-pan-x">
        <div className="flex gap-1.5 p-1 bg-slate-900/60 rounded-xl border border-sky-500/10 flex-nowrap shrink-0">
          <button
            onClick={() => setActiveSection("intro")}
            className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-[10px] sm:text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1 sm:gap-1.5 ${
              activeSection === "intro" ? "bg-sky-500 text-slate-950 shadow-md shadow-sky-400/20" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Compass className="w-3.5 h-3.5 shrink-0" /> ประวัติเบื้องต้น 📖
          </button>
          <button
            onClick={() => setActiveSection("food")}
            className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-[10px] sm:text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1 sm:gap-1.5 ${
              activeSection === "food" ? "bg-sky-500 text-slate-950 shadow-md shadow-sky-400/20" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5 shrink-0" /> อาหารแสนอร่อย 🍽️
          </button>
          <button
            onClick={() => setActiveSection("hobbies")}
            className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-[10px] sm:text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1 sm:gap-1.5 ${
              activeSection === "hobbies" ? "bg-sky-500 text-slate-950 shadow-md shadow-sky-400/20" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5 shrink-0" /> เกมและสัตว์เลี้ยง 🎮🐾
          </button>
          <button
            onClick={() => setActiveSection("personality")}
            className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-[10px] sm:text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1 sm:gap-1.5 ${
              activeSection === "personality" ? "bg-sky-500 text-slate-950 shadow-md shadow-sky-400/20" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <SmilePlus className="w-3.5 h-3.5 shrink-0" /> ความอบอุ่น 🧸
          </button>
        </div>
      </div>

      {/* Dynamic Content Display */}
      <AnimatePresence mode="wait">
        {activeSection === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* KAO PROFILE */}
            <div className="bg-sky-950/30 border border-sky-400/20 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-sky-500/20 rounded-full flex items-center justify-center border border-sky-400 text-2xl shadow-inner">
                  👦
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base flex items-center gap-1.5">
                    {kaoInfo.nickname} <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">{kaoInfo.mbti}</span>
                  </h3>
                  <p className="text-xs text-sky-200/70">{kaoInfo.fullName}</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300 font-mono">
                <div className="flex items-center gap-2 bg-slate-900/40 p-2 rounded-lg">
                  <Cake className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>วันเกิด: {kaoInfo.birthday} (อายุ {kaoInfo.age})</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/40 p-2 rounded-lg">
                  <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>บ้านเกิด: {kaoInfo.province}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/40 p-2 rounded-lg">
                  <Coffee className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>ชอบพิเศษ: นั่งดูดาว 🔭, เขียนโปรแกรม, และฟ้าร้องฝนตก 🌩️</span>
                </div>
              </div>
            </div>

            {/* ICE PROFILE */}
            <div className="bg-sky-950/30 border border-sky-400/20 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center border border-pink-400 text-2xl shadow-inner">
                  👧
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base flex items-center gap-1.5">
                    {iceInfo.nickname} <span className="text-xs bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded-full">{iceInfo.mbti}</span>
                  </h3>
                  <p className="text-xs text-pink-200/70">{iceInfo.fullName}</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300 font-mono">
                <div className="flex items-center gap-2 bg-slate-900/40 p-2 rounded-lg">
                  <Cake className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>วันเกิด: {iceInfo.birthday} (อายุ {iceInfo.age})</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/40 p-2 rounded-lg">
                  <MapPin className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>บ้านเกิด: {iceInfo.province}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/40 p-2 rounded-lg">
                  <Heart className="w-4 h-4 text-pink-400 shrink-0 animate-pulse" />
                  <span>ชอบพิเศษ: คนพูดเพราะ, นิสัยใจดี, และแมววิเชียรมาศแสนรัก 🐱</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === "food" && (
          <motion.div
            key="food"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="bg-sky-950/20 border border-sky-500/10 p-4 rounded-xl text-center">
              <p className="text-xs text-sky-200 leading-relaxed font-mono">
                💡 เกษรความน่ารัก: ทั้งสองคน "ไม่ชอบน้ำดื่มตราสิงห์" เหมือนกัน และชอบดื่มน้ำแร่ "คริสตัล" ที่สะอาดสดชื่นที่สุด!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {foodMatches.map((match, i) => (
                <div key={i} className="bg-slate-900/40 border border-sky-400/10 p-4 rounded-xl flex items-start gap-3 hover:border-sky-400/30 transition-all">
                  <div className="w-8 h-8 rounded-full bg-sky-500/15 flex items-center justify-center text-sky-400 shrink-0 font-bold text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{match.name}</h4>
                    <p className="text-slate-300 text-xs mt-1 leading-relaxed">{match.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === "hobbies" && (
          <motion.div
            key="hobbies"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Game Matcher */}
              <div className="bg-sky-950/30 border border-sky-400/20 rounded-2xl p-5 space-y-4">
                <h3 className="font-extrabold text-white text-sm flex items-center gap-2 border-b border-sky-500/10 pb-2">
                  <Gamepad2 className="w-4 h-4 text-sky-400" /> สมรภูมิเกมรัก (Game Matches)
                </h3>
                <div className="space-y-3">
                  {gameMatches.map((g, i) => (
                    <div key={i} className="bg-slate-900/40 p-3 rounded-xl border border-sky-500/5">
                      <span className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        {g.name}
                      </span>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{g.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pet Matcher */}
              <div className="bg-sky-950/30 border border-sky-400/20 rounded-2xl p-5 space-y-4">
                <h3 className="font-extrabold text-white text-sm flex items-center gap-2 border-b border-sky-500/10 pb-2">
                  <Dog className="w-4 h-4 text-sky-400" /> เหล่าสัตว์เลี้ยงเพื่อนรัก (Pets Alignment)
                </h3>
                <div className="space-y-3">
                  {petMatches.map((p, i) => (
                    <div key={i} className="bg-slate-900/40 p-3 rounded-xl border border-sky-500/5">
                      <span className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        {p.name}
                      </span>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
                  <div className="text-[11px] text-sky-200/70 italic text-center p-2">
                    "วันข้างหน้า เราสองคนจะมาสร้างบ้านและเลี้ยงตู้เจ้าเหมียวไปด้วยกันนะค๊าา 🐱💖"
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === "personality" && (
          <motion.div
            key="personality"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* INTJ/INFP deep dynamic matching */}
            <div className="bg-slate-900/60 border border-sky-400/10 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2.5 text-sky-400">
                <Lightbulb className="w-5 h-5 animate-bounce" />
                <h3 className="font-extrabold text-white text-sm">การทำงานร่วมกันของหัวใจก้าว & ไอซ์</h3>
              </div>
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                ในขณะที่ <strong className="text-sky-300">ก้าว (INTJ)</strong> เป็นหนุ่มที่มีเหตุผล มั่นคง สุภาพ พูดเพราะ และจริงใจอย่างยิ่ง คอยวางแผนชีวิตอย่างเฉียบคม... 
                เขาจะเข้ามาสวมกอดปกป้อง <strong className="text-pink-300">ไอซ์ (INFP)</strong> สาวน้อยผู้อ่อนโยน ใจดี และมีความเป็นผู้นำแฝงอยู่ ช่วยประคองจิตวิญญาณศิลปินของไอซ์ให้สงบและปลอดภัย
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                <div className="bg-sky-950/40 border border-sky-500/10 p-3 rounded-xl">
                  <span className="text-xs font-bold text-sky-300 block mb-1">🛡️ บอดี้การ์ดสยบฟ้าร้อง</span>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    ก้าวชอบเสียงพายุ/ความมืด จึงไม่มีความกลัวใดๆ พร้อมใช้แขนแกร่งๆ ปกป้องกอดปิดหูและคลายความกลัวให้ไอซ์
                  </p>
                </div>
                <div className="bg-sky-950/40 border border-sky-500/10 p-3 rounded-xl">
                  <span className="text-xs font-bold text-sky-300 block mb-1">🌌 ความรักดวงดาว</span>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    ก้าวรักดาราศาสตร์ ดูดาว 🔭 และท้องฟ้าจำลอง ซึ่งไอซ์ก็พร้อมนอนข้างๆ จับมือเขาดูดาวในคืนมืดมิดด้วยกัน
                  </p>
                </div>
                <div className="bg-sky-950/40 border border-sky-500/10 p-3 rounded-xl">
                  <span className="text-xs font-bold text-sky-300 block mb-1">🤝 ความซื่อสัตย์ระดับสูง</span>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    ทั้งคู่เกลียดคนโกหก เสแสร้ง และคนนอกใจ ความซื่อสัตย์ 100% จึงทำให้รักครั้งนี้มั่นคงถาวรไม่คลอนแคลน
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
