import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState, FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  TrendingUp, LineChart, Users, Radio, ShieldCheck,
  Brain, BarChart3, Instagram, Facebook, Youtube,
  Phone, Mail, User, MessageCircle, ArrowRight, Sparkles, PlayCircle,
  Star, Award, CheckCircle2, Plus, Minus, Trophy, ChevronLeft, ChevronRight, X,
} from "lucide-react";
import result1 from "@/assets/result-1.jpg";
import result2 from "@/assets/result-2.jpg";
import result3 from "@/assets/result-3.jpg";
import result4 from "@/assets/result-4.jpg";
import result5 from "@/assets/result-5.jpg";

import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.jpg";

export const Route = createFileRoute("/")({ component: Index });

/* ============================================================
   EDITABLE CONTENT — change anything here to update the site.
   ============================================================ */
const BRAND = {
  name: "FALCON TRADER",
  tagline: "A Hub To Learn And Grow",
  whatsapp: "https://chat.whatsapp.com/D6I8I4qKkWx7wCywemDZ0z",
  instagram: "https://www.instagram.com/falcontrader183",
  facebook: "https://www.facebook.com/share/1D4VkFCpMb/",
  youtube: "https://youtube.com/@falcontraders-q7n",
  phone: "03052724783",
  email: "ahsanak0588@gmail.com",
  // YouTube embed URL — used when the user clicks the play overlay.
  promoVideoUrl: "https://www.youtube.com/embed/Zzvq7YXtzm0?autoplay=1&rel=0&modestbranding=1&playsinline=1",
  promoVideoThumb: "https://img.youtube.com/vi/Zzvq7YXtzm0/maxresdefault.jpg",
  promoVideoId: "Zzvq7YXtzm0",
};

const HERO = {
  badge: "Premium Trading Academy",
  headline1: "FALCON",
  headline2: "TRADER",
  motivated: "Master the Market with Confidence.",
  sub: "Learn. Trade. Grow — your journey to financial freedom starts here.",
};

const STATS = [
  { value: "6+", label: "Years Experience" },
  { value: "500+", label: "Total Students" },
  { value: "120", label: "Active Students" },
  { value: "5★", label: "Star Community" },
];

const PILLARS = [
  { i: <LineChart className="h-6 w-6" />, t: "Crypto Trading", d: "High-probability setups with structure & clarity." },
  { i: <BarChart3 className="h-6 w-6" />, t: "Market Analysis", d: "Read structure, liquidity and bias like a pro." },
  { i: <Radio className="h-6 w-6" />, t: "Live Guidance", d: "Real-time mentorship inside live sessions." },
  { i: <Users className="h-6 w-6" />, t: "Trading Community", d: "Grow with 5,000+ active traders daily." },
  { i: <ShieldCheck className="h-6 w-6" />, t: "Risk Management", d: "Position sizing, R-multiples & stop-loss discipline." },
  { i: <Brain className="h-6 w-6" />, t: "Trading Discipline", d: "Beat fear, greed & FOMO — execute by process." },
];

const STUDENT_REVIEWS = [
  { name: "Imran", plan: "Lifetime", text: "Joining Falcon Traders changed my trading life completely. I went from random guessing to structured setups. Alhamdulillah I made my first consistent profit within 2 months of joining." },
  { name: "Kamranullah", plan: "Lifetime", text: "Before Falcon Traders I was always losing money. Now I understand market structure, risk management and entries properly. This course literally paid for itself in the first trade." },
  { name: "Ishtiaq Ali", plan: "Lifetime", text: "Sir Ahsan is not just a teacher, he is a mentor who genuinely cares. My mindset towards trading has completely transformed. I now trade with confidence and discipline." },
  { name: "Tamoor", plan: "Lifetime", text: "I tried many courses before but nothing clicked until Falcon Traders. The way technical and fundamental analysis is taught together is something I have never seen anywhere else. Highly recommended." },
  { name: "Nawaz", plan: "Falcon's Elite", text: "Falcon Traders gave me a complete roadmap. From price action to risk management to psychology — everything is covered. I am now consistently profitable and growing my account every month." },
];

const RESULTS = [
  { pair: "FHEUSDT", type: "Long 50X", profit: "+754.38%" },
  { pair: "AIAUSDT", type: "Short 20X", profit: "+327.87%" },
  { pair: "PENGUINUSDT", type: "Long 20X", profit: "+350.38%" },
  { pair: "DOGSUSDT", type: "Swing Long", profit: "Target Hit ✅" },
];

const FAQS = [
  { q: "What will I learn in Falcon Trader?", a: "Market structure, price action, liquidity, risk management, trading psychology, and live setup execution on crypto markets." },
  { q: "Is this for beginners or advanced traders?", a: "Both. The curriculum starts from absolute basics and progresses to advanced institutional concepts — perfect whether you're new or refining your edge." },
  { q: "How do I join the community?", a: "Tap any 'Start Your Journey' button or join the WhatsApp group directly from the floating button on this page." },
  { q: "What platforms do you trade on?", a: "We focus on major crypto exchanges (Binance, Bybit) and teach concepts that apply across any charting platform like TradingView." },
  { q: "Is there a money-back guarantee?", a: "We stand behind our mentorship — message us on WhatsApp to discuss your eligibility and the current refund policy before joining." },
];

/* -------------------- Helpers -------------------- */
function openJourneyForm() {
  window.dispatchEvent(new CustomEvent("falcon:open-form"));
  setTimeout(() => {
    document.getElementById("journey-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 50);
}

function JourneyCTA({ className = "", size = "md", children = "Start Your Journey Now" }: { className?: string; size?: "md" | "lg"; children?: React.ReactNode }) {
  const sizeCls = size === "lg"
    ? "px-9 py-5 md:px-11 md:py-6 text-base md:text-lg"
    : "px-7 py-4 text-sm md:text-base";
  return (
    <button
      onClick={openJourneyForm}
      className={`group relative inline-flex items-center gap-2.5 rounded-2xl gold-gradient text-black font-extrabold tracking-wide animate-pulse-glow hover:scale-[1.04] hover:shadow-[0_0_80px_rgba(245,197,69,0.7)] transition-all duration-500 ${sizeCls} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition" />
    </button>
  );
}

/* -------------------- Nav -------------------- */
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    ["About", "#about"], ["Learn", "#courses"], ["Results", "#results"],
    ["Reviews", "#reviews"], ["FAQ", "#faq"], ["Contact", "#contact"],
  ] as const;
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-3 md:px-8 mt-3">
        <div className="glass-dark rounded-2xl flex items-center justify-between px-3 md:px-5 py-2.5">
          <a href="#top" className="flex items-center gap-2.5">
            <img src={logo} alt="Falcon Trader logo" className="h-9 w-9 md:h-10 md:w-10 rounded-full ring-2 ring-[#f5c545]/40 object-cover" />
            <span className="font-display text-sm md:text-lg text-gold-gradient">{BRAND.name}</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
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

/* -------------------- Hero (single column, promo video slot) -------------------- */
function Hero() {
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = document.getElementById("hero-video-wrap");
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="top" className="relative flex items-center overflow-hidden pt-24 md:pt-28 pb-10 md:pb-14">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover scale-110 blur-md opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070d]/85 via-[#05070d]/70 to-[#05070d]" />
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-[#f5c545]/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-[480px] h-[480px] rounded-full bg-[#34ffb0]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 md:px-8 w-full text-center animate-fade-up">
        <img src={logo} alt="Falcon Trader" className="mx-auto h-16 w-16 md:h-20 md:w-20 rounded-full ring-2 ring-[#f5c545]/50 object-cover glow-gold" />
        <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[10px] md:text-xs uppercase tracking-[0.2em] text-gold">
          <Sparkles className="h-3.5 w-3.5" /> {HERO.badge}
        </div>
        <h1 className="mt-4 md:mt-5 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] shimmer-text glow-text-gold">
          {HERO.headline1}<br />{HERO.headline2}
        </h1>
        <p className="mt-4 md:mt-5 text-base md:text-xl text-foreground/85 max-w-2xl mx-auto">
          <span className="text-neon glow-text-neon font-semibold">{HERO.motivated}</span>{" "}
          {HERO.sub}
        </p>

        {/* Promo video */}
        <div
          id="hero-video-wrap"
          className={`mt-7 md:mt-9 max-w-3xl mx-auto transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="mb-5 md:mb-6">
            <h3 className="font-display text-xl md:text-3xl text-gold-gradient">Watch Falcon Trader In Action</h3>
            <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
              See how our community learns, grows, and trades smarter with Falcon Trader.
            </p>
          </div>
          <div className="relative glass-dark rounded-2xl md:rounded-3xl overflow-hidden aspect-video glow-gold group">
            {playing ? (
              <iframe
                src={BRAND.promoVideoUrl}
                title="Falcon Trader Promo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <>
                <img
                  src={BRAND.promoVideoThumb}
                  alt="Falcon Trader Promo Thumbnail"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#05070d]/40 group-hover:bg-[#05070d]/30 transition" />
                <button
                  onClick={() => {
                    setPlaying(true);
                    supabase.from("video_play_events").insert({
                      video_id: BRAND.promoVideoId,
                      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
                      referrer: typeof document !== "undefined" ? document.referrer : null,
                    }).then(({ error }) => {
                      if (error) console.error("play event error", error);
                    });
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                  aria-label="Play promo video"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full gold-gradient flex items-center justify-center glow-gold group-hover:scale-110 transition duration-300">
                    <PlayCircle className="h-8 w-8 md:h-10 md:w-10 text-black" />
                  </div>
                </button>
              </>
            )}
          </div>
        </div>

        <div className="mt-7 md:mt-9 flex flex-wrap gap-3 md:gap-4 justify-center">
          <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer"
             className="group relative inline-flex items-center gap-2.5 rounded-2xl gold-gradient text-black font-extrabold tracking-wide animate-pulse-glow hover:scale-[1.04] hover:shadow-[0_0_80px_rgba(245,197,69,0.7)] transition-all duration-500 px-9 py-5 md:px-11 md:py-6 text-base md:text-lg">
            <span className="relative z-10">Join Our WhatsApp Community for Free</span>
            <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition" />
          </a>
          <a href="#courses"
             className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl border-2 border-[#34ffb0]/50 text-neon font-semibold hover:bg-[#34ffb0]/10 hover:glow-neon transition">
            Explore Curriculum
          </a>
        </div>

        {/* Community members stats card — matches StatsBar styling */}
        <div className="mt-6 md:mt-8 max-w-md mx-auto">
          <div className="glass-dark rounded-2xl md:rounded-3xl p-5 md:p-8 text-center group">
            <div className="font-display text-3xl md:text-5xl text-gold-gradient group-hover:scale-110 transition">8K+</div>
            <div className="mt-1.5 text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest">Community Members</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Animated Stats Bar -------------------- */
function StatsBar() {
  return (
    <section className="relative -mt-2 md:-mt-4 pb-10 md:pb-16">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="glass-dark rounded-2xl md:rounded-3xl p-5 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((s, i) => (
            <div key={s.label} className="text-center group animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="font-display text-3xl md:text-5xl text-gold-gradient group-hover:scale-110 transition">{s.value}</div>
              <div className="mt-1.5 text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
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
    <section id="about" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeading eyebrow="About Us" title="Who We Are" />
        <div className="glass-dark rounded-3xl p-6 md:p-10 text-center max-w-3xl mx-auto">
          <p className="text-base md:text-lg text-foreground/85 leading-relaxed">
            <span className="text-gold font-semibold">Falcon Trader</span> is a growing trading academy helping beginners and serious traders master crypto markets, analysis, risk management, and disciplined strategies — blending institutional concepts with real-time mentorship.
          </p>
          <div className="flex flex-wrap justify-center gap-2.5 pt-6">
            <div className="glass px-4 py-2 rounded-full text-xs md:text-sm flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-neon" /> Risk-first mindset</div>
            <div className="glass px-4 py-2 rounded-full text-xs md:text-sm flex items-center gap-2"><Brain className="h-4 w-4 text-neon" /> Psychology focused</div>
            <div className="glass px-4 py-2 rounded-full text-xs md:text-sm flex items-center gap-2"><LineChart className="h-4 w-4 text-gold" /> Setup-based trading</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Pillars — 2-col grid (3x2) -------------------- */
function Courses() {
  return (
    <section id="courses" className="relative py-16 md:py-24 bg-gradient-to-b from-transparent via-[#0a0f1c]/60 to-transparent">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <SectionHeading eyebrow="Curriculum" title="What You Will Learn" sub="Six pillars that turn beginners into consistent, structured traders." />
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {PILLARS.map((c) => (
            <div key={c.t}
                 className="group relative bg-[#0a0f1c]/80 backdrop-blur rounded-2xl p-4 md:p-6 border border-[#f5c545]/25 hover:border-[#f5c545]/70 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(245,197,69,0.25)] transition-all duration-500 flex flex-col items-start min-h-[170px] md:min-h-[200px]">
              <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl gold-gradient text-black flex items-center justify-center group-hover:scale-110 transition shrink-0">{c.i}</div>
              <h3 className="mt-3 md:mt-4 font-display text-base md:text-xl text-foreground leading-tight">{c.t}</h3>
              <p className="mt-1.5 text-[11px] md:text-sm text-muted-foreground leading-snug line-clamp-1">{c.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 md:mt-12 flex justify-center">
          <JourneyCTA size="lg" />
        </div>
      </div>
    </section>
  );
}

/* -------------------- Live Trading Results — Auto-Slide Carousel -------------------- */
const RESULT_IMAGES = [result1, result2, result3, result4, result5];

function Results() {
  const [idx, setIdx] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const total = RESULT_IMAGES.length;

  const go = useCallback((n: number) => setIdx((n + total) % total), [total]);

  useEffect(() => {
    if (lightbox) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % total), 2000);
    return () => clearInterval(t);
  }, [total, lightbox]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <section id="results" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeading
          eyebrow="Verified Trades"
          title="Live Trading Results"
          sub="Real performance snapshots from our crypto trading journey."
        />

        <div className="relative max-w-3xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-[#f5c545]/30 glow-gold bg-[#0a0f1c]/80">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${idx * 100}%)` }}
            >
              {RESULT_IMAGES.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLightbox(src)}
                  className="shrink-0 w-full aspect-[4/5] sm:aspect-[16/10] bg-[#05070d] flex items-center justify-center cursor-zoom-in"
                  aria-label={`Open trading result ${i + 1}`}
                >
                  <img
                    src={src}
                    alt={`Trading result ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(idx - 1)}
              aria-label="Previous"
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 h-10 w-10 md:h-12 md:w-12 rounded-full gold-gradient text-black flex items-center justify-center hover:scale-110 transition glow-gold"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
            </button>
            <button
              type="button"
              onClick={() => go(idx + 1)}
              aria-label="Next"
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 h-10 w-10 md:h-12 md:w-12 rounded-full gold-gradient text-black flex items-center justify-center hover:scale-110 transition glow-gold"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          </div>

          <div className="mt-5 flex justify-center gap-2">
            {RESULT_IMAGES.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => go(i)}
                className={`h-2 rounded-full transition-all ${i === idx ? "w-8 gold-gradient glow-gold" : "w-2 bg-white/30 hover:bg-white/60"}`}
              />
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-[11px] md:text-xs text-muted-foreground italic">
          Past results do not guarantee future performance.
        </p>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-up"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute top-4 right-4 h-11 w-11 rounded-full gold-gradient text-black flex items-center justify-center hover:scale-110 transition"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={lightbox}
            alt="Trading result enlarged"
            className="max-h-[90vh] max-w-[95vw] object-contain rounded-2xl border border-[#f5c545]/40 glow-gold"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

/* -------------------- Rate Your Experience -------------------- */
type RatingSubmission = { id?: string; stars: number; text: string; name: string };

function RateExperience() {
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<RatingSubmission[]>([]);

  useEffect(() => {
    let mounted = true;
    supabase
      .from("reviews")
      .select("id,name,rating,message")
      .order("created_at", { ascending: false })
      .limit(100)
      .then(({ data }) => {
        if (!mounted || !data) return;
        setReviews(data.map((r) => ({ id: r.id, stars: r.rating, text: r.message, name: r.name })));
      });

    const channel = supabase
      .channel("reviews-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "reviews" },
        (payload) => {
          const r = payload.new as { id: string; name: string; rating: number; message: string };
          setReviews((prev) =>
            prev.some((x) => x.id === r.id)
              ? prev
              : [{ id: r.id, stars: r.rating, text: r.message, name: r.name }, ...prev],
          );
        },
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const avg = reviews.length
    ? (reviews.reduce((a, r) => a + r.stars, 0) / reviews.length).toFixed(1)
    : "0.0";

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stars || !text.trim() || !name.trim() || submitting) return;
    setSubmitting(true);
    setError(null);
    const { data, error: insertError } = await supabase
      .from("reviews")
      .insert({ name: name.trim(), rating: stars, message: text.trim() })
      .select("id,name,rating,message")
      .single();
    setSubmitting(false);
    if (insertError) {
      setError("Could not submit review. Please try again.");
      return;
    }
    if (data) {
      setReviews((p) =>
        p.some((x) => x.id === data.id)
          ? p
          : [{ id: data.id, stars: data.rating, text: data.message, name: data.name }, ...p],
      );
    }
    setStars(0); setHover(0); setText(""); setName("");
  };


  return (
    <section id="rate" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <SectionHeading eyebrow="Your Voice Matters" title="Rate Your Experience" />

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 glass-dark rounded-2xl px-6 py-4 glow-gold">
            <div className="flex gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <div className="font-display text-xl md:text-2xl text-gold-gradient">{avg} / 5</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              based on {reviews.length} review{reviews.length === 1 ? "" : "s"}
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="glass-dark rounded-3xl p-6 md:p-9 space-y-5 max-w-2xl mx-auto border border-[#f5c545]/30">
          <div className="text-center">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Your Rating</div>
            <div className="flex justify-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => {
                const v = i + 1;
                const active = (hover || stars) >= v;
                return (
                  <button
                    key={v}
                    type="button"
                    onMouseEnter={() => setHover(v)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setStars(v)}
                    aria-label={`${v} star${v === 1 ? "" : "s"}`}
                    className="p-1 transition-transform hover:scale-125"
                  >
                    <Star className={`h-8 w-8 md:h-10 md:w-10 transition ${active ? "text-gold fill-current drop-shadow-[0_0_10px_rgba(245,197,69,0.6)]" : "text-white/25"}`} />
                  </button>
                );
              })}
            </div>
          </div>

          <label className="block">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Your Name</span>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={60}
              placeholder="Your name"
              className="mt-2 w-full bg-white/5 border border-[#f5c545]/30 rounded-xl px-4 py-3 outline-none focus:border-[#f5c545]/70 focus:glow-gold transition text-foreground placeholder:text-muted-foreground/50"
            />
          </label>

          <label className="block">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Your Review</span>
            <textarea
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              maxLength={500}
              placeholder="Share your experience..."
              className="mt-2 w-full bg-white/5 border border-[#f5c545]/30 rounded-xl px-4 py-3 outline-none focus:border-[#f5c545]/70 focus:glow-gold transition text-foreground placeholder:text-muted-foreground/50"
            />
          </label>

          <button
            type="submit"
            disabled={!stars || !text.trim() || !name.trim() || submitting}
            className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl gold-gradient text-black font-bold hover:glow-gold hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {submitting ? "Submitting..." : "Submit Review"} <ArrowRight className="h-5 w-5" />
          </button>
          {error && <p className="text-center text-sm text-red-400">{error}</p>}
        </form>


        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {reviews.map((r, i) => (
            <div key={r.id ?? i} className="glass-dark rounded-2xl p-5 md:p-6 border border-[#f5c545]/25 hover:border-[#f5c545]/60 transition">
              <div className="flex gap-0.5 text-gold mb-2">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className={`h-4 w-4 ${k < r.stars ? "fill-current" : "opacity-25"}`} />
                ))}
              </div>
              <p className="text-sm text-foreground/85 leading-relaxed">"{r.text}"</p>
              <div className="mt-3 font-display text-sm text-gold-gradient">— {r.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Student Reviews -------------------- */
function StudentReviews() {
  return (
    <section id="reviews" className="relative py-16 md:py-24 bg-gradient-to-b from-transparent via-[#0a0f1c]/50 to-transparent">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeading eyebrow="Testimonials" title="What Our Students Say" sub="Authentic voices from inside the Falcon Trader community." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {STUDENT_REVIEWS.map((r, i) => (
            <div key={r.name}
                 className="group bg-[#0a0f1c]/80 backdrop-blur rounded-2xl p-6 md:p-7 border border-[#f5c545]/30 hover:border-[#f5c545]/70 hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(245,197,69,0.25)] transition-all duration-500 flex flex-col animate-fade-up"
                 style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full gold-gradient text-black font-bold flex items-center justify-center glow-gold">{r.name[0]}</div>
                  <div>
                    <div className="font-display text-base md:text-lg text-gold-gradient leading-tight">{r.name}</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{r.plan}</div>
                  </div>
                </div>
                <div className="flex gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, k) => (<Star key={k} className="h-3.5 w-3.5 fill-current" />))}
                </div>
              </div>
              <p className="mt-4 text-sm text-foreground/85 leading-relaxed flex-1">"{r.text}"</p>
              <div className="mt-5 inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-[#34ffb0]/10 border border-[#34ffb0]/40 text-[10px] uppercase tracking-widest text-neon">
                <CheckCircle2 className="h-3.5 w-3.5" /> Verified Student
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- FAQ -------------------- */
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <SectionHeading eyebrow="Questions" title="Frequently Asked Questions" />
        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`glass-dark rounded-2xl border transition ${isOpen ? "border-[#f5c545]/60 glow-gold" : "border-white/10"}`}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 md:px-6 py-4 md:py-5"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-sm md:text-base text-foreground">{f.q}</span>
                  <span className="shrink-0 h-8 w-8 rounded-full gold-gradient text-black flex items-center justify-center">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <div className={`grid transition-all duration-500 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 md:px-6 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Community (no demo video) -------------------- */
function Community() {
  return (
    <section id="community" className="relative py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <div className="relative glass-dark rounded-3xl p-8 md:p-14 text-center overflow-hidden">
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[#34ffb0]/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-[#f5c545]/15 blur-3xl" />
          <div className="relative">
            <div className="text-xs uppercase tracking-[0.3em] text-neon">Free Access</div>
            <h2 className="mt-3 font-display text-3xl md:text-5xl text-gold-gradient">Join Our Trading Community</h2>
            <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-xl mx-auto">Daily setups, live discussions and direct mentor access — all inside one WhatsApp group.</p>
            <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer"
               className="mt-7 inline-flex items-center gap-3 px-7 py-4 md:px-8 md:py-5 rounded-2xl text-black font-bold text-base md:text-lg animate-pulse-glow hover:scale-[1.03] transition"
               style={{ background: "linear-gradient(135deg,#25D366,#34ffb0)" }}>
              <MessageCircle className="h-5 w-5 md:h-6 md:w-6" /> Join WhatsApp Community
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Social -------------------- */
function Social() {
  const items = [
    { i: <Instagram className="h-6 w-6" />, h: BRAND.instagram, n: "Instagram" },
    { i: <Facebook className="h-6 w-6" />, h: BRAND.facebook, n: "Facebook" },
    { i: <Youtube className="h-6 w-6" />, h: BRAND.youtube, n: "YouTube" },
  ];
  return (
    <section className="py-12 md:py-16">
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

/* -------------------- Contact + Hidden Form (kept intact) -------------------- */
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
    window.location.href = `mailto:${BRAND.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }, []);

  return (
    <section id="contact" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeading eyebrow="Get In Touch" title="Connect With Falcon Trader" sub="Reach out through the form or any direct channel." />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="space-y-4">
            <a href={`tel:${BRAND.phone}`} className="glass rounded-2xl p-5 flex items-center gap-4 hover:glow-gold hover:-translate-y-1 transition duration-500">
              <div className="h-12 w-12 rounded-xl gold-gradient text-black flex items-center justify-center"><Phone className="h-5 w-5" /></div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Phone</div>
                <div className="font-display text-lg md:text-xl text-foreground">{BRAND.phone}</div>
              </div>
            </a>
            <a href={`mailto:${BRAND.email}`} className="glass rounded-2xl p-5 flex items-center gap-4 hover:glow-gold hover:-translate-y-1 transition duration-500">
              <div className="h-12 w-12 rounded-xl gold-gradient text-black flex items-center justify-center"><Mail className="h-5 w-5" /></div>
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Email</div>
                <div className="font-display text-base md:text-lg text-foreground truncate">{BRAND.email}</div>
              </div>
            </a>
            <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="glass rounded-2xl p-5 flex items-center gap-4 hover:glow-neon hover:-translate-y-1 transition duration-500">
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
                <p className="text-[11px] text-muted-foreground text-center">Submissions are delivered directly to {BRAND.email}.</p>
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
          <div className="font-display text-2xl text-gold-gradient">{BRAND.name}</div>
          <p className="text-sm text-neon italic glow-text-neon">"Trade Smart. Grow Strong. Stay Consistent."</p>
          <div className="flex gap-4 mt-2">
            <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-foreground/70 hover:text-gold hover:scale-125 transition"><Instagram className="h-5 w-5" /></a>
            <a href={BRAND.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-foreground/70 hover:text-gold hover:scale-125 transition"><Facebook className="h-5 w-5" /></a>
            <a href={BRAND.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-foreground/70 hover:text-gold hover:scale-125 transition"><Youtube className="h-5 w-5" /></a>
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
    <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
       className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full flex items-center justify-center text-black animate-pulse-glow hover:scale-110 transition"
       style={{ background: "linear-gradient(135deg,#25D366,#34ffb0)" }}>
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}

/* -------------------- Page -------------------- */
function Index() {
  // Silence unused-import warnings for icons/constants kept for future edits.
  void Award; void Trophy; void TrendingUp; void RESULTS;
  return (
    <div className="min-h-screen bg-[#05070d] text-foreground overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <StatsBar />
        <About />
        <Courses />
        <Results />
        <StudentReviews />
        <JoinCommunity />
        <RateExperience />
        
        <FAQ />
        <Social />
        <Contact />
      </main>
      <Footer />
      <FloatingWhats />
    </div>
  );
}
