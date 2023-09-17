import { Column, useTable } from "react-table";
import { useMemo } from "react";
import { csvToJson } from "@/utils/csvToJson";

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
    <div className="overflow-auto max-h-[600px] font-mono border border-slate-200 rounded-md p-2">
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
              <tr {...row.getRowProps()} className="even:bg-gray-50 odd:bg-white">
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
