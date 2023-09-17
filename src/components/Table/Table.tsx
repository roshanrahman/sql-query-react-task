import { Column, useTable } from "react-table";
import { useMemo } from "react";
import { csvToJson } from "@/utils/csvToJson";
import { downloadStringAsFile } from "@/utils/downloadAsString";

export interface TableProps {
  csvString: string;
}

export default function Table({ csvString }: TableProps) {
  const tableData = useMemo(() => {
    const [headers, ...data] = csvToJson(csvString);

    const columns: Column[] = [];
    Object.keys(headers).forEach((header) => {
      columns.push({
        Header: header,
        accessor: header,
      });
    });

    return { columns, data };
  }, [csvString]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: tableData.columns,
      data: tableData.data,
    });

  return (
    <div>
      <div className="sticky top-0 flex justify-between align-middle py-1 text-xs px-2 bg-green-700 text-white">
        <div>
          <h3 className="mt-1">{tableData.data.length} rows returned</h3>
        </div>
        <div>
          <button
            className="rounded bg-green-600 py-1 px-3"
            onClick={() => {
              downloadStringAsFile(csvString, "results.csv");
            }}
          >
            Download CSV
          </button>
        </div>
      </div>
      <table
        {...getTableProps()}
        className="table-auto border-collapse border border-slate-300"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="text-start border border-slate-300 px-4 py-1"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="even:bg-gray-50 odd:bg-white"
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="border border-slate-300 px-4 py-1"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
