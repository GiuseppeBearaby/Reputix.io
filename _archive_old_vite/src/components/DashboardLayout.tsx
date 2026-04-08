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
  HelpCircle,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-white border-r border-slate-200/60 fixed h-full z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-brand-blue/20">R</div>
          <div>
            <span className="text-xl font-bold text-brand-navy block leading-none">Reputix</span>
            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-[0.2em] mt-1 block">AI Command</span>
          </div>
        </div>

        <nav className="flex-1 px-6 space-y-2 mt-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) => cn(
                "group flex items-center justify-between px-4 py-3.5 rounded-2xl font-semibold transition-all duration-300",
                isActive 
                  ? "bg-brand-blue text-white shadow-xl shadow-brand-blue/25 translate-x-1" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-brand-navy"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} className={cn("transition-transform duration-300 group-hover:scale-110")} />
                <span>{item.label}</span>
              </div>
              {location.pathname === item.path && (
                <motion.div layoutId="active-pill">
                  <ChevronRight size={16} className="opacity-50" />
                </motion.div>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-6 mt-auto">
          <div className="bg-gradient-to-br from-brand-navy to-slate-800 rounded-3xl p-6 space-y-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/10 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-brand-blue/20 transition-colors"></div>
            <div className="relative z-10">
              <p className="text-[10px] font-bold text-brand-blue uppercase tracking-widest mb-1">Growth Plan</p>
              <p className="text-sm font-bold text-white leading-tight mb-4">Unlock advanced AI competitor insights</p>
              <button className="w-full bg-white/10 backdrop-blur-md text-white border border-white/20 py-2.5 rounded-xl text-xs font-bold hover:bg-white/20 transition-all">
                Upgrade Now
              </button>
            </div>
          </div>
          
          <button className="w-full mt-6 flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 font-medium hover:text-brand-red hover:bg-red-50 transition-all">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-navy/40 backdrop-blur-sm z-40 md:hidden" 
            onClick={() => setIsSidebarOpen(false)} 
          />
        )}
      </AnimatePresence>
      
      <aside className={cn(
        "fixed inset-y-0 left-0 w-72 bg-white z-50 transform transition-all duration-500 ease-out md:hidden shadow-2xl",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center text-white font-bold">R</div>
            <span className="text-xl font-bold text-brand-navy">Reputix</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 bg-slate-50 rounded-lg text-slate-400"><X size={20} /></button>
        </div>
        <nav className="px-6 space-y-2 mt-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-4 rounded-2xl font-semibold transition-all",
                isActive ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20" : "text-slate-500 hover:bg-slate-50"
              )}
            >
              <item.icon size={20} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-72 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-6 md:px-10 sticky top-0 z-10">
          <div className="flex items-center gap-6">
            <button className="md:hidden p-2 bg-slate-50 rounded-lg" onClick={() => setIsSidebarOpen(true)}><Menu size={20} /></button>
            <div className="hidden lg:flex items-center gap-3 bg-slate-50 border border-slate-200/60 rounded-2xl px-4 py-2.5 w-80 group focus-within:ring-2 focus-within:ring-brand-blue/20 transition-all">
              <Search size={18} className="text-slate-400 group-focus-within:text-brand-blue transition-colors" />
              <input type="text" placeholder="Search reviews, reports..." className="bg-transparent border-none outline-none text-sm w-full font-medium" />
              <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-slate-200 bg-white text-[10px] font-bold text-slate-400">⌘K</kbd>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <div className="hidden sm:flex items-center gap-2 bg-brand-light-blue/50 text-brand-blue px-4 py-2 rounded-xl text-xs font-bold border border-brand-blue/10">
              <div className="w-2 h-2 bg-brand-blue rounded-full animate-pulse" />
              24 Pending Reviews
            </div>
            
            <div className="h-10 w-[1px] bg-slate-200 mx-2 hidden sm:block" />

            <button className="p-2.5 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors relative group">
              <Bell size={22} />
              <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-brand-red rounded-full border-2 border-white" />
            </button>
            
            <button className="flex items-center gap-3 p-1.5 pr-4 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-200">
              <div className="w-9 h-9 rounded-xl overflow-hidden border-2 border-white shadow-sm">
                <img src="https://i.pravatar.cc/150?u=alsafa" alt="User" className="w-full h-full object-cover" />
              </div>
              <div className="hidden xl:block text-left">
                <p className="text-xs font-bold text-brand-navy leading-none">Al Safa Cafe</p>
                <p className="text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-wider">Jumeirah, Dubai</p>
              </div>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-10 max-w-[1600px] mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
