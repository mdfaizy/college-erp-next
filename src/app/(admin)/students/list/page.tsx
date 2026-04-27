"use client";

import { useEffect, useState } from "react";
import {
  getStudents,
  deleteStudent,
} from "@/services/studentService";
import { useRouter } from "next/navigation";
import {
  Loader2,
  Pencil,
  Trash2,
  Users,
  Eye,
  Search,
  UserPlus,
  Filter,
  // MoreVertical,
  // Mail,
  Phone,
  MapPin
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function StudentListPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const router = useRouter();

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await getStudents();
      setStudents(res?.data || []);
      console.log(res);
    } catch (err) {
      toast.error("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Are you sure you want to delete this student record? This action cannot be undone.");
    if (!confirmed) return;

    try {
      await deleteStudent(id);
      toast.success("Student record purged successfully");
      fetchStudents();
    } catch {
      toast.error("Deletion failed. Please try again.");
    }
  };

  // Filter Logic
  const filteredStudents = students.filter(stu => 
    stu.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stu.mobile?.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* TOP HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 mb-1">
              <Users size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">Academic Directory</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Student Management</h1>
            <p className="text-slate-500 text-sm font-medium">Review and manage core student profiles and academic status.</p>
          </div>

          <button 
            onClick={() => router.push('/students/create')}
            className="flex items-center justify-center gap-2 bg-indigo-600 px-5 py-3 rounded-xl text-sm font-bold text-white hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
          >
            <UserPlus size={18} />
            Add New Student
          </button>
        </div>

        {/* FILTER & SEARCH BAR */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search by name or mobile..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
              <Filter size={16} />
              Filters
            </button>
            <div className="h-10 w-[1px] bg-slate-200 hidden md:block mx-2"></div>
            <div className="text-sm font-bold text-slate-500">
              Total: <span className="text-indigo-600">{filteredStudents.length}</span>
            </div>
          </div>
        </div>

        {/* TABLE CONTAINER */}
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Student Info</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Contact Details</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Academic Track</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Session</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-24 text-center">
                      <div className="flex flex-col items-center gap-3 text-slate-400 font-bold">
                        <Loader2 className="animate-spin text-indigo-600" size={32} />
                        Syncing Records...
                      </div>
                    </td>
                  </tr>
                ) : filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-24 text-center text-slate-300 font-bold italic">
                      No matching student records found.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((stu, index) => {
                    const active = stu.academics?.find((a: any) => a.isActive);

                    return (
                      <tr key={stu.id} className="group hover:bg-indigo-50/30 transition-all duration-200">
                        {/* Name & Identity */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                              {stu.user?.name?.charAt(0)}
                            </div>
                            <div>
                              <p className="font-black text-slate-800">{stu.user?.name}</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">UID: #{stu.id.toString().padStart(4, '0')}</p>
                            </div>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                              <Phone size={12} className="text-slate-400" /> {stu.mobile}
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-slate-400">
                              <MapPin size={12} /> {stu.address?.substring(0, 20)}...
                            </div>
                          </div>
                        </td>

                        {/* Academic Context */}
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-700">{active?.course?.name || "Unassigned"}</span>
                            <span className="text-[10px] font-bold text-indigo-500 uppercase">{active?.department?.name || "N/A"}</span>
                          </div>
                        </td>

                       <td className="px-6 py-4">
  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-600 border border-emerald-100 uppercase tracking-tighter">
    {active?.session?.name || "No Session"}
  </span>
</td>

<td className="px-6 py-4">
  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-600 border border-emerald-100 uppercase tracking-tighter">
    {stu?.status || "No Status"}
  </span>
</td>
                        {/* ERP Actions */}
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => router.push(`/students/view/${stu.id}`)}
                              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-100"
                              title="View Profile"
                            >
                              <Eye size={16} />
                            </button>
                            <button 
                              onClick={() => router.push(`/students/edit/${stu.id}`)}
                              className="p-2 text-slate-400 hover:text-amber-600 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-100"
                              title="Edit Details"
                            >
                              <Pencil size={16} />
                            </button>
                            <button 
                              onClick={() => handleDelete(stu.id)}
                              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-100"
                              title="Delete Record"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          
          {/* TABLE FOOTER */}
          <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-400 italic">Showing active student directory</p>
            <div className="flex items-center gap-2">
               <button className="px-3 py-1 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">Prev</button>
               <div className="h-4 w-[1px] bg-slate-300 mx-1"></div>
               <button className="px-3 py-1 text-xs font-bold text-indigo-600">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}