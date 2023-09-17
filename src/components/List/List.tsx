import { Query } from "@/types/query";

export interface ListProps {
  queries: Query[];
  selectedQueryId: string;
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
  return (
    <div className="w-full border-gray-100 border-r-2">
      <div className="text-sm tracking-wide text-slate-500  py-2 px-4 border-b border-gray-200 select-none mt-2">
        YOUR QUERIES
      </div>

      <ul className="list-none">
        {queries.map((query) => {
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
        {/* <li className="cursor-pointer py-2 px-4 border-b border-gray-200 hover:bg-gray-100 select-none">
          Item 1
        </li>

        <li className="cursor-auto py-2 px-4 border-b border-gray-200 bg-slate-700 text-white select-none">
          Item 3
        </li>

        <li className="cursor-pointer py-2 px-4 border-b border-gray-200 hover:bg-gray-100 select-none">
          Item 4
        </li> */}
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
