interface StatCardProps {
  title: string;
  value: string | number;
  type?: "blue" | "green" | "red" | "yellow";
  icon?: React.ReactNode;
}

export default function StatCard({
  title,
  value,
  type = "blue",
  icon,
}: StatCardProps) {

  const styles = {
    blue: "border-blue-500 bg-blue-50 text-blue-600",
    green: "border-green-500 bg-green-50 text-green-600",
    red: "border-red-500 bg-red-50 text-red-600",
    yellow: "border-yellow-500 bg-yellow-50 text-yellow-600",
  };

  return (
    <div
      className={`rounded-xl border-l-4 shadow-sm p-5 flex justify-between items-center ${styles[type]}`}
    >
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>

      {/* Optional Icon */}
      <div className="text-gray-400">
        {icon}
      </div>
    </div>
  );
}