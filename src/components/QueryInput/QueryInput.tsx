import { Query } from "@/types/query";

export interface QueryInputProps {
  query: Query;
  onChange: (query: Query) => void;
  onRun: (query: Query) => void;
  loading?: boolean;
}
export default function QueryInput({
  query,
  onChange,
  onRun,
  loading,
}: QueryInputProps) {
  return (
    <div className="flex flex-col bg-slate-200 p-2 gap-2 w-full">
      <div className="flex gap-2">
        <input
          className="flex-1 border-slate-300 border-2 rounded-md py-1 px-2"
          type="text"
          placeholder="Name your query"
          value={query.name}
          onChange={(e) => {
            onChange({
              ...query,
              name: e.target.value,
            });
          }}
        />
        <button
          onClick={() => {
            onRun(query);
          }}
          disabled={loading}
          className="px-8 bg-blue-600 rounded-md text-white hover:bg-blue-500"
        >
          Run
        </button>
      </div>
      <textarea
        className="border-slate-300 border-2 rounded-md py-1 px-2 font-mono"
        placeholder="Enter SQL Query here"
        value={query.sql}
        onChange={(e) => {
          onChange({
            ...query,
            sql: e.target.value,
          });
        }}
      />
    </div>
  );
}
