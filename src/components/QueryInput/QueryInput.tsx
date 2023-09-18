import { useRef, useEffect, useState } from "react";
import { Query } from "@/types/query";

export interface QueryInputProps {
  query: Query;
  onChange: (query: Query) => void;
  onRun: (query: Query) => void;
  loading?: boolean;
  onDelete: (query: Query) => void;
}

function checkSqlQueryForErrors(queryStr: string): string | null {
  if (queryStr.length < 1) {
    return "SQL Query cannot be empty";
  }
  return null;
}

export default function QueryInput({
  query,
  onChange,
  onRun,
  loading,
  onDelete,
}: QueryInputProps) {
  const queryNameInputRef = useRef<HTMLInputElement>(null);
  const querySqlInputRef = useRef<HTMLTextAreaElement>(null);
  const [querySqlError, setQuerySqlError] = useState<string | null>(null);

  useEffect(() => {
    queryNameInputRef.current?.focus();
  }, [query.id]);

  const validateQuerySql = (queryStr: string) => {
    const error = checkSqlQueryForErrors(queryStr);
    setQuerySqlError(error);
    return !error;
  };

  const handleRunBtnClick = () => {
    const valid = validateQuerySql(query.sql);
    if (valid) {
      onRun(query);
    }
  };

  const handleQuerySqlChange = (queryStr: string) => {
    validateQuerySql(queryStr);
    onChange({
      ...query,
      sql: queryStr,
    });
  };

  return (
    <div className="flex flex-col bg-slate-200 p-2 gap-2 w-full">
      <div className="flex gap-2">
        <input
          ref={queryNameInputRef}
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
          onClick={handleRunBtnClick}
          disabled={loading}
          className="px-8 bg-blue-600 rounded-md text-white hover:bg-blue-500"
        >
          Run
        </button>
        <button
          onClick={() => onDelete(query)}
          disabled={loading}
          className="px-5 border-2 border-red-700 rounded-md text-red-700 hover:bg-red-50"
        >
          Delete
        </button>
      </div>
      <textarea
        autoFocus
        ref={querySqlInputRef}
        className={`border-2 rounded-md py-1 px-2 font-mono ${
          querySqlError ? "border-red-700" : "border-slate-300"
        }`}
        placeholder="Enter SQL Query here"
        value={query.sql}
        onChange={(e) => {
          handleQuerySqlChange(e.target.value);
        }}
      />
      <span
        className={`text-xs font-medium mt-[-6px] mb-1 ml-1 text-red-700 ${
          querySqlError ? "opacity-100" : "opacity-0"
        }`}
      >
        {querySqlError}
      </span>
    </div>
  );
}
