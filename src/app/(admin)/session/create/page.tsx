"use client";

import { useState } from "react";
import { createSession } from "@/services/sessionService";

export default function SessionPage() {
  const [session, setSession] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
  if (!session) {
    alert("Session is required ❌");
    return;
  }

  try {
    await createSession({
      name: session, // ✅ FIXED
    });

    alert("Session Created ✅");
    setSession("");

  } catch (err) {
    alert("Error creating session ❌");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Session
        </h2>

        {/* Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Session (Year Range)
          </label>

          <input
            type="text"
            value={session}
            placeholder="e.g. 2024-2028"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setSession(e.target.value)}
          />

          <p className="text-xs text-gray-400 mt-1">
            Format: StartYear-EndYear (Example: 2024-2028)
          </p>
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
        >
          {loading ? "Creating..." : "Create Session"}
        </button>

      </div>
    </div>
  );
}