import { Query } from "@/types/query";
import { useState, useMemo } from "react";

export interface ListProps {
  queries: Query[];
  selectedQueryId: string | null;
  onClick: (id: string) => void;
  onCreate: () => void;
}

const normalStyle =
  "text-start w-full cursor-pointer py-2 px-4 border-b border-gray-200 hover:bg-gray-100 select-none";
const activeStyle =
  "text-start w-full cursor-auto py-2 px-4 border-b border-gray-200 bg-slate-700 text-white select-none";

export default function List({
  selectedQueryId,
  queries,
  onClick,
  onCreate,
}: ListProps) {
  const [searchInput, setSearchInput] = useState("");

  const filteredQueries = useMemo(() => {
    if (searchInput.length > 0) {
      return queries.filter((query) => query.name.includes(searchInput));
    }
    return queries;
  }, [queries, searchInput]);

  return (
    <div className="w-full border-gray-100 border-r-2 h-full">
      <div className="text-sm tracking-wide text-slate-500  py-2 px-4 border-b border-gray-200 select-none mt-2">
        YOUR QUERIES
      </div>

      <div className="flex gap-2 px-2 py-2">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 border-slate-300 border-2 rounded-md py-1 px-2 text-sm"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <button
          className="text-sm rounded bg-blue-600 py-1 px-3 text-white"
          onClick={() => {
            onCreate();
          }}
        >
          New
        </button>
      </div>

      <ul className="list-none">
        {filteredQueries.map((query) => {
          const isSelected = selectedQueryId === query.id;
          return (
            <li key={query.id} className="w-full">
              <button
                className={`${isSelected ? activeStyle : normalStyle}`}
                onClick={() => {
                  if (!isSelected) {
                    onClick(query.id);
                  }
                }}
              >
                {query.name.length > 0 ? query.name : "Untitled Query"}
              </button>
            </li>
          );
        })}

        <li className="p-2">
          <button
            onClick={() => {
              onCreate();
            }}
            className="w-full text-center cursor-pointer py-2 px-4 border rounded-md border-blue-200 hover:border-blue-700 hover:bg-blue-50 hover:text-blue-700 select-none text-blue-700"
          >
            + Create new query
          </button>
        </li>
      </ul>
    </div>
  );
}
