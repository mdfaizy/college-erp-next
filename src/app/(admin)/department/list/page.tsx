"use client";

import { useEffect, useState } from "react";
import { getDepartments, deleteDepartment } from "@/services/departmentService";

interface Department {
  id: number;
  name: string;
  code: string;
}

export default function DepartmentListPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDepartments = async () => {
    try { 
      setLoading(true);
      const res = await getDepartments();
      setDepartments(res.data); // अगर res.data.data हो तो adjust करना
    } catch (err) {
      console.error("Error fetching departments", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete?")) return;

    try {
      await deleteDepartment(id);
      fetchDepartments(); // refresh
    } catch (err) {
      alert("Delete failed ❌");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-2xl p-6">

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Department List
        </h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border rounded-lg overflow-hidden">
              
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">Department Name</th>
                  <th className="p-3 text-left">Code</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {departments.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center p-4">
                      No Data Found
                    </td>
                  </tr>
                ) : (
                  departments.map((dep, index) => (
                    <tr
                      key={dep.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3">{dep.name}</td>
                      <td className="p-3">{dep.code}</td>

                      <td className="p-3 text-center space-x-2">
                        
                        {/* Edit (future) */}
                        <button className="bg-yellow-400 px-3 py-1 rounded text-white hover:bg-yellow-500">
                          Edit
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(dep.id)}
                          className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
                        >
                          Delete
                        </button>

                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
}