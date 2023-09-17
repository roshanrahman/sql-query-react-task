import { Query } from "@/types/query";
import QueryInput from "@/components/QueryInput/QueryInput";
import QueryResultDisplay from "@/components/QueryResultDisplay/QueryResultDisplay";
import { useQueryManager } from "@/hooks/useQueryManager";

export interface QueryRunnerProps {
  queryId: string;
}
export default function QueryRunner({ queryId }: QueryRunnerProps) {
  const {
    updateQueryData,
    selectQueryById,
    selectQueryResultById,
    fetchQueryResult,
  } = useQueryManager();
  const query = selectQueryById(queryId);
  const queryResult = selectQueryResultById(queryId);

  if (!query) {
    return <h1>No query with the ID {queryId} was found</h1>;
  }
  return (
    <div className="flex flex-col max-h-screen w-full">
      <QueryInput
        query={query}
        onChange={function (query: Query): void {
          updateQueryData(query);
        }}
        onRun={function (query: Query): void {
          fetchQueryResult(query);
        }}
      />
      <QueryResultDisplay queryResult={queryResult} />
    </div>
  );
}
