import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Fee {
  student?: { user?: { name?: string } };
  feeStructure?: { semester?: number; feeType?: string };
  amount: number;
  paidAmount: number;
  status: string;
}

function getRows(fees: Fee[]) {
  return fees.map((fee) => ({
    Student: fee.student?.user?.name ?? "—",
    Semester: fee.feeStructure?.semester ?? "—",
    "Fee Type": fee.feeStructure?.feeType ?? "—",
    Amount: Number(fee.amount),
    Paid: Number(fee.paidAmount),
    Pending: Number(fee.amount) - Number(fee.paidAmount),
    Status: fee.status,
  }));
}

export function useExport(fees: Fee[]) {
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(getRows(fees));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Student Fees");
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buf]), "student-fees.xlsx");
  };

  const exportCSV = () => {
    const ws = XLSX.utils.json_to_sheet(getRows(fees));
    const csv = XLSX.utils.sheet_to_csv(ws);
    saveAs(new Blob([csv]), "student-fees.csv");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Student Fee Report", 14, 15);
    autoTable(doc, {
      startY: 25,
      head: [["Student", "Semester", "Fee Type", "Amount", "Paid", "Pending", "Status"]],
      body: getRows(fees).map((r) => [
        r.Student,
        r.Semester,
        r["Fee Type"],
        `₹${r.Amount}`,
        `₹${r.Paid}`,
        `₹${r.Pending}`,
        r.Status,
      ]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [37, 99, 235] },
    });
    doc.save("student-fees.pdf");
  };

  return { exportExcel, exportCSV, exportPDF };
}