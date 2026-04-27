"use client";

import { useRouter } from "next/navigation";
import FeeStatusPill from "./FeeStatusPill";
import FeeProgressBar from "./FeeProgressBar";

type Status = "PAID" | "PARTIAL" | "PENDING";

interface Fee {
  id: number;
  amount: number;
  paidAmount: number;
  status: Status;
  student?: { user?: { name?: string } };
  feeStructure?: { semester?: number; feeType?: string };
}

interface Props {
  fees: Fee[];
  payingId: number | null;
  onPay: (fee: Fee) => void;
}

function initials(name?: string) {
  if (!name) return "?";
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function fmt(n: number) {
  return "₹" + Number(n).toLocaleString("en-IN");
}

const avatarColors = [
  "bg-blue-100 text-blue-700",
  "bg-purple-100 text-purple-700",
  "bg-teal-100 text-teal-700",
  "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700",
];

export default function FeeTable({ fees, payingId, onPay }: Props) {
  const router = useRouter();

  if (fees.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400">
        <svg
          className="w-10 h-10 mb-3 text-gray-200"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-sm">No records match your filters.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-100">
            {["Student", "Semester", "Fee Type", "Amount", "Progress", "Status", "Action"].map(
              (h) => (
                <th
                  key={h}
                  className="text-left text-[11px] uppercase tracking-wider font-medium text-gray-400 px-4 py-3 whitespace-nowrap"
                >
                  {h}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {fees.map((fee, idx) => {
            const name = fee.student?.user?.name;
            const semester = fee.feeStructure?.semester;
            const feeType = fee.feeStructure?.feeType;
            const canPay = fee.status !== "PAID";
            const isPaying = payingId === fee.id;
            const avatarCls = avatarColors[idx % avatarColors.length];

            return (
              <tr
                key={fee.id}
                className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors group"
              >
                {/* Student */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${avatarCls}`}
                    >
                      {initials(name)}
                    </div>
                    <span className="font-medium text-gray-800 whitespace-nowrap">
                      {name ?? "—"}
                    </span>
                  </div>
                </td>

                {/* Semester */}
                <td className="px-4 py-3 text-gray-500">
                  {semester ? `Sem ${semester}` : "—"}
                </td>

                {/* Fee Type */}
                <td className="px-4 py-3 text-gray-600">{feeType ?? "—"}</td>

                {/* Amount */}
                <td className="px-4 py-3">
                  <div className="font-semibold text-gray-900">{fmt(fee.amount)}</div>
                  <div className="text-[11px] text-gray-400">{fmt(fee.paidAmount)} paid</div>
                </td>

                {/* Progress */}
                <td className="px-4 py-3">
                  <FeeProgressBar
                    amount={Number(fee.amount)}
                    paidAmount={Number(fee.paidAmount)}
                    status={fee.status}
                  />
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <FeeStatusPill status={fee.status} />
                </td>

                {/* Action */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {canPay && (
                      <button
                        onClick={() => onPay(fee)}
                        disabled={isPaying}
                        className="text-xs font-medium px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isPaying ? "Processing…" : "Pay Now"}
                      </button>
                    )}
                    <button
                      onClick={() => router.push(`/student/fees/${fee.id}`)}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 transition"
                    >
                      Details
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}