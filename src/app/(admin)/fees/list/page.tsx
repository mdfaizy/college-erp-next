// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { getStudentFees } from "@/services/feeService";
// import Pagination from "@/components/tables/Pagination";
// import {
//   createPaymentOrder,
//   verifyStudentPayment,
// } from "@/services/paymentService";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import toast from "react-hot-toast";
// import StatCard from "@/components/common/StatCard";
// import { IndianRupee, CreditCard, Download, Printer, FileSpreadsheet, FileText } from "lucide-react";
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableCell,
// } from "@/components/ui/table/index";
// import { useRouter } from "next/navigation";
// import { getSessions } from "@/services/sessionService";
// // Payment Modal Component
// function PaymentModal({
//   isOpen,
//   onClose,
//   fee,
//   onSuccess,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   fee: any;
//   onSuccess: () => void;
// }) {
//   const [processing, setProcessing] = useState(false);

//   if (!isOpen) return null;

//   const pendingAmount = Number(fee?.amount) - Number(fee?.paidAmount);

  // const handlePayment = async () => {
  //   try {
  //     setProcessing(true);
  //     const res = await createPaymentOrder(fee.id);
  //     const order = res.data || res;

  //     const options = {
  //       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
  //       amount: order.amount,
  //       currency: order.currency,
  //       name: "College ERP System",
  //       description: `${fee.feeStructure?.feeType} - Semester ${fee.feeStructure?.semester}`,
  //       order_id: order.id,
  //       image: "/logo.png",
  //       prefill: {
  //         name: fee.student?.user?.name,
  //         email: fee.student?.user?.email,
  //       },
  //       theme: { color: "#2563eb" },
  //       handler: async (response: any) => {
  //         try {
  //           await verifyStudentPayment({
  //             razorpay_order_id: response.razorpay_order_id,
  //             razorpay_payment_id: response.razorpay_payment_id,
  //             razorpay_signature: response.razorpay_signature,
  //           });
  //           toast.success("Payment Successful!");
  //           onSuccess();
  //           onClose();
  //         } catch {
  //           toast.error("Verification Failed");
  //         } finally {
  //           setProcessing(false);
  //         }
  //       },
  //     };

  //     const razorpay = new (window as any).Razorpay(options);
  //     razorpay.open();
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Payment Failed");
  //     setProcessing(false);
  //   }
  // };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       <div className="fixed inset-0 bg-black/50" onClick={onClose} />
//       <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
//         <div className="text-center">
//           <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//             <CreditCard className="w-6 h-6 text-blue-600" />
//           </div>
//           <h3 className="mt-4 text-xl font-semibold">Complete Payment</h3>
//           <p className="mt-1 text-sm text-gray-500">{fee.feeStructure?.feeType} Fee</p>
//         </div>

//         <div className="mt-6 space-y-3">
//           <div className="flex justify-between py-2 border-b">
//             <span className="text-gray-600">Student</span>
//             <span className="font-medium">{fee.student?.user?.name}</span>
//           </div>
//           <div className="flex justify-between py-2 border-b">
//             <span className="text-gray-600">Semester</span>
//             <span className="font-medium">Semester {fee.feeStructure?.semester}</span>
//           </div>
//           <div className="flex justify-between py-2 border-b">
//             <span className="text-gray-600">Total Amount</span>
//             <span className="font-medium">₹{fee.amount}</span>
//           </div>
//           <div className="flex justify-between py-2 border-b">
//             <span className="text-gray-600">Already Paid</span>
//             <span className="font-medium text-green-600">₹{fee.paidAmount}</span>
//           </div>
//           <div className="flex justify-between py-3 bg-gray-50 rounded-lg px-3">
//             <span className="font-semibold">Amount to Pay</span>
//             <span className="text-xl font-bold text-blue-600">₹{pendingAmount}</span>
//           </div>
//         </div>

//         <div className="mt-6 flex gap-3">
//           <button
//             onClick={onClose}
//             className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handlePayment}
//             disabled={processing}
//             className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
//           >
//             {processing ? "Processing..." : `Pay ₹${pendingAmount}`}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default function StudentFeeListPage() {
//   const [fees, setFees] = useState<any[]>([]);
//   const [search, setSearch] = useState("");
//   const [semester, setSemester] = useState("");
//   const [status, setStatus] = useState("");
//   const [selectedFee, setSelectedFee] = useState<any>(null);
//   const [showModal, setShowModal] = useState(false);
//   const [college, setCollege] = useState("");
// const [hosteller, setHosteller] = useState("");
// const [sessions, setSessions] = useState<any[]>([]);
// const [session, setSession] = useState("");
//   const [loading, setLoading] = useState(true);
// const router = useRouter();
// const [currentPage, setCurrentPage] = useState(1);
// const [itemsPerPage, setItemsPerPage] = useState(10);
//   useEffect(() => {
//     fetchFees();
//   }, []);

//   const fetchFees = async () => {
//     try {
//       setLoading(true);
//       const res = await getStudentFees();
//       console.log("FRONT DATA:", res.data);
//       console.log("COLLEGE:", res);
//       setFees(res.data);
//     } catch {
//       toast.error("Failed to fetch fees");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePayClick = (fee: any) => {
//     setSelectedFee(fee);
//     setShowModal(true);
//   };
// useEffect(() => {
//   fetchSessions();
// }, []);

// const fetchSessions = async () => {
//   try {
//     const res = await getSessions();
//     console.log(res)
//     setSessions(res);
//   } catch (err) {
//     console.error(err);
//   }
// };



//   // const filteredFees = useMemo(() => {
//   //   return fees.filter((fee) => {
//   //     const studentName = fee.student?.user?.name?.toLowerCase() || "";
//   //     const matchesSearch = studentName.includes(search.toLowerCase());
//   //     const matchesSemester = !semester || String(fee.feeStructure?.semester) === semester;
//   //     const matchesStatus = !status || fee.status === status;
//   //     return matchesSearch && matchesSemester && matchesStatus;
//   //   });
//   // }, [fees, search, semester, status]);

//   const filteredFees = useMemo(() => {
//   return fees.filter((fee) => {
//     const studentName = fee.student?.user?.name?.toLowerCase() || "";

//     return (
//       studentName.includes(search.toLowerCase()) &&
//       (!semester || String(fee.feeStructure?.semester) === semester) &&
//       (!status || fee.status === status) &&
//       (!college || String(fee.student?.college?.id) === college) &&
//        (!session ||
//         fee.student?.academics?.some(
//           (a: any) =>
//             a.session?.name?.trim() === session.trim()
//         )) &&
//       (!hosteller ||
//         String(fee.student?.isHosteller) === hosteller)
//     );
//   });
// }, [fees, search, semester, status, college, session, hosteller]);

// const totalPages = Math.max(1, Math.ceil(filteredFees.length / itemsPerPage));

// useEffect(() => {
//   if (currentPage > totalPages) {
//     setCurrentPage(1);
//   }
// }, [filteredFees,totalPages]);
//   const totalAmount = filteredFees.reduce((sum, fee) => sum + Number(fee.amount), 0);
//   const totalPaid = filteredFees.reduce((sum, fee) => sum + Number(fee.paidAmount), 0);
//   const totalPending = totalAmount - totalPaid;

//   const getExportRows = () =>
//     filteredFees.map((fee) => ({
//       Student: fee.student?.user?.name,
//       "Roll No": fee.student?.rollNo,
//       Semester: fee.feeStructure?.semester,
//       "Fee Type": fee.feeStructure?.feeType,
//       Amount: fee.amount,
//       Paid: fee.paidAmount,
//       Pending: Number(fee.amount) - Number(fee.paidAmount),
//       Status: fee.status,
//       Date: new Date(fee.createdAt).toLocaleDateString(),
//     }));

//   const handleExportExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(getExportRows());
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Student Fees");
//     XLSX.writeFile(workbook, `student-fees-${new Date().toISOString().split("T")[0]}.xlsx`);
//     toast.success("Excel exported");
//   };

//   const handleExportCSV = () => {
//     const worksheet = XLSX.utils.json_to_sheet(getExportRows());
//     const csv = XLSX.utils.sheet_to_csv(worksheet);
//     saveAs(new Blob([csv]), `student-fees-${new Date().toISOString().split("T")[0]}.csv`);
//     toast.success("CSV exported");
//   };

//   const handleExportPDF = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(18);
//     doc.text("Student Fee Report", 14, 20);
//     doc.setFontSize(10);
//     doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);

//     autoTable(doc, {
//       startY: 40,
//       head: [["Student", "Roll No", "Semester", "Fee Type", "Amount", "Paid", "Pending", "Status"]],
//       body: getExportRows().map((row) => [
//         row.Student,
//         row["Roll No"],
//         row.Semester,
//         row["Fee Type"],
//         `₹${row.Amount}`,
//         `₹${row.Paid}`,
//         `₹${row.Pending}`,
//         row.Status,
//       ]),
//       styles: { fontSize: 9 },
//       headStyles: { fillColor: [37, 99, 235] },
//     });

//     doc.save(`student-fees-${new Date().toISOString().split("T")[0]}.pdf`);
//     toast.success("PDF exported");
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading fee records...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-bold text-gray-900">Fee Management</h1>
//         <p className="text-gray-500 mt-1">Manage and track student fee payments</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid md:grid-cols-3 gap-4">
//         <StatCard title="Total Fees" value={`₹${totalAmount.toLocaleString()}`} type="blue" icon={<IndianRupee />} />
//         <StatCard title="Paid Amount" value={`₹${totalPaid.toLocaleString()}`} type="green" icon={<IndianRupee />} />
//         <StatCard title="Pending Amount" value={`₹${totalPending.toLocaleString()}`} type="red" icon={<IndianRupee />} />
//       </div>

//       {/* Main Card */}
//       <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
//             {/* <h2 className="text-xl font-semibold text-gray-800">
//               Fee Records
//               <span className="ml-2 text-sm font-normal text-gray-500">({filteredFees.length} records)</span>
//             </h2> */}
//             <div className="flex gap-2">
//               <button onClick={handleExportExcel} className="flex items-center gap-2 px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm">
//                 <FileSpreadsheet className="w-4 h-4" /> Excel
//               </button>
//               <button onClick={handleExportCSV} className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
//                 <FileText className="w-4 h-4" /> CSV
//               </button>
//               <button onClick={handleExportPDF} className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">
//                 <Download className="w-4 h-4" /> PDF
//               </button>
//               <button onClick={() => window.print()} className="flex items-center gap-2 px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 text-sm">
//                 <Printer className="w-4 h-4" /> Print
//               </button>
//             </div>
//           </div>
//           <div className="grid md:grid-cols-5 gap-4 mt-4">

//   {/* Search */}
//   <input
//     type="text"
//     placeholder="🔍 Search student..."
//     value={search}
//     onChange={(e) => setSearch(e.target.value)}
//     className="border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
//   />

//   {/* Semester */}
//   <select
//     value={semester}
//     onChange={(e) => setSemester(e.target.value)}
//     className="border rounded-xl px-4 py-2"
//   >
//     <option value="">All Semester</option>
//     {[1,2,3,4,5,6,7,8].map((sem) => (
//       <option key={sem} value={sem}>Sem {sem}</option>
//     ))}
//   </select>

//   {/* Session */}
//  <select
//   value={session}
//   onChange={(e) => setSession(e.target.value)}
//   className="border px-3 py-2 rounded-xl"
// >
//   <option value="">All Session</option>

//   {sessions.map((s) => (
//     <option key={s.id} value={s.name}>
//       {s.name}
//     </option>
//   ))}
// </select>

  

//   {/* Hosteller */}
//   <select
//     value={hosteller}
//     onChange={(e) => setHosteller(e.target.value)}
//     className="border rounded-xl px-4 py-2"
//   >
//     <option value="">All Type</option>
//     <option value="true">Hosteller</option>
//     <option value="false">Day Scholar</option>
//   </select>

//   <button
//   onClick={() => {
//     setSearch("");
//     setSemester("");
//     setStatus("");
//     setCollege("");
//     setSession("");
//     setHosteller("");
//   }}
//   className="px-4 py-2 bg-gray-200 rounded-xl"
// >
//   Reset Filters
// </button>

// </div>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableCell isHeader>#</TableCell>
//                 <TableCell isHeader>Student Details</TableCell>
//                 <TableCell isHeader className="text-center">Semester</TableCell>
//                 <TableCell isHeader className="text-center">Fee Type</TableCell>
//                 <TableCell isHeader className="text-center">Amount Breakdown</TableCell>
//                 <TableCell isHeader className="text-center">Date</TableCell>
//                 <TableCell isHeader className="text-center">Status</TableCell>
//                 <TableCell isHeader className="text-center">Action</TableCell>
//               </TableRow>
//             </TableHeader>
//             <tbody>
//               {filteredFees.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={7} className="text-center py-12 text-gray-500">
//                     No fee records found
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 filteredFees.map((fee ,index) => {
//                   const pending = Number(fee.amount) - Number(fee.paidAmount);
//                   // const latestPayment = fee.payments?.[fee.payments?.length - 1];

//                   return (
//                     <TableRow key={fee.id}>
//                       <TableCell>
//   {(currentPage - 1) * itemsPerPage + index + 1}
// </TableCell>
//                       <TableCell>
//                         <div>
//                           <p className="font-semibold text-gray-900">{fee.student?.user?.name || "N/A"}</p>
//                           <p className="text-xs text-gray-500">Roll: {fee.student?.rollNo || "N/A"}</p>
//                           <p className="text-xs text-gray-400">{fee.student?.user?.email}</p>
//                         </div>
//                       </TableCell>

//                       <TableCell className="text-center">
//                         <span className="inline-flex px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
//                           Sem {fee.feeStructure?.semester}
//                         </span>
//                       </TableCell>

//                       <TableCell className="text-center">
//                         <span className="px-2 py-1 bg-gray-100 rounded-lg text-xs">
//                           {fee.feeStructure?.feeType}
//                         </span>
//                       </TableCell>

//                       <TableCell>
//                         <div className="space-y-1">
//                           <div className="flex justify-between gap-4">
//                             <span className="text-gray-500 text-xs">Total:</span>
//                             <span className="font-semibold">₹{Number(fee.amount).toLocaleString()}</span>
//                           </div>
//                           <div className="flex justify-between gap-4">
//                             <span className="text-green-600 text-xs">Paid:</span>
//                             <span className="text-green-600">₹{Number(fee.paidAmount).toLocaleString()}</span>
//                           </div>
//                           <div className="flex justify-between gap-4">
//                             <span className="text-red-500 text-xs">Pending:</span>
//                             <span className="text-red-500 font-medium">₹{pending.toLocaleString()}</span>
//                           </div>
//                         </div>
//                       </TableCell>

//                       <TableCell className="text-center text-sm">
//                         {new Date(fee.createdAt).toLocaleDateString()}
//                         <br />
//                         <span className="text-xs text-gray-400">
//                           {new Date(fee.createdAt).toLocaleTimeString()}
//                         </span>
//                       </TableCell>

//                       <TableCell className="text-center">
//                         <span
//                           className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
//                             fee.status === "PAID"
//                               ? "bg-green-100 text-green-700"
//                               : fee.status === "PARTIAL"
//                               ? "bg-yellow-100 text-yellow-700"
//                               : "bg-red-100 text-red-700"
//                           }`}
//                         >
//                           {fee.status}
//                         </span>
//                       </TableCell>

//                       <TableCell className="text-center">
//                         <div className="flex gap-2 justify-center">
//                           {fee.status !== "PAID" && (
//                             <button
//                               onClick={() => handlePayClick(fee)}
//                               className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs font-medium"
//                             >
//                               <CreditCard className="w-3.5 h-3.5" />
//                               Pay Now
//                             </button>
//                           )}
//                          <button
//   onClick={() => router.push(`/fees/${fee.id}`)}
//   className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs"
// >
//   {fee.status === "PAID" ? "View" : "Pay Now"}
// </button>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })
//               )}
//             </tbody>
//           </Table>
//         </div>

//         {/* Footer */}
//         <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">

//           <div className="flex justify-between items-center mt-4">
//   <div className="text-sm text-gray-600">
//     Showing {(currentPage - 1) * itemsPerPage + 1}–
//     {Math.min(currentPage * itemsPerPage, filteredFees.length)} of{" "}
//     {filteredFees.length} records
//   </div>

//   <Pagination
//     currentPage={currentPage}
//     totalPages={totalPages}
//     onPageChange={setCurrentPage}
//   />

//   <div className="flex items-center gap-2">
//   <span className="text-sm text-gray-600">Rows per page:</span>

//   <select
//     value={itemsPerPage}
//     onChange={(e) => {
//       setItemsPerPage(Number(e.target.value));
//       setCurrentPage(1); // reset page
//     }}
//     className="border rounded-lg px-2 py-1 text-sm"
//   >
//     <option value={10}>10</option>
//     <option value={25}>25</option>
//     <option value={50}>50</option>
//     <option value={100}>100</option>
//   </select>
// </div>
// </div>
//           <div className="flex justify-between items-center text-sm">
//             <div className="text-gray-600">
//               Showing {filteredFees.length} of {fees.length} records
//             </div>
//             <div className="flex gap-6">
//               <span>Total: <strong className="text-gray-900">₹{totalAmount.toLocaleString()}</strong></span>
//               <span className="text-green-600">Paid: ₹{totalPaid.toLocaleString()}</span>
//               <span className="text-red-600">Pending: ₹{totalPending.toLocaleString()}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Payment Modal */}
//       <PaymentModal
//         isOpen={showModal}
//         onClose={() => setShowModal(false)}
//         fee={selectedFee}
//         onSuccess={fetchFees}
//       />
//     </div>
//   );
// }


"use client";

import { useEffect, useMemo, useState } from "react";
import { getStudentFees } from "@/services/feeService";
import Pagination from "@/components/tables/Pagination";
import {
  createPaymentOrder,
  verifyStudentPayment,
} from "@/services/paymentService";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import toast from "react-hot-toast";
import StatCard from "@/components/common/StatCard";
import { IndianRupee, CreditCard, Download, Printer, FileSpreadsheet, FileText } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table/index";
import { useRouter } from "next/navigation";
import { getSessions } from "@/services/sessionService";

// Payment Modal Component
function PaymentModal({
  isOpen,
  onClose,
  fee,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  fee: any;
  onSuccess: () => void;
}) {
  const [processing, setProcessing] = useState(false);

  if (!isOpen) return null;

  const pendingAmount = Number(fee?.amount) - Number(fee?.paidAmount);

  // const handlePayment = async () => {
  //   try {
  //     setProcessing(true);
  //     const res = await createPaymentOrder(fee.id);
  //     const order = res.data || res;

  //     const options = {
  //       // key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
  //       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
  //       amount: order.amount,
  //       currency: order.currency,
  //       name: "College ERP System",
  //       description: `${fee.feeStructure?.feeType} - Semester ${fee.feeStructure?.semester}`,
  //       order_id: order.id,
  //       image: "/logo.png",
  //       prefill: {
  //         name: fee.student?.user?.name,
  //         email: fee.student?.user?.email,
  //       },
  //       theme: { color: "#2563eb" },
  //       handler: async (response: any) => {
  //         try {
  //           await verifyStudentPayment({
  //             razorpay_order_id: response.razorpay_order_id,
  //             razorpay_payment_id: response.razorpay_payment_id,
  //             razorpay_signature: response.razorpay_signature,
  //           });
  //           toast.success("Payment Successful!");
  //           onSuccess();
  //           onClose();
  //         } catch {
  //           toast.error("Verification Failed");
  //         } finally {
  //           setProcessing(false);
  //         }
  //       },
  //     };

  //     const razorpay = new (window as any).Razorpay(options);
  //     razorpay.open();
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Payment Failed");
  //     setProcessing(false);
  //   }
  // };


    const handlePayment = async () => {
    try {
      setProcessing(true);
      const res = await createPaymentOrder(fee.id);
      const order = res.data || res;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "College ERP System",
        description: `${fee.feeStructure?.feeType} - Semester ${fee.feeStructure?.semester}`,
        order_id: order.id,
        image: "/logo.png",
        prefill: {
          name: fee.student?.user?.name,
          email: fee.student?.user?.email,
        },
        theme: { color: "#2563eb" },
        handler: async (response: any) => {
          try {
            await verifyStudentPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            toast.success("Payment Successful!");
            onSuccess();
            onClose();
          } catch {
            toast.error("Verification Failed");
          } finally {
            setProcessing(false);
          }
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
      toast.error("Payment Failed");
      setProcessing(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="mt-4 text-xl font-semibold">Complete Payment</h3>
          <p className="mt-1 text-sm text-gray-500">{fee.feeStructure?.feeType} Fee</p>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Student</span>
            <span className="font-medium">{fee.student?.user?.name}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Semester</span>
            <span className="font-medium">Semester {fee.feeStructure?.semester}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Total Amount</span>
            <span className="font-medium">₹{fee.amount}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Already Paid</span>
            <span className="font-medium text-green-600">₹{fee.paidAmount}</span>
          </div>
          <div className="flex justify-between py-3 bg-gray-50 rounded-lg px-3">
            <span className="font-semibold">Amount to Pay</span>
            <span className="text-xl font-bold text-blue-600">₹{pendingAmount}</span>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            disabled={processing}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {processing ? "Processing..." : `Pay ₹${pendingAmount}`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function StudentFeeListPage() {
  const [fees, setFees] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [semester, setSemester] = useState("");
  const [status, setStatus] = useState("");
  const [selectedFee, setSelectedFee] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [college, setCollege] = useState("");
  const [hosteller, setHosteller] = useState("");
  const [sessions, setSessions] = useState<any[]>([]);
  const [session, setSession] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      setLoading(true);
      const res = await getStudentFees();
      console.log("FRONT DATA:", res);
      console.log("COLLEGE:", res);
      setFees(res.data);
    } catch {
      toast.error("Failed to fetch fees");
    } finally {
      setLoading(false);
    }
  };

  const handlePayClick = (fee: any) => {
    setSelectedFee(fee);
    setShowModal(true);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await getSessions();
      console.log(res)
      setSessions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredFees = useMemo(() => {
    return fees.filter((fee) => {
      const studentName = fee.student?.user?.name?.toLowerCase() || "";

      return (
        studentName.includes(search.toLowerCase()) &&
        (!semester || String(fee.feeStructure?.semester) === semester) &&
        (!status || fee.status === status) &&
        (!college || String(fee.student?.college?.id) === college) &&
        (!session ||
          fee.student?.academics?.some(
            (a: any) =>
              a.session?.name?.trim() === session.trim()
          )) &&
        (!hosteller ||
          String(fee.student?.isHosteller) === hosteller)
      );
    });
  }, [fees, search, semester, status, college, session, hosteller]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, semester, status, college, session, hosteller]);

  const totalPages = Math.max(1, Math.ceil(filteredFees.length / itemsPerPage));

  // Get current page items
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredFees.slice(start, end);
  }, [filteredFees, currentPage, itemsPerPage]);

  const totalAmount = filteredFees.reduce((sum, fee) => sum + Number(fee.amount), 0);
  const totalPaid = filteredFees.reduce((sum, fee) => sum + Number(fee.paidAmount), 0);
  const totalPending = totalAmount - totalPaid;

  const getExportRows = () =>
    filteredFees.map((fee) => ({
      Student: fee.student?.user?.name,
      "Roll No": fee.student?.rollNo,
      Semester: fee.feeStructure?.semester,
      "Fee Type": fee.feeStructure?.feeType,
      Amount: fee.amount,
      Paid: fee.paidAmount,
      Pending: Number(fee.amount) - Number(fee.paidAmount),
      Status: fee.status,
      Date: new Date(fee.createdAt).toLocaleDateString(),
    }));

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(getExportRows());
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Student Fees");
    XLSX.writeFile(workbook, `student-fees-${new Date().toISOString().split("T")[0]}.xlsx`);
    toast.success("Excel exported");
  };

  const handleExportCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(getExportRows());
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    saveAs(new Blob([csv]), `student-fees-${new Date().toISOString().split("T")[0]}.csv`);
    toast.success("CSV exported");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Student Fee Report", 14, 20);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);

    autoTable(doc, {
      startY: 40,
      head: [["Student", "Roll No", "Semester", "Fee Type", "Amount", "Paid", "Pending", "Status"]],
      body: getExportRows().map((row) => [
        row.Student,
        row["Roll No"],
        row.Semester,
        row["Fee Type"],
        `₹${row.Amount}`,
        `₹${row.Paid}`,
        `₹${row.Pending}`,
        row.Status,
      ]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [37, 99, 235] },
    });

    doc.save(`student-fees-${new Date().toISOString().split("T")[0]}.pdf`);
    toast.success("PDF exported");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading fee records...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Fee Management</h1>
        <p className="text-gray-500 mt-1">Manage and track student fee payments</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <StatCard title="Total Fees" value={`₹${totalAmount.toLocaleString()}`} type="blue" icon={<IndianRupee />} />
        <StatCard title="Paid Amount" value={`₹${totalPaid.toLocaleString()}`} type="green" icon={<IndianRupee />} />
        <StatCard title="Pending Amount" value={`₹${totalPending.toLocaleString()}`} type="red" icon={<IndianRupee />} />
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <div className="flex gap-2">
              <button onClick={handleExportExcel} className="flex items-center gap-2 px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm">
                <FileSpreadsheet className="w-4 h-4" /> Excel
              </button>
              <button onClick={handleExportCSV} className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                <FileText className="w-4 h-4" /> CSV
              </button>
              <button onClick={handleExportPDF} className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">
                <Download className="w-4 h-4" /> PDF
              </button>
              <button onClick={() => window.print()} className="flex items-center gap-2 px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 text-sm">
                <Printer className="w-4 h-4" /> Print
              </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-5 gap-4">
            {/* Search */}
            <input
              type="text"
              placeholder="🔍 Search student..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />

            {/* Semester */}
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="border rounded-xl px-4 py-2"
            >
              <option value="">All Semester</option>
              {[1,2,3,4,5,6,7,8].map((sem) => (
                <option key={sem} value={sem}>Sem {sem}</option>
              ))}
            </select>

            {/* Session */}
            <select
              value={session}
              onChange={(e) => setSession(e.target.value)}
              className="border px-3 py-2 rounded-xl"
            >
              <option value="">All Session</option>
              {sessions.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>

            {/* Status */}
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border rounded-xl px-4 py-2"
            >
              <option value="">All Status</option>
              <option value="PAID">Paid</option>
              <option value="PARTIAL">Partial</option>
              <option value="PENDING">Pending</option>
            </select>

            {/* Hosteller */}
            <select
              value={hosteller}
              onChange={(e) => setHosteller(e.target.value)}
              className="border rounded-xl px-4 py-2"
            >
              <option value="">All Type</option>
              <option value="true">Hosteller</option>
              <option value="false">Day Scholar</option>
            </select>

            <button
              onClick={() => {
                setSearch("");
                setSemester("");
                setStatus("");
                setCollege("");
                setSession("");
                setHosteller("");
              }}
              className="px-4 py-2 bg-gray-200 rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>#</TableCell>
                <TableCell isHeader>Student Details</TableCell>
                <TableCell isHeader className="text-center">Semester</TableCell>
                <TableCell isHeader className="text-center">Fee Type</TableCell>
                <TableCell isHeader className="text-center">Amount Breakdown</TableCell>
                <TableCell isHeader className="text-center">Date</TableCell>
                <TableCell isHeader className="text-center">Status</TableCell>
                <TableCell isHeader className="text-center">Action</TableCell>
              </TableRow>
            </TableHeader>
            <tbody>
              {currentItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12 text-gray-500">
                    No fee records found
                  </TableCell>
                </TableRow>
              ) : (
                currentItems.map((fee, index) => {
                  const pending = Number(fee.amount) - Number(fee.paidAmount);

                  return (
                    <TableRow key={fee.id}>
                      <TableCell>
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-semibold text-gray-900">{fee.student?.user?.name || "N/A"}</p>
                          <p className="text-xs text-gray-500">Roll: {fee.student?.rollNo || "N/A"}</p>
                          <p className="text-xs text-gray-400">{fee.student?.user?.email}</p>
                        </div>
                      </TableCell>

                      <TableCell className="text-center">
                        <span className="inline-flex px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          Sem {fee.feeStructure?.semester}
                        </span>
                      </TableCell>

                      <TableCell className="text-center">
                        <span className="px-2 py-1 bg-gray-100 rounded-lg text-xs">
                          {fee.feeStructure?.feeType}
                        </span>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between gap-4">
                            <span className="text-gray-500 text-xs">Total:</span>
                            <span className="font-semibold">₹{Number(fee.amount).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-green-600 text-xs">Paid:</span>
                            <span className="text-green-600">₹{Number(fee.paidAmount).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-red-500 text-xs">Pending:</span>
                            <span className="text-red-500 font-medium">₹{pending.toLocaleString()}</span>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="text-center text-sm">
                        {new Date(fee.createdAt).toLocaleDateString()}
                        <br />
                        <span className="text-xs text-gray-400">
                          {new Date(fee.createdAt).toLocaleTimeString()}
                        </span>
                      </TableCell>

                      <TableCell className="text-center">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                            fee.status === "PAID"
                              ? "bg-green-100 text-green-700"
                              : fee.status === "PARTIAL"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {fee.status}
                        </span>
                      </TableCell>

                      <TableCell className="text-center">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => router.push(`/fees/${fee.id}`)}
                            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700"
                          >
                            {fee.status === "PAID" ? "View" : "Pay Now"}
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </tbody>
          </Table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1}–
              {Math.min(currentPage * itemsPerPage, filteredFees.length)} of{" "}
              {filteredFees.length} records
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Rows per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border rounded-lg px-2 py-1 text-sm"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-between items-center text-sm mt-4 pt-4 border-t border-gray-200">
            <div className="text-gray-600">
              Showing {filteredFees.length} of {fees.length} records
            </div>
            <div className="flex gap-6">
              <span>Total: <strong className="text-gray-900">₹{totalAmount.toLocaleString()}</strong></span>
              <span className="text-green-600">Paid: ₹{totalPaid.toLocaleString()}</span>
              <span className="text-red-600">Pending: ₹{totalPending.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        fee={selectedFee}
        onSuccess={fetchFees}
      />
    </div>
  );
}