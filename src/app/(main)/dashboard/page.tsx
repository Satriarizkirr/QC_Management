"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import {
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  ReferenceLine
} from "recharts";

export default function DashboardPage() {
  const { theme } = useTheme();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Filters
  const [process, setProcess] = useState("sewing");
  const [brand, setBrand] = useState("");
  const [line, setLine] = useState("");
  const [defectType, setDefectType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [topDefects, setTopDefects] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (process) params.append("process", process);
      if (brand) params.append("brand", brand);
      if (line) params.append("line", line);
      if (defectType) params.append("defect_type", defectType);
      if (startDate) params.append("start_date", startDate);
      if (endDate) params.append("end_date", endDate);
      if (topDefects) params.append("top_defects", "true");

      const res = await fetch(`http://localhost:8000/api/dashboard-stats/?${params.toString()}`);
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Failed to fetch dashboard stats", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    setMounted(true);
  }, [brand, line, defectType, startDate, endDate, process, topDefects]);

  if (!mounted) return null;

  if (!data && loading) {
    return <div className="p-10 text-center text-slate-400">Loading Dashboard...</div>;
  }

  const { kpis, pareto, trend, filters } = data || {};

  const trendData = trend || [];
  const maxDefect = trendData.length > 0 ? Math.max(...trendData.map((d: any) => d.defects || 0)) : 100;
  // Sumbu Y kanan (defect) kita kali 4 agar posisi grafik defect selalu berada di bawah tinggi hasil produksi
  const rightAxisMax = Math.max(Math.ceil((maxDefect * 4) / 100) * 100, 1000);

  return (
    <div className="space-y-5">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight font-sans">Quality Dashboard</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Monitor and analyze quality metrics</p>
        </div>

        {/* Process Selector (Sewing / Assembly) */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 p-1 rounded-full border border-slate-200/80 dark:border-slate-800/80 self-start sm:self-auto">
          <button
            onClick={() => { setProcess('sewing'); setBrand(""); setLine(""); setDefectType(""); }}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${process === 'sewing' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            Sewing
          </button>
          <button
            onClick={() => { setProcess('assembling'); setBrand(""); setLine(""); setDefectType(""); }}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${process === 'assembling' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            Assembly
          </button>
        </div>
      </div>

      {/* ── Dedicated Filter Bar ── */}
      <div className="flex flex-wrap items-center justify-end gap-3 bg-white dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-all">
        {/* Brand Filter */}
        <div className="flex flex-col gap-1 min-w-[120px]">
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="text-xs bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 outline-none h-[36px] cursor-pointer hover:border-slate-300 dark:hover:border-slate-600 transition-colors w-full"
          >
            <option value="">All Brands</option>
            {filters?.brands.map((b: string) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Line Filter */}
        <div className="flex flex-col gap-1 min-w-[110px]">
          <select
            value={line}
            onChange={(e) => setLine(e.target.value)}
            className="text-xs bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 outline-none h-[36px] cursor-pointer hover:border-slate-300 dark:hover:border-slate-600 transition-colors w-full"
          >
            <option value="">All Lines</option>
            {filters?.lines?.map((l: string) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        {/* Defect Type Filter */}
        <div className="flex flex-col gap-1 min-w-[130px]">
          <select
            value={defectType}
            onChange={(e) => setDefectType(e.target.value)}
            className="text-xs bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 outline-none h-[36px] cursor-pointer hover:border-slate-300 dark:hover:border-slate-600 transition-colors w-full"
          >
            <option value="">All Defects</option>
            {filters?.defect_types?.map((d: string) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Date Range Filter */}
        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 h-[36px] hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
          <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">Range:</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-transparent text-slate-700 dark:text-slate-300 text-xs outline-none w-auto cursor-pointer font-sans"
            style={{ colorScheme: theme === "dark" ? "dark" : "light" }}
          />
          <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">-</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-transparent text-slate-700 dark:text-slate-300 text-xs outline-none w-auto cursor-pointer font-sans"
            style={{ colorScheme: theme === "dark" ? "dark" : "light" }}
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Top 5 Toggle */}
          <button
            onClick={() => setTopDefects(!topDefects)}
            className={`text-xs px-3 h-[36px] rounded-lg transition-all font-medium flex items-center gap-1.5 border duration-200 ${topDefects ? 'bg-orange-500 text-white border-orange-500 shadow-sm shadow-orange-500/20' : 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'}`}
          >
            <TrendingUp size={12} /> Top 5
          </button>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        {[
          { label: "Total Production", value: kpis?.total_production || 0, icon: Activity, color: "text-blue-400", bg: "bg-blue-500/10" },
          { label: "Total Checked", value: kpis?.total_checked || 0, icon: CheckCircle2, color: "text-green-400", bg: "bg-green-500/10" },
          { label: "Total Defects", value: kpis?.total_defects || 0, icon: AlertTriangle, color: "text-red-400", bg: "bg-red-500/10" },
          { label: "Defect Rate", value: `${kpis?.defect_rate || 0}%`, icon: TrendingUp, color: "text-orange-400", bg: "bg-orange-500/10" },
          { label: "Weekly Rate", value: `${kpis?.weekly_rate || 0}%`, icon: Activity, color: "text-purple-400", bg: "bg-purple-500/10" },
          { label: "Monthly Rate", value: `${kpis?.monthly_rate || 0}%`, icon: Activity, color: "text-pink-400", bg: "bg-pink-500/10" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/60 rounded-xl p-4 flex flex-col gap-3 hover:border-slate-300 dark:hover:border-slate-600 transition-all shadow-sm dark:shadow-none">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${bg}`}>
              <Icon size={18} className={color} />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{value}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 whitespace-nowrap">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
        {/* Pareto Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/60 rounded-xl p-4 shadow-sm dark:shadow-none transition-colors duration-200">
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-4">Pareto Defect Analysis</h2>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height={288}>
              <ComposedChart data={pareto || []} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid stroke={theme === "dark" ? "#334155" : "#cbd5e1"} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke={theme === "dark" ? "#94a3b8" : "#475569"} fontSize={10} angle={-45} textAnchor="end" height={60} />
                <YAxis yAxisId="left" stroke={theme === "dark" ? "#94a3b8" : "#475569"} fontSize={10} />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#fbbf24"
                  fontSize={10}
                  domain={[0, 100]}
                  ticks={[0, 20, 40, 60, 80, 100]}
                  tickFormatter={(val) => `${val}%`}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff", borderColor: theme === "dark" ? "#334155" : "#cbd5e1", fontSize: "12px", borderRadius: "8px", color: theme === "dark" ? "#f8fafc" : "#0f172a" }}
                  itemStyle={{ color: theme === "dark" ? "#e2e8f0" : "#1e293b" }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <ReferenceLine yAxisId="right" y={80} stroke="#f87171" strokeDasharray="3 3" label={{ position: 'right', value: '80%', fill: '#f87171', fontSize: 10 }} />
                <Bar yAxisId="left" dataKey="value" name="Defect Count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="cumulative_percent" name="Cumulative Percentage" stroke="#fbbf24" strokeWidth={2} dot={{ r: 3 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trend Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/60 rounded-xl p-4 shadow-sm dark:shadow-none transition-colors duration-200">
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-4">Daily Production vs Defect Trend</h2>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height={288}>
              <ComposedChart data={trend || []} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid stroke={theme === "dark" ? "#334155" : "#cbd5e1"} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" stroke={theme === "dark" ? "#94a3b8" : "#475569"} fontSize={10} />
                <YAxis yAxisId="left" stroke={theme === "dark" ? "#94a3b8" : "#475569"} fontSize={10} />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#f87171"
                  fontSize={10}
                  domain={[0, rightAxisMax]}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff", borderColor: theme === "dark" ? "#334155" : "#cbd5e1", fontSize: "12px", borderRadius: "8px", color: theme === "dark" ? "#f8fafc" : "#0f172a" }}
                  itemStyle={{ color: theme === "dark" ? "#e2e8f0" : "#1e293b" }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar yAxisId="left" dataKey="checked" name="Qty Checked" fill="#10b981" radius={[4, 4, 0, 0]} barSize={16} />
                <Line yAxisId="right" type="monotone" dataKey="defects" name="Qty Defect" stroke="#f87171" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── Weekly & Monthly Performance ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 pb-8">
        {/* Weekly Trend */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/60 rounded-xl p-4 shadow-sm dark:shadow-none transition-colors duration-200">
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-4">Weekly Defect Performance</h2>
          <div className="w-full h-60">
            <ResponsiveContainer width="100%" height={240}>
              <ComposedChart data={data?.trend_weekly || []} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid stroke={theme === "dark" ? "#334155" : "#cbd5e1"} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke={theme === "dark" ? "#94a3b8" : "#475569"} fontSize={10} />
                <YAxis yAxisId="left" stroke={theme === "dark" ? "#94a3b8" : "#475569"} fontSize={10} />
                <YAxis yAxisId="right" orientation="right" stroke="#a855f7" fontSize={10} tickFormatter={(val) => `${val}%`} />
                <Tooltip
                  contentStyle={{ backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff", borderColor: theme === "dark" ? "#334155" : "#cbd5e1", fontSize: "12px", borderRadius: "8px", color: theme === "dark" ? "#f8fafc" : "#0f172a" }}
                  itemStyle={{ color: theme === "dark" ? "#e2e8f0" : "#1e293b" }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar yAxisId="left" dataKey="defects" name="Total Defects" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={30} />
                <Line yAxisId="right" type="monotone" dataKey="rate" name="Defect Rate %" stroke="#a855f7" strokeWidth={2} dot={{ r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/60 rounded-xl p-4 shadow-sm dark:shadow-none transition-colors duration-200">
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-4">Monthly Defect Performance</h2>
          <div className="w-full h-60">
            <ResponsiveContainer width="100%" height={240}>
              <ComposedChart data={data?.trend_monthly || []} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid stroke={theme === "dark" ? "#334155" : "#cbd5e1"} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke={theme === "dark" ? "#94a3b8" : "#475569"} fontSize={10} />
                <YAxis yAxisId="left" stroke={theme === "dark" ? "#94a3b8" : "#475569"} fontSize={10} />
                <YAxis yAxisId="right" orientation="right" stroke="#ec4899" fontSize={10} tickFormatter={(val) => `${val}%`} />
                <Tooltip
                  contentStyle={{ backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff", borderColor: theme === "dark" ? "#334155" : "#cbd5e1", fontSize: "12px", borderRadius: "8px", color: theme === "dark" ? "#f8fafc" : "#0f172a" }}
                  itemStyle={{ color: theme === "dark" ? "#e2e8f0" : "#1e293b" }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar yAxisId="left" dataKey="defects" name="Total Defects" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={40} />
                <Line yAxisId="right" type="monotone" dataKey="rate" name="Defect Rate %" stroke="#ec4899" strokeWidth={2} dot={{ r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  );
}
