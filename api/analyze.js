export default async function handler(req, res) {
  try {
    const { text } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{
          role: "user",
          content: `
Analysiere diese MyDealz Kommentare:

1. Ist der Deal gut oder schlecht?
2. Gibt es bessere Alternativen?
3. Kurzes Fazit (max. 3 Sätze)

Kommentare:
${text}
`
        }]
      })
    });

    const data = await response.json();

    res.status(200).json({
      result: data.choices[0].message.content
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fehler bei Analyse" });
  }
}
