"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Table2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Data Table",
    href: "/data-table",
    icon: Table2,
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`
        sidebar-transition relative flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-700/60
        h-screen overflow-hidden shrink-0 z-30 transition-colors duration-200
        ${collapsed ? "w-[64px]" : "w-[240px]"}
      `}
    >
      {/* ── Logo / Brand ── */}
      <div
        className={`
          flex items-center gap-3 px-4 h-14 border-b border-slate-200/80 dark:border-slate-700/60 shrink-0
          ${collapsed ? "justify-center px-0" : ""}
        `}
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white overflow-hidden shrink-0 border border-slate-100 dark:border-slate-800 shadow-sm">
          <img
            src="/logo.png"
            alt="Universal Luggage Logo"
            className="w-full h-full object-contain p-0.5"
          />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-slate-900 dark:text-white font-bold text-xs leading-tight whitespace-nowrap tracking-tight">
              Universal Luggage
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-[10px] leading-tight whitespace-nowrap tracking-wider">
              Indonesia
            </p>
          </div>
        )}
      </div>

      {/* ── Navigation ── */}
      <nav className="flex flex-col gap-1 px-2 pt-4 flex-1 overflow-y-auto">
        {!collapsed && (
          <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-2 mb-1">
            Menu
          </p>
        )}

        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={`
                nav-item-hover flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm font-medium transition-colors
                ${collapsed ? "justify-center" : ""}
                ${
                  isActive
                    ? "bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 dark:border-blue-500/30"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 border border-transparent"
                }
              `}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span className="truncate">{label}</span>}
              {isActive && !collapsed && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Collapse Toggle ── */}
      <div className="shrink-0 border-t border-slate-200/80 dark:border-slate-700/60 p-2">
        <button
          onClick={onToggle}
          className={`
            nav-item-hover w-full flex items-center gap-2 px-2 py-2 rounded-lg transition-colors
            text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 text-sm
            ${collapsed ? "justify-center" : ""}
          `}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          {!collapsed && <span className="text-xs">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
