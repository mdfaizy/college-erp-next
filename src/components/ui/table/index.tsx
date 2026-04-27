// import React, { ReactNode } from "react";

// // Props for Table
// interface TableProps {
//   children: ReactNode; // Table content (thead, tbody, etc.)
//   className?: string; // Optional className for styling
// }

// // Props for TableHeader
// interface TableHeaderProps {
//   children: ReactNode; // Header row(s)
//   className?: string; // Optional className for styling
// }

// // // Props for TableBody
// // interface TableBodyProps {
// //   children: ReactNode; // Body row(s)
// //   className?: string; // Optional className for styling
// // }

// // Props for TableRow
// interface TableRowProps {
//   children: ReactNode; // Cells (th or td)
//   className?: string; // Optional className for styling
// }

// // Props for TableCell
// interface TableCellProps {
//   children: ReactNode; // Cell content
//   isHeader?: boolean; // If true, renders as <th>, otherwise <td>
//   className?: string; // Optional className for styling
// }

// // Table Component
// // const Table: React.FC<TableProps> = ({ children, className }) => {
// //   return <table className={`min-w-full  ${className}`}>{children}</table>;
// // };

// // // TableHeader Component
// // const TableHeader: React.FC<TableHeaderProps> = ({ children, className }) => {
// //   return <thead className={className}>{children}</thead>;
// // };

// // // TableBody Component
// // const TableBody: React.FC<TableBodyProps> = ({ children, className }) => {
// //   return <tbody className={className}>{children}</tbody>;
// // };

// // // TableRow Component
// // const TableRow: React.FC<TableRowProps> = ({ children, className }) => {
// //   return <tr className={className}>{children}</tr>;
// // };

// // // TableCell Component
// // const TableCell: React.FC<TableCellProps> = ({
// //   children,
// //   isHeader = false,
// //   className,
// // }) => {
// //   const CellTag = isHeader ? "th" : "td";
// //   return <CellTag className={` ${className}`}>{children}</CellTag>;
// // };


// const Table: React.FC<TableProps> = ({ children, className }) => {
//   return (
//     <div className="w-full overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
//       <table className={`min-w-full text-sm ${className}`}>
//         {children}
//       </table>
//     </div>
//   );
// };

// const TableHeader: React.FC<TableHeaderProps> = ({ children }) => {
//   return (
//     <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wide">
//       {children}
//     </thead>
//   );
// };

// const TableRow: React.FC<TableRowProps> = ({ children, className }) => {
//   return (
//     <tr
//       className={`border-b last:border-none hover:bg-blue-50 transition ${className}`}
//     >
//       {children}
//     </tr>
//   );
// };

// const TableCell: React.FC<TableCellProps> = ({
//   children,
//   isHeader = false,
//   className,
// }) => {
//   const Tag = isHeader ? "th" : "td";

//   return (
//     <Tag
//       className={`px-4 py-3 whitespace-nowrap ${
//         isHeader ? "font-semibold text-left" : "text-gray-700"
//       } ${className}`}
//     >
//       {children}
//     </Tag>
//   );
// };

// export { Table, TableHeader, TableRow, TableCell };





  import React, { ReactNode } from "react";

  interface TableProps {
    children: ReactNode;
    className?: string;
  }

  interface TableHeaderProps {
    children: ReactNode;
    className?: string;
  }

  interface TableBodyProps {
    children: ReactNode;
    className?: string;
  }

  interface TableRowProps {
    children: ReactNode;
    className?: string;
  }

  interface TableCellProps {
    children: ReactNode;
    isHeader?: boolean;
    className?: string;
    colSpan?: number;   // 👈 add this (important)
  }

  /* ---------------- COMPONENTS ---------------- */

  const Table: React.FC<TableProps> = ({ children, className }) => (
    <div className="overflow-x-auto">
      <table className={`min-w-full text-sm ${className}`}>{children}</table>
    </div>
  );

  const TableHeader: React.FC<TableHeaderProps> = ({ children, className }) => (
    <thead className={`bg-slate-50 text-slate-500 uppercase text-xs ${className}`}>
      {children}
    </thead>
  );

  const TableBody: React.FC<TableBodyProps> = ({ children, className }) => (
    <tbody className={className}>{children}</tbody>
  );

  const TableRow: React.FC<TableRowProps> = ({ children, className }) => (
    <tr className={`border-t border-slate-200 hover:bg-slate-50 transition ${className}`}>
      {children}
    </tr>
  );

  const TableCell: React.FC<TableCellProps> = ({
    children,
    isHeader = false,
    className,
    colSpan,
  }) => {
    const Tag = isHeader ? "th" : "td";
    return (
      <Tag colSpan={colSpan} className={`px-4 py-3 text-left ${className}`}>
        {children}
      </Tag>
    );
  };

  /* ---------------- EXPORTS (MOST IMPORTANT) ---------------- */

  export { Table, TableHeader, TableBody, TableRow, TableCell };
