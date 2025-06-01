require('dotenv').config();
const express = require('express');
const multer = require('multer');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Configura Multer
const upload = multer({ dest: 'uploads/' });

// Rotta di valutazione
app.post('/api/evaluate', upload.single('image'), async (req, res) => {
  try {
    const imagePath = req.file.path;

    const prompt = `
    Questa è una carta da collezione. Basandoti su qualità, rarità e stato visibile, 
    consiglia la migliore casa di grading tra: PSA, BGS, CGC, GRAAD, GOLD GRADING.
    Valuta anche una stima generica del valore.
    `;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );

    const evaluation = response.data.choices[0].message.content;

    let gradingCompany = "PSA"; // Default
    if (evaluation.toLowerCase().includes("bgs")) gradingCompany = "BGS";
    if (evaluation.toLowerCase().includes("cgc")) gradingCompany = "CGC";
    if (evaluation.toLowerCase().includes("graad")) gradingCompany = "GRAAD";
    if (evaluation.toLowerCase().includes("gold")) gradingCompany = "Gold Grading";

    res.json({ evaluation, gradingCompany });

    fs.unlinkSync(imagePath); // Elimina file dopo analisi
  } catch (error) {
    console.error(error);
    res.status(500).send('Errore nella valutazione.');
  }
});

app.listen(port, () => {
  console.log(`✅ Server API avviato su http://localhost:${port}`);
});
