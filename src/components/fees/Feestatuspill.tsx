type Status = "PAID" | "PARTIAL" | "PENDING";

const config: Record<Status, { bg: string; text: string; dot: string }> = {
  PAID: {
    bg: "bg-green-50",
    text: "text-green-800",
    dot: "bg-green-600",
  },
  PARTIAL: {
    bg: "bg-amber-50",
    text: "text-amber-800",
    dot: "bg-amber-500",
  },
  PENDING: {
    bg: "bg-red-50",
    text: "text-red-800",
    dot: "bg-red-500",
  },
};

export default function FeeStatusPill({ status }: { status: Status }) {
  const c = config[status] ?? config.PENDING;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${c.bg} ${c.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {status}
    </span>
  );
}