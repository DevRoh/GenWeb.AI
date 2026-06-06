const extractJSON = async (text) => {
  if (!text) {
    return;
  }
  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1) {
    return null;
  }

  const jsonText = cleaned.slice(start, end + 1);
  return JSON.parse(jsonText);
};

export default extractJSON;
