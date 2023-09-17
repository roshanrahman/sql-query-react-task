import { QueryResult } from "@/types/query";

export interface QueryResultDisplayProps {
  queryResult: QueryResult | null;
  loading?: boolean;
}
export default function QueryResultDisplay({
  queryResult,
}: QueryResultDisplayProps) {
  if (!queryResult) {
    return <h1>Press "Run" to run your query.</h1>;
  }

  if (queryResult.status === "loading") {
    return <h1>Loading</h1>;
  }
  const data =
    queryResult.result?.type === "success"
      ? queryResult.result.data
      : queryResult.result?.error;

  return (
    <div className="flex flex-col p-3">
      <div className="flex justify-between py-3 align-middle">
        <h2 className="uppercase tracking-wide text-slate-500 text-sm select-none">
          Results
        </h2>
        <span className="text-xs text-slate-400">
          Last run: {queryResult?.lastRun.toDateString()}
        </span>
      </div>
      <textarea
        className="border-gray-600 border-2 rounded-md py-1"
        placeholder="Enter SQL Query here"
        value={data}
      />
    </div>
  );
}
