import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { DataTableProps } from "@/types/DataTableProps";

export default function DataTable({
  headers,
  data,
  renderAction,
  actionLabel,
}: DataTableProps) {
  return (
    <Table className="rounded-lg overflow-hidden">
      <TableHeader className="[&_th]:px-5">
        <TableRow className="text-[16px] px-5">
          {headers.map((header, index) => {
            const alignment =
              index === 0
                ? "text-left"
                : index === headers.length - 1 && !actionLabel
                ? "text-right"
                : "text-center";
            return (
              <TableHead
                key={`${header?.value}-${index}`}
                className={alignment}
              >
                {header.label}
              </TableHead>
            );
          })}
          {actionLabel && (
            <TableHead className="text-right">{actionLabel}</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody className="[&_td]:px-5">
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex} className="text-[16px] bg-gray-900 hover:bg-gray-800">
            {headers.map((header, colIndex) => {
              const alignment =
                colIndex === 0
                  ? "text-left"
                  : colIndex === headers.length - 1 && !actionLabel
                  ? "text-right"
                  : "text-center";

              return (
                <TableCell
                  key={`${header.value}-${colIndex}`}
                  className={`${
                    colIndex === 0 ? "font-medium" : ""
                  } ${alignment}`}
                >
                  {row[header.value]}
                </TableCell>
              );
            })}
            {renderAction && (
              <TableCell className="text-right">{renderAction(row)}</TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
