import { useState } from "react";
import QueryRunner from "@/components/QueryRunner/QueryRunner";
import Header from "../Header/Header";
import List from "../List/List";
import { useQueryManager } from "@/hooks/useQueryManager";

function App() {
  const { selectAllQueries, createQuery } = useQueryManager();
  const queries = selectAllQueries();
  const [activeQueryId, setActiveQueryId] = useState(queries.at(-2)?.id ?? "");

  return (
    <div className="h-full flex flex-col w-screen">
      <Header />
      <div className="flex h-full">
        <div className="w-80 min-w-[250px]">
          <List
            selectedQueryId={activeQueryId}
            queries={queries}
            onClick={(id) => {
              setActiveQueryId(id);
            }}
            onCreate={() => {
              const newQuery = createQuery();
              setActiveQueryId(newQuery.id);
            }}
          />
        </div>
        <div className="flex-1 overflow-auto">
          <QueryRunner queryId={activeQueryId} />
        </div>
      </div>
    </div>
  );
}

export default App;
