// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// interface College {
//   id: number;
//   name: string;
//   email: string;
//   phone?: string;
//   address?: string;
//   isActive: boolean;
// }

// export default function CollegeListPage() {
//   const [colleges, setColleges] = useState<College[]>([]);
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch Colleges
//   const fetchColleges = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("http://localhost:5000/api/college");
//       setColleges(res.data.data);
//     } catch (err) {
//       console.error("Error fetching colleges", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchColleges();
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">College List</h2>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="overflow-x-auto bg-white shadow rounded-xl">
//           <table className="w-full border-collapse">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-3 text-left">ID</th>
//                 <th className="p-3 text-left">Name</th>
//                 <th className="p-3 text-left">Email</th>
//                 <th className="p-3 text-left">Phone</th>
//                 <th className="p-3 text-left">Address</th>
//                 <th className="p-3 text-left">Status</th>
//               </tr>
//             </thead>

//             <tbody>
//               {colleges.length === 0 ? (
//                 <tr>
//                   <td colSpan={6} className="text-center p-4">
//                     No Colleges Found
//                   </td>
//                 </tr>
//               ) : (
//                 colleges.map((college) => (
//                   <tr key={college.id} className="border-t">
//                     <td className="p-3">{college.id}</td>
//                     <td className="p-3 font-medium">{college.name}</td>
//                     <td className="p-3">{college.email}</td>
//                     <td className="p-3">{college.phone || "-"}</td>
//                     <td className="p-3">{college.address || "-"}</td>
//                     <td className="p-3">
//                       {college.isActive ? (
//                         <span className="text-green-600 font-semibold">
//                           Active
//                         </span>
//                       ) : (
//                         <span className="text-red-600 font-semibold">
//                           Inactive
//                         </span>
//                       )}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import {toggleCollegeStatus } from "@/services/collegeService"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Building2, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  Upload,
  TrendingUp,
  Users,
  Calendar
} from "lucide-react";

interface College {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  isActive: boolean;
  createdAt?: string;
  studentCount?: number;
  adminCount?: number;
}

export default function CollegeListPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [collegeToDelete, setCollegeToDelete] = useState<College | null>(null);
  const itemsPerPage = 10;

  // Fetch Colleges
  const fetchColleges = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/college");
      // Add mock data for demonstration
      const collegesWithExtra = (res.data.data || []).map((college: any, index: number) => ({
        ...college,
        createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        studentCount: Math.floor(Math.random() * 5000) + 100,
        adminCount: Math.floor(Math.random() * 20) + 1,
      }));
      setColleges(collegesWithExtra);
    } catch (err) {
      console.error("Error fetching colleges", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);
const handleToggleCollege = async (
  id: number
) => {
  try {
    await toggleCollegeStatus(id);

    console.log(
      "College status updated"
    );

    fetchColleges();

  } catch (err: any) {
    console.error(err);
  }
};
  // Filter Colleges
  const filteredColleges = colleges.filter(college => {
    const matchesSearch = 
      college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.address?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "active" && college.isActive) ||
                         (statusFilter === "inactive" && !college.isActive);
    
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredColleges.length / itemsPerPage);
  const paginatedColleges = filteredColleges.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats
  const totalColleges = colleges.length;
  const activeColleges = colleges.filter(c => c.isActive).length;
  const inactiveColleges = colleges.filter(c => !c.isActive).length;
  const totalStudents = colleges.reduce((sum, c) => sum + (c.studentCount || 0), 0);
  const avgStudentsPerCollege = totalColleges ? Math.round(totalStudents / totalColleges) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                College Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Manage all registered colleges, their details, and statistics
              </p>
            </div>
            
            <div className="flex gap-3">
              <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                <Download size={18} />
                <span>Export</span>
              </button>
              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg">
                <Plus size={20} />
                <span>Add New College</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Colleges</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalColleges}</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
                <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <TrendingUp size={12} />
              <span>+{Math.floor(Math.random() * 20)}% from last month</span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Active Colleges</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">{activeColleges}</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${totalColleges ? (activeColleges / totalColleges) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Students</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">{totalStudents.toLocaleString()}</p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Avg {avgStudentsPerCollege.toLocaleString()} per college
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Inactive Colleges</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">{inactiveColleges}</p>
              </div>
              <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-xl">
                <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          
          {/* Search and Filter Bar */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search by college name, email, or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              
              <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Filter size={18} />
                <span>More Filters</span>
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Loading colleges...</p>
              </div>
            </div>
          )}

          {/* Colleges Table */}
          {!loading && (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        College
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Contact Info
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Address
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Statistics
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Status
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {paginatedColleges.length > 0 ? (
                      paginatedColleges.map((college) => (
                        <tr 
                          key={college.id} 
                          className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                          onClick={() => setSelectedCollege(selectedCollege?.id === college.id ? null : college)}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                                <Building2 size={20} />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900 dark:text-white">
                                  {college.name}
                                </p>
                                <div className="flex items-center gap-1 mt-0.5">
                                  <Calendar size={12} className="text-gray-400" />
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Added: {college.createdAt || 'N/A'}
                                  </p>
                                </div>
                              </div>
                            </div>
                           </td>
                          
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5">
                                <Mail size={14} className="text-gray-400" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                  {college.email}
                                </span>
                              </div>
                              {college.phone && (
                                <div className="flex items-center gap-1.5">
                                  <Phone size={14} className="text-gray-400" />
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {college.phone}
                                  </span>
                                </div>
                              )}
                            </div>
                           </td>
                          
                          <td className="px-6 py-4">
                            {college.address ? (
                              <div className="flex items-start gap-1.5">
                                <MapPin size={14} className="text-gray-400 mt-0.5" />
                                <span className="text-sm text-gray-600 dark:text-gray-400 max-w-xs line-clamp-2">
                                  {college.address}
                                </span>
                              </div>
                            ) : (
                              <span className="text-sm text-gray-400">Not provided</span>
                            )}
                           </td>
                          
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="flex items-center justify-between gap-4">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Students</span>
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                  {college.studentCount?.toLocaleString() || 0}
                                </span>
                              </div>
                              <div className="flex items-center justify-between gap-4">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Admins</span>
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                  {college.adminCount || 0}
                                </span>
                              </div>
                            </div>
                           </td>
                          
                          <td className="px-6 py-4">
                            <button
  onClick={() =>
    handleToggleCollege(college.id)
  }
  className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
    college.isActive
      ? "bg-green-100 text-green-700 hover:bg-green-200"
      : "bg-red-100 text-red-700 hover:bg-red-200"
  }`}
>
  {college.isActive
    ? "Active"
    : "Inactive"}
</button>
                           </td>
                           
                          
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button 
                                onClick={(e) => e.stopPropagation()}
                                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                                title="View Details"
                              >
                                <Eye size={18} />
                              </button>
                              <button 
                                onClick={(e) => e.stopPropagation()}
                                className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <Edit size={18} />
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCollegeToDelete(college);
                                  setShowDeleteModal(true);
                                }}
                                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 size={18} />
                              </button>
                              <button 
                                onClick={(e) => e.stopPropagation()}
                                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                title="More Options"
                              >
                                <MoreVertical size={18} />
                              </button>
                            </div>
                           </td>
                          </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <Building2 size={48} className="text-gray-400" />
                            <p className="text-gray-500 dark:text-gray-400">No colleges found</p>
                            <button className="text-blue-600 hover:text-blue-700 font-medium">
                              Add your first college
                            </button>
                          </div>
                         </td>
                       </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden divide-y divide-gray-200 dark:divide-gray-700">
                {paginatedColleges.map((college) => (
                  <div key={college.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
                          <Building2 size={24} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {college.name}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            ID: {college.id}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">{college.email}</span>
                      </div>
                      {college.phone && (
                        <div className="flex items-center gap-2">
                          <Phone size={14} className="text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-400">{college.phone}</span>
                        </div>
                      )}
                      {college.address && (
                        <div className="flex items-start gap-2">
                          <MapPin size={14} className="text-gray-400 mt-0.5" />
                          <span className="text-gray-600 dark:text-gray-400 flex-1">{college.address}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex gap-4">
                          <span className="text-xs text-gray-500">Students: <strong>{college.studentCount?.toLocaleString() || 0}</strong></span>
                          <span className="text-xs text-gray-500">Admins: <strong>{college.adminCount || 0}</strong></span>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                          college.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {college.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {filteredColleges.length > 0 && (
                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredColleges.length)} of {filteredColleges.length} colleges
                  </p>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-1.5 rounded-lg transition-colors ${
                            currentPage === pageNum
                              ? "bg-blue-600 text-white"
                              : "border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* College Details Modal */}
      

      {/* Delete Confirmation Modal */}
      {showDeleteModal && collegeToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full shadow-2xl">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Delete College</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">This action cannot be undone</p>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to delete <span className="font-semibold text-gray-900 dark:text-white">{collegeToDelete.name}</span>? This will permanently remove the college and all associated data from the system.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Add delete logic here
                    setShowDeleteModal(false);
                    setCollegeToDelete(null);
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete College
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}