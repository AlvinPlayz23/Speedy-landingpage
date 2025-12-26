
import React, { useEffect, useRef, useState } from 'react';
import { 
  Zap, 
  Cpu, 
  Bot, 
  Keyboard, 
  GitBranch, 
  Github, 
  Twitter, 
  Disc as Discord,
  ArrowUpRight,
  Terminal,
  Activity,
  Layers,
  ChevronRight,
  Monitor,
  Maximize2,
  Lock,
  Workflow,
  ShieldCheck,
  MousePointer2,
  Code2,
  BarChart3,
  Globe,
  Share2
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MetricCounter: React.FC<{ value: string, label: string, desc: string }> = ({ value, label, desc }) => {
  const countRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const isNumeric = !isNaN(parseFloat(value));
    if (isNumeric) {
      const numericPart = parseFloat(value);
      const suffix = value.replace(/[0-9.]/g, '');
      const obj = { val: 0 };
      
      gsap.to(obj, {
        val: numericPart,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: countRef.current,
          start: 'top 90%',
        },
        onUpdate: () => {
          if (countRef.current) {
            countRef.current.innerText = obj.val.toFixed(0) + suffix;
          }
        }
      });
    }
  }, [value]);

  return (
    <div className="reveal-child space-y-3 group">
      <div className="text-[9px] font-black text-brand-primary/40 uppercase tracking-[0.3em] transition-colors group-hover:text-brand-primary">// {label}</div>
      <div ref={countRef} className="text-4xl md:text-5xl font-heading font-black tracking-tighter uppercase group-hover:text-brand-primary transition-all duration-300">
        {value}
      </div>
      <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">{desc}</p>
    </div>
  );
};

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [typingCode, setTypingCode] = useState('');
  const [activeTab, setActiveTab] = useState('main.rs');
  
  const codeSamples = {
    'main.rs': 'fn main() {\n  let engine = Speedy::new();\n  engine.ignite_gpu_threads();\n  engine.listen_for_neural_inputs();\n}',
    'cargo.toml': '[package]\nname = "speedy-core"\nversion = "0.8.2"\nedition = "2024"\n\n[dependencies]\nspeedy_runtime = "0.5"',
  };

  useEffect(() => {
    gsap.to('#progress', {
      width: '100%',
      ease: 'none',
      scrollTrigger: { scrub: 0.3 }
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from('.hero-heading', { y: 60, opacity: 0, duration: 1.2, ease: 'expo.out' })
        .from('.hero-sub', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.8')
        .from('.hero-ide', { scale: 0.98, opacity: 0, y: 30, duration: 1.2, ease: 'expo.out' }, '-=0.6')
        .from('.hud-element', { scale: 0, opacity: 0, stagger: 0.05, duration: 0.6, ease: 'back.out(1.5)' }, '-=0.4');

      gsap.to('.bg-grid', {
        y: -100,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true
        }
      });

      gsap.utils.toArray('.reveal-section').forEach((section: any) => {
        gsap.from(section.querySelectorAll('.reveal-child'), {
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          },
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out'
        });
      });
    }, containerRef);

    let i = 0;
    const interval = setInterval(() => {
      const sample = codeSamples[activeTab as keyof typeof codeSamples];
      setTypingCode(sample.slice(0, i));
      i++;
      if (i > sample.length) i = 0;
    }, 45);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, [activeTab]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-brand-surface font-body selection:bg-brand-primary selection:text-black">
      
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '80px 80px' }}></div>
        <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vh] rounded-full bg-brand-primary/5 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vh] rounded-full bg-blue-500/5 blur-[100px]"></div>
      </div>

      <nav className="fixed top-0 left-0 w-full z-[100] px-6 lg:px-12 py-6 flex justify-between items-center border-b border-white/5 bg-brand-surface/70 backdrop-blur-xl">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-8 h-8 bg-brand-primary flex items-center justify-center font-heading font-black text-black text-lg -skew-x-12 group-hover:skew-x-0 transition-transform duration-500">S</div>
          <span className="text-xl font-heading font-black tracking-tighter uppercase group-hover:text-brand-primary transition-colors">Speedy</span>
        </div>
        <div className="hidden lg:flex gap-10 text-[10px] font-bold tracking-[0.3em] uppercase text-white/40">
          {['Forge', 'Nexus', 'Multisync', 'Telemetry'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-brand-primary transition-all duration-300 hover:tracking-[0.4em]">{item}</a>
          ))}
        </div>
        <div className="flex gap-4">
          <button className="btn-acid px-5 py-2 text-[10px] font-bold">Early Access</button>
        </div>
      </nav>

      <section className="relative z-10 pt-48 pb-24 px-6 md:px-12 overflow-hidden min-h-[90vh] flex flex-col justify-center">
        <div className="max-w-7xl mx-auto space-y-16 w-full flex flex-col items-center">
          <div className="text-center flex flex-col items-center space-y-8 w-full">
            <div className="hero-sub inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/5 border border-brand-primary/20 rounded-full hover:bg-brand-primary/10 transition-colors cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse"></span>
              <span className="text-[9px] font-black text-brand-primary uppercase tracking-[0.2em]">Build 0.8.2-Alpha</span>
            </div>
            
            <h1 className="hero-heading text-6xl md:text-[7.5rem] font-heading font-black leading-[0.85] tracking-tighter uppercase text-center w-full max-w-5xl">
              Construct at <br />
              <span className="text-outline hover:text-white transition-all duration-700 cursor-default">Silicon Speed.</span>
            </h1>
            
            <p className="hero-sub text-lg md:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed">
              We replaced Electron with a pure Rust runtime. Zero V8 overhead. GPU-direct rendering. The IDE your hardware deserves.
            </p>
            
            <div className="hero-sub flex justify-center gap-6 pt-4">
              <button className="btn-acid px-12 py-5 text-xs">Download Speedy Core</button>
              <button className="btn-ghost px-10 py-5 text-xs font-bold uppercase tracking-widest">Read Whitepaper</button>
            </div>
          </div>

          <div className="hero-ide relative max-w-5xl mx-auto w-full reveal-child">
            <div className="absolute -top-10 -right-6 z-20 hud-element hidden lg:block hover:scale-110 transition-transform duration-500 cursor-default">
              <div className="kinetic-border p-4 w-48 bg-black/90">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[8px] font-black text-white/30 uppercase">GPU Frame Rate</span>
                  <Activity className="w-3 h-3 text-brand-primary animate-pulse" />
                </div>
                <div className="text-2xl font-heading font-black text-brand-primary">144.0<span className="text-[10px] ml-1">FPS</span></div>
              </div>
            </div>
            
            <div className="absolute -bottom-10 -left-6 z-20 hud-element hidden lg:block hover:scale-110 transition-transform duration-500 cursor-default">
              <div className="kinetic-border p-4 w-52 bg-black/90 flex gap-4 items-center">
                <ShieldCheck className="w-6 h-6 text-brand-primary" />
                <div>
                  <div className="text-[9px] font-bold text-white uppercase">Memory Shield</div>
                  <div className="text-[8px] text-brand-primary/50 uppercase">Zero Leak Protected</div>
                </div>
              </div>
            </div>

            <div className="kinetic-border bg-[#050505] rounded-lg shadow-2xl overflow-hidden border border-white/10 group/ide">
              <div className="h-10 bg-white/[0.03] border-b border-white/5 flex items-center justify-between px-6">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/30 hover:bg-red-500 transition-colors cursor-pointer"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30 hover:bg-yellow-500 transition-colors cursor-pointer"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/30 hover:bg-green-500 transition-colors cursor-pointer"></div>
                </div>
                <div className="flex gap-6">
                  {['main.rs', 'cargo.toml'].map(tab => (
                    <button 
                      key={tab} 
                      onClick={() => setActiveTab(tab)}
                      className={`text-[9px] font-black uppercase tracking-[0.2em] py-1 border-b-2 transition-all duration-300 ${activeTab === tab ? 'text-brand-primary border-brand-primary' : 'text-white/20 border-transparent hover:text-white/40'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <Maximize2 className="w-3.5 h-3.5 text-white/20 hover:text-white transition-colors cursor-pointer" />
              </div>
              <div className="flex h-[450px] md:h-[600px]">
                <div className="hidden sm:flex w-16 border-r border-white/5 flex-col items-center py-8 gap-8 bg-black/40">
                  <Terminal className="w-4 h-4 text-white/20 hover:text-brand-primary transition-all duration-300 hover:scale-125 cursor-pointer" />
                  <Workflow className="w-4 h-4 text-white/20 hover:text-brand-primary transition-all duration-300 hover:scale-125 cursor-pointer" />
                  <Code2 className="w-4 h-4 text-brand-primary transition-all duration-300 hover:scale-125 cursor-pointer" />
                  <GitBranch className="w-4 h-4 text-white/20 hover:text-brand-primary transition-all duration-300 hover:scale-125 cursor-pointer" />
                </div>
                <div className="flex-1 p-10 font-mono text-sm leading-relaxed overflow-hidden relative">
                   <div className="text-white/5 absolute left-4 top-10 select-none text-[10px]">
                    {Array.from({length: 20}).map((_, i) => <div key={i}>{i+1}</div>)}
                   </div>
                   <div className="pl-6 text-white/70">
                      <pre className="whitespace-pre-wrap">{typingCode}<span className="inline-block w-1.5 h-4 bg-brand-primary ml-1 animate-pulse align-middle"></span></pre>
                      <div className="mt-12 p-6 border border-brand-primary/10 bg-brand-primary/[0.02] max-w-md hover:border-brand-primary/40 transition-colors group/suggestion cursor-default">
                        <div className="flex items-center gap-3 mb-2">
                          <Bot className="w-4 h-4 text-brand-primary group-hover/suggestion:rotate-12 transition-transform" />
                          <span className="text-[9px] font-black text-brand-primary uppercase tracking-widest">Neural Suggestion</span>
                        </div>
                        <p className="text-[11px] text-white/30 italic leading-relaxed group-hover/suggestion:text-white/50 transition-colors">"Vectorize these operations using SIMD intrinsics to gain 4x throughput on current CPU architecture."</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="reveal-section py-24 px-6 md:px-12 bg-white/[0.01] border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { label: "Execution Boot", val: "12ms", desc: "Binary vs Electron's 1.4s" },
            { label: "Memory Idle", val: "38mb", desc: "Low-level allocation efficiency" },
            { label: "GPU Context", val: "0.2ms", desc: "UI thread latency threshold" },
            { label: "File Search", val: "920mb", desc: "Instant local indexing speed" }
          ].map((m, i) => (
            <MetricCounter key={i} value={m.val} label={m.label} desc={m.desc} />
          ))}
        </div>
      </section>

      <section id="forge" className="reveal-section py-32 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="reveal-child space-y-10">
            <h2 className="text-5xl md:text-7xl font-heading font-black leading-[0.9] tracking-tighter uppercase">
              Engineered <br /> <span className="text-outline hover:text-white transition-all duration-500">Raw.</span>
            </h2>
            <p className="text-white/40 text-lg leading-relaxed max-w-lg">
              Speedy is a native binary. We bypassed the browser engine entirely to communicate directly with your OS and GPU.
            </p>
            <div className="space-y-4">
              {[
                { title: "Direct2GPU", desc: "Vulkan-based rendering pipeline for zero-latency UI interaction." },
                { title: "Atomic File Access", desc: "Bypassing high-level FS APIs for direct NVMe read speeds." },
                { title: "Hardware-Locked Context", desc: "Memory pages are pinned to prevent swap jitter during heavy builds." }
              ].map((f, i) => (
                <div key={i} className="flex gap-6 p-6 kinetic-border group hover:translate-x-4 transition-all duration-500">
                  <div className="w-10 h-10 rounded bg-brand-primary/10 flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:text-black transition-colors">
                    <Zap className="w-5 h-5 transition-transform group-hover:scale-125" />
                  </div>
                  <div>
                    <h4 className="text-white font-black uppercase text-xs tracking-widest mb-1 group-hover:text-brand-primary transition-colors">{f.title}</h4>
                    <p className="text-[11px] text-white/30 leading-relaxed group-hover:text-white/50 transition-colors">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal-child relative group/telemetry">
             <div className="absolute inset-0 bg-brand-primary/5 rounded-full blur-[100px] group-hover/telemetry:bg-brand-primary/10 transition-colors duration-700"></div>
             <div className="relative kinetic-border p-10 bg-black/40 rounded-xl space-y-12">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Resource Telemetry</span>
                  <Activity className="w-4 h-4 text-brand-primary animate-pulse" />
                </div>
                <div className="space-y-8">
                  <div className="space-y-3">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest transition-colors group-hover/telemetry:text-white/60">
                      <span>V8 Runtime (VSCode)</span>
                      <span className="text-white/30">1,200MB RAM</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-white/20 w-full group-hover/telemetry:bg-white/40 transition-colors"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-brand-primary">
                      <span>Speedy Engine</span>
                      <span>42MB RAM</span>
                    </div>
                    <div className="h-1.5 bg-brand-primary/10 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-primary w-[5%] shadow-[0_0_10px_rgba(190,242,100,0.5)]"></div>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      <section className="reveal-section py-32 px-6 md:px-12 border-t border-white/5 bg-white/[0.01] relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="reveal-child mb-20 space-y-4">
            <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tighter uppercase">Benchmarked <br /> <span className="text-outline hover:text-white transition-all duration-500">Results.</span></h2>
            <p className="text-white/40 max-w-md text-sm">Quantifiable gains across standard software engineering workflows.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: "Search Speed", val: "920MB/s", desc: "Full-project regex indexing" },
              { label: "Binary Load", val: "8ms", desc: "Cold start execution time" },
              { label: "AI Latency", val: "0.4ms", desc: "Local NPU inference response" }
            ].map((b, i) => (
              <div key={i} className="reveal-child p-10 kinetic-border text-center group hover:-translate-y-4 transition-all duration-500 cursor-default">
                <BarChart3 className="w-8 h-8 text-brand-primary mx-auto mb-6 opacity-40 group-hover:opacity-100 transition-all duration-500 group-hover:scale-125" />
                <div className="text-4xl font-heading font-black uppercase mb-2 tracking-tighter group-hover:text-brand-primary transition-colors">{b.val}</div>
                <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-4">{b.label}</div>
                <p className="text-[10px] text-white/30 uppercase leading-relaxed group-hover:text-white/60 transition-colors">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="ecosystem" className="reveal-section py-32 px-6 md:px-12 overflow-hidden relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="reveal-child relative h-[400px] group/globe">
              <div className="absolute inset-0 bg-grid opacity-[0.05] -rotate-12 scale-150 group-hover:opacity-[0.1] transition-opacity duration-700"></div>
              <div className="relative h-full flex items-center justify-center">
                <Globe className="w-64 h-64 text-brand-primary/10 animate-[spin_60s_linear_infinite] group-hover:text-brand-primary/20 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="grid grid-cols-2 gap-6">
                      <div className="p-4 kinetic-border bg-black/80 flex items-center gap-3 hover:scale-110 transition-transform cursor-pointer">
                        <Share2 className="w-4 h-4 text-brand-primary" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Ghost Protocol</span>
                      </div>
                      <div className="p-4 kinetic-border bg-black/80 flex items-center gap-3 hover:scale-110 transition-transform cursor-pointer">
                        <Github className="w-4 h-4 text-brand-primary" />
                        <span className="text-[9px] font-black uppercase tracking-widest">OSS Core</span>
                      </div>
                   </div>
                </div>
              </div>
            </div>
            <div className="reveal-child space-y-10">
              <h2 className="text-5xl md:text-7xl font-heading font-black leading-[0.9] tracking-tighter uppercase">
                Forged by <br /> <span className="text-outline hover:text-white transition-all duration-500">Systems.</span>
              </h2>
              <p className="text-white/40 text-lg leading-relaxed max-w-lg">
                Speedy is part of a growing ecosystem of native-first tools. We believe the age of the bloated web-wrapper is coming to an end.
              </p>
              <div className="flex gap-4">
                <button className="btn-acid px-8 py-4 text-[10px]">Join the Discord</button>
                <button className="btn-ghost px-8 py-4 text-[10px] font-bold uppercase tracking-widest">Star on GitHub</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="reveal-section py-48 px-6 md:px-12 relative overflow-hidden bg-white/[0.01] z-10">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(190,242,100,0.15),transparent_70%)]"></div>
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center justify-center text-center">
          <div className="reveal-child space-y-12 flex flex-col items-center w-full">
            <div className="inline-block px-4 py-1 border border-brand-primary/20 text-brand-primary text-[10px] font-black tracking-[0.4em] uppercase rounded-full hover:bg-brand-primary/5 transition-colors cursor-default">
              Vanguard Alpha // v0.8.2
            </div>
            
            <h2 className="text-6xl md:text-[7.5rem] font-heading font-black tracking-tighter uppercase leading-[0.8] w-full text-center">
              Join the <br /> <span className="text-outline hover:text-white transition-all duration-700 cursor-default">Vanguard.</span>
            </h2>
            
            <p className="text-white/40 max-w-xl text-lg leading-relaxed mx-auto">
              We are selectively onboarding engineers to the Alpha Forge. Claim your hardware-locked access token today.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-8 w-full max-w-xl">
              <button className="btn-acid px-16 py-8 text-sm w-full sm:w-auto">Claim Access Token</button>
              <button className="btn-ghost px-12 py-8 text-sm font-bold uppercase tracking-widest w-full sm:w-auto">View Roadmap</button>
            </div>
            
            <p className="text-[10px] font-bold text-white/10 uppercase tracking-[0.5em] pt-12 text-center">No Credit Card Required // Private Build</p>
          </div>
        </div>
      </section>

      <footer className="relative z-20 py-24 px-6 md:px-12 border-t border-white/5 bg-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-16 mb-24">
            <div className="space-y-8">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-8 h-8 bg-brand-primary flex items-center justify-center font-heading font-black text-black text-lg -skew-x-12 group-hover:rotate-12 transition-transform">S</div>
                <span className="text-xl font-heading font-black tracking-tighter uppercase group-hover:text-brand-primary transition-colors">Speedy</span>
              </div>
              <p className="text-xs text-white/30 leading-relaxed uppercase font-bold tracking-tight">
                Forging the future of software construction through hyper-native systems engineering.
              </p>
              <div className="flex gap-6">
                <Github className="w-5 h-5 text-white/10 hover:text-brand-primary transition-all duration-300 hover:-translate-y-1 cursor-pointer" />
                <Twitter className="w-5 h-5 text-white/10 hover:text-brand-primary transition-all duration-300 hover:-translate-y-1 cursor-pointer" />
                <Discord className="w-5 h-5 text-white/10 hover:text-brand-primary transition-all duration-300 hover:-translate-y-1 cursor-pointer" />
              </div>
            </div>

            <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-12">
              {[
                { title: "The Forge", links: ["Binary Docs", "Engine Logs", "CLI Tools", "Runtime API"] },
                { title: "Nexus", links: ["Community", "Neural Benchmarks", "Ghost Protocol", "Roadmap"] },
                { title: "Systems", links: ["Security Audit", "Telemetry", "Privacy", "Licenses"] }
              ].map((col, idx) => (
                <div key={idx} className="space-y-8">
                  <h4 className="text-[9px] font-black text-brand-primary tracking-[0.4em] uppercase">// {col.title}</h4>
                  <ul className="space-y-4">
                    {col.links.map((link, lIdx) => (
                      <li key={lIdx}>
                        <a href="#" className="text-[10px] font-bold text-white/20 hover:text-brand-primary transition-all duration-300 hover:pl-2 uppercase tracking-[0.2em] inline-block">{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-bold text-white/10 uppercase tracking-[0.3em]">
            <div className="flex flex-wrap gap-12 justify-center">
              <span>© 2024 Speedy Core Labs Inc.</span>
              <span className="text-brand-primary/20">Forge Protocol Active</span>
            </div>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 text-white/20 hover:text-white transition-all uppercase tracking-widest group"
            >
              Return to Core <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
