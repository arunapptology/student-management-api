const app = require("./app");
const db = require("./config/db");

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    const connection = await db.getConnection();

    console.log("MySQL Connected Successfully!");

    connection.release();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database Connection Failed:", error.message);
    process.exit(1);
  }
}

startServer();
