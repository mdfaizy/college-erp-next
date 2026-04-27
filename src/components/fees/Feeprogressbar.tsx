type Status = "PAID" | "PARTIAL" | "PENDING";

const barColor: Record<Status, string> = {
  PAID: "bg-green-500",
  PARTIAL: "bg-amber-400",
  PENDING: "bg-red-400",
};

interface Props {
  amount: number;
  paidAmount: number;
  status: Status;
}

export default function FeeProgressBar({ amount, paidAmount, status }: Props) {
  const pct = amount > 0 ? Math.min(100, Math.round((paidAmount / amount) * 100)) : 0;

  return (
    <div className="flex flex-col gap-1 min-w-[80px]">
      <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${barColor[status]}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[11px] text-gray-400">{pct}% paid</span>
    </div>
  );
}