"use client";

import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  ExternalLink, 
  Award, 
  BookOpen, 
  Briefcase, 
  Code2, 
  User,
  Zap,
  Globe,
  ChevronRight,
  Sun,
  Moon,
  MessageSquare,
  X,
  Send,
  Loader2,
  Menu
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
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
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
          className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-primary/15 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, -50, 0], 
            y: [0, -100, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-secondary/15 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(var(--primary),0.05)_1px,transparent_1px)] bg-[size:40px_40px]" 
        />
      </div>

      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left" style={{ scaleX }} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glassmorphism px-6 md:px-12 py-3 flex justify-between items-center transition-all border-b border-white/5">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-black tracking-tighter text-primary neon-text-glow"
        >
          MR<span className="text-foreground">.</span>
        </motion.div>
        
        <div className="hidden md:flex gap-8 text-xs font-bold tracking-widest uppercase opacity-80">
          {["About", "Skills", "Experience", "Projects", "Contact"].map((item) => (
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
            className="rounded-full hover:bg-primary/10 transition-colors h-9 w-9"
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden md:flex neumorphic-flat border-none text-[10px] font-black uppercase tracking-widest hover:neon-glow transition-all"
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
            {["About", "Skills", "Experience", "Projects", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-lg font-bold hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <Button className="w-full font-bold" onClick={() => { setIsChatOpen(true); setMobileMenuOpen(false); }}>Ask AI Assistant</Button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 pt-24 pb-12 px-6 md:px-12 max-w-6xl mx-auto space-y-32">
        
        {/* Hero Section */}
        <section id="hero" className="flex flex-col items-center justify-center text-center space-y-8 min-h-[70vh]">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="relative"
          >
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-2 border-primary/20 p-2 neon-glow mb-6 mx-auto relative group">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-t-2 border-primary/40 rounded-full pointer-events-none" 
              />
              <div className="w-full h-full rounded-full bg-muted flex items-center justify-center overflow-hidden relative shadow-2xl transition-transform duration-500 group-hover:scale-105">
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <motion.h1 
              className="text-4xl md:text-7xl font-black tracking-tight leading-tight font-headline"
            >
              Muhammad <span className="text-primary neon-text-glow italic">Rajeel</span>
            </motion.h1>
            <p className="text-lg md:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed opacity-90">
              Full-Stack Architect & <span className="text-foreground font-bold">Agentic AI Explorer</span> crafting high-fidelity digital products.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md"
          >
            <a href="/cv.pdf" download="Muhammad_Rajeel_Siddiqui_CV.pdf" className="w-full">
              <Button size="lg" className="w-full h-12 text-sm font-black uppercase tracking-widest neumorphic-flat border-none hover:neon-glow hover:scale-105 transition-all">
                <Download className="mr-2 h-4 w-4" /> Download CV
              </Button>
            </a>
            <a href="https://github.com/rajeelsiddiqui" target="_blank" rel="noopener noreferrer" className="w-full">
              <Button variant="outline" size="lg" className="w-full h-12 text-sm font-black uppercase tracking-widest glassmorphism border-primary/20 hover:bg-primary/10 hover:scale-105 transition-all">
                <Github className="mr-2 h-4 w-4" /> GitHub
              </Button>
            </a>
          </motion.div>
        </section>

        {/* About Me */}
        <section id="about" className="space-y-12 py-10">
          <SectionHeader title="The Vision" />
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp} className="space-y-6">
              <p className="text-xl text-muted-foreground leading-relaxed">
                Specializing in <span className="text-primary font-bold">React, Next.js, and Django</span>. 
                I focus on building intelligent systems that prioritize user experience and technical excellence.
              </p>
              <div className="grid gap-4">
                <FeatureItem 
                  icon={<Award className="text-secondary h-5 w-5" />}
                  title="Hackathon Winner"
                  desc="Winner of UI/UX implementation hackathon."
                />
                <FeatureItem 
                  icon={<Zap className="text-primary h-5 w-5" />}
                  title="Agentic AI"
                  desc="Developing autonomous AI agents for complex task automation."
                />
              </div>
            </motion.div>
            
            <motion.div 
              {...fadeInUp}
              className="relative aspect-video rounded-2xl overflow-hidden glassmorphism p-8 flex flex-col items-center justify-center border-white/5 group perspective-1000"
            >
               <motion.div
                 whileHover={{ rotateY: 10, rotateX: -5 }}
                 className="space-y-4 text-center transition-all duration-500"
               >
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 neon-glow">
                    <Zap size={32} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-black italic">Intelligence + Logic</h3>
                  <p className="text-muted-foreground text-sm max-w-xs mx-auto opacity-80">Merging generative AI with robust backend architecture to solve real-world problems.</p>
               </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="space-y-12">
          <SectionHeader title="Expertise" />

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <SkillCard 
              title="Frontend" 
              skills={["React", "Next.js", "TypeScript", "Tailwind"]} 
              icon={<Globe className="text-cyan-500 h-5 w-5" />} 
              colorClass="border-cyan-500/20"
            />
            <SkillCard 
              title="Backend" 
              skills={["Node.js", "Django", "Python", "PostgreSQL"]} 
              icon={<Code2 className="text-emerald-500 h-5 w-5" />} 
              colorClass="border-emerald-500/20"
            />
            <SkillCard 
              title="AI / ML" 
              skills={["Agentic AI", "Genkit", "Gemini", "OpenAI"]} 
              icon={<Zap className="text-purple-500 h-5 w-5" />} 
              colorClass="border-purple-500/20"
            />
            <SkillCard 
              title="Infrastructure" 
              skills={["Docker", "AWS", "Vercel", "Firebase"]} 
              icon={<ExternalLink className="text-blue-500 h-5 w-5" />} 
              colorClass="border-blue-500/20"
            />
          </motion.div>
        </section>

        {/* Work Experience */}
        <section id="experience" className="space-y-12">
          <SectionHeader title="Professional" />

          <div className="space-y-6">
            <TimelineItem 
              title="MHN Enterprises"
              period="2025 - Present"
              role="Full Stack Developer"
              bullets={[
                "Architecting dynamic web systems using Laravel and MERN.",
                "Engineering real-time data integrations and optimizations.",
                "Leading frontend strategy with a focus on high-fidelity animations."
              ]}
            />
            <TimelineItem 
              title="Genentech Solutions"
              period="2024"
              role="Full-Stack Engineer"
              bullets={[
                "Developed REST APIs using Django for CMS platforms.",
                "Built SSR frontends with Next.js 14+ for improved SEO.",
                "Optimized database queries for high-traffic environments."
              ]}
            />
          </div>
        </section>

        {/* Projects Grid */}
        <section id="projects" className="space-y-12">
          <SectionHeader title="Selected Work" />

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {PlaceHolderImages.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </section>

        {/* Footer / Contact */}
        <footer id="contact" className="mt-32 pt-16 pb-16 text-center glassmorphism rounded-[2rem] border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent neon-glow"></div>
          <motion.div {...fadeInUp} className="space-y-8 max-w-3xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-black font-headline tracking-tighter">Let's <span className="text-primary italic">Connect</span></h2>
            <p className="text-lg text-muted-foreground font-medium opacity-80">Open to innovative projects and high-impact engineering roles.</p>
            
            <div className="grid grid-cols-3 gap-4 py-8">
              <ContactLink icon={<Mail size={20} />} label="Email" href="mailto:rajeelsiddiqui3@gmail.com" />
              <ContactLink icon={<Linkedin size={20} />} label="LinkedIn" href="https://www.linkedin.com/in/rajeel-siddiqui/" />
              <ContactLink icon={<Github size={20} />} label="GitHub" href="https://github.com/rajeelsiddiqui" />
            </div>

            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[10px] font-black text-muted-foreground tracking-[0.2em] uppercase opacity-50">
                © 2025 Muhammad Rajeel Siddiqui
              </p>
              <div className="flex gap-4 items-center opacity-70">
                 <Globe className="text-primary h-4 w-4" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Karachi, Pakistan</span>
              </div>
            </div>
          </motion.div>
        </footer>
      </main>

      {/* AI Assistant Floating Chat */}
      <div className="fixed bottom-6 right-6 z-[60]">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: 20 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, y: 50, scale: 0.9, rotateX: 20 }}
              className="mb-4 w-[90vw] md:w-[380px] h-[500px] glassmorphism rounded-2xl border border-primary/20 shadow-2xl flex flex-col overflow-hidden perspective-1000"
            >
              <div className="p-4 border-b border-white/5 flex justify-between items-center bg-primary/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center neon-glow">
                    <Zap size={16} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest">Portfolio AI</h4>
                    <p className="text-[8px] text-muted-foreground font-bold tracking-[0.2em] uppercase">Assistant</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(false)} className="rounded-full h-8 w-8">
                  <X size={16} />
                </Button>
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
                {messages.length === 0 && (
                  <div className="text-center py-10 space-y-3">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-2 border border-white/5">
                      <MessageSquare size={24} className="text-primary/40" />
                    </div>
                    <p className="text-muted-foreground font-medium opacity-70">Ask me anything about Rajeel's professional journey!</p>
                  </div>
                )}
                {messages.map((msg, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={i} 
                    className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}
                  >
                    <div className={cn(
                      "max-w-[85%] p-3 rounded-xl",
                      msg.role === 'user' 
                        ? "bg-primary text-primary-foreground rounded-tr-none shadow-md" 
                        : "bg-muted text-foreground rounded-tl-none border border-white/5"
                    )}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted p-3 rounded-xl rounded-tl-none border border-white/5">
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleSendMessage} className="p-4 border-t border-white/5 bg-background/50 flex gap-2">
                <Input 
                  placeholder="Ask a question..." 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="bg-background/80 border-white/10 focus-visible:ring-primary h-10 text-xs rounded-lg"
                />
                <Button type="submit" size="icon" disabled={!chatInput.trim() || isLoading} className="shrink-0 rounded-lg h-10 w-10 shadow-lg hover:scale-105 transition-transform">
                  <Send size={16} />
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button 
            size="icon" 
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={cn(
              "w-14 h-14 rounded-xl shadow-2xl neon-glow transition-all duration-300",
              isChatOpen ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"
            )}
          >
            {isChatOpen ? <X size={24} /> : <MessageSquare size={24} />}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <motion.div {...fadeInUp} className="text-center space-y-3">
      <h2 className="text-3xl md:text-5xl font-black font-headline tracking-tighter uppercase">{title}</h2>
      <div className="w-12 h-1 bg-primary mx-auto rounded-full neon-glow"></div>
    </motion.div>
  );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl glassmorphism border border-white/5 hover:border-primary/20 transition-all hover:translate-x-1">
      <div className="p-2 bg-muted rounded-lg shrink-0">{icon}</div>
      <div>
        <h4 className="font-bold text-sm tracking-tight">{title}</h4>
        <p className="text-muted-foreground text-xs mt-0.5 opacity-80">{desc}</p>
      </div>
    </div>
  );
}

function SkillCard({ title, skills, icon, colorClass }: { title: string, skills: string[], icon: React.ReactNode, colorClass: string }) {
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 15 },
        whileInView: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -5, rotateY: 5 }}
      className={cn(
        "p-6 neumorphic-flat rounded-2xl border transition-all duration-300 perspective-1000",
        colorClass || "border-white/5"
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-background rounded-lg shadow-inner">{icon}</div>
        <h3 className="text-sm font-black uppercase tracking-widest">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <Badge 
            key={skill} 
            variant="secondary" 
            className="px-2 py-0.5 bg-primary/5 hover:bg-primary text-[10px] text-foreground hover:text-primary-foreground transition-all rounded-md font-bold"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </motion.div>
  );
}

function TimelineItem({ title, period, role, bullets }: { title: string, period: string, role: string, bullets: string[] }) {
  return (
    <motion.div 
      {...fadeInUp}
      whileHover={{ scale: 1.005 }}
      className="p-8 neumorphic-flat rounded-2xl border border-white/5 relative group transition-all"
    >
      <div className="absolute top-0 left-8 w-8 h-0.5 bg-primary group-hover:w-16 transition-all" />
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
        <div>
          <h3 className="text-2xl font-black text-primary italic leading-none">{title}</h3>
          <p className="text-[10px] font-black text-secondary tracking-[0.2em] uppercase mt-2">{role}</p>
        </div>
        <Badge variant="outline" className="w-fit text-[10px] font-black px-3 py-1 bg-background uppercase tracking-widest">{period}</Badge>
      </div>
      <ul className="space-y-2">
        {bullets.map((bullet, idx) => (
          <li key={idx} className="flex gap-3 text-muted-foreground text-sm opacity-90">
            <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span className="leading-relaxed">{bullet}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function ProjectCard({ project }: { project: any }) {
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -8 }}
      className="neumorphic-flat rounded-2xl overflow-hidden group border border-white/5 transition-all duration-500 shadow-xl"
    >
      <div className="relative h-60 overflow-hidden">
        <Image 
          src={project.imageUrl} 
          alt={project.description} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          data-ai-hint={project.imageHint}
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4 backdrop-blur-sm">
          <a href="https://github.com/rajeelsiddiqui" target="_blank" rel="noopener noreferrer">
            <Button size="icon" variant="secondary" className="rounded-xl hover:neon-glow h-10 w-10 p-0 shadow-2xl">
              <Github size={18} />
            </Button>
          </a>
          <Button size="icon" variant="secondary" className="rounded-xl hover:neon-glow h-10 w-10 p-0 shadow-2xl">
            <ExternalLink size={18} />
          </Button>
        </div>
      </div>
      <div className="p-6 space-y-3">
        <h4 className="text-lg font-black leading-tight group-hover:text-primary transition-colors">{project.description}</h4>
        <div className="flex gap-2">
          <Badge className="bg-primary/10 text-primary border-none font-black text-[9px] px-2 py-0.5 uppercase">Next.js</Badge>
          <Badge className="bg-secondary/10 text-secondary border-none font-black text-[9px] px-2 py-0.5 uppercase">Full Stack</Badge>
        </div>
      </div>
    </motion.div>
  );
}

function ContactLink({ icon, label, href }: { icon: React.ReactNode, label: string, href: string }) {
  return (
    <motion.a 
      whileHover={{ scale: 1.05, y: -5 }}
      href={href} 
      className="group p-4 flex flex-col items-center gap-2 transition-all glassmorphism rounded-xl border border-white/5 hover:border-primary/20"
    >
      <div className="text-primary p-3 bg-background rounded-lg shadow-md group-hover:neon-glow transition-all">{icon}</div>
      <span className="text-[9px] font-black tracking-widest uppercase opacity-70 group-hover:opacity-100">{label}</span>
    </motion.a>
  );
}
