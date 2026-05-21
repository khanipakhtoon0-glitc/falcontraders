import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, FormEvent } from "react";
import {
  TrendingUp, LineChart, Users, GraduationCap, Radio, ShieldCheck,
  Brain, Signal, BarChart3, Rocket, Star, Instagram, Facebook, Youtube,
  Phone, Mail, User, MessageCircle, ArrowRight, Sparkles, Award, Target,
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
const PHONE = "0311 6450708";

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
    <div ref={ref} className="glass rounded-2xl p-6 md:p-8 text-center group hover:glow-gold transition-all duration-500">
      <div className="font-display text-4xl md:text-5xl text-gold-gradient">
        {v.toLocaleString()}{suffix}
      </div>
      <div className="mt-2 text-sm md:text-base text-muted-foreground uppercase tracking-widest">{label}</div>
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    ["About", "#about"], ["Courses", "#courses"], ["Reviews", "#reviews"],
    ["Community", "#community"], ["Contact", "#contact"],
  ] as const;
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4 md:px-8 mt-3">
        <div className="glass-dark rounded-2xl flex items-center justify-between px-3 md:px-5 py-2.5">
          <a href="#top" className="flex items-center gap-3">
            <img src={logo} alt="Falcon Trader logo" className="h-10 w-10 rounded-full ring-2 ring-[#f5c545]/40 object-cover" />
            <span className="font-display text-base md:text-lg text-gold-gradient">FALCON TRADER</span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm">
            {links.map(([n, h]) => (
              <a key={h} href={h} className="text-foreground/80 hover:text-gold transition relative group">
                {n}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
             className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl gold-gradient text-black font-semibold text-sm glow-gold hover:scale-[1.03] transition">
            Join Now <ArrowRight className="h-4 w-4" />
          </a>
          <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="menu">
            <div className="space-y-1.5"><span className="block w-6 h-0.5 bg-gold" /><span className="block w-6 h-0.5 bg-gold" /><span className="block w-4 h-0.5 bg-gold" /></div>
          </button>
        </div>
        {open && (
          <div className="md:hidden mt-2 glass-dark rounded-2xl p-4 flex flex-col gap-3 text-sm">
            {links.map(([n, h]) => (<a key={h} href={h} onClick={() => setOpen(false)} className="text-foreground/90 hover:text-gold">{n}</a>))}
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-xl gold-gradient text-black font-semibold text-center">Join Community</a>
          </div>
        )}
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] flex items-center overflow-hidden pt-28 pb-20">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover scale-110 blur-md opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070d]/85 via-[#05070d]/70 to-[#05070d]" />
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-[#f5c545]/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-[480px] h-[480px] rounded-full bg-[#34ffb0]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-8 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center w-full">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs uppercase tracking-[0.2em] text-gold">
            <Sparkles className="h-3.5 w-3.5" /> Premium Trading Hub
          </div>
          <h1 className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] shimmer-text glow-text-gold">
            FALCON<br />TRADER
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/80 max-w-xl">
            <span className="text-neon glow-text-neon font-medium">A Hub To Learn And Grow.</span> Master crypto markets with structure, psychology and disciplined risk — guided by traders who live the chart.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
               className="group inline-flex items-center gap-2 px-7 py-4 rounded-xl gold-gradient text-black font-bold tracking-wide glow-gold hover:scale-105 transition">
              Join Community <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition" />
            </a>
            <a href="#courses"
               className="inline-flex items-center gap-2 px-7 py-4 rounded-xl border-2 border-[#34ffb0]/50 text-neon font-semibold hover:bg-[#34ffb0]/10 hover:glow-neon transition">
              Start Learning
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex -space-x-2">
              {[review1, review2, review3].map((s,i)=>(<div key={i} className="h-8 w-8 rounded-full bg-gold/30 ring-2 ring-[#05070d]" style={{background:`url(${s}) center/cover`}} />))}
            </div>
            <div>500+ active students learning right now</div>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <img src={logo} alt="Falcon" className="mx-auto w-[280px] h-[280px] rounded-full object-cover ring-4 ring-[#f5c545]/30 glow-gold animate-float" />
          <FloatingStat className="absolute -top-2 -left-6 animate-float" delay="0s" icon={<TrendingUp className="h-4 w-4" />} label="Win Rate" value="78%" tone="neon" />
          <FloatingStat className="absolute top-20 -right-4 animate-float" delay="-2s" icon={<BarChart3 className="h-4 w-4" />} label="Avg R:R" value="1 : 3.2" tone="gold" />
          <FloatingStat className="absolute -bottom-2 -left-2 animate-float" delay="-4s" icon={<Signal className="h-4 w-4" />} label="Live Signals" value="Daily" tone="neon" />
          <FloatingStat className="absolute bottom-12 -right-8 animate-float" delay="-1s" icon={<Award className="h-4 w-4" />} label="Students" value="2,400+" tone="gold" />
        </div>
      </div>
    </section>
  );
}

function FloatingStat({ icon, label, value, tone, className, delay }: { icon: React.ReactNode; label: string; value: string; tone: "gold" | "neon"; className?: string; delay?: string }) {
  return (
    <div className={`glass-dark rounded-xl px-4 py-3 min-w-[150px] ${className}`} style={{ animationDelay: delay }}>
      <div className={`flex items-center gap-2 text-[10px] uppercase tracking-widest ${tone === "gold" ? "text-gold" : "text-neon"}`}>{icon}{label}</div>
      <div className="font-display text-lg text-foreground mt-1">{value}</div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-14">
      <div className="text-xs uppercase tracking-[0.3em] text-neon">{eyebrow}</div>
      <h2 className="mt-3 font-display text-4xl md:text-5xl text-gold-gradient">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
      <div className="mt-5 mx-auto w-24 h-px gold-gradient" />
    </div>
  );
}

function About() {
  const features = [
    { i: <LineChart className="h-6 w-6" />, t: "Crypto Trading" },
    { i: <BarChart3 className="h-6 w-6" />, t: "Market Analysis" },
    { i: <Radio className="h-6 w-6" />, t: "Live Guidance" },
    { i: <Users className="h-6 w-6" />, t: "Trading Community" },
    { i: <GraduationCap className="h-6 w-6" />, t: "Trading Education" },
  ];
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading eyebrow="About Us" title="Who We Are" />
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5 text-foreground/85 leading-relaxed">
            <p className="text-lg">
              <span className="text-gold font-semibold">Falcon Trader</span> is a growing trading community focused on helping beginners and serious traders learn crypto trading, market analysis, risk management, and smart trading strategies in a professional environment.
            </p>
            <p>We blend institutional concepts with real-time mentorship — turning confusing charts into confident decisions. No noise. No hype. Just disciplined, repeatable trading.</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="glass px-4 py-2 rounded-full text-sm flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-neon" /> Risk-first mindset</div>
              <div className="glass px-4 py-2 rounded-full text-sm flex items-center gap-2"><Target className="h-4 w-4 text-gold" /> Setup-based trading</div>
              <div className="glass px-4 py-2 rounded-full text-sm flex items-center gap-2"><Brain className="h-4 w-4 text-neon" /> Psychology focused</div>
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

        <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-4">
          {features.map((f) => (
            <div key={f.t} className="glass rounded-2xl p-5 text-center hover:-translate-y-1 hover:glow-gold transition duration-500 group">
              <div className="mx-auto w-12 h-12 rounded-xl gold-gradient text-black flex items-center justify-center group-hover:scale-110 transition">{f.i}</div>
              <div className="mt-3 text-sm font-medium">{f.t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Courses() {
  const courses = [
    { i: <Rocket />, t: "Beginner To Advanced Trading", d: "Build a complete foundation from candles to executing high-probability setups." },
    { i: <ShieldCheck />, t: "Risk Management", d: "Protect capital with position sizing, R-multiples and stop discipline." },
    { i: <BarChart3 />, t: "Market Structure", d: "Read HH/HL, BOS, CHoCH and trend bias across timeframes." },
    { i: <Signal />, t: "Crypto Signals", d: "Live entries, SL and TP shared with reasoning — not blind calls." },
    { i: <Brain />, t: "Trading Psychology", d: "Master fear, greed, FOMO and process-based execution." },
    { i: <Radio />, t: "Live Trading Sessions", d: "Trade real markets with mentors in real time, every week." },
  ];
  return (
    <section id="courses" className="relative py-24 md:py-32 bg-gradient-to-b from-transparent via-[#0a0f1c]/60 to-transparent">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading eyebrow="Curriculum" title="What You'll Learn" sub="Six pillars that turn beginners into consistent, structured traders." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c) => (
            <div key={c.t} className="group relative glass-dark rounded-2xl p-7 overflow-hidden hover:-translate-y-2 transition duration-500">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"
                   style={{ background: "radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(245,197,69,0.15), transparent 40%)" }} />
              <div className="w-14 h-14 rounded-xl gold-gradient text-black flex items-center justify-center group-hover:glow-gold transition">{c.i}</div>
              <h3 className="mt-5 font-display text-xl text-foreground">{c.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
              <a href="#contact" className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gold-gradient text-black font-semibold text-sm hover:glow-gold transition">
                Enroll Now <ArrowRight className="h-4 w-4" />
              </a>
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#34ffb0]/5 blur-2xl pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading eyebrow="By The Numbers" title="A Community That Compounds" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <Counter to={2400} label="Active Students" />
          <Counter to={8500} label="Community Members" />
          <Counter to={650} label="Success Stories" />
          <Counter to={365} suffix="" label="Daily Market Updates" />
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const imgs = [review1, review2, review3, review4, review5, review6, review7];
  const quotes = [
    { n: "Tamoor", t: "Mashallah, the way you take basics to advance — people charge heavily for this. Truly worthy. Thanks a lot teacher!" },
    { n: "Arif Khan", t: "BOS / CHoCH got cleared. Use of Fib along with trend line made it easy to understand." },
    { n: "Bilal", t: "Important class on Bias and Liquidity — kab, kaha aur kese hoti hai, all explained clearly." },
    { n: "Nawaz Ali", t: "Higher high, higher low, CHoCH, BOS — market structure on higher timeframes cleared completely." },
    { n: "Hammad Gul", t: "Bias, liquidity aur supply/demand ko practically discuss karke samjhaya gaya. Jazak Allah!" },
    { n: "Kamranullah", t: "Daily bias confusion almost cleared — combining technicals & fundamentals is the real edge." },
  ];
  return (
    <section id="reviews" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading eyebrow="Real Voices" title="Student Results & Reviews" sub="Authentic feedback from inside the Falcon community." />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {quotes.map((q, i) => (
            <div key={i} className="glass rounded-2xl p-6 hover:glow-gold transition duration-500">
              <div className="flex items-center gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, k) => (<Star key={k} className="h-4 w-4 fill-current" />))}
              </div>
              <p className="mt-4 text-sm text-foreground/85 leading-relaxed">"{q.t}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full gold-gradient text-black font-bold flex items-center justify-center">{q.n[0]}</div>
                <div>
                  <div className="text-sm font-semibold">{q.n}</div>
                  <div className="text-[11px] text-muted-foreground uppercase tracking-widest">Lifetime Subscription</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center text-xs uppercase tracking-[0.3em] text-neon mb-6">Screenshots from the community</div>
        <div className="relative overflow-hidden mask-marquee">
          <div className="flex gap-5 w-max animate-marquee">
            {[...imgs, ...imgs].map((src, i) => (
              <div key={i} className="glass-dark rounded-2xl p-2 shrink-0 hover:scale-[1.02] transition">
                <img src={src} alt={`Student result ${i+1}`} loading="lazy" className="h-[360px] w-[200px] object-cover rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Community() {
  return (
    <section id="community" className="relative py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <div className="relative glass-dark rounded-3xl p-10 md:p-16 text-center overflow-hidden">
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[#34ffb0]/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-[#f5c545]/15 blur-3xl" />
          <div className="relative">
            <div className="text-xs uppercase tracking-[0.3em] text-neon">Free Access</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl text-gold-gradient">Join Our Trading Community</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Daily setups, live discussions and direct mentor access — all inside one WhatsApp group.</p>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
               className="mt-8 inline-flex items-center gap-3 px-8 py-5 rounded-2xl text-black font-bold text-lg animate-pulse-glow"
               style={{ background: "linear-gradient(135deg,#25D366,#34ffb0)" }}>
              <MessageCircle className="h-6 w-6" /> Join WhatsApp Community
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Social() {
  const items = [
    { i: <Instagram className="h-6 w-6" />, h: INSTAGRAM, n: "Instagram" },
    { i: <Facebook className="h-6 w-6" />, h: FACEBOOK, n: "Facebook" },
    { i: <Youtube className="h-6 w-6" />, h: YOUTUBE, n: "YouTube" },
  ];
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <SectionHeading eyebrow="Stay Connected" title="Follow Falcon Trader" />
        <div className="flex flex-wrap justify-center gap-5">
          {items.map((s) => (
            <a key={s.n} href={s.h} target="_blank" rel="noopener noreferrer"
               className="group glass rounded-2xl px-7 py-5 flex items-center gap-3 hover:glow-gold hover:-translate-y-1 transition">
              <span className="text-gold group-hover:text-neon transition">{s.i}</span>
              <span className="font-medium">{s.n}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = encodeURIComponent("New Falcon Trader enrollment");
    const body = encodeURIComponent(`Name: ${f.get("name")}\nEmail: ${f.get("email")}\nWhatsApp: ${f.get("whatsapp")}`);
    window.location.href = `mailto:falcontrader183@gmail.com?subject=${subject}&body=${body}`;
    setStatus("sent");
  };
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-neon">Get In Touch</div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl text-gold-gradient">Work With Me</h2>
          <p className="mt-4 text-muted-foreground">For course details & professional guidance — drop your info and we'll reach out personally.</p>
          <div className="mt-8 space-y-4">
            <a href={`tel:${PHONE.replace(/\s/g,"")}`} className="glass rounded-2xl p-5 flex items-center gap-4 hover:glow-gold transition">
              <div className="h-12 w-12 rounded-xl gold-gradient text-black flex items-center justify-center"><Phone className="h-5 w-5" /></div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Call / WhatsApp</div>
                <div className="font-display text-xl text-foreground">{PHONE}</div>
              </div>
            </a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="glass rounded-2xl p-5 flex items-center gap-4 hover:glow-neon transition">
              <div className="h-12 w-12 rounded-xl flex items-center justify-center text-black" style={{background:"linear-gradient(135deg,#25D366,#34ffb0)"}}><MessageCircle className="h-5 w-5" /></div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Community</div>
                <div className="font-display text-xl text-foreground">WhatsApp Group</div>
              </div>
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} className="glass-dark rounded-3xl p-7 md:p-9 space-y-5 glow-gold/30">
          <Field icon={<User className="h-4 w-4" />} name="name" label="Full Name" placeholder="John Doe" />
          <Field icon={<Mail className="h-4 w-4" />} name="email" type="email" label="Email Address" placeholder="you@email.com" />
          <Field icon={<Phone className="h-4 w-4" />} name="whatsapp" label="WhatsApp Number" placeholder="03xx xxxxxxx" />
          <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl gold-gradient text-black font-bold hover:glow-gold transition">
            {status === "sent" ? "Opening your email…" : "Submit Application"} <ArrowRight className="h-5 w-5" />
          </button>
          <p className="text-[11px] text-muted-foreground text-center">Submissions are delivered directly to the Falcon Trader inbox.</p>
        </form>
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

function Footer() {
  return (
    <footer className="relative pt-16 pb-10 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col items-center text-center gap-5">
          <img src={logo} alt="Falcon Trader" className="h-16 w-16 rounded-full ring-2 ring-[#f5c545]/40 object-cover" />
          <div className="font-display text-2xl text-gold-gradient">FALCON TRADER</div>
          <p className="text-sm text-neon italic glow-text-neon">"Trade Smart. Grow Strong. Stay Consistent."</p>
          <div className="flex gap-4 mt-2">
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-gold transition"><Instagram className="h-5 w-5" /></a>
            <a href={FACEBOOK} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-gold transition"><Facebook className="h-5 w-5" /></a>
            <a href={YOUTUBE} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-gold transition"><Youtube className="h-5 w-5" /></a>
          </div>
          <div className="text-xs text-muted-foreground mt-4">© 2026 Falcon Trader. All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      document.querySelectorAll<HTMLElement>("#courses .group").forEach((el) => {
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
        <Reviews />
        <Community />
        <Social />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
