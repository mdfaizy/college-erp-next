"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getStudentFeeById } from "@/services/feeService";
import { ArrowLeft, Printer, Download, CheckCircle, Clock, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function FeeReceipt() {
  const { id } = useParams();
  const router = useRouter();
  const [fee, setFee] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchFee();
  }, [id]);

  const fetchFee = async () => {
    try {
      setLoading(true);
      const res = await getStudentFeeById(Number(id));
      setFee(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load fee details");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(24);
    doc.setTextColor(37, 99, 235);
    doc.text("Fee Receipt", 105, 30, { align: "center" });
    
    doc.setFontSize(12);
    doc.setTextColor(100, 116, 139);
    doc.text(`Receipt No: ${fee?.id || "N/A"}`, 20, 50);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 50);
    
    // Student Details
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Student Details", 20, 70);
    
    autoTable(doc, {
      startY: 75,
      body: [
        ["Student Name", fee?.student?.user?.name || "N/A"],
        ["Roll Number", fee?.student?.rollNo || "N/A"],
        ["Email", fee?.student?.user?.email || "N/A"],
        ["Course", fee?.student?.course?.name || "N/A"],
        ["Semester", `Semester ${fee?.feeStructure?.semester || "N/A"}`],
      ],
      theme: "plain",
      styles: { fontSize: 10, cellPadding: 3 },
      columnStyles: {
        0: { fontStyle: "bold", textColor: [100, 116, 139] },
      },
    });
    
    // Fee Details
    const pending = (fee?.amount || 0) - (fee?.paidAmount || 0);
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    
    doc.setFontSize(14);
    doc.text("Fee Details", 20, finalY);
    
    autoTable(doc, {
      startY: finalY + 5,
      head: [["Fee Type", "Total Amount", "Paid Amount", "Pending Amount", "Status"]],
      body: [[
        fee?.feeStructure?.feeType || "N/A",
        `₹${(fee?.amount || 0).toLocaleString()}`,
        `₹${(fee?.paidAmount || 0).toLocaleString()}`,
        `₹${pending.toLocaleString()}`,
        fee?.status || "N/A",
      ]],
      theme: "striped",
      headStyles: { fillColor: [37, 99, 235], textColor: [255, 255, 255] },
      styles: { fontSize: 10 },
    });
    
    // Payment History
    if (fee?.payments && fee.payments.length > 0) {
      const paymentY = (doc as any).lastAutoTable.finalY + 10;
      doc.setFontSize(14);
      doc.text("Payment History", 20, paymentY);
      
      autoTable(doc, {
        startY: paymentY + 5,
        head: [["Payment ID", "Amount", "Date", "Status"]],
        body: fee.payments.map((payment: any) => [
          payment.id,
          `₹${payment.amount.toLocaleString()}`,
          new Date(payment.createdAt).toLocaleDateString(),
          payment.status,
        ]),
        theme: "striped",
        headStyles: { fillColor: [37, 99, 235] },
        styles: { fontSize: 9 },
      });
    }
    
    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        "This is a computer generated receipt. No signature required.",
        105,
        doc.internal.pageSize.height - 10,
        { align: "center" }
      );
    }
    
    doc.save(`fee-receipt-${fee?.id || "N/A"}.pdf`);
    toast.success("PDF downloaded successfully");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-800";
      case "PARTIAL":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PAID":
        return <CheckCircle className="w-5 h-5" />;
      case "PARTIAL":
        return <Clock className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading fee details...</p>
        </div>
      </div>
    );
  }

  if (!fee) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Fee record not found</p>
        <button
          onClick={() => router.back()}
          className="mt-4 text-blue-600 hover:text-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  const pending = (fee.amount || 0) - (fee.paidAmount || 0);
  const paidPercentage = (fee.paidAmount / fee.amount) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <div className="flex gap-3">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Receipt Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden" id="receipt-content">
          {/* Receipt Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-white">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">Fee Receipt</h1>
              <p className="text-blue-100">Official Payment Receipt</p>
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg">
                <span className="text-sm">Receipt No:</span>
                <span className="font-semibold">#{fee.id}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Student Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-blue-600 rounded"></div>
                Student Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-500">Full Name</label>
                    <p className="font-medium text-gray-900">{fee.student?.user?.name || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Email Address</label>
                    <p className="font-medium text-gray-900">{fee.student?.user?.email || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Phone Number</label>
                    <p className="font-medium text-gray-900">{fee.student?.user?.phone || "N/A"}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-500">Roll Number</label>
                    <p className="font-medium text-gray-900">{fee.student?.rollNo || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Course</label>
                    <p className="font-medium text-gray-900">{fee.student?.course?.name || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Semester</label>
                    <p className="font-medium text-gray-900">Semester {fee.feeStructure?.semester || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fee Details */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-blue-600 rounded"></div>
                Fee Details
              </h2>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Fee Type</label>
                    <p className="font-medium text-gray-900">{fee.feeStructure?.feeType || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Due Date</label>
                    <p className="font-medium text-gray-900">
                      {fee.dueDate ? new Date(fee.dueDate).toLocaleDateString() : "Not specified"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Amount Breakdown */}
              <div className="mt-4 space-y-3">
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="font-semibold text-gray-900">₹{fee.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">Paid Amount</span>
                  <span className="font-semibold text-green-600">₹{fee.paidAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">Pending Amount</span>
                  <span className="font-semibold text-red-600">₹{pending.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-gray-600">Status</span>
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(fee.status)}`}>
                    {getStatusIcon(fee.status)}
                    {fee.status}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Payment Progress</span>
                  <span className="font-semibold">{paidPercentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${paidPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Payment History */}
            {fee.payments && fee.payments.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-blue-600 rounded"></div>
                  Payment History
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Payment ID</th>
                        <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Amount</th>
                        <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Date</th>
                        <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {fee.payments.map((payment: any) => (
                        <tr key={payment.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">#{payment.id}</td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">₹{payment.amount.toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {new Date(payment.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                              {payment.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Footer Note */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-500">
                This is a computer generated receipt. No signature required.
              </p>
              <p className="text-center text-xs text-gray-400 mt-2">
                Generated on {new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}