export interface Query {
  id: string;
  sql: string;
  name: string;
}

export interface QueryResult {
  queryId: string;
  lastRun: Date;
  status: "loading" | "done";
  result?:
    | {
        // Assumed to be CSV content
        type: "success";
        data: string;
      }
    | {
        type: "error";
        error: string;
      };
}
