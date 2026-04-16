"use client";

import { useEffect, useState } from "react";
import { getSessions } from "@/services/sessionService";

interface Session {
  id: number;
  name: string;
}

export default function SessionListPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const res = await getSessions();
      console.log(res);

      setSessions(res); // ✅ FIXED

    } catch (err) {
      console.error("Error fetching sessions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      
      <div className="bg-white shadow-xl rounded-2xl p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Session List
          </h2>

          <span className="text-sm text-gray-500">
            Total: {sessions.length}
          </span>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-6">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border rounded-xl overflow-hidden">
              
              <thead className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <tr>
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">Session</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {sessions.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center p-6 text-gray-500">
                      No Sessions Found
                    </td>
                  </tr>
                ) : (
                  sessions.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-3 font-medium">{index + 1}</td>
                      
                      {/* ✅ FIXED */}
                      <td className="p-3">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                          {item.name}
                        </span>
                      </td>

                      <td className="p-3 text-center space-x-2">
                        <button className="bg-yellow-400 px-3 py-1 rounded text-white hover:bg-yellow-500">
                          Edit
                        </button>

                        <button className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600">
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