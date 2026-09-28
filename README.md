# Football Content Agent

ระบบ AI Content Agent สำหรับคอนเทนต์ฟุตบอลแนวตั้งภาษาไทย ตั้งแต่ค้นหาเทรนด์ → วิเคราะห์ → สร้างไอเดีย → ให้ผู้ใช้เลือก → กำกับฉาก → Preview/Render ด้วย Remotion

## เริ่มใช้งาน

```bash
npm install
copy .env.example .env
npm run dev
```

- Dashboard: `http://localhost:5173`
- API: `http://localhost:8787`
- Remotion Studio: `npm run studio`
- Render ตัวอย่าง: `npm run render`

หากยังไม่ใส่ `VITE_YOUTUBE_API_KEY` ระบบจะใช้ mock data ที่เตรียมไว้ ทำให้ workflow ทั้งหมดทดลองได้ทันที

## Workflow

1. **Scout** — ค้นวิดีโอล่าสุดและคำนวณ `videoAgeHours`, `viewsPerHour`, `likeRate`, `commentRate`
2. **Analyst** — วิเคราะห์ topic, hook, angle, freshness, misinformation และ copyright risk
3. **Creator** — สร้าง 5 ไอเดียภาษาไทย พร้อมสคริปต์ 30–60 วินาที
4. **Human approval** — ผู้ใช้ต้องเลือกไอเดียก่อนเสมอ
5. **Director** — แปลงไอเดียเป็น 6–10 scene JSON
6. **Remotion** — Preview 1080×1920, 30 FPS และ Render MP4

คะแนนเทรนด์เป็น composite score: velocity 48% + engagement 32% + freshness 20% จึงไม่ใช้ยอดวิวเป็นเกณฑ์เพียงอย่างเดียว

## โครงสร้าง

```text
src/
  agents/       Scout, Analyst, Creator, Director
  components/   Dashboard UI
  providers/    VoiceProvider และ AssetProvider
  remotion/     FootballVideo, scenes, subtitle, tactical board
  services/     Browser API client
server/         Local JSON API และ Remotion renderer
data/
  trends/       YYYY-MM-DD.json
  ideas/        YYYY-MM-DD.json
  projects/     project-id.json
```

## ขอบเขต V1

- ใช้ CSS/SVG, asset ที่ผู้ใช้อัปโหลด หรือ asset ที่มีสิทธิ์ใช้งาน
- รองรับ mock voice และไฟล์เสียงของผู้ใช้
- ไม่มี Supabase, Firebase, Login, TikTok API หรือ Auto Post
- ไม่ดาวน์โหลด footage การแข่งขันหรือวิดีโอของครีเอเตอร์อื่นมาใช้ซ้ำ

