import initSqlJs from "sql.js";
import SQL from "sql.js/dist/sql-wasm.js";

const wasmUrl = new URL(
  "sql.js/dist/sql-wasm.wasm",
  import.meta.url
).toString();

class SQLDatabase {
  static instance: SQL.Database | null = null;

  constructor() {
    // Private constructor to ensure the database is initialized only once
  }

  static async getInstance() {
    if (!SQLDatabase.instance) {
      await SQLDatabase.initialize();
      if (!SQLDatabase.instance) {
        throw new Error("Failed to initialize the database");
      }
    }
    return SQLDatabase.instance;
  }

  private static async initialize() {
    const SQLPromise = initSqlJs({ locateFile: () => wasmUrl });
    const db = await fetch("/database.sqlite3");
    const bufferPromise = db.arrayBuffer();

    const [SQL, buffer] = await Promise.all([SQLPromise, bufferPromise]);
    SQLDatabase.instance = new SQL.Database(new Uint8Array(buffer));
  }
}

const QueryDbRaw = async (query: string) => {
  const db = await SQLDatabase.getInstance();

  try {
    const result = db.exec(query);
    return JSON.stringify(result);
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
};

const QueryDb = async <T>(query: string): Promise<T[]> => {
  const db = await SQLDatabase.getInstance();
  try {
    const stmt = db.prepare(query);
    const results = [];

    while (stmt.step()) {
      results.push(stmt.getAsObject());
    }

    stmt.free();
    return results as T[];
  } catch (error) {
    console.error("Error executing query:", error, "Query:", query);
    throw error;
  }
};

export { QueryDb, QueryDbRaw };
export default SQLDatabase;
