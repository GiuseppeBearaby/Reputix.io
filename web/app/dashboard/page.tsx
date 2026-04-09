"use client";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../lib/supabase";

type Review = {
  id: string;
  client_id: string | null;
  author_name: string | null;
  rating: number | null;
  text: string | null;
  published_at: string | null;
  sentiment: string | null;
  ai_draft_response: string | null;
  final_response: string | null;
  response_status: string | null;
  created_at: string;
};

type Report = {
  id: string;
  client_id: string | null;
  type: string | null;
  title: string | null;
  data: {
    score?: number;
    summary?: string;
    strengths?: string[];
    weaknesses?: string[];
    recommendations?: string[];
  } | null;
  pdf_url: string | null;
  created_at: string;
};

function scoreColor(s: number) {
  if (s >= 70) return "text-green-600";
  if (s >= 50) return "text-yellow-500";
  return "text-red-500";
}

function scoreBg(s: number) {
  if (s >= 70) return "bg-green-50 border-green-200";
  if (s >= 50) return "bg-yellow-50 border-yellow-200";
  return "bg-red-50 border-red-200";
}

function statusBadge(s: string | null) {
  switch (s) {
    case "posted": return "bg-green-100 text-green-700";
    case "pending_approval": return "bg-yellow-100 text-yellow-700";
    default: return "bg-gray-100 text-gray-500";
  }
}

function stars(n: number | null) {
  const r = n ?? 0;
  return "\u2605".repeat(r) + "\u2606".repeat(5 - r);
}

const IconStar = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>);
const IconChat = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>);
const IconClock = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx={12} cy={12} r={10} /><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>);
const IconChart = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>);
const IconMenu = () => (<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>);

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-200 rounded-xl ${className}`} />;
}

function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-700 to-brand-500 flex items-center justify-center text-white font-extrabold">R</div>
          <span className="font-bold text-lg">Reputix</span>
        </a>
        <div className="hidden sm:flex gap-8 text-sm font-medium text-gray-600">
          <a href="/#features" className="hover:text-brand-700">Features</a>
          <a href="/pricing" className="hover:text-brand-700">Pricing</a>
          <a href="/dashboard" className="text-brand-700 font-semibold">Dashboard</a>
        </div>
        <a href="/onboarding" className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">Start Free Trial</a>
      </div>
    </nav>
  );
}

const tabs = ["Overview", "Reviews", "Reports", "Settings"] as const;
type Tab = (typeof tabs)[number];

function Sidebar({ active, onSelect, open, onClose }: { active: Tab; onSelect: (t: Tab) => void; open: boolean; onClose: () => void }) {
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/30 z-30 sm:hidden" onClick={onClose} />}
      <aside className={`fixed sm:sticky top-[73px] left-0 h-[calc(100vh-73px)] w-56 bg-white border-r border-gray-100 z-40 transition-transform duration-200 ${open ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}`}>
        <div className="p-4 space-y-1">
          {tabs.map((t) => (
            <button key={t} onClick={() => { onSelect(t); onClose(); }} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${active === t ? "bg-brand-50 text-brand-700 font-semibold" : "text-gray-600 hover:bg-gray-50"}`}>{t}</button>
          ))}
        </div>
      </aside>
    </>
  );
}

function Overview({ reviews, reports, loading }: { reviews: Review[]; reports: Report[]; loading: boolean }) {
  const totalReviews = reviews.length;
  const pending = reviews.filter((r) => r.response_status === "pending_approval").length;
  const avgRating = totalReviews > 0 ? (reviews.reduce((a, r) => a + (r.rating ?? 0), 0) / totalReviews).toFixed(1) : "\u2014";
  const lastReport = reports.length > 0 ? reports[0] : null;
  const score = lastReport?.data?.score;
  const cards = [
    { label: "Reputation Score", value: score != null ? score : "\u2014", color: score != null ? scoreColor(score) : "text-gray-400", bg: score != null ? scoreBg(score) : "bg-gray-50 border-gray-200", icon: <IconChart /> },
    { label: "Total Reviews", value: totalReviews, color: "text-gray-900", bg: "bg-white border-gray-100", icon: <IconChat /> },
    { label: "Pending Approval", value: pending, color: pending > 0 ? "text-yellow-600" : "text-gray-900", bg: pending > 0 ? "bg-yellow-50 border-yellow-200" : "bg-white border-gray-100", icon: <IconClock /> },
    { label: "Avg Rating", value: avgRating, color: "text-gray-900", bg: "bg-white border-gray-100", icon: <IconStar /> },
  ];
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Overview</h1>
      <p className="text-gray-500 mt-1 text-sm">Your reputation at a glance</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {cards.map((c) => loading ? (<Skeleton key={c.label} className="h-32" />) : (
          <div key={c.label} className={`rounded-2xl border shadow-sm p-6 ${c.bg} transition-all duration-200`}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">{c.label}</span>
              <span className="text-gray-400">{c.icon}</span>
            </div>
            <div className={`text-3xl font-extrabold mt-3 ${c.color}`}>{c.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewsSection({ reviews, loading, onRefresh }: { reviews: Review[]; loading: boolean; onRefresh: () => void }) {
  const [approving, setApproving] = useState<string | null>(null);
  async function approve(r: Review) {
    setApproving(r.id);
    const { error } = await supabase.from("reviews").update({ response_status: "posted", final_response: r.ai_draft_response }).eq("id", r.id);
    setApproving(null);
    if (!error) onRefresh();
  }
  if (loading) return <div className="space-y-4">{[1,2,3].map((i) => <Skeleton key={i} className="h-28" />)}</div>;
  if (reviews.length === 0) return (
    <div className="text-center py-16">
      <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-4 text-brand-600"><IconChat /></div>
      <h3 className="font-bold text-gray-900 text-lg">No reviews yet</h3>
      <p className="text-gray-500 mt-2 text-sm max-w-sm mx-auto">The Guardian agent will start monitoring your Google reviews automatically.</p>
    </div>
  );
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Reviews</h1>
      <p className="text-gray-500 mt-1 text-sm">{reviews.length} review{reviews.length !== 1 && "s"}</p>
      <div className="mt-6 space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 transition-all duration-200">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-gray-900">{r.author_name ?? "Anonymous"}</span>
                  <span className="text-yellow-500 text-sm tracking-wide">{stars(r.rating)}</span>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusBadge(r.response_status)}`}>{(r.response_status ?? "unknown").replace("_", " ")}</span>
                </div>
                <p className="text-gray-600 mt-2 text-sm line-clamp-3">{r.text ?? ""}</p>
              </div>
            </div>
            {r.response_status === "pending_approval" && r.ai_draft_response && (
              <div className="mt-4 bg-brand-50 border border-brand-100 rounded-xl p-4">
                <p className="text-xs font-bold text-brand-700 mb-2">AI Draft Response</p>
                <p className="text-sm text-gray-700">{r.ai_draft_response}</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => approve(r)} disabled={approving === r.id} className="bg-gradient-to-r from-brand-700 to-brand-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:opacity-90 disabled:opacity-60 transition-all duration-200">{approving === r.id ? "Approving\u2026" : "Approve"}</button>
                  <button className="border border-brand-500 text-brand-700 px-4 py-2 rounded-xl text-sm font-bold hover:bg-brand-50 transition-all duration-200">Edit</button>
                </div>
              </div>
            )}
            {r.response_status === "posted" && r.final_response && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-xs font-bold text-green-700 mb-2">Posted Response</p>
                <p className="text-sm text-gray-700">{r.final_response}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportsSection({ reports, loading }: { reports: Report[]; loading: boolean }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  if (loading) return <div className="space-y-4">{[1,2,3].map((i) => <Skeleton key={i} className="h-24" />)}</div>;
  if (reports.length === 0) return (
    <div className="text-center py-16">
      <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-4 text-brand-600"><IconChart /></div>
      <h3 className="font-bold text-gray-900 text-lg">No reports yet</h3>
      <p className="text-gray-500 mt-2 text-sm max-w-sm mx-auto">Your first weekly digest will arrive on Monday.</p>
    </div>
  );
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Reports</h1>
      <p className="text-gray-500 mt-1 text-sm">{reports.length} report{reports.length !== 1 && "s"}</p>
      <div className="mt-6 space-y-4">
        {reports.map((rep) => {
          const score = rep.data?.score;
          const isOpen = expanded === rep.id;
          return (
            <div key={rep.id} onClick={() => setExpanded(isOpen ? null : rep.id)} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 cursor-pointer hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    {score != null && <span className={`text-2xl font-extrabold ${scoreColor(score)}`}>{score}</span>}
                    <div>
                      <p className="font-semibold text-gray-900">{rep.title ?? rep.type ?? "Report"}</p>
                      <p className="text-xs text-gray-400">{new Date(rep.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {rep.data?.summary && <p className="text-sm text-gray-600 mt-2 line-clamp-2">{rep.data.summary}</p>}
                </div>
                <span className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>{"\u25BE"}</span>
              </div>
              {isOpen && (
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-100 pt-5">
                  {rep.data?.strengths && rep.data.strengths.length > 0 && (
                    <div>
                      <p className="text-xs font-bold text-green-700 mb-2">Strengths</p>
                      <ul className="space-y-1">{rep.data.strengths.map((s, i) => <li key={i} className="text-sm text-gray-700 flex gap-1.5"><span className="text-green-500 font-bold">{"\u2713"}</span> {s}</li>)}</ul>
                    </div>
                  )}
                  {rep.data?.weaknesses && rep.data.weaknesses.length > 0 && (
                    <div>
                      <p className="text-xs font-bold text-red-600 mb-2">Weaknesses</p>
                      <ul className="space-y-1">{rep.data.weaknesses.map((w, i) => <li key={i} className="text-sm text-gray-700 flex gap-1.5"><span className="text-red-500 font-bold">{"\u2717"}</span> {w}</li>)}</ul>
                    </div>
                  )}
                  {rep.data?.recommendations && rep.data.recommendations.length > 0 && (
                    <div>
                      <p className="text-xs font-bold text-brand-700 mb-2">Recommendations</p>
                      <ul className="space-y-1">{rep.data.recommendations.map((r, i) => <li key={i} className="text-sm text-gray-700 flex gap-1.5"><span className="text-brand-500 font-bold">{"\u2192"}</span> {r}</li>)}</ul>
                    </div>
                  )}
                  {rep.pdf_url && (
                    <div className="sm:col-span-3 pt-2">
                      <a href={rep.pdf_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-block border border-brand-500 text-brand-700 px-4 py-2 rounded-xl text-sm font-bold hover:bg-brand-50 transition-all duration-200">Download PDF</a>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Settings() {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Settings</h1>
      <p className="text-gray-500 mt-1 text-sm">Manage your account preferences</p>
      <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5 max-w-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
          <input disabled className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-400" placeholder="Your business name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input disabled className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-400" placeholder="you@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Response Tone</label>
          <select disabled className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-400"><option>Professional</option><option>Friendly</option><option>Casual</option></select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notifications</label>
          <div className="space-y-2">
            {["Email on new negative review", "Weekly digest email", "Monthly report email"].map((n) => (
              <label key={n} className="flex items-center gap-2 text-sm text-gray-500"><input type="checkbox" disabled defaultChecked className="rounded" /> {n}</label>
            ))}
          </div>
        </div>
        <div className="relative group inline-block">
          <button disabled className="bg-gray-200 text-gray-400 px-6 py-3 rounded-xl text-sm font-bold cursor-not-allowed">Save</button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">Coming soon</span>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [tab, setTab] = useState<Tab>("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [revRes, repRes] = await Promise.all([
        supabase.from("reviews").select("*").order("created_at", { ascending: false }),
        supabase.from("reports").select("*").order("created_at", { ascending: false }),
      ]);
      if (revRes.error) throw revRes.error;
      if (repRes.error) throw repRes.error;
      setReviews(revRes.data ?? []);
      setReports(repRes.data ?? []);
    } catch (e: any) {
      setError(e.message ?? "Unable to load data");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => { fetchData(); }, [fetchData]);
  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <div className="flex pt-[73px]">
        <Sidebar active={tab} onSelect={setTab} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 min-w-0 p-4 sm:p-8">
          <button onClick={() => setSidebarOpen(true)} className="sm:hidden mb-4 p-2 rounded-xl hover:bg-gray-100 text-gray-600"><IconMenu /></button>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 flex items-center justify-between">
              <p className="text-sm text-red-700">Unable to load data. Please try again.</p>
              <button onClick={fetchData} className="text-sm font-bold text-red-700 hover:underline">Retry</button>
            </div>
          )}
          {tab === "Overview" && <Overview reviews={reviews} reports={reports} loading={loading} />}
          {tab === "Reviews" && <ReviewsSection reviews={reviews} loading={loading} onRefresh={fetchData} />}
          {tab === "Reports" && <ReportsSection reports={reports} loading={loading} />}
          {tab === "Settings" && <Settings />}
        </main>
      </div>
    </div>
  );
}
