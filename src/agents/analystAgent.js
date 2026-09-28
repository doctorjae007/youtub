export const analyzeTrends = (trends) => trends.map((trend, index) => ({
  ...trend,
  analysis: {
    pattern: index % 2 ? 'เรื่องเล่าที่มีจุดหักมุม' : 'อธิบายแท็กติกด้วยภาพง่าย',
    hookPattern: index % 2 ? 'ตั้งคำถามที่คนดูอยากตอบ' : 'เปิดด้วยตัวเลขหรือช่วงเวลาสั้น',
    angle: `เล่า ${trend.topic} ผ่านเหตุและผล แทนการสรุปข่าว`,
    whyInteresting: `อัตราการรับชม ${trend.viewsPerHour.toLocaleString('th-TH')} ครั้ง/ชม. พร้อม engagement ที่มีนัยสำคัญ`,
    freshness: trend.freshness,
    misinformationRisk: trend.risk,
    copyrightRisk: 'ห้ามใช้ภาพ/เสียงจากวิดีโอต้นทาง ใช้เฉพาะข้อมูลอ้างอิงและกราฟิกต้นฉบับ',
  },
}));
