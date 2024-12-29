import { createDbWorker } from "sql.js-httpvfs";

const workerUrl = new URL(
  "sql.js-httpvfs/dist/sqlite.worker.js",
  import.meta.url
);
const wasmUrl = new URL("sql.js-httpvfs/dist/sql-wasm.wasm", import.meta.url);
const dbUrl = new URL("/database.sqlite3", import.meta.url).toString();

let dbWorker: any = null;

const initializeDbWorker = async () => {
  if (!dbWorker) {
    dbWorker = await createDbWorker(
      [
        {
          from: "inline",
          config: {
            serverMode: "full",
            url: dbUrl,
            requestChunkSize: 4096,
          },
        },
      ],
      workerUrl.toString(),
      wasmUrl.toString()
    );
  }
  return dbWorker;
};

const QueryDb = async (queryString: string) => {
  const worker = await initializeDbWorker();
  const result = await worker.db.query(queryString);
  return JSON.stringify(result);
};

export default QueryDb;
