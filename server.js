const express = require("express");
const axios = require("axios");

const API_KEY = process.env.OPENBANK_API_KEY;
const app = express();

app.use(express.json());

async function processTransaction(transactionData) {
  const response = await axios.post("https://apisandbox.openbankproject.com/transactions", transactionData, {
    headers: { Authorization: `Bearer ${API_KEY}` }
  });
  return response.data;
}

app.post("/transfer", async (req, res) => {
  try {
    const result = await processTransaction(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Transaction failed", details: error.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.post("/transfer", (req, res) => {
    res.json({ success: true, message: "Transaction received." });
});

