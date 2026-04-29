"use client";

import { useState, useEffect } from "react";

const columns = [
  "Date", "Time", "QA Name", "Brand", "Model", "Po.No.", "Item Name", "Output", "Check", "Reject", "Rate (%)"
];

export default function DailyDataTable() {
  const [rows, setRows] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchInspections = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/inspections/");
      if (res.ok) {
        const data = await res.json();
        setRows(data);
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
    <div className="bg-slate-900 border border-slate-700/60 rounded-xl p-3">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-semibold text-slate-200">Today's Inputs</h2>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-700/50">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-800/80 text-slate-400">
            <tr>
              {columns.map((h) => (
                <th key={h} className="px-3 py-2 font-medium whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="px-3 py-4 text-center text-slate-500">
                  Loading data...
                </td>
              </tr>
            ) : rows.map((row, i) => {
              const qtyReject = row.defects ? row.defects.reduce((sum: number, d: any) => sum + d.qty, 0) : 0;
              const defectRate = row.qty_check > 0 ? ((qtyReject / row.qty_check) * 100).toFixed(2) : "0.00";
              return (
                <tr key={i} className="border-t border-slate-800/60 hover:bg-slate-800/40 transition-colors">
                  <td className="px-3 py-2 whitespace-nowrap text-slate-400">{row.date}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-slate-400">{row.time_range}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-slate-300">{row.qa_name}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-slate-300">{row.brand}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-slate-300">{row.model}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-slate-300">{row.po_no}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-slate-300">{row.item_name}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-slate-300 text-center">{row.production_output}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-slate-300 text-center">{row.qty_check}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-red-400 text-center">{qtyReject}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-orange-400 text-center">{defectRate}%</td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-3 py-4 text-center text-slate-500">
                  No data for today.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
