export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  try {
    const { messages, system } = req.body;
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://speakright-five.vercel.app",
        "X-Title": "SpeakRight"
      },
      body: JSON.stringify({
        model: "google/gemma-2-9b-it:free",
        messages: [{ role: "system", content: system }, ...messages]
      })
    });
    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || "";
    res.status(200).json({ content: text });
  } catch(err) {
    console.error(err);
    res.status(500).json({ content: "" });
  }
}
