// Rule-based starter AI service.
// Replace these functions with an ML model, Python service, OpenAI-compatible API,
// Hugging Face model, or another production AI provider later.

const rules = [
  { words: ["water", "leak", "pipe", "tap"], category: "WATER", department: "Water & Sanitation" },
  { words: ["road", "pothole", "street road"], category: "ROAD_DAMAGE", department: "Roads & Infrastructure" },
  { words: ["streetlight", "street light", "lamp", "dark"], category: "STREETLIGHT", department: "Electrical Maintenance" },
  { words: ["garbage", "waste", "dump"], category: "GARBAGE", department: "Sanitation" },
  { words: ["drain", "drainage", "sewage", "overflow"], category: "DRAINAGE", department: "Drainage & Public Works" }
];

function analyzeComplaintText(text, selectedCategory = null) {
  const value = String(text || "").toLowerCase();
  let category = selectedCategory || "OTHER";
  let department = "General Administration";

  for (const rule of rules) {
    if (rule.words.some(word => value.includes(word))) {
      category = rule.category;
      department = rule.department;
      break;
    }
  }

  let priority = "MEDIUM";
  if (/\b(accident|emergency|danger|fire|collapse)\b/.test(value)) priority = "CRITICAL";
  else if (/\b(urgent|flood|severe|major|unsafe)\b/.test(value)) priority = "HIGH";
  else if (/\b(minor|small|routine)\b/.test(value)) priority = "LOW";

  let sentiment = "Neutral";
  if (/\b(angry|worst|frustrated|unacceptable|months)\b/.test(value)) sentiment = "Negative";
  else if (/\b(thanks|good|resolved|appreciate)\b/.test(value)) sentiment = "Positive";

  return { category, priority, sentiment, department };
}

module.exports = { analyzeComplaintText };
