"use client";

import { useEffect, useState } from "react";
import { getMyResult } from "@/services/resultService";

export default function MyResultPage() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResult();
  }, []);

  const fetchResult = async () => {
    try {
      setLoading(true);
      const res = await getMyResult(2); // 👉 semester dynamic bhi kar sakte ho
      setResults(res.data || []);
    } catch (err) {
      console.error("Error fetching result", err);
    } finally {
      setLoading(false);
    }
  };

  const getGrade = (total: number) => {
    if (total >= 75) return "A";
    if (total >= 60) return "B";
    if (total >= 40) return "C";
    return "F";
  };

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading results...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow border p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              My Result
            </h1>
            <p className="text-sm text-gray-500">
              Semester 2
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="bg-blue-600 text-white px-4 py-2 rounded print:hidden"
          >
            Print
          </button>
        </div>

        {/* EMPTY */}
        {results.length === 0 ? (
          <p className="text-gray-500">
            No results found
          </p>
        ) : (

          <div className="overflow-x-auto">

            <table className="w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3">#</th>
                  <th className="border p-3">Subject</th>
                  <th className="border p-3">Internal</th>
                  <th className="border p-3">External</th>
                  <th className="border p-3">Total</th>
                  <th className="border p-3">%</th>
                  <th className="border p-3">Grade</th>
                  <th className="border p-3">Result</th>
                </tr>
              </thead>

              <tbody>
                {results.map((r: any, i: number) => {
                  const percent =
                    ((r.total || 0) / 100) * 100;

                  return (
                    <tr key={i}>

                      {/* INDEX */}
                      <td className="border p-3 text-center">
                        {i + 1}
                      </td>

                      {/* SUBJECT */}
                      <td className="border p-3">
                        {r.subject}
                      </td>

                      {/* INTERNAL */}
                      <td className="border p-3 text-blue-600 text-center">
                        {r.internal}
                      </td>

                      {/* EXTERNAL */}
                      <td className="border p-3 text-green-600 text-center">
                        {r.external}
                      </td>

                      {/* TOTAL */}
                      <td className="border p-3 text-center font-semibold">
                        {r.total}
                      </td>

                      {/* PERCENT */}
                      <td className="border p-3 text-center">
                        {percent.toFixed(1)}%
                      </td>

                      {/* GRADE */}
                      <td className="border p-3 text-center">
                        {getGrade(r.total)}
                      </td>

                      {/* RESULT */}
                      <td className="border p-3 text-center">
                        <span
                          className={`px-2 py-1 rounded text-white text-xs ${
                            r.external < 33
                              ? "bg-red-500"
                              : r.total >= 40
                              ? "bg-green-600"
                              : "bg-yellow-500"
                          }`}
                        >
                          {r.external < 33
                            ? "FAIL"
                            : r.total >= 40
                            ? "PASS"
                            : "FAIL"}
                        </span>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>

          </div>
        )}
      </div>

      {/* PRINT STYLE */}
      <style jsx>{`
        @media print {
          button {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}