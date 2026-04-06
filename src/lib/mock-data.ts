export const MOCK_USER = {
  businessName: "Al Safa Cafe & Roastery",
  name: "Tariq Mansour",
  email: "tariq@alsafacafe.ae",
  plan: "Growth",
  location: "Jumeirah"
};

export const MOCK_REVIEWS = [
  {
    id: "1",
    author: "Ahmed Al-Maktoum",
    date: "2024-03-20",
    time: "14:30",
    rating: 5,
    title: "Best coffee in Jumeirah",
    text: "The Ethiopian blend is incredible. Fast Wi-Fi and very friendly staff. My favorite spot in Dubai for remote work.",
    sentimentTags: ["Friendly Staff", "Fast Wi-Fi", "Great Coffee"],
    status: "auto-responded",
    aiResponse: "Thank you Ahmed! We're thrilled you enjoyed our Ethiopian blend and found our Wi-Fi perfect for your work. See you again soon at Al Safa!"
  },
  {
    id: "2",
    author: "Sarah Jenkins",
    date: "2024-03-19",
    time: "11:15",
    rating: 2,
    title: "Parking was a nightmare",
    text: "Coffee is good but I spent 20 minutes looking for parking. Also the AC was way too cold inside.",
    sentimentTags: ["Good Coffee", "Parking Issues", "AC Too Cold"],
    status: "pending",
    aiDraftResponse: "Hi Sarah, we're sorry to hear about your experience with parking and the temperature. We're currently working with the building management on parking solutions and have adjusted our AC settings. We'd love to make it up to you on your next visit.",
    resolutionOptions: ["Acknowledge & Apologize", "Offer Recovery Visit", "Request Offline Resolution"]
  },
  {
    id: "3",
    author: "Omar Hassan",
    date: "2024-03-18",
    time: "16:45",
    rating: 4,
    title: "Great atmosphere",
    text: "Love the cozy vibe. The pastries are fresh but they run out of vegan options quickly.",
    sentimentTags: ["Cozy Atmosphere", "Fresh Pastries", "Limited Vegan Options"],
    status: "responded",
    aiResponse: "Thanks Omar! We're glad you like the vibe. We're increasing our vegan pastry production starting next week!"
  },
  {
    id: "4",
    author: "Elena Rodriguez",
    date: "2024-03-17",
    time: "09:00",
    rating: 5,
    title: "Perfect Friday brunch",
    text: "The service was surprisingly fast for a Friday. The staff is always smiling.",
    sentimentTags: ["Fast Service", "Friendly Staff"],
    status: "auto-responded",
    aiResponse: "Happy Friday Elena! So glad our team could make your brunch special. See you next time!"
  },
  {
    id: "5",
    author: "Fatima Al-Zahra",
    date: "2024-03-16",
    time: "13:20",
    rating: 1,
    title: "Disappointing service",
    text: "Waited 30 minutes for a simple latte. Staff seemed overwhelmed and ignored me.",
    sentimentTags: ["Slow Service", "Staff Overwhelmed"],
    status: "escalated",
    aiDraftResponse: "Dear Fatima, please accept our sincerest apologies for the unacceptable wait time. This is not the standard we strive for. Our manager would like to speak with you directly to resolve this.",
    resolutionOptions: ["Manager Call", "Full Refund", "Direct Apology"]
  }
];

export const MOCK_COMPETITORS = [
  { name: "Al Safa Cafe (You)", rating: 4.6, reviews: 342, responseRate: 92, sentimentScore: 88, reviewVelocity: 15 },
  { name: "Nightjar Coffee", rating: 4.8, reviews: 1250, responseRate: 98, sentimentScore: 92, reviewVelocity: 45 },
  { name: "Boon Coffee", rating: 4.5, reviews: 890, responseRate: 75, sentimentScore: 82, reviewVelocity: 20 },
  { name: "Tom & Serg", rating: 4.4, reviews: 2100, responseRate: 65, sentimentScore: 78, reviewVelocity: 60 },
  { name: "Stomping Grounds", rating: 4.7, reviews: 1100, responseRate: 85, sentimentScore: 85, reviewVelocity: 30 }
];

export const MOCK_ALERTS = [
  { type: "negative-review", message: "New 1-star review from Fatima Al-Zahra", timestamp: "2h ago", severity: "critical" },
  { type: "rate-drop", message: "Response rate dropped below 95%", timestamp: "5h ago", severity: "warning" },
  { type: "competitor", message: "Nightjar Coffee just reached 4.8 stars", timestamp: "1d ago", severity: "info" },
  { type: "system", message: "Weekly report for March 11-17 is ready", timestamp: "2d ago", severity: "info" }
];

export const MOCK_SENTIMENT_TREND = Array.from({ length: 30 }, (_, i) => ({
  date: `Mar ${i + 1}`,
  positive: Math.floor(Math.random() * 20) + 10,
  negative: Math.floor(Math.random() * 5),
  neutral: Math.floor(Math.random() * 10)
}));

export const MOCK_RATING_TREND = [
  { month: "Oct", rating: 4.2, reviewCount: 25 },
  { month: "Nov", rating: 4.3, reviewCount: 28 },
  { month: "Dec", rating: 4.3, reviewCount: 35 },
  { month: "Jan", rating: 4.4, reviewCount: 42 },
  { month: "Feb", rating: 4.5, reviewCount: 38 },
  { month: "Mar", rating: 4.6, reviewCount: 45 }
];

export const MOCK_QR_SCANS = [
  { date: "2024-03-20", source: "Table Card", outcome: "Left Review 5.0★", time: "14:22" },
  { date: "2024-03-20", source: "Receipt", outcome: "Private Feedback", time: "13:45" },
  { date: "2024-03-19", source: "Counter", outcome: "No Action", time: "11:10" },
  { date: "2024-03-19", source: "Table Card", outcome: "Left Review 4.0★", time: "09:30" },
  { date: "2024-03-18", source: "Receipt", outcome: "Left Review 5.0★", time: "16:15" }
];

export const MOCK_REPORTS = [
  { title: "Weekly Digest — Mar 18-24, 2024", type: "Weekly", dateGenerated: "2024-03-25", status: "Ready" },
  { title: "Weekly Digest — Mar 11-17, 2024", type: "Weekly", dateGenerated: "2024-03-18", status: "Ready" },
  { title: "Monthly Insights — February 2024", type: "Monthly", dateGenerated: "2024-03-01", status: "Ready" },
  { title: "Weekly Digest — Mar 4-10, 2024", type: "Weekly", dateGenerated: "2024-03-11", status: "Ready" }
];

export const MOCK_REFERRALS = { totalReferrals: 3, converted: 2, monthsEarned: 2 };
