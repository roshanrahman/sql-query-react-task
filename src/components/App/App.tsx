import QueryRunner from "@/components/QueryRunner/QueryRunner";
import Header from "../Header/Header";
import List from "../List/List";
import { useQueryManager } from "@/hooks/useQueryManager";
import { useAtom } from "jotai";
import { activeQueryIdAtom } from "@/atoms/activeQuery";

function App() {
  const { selectAllQueries, createQuery } = useQueryManager();
  const queries = selectAllQueries();
  const [activeQueryId, setActiveQueryId] = useAtom(activeQueryIdAtom);

  const createAndSelectQuery = () => {
    const newQuery = createQuery();
    setActiveQueryId(newQuery.id);
  };

  return (
    <div className="h-full flex flex-col w-screen">
      <Header />
      <div className="flex h-full overflow-auto">
        <div className="w-80 min-w-[250px] h-full">
          <List
            selectedQueryId={activeQueryId}
            queries={queries}
            onClick={(id) => {
              setActiveQueryId(id);
            }}
            onCreate={createAndSelectQuery}
          />
        </div>
        <div className="flex-1 overflow-auto">
          {activeQueryId ? (
            <QueryRunner queryId={activeQueryId} />
          ) : (
            /** When no query is selected */
            <div className="border-2 text-center h-full flex items-center justify-center text-sm text-slate-500">
              <span>Please click on an existing query or </span>
              <button
                className="ml-1 text-blue-600 underline"
                onClick={createAndSelectQuery}
              >
                {" "}
                create a new one
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
