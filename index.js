const express = require("express");
const app = express();

app.post("/transfer", (req, res) => {
    res.json({ success: true, message: "Transaction received." });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

