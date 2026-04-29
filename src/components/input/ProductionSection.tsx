interface ProductionSectionProps {
  qtyCheck: number;
  setQtyCheck: (value: number) => void;
}

export default function ProductionSection({ qtyCheck, setQtyCheck }: ProductionSectionProps) {
  return (
    <div className="bg-slate-900 border border-slate-700/60 rounded-xl p-3">
      <h2 className="text-sm font-semibold text-slate-200 mb-2">Production</h2>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-0.5">
          <label className="text-xs font-medium text-slate-400">Production Output</label>
          <input type="number" placeholder="Enter output" className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded h-8 px-2 py-1 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all placeholder:text-slate-600" />
        </div>

        <div className="flex flex-col gap-0.5">
          <label className="text-xs font-medium text-slate-400">Qty Check</label>
          <input 
            type="number" 
            placeholder="Enter qty check" 
            value={qtyCheck || ""}
            onChange={(e) => setQtyCheck(parseInt(e.target.value) || 0)}
            min="0"
            className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded h-8 px-2 py-1 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all placeholder:text-slate-600" 
          />
        </div>
      </div>
    </div>
  );
}
