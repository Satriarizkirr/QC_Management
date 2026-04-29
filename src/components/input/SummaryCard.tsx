interface SummaryCardProps {
  totalDefect: number;
  defectRate: string;
}

export default function SummaryCard({ totalDefect, defectRate }: SummaryCardProps) {
  return (
    <div className="bg-slate-900 border border-slate-700/60 rounded-xl p-3">
      <h2 className="text-sm font-semibold text-slate-200 mb-2">Summary</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
          <p className="text-xs text-slate-400 mb-1">Total Defect</p>
          <p className="text-xl font-bold text-slate-100">{totalDefect}</p>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
          <p className="text-xs text-slate-400 mb-1">Defect Rate</p>
          <p className="text-xl font-bold text-slate-100">{defectRate}%</p>
        </div>
      </div>
    </div>
  );
}
