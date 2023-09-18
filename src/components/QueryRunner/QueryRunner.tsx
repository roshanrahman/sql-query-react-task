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
    deleteQuery,
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
        onChange={(query) => {
          updateQueryData(query);
        }}
        onRun={(query) => {
          fetchQueryResult(query);
        }}
        onDelete={(query) => {
          deleteQuery(query.id);
        }}
      />
      <QueryResultDisplay queryResult={queryResult} />
    </div>
  );
}
