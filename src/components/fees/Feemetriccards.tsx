interface Props {
  totalAmount: number;
  totalPaid: number;
  totalPending: number;
  totalCount: number;
  paidCount: number;
  pendingCount: number;
}

function fmt(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

interface CardProps {
  label: string;
  value: string;
  sub: string;
  accent: string;
  iconPath: string;
}

function MetricCard({ label, value, sub, accent, iconPath }: CardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${accent}`}>
        <svg
          className="w-5 h-5"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
        </svg>
      </div>
      <div>
        <p className="text-xs text-gray-400 mb-0.5 tracking-wide uppercase font-medium">{label}</p>
        <p className="text-xl font-semibold text-gray-900">{value}</p>
        <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
      </div>
    </div>
  );
}

export default function FeeMetricCards({
  totalAmount,
  totalPaid,
  totalPending,
  totalCount,
  paidCount,
  pendingCount,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MetricCard
        label="Total Fees"
        value={fmt(totalAmount)}
        sub={`${totalCount} records`}
        accent="bg-blue-50 text-blue-600"
        iconPath="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 4v4l2.5 2.5"
      />
      <MetricCard
        label="Collected"
        value={fmt(totalPaid)}
        sub={`${paidCount} fully paid`}
        accent="bg-green-50 text-green-600"
        iconPath="M5 10l4 4 6-6"
      />
      <MetricCard
        label="Pending"
        value={fmt(totalPending)}
        sub={`${pendingCount} unpaid`}
        accent="bg-red-50 text-red-600"
        iconPath="M10 6v4m0 4h.01M10 2a8 8 0 100 16A8 8 0 0010 2z"
      />
    </div>
  );
}