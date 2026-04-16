"use client";

import { useEffect, useState } from "react";
import { getTransferHistory } from "@/services/hostelService";

export default function HostelHistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await getTransferHistory();
      setHistory(res.data || []);
    } catch (err: any) {
      alert(err.message || "Failed to fetch history");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading history...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">
        Hostel Transfer History
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3">Student ID</th>
              <th className="border p-3">From Hostel</th>
              <th className="border p-3">To Hostel</th>
              <th className="border p-3">From Room</th>
              <th className="border p-3">To Room</th>
              <th className="border p-3">Reason</th>
              <th className="border p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td className="border p-3">
                  {item.student?.id}
                </td>

                <td className="border p-3">
                  {item.fromHostelId}
                </td>

                <td className="border p-3">
                  {item.toHostelId}
                </td>

                <td className="border p-3">
                  {item.fromRoomId}
                </td>

                <td className="border p-3">
                  {item.toRoomId}
                </td>

                <td className="border p-3">
                  {item.reason}
                </td>

                <td className="border p-3">
                  {new Date(
                    item.transferredAt
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}