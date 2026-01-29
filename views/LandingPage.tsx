
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  X, Menu, Zap, MessageSquareOff, Layout, Smartphone, Check,
  Dumbbell, Utensils, LineChart, ShieldCheck, Video, Activity,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { Logo, Button } from '../components/Shared';

const PhoneCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: "Workout Protocol",
      icon: <Dumbbell size={12} />,
      color: "bg-blue-600",
      content: (
        <div className="space-y-3">
          <h3 className="font-black text-blue-600 mb-2 uppercase text-[8px] tracking-widest">Training Protocol</h3>
          <div>
            <p className="font-black text-[7px] text-slate-400 uppercase tracking-widest border-b pb-1 mb-2">Monday Push</p>
            <div className="py-2 border-b border-slate-50">
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-[10px] text-slate-800">Bench Press</span>
                <span className="font-black text-blue-600 text-[8px] whitespace-nowrap bg-blue-50 px-1.5 py-0.5 rounded-full">3 x 12</span>
              </div>
              <div className="flex items-center gap-1 text-[7px] font-black text-blue-500 uppercase"><Video size={8}/> Form Video</div>
            </div>
            <div className="py-2">
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-[10px] text-slate-800">Incline DB Fly</span>
                <span className="font-black text-blue-600 text-[8px] whitespace-nowrap bg-blue-50 px-1.5 py-0.5 rounded-full">3 x 15</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Nutrition Plan",
      icon: <Utensils size={12} />,
      color: "bg-emerald-600",
      content: (
        <div className="space-y-3">
          <h3 className="font-black text-emerald-600 mb-2 uppercase text-[8px] tracking-widest">Daily Macros</h3>
          <div className="grid grid-cols-3 gap-1.5 mb-2">
            <div className="bg-emerald-50 p-2 rounded-xl text-center"><p className="text-[10px] font-black text-emerald-700">180g</p><p className="text-[6px] font-bold text-emerald-400 uppercase">Pro</p></div>
            <div className="bg-blue-50 p-2 rounded-xl text-center"><p className="text-[10px] font-black text-blue-700">250g</p><p className="text-[6px] font-bold text-blue-400 uppercase">Cho</p></div>
            <div className="bg-orange-50 p-2 rounded-xl text-center"><p className="text-[10px] font-black text-orange-700">70g</p><p className="text-[6px] font-bold text-orange-400 uppercase">Fat</p></div>
          </div>
          <div>
            <p className="font-black text-[7px] text-slate-400 uppercase tracking-widest border-b pb-1 mb-2">Breakfast</p>
            <div className="p-2 bg-white rounded-xl border border-slate-100 mb-2">
              <div className="flex justify-between items-center"><span className="text-[9px] font-bold">Oats & Whey</span><span className="text-[8px] text-slate-400">80g</span></div>
            </div>
            <div className="p-2 bg-white rounded-xl border border-slate-100">
              <div className="flex justify-between items-center"><span className="text-[9px] font-bold">Whole Eggs</span><span className="text-[8px] text-slate-400">3 large</span></div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Progress Tracking",
      icon: <LineChart size={12} />,
      color: "bg-purple-600",
      content: (
        <div className="space-y-3">
          <h3 className="font-black text-purple-600 mb-2 uppercase text-[8px] tracking-widest">Progress Log</h3>
          <div className="bg-white p-3 rounded-2xl border shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <p className="text-[7px] font-black text-purple-600 uppercase tracking-widest">Oct 12, 2024</p>
              <p className="text-[12px] font-black text-slate-800">84.2kg</p>
            </div>
            <div className="grid grid-cols-4 gap-1 mb-2">
              <div className="bg-slate-50 p-1 rounded-md text-center"><p className="text-[8px] font-black">88</p><p className="text-[5px] font-bold text-slate-400 uppercase">Waist</p></div>
              <div className="bg-slate-50 p-1 rounded-md text-center"><p className="text-[8px] font-black">104</p><p className="text-[5px] font-bold text-slate-400 uppercase">Chest</p></div>
              <div className="bg-slate-50 p-1 rounded-md text-center"><p className="text-[8px] font-black">38</p><p className="text-[5px] font-bold text-slate-400 uppercase">Bic</p></div>
              <div className="bg-slate-50 p-1 rounded-md text-center"><p className="text-[8px] font-black">62</p><p className="text-[5px] font-bold text-slate-400 uppercase">Thigh</p></div>
            </div>
            <p className="text-[7px] text-slate-400 italic">"Feeling strong this week, sleep was better."</p>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative flex flex-col items-center">
      {/* Phone Frame */}
      <div className="relative mx-auto border-gray-900 bg-gray-900 border-[12px] rounded-[2.5rem] h-[580px] w-[280px] shadow-2xl overflow-hidden ring-4 ring-slate-100">
        <div className="h-[24px] w-[2px] bg-gray-800 absolute -left-[14px] top-[70px] rounded-l-lg"></div>
        <div className="h-[40px] w-[2px] bg-gray-800 absolute -left-[14px] top-[115px] rounded-l-lg"></div>
        <div className="h-[40px] w-[2px] bg-gray-800 absolute -left-[14px] top-[165px] rounded-l-lg"></div>
        <div className="h-[60px] w-[2px] bg-gray-800 absolute -right-[14px] top-[135px] rounded-r-lg"></div>
        
        <div className="rounded-[1.8rem] overflow-hidden w-full h-full bg-slate-50 flex flex-col">
          {/* App Header */}
          <div className="bg-white p-4 border-b flex justify-between items-center px-4 pt-6">
            <div className="bg-blue-600 w-5 h-5 rounded-full flex items-center justify-center">
               <Activity size={10} className="text-white" />
            </div>
            <span className="text-[7px] font-black uppercase text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full tracking-wider">Client View</span>
          </div>

          <div className="p-4 space-y-4 flex-1">
            {/* Greeting */}
            <div className="bg-blue-600 rounded-2xl p-4 text-white shadow-md mb-2">
              <h2 className="text-lg font-black leading-tight">Hey, Alex 👋</h2>
              <p className="text-[8px] opacity-70 mb-3 uppercase tracking-widest font-bold">Your journey matters</p>
              <div className="w-full py-1.5 bg-white text-blue-600 rounded-lg font-black uppercase tracking-widest text-[7px] text-center">Weekly Check-In</div>
            </div>

            {/* Content Area with simple fade transition */}
            <div className="transition-all duration-500 transform">
              {slides[activeSlide].content}
            </div>
          </div>

          {/* Nav Icons Placeholder */}
          <div className="bg-white p-3 border-t flex justify-around items-center">
            {slides.map((s, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSlide === i ? 'bg-blue-600 w-4' : 'bg-slate-200'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Slide Indicators for external control/feedback */}
      <div className="mt-8 flex gap-4">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
              activeSlide === index ? 'bg-blue-600 text-white scale-105 shadow-lg shadow-blue-200' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
            }`}
          >
            {slide.icon} {slide.title}
          </button>
        ))}
      </div>
    </div>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-white min-h-screen text-gray-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b z-[100] px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Logo size="sm" />
          <div className="text-xl font-black text-slate-800 tracking-tighter">Fytwiz</div>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo('problem')} className="text-sm font-semibold hover:text-blue-600 transition-colors">The Problem</button>
          <button onClick={() => scrollTo('solution')} className="text-sm font-semibold hover:text-blue-600 transition-colors">The Solution</button>
          <button onClick={() => scrollTo('features')} className="text-sm font-semibold hover:text-blue-600 transition-colors">Features</button>
          <Button onClick={() => navigate('/auth')} variant="outline" className="text-xs py-1.5 px-4 rounded-full">Coach Login</Button>
        </div>
        <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-[90] flex flex-col items-center justify-center gap-8 p-6 md:hidden">
          <button onClick={() => scrollTo('problem')} className="text-2xl font-black">The Problem</button>
          <button onClick={() => scrollTo('solution')} className="text-2xl font-black">The Solution</button>
          <button onClick={() => scrollTo('features')} className="text-2xl font-black">Features</button>
          <Button onClick={() => navigate('/auth')} className="w-full text-xl py-4">Coach Login</Button>
          <button onClick={() => setIsMenuOpen(false)} className="p-4 rounded-full bg-slate-100 mt-4"><X /></button>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 max-w-6xl mx-auto text-center">
        <div className="inline-block bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 flex items-center gap-2 mx-auto w-fit">
          <Zap size={12} /> Built for Professional Coaches
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
          Ditch the Spreadsheets.<br />
          <span className="text-blue-600">Coach with Clarity.</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          The all-in-one hub for health coaches to manage athletes, build macro-perfect plans, and track real progress without the PDF friction.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => navigate('/auth')} className="px-10 py-4 text-lg">Start Coaching Now</Button>
          <Button variant="outline" onClick={() => scrollTo('solution')} className="px-10 py-4 text-lg">See the Solution</Button>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-24 bg-slate-50 px-6 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-center mb-16 text-slate-900">The "Coach Chaos" is over.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
              <MessageSquareOff className="text-red-500 mx-auto mb-6" size={40} />
              <h3 className="text-xl font-bold mb-3">WhatsApp Fatigue</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Client check-ins getting lost in personal chats. Hard to refer back to previous wins.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
              <Layout className="text-blue-500 mx-auto mb-6" size={40} />
              <h3 className="text-xl font-bold mb-3">PDF Staticity</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Updating a diet means sending yet another file. Static PDFs don't track adherence.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
              <Smartphone className="text-green-500 mx-auto mb-6" size={40} />
              <h3 className="text-xl font-bold mb-3">Spreadsheet Mess</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Clients hate zooming in on tiny cells on their phones. It's time for a mobile-first UI.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Overview - Reordered for Vertical Flow */}
      <section id="solution" className="py-24 px-6 overflow-hidden scroll-mt-20">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-block bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
            The Fytwiz Solution
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight text-slate-900">
            One Dashboard, Infinite Clarity.
          </h2>
          <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-2xl mx-auto">
            Stop juggling multiple apps. Fytwiz brings workout protocols, dietary regimes, and client check-ins into a unified dashboard that works perfectly on any device.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-3xl mx-auto">
            <div className="flex flex-col items-center gap-3 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center"><Check size={18}/></div>
              <span className="font-bold text-slate-700 text-sm">Unified Dashboard</span>
            </div>
            <div className="flex flex-col items-center gap-3 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center"><Check size={18}/></div>
              <span className="font-bold text-slate-700 text-sm">Real-time Updates</span>
            </div>
            <div className="flex flex-col items-center gap-3 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center"><Check size={18}/></div>
              <span className="font-bold text-slate-700 text-sm">Magic Link Access</span>
            </div>
          </div>

          {/* Animated Carousel directly following text */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full scale-150 -z-10"></div>
            <PhoneCarousel />
          </div>
        </div>
      </section>

      {/* Features Grid - 2x2 Reverted Version */}
      <section id="features" className="py-24 bg-slate-900 text-white px-6 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Features for the Modern Coach</h2>
            <p className="text-white/50 font-medium uppercase tracking-widest text-[10px]">Everything you need to scale.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-colors group">
              <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Dumbbell className="text-blue-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Workout Builder</h3>
              <p className="text-white/50 text-base leading-relaxed">
                Design custom routines with sets, reps, and direct video form links. Your clients see exactly what to do, how to do it.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-colors group">
              <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Utensils className="text-emerald-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Meal Planner</h3>
              <p className="text-white/50 text-base leading-relaxed">
                Build meal plans with macro breakdowns. Clients get a beautiful interface to follow their daily nutrition targets.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-colors group">
              <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <LineChart className="text-purple-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Progress Tracking</h3>
              <p className="text-white/50 text-base leading-relaxed">
                Visualize weight and body measurement trends. Automatic weekly check-ins keep clients accountable and data-driven.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-colors group">
              <div className="w-14 h-14 bg-orange-500/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <ShieldCheck className="text-orange-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">No Login Required</h3>
              <p className="text-white/50 text-base leading-relaxed">
                Athletes access their personalized dashboard via a unique magic link. No apps to install or passwords to remember.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-16 border-t px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <Logo size="sm" />
              <div className="text-xl font-black">Fytwiz</div>
            </div>
            <p className="text-slate-400 text-sm font-bold">© 2024 Fytwiz. Precision coaching for pros.</p>
          </div>
          <div className="flex gap-8">
            <Link to="/privacy" className="text-xs font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors">Privacy Policy</Link>
            <button onClick={() => scrollTo('features')} className="text-xs font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors">Features</button>
            <button onClick={() => navigate('/auth')} className="text-xs font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors">Coach Portal</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
