"use client";

import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  ExternalLink, 
  Award, 
  BookOpen, 
  Briefcase, 
  Code2, 
  Zap,
  Globe,
  ChevronRight,
  Sun,
  Moon,
  MessageSquare,
  X,
  Send,
  Loader2,
  Menu,
  GraduationCap
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ProfileImage, PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { askAssistant } from "@/ai/flows/assistant-flow";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1,
    }
  }
};

export default function PortfolioPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<{ role: 'user' | 'model', content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!chatInput.trim() || isLoading) return;

    const userMsg = chatInput;
    setChatInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await askAssistant({ 
        message: userMsg, 
        history: messages.slice(-5) 
      });
      setMessages(prev => [...prev, { role: 'model', content: response.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "Sorry, I'm having trouble connecting right now. Feel free to contact Rajeel directly!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body transition-colors duration-500 relative bg-mesh overflow-x-hidden">
      {/* Background Animated Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{ 
            x: [0, 50, 0], 
            y: [0, 100, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, -50, 0], 
            y: [0, -100, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-secondary/10 rounded-full blur-[120px]" 
        />
      </div>

      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left" style={{ scaleX }} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glassmorphism px-6 md:px-12 py-3 flex justify-between items-center border-b border-white/5">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-black tracking-tighter text-primary neon-text-glow"
        >
          MR<span className="text-foreground">.</span>
        </motion.div>
        
        <div className="hidden md:flex gap-8 text-[10px] font-black tracking-[0.2em] uppercase opacity-70">
          {["About", "Skills", "Experience", "Education", "Projects", "Contact"].map((item) => (
            <motion.a 
              whileHover={{ y: -2, opacity: 1 }}
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="hover:text-primary transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="rounded-full h-9 w-9"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden md:flex neumorphic-flat border-none text-[10px] font-black uppercase tracking-widest"
            onClick={() => setIsChatOpen(true)}
          >
            Ask AI
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden h-9 w-9" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-14 left-0 w-full bg-background/98 backdrop-blur-2xl z-40 border-b border-primary/10 md:hidden flex flex-col p-6 gap-6"
          >
            {["About", "Skills", "Experience", "Education", "Projects", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-sm font-black uppercase tracking-widest hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <Button className="w-full font-bold" onClick={() => { setIsChatOpen(true); setMobileMenuOpen(false); }}>Ask AI Assistant</Button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 pt-20 pb-12 px-6 md:px-12 max-w-5xl mx-auto space-y-24">
        
        {/* Hero Section */}
        <section id="hero" className="flex flex-col items-center justify-center text-center space-y-8 min-h-[60vh]">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-primary/20 p-1 neon-glow mb-6 mx-auto relative group">
              <div className="w-full h-full rounded-full bg-muted flex items-center justify-center overflow-hidden relative shadow-xl">
                <Image 
                  src={ProfileImage.imageUrl} 
                  alt={ProfileImage.description}
                  fill
                  priority
                  className="object-cover"
                  data-ai-hint={ProfileImage.imageHint}
                />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-black tracking-tight font-headline">
              Muhammad <span className="text-primary italic">Rajeel</span>
            </h1>
            <p className="text-base md:text-xl text-muted-foreground font-medium max-w-xl mx-auto opacity-80">
              Full-Stack Architect & <span className="text-foreground font-bold">Agentic AI Explorer</span>.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-xs mx-auto"
          >
            <a href="/cv.pdf" download className="w-full">
              <Button size="sm" className="w-full h-10 text-[10px] font-black uppercase tracking-widest neumorphic-flat border-none hover:neon-glow transition-all">
                <Download className="mr-2 h-3 w-3" /> CV
              </Button>
            </a>
            <a href="https://github.com/rajeelsiddiqui" target="_blank" rel="noopener noreferrer" className="w-full">
              <Button variant="outline" size="sm" className="w-full h-10 text-[10px] font-black uppercase tracking-widest glassmorphism border-primary/20 transition-all">
                <Github className="mr-2 h-3 w-3" /> GitHub
              </Button>
            </a>
          </motion.div>
        </section>

        {/* About Me */}
        <section id="about" className="space-y-10">
          <SectionHeader title="The Vision" />
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div {...fadeInUp} className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Specializing in <span className="text-primary font-bold">React, Next.js, and Django</span>. 
                I focus on building intelligent systems that prioritize user experience and technical excellence.
              </p>
              <div className="grid gap-3">
                <FeatureItem 
                  icon={<Award className="text-secondary h-4 w-4" />}
                  title="Hackathon Winner"
                  desc="Winner of UI/UX implementation hackathon."
                />
                <FeatureItem 
                  icon={<Zap className="text-primary h-4 w-4" />}
                  title="Agentic AI"
                  desc="Developing autonomous AI agents."
                />
              </div>
            </motion.div>
            
            <motion.div 
              {...fadeInUp}
              className="relative aspect-video rounded-xl overflow-hidden glassmorphism p-6 flex flex-col items-center justify-center border-white/5"
            >
               <div className="space-y-4 text-center">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2 neon-glow">
                    <Zap size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-black italic">Intelligence + Logic</h3>
                  <p className="text-muted-foreground text-xs max-w-[200px] mx-auto">Merging AI with robust backend architecture.</p>
               </div>
            </motion.div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="space-y-10">
          <SectionHeader title="Expertise" />
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <SkillCard title="Frontend" skills={["React", "Next.js", "TypeScript", "Tailwind"]} icon={<Globe size={18} className="text-cyan-500" />} colorClass="border-cyan-500/20" />
            <SkillCard title="Backend" skills={["Node.js", "Django", "Python", "MySQL"]} icon={<Code2 size={18} className="text-emerald-500" />} colorClass="border-emerald-500/20" />
            <SkillCard title="AI / ML" skills={["Agentic AI", "Genkit", "Gemini"]} icon={<Zap size={18} className="text-purple-500" />} colorClass="border-purple-500/20" />
            <SkillCard title="Infrastructure" skills={["Docker", "AWS", "Firebase"]} icon={<ExternalLink size={18} className="text-blue-500" />} colorClass="border-blue-500/20" />
          </motion.div>
        </section>

        {/* Work Experience */}
        <section id="experience" className="space-y-10">
          <SectionHeader title="Experience" />
          <div className="space-y-4">
            <TimelineItem title="MHN Enterprises" period="2025 - Present" role="Full Stack Developer" bullets={["Architecting systems with Laravel and MERN.", "Engineering real-time integrations.", "Leading frontend strategy."]} />
            <TimelineItem title="Genentech Solutions" period="2024" role="Full-Stack Engineer" bullets={["Developed REST APIs using Django.", "Built SSR frontends with Next.js.", "Optimized database performance."]} />
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="space-y-10">
          <SectionHeader title="Education" />
          <div className="grid md:grid-cols-2 gap-4">
            <EducationCard 
              title="Diploma in Web Development"
              institution="Aptech"
              status="In Progress"
              icon={<GraduationCap className="text-primary" size={20} />}
            />
            <EducationCard 
              title="Agentic AI Course"
              institution="PIAIC"
              status="Quarter 2 of 6"
              desc="Comprehensive program on AI agents and LLMs."
              icon={<Zap className="text-purple-500" size={20} />}
            />
            <EducationCard 
              title="Intermediate (ICS)"
              institution="Completed 1st Year"
              desc="Computer Science specialization."
              icon={<BookOpen className="text-blue-500" size={20} />}
            />
            <EducationCard 
              title="Hifz-ul-Quran"
              institution="Completed"
              status="2021"
              icon={<Award className="text-secondary" size={20} />}
            />
            <EducationCard 
              title="Matriculation"
              institution="Alkamran Public School"
              status="2022 - 2023"
              icon={<GraduationCap className="text-muted-foreground" size={20} />}
            />
          </div>
        </section>

        {/* Projects Grid */}
        <section id="projects" className="space-y-10">
          <SectionHeader title="Projects" />
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {PlaceHolderImages.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </section>

        {/* Footer */}
        <footer id="contact" className="pt-16 pb-12 text-center glassmorphism rounded-3xl border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          <motion.div {...fadeInUp} className="space-y-8 max-w-xl mx-auto px-6">
            <h2 className="text-3xl font-black font-headline tracking-tighter">Let's <span className="text-primary italic">Connect</span></h2>
            <div className="grid grid-cols-3 gap-4">
              <ContactLink icon={<Mail size={16} />} label="Email" href="mailto:rajeelsiddiqui3@gmail.com" />
              <ContactLink icon={<Linkedin size={16} />} label="LinkedIn" href="https://www.linkedin.com/in/rajeel-siddiqui/" />
              <ContactLink icon={<Github size={16} />} label="GitHub" href="https://github.com/rajeelsiddiqui" />
            </div>
            <p className="text-[9px] font-black text-muted-foreground tracking-widest uppercase opacity-50">© 2025 Muhammad Rajeel Siddiqui</p>
          </motion.div>
        </footer>
      </main>

      {/* AI Assistant */}
      <div className="fixed bottom-6 right-6 z-[60]">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="mb-4 w-[85vw] md:w-[320px] h-[450px] glassmorphism rounded-2xl border border-primary/20 shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="p-3 border-b border-white/5 flex justify-between items-center bg-primary/5">
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest">AI Assistant</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(false)} className="h-6 w-6">
                  <X size={14} />
                </Button>
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 text-[11px]">
                {messages.length === 0 && (
                  <div className="text-center py-6 opacity-60">Ask about Rajeel's skills or education!</div>
                )}
                {messages.map((msg, i) => (
                  <div key={i} className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}>
                    <div className={cn("max-w-[80%] p-2 rounded-lg", msg.role === 'user' ? "bg-primary text-primary-foreground" : "bg-muted text-foreground border border-white/5")}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && <Loader2 className="h-4 w-4 animate-spin mx-auto opacity-50" />}
              </div>

              <form onSubmit={handleSendMessage} className="p-3 border-t border-white/5 bg-background/50 flex gap-2">
                <Input placeholder="Ask..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} className="h-8 text-[11px]" />
                <Button type="submit" size="icon" className="h-8 w-8"><Send size={14} /></Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        <Button size="icon" onClick={() => setIsChatOpen(!isChatOpen)} className="w-12 h-12 rounded-full shadow-2xl neon-glow">
          {isChatOpen ? <X size={20} /> : <MessageSquare size={20} />}
        </Button>
      </div>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <motion.div {...fadeInUp} className="space-y-2">
      <h2 className="text-xl md:text-2xl font-black font-headline tracking-widest uppercase">{title}</h2>
      <div className="w-8 h-1 bg-primary rounded-full neon-glow"></div>
    </motion.div>
  );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg glassmorphism border border-white/5">
      <div className="shrink-0 mt-1">{icon}</div>
      <div>
        <h4 className="font-black text-[11px] uppercase tracking-wider">{title}</h4>
        <p className="text-muted-foreground text-[10px] opacity-70">{desc}</p>
      </div>
    </div>
  );
}

function SkillCard({ title, skills, icon, colorClass }: { title: string, skills: string[], icon: React.ReactNode, colorClass: string }) {
  return (
    <motion.div variants={fadeInUp} className={cn("p-4 neumorphic-flat rounded-xl border", colorClass)}>
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="text-[10px] font-black uppercase tracking-widest">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-1">
        {skills.map((s) => (
          <Badge key={s} variant="secondary" className="text-[9px] px-1.5 py-0 bg-primary/5 font-bold">{s}</Badge>
        ))}
      </div>
    </motion.div>
  );
}

function EducationCard({ title, institution, status, desc, icon }: { title: string, institution: string, status?: string, desc?: string, icon: React.ReactNode }) {
  return (
    <motion.div {...fadeInUp} className="p-4 neumorphic-flat rounded-xl border border-white/5 space-y-2">
      <div className="flex justify-between items-start gap-2">
        <div className="p-2 bg-background rounded-lg">{icon}</div>
        {status && <Badge className="text-[8px] font-black uppercase tracking-widest py-0 px-1.5">{status}</Badge>}
      </div>
      <div>
        <h4 className="text-[11px] font-black uppercase tracking-wider">{title}</h4>
        <p className="text-[10px] text-primary font-bold">{institution}</p>
        {desc && <p className="text-[9px] text-muted-foreground mt-1 opacity-70">{desc}</p>}
      </div>
    </motion.div>
  );
}

function TimelineItem({ title, period, role, bullets }: { title: string, period: string, role: string, bullets: string[] }) {
  return (
    <motion.div {...fadeInUp} className="p-5 neumorphic-flat rounded-xl border border-white/5 relative group">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-3">
        <div>
          <h3 className="text-lg font-black text-primary italic leading-none">{title}</h3>
          <p className="text-[9px] font-black text-secondary tracking-widest uppercase mt-1">{role}</p>
        </div>
        <Badge variant="outline" className="w-fit text-[9px] font-black uppercase">{period}</Badge>
      </div>
      <ul className="space-y-1">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-2 text-muted-foreground text-[11px] opacity-80">
            <ChevronRight className="h-3 w-3 text-primary shrink-0 mt-0.5" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function ProjectCard({ project }: { project: any }) {
  return (
    <motion.div variants={fadeInUp} className="neumorphic-flat rounded-xl overflow-hidden group border border-white/5">
      <div className="relative h-44 overflow-hidden">
        <Image src={project.imageUrl} alt={project.description} fill className="object-cover transition-transform group-hover:scale-105" data-ai-hint={project.imageHint} />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
          <Button size="icon" variant="secondary" className="h-8 w-8"><Github size={14} /></Button>
          <Button size="icon" variant="secondary" className="h-8 w-8"><ExternalLink size={14} /></Button>
        </div>
      </div>
      <div className="p-4">
        <h4 className="text-xs font-black uppercase tracking-wider">{project.description}</h4>
      </div>
    </motion.div>
  );
}

function ContactLink({ icon, label, href }: { icon: React.ReactNode, label: string, href: string }) {
  return (
    <motion.a whileHover={{ y: -3 }} href={href} className="flex flex-col items-center gap-1 p-3 glassmorphism rounded-xl border border-white/5">
      <div className="text-primary">{icon}</div>
      <span className="text-[8px] font-black uppercase tracking-widest opacity-60">{label}</span>
    </motion.a>
  );
}
