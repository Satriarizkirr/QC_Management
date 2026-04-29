import { Trash2, Plus } from "lucide-react";

export interface Defect {
  type: string;
  qty: number;
  repair?: string;
}

interface DefectTableProps {
  defects: Defect[];
  setDefects: React.Dispatch<React.SetStateAction<Defect[]>>;
}

export default function DefectTable({ defects, setDefects }: DefectTableProps) {
  const addDefect = () => {
    setDefects([...defects, { type: "", qty: 0, repair: "" }]);
  };

  const removeDefect = (index: number) => {
    const newDefects = defects.filter((_, i) => i !== index);
    setDefects(newDefects);
  };

  const updateDefect = (index: number, field: string, value: string | number) => {
    const newDefects = [...defects];
    newDefects[index] = { ...newDefects[index], [field]: value } as Defect;
    setDefects(newDefects);
  };

  return (
    <div className="bg-slate-900 border border-slate-700/60 rounded-xl p-3">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-semibold text-slate-200">Defect Details</h2>
        <button
          type="button"
          onClick={addDefect}
          className="flex items-center gap-1.5 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 hover:text-blue-300 h-8 px-2 py-1 rounded-md text-xs font-medium transition-colors border border-blue-500/20"
        >
          <Plus size={14} />
          Add Defect
        </button>
      </div>

      <div className="space-y-2">
        {defects.map((defect, index) => (
          <div key={index} className="grid grid-cols-[3fr_3fr_2fr_auto] gap-x-3 gap-y-2 items-end border-b border-slate-800/50 pb-2 last:border-0 last:pb-0">
            <div className="flex flex-col gap-0.5">
              <label className="text-xs font-medium text-slate-400">Defect Type</label>
              <select
                value={defect.type}
                onChange={(e) => updateDefect(index, "type", e.target.value)}
                className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded h-8 px-2 py-1 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
              >
                <option value="">Select Defect</option>
                <option value="Wrinkle">Wrinkle</option>
                <option value="Long Thread">Long Thread</option>
                <option value="Oil Stain">Oil Stain</option>
                <option value="Loose Stitching">Loose Stitching</option>
                <option value="Broken Stitching">Broken Stitching</option>
                <option value="Wrong Size">Wrong Size</option>
                <option value="Miss Stitching">Miss Stitching</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-0.5">
              <label className="text-xs font-medium text-slate-400">How to Repair</label>
              <input
                type="text"
                value={defect.repair || ""}
                onChange={(e) => updateDefect(index, "repair", e.target.value)}
                placeholder="e.g. Cut, Cleaned"
                className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded h-8 px-2 py-1 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all placeholder:text-slate-600"
              />
            </div>
            
            <div className="flex flex-col gap-0.5">
              <label className="text-xs font-medium text-slate-400">Qty</label>
              <input
                type="number"
                value={defect.qty || ""}
                onChange={(e) => updateDefect(index, "qty", parseInt(e.target.value) || 0)}
                min="0"
                placeholder="0"
                className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded h-8 px-2 py-1 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
              />
            </div>
            
            <div className="pb-0.5">
              <button
                type="button"
                onClick={() => removeDefect(index)}
                className="text-slate-400 hover:text-red-400 hover:bg-red-400/10 h-7 w-7 rounded-md transition-colors flex justify-center items-center"
                title="Delete defect"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {defects.length === 0 && (
          <div className="text-center text-slate-500 text-sm py-2">
            No defects added. Click "Add Defect" to begin.
          </div>
        )}
      </div>
    </div>
  );
}
