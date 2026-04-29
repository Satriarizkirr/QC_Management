import Topbar from "./Topbar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      {/* ── Main area without Sidebar ── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Topbar */}
        <Topbar />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-slate-950 p-4 md:p-5 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
