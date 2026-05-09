"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Filter
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

  return (
    <div className="space-y-5">
      {/* ── Page Header & Filters ── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-100">Quality Dashboard</h1>
          <div className="flex items-center gap-2 mt-2">
            <button 
              onClick={() => { setProcess('sewing'); setBrand(""); setLine(""); setDefectType(""); }}
              className={`px-4 py-1 text-xs font-semibold rounded-full transition-all ${process === 'sewing' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700 hover:text-slate-200'}`}
            >
              SEWING
            </button>
            <button 
              onClick={() => { setProcess('assembling'); setBrand(""); setLine(""); setDefectType(""); }}
              className={`px-4 py-1 text-xs font-semibold rounded-full transition-all ${process === 'assembling' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700 hover:text-slate-200'}`}
            >
              ASSEMBLING
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          {/* Brand Filter */}
          <select 
            value={brand} 
            onChange={(e) => setBrand(e.target.value)}
            className="text-xs bg-slate-800 text-slate-400 border border-slate-700 rounded-lg px-2 py-1.5 outline-none h-[34px] cursor-pointer hover:border-slate-600 transition-colors"
          >
            <option value="">All Brands</option>
            {filters?.brands.map((b: string) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          {/* Line Filter */}
          <select 
            value={line} 
            onChange={(e) => setLine(e.target.value)}
            className="text-xs bg-slate-800 text-slate-400 border border-slate-700 rounded-lg px-2 py-1.5 outline-none h-[34px] cursor-pointer hover:border-slate-600 transition-colors"
          >
            <option value="">All Lines</option>
            {filters?.lines?.map((l: string) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>

          {/* Defect Type Filter */}
          <select 
            value={defectType} 
            onChange={(e) => setDefectType(e.target.value)}
            className="text-xs bg-slate-800 text-slate-400 border border-slate-700 rounded-lg px-2 py-1.5 outline-none h-[34px] cursor-pointer hover:border-slate-600 transition-colors"
          >
            <option value="">All Defects</option>
            {filters?.defect_types?.map((d: string) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          {/* Date Range Filter */}
          <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 h-[34px] hover:border-slate-600 transition-colors">
            <span className="text-xs text-slate-400">Range:</span>
            <input 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-transparent text-slate-200 text-xs outline-none w-auto cursor-pointer" 
              style={{ colorScheme: "dark" }} 
            />
            <span className="text-xs text-slate-400">-</span>
            <input 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-transparent text-slate-200 text-xs outline-none w-auto cursor-pointer" 
              style={{ colorScheme: "dark" }} 
            />
          </div>

          {/* Top 5 Toggle */}
          <button 
            onClick={() => setTopDefects(!topDefects)}
            className={`text-xs px-3 h-[34px] rounded-lg transition-colors font-medium flex items-center gap-1.5 border ${topDefects ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20' : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-600'}`}
          >
            <TrendingUp size={12} /> Top 5
          </button>

          <button onClick={fetchData} className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 h-[34px] rounded-lg transition-colors font-medium flex items-center gap-1.5">
            <Filter size={12} /> Filter
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
          <div key={label} className="bg-slate-900 border border-slate-700/60 rounded-xl p-4 flex flex-col gap-3 hover:border-slate-600 transition-colors">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${bg}`}>
              <Icon size={18} className={color} />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-100">{value}</p>
              <p className="text-xs text-slate-500 mt-0.5 whitespace-nowrap">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
        {/* Pareto Chart */}
        <div className="bg-slate-900 border border-slate-700/60 rounded-xl p-4">
          <h2 className="text-sm font-semibold text-slate-100 mb-4">Pareto Defect Analysis</h2>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height={288}>
              <ComposedChart data={pareto || []} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid stroke="#334155" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} angle={-45} textAnchor="end" height={60} />
                <YAxis yAxisId="left" stroke="#94a3b8" fontSize={10} />
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
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', fontSize: '12px' }}
                  itemStyle={{ color: '#e2e8f0' }}
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
        <div className="bg-slate-900 border border-slate-700/60 rounded-xl p-4">
          <h2 className="text-sm font-semibold text-slate-100 mb-4">Daily Production vs Defect Trend</h2>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height={288}>
              <BarChart data={trend || []} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid stroke="#334155" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={10} />
                <YAxis yAxisId="left" stroke="#94a3b8" fontSize={10} />
                <YAxis yAxisId="right" orientation="right" stroke="#f87171" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', fontSize: '12px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar yAxisId="left" dataKey="checked" name="Qty Checked" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="defects" name="Qty Defect" fill="#f87171" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── Weekly & Monthly Performance ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 pb-8">
        {/* Weekly Trend */}
        <div className="bg-slate-900 border border-slate-700/60 rounded-xl p-4">
          <h2 className="text-sm font-semibold text-slate-100 mb-4">Weekly Defect Performance</h2>
          <div className="w-full h-60">
            <ResponsiveContainer width="100%" height={240}>
              <ComposedChart data={data?.trend_weekly || []} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid stroke="#334155" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} />
                <YAxis yAxisId="left" stroke="#94a3b8" fontSize={10} />
                <YAxis yAxisId="right" orientation="right" stroke="#a855f7" fontSize={10} tickFormatter={(val) => `${val}%`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', fontSize: '12px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar yAxisId="left" dataKey="defects" name="Total Defects" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={30} />
                <Line yAxisId="right" type="monotone" dataKey="rate" name="Defect Rate %" stroke="#a855f7" strokeWidth={2} dot={{ r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-slate-900 border border-slate-700/60 rounded-xl p-4">
          <h2 className="text-sm font-semibold text-slate-100 mb-4">Monthly Defect Performance</h2>
          <div className="w-full h-60">
            <ResponsiveContainer width="100%" height={240}>
              <ComposedChart data={data?.trend_monthly || []} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid stroke="#334155" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} />
                <YAxis yAxisId="left" stroke="#94a3b8" fontSize={10} />
                <YAxis yAxisId="right" orientation="right" stroke="#ec4899" fontSize={10} tickFormatter={(val) => `${val}%`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', fontSize: '12px' }}
                  itemStyle={{ color: '#e2e8f0' }}
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
