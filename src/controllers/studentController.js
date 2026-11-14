const pool = require("../config/db");

exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM students");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getOne = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM students WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ error: "Student not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.create = async (req, res) => {
  const { name, email, course } = req.body;
  if (!name || !email || !course) {
    return res
      .status(400)
      .json({ error: "name, email and course are required" });
  }
  try {
    const [result] = await pool.query(
      "INSERT INTO students (name, email, course) VALUES (?, ?, ?)",
      [name, email, course],
    );
    res.status(201).json({ id: result.insertId, name, email, course });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY")
      return res.status(409).json({ error: "Email already exists" });
    res.status(500).json({ error: "Server error" });
  }
};

exports.update = async (req, res) => {
  const { name, email, course } = req.body;
  if (!name || !email || !course) {
    return res
      .status(400)
      .json({ error: "name, email and course are required" });
  }
  try {
    const [result] = await pool.query(
      "UPDATE students SET name = ?, email = ?, course = ? WHERE id = ?",
      [name, email, course, req.params.id],
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Student not found" });
    res.json({ message: "Updated" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.remove = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM students WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Student not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
