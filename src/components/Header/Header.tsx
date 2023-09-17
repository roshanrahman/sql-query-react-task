export default function Header() {
  return (
    <div className="flex justify-between align-middle py-4 px-6 bg-slate-800 text-white shadow-md">
      <h1 className="text-lg">Task - Atlan Frontend Engineer</h1>
      <a
        href="https://github.com/roshanrahman/sql-query-react-task"
        className="text-sm underline"
        target="_blank"
        rel="noreferrer"
      >
        View Source Code
      </a>
    </div>
  );
}
