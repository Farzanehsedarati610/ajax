const express = require("express");
const app = express();

const PORT = process.env.PORT || 80;  // ✅ Change from 10000 to 80
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

