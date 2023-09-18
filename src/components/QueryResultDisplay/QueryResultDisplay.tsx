import { QueryResult } from "@/types/query";
import Table from "../Table/Table";
import { useMemo } from "react";

export interface QueryResultDisplayProps {
  queryResult: QueryResult | null;
  loading?: boolean;
}

function IdleStateComponent() {
  return (
    <div className="w-full h-full text-center bg-gray-50">
      <div className="p-5 text-slate-700 select-none">
        Press 'Run' to run your query.
      </div>
    </div>
  );
}

function ErrorStateComponent({ error }: { error: string }) {
  return (
    <div className="w-full h-full text-center bg-red-50">
      <div className="p-5 text-red-700 select-none">
        <h2>Failed to fetch query results</h2>
        Reason: {error}
      </div>
    </div>
  );
}

function LoadingStateComponent() {
  return (
    <div className="w-full h-full text-center bg-slate-50 animate-pulse">
      <div className="p-5 text-slate-700 select-none">
        <h2>Fetching query results, please wait</h2>
      </div>
    </div>
  );
}

export default function QueryResultDisplay({
  queryResult,
}: QueryResultDisplayProps) {
  const componentToRender = useMemo(() => {
    if (!queryResult) {
      // Query hasn't been run at all
      return <IdleStateComponent />;
    }

    if (queryResult.status === "loading") {
      return <LoadingStateComponent />;
    }

    if (queryResult.result?.type === "error") {
      return <ErrorStateComponent error={queryResult.result.error} />;
    }

    return <Table csvString={queryResult.result?.data ?? ""} />;
  }, [queryResult]);

  return (
    <div className="flex flex-col p-3 h-full">
      <div className="flex justify-between py-3 align-middle">
        <h2 className="uppercase tracking-wide text-slate-500 text-sm select-none">
          Results
        </h2>
        {queryResult?.lastRun ? (
          <span className="text-xs text-slate-400">
            Last run: {queryResult?.lastRun.toString()}
          </span>
        ) : (
          <></>
        )}
      </div>
      <div className="flex-1 overflow-auto max-h-[600px] border border-slate-200 rounded-md">
        {componentToRender}
      </div>
    </div>
  );
}
