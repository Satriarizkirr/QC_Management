"use client";

import { Sun, Moon, Bell } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";

export default function Topbar() {
  const { theme, toggleTheme } = useTheme();
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="h-14 shrink-0 flex items-center justify-between px-4 border-b border-slate-200/80 dark:border-b-slate-700/60 bg-white dark:bg-slate-900 z-20 transition-colors duration-200">
      {/* ── Left: Page breadcrumb area ── */}
      <div className="flex items-center gap-2">
        <div className="hidden sm:block">
          <p className="text-xs text-slate-400 dark:text-slate-500">Quality Control</p>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-tight">
            Management System
          </p>
        </div>
      </div>

      {/* ── Right: Actions ── */}
      <div className="flex items-center gap-1">
        {/* Dark mode toggle */}
        <button
          onClick={toggleTheme}
          title={theme === "dark" ? "Switch to Light" : "Switch to Dark"}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen(!notifOpen);
            }}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all relative"
          >
            <Bell size={16} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-900" />
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-10 w-72 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl dark:shadow-2xl overflow-hidden z-50 transition-all">
              <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-700">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Notifications
                </p>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-700/60">
                {[
                  { msg: "3 defects uploaded via Excel", time: "2m ago", dot: "bg-yellow-400" },
                  { msg: "Defect #D-0042 status updated", time: "15m ago", dot: "bg-blue-400" },
                  { msg: "Weekly QC report ready", time: "1h ago", dot: "bg-green-400" },
                ].map((n, i) => (
                  <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors cursor-pointer">
                    <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${n.dot}`} />
                    <div>
                      <p className="text-xs text-slate-700 dark:text-slate-200">{n.msg}</p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-700">
                <button className="text-[11px] text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors">
                  View all notifications →
                </button>
              </div>
            </div>
          )}
        </div>


      </div>
    </header>
  );
}
