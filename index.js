const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000; // Render needs dynamic port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const cors = require("cors");
app.use(cors({ origin: "*" }));
app.post("/transfer", (req, res) => {
    // Handle request...
});

