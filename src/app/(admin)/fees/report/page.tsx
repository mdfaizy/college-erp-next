"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Pagination from "@/components/tables/Pagination";
import { getStudentFees } from "@/services/feeService";
import { Eye, Search, Filter, ChevronDown, FileText, TrendingUp, DollarSign, Users } from "lucide-react";
import toast from "react-hot-toast";
import StatCard from "@/components/common/StatCard";

export default function FeeReportList() {
  const [fees, setFees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 10;

  const router = useRouter();

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      setLoading(true);
      const res = await getStudentFees();
      setFees(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch fee records");
    } finally {
      setLoading(false);
    }
  };

  // Filter fees
  const filteredFees = useMemo(() => {
    return fees.filter((fee) => {
      const matchesSearch = fee.student?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           fee.student?.rollNo?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !statusFilter || fee.status === statusFilter;
      const matchesSemester = !semesterFilter || String(fee.feeStructure?.semester) === semesterFilter;
      return matchesSearch && matchesStatus && matchesSemester;
    });
  }, [fees, searchTerm, statusFilter, semesterFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredFees.length / itemsPerPage);
  const paginatedFees = filteredFees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Statistics
  const totalAmount = filteredFees.reduce((sum, fee) => sum + Number(fee.amount), 0);
  const totalPaid = filteredFees.reduce((sum, fee) => sum + Number(fee.paidAmount), 0);
  const totalPending = totalAmount - totalPaid;
  const uniqueStudents = new Set(filteredFees.map(fee => fee.studentId)).size;

  const getStatusBadge = (status: string) => {
    const styles = {
      PAID: "bg-green-100 text-green-800",
      PARTIAL: "bg-yellow-100 text-yellow-800",
      PENDING: "bg-red-100 text-red-800",
    };
    return styles[status as keyof typeof styles] || "bg-gray-100 text-gray-800";
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setSemesterFilter("");
    setCurrentPage(1);
    toast.success("Filters reset");
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Fee Reports</h1>
          <p className="text-gray-500 mt-1">View and manage all student fee records</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Fees"
            value={`₹${totalAmount.toLocaleString()}`}
            type="blue"
            icon={<DollarSign className="w-5 h-5" />}
          />
          <StatCard
            title="Total Paid"
            value={`₹${totalPaid.toLocaleString()}`}
            type="green"
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <StatCard
            title="Total Pending"
            value={`₹${totalPending.toLocaleString()}`}
            type="red"
            icon={<FileText className="w-5 h-5" />}
          />
          <StatCard
            title="Total Students"
            value={uniqueStudents.toString()}
            type="purple"
            icon={<Users className="w-5 h-5" />}
          />
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name or roll number..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>

            {(searchTerm || statusFilter || semesterFilter) && (
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Status</option>
                  <option value="PAID">Paid</option>
                  <option value="PARTIAL">Partial</option>
                  <option value="PENDING">Pending</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                <select
                  value={semesterFilter}
                  onChange={(e) => {
                    setSemesterFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Semesters</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <option key={sem} value={sem}>Semester {sem}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">S.No</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Student Name</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Roll Number</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Semester</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Fee Type</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Amount</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Paid</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Pending</th>
                  <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedFees.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="text-center py-12 text-gray-500">
                      No fee records found
                    </td>
                  </tr>
                ) : (
                  paginatedFees.map((fee, index) => {
                    const pending = Number(fee.amount) - Number(fee.paidAmount);
                    return (
                      <tr key={fee.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">{fee.student?.user?.name || "N/A"}</p>
                            <p className="text-xs text-gray-500">{fee.student?.user?.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{fee.student?.rollNo || "N/A"}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            Sem {fee.feeStructure?.semester}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{fee.feeStructure?.feeType || "N/A"}</td>
                        <td className="px-6 py-4 text-sm text-right font-medium text-gray-900">
                          ₹{Number(fee.amount).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-right text-green-600">
                          ₹{Number(fee.paidAmount).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-right text-red-600">
                          ₹{pending.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(fee.status)}`}>
                            {fee.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => router.push(`/fees/report/${fee.id}`)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Footer with Pagination */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-600">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredFees.length)} of{" "}
                {filteredFees.length} entries
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}