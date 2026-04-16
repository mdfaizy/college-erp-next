// "use client";

// import React, { useEffect, useState } from "react";
// import { getRoles } from "@/services/roleService";

// export default function RoleListPage() {
//   const [roles, setRoles] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchRoles = async () => {
//       const res = await getRoles();
//       setRoles(res.data || []);
//     };
//     fetchRoles();
//   }, []);

//   return (
//     <div className="p-6">
//       <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">

//         <h1 className="text-xl font-bold mb-4">Roles List</h1>

//         <table className="w-full border">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-3 text-left">Role Name</th>
//               <th className="p-3 text-left">Permissions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {roles.map((role) => (
//               <tr key={role.id} className="border-t">
//                 <td className="p-3">{role.name}</td>

//                 <td className="p-3">
//                   <div className="flex flex-wrap gap-2">
//                     {role.permissions?.map((p: any) => (
//                       <span
//                         key={p.id}
//                         className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded"
//                       >
//                         {p.name}
//                       </span>
//                     ))}
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>

//         </table>
//       </div>
//     </div>
//   );
// }



"use client";

import React, { useEffect, useState } from "react";
import { getRoles } from "@/services/roleService";
import { Shield, Plus, Edit, Trash2, Users, Key, ChevronRight, Search, Filter } from "lucide-react";
import { Role } from "@/types/role";

export default function RoleListPage() {
  // const [roles, setRoles] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  // const [selectedRole, setSelectedRole] = useState<any>(null);

const [roles, setRoles] = useState<Role[]>([]);
const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setLoading(true);
        const res = await getRoles();
        setRoles(res || []);
      } catch (error) {
        console.error("Error fetching roles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, []);

  const filteredRoles = roles.filter(role =>
    role.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleIcon = (roleName: string) => {
    const icons: any = {
      admin: <Shield className="w-5 h-5" />,
      manager: <Users className="w-5 h-5" />,
      user: <Key className="w-5 h-5" />,
    };
    return icons[roleName?.toLowerCase()] || <Shield className="w-5 h-5" />;
  };

  const getRoleColor = (roleName: string) => {
    const colors: any = {
      admin: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      manager: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      user: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    };
    return colors[roleName?.toLowerCase()] || "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Role Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Manage user roles and permissions
              </p>
            </div>
            
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg">
              <Plus size={20} />
              <span>Create New Role</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Roles</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{roles.length}</p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl">
                <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Permissions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {roles.reduce((sum, role) => sum + (role.permissions?.length || 0), 0)}
                </p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
                <Key className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          
          {/* Search and Filter Bar */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search roles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                />
              </div>
              <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Filter size={18} />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Loading roles...</p>
              </div>
            </div>
          )}

          {/* Roles Table */}
          {!loading && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Role Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Permissions
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Users Count
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredRoles.length > 0 ? (
                    filteredRoles.map((role) => (
                      <tr 
                        key={role.id} 
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group cursor-pointer"
                        onClick={() => setSelectedRole(selectedRole?.id === role.id ? null : role)}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${getRoleColor(role.name)}`}>
                              {getRoleIcon(role.name)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {role.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                ID: {role.id}
                              </p>
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2 max-w-md">
                            {role.permissions?.slice(0, 3).map((p: any) => (
                              <span
                                key={p.id}
                                className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-lg border border-blue-200 dark:border-blue-800"
                              >
                                {p.name}
                              </span>
                            ))}
                            {role.permissions?.length > 3 && (
                              <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-lg">
                                +{role.permissions.length - 3} more
                              </span>
                            )}
                            {(!role.permissions || role.permissions.length === 0) && (
                              <span className="text-xs text-gray-500 dark:text-gray-400 italic">
                                No permissions assigned
                              </span>
                            )}
                          </div>
                         </td>
                        
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                              <Users size={14} className="text-green-600 dark:text-green-400" />
                            </div>
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {role.userCount || 0} users
                            </span>
                          </div>
                         </td>
                        
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                                      onClick={(e) => e.stopPropagation()}
                              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                            >
                              <Edit size={18} />
                            </button>
                            <button 
                                      onClick={(e) => e.stopPropagation()}
                              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                            <ChevronRight 
                              size={18} 
                              className={`text-gray-400 transition-transform ${selectedRole?.id === role.id ? 'rotate-90' : ''}`}
                            />
                          </div>
                         </td>
                       </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <Shield size={48} className="text-gray-400" />
                          <p className="text-gray-500 dark:text-gray-400">No roles found</p>
                          <button className="text-purple-600 hover:text-purple-700 font-medium">
                            Create your first role
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Expanded Role Details */}
          {selectedRole && (
            <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                All Permissions for {selectedRole.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedRole.permissions?.map((p: any) => (
                  <span
                    key={p.id}
                    className="px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm"
                  >
                    {p.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Pagination */}
          {!loading && filteredRoles.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredRoles.length} of {roles.length} roles
              </p>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50">
                  Previous
                </button>
                <button className="px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}