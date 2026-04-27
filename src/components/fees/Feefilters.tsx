"use client";

interface Props {
  search: string;
  semester: string;
  status: string;
  onSearch: (v: string) => void;
  onSemester: (v: string) => void;
  onStatus: (v: string) => void;
  onExportExcel: () => void;
  onExportCSV: () => void;
  onExportPDF: () => void;
}

const inputCls =
  "border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition placeholder:text-gray-400";

export default function FeeFilters({
  search,
  semester,
  status,
  onSearch,
  onSemester,
  onStatus,
  onExportExcel,
  onExportCSV,
  onExportPDF,
}: Props) {
  return (
    <div className="space-y-4">
      {/* Filter Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Search */}
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M16.5 10.5a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className={`${inputCls} pl-9 w-full`}
          />
        </div>

        {/* Semester Select */}
        <select
          value={semester}
          onChange={(e) => onSemester(e.target.value)}
          className={inputCls}
        >
          <option value="">All Semesters</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
            <option key={s} value={String(s)}>
              Semester {s}
            </option>
          ))}
        </select>

        {/* Status Select */}
        <select
          value={status}
          onChange={(e) => onStatus(e.target.value)}
          className={inputCls}
        >
          <option value="">All Status</option>
          <option value="PAID">Paid</option>
          <option value="PARTIAL">Partial</option>
          <option value="PENDING">Pending</option>
        </select>
      </div>

      {/* Export Row */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={onExportExcel}
          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-green-200 text-green-700 bg-green-50 hover:bg-green-100 transition"
        >
          <DownloadIcon />
          Excel
        </button>
        <button
          onClick={onExportCSV}
          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100 transition"
        >
          <DownloadIcon />
          CSV
        </button>
        <button
          onClick={onExportPDF}
          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-red-200 text-red-700 bg-red-50 hover:bg-red-100 transition"
        >
          <DownloadIcon />
          PDF
        </button>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 bg-gray-50 hover:bg-gray-100 transition"
        >
          <PrintIcon />
          Print
        </button>
      </div>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m-4-4l4 4 4-4" />
    </svg>
  );
}

function PrintIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9V4h12v5M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v6H6v-6z" />
    </svg>
  );
}