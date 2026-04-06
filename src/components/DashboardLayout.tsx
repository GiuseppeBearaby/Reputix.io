import { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Star, 
  TrendingUp, 
  Users, 
  FileText, 
  Settings, 
  Menu, 
  X, 
  Bell, 
  Search, 
  HelpCircle 
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
    { icon: Star, label: 'Reviews', path: '/dashboard/reviews' },
    { icon: TrendingUp, label: 'Competitors', path: '/dashboard/competitors' },
    { icon: Users, label: 'Review Boost', path: '/dashboard/customers' },
    { icon: FileText, label: 'Reports', path: '/dashboard/reports' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 fixed h-full z-20">
        <div className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center text-white font-bold">R</div>
          <span className="text-xl font-bold text-brand-navy">Reputix</span>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all",
                isActive ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20" : "text-slate-500 hover:bg-slate-50"
              )}
            >
              <item.icon size={20} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4">
          <div className="bg-brand-light-blue rounded-2xl p-4 space-y-3">
            <p className="text-xs font-bold text-brand-blue uppercase tracking-wider">Growth Plan</p>
            <p className="text-sm font-bold text-brand-navy">Generate Monthly Report</p>
            <button className="w-full bg-white text-brand-blue py-2 rounded-lg text-xs font-bold shadow-sm hover:bg-slate-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}
      
      <aside className={cn(
        "fixed inset-y-0 left-0 w-64 bg-white z-50 transform transition-transform duration-300 md:hidden",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center text-white font-bold">R</div>
            <span className="text-xl font-bold text-brand-navy">Reputix</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)}><X /></button>
        </div>
        <nav className="px-4 space-y-1 mt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all",
                isActive ? "bg-brand-blue text-white" : "text-slate-500 hover:bg-slate-50"
              )}
            >
              <item.icon size={20} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button className="md:hidden" onClick={() => setIsSidebarOpen(true)}><Menu /></button>
            <div className="hidden sm:flex items-center gap-2 bg-brand-light-blue text-brand-blue px-3 py-1 rounded-full text-xs font-bold">
              24 Pending Reviews
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden lg:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-64">
              <Search size={16} className="text-slate-400" />
              <input type="text" placeholder="Search reviews..." className="bg-transparent border-none outline-none text-sm w-full" />
            </div>
            <div className="relative cursor-pointer">
              <Bell size={20} className="text-slate-500" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-red rounded-full border-2 border-white" />
            </div>
            <HelpCircle size={20} className="text-slate-500 cursor-pointer hidden sm:block" />
            <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 cursor-pointer">
              <img src="https://i.pravatar.cc/150?u=alsafa" alt="User" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
