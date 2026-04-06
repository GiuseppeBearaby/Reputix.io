import { useState } from 'react';
import { Star, Filter, RotateCcw, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';
import { MOCK_REVIEWS } from '../lib/mock-data';
import { cn } from '../lib/utils';

export default function ReviewsPage() {
  const [filter, setFilter] = useState('All Reviews');

  const tabs = ['All Reviews', 'Pending', 'Responded', 'Escalated'];

  const filteredReviews = MOCK_REVIEWS.filter(r => {
    if (filter === 'All Reviews') return true;
    if (filter === 'Pending') return r.status === 'pending';
    if (filter === 'Responded') return r.status === 'responded' || r.status === 'auto-responded';
    if (filter === 'Escalated') return r.status === 'escalated';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-brand-navy">Reviews</h1>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Filter size={16} /> Filter
          </button>
          <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      <div className="flex gap-2 p-1 bg-slate-100 rounded-xl w-fit">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-bold transition-all",
              filter === tab ? "bg-white text-brand-blue shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          {filteredReviews.map((review) => (
            <div key={review.id} className="p-6 space-y-4 hover:bg-slate-50/50 transition-colors">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-32 shrink-0 text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <p>{review.date}</p>
                  <p>{review.time}</p>
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200">
                      <img src={`https://i.pravatar.cc/150?u=${review.author}`} alt={review.author} />
                    </div>
                    <div>
                      <p className="font-bold text-brand-navy">{review.author}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Review ID: #{review.id}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            className={cn(i < review.rating ? "fill-brand-yellow text-brand-yellow" : "text-slate-200")} 
                          />
                        ))}
                      </div>
                      <span className="text-sm font-bold text-brand-navy">{review.title}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {review.sentimentTags.map(tag => (
                        <span key={tag} className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                          tag.includes('Slow') || tag.includes('Parking') || tag.includes('AC') ? "bg-brand-light-red text-brand-red" : "bg-brand-light-green text-brand-green"
                        )}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{review.text}</p>
                  </div>

                  {/* Response Section */}
                  {review.status === 'auto-responded' && (
                    <div className="bg-brand-light-green/30 border border-brand-light-green p-4 rounded-xl space-y-2">
                      <div className="flex items-center gap-2 text-brand-green font-bold text-xs">
                        <CheckCircle size={14} /> Auto-responded
                      </div>
                      <p className="text-sm text-slate-600 italic">"{review.aiResponse}"</p>
                    </div>
                  )}

                  {review.status === 'pending' && (
                    <div className="bg-brand-light-blue/30 border border-brand-light-blue p-4 rounded-xl space-y-4">
                      <div className="flex items-center gap-2 text-brand-blue font-bold text-xs uppercase tracking-wider">
                        <MessageSquare size={14} /> Suggested Response
                      </div>
                      <textarea 
                        className="w-full bg-white border border-brand-light-blue rounded-lg p-3 text-sm text-slate-600 outline-none focus:ring-2 focus:ring-brand-blue"
                        defaultValue={review.aiDraftResponse}
                        rows={3}
                      />
                      <div className="space-y-2">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Resolution Options</p>
                        <div className="flex flex-wrap gap-2">
                          {review.resolutionOptions?.map(opt => (
                            <button key={opt} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:border-brand-blue hover:text-brand-blue transition-colors">
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-full md:w-32 flex md:flex-col gap-2">
                  {review.status === 'pending' ? (
                    <>
                      <button className="flex-1 bg-brand-blue text-white py-2 rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors">Approve</button>
                      <button className="flex-1 bg-white border border-slate-200 text-slate-600 py-2 rounded-lg text-sm font-bold hover:bg-slate-50">Edit</button>
                    </>
                  ) : (
                    <button className="flex-1 bg-white border border-slate-200 text-slate-600 py-2 rounded-lg text-sm font-bold hover:bg-slate-50">View Details</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
