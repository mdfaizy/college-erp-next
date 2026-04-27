// "use client";

// import { useState } from "react";
// import { createSession } from "@/services/sessionService";

// export default function SessionPage() {
//   const [session, setSession] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//   if (!session) {
//     alert("Session is required ❌");
//     return;
//   }

//   try {
//     await createSession({
//       name: session, // ✅ FIXED
//     });

//     alert("Session Created ✅");
//     setSession("");

//   } catch (err) {
//     alert("Error creating session ❌");
//   }
// };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
//       <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        
//         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
//           Create Session
//         </h2>

//         {/* Input */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-600 mb-1">
//             Session (Year Range)
//           </label>

//           <input
//             type="text"
//             value={session}
//             placeholder="e.g. 2024-2028"
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             onChange={(e) => setSession(e.target.value)}
//           />

//           <p className="text-xs text-gray-400 mt-1">
//             Format: StartYear-EndYear (Example: 2024-2028)
//           </p>
//         </div>

//         {/* Button */}
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
//         >
//           {loading ? "Creating..." : "Create Session"}
//         </button>

//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { createSession } from "@/services/sessionService";
import { CalendarPlus, ArrowLeft, Info, Loader2 } from "lucide-react";
import Link from "next/link";

export default function SessionPage() {
  const [session, setSession] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!session) {
      alert("Please enter a session range ❌");
      return;
    }

    setLoading(true);
    try {
      await createSession({
        name: session,
      });

      alert("Academic Session Created Successfully ✅");
      setSession("");
    } catch (err) {
      alert("Error creating session ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4">
      {/* Back Button Placeholder */}
      <div className="absolute top-8 left-8">
        <Link href="/admin/sessions" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-all font-medium text-sm">
          <ArrowLeft size={18} />
          Back to List
        </Link>
      </div>

      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 rounded-3xl p-8">
          
          {/* Icon & Heading */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
              <CalendarPlus size={32} />
            </div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              Create New Session
            </h2>
            <p className="text-slate-500 text-sm mt-1">Setup a new academic calendar year</p>
          </div>

          {/* Form Content */}
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
                Session Duration
              </label>
              
              <div className="relative">
                <input
                  type="text"
                  value={session}
                  placeholder="e.g. 2024-2028"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 transition-all text-slate-700 font-medium placeholder:text-slate-300"
                  onChange={(e) => setSession(e.target.value)}
                />
              </div>

              {/* Info Box */}
              <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-xl flex gap-3">
                <Info className="text-blue-500 shrink-0" size={18} />
                <p className="text-[11px] text-blue-700 leading-relaxed">
                  Use the <strong>StartYear-EndYear</strong> format. This session will be used to categorize students and exams.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="group relative w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-2xl font-bold transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 active:scale-[0.98] disabled:bg-slate-300 disabled:shadow-none"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Configuring...</span>
                </>
              ) : (
                <>
                  <span>Initialize Session</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Security Note */}
        <p className="text-center text-slate-400 text-xs mt-6">
          Authorized Admin Access Only • Secure Encryption Active
        </p>
      </div>
    </div>
  );
}