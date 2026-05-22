import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState, FormEvent } from "react";
import {
  TrendingUp, LineChart, Users, Radio, ShieldCheck,
  Brain, Signal, BarChart3, Star, Instagram, Facebook, Youtube,
  Phone, Mail, User, MessageCircle, ArrowRight, Sparkles, Award, PlayCircle,
  ChevronLeft, ChevronRight, Send,
} from "lucide-react";

import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.jpg";
import review1 from "@/assets/review-1.jpg";
import review2 from "@/assets/review-2.jpg";
import review3 from "@/assets/review-3.jpg";
import review4 from "@/assets/review-4.jpg";
import review5 from "@/assets/review-5.jpg";
import review6 from "@/assets/review-6.jpg";
import review7 from "@/assets/review-7.jpg";

export const Route = createFileRoute("/")({ component: Index });

const WHATSAPP = "https://chat.whatsapp.com/D6I8I4qKkWx7wCywemDZ0z";
const INSTAGRAM = "https://www.instagram.com/falcontrader183";
const FACEBOOK = "https://www.facebook.com/share/1D4VkFCpMb/";
const YOUTUBE = "https://youtube.com/@falcontraders-q7n";
const PHONE = "03052724783";
const EMAIL = "ahsanak0588@gmail.com";

/* -------------------- Helper: open form CTA -------------------- */
function openJourneyForm() {
  window.dispatchEvent(new CustomEvent("falcon:open-form"));
  setTimeout(() => {
    document.getElementById("journey-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 50);
}

function JourneyCTA({ className = "", children = "Start Your Journey Now" }: { className?: string; children?: React.ReactNode }) {
  return (
    <button
      onClick={openJourneyForm}
      className={`group relative inline-flex items-center gap-2 px-7 py-4 rounded-xl gold-gradient text-black font-bold tracking-wide glow-gold hover:scale-[1.04] hover:shadow-[0_0_60px_rgba(245,197,69,0.55)] transition-all duration-500 ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition" />
    </button>
  );
}

/* -------------------- Count up -------------------- */
function useCountUp(target: number, start: boolean, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setVal(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return val;
}

function Counter({ to, suffix = "+", label }: { to: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setStart(true), { threshold: 0.4 });
    io.observe(el); return () => io.disconnect();
  }, []);
  const v = useCountUp(to, start);
  return (
    <div ref={ref} className="glass rounded-2xl p-7 md:p-9 text-center group hover:glow-gold hover:-translate-y-1 transition-all duration-500">
      <div className="font-display text-4xl md:text-5xl text-gold-gradient">
        {v.toLocaleString()}{suffix}
      </div>
      <div className="mt-2 text-xs md:text-sm text-muted-foreground uppercase tracking-widest">{label}</div>
    </div>
  );
}

/* -------------------- Nav -------------------- */
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    ["About", "#about"], ["Learn", "#courses"], ["Reviews", "#reviews"],
    ["Community", "#community"], ["Contact", "#contact"],
  ] as const;
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-3 md:px-8 mt-3">
        <div className="glass-dark rounded-2xl flex items-center justify-between px-3 md:px-5 py-2.5">
          <a href="#top" className="flex items-center gap-2.5">
            <img src={logo} alt="Falcon Trader logo" className="h-9 w-9 md:h-10 md:w-10 rounded-full ring-2 ring-[#f5c545]/40 object-cover" />
            <span className="font-display text-sm md:text-lg text-gold-gradient">FALCON TRADER</span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm">
            {links.map(([n, h]) => (
              <a key={h} href={h} className="text-foreground/80 hover:text-gold transition relative group">
                {n}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>
          <button onClick={openJourneyForm}
             className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl gold-gradient text-black font-semibold text-sm glow-gold hover:scale-[1.03] transition">
            Start Now <ArrowRight className="h-4 w-4" />
          </button>
          <button className="md:hidden text-foreground p-1.5" onClick={() => setOpen(!open)} aria-label="menu">
            <div className="space-y-1.5"><span className="block w-6 h-0.5 bg-gold" /><span className="block w-6 h-0.5 bg-gold" /><span className="block w-4 h-0.5 bg-gold" /></div>
          </button>
        </div>
        {open && (
          <div className="md:hidden mt-2 glass-dark rounded-2xl p-4 flex flex-col gap-3 text-sm animate-fade-up">
            {links.map(([n, h]) => (<a key={h} href={h} onClick={() => setOpen(false)} className="text-foreground/90 hover:text-gold py-1">{n}</a>))}
            <button onClick={() => { setOpen(false); openJourneyForm(); }} className="px-4 py-2.5 rounded-xl gold-gradient text-black font-semibold text-center">Start Your Journey</button>
          </div>
        )}
      </div>
    </header>
  );
}

/* -------------------- Crypto graph (animated SVG) -------------------- */
function CryptoGraph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 500 280" className={`w-full h-full ${className}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="gFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#34ffb0" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#34ffb0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gStroke" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#f5c545" />
          <stop offset="100%" stopColor="#34ffb0" />
        </linearGradient>
        <filter id="gGlow"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      {/* grid */}
      {[40, 90, 140, 190, 240].map(y => <line key={y} x1="0" x2="500" y1={y} y2={y} stroke="rgba(245,197,69,0.08)" />)}
      {/* area */}
      <path d="M0,220 L40,180 L80,200 L120,150 L160,170 L200,110 L240,140 L280,90 L320,120 L360,70 L400,95 L440,50 L480,75 L500,40 L500,280 L0,280 Z" fill="url(#gFill)" />
      {/* line */}
      <path
        d="M0,220 L40,180 L80,200 L120,150 L160,170 L200,110 L240,140 L280,90 L320,120 L360,70 L400,95 L440,50 L480,75 L500,40"
        fill="none" stroke="url(#gStroke)" strokeWidth="2.5" filter="url(#gGlow)"
        strokeDasharray="1200" strokeDashoffset="1200"
        style={{ animation: "draw 2.8s ease-out 0.3s forwards" }}
      />
      {/* dots */}
      {[[200,110],[280,90],[360,70],[440,50]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="4" fill="#34ffb0" filter="url(#gGlow)" opacity="0">
          <animate attributeName="opacity" from="0" to="1" begin={`${1.5+i*0.3}s`} dur="0.5s" fill="freeze" />
          <animate attributeName="r" values="4;7;4" dur="2s" begin={`${2+i*0.3}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <style>{`@keyframes draw { to { stroke-dashoffset: 0 } }`}</style>
    </svg>
  );
}

/* -------------------- Hero -------------------- */
function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] flex items-center overflow-hidden pt-24 md:pt-28 pb-16 md:pb-20">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover scale-110 blur-md opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070d]/85 via-[#05070d]/70 to-[#05070d]" />
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-[#f5c545]/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-[480px] h-[480px] rounded-full bg-[#34ffb0]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-8 grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center w-full">
        <div className="animate-fade-up text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[10px] md:text-xs uppercase tracking-[0.2em] text-gold">
            <Sparkles className="h-3.5 w-3.5" /> Premium Trading Academy
          </div>
          <h1 className="mt-5 md:mt-6 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] shimmer-text glow-text-gold">
            FALCON<br />TRADER
          </h1>
          <p className="mt-5 md:mt-6 text-base md:text-xl text-foreground/85 max-w-xl mx-auto lg:mx-0">
            <span className="text-neon glow-text-neon font-semibold">Master the Market with Confidence.</span>{" "}
            Learn. Trade. Grow — your journey to financial freedom starts here.
          </p>
          <div className="mt-6 md:mt-8 flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start">
            <JourneyCTA />
            <a href="#courses"
               className="inline-flex items-center gap-2 px-7 py-4 rounded-xl border-2 border-[#34ffb0]/50 text-neon font-semibold hover:bg-[#34ffb0]/10 hover:glow-neon transition">
              Explore Curriculum
            </a>
          </div>
          <div className="mt-8 md:mt-10 flex items-center gap-4 md:gap-6 text-xs text-muted-foreground justify-center lg:justify-start">
            <div className="flex -space-x-2">
              {[review1, review2, review3].map((s,i)=>(<div key={i} className="h-8 w-8 rounded-full ring-2 ring-[#05070d]" style={{background:`url(${s}) center/cover`}} />))}
            </div>
            <div>5,000+ traders growing inside Falcon</div>
          </div>
        </div>

        {/* Right: glowing crypto chart + floating stats — hidden on mobile per spec */}
        <div className="relative hidden lg:block">
          <div className="relative glass-dark rounded-3xl p-5 glow-gold overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-[#34ffb0] animate-pulse" />
                <span className="text-xs uppercase tracking-widest text-neon">BTC / USDT • Live</span>
              </div>
              <span className="font-display text-lg text-gold-gradient">+12.84%</span>
            </div>
            <div className="h-[280px]"><CryptoGraph /></div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              {[["Win Rate","78%","neon"],["R:R","1:3.2","gold"],["Signals","Daily","neon"]].map(([l,v,t])=>(
                <div key={l} className="rounded-xl bg-white/5 border border-white/10 p-2">
                  <div className={`text-[10px] uppercase tracking-widest ${t==="gold"?"text-gold":"text-neon"}`}>{l}</div>
                  <div className="font-display text-sm mt-0.5">{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -top-4 -left-4 glass-dark rounded-xl px-4 py-2.5 animate-float">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold"><TrendingUp className="h-4 w-4"/>Profit</div>
            <div className="font-display text-base mt-0.5">+$24,500</div>
          </div>
          <div className="absolute -bottom-4 -right-4 glass-dark rounded-xl px-4 py-2.5 animate-float" style={{animationDelay:"-3s"}}>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-neon"><Award className="h-4 w-4"/>Students</div>
            <div className="font-display text-base mt-0.5">5,000+</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Section heading -------------------- */
function SectionHeading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-12 md:mb-14 px-2">
      <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-neon">{eyebrow}</div>
      <h2 className="mt-3 font-display text-3xl md:text-5xl text-gold-gradient leading-tight">{title}</h2>
      {sub && <p className="mt-4 text-sm md:text-base text-muted-foreground">{sub}</p>}
      <div className="mt-5 mx-auto w-24 h-px gold-gradient" />
    </div>
  );
}

/* -------------------- About -------------------- */
function About() {
  return (
    <section id="about" className="relative py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading eyebrow="About Us" title="Who We Are" />
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div className="space-y-5 text-foreground/85 leading-relaxed">
            <p className="text-base md:text-lg">
              <span className="text-gold font-semibold">Falcon Trader</span> is a growing trading academy focused on helping beginners and serious traders master crypto markets, market analysis, risk management, and disciplined trading strategies in a professional environment.
            </p>
            <p>We blend institutional concepts with real-time mentorship — turning confusing charts into confident decisions. No noise. No hype. Just disciplined, repeatable trading.</p>
            <div className="flex flex-wrap gap-2.5 pt-2">
              <div className="glass px-4 py-2 rounded-full text-xs md:text-sm flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-neon" /> Risk-first mindset</div>
              <div className="glass px-4 py-2 rounded-full text-xs md:text-sm flex items-center gap-2"><Brain className="h-4 w-4 text-neon" /> Psychology focused</div>
              <div className="glass px-4 py-2 rounded-full text-xs md:text-sm flex items-center gap-2"><LineChart className="h-4 w-4 text-gold" /> Setup-based trading</div>
            </div>
          </div>
          <div className="relative">
            <div className="glass-dark rounded-3xl p-2 glow-gold">
              <img src={heroBg} alt="Trading analytics" className="rounded-2xl w-full aspect-[4/3] object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 hidden sm:block">
              <div className="text-[10px] uppercase tracking-widest text-neon">Mentorship</div>
              <div className="font-display text-2xl text-gold-gradient">Live Daily</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- What You'll Learn (6 pillar cards) -------------------- */
function Courses() {
  const pillars = [
    { i: <LineChart className="h-7 w-7" />, t: "Crypto Trading", d: "From candles to high-probability setups — trade crypto with structure and clarity." },
    { i: <BarChart3 className="h-7 w-7" />, t: "Market Analysis", d: "Read structure, liquidity and bias across timeframes like an institutional trader." },
    { i: <Radio className="h-7 w-7" />, t: "Live Guidance", d: "Real-time mentorship inside live sessions with entries, SL and TP reasoning." },
    { i: <Users className="h-7 w-7" />, t: "Trading Community", d: "Grow alongside 5,000+ active traders sharing setups, charts and feedback daily." },
    { i: <ShieldCheck className="h-7 w-7" />, t: "Risk Management", d: "Protect capital with position sizing, R-multiples and stop-loss discipline." },
    { i: <Brain className="h-7 w-7" />, t: "Trading Discipline", d: "Master fear, greed and FOMO — execute by process, not emotion." },
  ];
  return (
    <section id="courses" className="relative py-20 md:py-32 bg-gradient-to-b from-transparent via-[#0a0f1c]/60 to-transparent">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading eyebrow="Curriculum" title="What You Will Learn" sub="Six luxury pillars that turn beginners into consistent, structured traders." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {pillars.map((c) => (
            <div key={c.t} className="pillar group relative glass-dark rounded-2xl p-6 md:p-7 overflow-hidden hover:-translate-y-2 hover:glow-gold transition-all duration-500">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"
                   style={{ background: "radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(245,197,69,0.18), transparent 40%)" }} />
              <div className="w-14 h-14 rounded-xl gold-gradient text-black flex items-center justify-center group-hover:glow-gold group-hover:scale-110 transition">{c.i}</div>
              <h3 className="mt-5 font-display text-xl text-foreground">{c.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#34ffb0]/5 blur-2xl pointer-events-none" />
            </div>
          ))}
        </div>
        <div className="mt-12 md:mt-14 flex justify-center">
          <JourneyCTA />
        </div>
      </div>
    </section>
  );
}

/* -------------------- Stats -------------------- */
function Stats() {
  return (
    <section className="relative py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeading eyebrow="By The Numbers" title="A Community That Compounds" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Counter to={120} suffix="" label="Active Students" />
          <Counter to={500} suffix="" label="Success Stories" />
          <Counter to={5000} label="Community Members" />
        </div>
      </div>
    </section>
  );
}

/* -------------------- Community + Demo placeholder -------------------- */
function Community() {
  return (
    <section id="community" className="relative py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-8 space-y-10">
        <div className="relative glass-dark rounded-3xl p-8 md:p-16 text-center overflow-hidden">
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[#34ffb0]/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-[#f5c545]/15 blur-3xl" />
          <div className="relative">
            <div className="text-xs uppercase tracking-[0.3em] text-neon">Free Access</div>
            <h2 className="mt-3 font-display text-3xl md:text-5xl text-gold-gradient">Join Our Trading Community</h2>
            <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-xl mx-auto">Daily setups, live discussions and direct mentor access — all inside one WhatsApp group.</p>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
               className="mt-7 md:mt-8 inline-flex items-center gap-3 px-7 py-4 md:px-8 md:py-5 rounded-2xl text-black font-bold text-base md:text-lg animate-pulse-glow hover:scale-[1.03] transition"
               style={{ background: "linear-gradient(135deg,#25D366,#34ffb0)" }}>
              <MessageCircle className="h-5 w-5 md:h-6 md:w-6" /> Join WhatsApp Community
            </a>
          </div>
        </div>

        {/* Demo Video Placeholder */}
        <div className="relative glass-dark rounded-3xl overflow-hidden aspect-video flex items-center justify-center group hover:glow-gold transition duration-500">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#f5c545]/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#34ffb0]/10 blur-3xl" />
          <div className="relative text-center px-6">
            <div className="mx-auto w-20 h-20 md:w-24 md:h-24 rounded-full gold-gradient flex items-center justify-center glow-gold group-hover:scale-110 transition">
              <PlayCircle className="h-10 w-10 md:h-12 md:w-12 text-black" />
            </div>
            <div className="mt-5 font-display text-2xl md:text-3xl text-gold-gradient">Demo Video Coming Soon</div>
            <p className="mt-2 text-xs md:text-sm text-muted-foreground">A preview of Falcon Trader sessions is on its way.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Reviews + Share Your Experience -------------------- */
function Reviews() {
  const imgs = [review1, review2, review3, review4, review5, review6, review7];
  const reviews = [
    { n: "Tamoor", r: 5, t: "The way Falcon takes basics to advance — people charge heavily for this. Truly worthy. Thanks teacher!" },
    { n: "Arif Khan", r: 5, t: "BOS / CHoCH got cleared. Use of Fib along with trend lines made it easy to understand." },
    { n: "Bilal", r: 5, t: "Important class on Bias and Liquidity — when, where and how it forms, all explained clearly." },
    { n: "Nawaz Ali", r: 5, t: "Higher high, higher low, CHoCH, BOS — market structure on higher timeframes cleared completely." },
    { n: "Hammad Gul", r: 5, t: "Bias, liquidity and supply/demand discussed practically. Jazak Allah!" },
    { n: "Kamranullah", r: 5, t: "Daily bias confusion almost cleared — combining technicals & fundamentals is the real edge." },
  ];

  const [idx, setIdx] = useState(0);
  const perView = useRef(1);
  useEffect(() => {
    const update = () => { perView.current = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1; };
    update(); window.addEventListener("resize", update); return () => window.removeEventListener("resize", update);
  }, []);
  const max = reviews.length;
  const next = () => setIdx((i) => (i + 1) % max);
  const prev = () => setIdx((i) => (i - 1 + max) % max);
  useEffect(() => { const t = setInterval(next, 5000); return () => clearInterval(t); }, []);

  return (
    <section id="reviews" className="relative py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading eyebrow="Student Success" title="Real Voices, Real Results" sub="Authentic experiences from inside the Falcon Trader community." />

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-700 ease-out"
                 style={{ transform: `translateX(calc(-${idx} * (100% / var(--pv, 1))))`, ["--pv" as any]: "var(--pv)" }}>
              {reviews.map((q, i) => (
                <div key={i} className="shrink-0 w-full sm:w-1/2 lg:w-1/3 px-2 md:px-3">
                  <div className="glass rounded-2xl p-6 md:p-7 h-full hover:glow-gold transition duration-500">
                    <div className="flex items-center gap-1 text-gold">
                      {Array.from({ length: q.r }).map((_, k) => (<Star key={k} className="h-4 w-4 fill-current" />))}
                    </div>
                    <p className="mt-4 text-sm text-foreground/85 leading-relaxed min-h-[96px]">"{q.t}"</p>
                    <div className="mt-5 flex items-center gap-3">
                      <div className="h-11 w-11 rounded-full gold-gradient text-black font-bold flex items-center justify-center glow-gold">{q.n[0]}</div>
                      <div>
                        <div className="text-sm font-semibold">{q.n}</div>
                        <div className="text-[11px] text-muted-foreground uppercase tracking-widest">Lifetime Student</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <style>{`@media(min-width:640px){.reviews-pv{--pv:2}} @media(min-width:1024px){.reviews-pv{--pv:3}}`}</style>
          <div className="flex justify-center gap-3 mt-7">
            <button onClick={prev} aria-label="Previous" className="glass-dark rounded-full p-2.5 hover:glow-gold transition"><ChevronLeft className="h-5 w-5 text-gold" /></button>
            <div className="flex items-center gap-1.5">
              {reviews.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} aria-label={`Go to ${i+1}`}
                        className={`h-1.5 rounded-full transition-all ${i===idx?"w-7 bg-gold glow-gold":"w-2.5 bg-white/20"}`} />
              ))}
            </div>
            <button onClick={next} aria-label="Next" className="glass-dark rounded-full p-2.5 hover:glow-gold transition"><ChevronRight className="h-5 w-5 text-gold" /></button>
          </div>
        </div>

        {/* Screenshots marquee */}
        <div className="mt-14 text-center text-[10px] md:text-xs uppercase tracking-[0.3em] text-neon mb-5">Screenshots from the community</div>
        <div className="relative overflow-hidden">
          <div className="flex gap-4 md:gap-5 w-max animate-marquee">
            {[...imgs, ...imgs].map((src, i) => (
              <div key={i} className="glass-dark rounded-2xl p-2 shrink-0 hover:scale-[1.02] transition">
                <img src={src} alt={`Student result ${i+1}`} loading="lazy" className="h-[280px] md:h-[360px] w-[160px] md:w-[200px] object-cover rounded-xl" />
              </div>
            ))}
          </div>
        </div>

        {/* Share Your Experience */}
        <ShareExperience />
      </div>
    </section>
  );
}

function ShareExperience() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = encodeURIComponent("Falcon Trader — New Student Review");
    const body = encodeURIComponent(
      `Name: ${f.get("name")}\nRating: ${rating} / 5\n\nReview:\n${f.get("review")}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };
  return (
    <div className="mt-16 md:mt-20 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-neon">Your Voice Matters</div>
        <h3 className="mt-2 font-display text-2xl md:text-3xl text-gold-gradient">Share Your Experience</h3>
      </div>
      <form onSubmit={onSubmit} className="glass-dark rounded-3xl p-6 md:p-8 space-y-5">
        <div className="flex flex-col items-center gap-2">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Your Rating</div>
          <div className="flex gap-1.5">
            {[1,2,3,4,5].map((n) => (
              <button type="button" key={n}
                onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)}
                onClick={() => setRating(n)} aria-label={`Rate ${n} stars`}
                className="transition-transform hover:scale-125">
                <Star className={`h-7 w-7 md:h-8 md:w-8 transition ${(hover||rating)>=n?"text-gold fill-[#f5c545] drop-shadow-[0_0_8px_rgba(245,197,69,0.7)]":"text-white/20"}`} />
              </button>
            ))}
          </div>
        </div>
        <Field icon={<User className="h-4 w-4" />} name="name" label="Your Name" placeholder="John Doe" />
        <label className="block">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Your Review</span>
          <textarea required name="review" rows={4} maxLength={1000} placeholder="Share your trading journey with Falcon…"
            className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#f5c545]/60 focus:glow-gold transition text-foreground placeholder:text-muted-foreground/50" />
        </label>
        <button type="submit" disabled={rating === 0}
          className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl gold-gradient text-black font-bold hover:glow-gold transition disabled:opacity-50 disabled:cursor-not-allowed">
          {sent ? "Opening your email…" : "Submit Review"} <Send className="h-4 w-4" />
        </button>
        {rating === 0 && <p className="text-[11px] text-muted-foreground text-center">Tap a star to rate before submitting.</p>}
      </form>
    </div>
  );
}

/* -------------------- Social -------------------- */
function Social() {
  const items = [
    { i: <Instagram className="h-6 w-6" />, h: INSTAGRAM, n: "Instagram" },
    { i: <Facebook className="h-6 w-6" />, h: FACEBOOK, n: "Facebook" },
    { i: <Youtube className="h-6 w-6" />, h: YOUTUBE, n: "YouTube" },
  ];
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <SectionHeading eyebrow="Stay Connected" title="Follow Falcon Trader" />
        <div className="flex flex-wrap justify-center gap-4 md:gap-5">
          {items.map((s) => (
            <a key={s.n} href={s.h} target="_blank" rel="noopener noreferrer"
               className="group glass rounded-2xl px-6 md:px-7 py-4 md:py-5 flex items-center gap-3 hover:glow-gold hover:-translate-y-1 transition duration-500">
              <span className="text-gold group-hover:text-neon transition group-hover:scale-110 inline-flex">{s.i}</span>
              <span className="font-medium text-sm md:text-base">{s.n}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Contact + Hidden Form -------------------- */
function Contact() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("falcon:open-form", handler);
    return () => window.removeEventListener("falcon:open-form", handler);
  }, []);

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = encodeURIComponent("New Falcon Trader Application");
    const body = encodeURIComponent(
      `Full Name: ${f.get("name")}\nWhatsApp: ${f.get("whatsapp")}\nEmail: ${f.get("email")}\nExperience Level: ${f.get("experience")}\n\nMessage:\n${f.get("message")}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }, []);

  return (
    <section id="contact" className="relative py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeading eyebrow="Get In Touch" title="Connect With Falcon Trader" sub="Contact us through the form section or direct communication." />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="space-y-4">
            <a href={`tel:${PHONE}`} className="glass rounded-2xl p-5 flex items-center gap-4 hover:glow-gold hover:-translate-y-1 transition duration-500">
              <div className="h-12 w-12 rounded-xl gold-gradient text-black flex items-center justify-center"><Phone className="h-5 w-5" /></div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Phone</div>
                <div className="font-display text-lg md:text-xl text-foreground">{PHONE}</div>
              </div>
            </a>
            <a href={`mailto:${EMAIL}`} className="glass rounded-2xl p-5 flex items-center gap-4 hover:glow-gold hover:-translate-y-1 transition duration-500">
              <div className="h-12 w-12 rounded-xl gold-gradient text-black flex items-center justify-center"><Mail className="h-5 w-5" /></div>
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Email</div>
                <div className="font-display text-base md:text-lg text-foreground truncate">{EMAIL}</div>
              </div>
            </a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="glass rounded-2xl p-5 flex items-center gap-4 hover:glow-neon hover:-translate-y-1 transition duration-500">
              <div className="h-12 w-12 rounded-xl flex items-center justify-center text-black" style={{background:"linear-gradient(135deg,#25D366,#34ffb0)"}}><MessageCircle className="h-5 w-5" /></div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Community</div>
                <div className="font-display text-lg md:text-xl text-foreground">WhatsApp Group</div>
              </div>
            </a>

            {!open && (
              <div className="pt-2">
                <JourneyCTA>Open Application Form</JourneyCTA>
              </div>
            )}
          </div>

          <div id="journey-form" className="scroll-mt-24">
            <div className={`transition-all duration-700 ease-out overflow-hidden ${open ? "max-h-[1600px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-4"}`}>
              <form onSubmit={onSubmit} className="glass-dark rounded-3xl p-6 md:p-9 space-y-5 glow-gold">
                <div className="text-center">
                  <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-neon">Begin Your Journey</div>
                  <h3 className="mt-2 font-display text-2xl md:text-3xl text-gold-gradient">Apply Now</h3>
                </div>
                <Field icon={<User className="h-4 w-4" />} name="name" label="Full Name" placeholder="John Doe" />
                <Field icon={<Phone className="h-4 w-4" />} name="whatsapp" label="WhatsApp Number" placeholder="03xx xxxxxxx" />
                <Field icon={<Mail className="h-4 w-4" />} name="email" type="email" label="Email Address" placeholder="you@email.com" />
                <label className="block">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">Experience Level</span>
                  <div className="mt-2 flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus-within:border-[#f5c545]/60 focus-within:glow-gold transition">
                    <span className="text-gold"><BarChart3 className="h-4 w-4" /></span>
                    <select required name="experience" defaultValue=""
                      className="flex-1 bg-transparent outline-none text-foreground appearance-none cursor-pointer">
                      <option value="" disabled className="bg-[#0a0f1c]">Select your level</option>
                      <option value="Beginner" className="bg-[#0a0f1c]">Beginner</option>
                      <option value="Intermediate" className="bg-[#0a0f1c]">Intermediate</option>
                      <option value="Advanced" className="bg-[#0a0f1c]">Advanced</option>
                      <option value="Pro Trader" className="bg-[#0a0f1c]">Pro Trader</option>
                    </select>
                  </div>
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">Message</span>
                  <textarea required name="message" rows={4} maxLength={1000} placeholder="Tell us about your trading goals…"
                    className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#f5c545]/60 focus:glow-gold transition text-foreground placeholder:text-muted-foreground/50" />
                </label>
                <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl gold-gradient text-black font-bold hover:glow-gold hover:scale-[1.02] transition">
                  {status === "sent" ? "Opening your email…" : "Submit Application"} <ArrowRight className="h-5 w-5" />
                </button>
                <p className="text-[11px] text-muted-foreground text-center">Submissions are delivered directly to {EMAIL}.</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ icon, name, label, type = "text", placeholder }: { icon: React.ReactNode; name: string; label: string; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <div className="mt-2 flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus-within:border-[#f5c545]/60 focus-within:glow-gold transition">
        <span className="text-gold">{icon}</span>
        <input required name={name} type={type} placeholder={placeholder}
               maxLength={200}
               className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/50" />
      </div>
    </label>
  );
}

/* -------------------- Footer -------------------- */
function Footer() {
  return (
    <footer className="relative pt-14 pb-10 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col items-center text-center gap-5">
          <img src={logo} alt="Falcon Trader" className="h-16 w-16 rounded-full ring-2 ring-[#f5c545]/40 object-cover glow-gold" />
          <div className="font-display text-2xl text-gold-gradient">FALCON TRADER</div>
          <p className="text-sm text-neon italic glow-text-neon">"Trade Smart. Grow Strong. Stay Consistent."</p>
          <div className="flex gap-4 mt-2">
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-foreground/70 hover:text-gold hover:scale-125 transition"><Instagram className="h-5 w-5" /></a>
            <a href={FACEBOOK} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-foreground/70 hover:text-gold hover:scale-125 transition"><Facebook className="h-5 w-5" /></a>
            <a href={YOUTUBE} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-foreground/70 hover:text-gold hover:scale-125 transition"><Youtube className="h-5 w-5" /></a>
          </div>
          <div className="text-xs text-muted-foreground mt-4">© 2026 Falcon Trader. All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  );
}

/* -------------------- Floating WhatsApp button -------------------- */
function FloatingWhats() {
  return (
    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
       className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full flex items-center justify-center text-black animate-pulse-glow hover:scale-110 transition"
       style={{ background: "linear-gradient(135deg,#25D366,#34ffb0)" }}>
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}

function Index() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      document.querySelectorAll<HTMLElement>(".pillar").forEach((el) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--x", `${e.clientX - r.left}px`);
        el.style.setProperty("--y", `${e.clientY - r.top}px`);
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div className="min-h-screen bg-[#05070d] text-foreground overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <About />
        <Courses />
        <Stats />
        <Community />
        <Reviews />
        <Social />
        <Contact />
      </main>
      <Footer />
      <FloatingWhats />
    </div>
  );
}
