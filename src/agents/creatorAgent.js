export const createIdeas = ({templateIdeas, analyses, count = 5}) => templateIdeas.slice(0, count).map((idea, index) => ({
  ...idea,
  basedOnTrendId: analyses[index % analyses.length]?.id,
  originalityNote: 'Original commentary: สังเคราะห์ประเด็นใหม่จากข้อมูลแนวโน้ม ไม่คัดลอกสคริปต์หรือถ้อยคำของครีเอเตอร์',
}));
