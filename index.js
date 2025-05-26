const express = require("express");
const app = express();
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const cors = require("cors");
app.use(cors({ origin: "*" }));
app.post("/transfer", (req, res) => {
    // Handle request...
});
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

