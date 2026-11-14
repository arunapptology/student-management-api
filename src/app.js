const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/students", require("./routes/students"));

app.use((req, res) => res.status(404).json({ error: "Route not found" }));

module.exports = app;
