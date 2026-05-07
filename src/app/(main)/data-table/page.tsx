"use client";

import { useState, useEffect } from "react";

const columns = [
  "DATE", "QA name", "QA ID", "Shift", "Line", "Time", "Brand", "Model", 
  "Size", "Color", "PO No.", "Item Name", "Production Output", "Qty Checked", 
  "Qty Rejected", "Defect Rate (%)", "Reject Types", "Repair Method", "Action"
];

export default function DataTablePage() {
  const [rows, setRows] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredRows = rows.filter((row) => {
    if (startDate && row.date < startDate) return false;
    if (endDate && row.date > endDate) return false;
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return [
        row.qa_name, row.qa_id, row.brand, row.model, 
        row.po_no, row.item_name, row.rejectTypes, row.repair,
        row.shift, row.line, row.date
      ].some(val => val && String(val).toLowerCase().includes(q));
    }
    return true;
  });

  const fetchInspections = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/inspections/");
      if (res.ok) {
        const data = await res.json();
        
        const flattenedRows: any[] = [];
        data.forEach((inspection: any) => {
          const totalReject = inspection.defects ? inspection.defects.reduce((sum: number, d: any) => sum + d.qty, 0) : 0;
          const defectRate = inspection.qty_check > 0 ? ((totalReject / inspection.qty_check) * 100).toFixed(2) : "0.00";
          
          if (!inspection.defects || inspection.defects.length === 0) {
            flattenedRows.push({
              ...inspection,
              qtyReject: 0,
              defectRate: defectRate,
              rejectTypes: "-",
              repair: "-"
            });
          } else {
            // Flatten agar tiap defect muncul di row terpisah di tabel sesuai mock data awal
            inspection.defects.forEach((defect: any) => {
              flattenedRows.push({
                ...inspection,
                qtyReject: defect.qty,
                defectRate: defectRate, 
                rejectTypes: defect.defect_type,
                repair: defect.repair_method
              });
            });
          }
        });
        
        setRows(flattenedRows);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInspections();
  }, []);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-100">Data Table</h1>
          <p className="text-xs text-slate-500 mt-0.5">All daily defect records</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Date Range Filter */}
          <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 h-[34px]">
            <span className="text-xs text-slate-400">Range:</span>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="bg-transparent text-slate-200 text-xs outline-none w-auto cursor-pointer" style={{ colorScheme: "dark" }} />
            <span className="text-xs text-slate-400">-</span>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="bg-transparent text-slate-200 text-xs outline-none w-auto cursor-pointer" style={{ colorScheme: "dark" }} />
          </div>
          
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search data..."
            className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2 h-[34px] outline-none focus:border-blue-500 transition-all placeholder:text-slate-600 w-44"
          />
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-700/60 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-800/80">
                {columns.map((h) => (
                  <th
                    key={h}
                    className="text-left px-3 py-3 text-slate-400 font-semibold uppercase tracking-wider text-[10px] whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={20} className="px-4 py-8 text-center text-slate-500">
                     Loading data from database...
                  </td>
                </tr>
              ) : filteredRows.length === 0 ? (
                 <tr>
                  <td colSpan={20} className="px-4 py-8 text-center text-slate-500">
                     No data found or no matching records.
                  </td>
                </tr>
              ) : filteredRows.map((row, i) => (
                <tr
                  key={i}
                  className="border-t border-slate-800/60 hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-3 py-2.5 whitespace-nowrap font-mono text-slate-400">{row.date}</td>
                  <td className="px-3 py-2.5 whitespace-nowrap text-slate-300">{row.qa_name}</td>
                  <td className="px-3 py-2.5 whitespace-nowrap font-mono text-blue-400">{row.qa_id}</td>
                  <td className="px-3 py-2.5 whitespace-nowrap text-slate-300 text-center">{row.shift}</td>
                  <td className="px-3 py-2.5 whitespace-nowrap text-slate-300 text-center">{row.line}</td>
                  <td className="px-3 py-2.5 whitespace-nowrap font-mono text-slate-400">{row.time_range}</td>
                  <td className="px-3 py-2.5 whitespace-nowrap text-slate-300">{row.brand}</td>
                  <td className="px-3 py-2.5 whitespace-nowrap text-slate-300">{row.model}</td>
                  <td className="px-3 py-2.5 whitespace-nowrap text-slate-300">{row.size}</td>
                  <td className="px-3 py-2.5 whitespace-nowrap text-slate-300">{row.colour}</td>
                  <td className="px-3 py-2.5 whitespace-nowrap text-slate-300">{row.po_no}</td>
                  <td className="px-3 py-2.5 whitespace-nowrap text-slate-300">{row.item_name}</td>
                  <td className="px-3 py-2.5 whitespace-nowrap text-slate-300 text-center">{row.production_output}</td>
                  <td className="px-3 py-2.5 whitespace-nowrap text-slate-300 text-center">{row.qty_check}</td>
                  <td className="px-3 py-2.5 whitespace-nowrap text-red-400 font-medium text-center">{row.qtyReject}</td>
                  <td className="px-3 py-2.5 whitespace-nowrap text-orange-400 font-medium text-center">{row.defectRate}%</td>
                  <td className="px-3 py-2.5 whitespace-nowrap text-slate-300">{row.rejectTypes}</td>
                  <td className="px-3 py-2.5 whitespace-nowrap text-slate-400">{row.repair}</td>
                  <td className="px-3 py-2.5 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button className="text-blue-400 hover:text-blue-300 transition-colors text-[10px]">Edit</button>
                      <button className="text-red-400 hover:text-red-300 transition-colors text-[10px]">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-800">
          <p className="text-[11px] text-slate-500">
            Showing <span className="text-slate-300">{filteredRows.length > 0 ? "1" : "0"}–{filteredRows.length > 10 ? "10" : filteredRows.length}</span> of{" "}
            <span className="text-slate-300">{filteredRows.length}</span> records
          </p>
          <div className="flex gap-1">
            {["‹", "1", "›"].map((p) => (
               <button
                 key={p}
                 className={`w-7 h-7 rounded text-xs flex items-center justify-center transition-colors
                   ${p === "1"
                     ? "bg-blue-600 text-white"
                     : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200 border border-slate-700 cursor-not-allowed"
                   }`}
               >
                 {p}
               </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
