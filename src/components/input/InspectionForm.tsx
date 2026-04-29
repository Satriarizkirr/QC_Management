"use client";

import { useState } from "react";

// Data dummy untuk mapping QA Name -> QA ID
const QA_DATA = {
  "Budi Santoso": "QA-001",
  "Andi Wijaya": "QA-002",
  "Siti Aminah": "QA-003",
};

interface InspectionFormProps {
  qtyCheck: number;
  setQtyCheck: (value: number) => void;
}

export default function InspectionForm({ qtyCheck, setQtyCheck }: InspectionFormProps) {
  const [qaName, setQaName] = useState("");
  
  // Mencari QA ID berdasarkan pilihan nama
  const qaId = qaName ? QA_DATA[qaName as keyof typeof QA_DATA] : "";

  return (
    <div className="bg-slate-900 border border-slate-700/60 rounded-xl p-3">
      <div className="grid grid-cols-4 gap-x-3 gap-y-2">
        {/* Date */}
        <div className="flex flex-col gap-0.5">
          <label className="text-xs font-medium text-slate-400">Date</label>
          <input name="date" type="date" required className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded h-8 px-2 py-1 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all" />
        </div>

        {/* Time */}
        <div className="flex flex-col gap-0.5">
          <label className="text-xs font-medium text-slate-400">Time</label>
          <input name="time_range" type="text" required placeholder="misal: 06.30-07.30" className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded h-8 px-2 py-1 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all placeholder:text-slate-600" />
        </div>

        {/* QA Name */}
        <div className="flex flex-col gap-0.5">
          <label className="text-xs font-medium text-slate-400">QA Name</label>
          <select 
            name="qa_name"
            value={qaName}
            required
            onChange={(e) => setQaName(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded h-8 px-2 py-1 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
          >
            <option value="">Select QA</option>
            <option value="Budi Santoso">Budi Santoso</option>
            <option value="Andi Wijaya">Andi Wijaya</option>
            <option value="Siti Aminah">Siti Aminah</option>
          </select>
        </div>

        {/* QA ID (Auto) */}
        <div className="flex flex-col gap-0.5">
          <label className="text-xs font-medium text-slate-400">QA ID</label>
          <input 
            name="qa_id"
            type="text" 
            value={qaId} 
            readOnly 
            placeholder="Auto-filled QA ID" 
            className="bg-slate-800/50 border border-slate-700 text-slate-400 text-sm rounded h-8 px-2 py-1 outline-none cursor-not-allowed" 
          />
        </div>

        {/* Shift */}
        <div className="flex flex-col gap-0.5">
          <label className="text-xs font-medium text-slate-400">Shift</label>
          <select name="shift" className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded h-8 px-2 py-1 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all">
            <option value="1">Shift 1</option>
            <option value="2">Shift 2</option>
            <option value="3">Shift 3</option>
          </select>
        </div>

        {/* Line */}
        <div className="flex flex-col gap-0.5">
          <label className="text-xs font-medium text-slate-400">Line</label>
          <select name="line" className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded h-8 px-2 py-1 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all">
            <option value="Line 1">Line 1</option>
            <option value="Line 2">Line 2</option>
          </select>
        </div>

        {/* Brand */}
        <div className="flex flex-col gap-0.5">
          <label className="text-xs font-medium text-slate-400">Brand</label>
          <select name="brand" className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded h-8 px-2 py-1 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all">
            <option value="Tumi">Tumi</option>
            <option value="Lojel">Lojel</option>
          </select>
        </div>

        {/* Model */}
        <div className="flex flex-col gap-0.5">
          <label className="text-xs font-medium text-slate-400">Model</label>
          <input name="model" type="text" placeholder="Enter Model" className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded h-8 px-2 py-1 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all placeholder:text-slate-600" />
        </div>

        {/* Size */}
        <div className="flex flex-col gap-0.5">
          <label className="text-xs font-medium text-slate-400">Size</label>
          <input name="size" type="text" placeholder="Enter Size" className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded h-8 px-2 py-1 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all placeholder:text-slate-600" />
        </div>

        {/* Colour */}
        <div className="flex flex-col gap-0.5">
          <label className="text-xs font-medium text-slate-400">Colour</label>
          <input name="colour" type="text" placeholder="Enter Colour" className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded h-8 px-2 py-1 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all placeholder:text-slate-600" />
        </div>

        {/* PO No */}
        <div className="flex flex-col gap-0.5">
          <label className="text-xs font-medium text-slate-400">PO No</label>
          <input name="po_no" type="text" placeholder="Enter PO Number" className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded h-8 px-2 py-1 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all placeholder:text-slate-600" />
        </div>

        {/* Item Name */}
        <div className="flex flex-col gap-0.5">
          <label className="text-xs font-medium text-slate-400">Item Name</label>
          <input name="item_name" type="text" placeholder="Enter Item Name" className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded h-8 px-2 py-1 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all placeholder:text-slate-600" />
        </div>

        {/* Production Output */}
        <div className="flex flex-col gap-0.5">
          <label className="text-xs font-medium text-slate-400">Production Output</label>
          <input name="production_output" type="number" required placeholder="Enter output" className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded h-8 px-2 py-1 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all placeholder:text-slate-600" />
        </div>

        {/* Qty Check */}
        <div className="flex flex-col gap-0.5">
          <label className="text-xs font-medium text-slate-400">Qty Check</label>
          <input 
            name="qty_check"
            type="number" 
            required
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
