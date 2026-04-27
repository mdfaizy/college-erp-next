
  import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getReceipt } from "@/services/paymentService";

export const downloadReceipt = async (orderId: string) => {
  try {
    const res = await getReceipt(orderId);

    const record = res?.data || res;

    console.log("FINAL RECEIPT:", record);
// const amount = Number(record.amount);
const formattedAmount = Number(record.amount).toLocaleString("en-IN");
    const doc = new jsPDF();

    // ================= HEADER =================
    // doc.text(record.collegeName || "ABC College", 14, 15);
doc.text(record.collegeAddress, 14, 22);
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, 210, 30, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text(record.collegeName, 14, 15);

    doc.setFontSize(10);
    doc.text("Delhi, India", 14, 22);

    doc.setTextColor(0, 0, 0);

    // ================= TITLE =================
    doc.setFontSize(18);
    doc.text("FEE PAYMENT RECEIPT", 55, 45);

    // ================= INFO =================
    doc.setFontSize(11);

    doc.text(`Receipt No: ${record.orderId}`, 14, 60);
    doc.text(`Payment ID: ${record.paymentId}`, 14, 68);

    doc.text(
      `Date: ${new Date(record.date).toLocaleString()}`,
      130,
      60
    );

    // ================= STUDENT =================
    doc.setFontSize(13);
    doc.text("Student Details", 14, 80);

    doc.setFontSize(11);
    doc.text(`Name: ${record.studentName}`, 14, 90);
    doc.text(`Semester: ${record.semester}`, 14, 98);
    doc.text(`Fee Type: ${record.feeType}`, 14, 106);

    // ================= TABLE =================
autoTable(doc, {
  startY: 115,
  head: [["Description", "Amount"]],
  body: [
   ["Total Fee", `Rs. ${formattedAmount}`],
["Paid Amount", `Rs. ${formattedAmount}`],
    ["Status", record.status],
  ],
});

    // ================= FOOTER =================
    const finalY = (doc as any).lastAutoTable.finalY || 140;

    doc.text("Authorized Signature", 140, finalY + 30);
    doc.line(130, finalY + 25, 200, finalY + 25);

    doc.setFontSize(10);
    doc.text(
      "This is a computer-generated receipt.",
      14,
      finalY + 40
    );

    // ================= SAVE =================
    doc.save(`receipt_${record.orderId}.pdf`);

  } catch (err) {
    console.error(err);
    alert("Receipt download failed");
  }
};