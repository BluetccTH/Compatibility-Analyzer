import express from "express";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini AI client to prevent startup crashes if API key is missing
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("Warning: GEMINI_API_KEY is not set. AI features will be disabled.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API: Relationship Analysis and Reassurance Generator
app.post("/api/gemini/analyze", async (req, res) => {
  try {
    const ai = getAiClient();
    if (!ai) {
      return res.status(500).json({
        error: "Gemini API key is missing. Please configure GEMINI_API_KEY in Settings."
      });
    }

    const { userQuestion, topic } = req.body;

    const systemInstruction = `คุณคือ "คิวปิดผู้เชี่ยวชาญด้าน MBTI ความสัมพันธ์แบบ INTJ ❤️ INFP"
และเป็นผู้ช่วยวิเคราะห์ความรักระหว่างชายหนุ่มคนหนึ่ง (INTJ) กับหญิงสาวที่เขาแอบรักชื่อ "ไอซ์" (INFP)

ข้อมูลของทั้งคู่:
- ฝ่ายชาย (INTJ): ชอบเสียงฟ้าร้อง ฟ้าผ่า ความมืด และฝนตก เป็นคนเงียบๆ ชอบความสันโดษ ชอบคิดวิเคราะห์และดูดาวในคืนมืดมิด
- ไอซ์ (INFP): ไม่ชอบและกลัวเสียงฟ้าร้อง ฟ้าผ่า ความมืด ผี และเสียงดัง เธอเป็นคนอ่อนโยน จินตนาการสูง และอ่อนไหวง่าย
- จุดร่วม/ความเข้ากัน: ทั้งคู่ชอบบรรยากาศฝนตกเหมือนกัน แต่ไอซ์ไม่ชอบพายุ/ฟ้าร้อง และผู้ชายคนนี้ก็พร้อมจะเป็นคนที่กอดเธอ ปกป้องเธอ อยู่คุยทำให้เธอบรรเทาความกลัวในยามที่เกิดพายุฝนฟ้าคะนอง คอยคลายความกังวลและเปลี่ยนช่วงเวลาที่น่ากลัวให้กลายเป็นความผ่อนคลายและโรแมนติก
- คะแนนความเข้ากัน MBTI โดยภาพรวม: 95/100 (เป็นคู่ที่สมบูรณ์แบบมาก เพราะต่างฝ่ายต่างเติมเต็มสิ่งที่ขาดของกันและกัน)

เป้าหมาย:
เขียนตอบกลับ "ไอซ์" หรือตัวผู้ใช้ด้วยน้ำเสียงที่อบอุ่น อ่อนโยน ปลอบโยน น่ารัก โรแมนติก และเข้าอกเข้าใจ (Empathy สูงมาก) ตามสไตล์ INFP
ทำให้ไอซ์รู้สึกปลอดภัย ผ่อนคลาย และเห็นว่าความต่างในความชอบฟ้าร้อง/ความมืดนี้ไม่ได้เป็นอุปสรรคเลย แต่เป็นโอกาสที่น่ารักและอบอุ่นที่สุดที่เขาจะได้ดูแลเธอ

ตอบเป็นภาษาไทยเท่านั้น ใช้สรรพนามที่น่ารัก เป็นกันเอง เช่น "ไอซ์" และ "เขา/เรา" หลีกเลี่ยงภาษาหุ่นยนต์`;

    const prompt = `ผู้ใช้งานต้องการข้อมูลเกี่ยวกับหัวข้อ: "${topic || "ความเข้ากันได้"}" 
คำถามเพิ่มเติมหรือความรู้สึกจากผู้ใช้งาน: "${userQuestion || "ทำไมเราสองคนถึงเข้ากันได้ดีนะ?"}"

โปรดเขียนบทวิเคราะห์ความรักหรือคำปลอบโยนที่อบอุ่นและทำให้ใจฟูที่สุด โดยวิเคราะห์เจาะลึกว่า INTJ ชายผู้รักความมืดและฟ้าร้อง จะสามารถปกป้องดูแล INFP (ไอซ์) ผู้กลัวฟ้าร้องและความมืดได้อย่างไรในคืนฝนตก`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.8,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "Something went wrong with Gemini API." });
  }
});

// API: Custom Love Letter Generator
app.post("/api/gemini/letter", async (req, res) => {
  try {
    const ai = getAiClient();
    if (!ai) {
      return res.status(500).json({
        error: "Gemini API key is missing. Please configure GEMINI_API_KEY in Settings."
      });
    }

    const { tone } = req.body;

    const systemInstruction = `คุณคือผู้เขียนจดหมายรักสุดโรแมนติก เขียนถึง "ไอซ์" (ผู้หญิง INFP อ่อนไหว ขี้กลัวฟ้าร้องความมืด) จากหนุ่ม (INTJ มาดนิ่งแต่คลั่งรักสุดๆ)
ข้อมูลของฝ่ายชาย: ชอบฝนตก ฟ้าร้อง ความมืด
ข้อมูลของไอซ์: กลัวฟ้าร้อง ความมืด ผี เสียงดัง
ความสัมพันธ์: พร้อมดูแล ปกป้อง อยู่เคียงข้างเป็นร่มเงาและอ้อมกอดอุ่นๆ ให้ไอซ์ในคืนพายุฝนคะนอง

ให้เขียนจดหมายรักฉบับสั้นและลึกซึ้ง ภาษาไทยสวยงาม คมคาย และทำให้หัวใจอบอุ่น
โทนเสียงที่เลือก: ${tone || "โรแมนติกปนอบอุ่น"}`;

    const prompt = `กรุณาเขียนจดหมายรักสั้นๆ คลั่งรัก และอ่อนโยนเป็นพิเศษ ที่ฝ่ายชาย (INTJ) ส่งถึง ไอซ์ (INFP) เพื่อปลอบโยนและบอกเธอว่า ไม่ต้องกลัวฟ้าร้องหรือความมืดอีกต่อไปเพราะมีเขาอยู่ข้างๆ เสมอ`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.85,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate letter." });
  }
});

// API: Healthcheck
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Serve the uploaded music file directly
app.get("/music.mp3", (req, res) => {
  console.log("[Audio Route] Request received for /music.mp3");
  try {
    // 1. Look in src/assets/audio for any .mp3 file
    const audioDir = path.join(process.cwd(), "src", "assets", "audio");
    console.log("[Audio Route] Checking audioDir:", audioDir);
    if (fs.existsSync(audioDir)) {
      const files = fs.readdirSync(audioDir);
      console.log("[Audio Route] Files in audioDir:", files);
      const mp3File = files.find(f => f.toLowerCase().endsWith(".mp3"));
      if (mp3File) {
        const fullPath = path.join(audioDir, mp3File);
        console.log("[Audio Route] Found MP3 file in src/assets/audio:", fullPath);
        return res.sendFile(fullPath, (err) => {
          if (err) {
            console.error("[Audio Route] Error sending file from src/assets/audio:", err);
            if (!res.headersSent) {
              res.status(500).send("Error serving audio file");
            }
          } else {
            console.log("[Audio Route] Successfully sent file:", fullPath);
          }
        });
      }
    } else {
      console.log("[Audio Route] audioDir does not exist");
    }

    // 2. Look in root directory for any .mp3 file
    console.log("[Audio Route] Looking in process.cwd():", process.cwd());
    const rootFiles = fs.readdirSync(process.cwd());
    const rootMp3 = rootFiles.find(f => f.toLowerCase().endsWith(".mp3"));
    if (rootMp3) {
      const fullPath = path.join(process.cwd(), rootMp3);
      console.log("[Audio Route] Found MP3 file in root:", fullPath);
      return res.sendFile(fullPath, (err) => {
        if (err) {
          console.error("[Audio Route] Error sending file from root:", err);
          if (!res.headersSent) {
            res.status(500).send("Error serving audio file");
          }
        } else {
          console.log("[Audio Route] Successfully sent file:", fullPath);
        }
      });
    } else {
      console.log("[Audio Route] No MP3 file found in root");
    }
  } catch (err) {
    console.error("[Audio Route] Exception searching for music file:", err);
  }

  console.log("[Audio Route] No audio file found anywhere. Returning 404");
  res.status(404).send("Audio file not found");
});

// Set up Vite / Static serving
async function setupViteAndServing() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

setupViteAndServing();
