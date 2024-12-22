import workerUrl from "sql.js-httpvfs/dist/sqlite.worker.js?url";
import wasmUrl from "sql.js-httpvfs/dist/sql-wasm.wasm?url";
import dbUrl from "./database.sqlite3?url";
import { createDbWorker } from "sql.js-httpvfs";

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
