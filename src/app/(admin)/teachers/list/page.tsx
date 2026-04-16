// "use client";

// import React, { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "@/components/redux/slices/hooks";
// import { setLoading, setTeachers, setError } from "@/components/redux/slices/teacherSlice";
// import { getTeachers } from "@/services/teacherService";
// import { Teacher } from "@/types/teacher"; // ✅ import type

// export default function TeacherListPage() {
//   const dispatch = useAppDispatch();

//   const { teachers, loading, error } = useAppSelector(
//     (state) => state.teacher
//   );

//   // ✅ Fetch teachers
//   useEffect(() => {
//     const fetchTeachers = async () => {
//       try {
//         dispatch(setLoading(true));

//         const data = await getTeachers();
//         dispatch(setTeachers(data));

//       } catch (err: unknown) {
//         if (err instanceof Error) {
//           dispatch(setError(err.message));
//         } else {
//           dispatch(setError("Something went wrong"));
//         }
//       } finally {
//         dispatch(setLoading(false));
//       }
//     };

//     fetchTeachers();
//   }, [dispatch]);

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Teacher List</h2>

//       {/* Error */}
//       {error && <p className="text-red-500">{error}</p>}

//       {/* Loading */}
//       {loading && <p>Loading...</p>}

//       {/* Table */}
//       <table className="w-full border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="p-2 border">ID</th>
//             <th className="p-2 border">Name</th>
//             <th className="p-2 border">Email</th>
//             <th className="p-2 border">Subject</th>
//             <th className="p-2 border">Qualification</th>
//             <th className="p-2 border">Experience</th>
//             <th className="p-2 border">Phone</th>
//           </tr>
//         </thead>

//         <tbody>
//           {teachers.map((t: Teacher) => (
//             <tr key={t.id}>
//               <td className="p-2 border">{t.id}</td>
//               <td className="p-2 border">{t.user?.name}</td>
//               <td className="p-2 border">{t.user?.email}</td>
//               <td className="p-2 border">{t.subject}</td>
//               <td className="p-2 border">{t.qualification}</td>
//               <td className="p-2 border">{t.experience}</td>
//               <td className="p-2 border">{t.phone}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/components/redux/slices/hooks";
import { setLoading, setTeachers, setError } from "@/components/redux/slices/teacherSlice";
import { getTeachers } from "@/services/teacherService";
import { Teacher } from "@/types/teacher";
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  GraduationCap,
  Briefcase,
  Phone,
  Mail,
  User,
  Star,
  Award,
  Clock
} from "lucide-react";

export default function TeacherListPage() {
  const dispatch = useAppDispatch();
  const { teachers, loading, error } = useAppSelector((state) => state.teacher);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState<Teacher | null>(null);
  const itemsPerPage = 10;

  // Fetch teachers
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        dispatch(setLoading(true));
        const data = await getTeachers();
        dispatch(setTeachers(data));
      } catch (err: unknown) {
        if (err instanceof Error) {
          dispatch(setError(err.message));
        } else {
          dispatch(setError("Something went wrong"));
        }
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchTeachers();
  }, [dispatch]);

  // Get unique subjects for filter
  const uniqueSubjects = [...new Set(teachers.map(t => t.subject).filter(Boolean))];
  
  // Filter teachers
  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = 
      teacher.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSubject = subjectFilter === "all" || teacher.subject === subjectFilter;
    
    const matchesExperience = experienceFilter === "all" || 
      (experienceFilter === "0-5" && teacher.experience <= 5) ||
      (experienceFilter === "5-10" && teacher.experience > 5 && teacher.experience <= 10) ||
      (experienceFilter === "10+" && teacher.experience > 10);
    
    return matchesSearch && matchesSubject && matchesExperience;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const paginatedTeachers = filteredTeachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats
  const totalTeachers = teachers.length;
  const avgExperience = teachers.reduce((sum, t) => sum + (t.experience || 0), 0) / totalTeachers || 0;
  const totalSubjects = uniqueSubjects.length;

  // Experience badge color
  const getExperienceColor = (years: number) => {
    if (years <= 2) return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    if (years <= 5) return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    if (years <= 10) return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Teacher Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Manage faculty members, their qualifications, and teaching assignments
              </p>
            </div>
            
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg">
              <Plus size={20} />
              <span>Add New Teacher</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Teachers</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalTeachers}</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Subjects</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">{totalSubjects}</p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl">
                <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Avg Experience</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">{avgExperience.toFixed(1)} yrs</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
                <Briefcase className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Qualified</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">
                  {teachers.filter(t => t.qualification).length}
                </p>
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-xl">
                <GraduationCap className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
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
                  placeholder="Search by name, email, or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                />
              </div>
              
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Subjects</option>
                {uniqueSubjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
              
              <select
                value={experienceFilter}
                onChange={(e) => setExperienceFilter(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Experience</option>
                <option value="0-5">0-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10+">10+ years</option>
              </select>
              
              <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Filter size={18} />
                <span>More Filters</span>
              </button>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="m-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-red-800 dark:text-red-300">Error loading teachers</p>
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Loading teachers...</p>
              </div>
            </div>
          )}

          {/* Teachers Grid/Table */}
          {!loading && !error && (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Teacher
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Subject
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Qualification
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Experience
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Contact
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {paginatedTeachers.length > 0 ? (
                      paginatedTeachers.map((teacher) => (
                        <tr 
                          key={teacher.id} 
                          className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                          onClick={() => setSelectedTeacher(selectedTeacher?.id === teacher.id ? null : teacher)}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                                {teacher.user?.name?.charAt(0).toUpperCase() || 'T'}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {teacher.user?.name || 'N/A'}
                                </p>
                                <div className="flex items-center gap-1 mt-0.5">
                                  <Mail size={12} className="text-gray-400" />
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {teacher.user?.email || 'No email'}
                                  </p>
                                </div>
                              </div>
                            </div>
                           </td>
                          
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-lg">
                              <BookOpen size={14} />
                              {teacher.subject || 'N/A'}
                            </span>
                           </td>
                          
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5">
                              <GraduationCap size={14} className="text-gray-400" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                {teacher.qualification || 'N/A'}
                              </span>
                            </div>
                           </td>
                          
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Clock size={14} className="text-gray-400" />
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getExperienceColor(teacher.experience || 0)}`}>
                                {teacher.experience || 0} years
                              </span>
                            </div>
                           </td>
                          
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1">
                              <Phone size={12} className="text-gray-400" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {teacher.phone || 'N/A'}
                              </span>
                            </div>
                           </td>
                          
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button 
                                onClick={(e) => e.stopPropagation()}
                                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                              >
                                <Edit size={18} />
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setTeacherToDelete(teacher);
                                  setShowDeleteModal(true);
                                }}
                                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                              >
                                <Trash2 size={18} />
                              </button>
                              <button 
                                onClick={(e) => e.stopPropagation()}
                                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
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
                            <Users size={48} className="text-gray-400" />
                            <p className="text-gray-500 dark:text-gray-400">No teachers found</p>
                            <button className="text-blue-600 hover:text-blue-700 font-medium">
                              Add your first teacher
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
                {paginatedTeachers.map((teacher) => (
                  <div key={teacher.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
                          {teacher.user?.name?.charAt(0).toUpperCase() || 'T'}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {teacher.user?.name || 'N/A'}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {teacher.user?.email || 'No email'}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">Subject</p>
                        <div className="flex items-center gap-1">
                          <BookOpen size={12} className="text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300">{teacher.subject || 'N/A'}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">Experience</p>
                        <div className="flex items-center gap-1">
                          <Clock size={12} className="text-gray-400" />
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getExperienceColor(teacher.experience || 0)}`}>
                            {teacher.experience || 0} yrs
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">Qualification</p>
                        <div className="flex items-center gap-1">
                          <GraduationCap size={12} className="text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300">{teacher.qualification || 'N/A'}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">Phone</p>
                        <div className="flex items-center gap-1">
                          <Phone size={12} className="text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300">{teacher.phone || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {filteredTeachers.length > 0 && (
                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredTeachers.length)} of {filteredTeachers.length} teachers
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

      {/* Teacher Details Modal (when clicking on row) */}
      {selectedTeacher && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedTeacher(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                    {selectedTeacher.user?.name?.charAt(0).toUpperCase() || 'T'}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedTeacher.user?.name}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">{selectedTeacher.user?.email}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedTeacher(null)} className="text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Subject</p>
                  <p className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <BookOpen size={16} /> {selectedTeacher.subject || 'N/A'}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Experience</p>
                  <p className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Briefcase size={16} /> {selectedTeacher.experience || 0} years
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Qualification</p>
                  <p className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <GraduationCap size={16} /> {selectedTeacher.qualification || 'N/A'}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Phone</p>
                  <p className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Phone size={16} /> {selectedTeacher.phone || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && teacherToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full shadow-2xl">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Delete Teacher</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">This action cannot be undone</p>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to delete <span className="font-semibold text-gray-900 dark:text-white">{teacherToDelete.user?.name}</span>? This will permanently remove the teacher from the system.
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
                    setTeacherToDelete(null);
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete Teacher
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}