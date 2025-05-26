const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.post("/transfer", (req, res) => {
  res.json({ success: true, message: "Funds transferred!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.post("/transfer", (req, res) => {
  try {
    if (!req.body.amount || req.body.amount <= 0) {
      throw new Error("Invalid transfer amount");
    }
    res.json({ success: true, message: "Funds transferred!" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

