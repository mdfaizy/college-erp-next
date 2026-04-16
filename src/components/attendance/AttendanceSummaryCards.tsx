interface Props {
  total: number;
  present: number;
  absent: number;
  percentage: string;
}

export default function AttendanceSummaryCards({
  total,
  present,
  absent,
  percentage,
}: Props) {
  const cards = [
    { label: "Total Classes", value: total },
    { label: "Present", value: present },
    { label: "Absent", value: absent },
    { label: "Attendance %", value: `${percentage}%` },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white shadow rounded-xl p-5 border"
        >
          <p className="text-gray-500 text-sm">{card.label}</p>
          <h2 className="text-2xl font-bold mt-2">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}