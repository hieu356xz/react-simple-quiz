import initSqlJs from "sql.js";
import fs from "fs";
import path from "path";

class SQLDatabaseNode {
  static instance: any = null;
  static SQL: any = null;

  static async getInstance() {
    if (!SQLDatabaseNode.instance) {
      await SQLDatabaseNode.initialize();
    }
    return SQLDatabaseNode.instance;
  }

  private static async initialize() {
    try {
      // Initialize sql.js for Node.js
      SQLDatabaseNode.SQL = await initSqlJs();

      // Read the database file from the public directory
      const dbPath = path.join(process.cwd(), "public", "database.sqlite3");

      if (!fs.existsSync(dbPath)) {
        throw new Error(`Database file not found at: ${dbPath}`);
      }

      const data = fs.readFileSync(dbPath);
      SQLDatabaseNode.instance = new SQLDatabaseNode.SQL.Database(data);

      console.log("✅ Database loaded successfully");
    } catch (error) {
      console.error("❌ Failed to initialize database:", error);
      throw error;
    }
  }
}

const QueryDbNode = async (query: string) => {
  const db = await SQLDatabaseNode.getInstance();

  try {
    const stmt = db.prepare(query);
    const results = [];

    while (stmt.step()) {
      results.push(stmt.getAsObject());
    }

    stmt.free();
    return JSON.stringify(results);
  } catch (error) {
    console.error("Error executing query:", error, "Query:", query);
    throw error;
  }
};

export { QueryDbNode };
export default SQLDatabaseNode;
