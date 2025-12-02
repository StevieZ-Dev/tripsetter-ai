'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plane, 
  MapPin, 
  Sun, 
  Camera, 
  Loader2, 
  Smartphone, 
  X, 
  Menu, 
  ArrowRight, 
  ChevronRight, 
  User, 
  Calendar, 
  Compass, 
  Luggage,
  Star,
  Heart
} from 'lucide-react';

// --- MOCK DATA GENERATORS (The "Trendsetter" Brain) ---

const generateMockResults = (query: string) => [
  {
    type: 'THE VIBE',
    title: `The Viral ${query.split(' ').pop() || 'Relaxation'} Escape`,
    description: 'The spot everyone is posting about. Aesthetic villas, private beach clubs, and perfect sunset views.',
    price: '$2,800 / person',
    highlights: ['Instagram Spots', 'VIP Access', 'Fine Dining'],
    rating: 5.0,
  },
  {
    type: 'THE ADVENTURE',
    title: `Hidden Gem ${query.split(' ').pop() || 'Explorer'} Route`,
    description: 'Get off the feed. Hiking secret trails, local street food tours, and authentic culture before it gets crowded.',
    price: '$1,200 / person',
    highlights: ['Waterfall Hike', 'Street Food', 'Local Guide'],
    rating: 4.9,
  },
  {
    type: 'THE STEAL',
    title: `Smart Traveler ${query.split(' ').pop() || 'City'} Loop`,
    description: 'Maximize the experience, minimize the cost. Boutique hostels and city passes that feel expensive but aren\'t.',
    price: '$850 / person',
    highlights: ['City Pass', 'Rooftop Bars', 'Hidden Cafes'],
    rating: 4.7,
  },
];

const MOCK_BLOG_POSTS = [
  {
    id: 1,
    title: "10 Spots in Bali Before They Get Ruined",
    excerpt: "The influencers haven't found these yet. Here are the secret beaches where you can still find paradise alone.",
    image: "https://placehold.co/800x400/f43f5e/ffffff?text=Bali+Secrets",
    date: "Nov 25, 2025",
    author: "Tripsetter Team",
    category: "Undiscovered"
  },
  {
    id: 2,
    title: "How to Fly Business Class for $45",
    excerpt: "The exact credit card strategy our editors used to book a $5,000 seat for just the taxes.",
    image: "https://placehold.co/800x400/14b8a6/ffffff?text=Travel+Hacking",
    date: "Nov 22, 2025",
    author: "The Points Guy",
    category: "Hacking"
  },
  {
    id: 3,
    title: "The 'Carry-On Only' Rulebook",
    excerpt: "Never check a bag again. Here is the minimalist gear list that fits 2 weeks of outfits in one bag.",
    image: "https://placehold.co/800x400/f59e0b/ffffff?text=Packing+Guide",
    date: "Nov 20, 2025",
    author: "Minimalist",
    category: "Gear"
  },
];

// --- AD COMPONENTS ---

const AdUnit = ({ format = "horizontal", label = "Sponsor" }) => {
  const isVertical = format === "vertical";
  const isSticky = format === "sticky";
  
  if (isSticky) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-rose-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 p-2 flex justify-center animate-in slide-in-from-bottom-full duration-700">
        <div className="w-full max-w-[728px] h-[90px] bg-rose-50 border border-dashed border-rose-200 rounded flex flex-col items-center justify-center text-rose-600 text-xs">
          <span className="font-bold">FLIGHT DEALS (Sticky)</span>
          <span>Google AdSense 728x90</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gray-50 border border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-400 text-sm font-medium p-2 relative overflow-hidden group ${isVertical ? 'h-[600px] w-full' : 'h-32 w-full my-6'}`}>
      <span className="z-10 font-bold text-gray-500 mb-1">SPONSORED ({label})</span>
      <span className="z-10 text-xs opacity-50">Secure Ad Slot</span>
    </div>
  );
};

// --- LEAD MAGNET MODAL ---

const DownloadModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState('capture'); 
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setStep('download'), 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-rose-900/60 backdrop-blur-sm" 
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden"
          >
            <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-900 bg-gray-100 p-2 rounded-full z-20">
              <X size={20} />
            </button>

            <div className="p-0">
              <div className="bg-gradient-to-br from-rose-500 to-orange-500 p-10 text-center text-white relative overflow-hidden">
                <Plane className="mx-auto mb-4 drop-shadow-xl relative z-10" size={56} />
                <h3 className="text-3xl font-black mb-2 relative z-10">Get the Map 🗺️</h3>
                <p className="text-rose-100 font-medium relative z-10">Unlock the full 3-day itinerary with hotel links and secret spots.</p>
              </div>

              <div className="p-8 bg-white text-gray-900">
                {step === 'capture' ? (
                  <>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Where should we send it?</label>
                        <input 
                          type="email" 
                          required
                          placeholder="traveler@world.com" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-5 py-4 rounded-xl border-2 border-rose-100 focus:border-rose-500 focus:ring-4 focus:ring-rose-50 outline-none transition-all font-medium text-lg text-gray-900"
                        />
                      </div>
                      <button type="submit" className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 rounded-xl transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 text-lg group">
                        Send Itinerary <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </form>
                    <div className="mt-6 flex justify-center gap-4 text-gray-400">
                        <span className="text-xs font-medium">Join 100,000+ Tripsetter Members</span>
                    </div>
                  </>
                ) : (
                  <div className="text-center animate-in fade-in slide-in-from-bottom-8 duration-500">
                    <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Camera size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Bon Voyage! ✈️</h3>
                    <p className="text-gray-500 mb-8 text-sm">
                      We sent the map to <strong>{email}</strong>. Download the app for offline access:
                    </p>
                    <div className="space-y-3">
                      <button className="w-full bg-black text-white py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors font-bold shadow-lg">
                        <span>Download on the <br/><span className="text-xs font-normal">App Store</span></span>
                      </button>
                      <button className="w-full bg-rose-50 text-rose-900 border-2 border-rose-100 py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-rose-100 transition-colors font-bold shadow-lg">
                        <span>Get it on <br/><span className="text-xs font-normal">Google Play</span></span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- BLOG COMPONENTS ---

const BlogCard = ({ post, onClick }: { post: any; onClick: () => void }) => (
  <div 
    onClick={onClick}
    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-rose-100 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col h-full"
  >
    <div className="h-48 overflow-hidden relative bg-rose-50">
      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-rose-600 uppercase tracking-wide shadow-sm">
        {post.category}
      </div>
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-rose-600 transition-colors">{post.title}</h3>
      <p className="text-gray-500 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
      <div className="mt-auto flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-4">
        <span className="flex items-center gap-1"><User size={12}/> {post.author}</span>
        <span className="flex items-center gap-1"><Calendar size={12}/> {post.date}</span>
      </div>
    </div>
  </div>
);

const BlogPostView = ({ post, onBack, onOpenDownload }: { post: any; onBack: () => void; onOpenDownload: () => void }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-rose-600 mb-6">
      <ChevronRight className="rotate-180" size={16} /> Back to Guides
    </button>

    <div className="flex flex-col lg:flex-row gap-12">
      {/* Main Article Content */}
      <article className="flex-1">
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
           <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center font-bold text-rose-600">TS</div>
              <span>By {post.author}</span>
           </div>
           <span>•</span>
           <span>{post.date}</span>
        </div>

        <img src={post.image} alt={post.title} className="w-full h-[400px] object-cover rounded-3xl mb-10 shadow-lg bg-gray-100" />

        <div className="prose prose-lg text-gray-700 max-w-none">
          <p className="lead text-xl text-gray-900 font-medium mb-6">
            Travel isn't about the destination; it's about the feeling. Our Vibe-Based algorithm found the perfect spots that match your energy, not just your budget.
          </p>
          
          <AdUnit label="In-Article Top" />

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. The "Hidden Gem" Strategy</h2>
          <p className="mb-6">
            Stop going where everyone else goes. By analyzing social media trends before they go viral, we identified these 3 locations that are still affordable but offer 5-star experiences.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Top Picks for You</h2>
          <p className="mb-6">
            Based on your vibe check, here are the winners:
          </p>

          {/* Embedded Product Cards */}
          <div className="grid gap-6 my-8 not-prose">
             {generateMockResults("Blog Context").map((trip, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-6 items-center">
                   <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-0.5 rounded">{trip.type}</span>
                        <span className="font-bold text-gray-900">{trip.price}</span>
                      </div>
                      <h4 className="font-bold text-lg mb-1">{trip.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{trip.description}</p>
                      <button className="text-rose-600 font-bold text-sm flex items-center gap-1 hover:underline">
                        Check Availability <ExternalLink size={14}/>
                      </button>
                   </div>
                </div>
             ))}
          </div>

          <AdUnit label="In-Article Middle" />
        </div>

        {/* Article CTA */}
        <div className="bg-rose-900 text-white rounded-2xl p-8 mt-12 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
           <div className="w-20 h-20 bg-rose-500 rounded-2xl flex items-center justify-center shrink-0">
              <Luggage size={32} />
           </div>
           <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">Want the Full Itinerary?</h3>
              <p className="text-rose-100 mb-4">Download the app to access offline maps and flight tracking.</p>
              <button 
                onClick={onOpenDownload}
                className="bg-white text-rose-900 px-6 py-3 rounded-full font-bold hover:bg-rose-50 transition-colors inline-flex items-center gap-2"
              >
                Download App <ArrowRight size={18} />
              </button>
           </div>
        </div>
      </article>

      {/* Sidebar */}
      <aside className="w-full lg:w-80 space-y-8 shrink-0">
         <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-24">
            <h4 className="font-bold text-gray-900 mb-4">Trending Now</h4>
            <div className="space-y-4">
               {[1,2,3].map((_, i) => (
                  <div key={i} className="flex gap-3 group cursor-pointer">
                     <div className="w-16 h-16 bg-gray-100 rounded-lg shrink-0 overflow-hidden">
                        <img src={`https://placehold.co/100x100/f43f5e/ffffff?text=Spot+${i+1}`} className="w-full h-full object-cover"/>
                     </div>
                     <div>
                        <h5 className="text-sm font-bold text-gray-800 leading-tight group-hover:text-rose-600 transition-colors">Why Tulum is Overrated</h5>
                        <span className="text-xs text-gray-400">5 min read</span>
                     </div>
                  </div>
               ))}
            </div>
            
            <div className="my-6 border-t border-gray-100 pt-6">
               <AdUnit format="vertical" label="Sidebar Ad" />
            </div>

            <button 
              onClick={onOpenDownload}
              className="w-full bg-rose-600 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-rose-700 transition-colors"
            >
              Get Tripsetter App
            </button>
         </div>
      </aside>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---

export default function Home() {
  const [view, setView] = useState('HOME'); // HOME, SEARCH_RESULTS, BLOG_LIST, BLOG_POST
  const [activePost, setActivePost] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(!query) return;
    setIsLoading(true);
    setView('SEARCH_RESULTS');
    
    setTimeout(() => {
       setResults(generateMockResults(query));
       setIsLoading(false);
    }, 2000);
  };

  const openBlog = () => setView('BLOG_LIST');
  
  const openPost = (post: any) => {
    setActivePost(post);
    setView('BLOG_POST');
    window.scrollTo(0,0);
  };

  const goHome = () => {
    setView('HOME');
    setQuery('');
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-[#FFF1F2] font-sans text-gray-900 overflow-x-hidden pb-24 selection:bg-rose-200 selection:text-rose-900">
      
      {/* TOP AD BANNER */}
      <div className="bg-rose-600 text-white py-2 text-center text-xs font-bold tracking-widest uppercase">
         Flash Sale: 40% Off Bali Retreats • Ends Tonight
      </div>

      {/* NAVIGATION */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-rose-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={goHome}>
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg border-2 border-white bg-rose-500">
                 {/* Ensure logo.png is in your public folder */}
                 <img src="/logo.png" alt="Tripsetter" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl tracking-tighter leading-none text-rose-900">Trip<span className="text-rose-600">setter</span></span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-rose-500 transition-colors">AI Travel Engine</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <button onClick={openBlog} className={`text-sm font-bold transition-colors ${view.includes('BLOG') ? 'text-rose-600' : 'text-gray-500 hover:text-rose-600'}`}>
                Travel Guides
              </button>
              <button className="text-sm font-bold text-gray-500 hover:text-rose-600 transition-colors">Community</button>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-rose-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-rose-700 transition-all shadow-lg hover:shadow-rose-200 hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Smartphone size={16} /> Get App
              </button>
            </div>

            <div className="flex items-center md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-600">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
           <div className="md:hidden bg-white border-b border-gray-100 p-4 space-y-4">
              <button onClick={() => {openBlog(); setIsMenuOpen(false)}} className="block w-full text-left font-bold text-gray-600 hover:text-rose-600">Guides</button>
              <button onClick={() => setIsModalOpen(true)} className="block w-full bg-rose-600 text-white py-3 rounded-lg font-bold">Get App</button>
           </div>
        )}
      </nav>

      {/* MAIN CONTENT SWITCHER */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* VIEW: HOME */}
        {view === 'HOME' && (
           <div className="flex flex-col items-center animate-in fade-in duration-700">
              <div className="max-w-5xl w-full text-center py-16 md:py-24 relative">
                 
                 <div className="inline-flex items-center gap-2 bg-white border border-rose-100 shadow-sm rounded-full px-4 py-1.5 mb-8">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-rose-800 tracking-wide uppercase">Live Flight Tracking • Global Access</span>
                 </div>
                 
                 <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight mb-8 leading-[1.1]">
                   Don't just travel. <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-orange-500">Set the Trend.</span>
                 </h1>
                 
                 <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
                    Stop scrolling TripAdvisor. Tell us your budget and your vibe. We build the <span className="text-rose-600 font-bold">Perfect Itinerary.</span>
                 </p>
                 
                 {/* Search Box */}
                 <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto group z-10">
                    <div className="absolute -inset-2 bg-gradient-to-r from-rose-400 to-orange-400 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                    <div className="relative flex items-center bg-white rounded-full p-2 shadow-xl border border-gray-100">
                       <div className="pl-4 text-rose-500">
                          <Compass />
                       </div>
                       <input 
                         type="text" 
                         value={query}
                         onChange={(e) => setQuery(e.target.value)}
                         placeholder="e.g. $2k budget, relaxing beach, hate crowds..." 
                         className="w-full px-4 py-4 text-lg font-medium outline-none bg-transparent text-gray-900 placeholder:text-gray-400"
                       />
                       <button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-full font-bold transition-colors shadow-md">
                          Plan It
                       </button>
                    </div>
                 </form>

                 {/* Hero Image */}
                 <div className="mt-20 w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative group">
                    {/* Ensure hero.png is in your public folder */}
                    <img src="/hero.png" alt="Travel" className="w-full object-cover hover:scale-105 transition-transform duration-1000" />
                    
                    {/* Floating HUD Elements */}
                    <div className="absolute bottom-8 right-8 hidden md:block animate-in slide-in-from-right duration-1000">
                        <div className="bg-white/90 backdrop-blur p-4 rounded-2xl shadow-lg flex items-center gap-4">
                            <div className="text-rose-600 bg-rose-100 p-3 rounded-full"><Sun size={24}/></div>
                            <div>
                                <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Weather</div>
                                <div className="text-xl font-black text-gray-900">82°F Sunny</div>
                            </div>
                        </div>
                    </div>
                 </div>
              </div>
              
              <AdUnit label="Home Hero Banner" />

              {/* Latest Blog Posts Section */}
              <div className="w-full mt-24">
                 <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2"><MapPin className="text-rose-500"/> Trending Spots</h2>
                    <button onClick={openBlog} className="text-rose-600 font-bold hover:underline flex items-center gap-1">
                       View All <ArrowRight size={16} />
                    </button>
                 </div>
                 <div className="grid md:grid-cols-3 gap-8">
                    {MOCK_BLOG_POSTS.map(post => (
                       <BlogCard key={post.id} post={post} onClick={() => openPost(post)} />
                    ))}
                 </div>
              </div>
           </div>
        )}

        {/* VIEW: SEARCH RESULTS */}
        {view === 'SEARCH_RESULTS' && (
           <div className="min-h-[60vh]">
              {isLoading ? (
                 <div className="flex flex-col items-center justify-center py-20">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full border-4 border-gray-100 border-t-rose-500 animate-spin"></div>
                        <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-rose-500" size={24} />
                    </div>
                    <h3 className="text-xl font-bold mt-6 text-gray-900 animate-pulse">Finding Flights...</h3>
                    <p className="text-gray-500 text-sm">Scanning 450 Airlines</p>
                 </div>
              ) : (
                 <div className="animate-in fade-in slide-in-from-bottom-8">
                    <div className="flex items-center justify-between mb-8">
                       <h2 className="text-2xl font-black text-gray-900">Trip for: "{query}"</h2>
                       <button onClick={goHome} className="text-gray-500 font-bold hover:text-rose-600">New Trip</button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                       {results.map((trip, i) => (
                          <div key={i} className="bg-white rounded-3xl p-1 border border-rose-100 hover:shadow-xl transition-shadow group h-full flex flex-col">
                             <div className="bg-white rounded-[20px] p-6 h-full flex flex-col relative overflow-hidden">
                                 <div className="flex items-center justify-between mb-6">
                                     <div className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide ${
                                         trip.type === 'THE VIBE' ? 'bg-purple-100 text-purple-600' : 
                                         trip.type === 'THE ADVENTURE' ? 'bg-orange-100 text-orange-600' : 
                                         'bg-green-100 text-green-600'
                                     }`}>
                                         {trip.type}
                                     </div>
                                     <div className="flex items-center gap-1 text-gray-400 font-bold text-sm"><Heart size={14} className="fill-red-500 text-red-500"/> {trip.rating}</div>
                                 </div>

                                 <h3 className="font-bold text-xl text-gray-900 mb-2 leading-tight">{trip.title}</h3>
                                 <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-1">{trip.description}</p>
                                 
                                 <div className="bg-gray-50 rounded-xl p-4 mb-6 flex justify-between items-center">
                                     <div>
                                         <div className="text-[10px] font-bold text-gray-400 uppercase">Est. Cost</div>
                                         <div className="text-lg font-black text-gray-900">{trip.price}</div>
                                     </div>
                                     <div className="text-right">
                                         <div className="text-[10px] font-bold text-gray-400 uppercase">Flights</div>
                                         <div className="text-lg font-black text-green-600">Found</div>
                                     </div>
                                 </div>

                                 <div className="flex flex-wrap gap-2 mb-6">
                                     {trip.highlights.map((t:string) => (
                                         <span key={t} className="text-[10px] bg-rose-50 text-rose-700 px-2 py-1 rounded-md border border-rose-100">{t}</span>
                                     ))}
                                 </div>

                                 <button className="w-full bg-rose-600 text-white py-3 rounded-xl font-bold hover:bg-rose-700 transition-colors shadow-lg shadow-rose-200">
                                     Book Now
                                 </button>
                             </div>
                          </div>
                       ))}
                    </div>
                    <AdUnit label="Search Results Bottom" />
                 </div>
              )}
           </div>
        )}

        {/* VIEW: BLOG LIST */}
        {view === 'BLOG_LIST' && (
           <div className="animate-in fade-in">
              <div className="text-center py-16">
                 <h1 className="text-4xl font-black text-gray-900 mb-4">The Jetset Journal</h1>
                 <p className="text-xl text-gray-500 max-w-2xl mx-auto">Guides, tips, and secret locations from our global network of explorers.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                 {[...MOCK_BLOG_POSTS, ...MOCK_BLOG_POSTS].map((post, i) => (
                    <BlogCard key={i} post={post} onClick={() => openPost(post)} />
                 ))}
              </div>
              <div className="mt-16 text-center">
                 <button className="bg-white border-2 border-gray-200 text-gray-900 px-8 py-3 rounded-full font-bold hover:border-rose-600 hover:text-rose-600 transition-colors">
                    Load More Articles
                 </button>
              </div>
           </div>
        )}

        {/* VIEW: BLOG POST */}
        {view === 'BLOG_POST' && activePost && (
           <BlogPostView 
             post={activePost} 
             onBack={openBlog} 
             onOpenDownload={() => setIsModalOpen(true)} 
           />
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-rose-100 pt-16 pb-32 mt-20">
         <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-6">
               <div className="w-8 h-8 rounded bg-rose-500"></div>
               <span className="font-black text-xl text-rose-900">Tripsetter</span>
            </div>
            <div className="flex gap-8 mb-8 text-sm font-bold text-gray-500">
               <button onClick={openBlog} className="hover:text-rose-600">Destinations</button>
               <button className="hover:text-rose-600">Hotels</button>
               <button onClick={() => setIsModalOpen(true)} className="hover:text-rose-600">App</button>
            </div>
            <p className="text-gray-400 text-sm">© 2025 Tripsetter AI. Intelligent Travel Engine.</p>
         </div>
      </footer>

      {/* STICKY FOOTER AD */}
      <AdUnit format="sticky" />

      {/* LEAD MAGNET MODAL */}
      <DownloadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  );
}