"use client";

import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
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
    <div className="min-h-screen bg-background text-foreground font-body transition-colors duration-500 relative bg-mesh">
      {/* Background Orbs */}
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
      <nav className="fixed top-0 w-full z-50 glassmorphism px-6 md:px-12 py-4 flex justify-between items-center transition-all">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-black tracking-tighter text-primary neon-text-glow"
        >
          MR<span className="text-foreground">.</span>
        </motion.div>
        
        <div className="hidden md:flex gap-8 text-sm font-semibold tracking-wide uppercase">
          {["About", "Skills", "Experience", "Projects", "Contact"].map((item) => (
            <motion.a 
              whileHover={{ y: -2 }}
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
            className="rounded-full hover:bg-primary/10 transition-colors"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden md:flex neumorphic-flat border-none text-xs hover:neon-glow transition-all"
            onClick={() => setIsChatOpen(true)}
          >
            Ask AI Assistant
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-16 left-0 w-full bg-background/95 backdrop-blur-xl z-40 border-b border-primary/10 md:hidden flex flex-col p-6 gap-6"
          >
            {["About", "Skills", "Experience", "Projects", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-lg font-bold hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <Button onClick={() => { setIsChatOpen(true); setMobileMenuOpen(false); }}>Ask AI Assistant</Button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 pt-32 pb-12 px-6 md:px-12 max-w-7xl mx-auto space-y-40">
        
        {/* Hero Section */}
        <section id="hero" className="flex flex-col items-center justify-center text-center space-y-10 min-h-[80vh]">
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="relative"
          >
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-primary/30 p-2 neon-glow mb-8 mx-auto relative group">
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
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-t-4 border-primary rounded-full pointer-events-none opacity-50" 
              />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.h1 
              className="text-5xl md:text-8xl font-black tracking-tight leading-none font-headline"
            >
              Muhammad <span className="text-primary neon-text-glow italic">Rajeel</span>
            </motion.h1>
            <p className="text-xl md:text-3xl text-muted-foreground font-medium max-w-3xl mx-auto leading-relaxed">
              Full-Stack Architect & <span className="text-foreground font-bold">Agentic AI Explorer</span> crafting premium digital experiences.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-lg"
          >
            <a href="/cv.pdf" download="Muhammad_Rajeel_Siddiqui_CV.pdf" className="w-full">
              <Button size="lg" className="w-full h-14 text-lg font-bold neumorphic-flat border-none hover:neon-glow hover:scale-105 transition-all">
                <Download className="mr-2 h-5 w-5" /> Download CV
              </Button>
            </a>
            <a href="https://github.com/rajeelsiddiqui" target="_blank" rel="noopener noreferrer" className="w-full">
              <Button variant="outline" size="lg" className="w-full h-14 text-lg font-bold glassmorphism border-primary/20 hover:bg-primary/10 hover:scale-105 transition-all">
                <Github className="mr-2 h-5 w-5" /> GitHub
              </Button>
            </a>
          </motion.div>
        </section>

        {/* About Me */}
        <section id="about" className="space-y-16 py-20">
          <SectionHeader title="About My Vision" />
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp} className="space-y-8">
              <p className="text-2xl text-muted-foreground leading-relaxed">
                Expert in <span className="text-primary font-black border-b-2 border-primary/20">React, Next.js, and Django</span>. 
                I bridge the gap between high-level AI concepts and scalable web reality.
              </p>
              <div className="space-y-6">
                <FeatureItem 
                  icon={<Award className="text-secondary" />}
                  title="Hackathon Winner"
                  desc="Ranked #1 in UI/UX implementation and design fidelity."
                />
                <FeatureItem 
                  icon={<Zap className="text-primary" />}
                  title="Problem Solver"
                  desc="Transforming complex backend logic into seamless client interactions."
                />
              </div>
            </motion.div>
            
            <motion.div 
              {...fadeInUp}
              className="relative aspect-square md:aspect-video rounded-3xl overflow-hidden glassmorphism p-12 flex flex-col items-center justify-center border-primary/10 group cursor-default"
            >
               <motion.div
                 whileHover={{ scale: 1.1, rotate: 5 }}
                 className="space-y-6 text-center"
               >
                  <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 neon-glow">
                    <Zap size={48} className="text-primary" />
                  </div>
                  <h3 className="text-3xl font-black">Agentic Thinking</h3>
                  <p className="text-muted-foreground max-w-sm">Not just building apps, but building intelligent systems that act and adapt.</p>
               </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="space-y-16">
          <SectionHeader title="Core Expertise" />

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <SkillCard 
              title="Frontend" 
              skills={["React", "Next.js", "TypeScript", "Tailwind", "Framer"]} 
              icon={<Globe className="text-cyan-500" />} 
              colorClass="border-cyan-500/20"
            />
            <SkillCard 
              title="Backend" 
              skills={["Node.js", "Django", "Python", "Laravel", "PostgreSQL"]} 
              icon={<Code2 className="text-emerald-500" />} 
              colorClass="border-emerald-500/20"
            />
            <SkillCard 
              title="AI & Data" 
              skills={["Agentic AI", "Genkit", "Gemini", "MongoDB"]} 
              icon={<Zap className="text-purple-500" />} 
              colorClass="border-purple-500/20"
            />
            <SkillCard 
              title="DevOps" 
              skills={["Docker", "AWS", "Vercel", "Firebase"]} 
              icon={<ExternalLink className="text-blue-500" />} 
              colorClass="border-blue-500/20"
            />
          </motion.div>
        </section>

        {/* Work Experience */}
        <section id="experience" className="space-y-16">
          <SectionHeader title="Professional Journey" />

          <div className="space-y-10">
            <TimelineItem 
              title="MHN Enterprises"
              period="Jan 2025 - Present"
              role="Full Stack Architect"
              bullets={[
                "Architecting large-scale dynamic web systems using Laravel and MERN.",
                "Engineering real-time data integrations with high-fidelity performance optimization.",
                "Leading frontend strategy with a focus on premium animations and accessibility.",
                "Mentoring junior developers on modern Next.js patterns."
              ]}
            />
            <TimelineItem 
              title="Genentech Solutions"
              period="Oct - Dec 2024"
              role="Full-Stack Engineer"
              bullets={[
                "Developed robust backend REST APIs using Django for content management.",
                "Built high-performance SSR frontends with Next.js 14+.",
                "Optimized database queries reducing load times by 40%.",
                "Implemented complex state management for data-heavy dashboards."
              ]}
            />
          </div>
        </section>

        {/* Projects Grid */}
        <section id="projects" className="space-y-16">
          <SectionHeader title="Selected Works" />

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            {PlaceHolderImages.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </section>

        {/* Footer / Contact */}
        <footer id="contact" className="mt-40 pt-20 pb-20 text-center glassmorphism rounded-[3rem] border border-primary/10 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent neon-glow"></div>
          <motion.div {...fadeInUp} className="space-y-12 max-w-4xl mx-auto px-6">
            <h2 className="text-5xl md:text-7xl font-black font-headline tracking-tighter">Ready to <span className="text-primary italic">Collaborate?</span></h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">Currently open to freelance projects and high-impact engineering roles.</p>
            
            <div className="grid sm:grid-cols-3 gap-8 py-10">
              <ContactLink icon={<Mail size={28} />} label="Email" href="mailto:rajeelsiddiqui3@gmail.com" />
              <ContactLink icon={<Linkedin size={28} />} label="LinkedIn" href="https://www.linkedin.com/in/rajeel-siddiqui/" />
              <ContactLink icon={<Github size={28} />} label="GitHub" href="https://github.com/rajeelsiddiqui" />
            </div>

            <div className="pt-10 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-sm font-bold text-muted-foreground opacity-70 tracking-widest uppercase">
                © 2025 Muhammad Rajeel Siddiqui
              </p>
              <div className="flex gap-8">
                 <Globe className="text-primary animate-spin-slow h-5 w-5" />
                 <span className="text-sm font-bold">Based in Karachi, Global Mindset</span>
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
              initial={{ opacity: 0, y: 50, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, y: 50, scale: 0.8, rotate: -5 }}
              className="mb-4 w-[90vw] md:w-[420px] h-[550px] glassmorphism rounded-3xl border border-primary/20 shadow-2xl flex flex-col overflow-hidden ring-1 ring-primary/10"
            >
              <div className="p-6 border-b border-primary/10 flex justify-between items-center bg-primary/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center neon-glow">
                    <Zap size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-md font-black">Portfolio AI</h4>
                    <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">Intelligent Assistant</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(false)} className="rounded-full">
                  <X size={20} />
                </Button>
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.length === 0 && (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/10">
                      <MessageSquare size={32} className="text-primary/40" />
                    </div>
                    <p className="text-md font-medium text-muted-foreground">Ask me about Rajeel's experience, skills, or even his Quran Hifz journey!</p>
                  </div>
                )}
                {messages.map((msg, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={i} 
                    className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}
                  >
                    <div className={cn(
                      "max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed",
                      msg.role === 'user' 
                        ? "bg-primary text-primary-foreground rounded-tr-none shadow-lg" 
                        : "bg-muted text-foreground rounded-tl-none border border-primary/10"
                    )}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted p-4 rounded-2xl rounded-tl-none border border-primary/5">
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleSendMessage} className="p-6 border-t border-primary/10 bg-background/50 flex gap-3">
                <Input 
                  placeholder="Ask a question..." 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="bg-background/80 border-primary/10 focus-visible:ring-primary h-12 rounded-xl"
                />
                <Button type="submit" size="icon" disabled={!chatInput.trim() || isLoading} className="shrink-0 rounded-xl h-12 w-12 shadow-lg hover:scale-110 transition-transform">
                  <Send size={20} />
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
              "w-16 h-16 rounded-2xl shadow-2xl neon-glow transition-all duration-300",
              isChatOpen ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"
            )}
          >
            {isChatOpen ? <X size={28} /> : <MessageSquare size={28} />}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <motion.div {...fadeInUp} className="text-center space-y-4">
      <h2 className="text-4xl md:text-6xl font-black font-headline tracking-tighter">{title}</h2>
      <div className="w-24 h-2 bg-primary mx-auto rounded-full neon-glow"></div>
    </motion.div>
  );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-6 p-6 rounded-2xl glassmorphism border border-primary/5 hover:border-primary/20 transition-all hover:translate-x-2">
      <div className="p-3 bg-muted rounded-xl">{icon}</div>
      <div>
        <h4 className="font-black text-xl">{title}</h4>
        <p className="text-muted-foreground mt-1">{desc}</p>
      </div>
    </div>
  );
}

function SkillCard({ title, skills, icon, colorClass }: { title: string, skills: string[], icon: React.ReactNode, colorClass: string }) {
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, scale: 0.9, y: 20 },
        whileInView: { opacity: 1, scale: 1, y: 0 }
      }}
      whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
      className={cn(
        "p-8 neumorphic-flat rounded-[2rem] border transition-all duration-300 perspective-1000",
        colorClass || "border-primary/5"
      )}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-background rounded-xl shadow-inner">{icon}</div>
        <h3 className="text-xl font-black">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge 
            key={skill} 
            variant="secondary" 
            className="px-3 py-1 bg-primary/5 hover:bg-primary text-foreground hover:text-primary-foreground transition-all rounded-lg font-bold"
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
      whileHover={{ scale: 1.01 }}
      className="p-10 neumorphic-flat rounded-[2.5rem] border border-primary/5 relative group transition-all"
    >
      <div className="absolute top-0 left-10 w-10 h-1 bg-primary group-hover:w-20 transition-all" />
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h3 className="text-3xl font-black text-primary italic">{title}</h3>
          <p className="text-lg font-bold text-secondary tracking-wide uppercase mt-1">{role}</p>
        </div>
        <Badge variant="outline" className="w-fit text-sm font-black px-4 py-2 bg-background">{period}</Badge>
      </div>
      <ul className="space-y-4">
        {bullets.map((bullet, idx) => (
          <li key={idx} className="flex gap-4 text-muted-foreground text-lg">
            <ChevronRight className="h-6 w-6 text-primary shrink-0 mt-0.5" />
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
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -15 }}
      className="neumorphic-flat rounded-[2.5rem] overflow-hidden group border border-primary/5 transition-all duration-500 shadow-xl"
    >
      <div className="relative h-80 overflow-hidden">
        <Image 
          src={project.imageUrl} 
          alt={project.description} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          data-ai-hint={project.imageHint}
        />
        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-6 backdrop-blur-sm">
          <a href="https://github.com/rajeelsiddiqui" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="secondary" className="rounded-2xl hover:neon-glow h-14 w-14 p-0 shadow-2xl">
              <Github size={24} />
            </Button>
          </a>
          <Button size="lg" variant="secondary" className="rounded-2xl hover:neon-glow h-14 w-14 p-0 shadow-2xl">
            <ExternalLink size={24} />
          </Button>
        </div>
      </div>
      <div className="p-10 space-y-6">
        <h4 className="text-2xl font-black leading-tight group-hover:text-primary transition-colors">{project.description}</h4>
        <div className="flex gap-3">
          <Badge className="bg-primary/10 text-primary border-none font-black px-4 py-1">Next.js</Badge>
          <Badge className="bg-secondary/10 text-secondary border-none font-black px-4 py-1">Full Stack</Badge>
        </div>
      </div>
    </motion.div>
  );
}

function ContactLink({ icon, label, href }: { icon: React.ReactNode, label: string, href: string }) {
  return (
    <motion.a 
      whileHover={{ scale: 1.1, rotate: -3 }}
      href={href} 
      className="group p-8 flex flex-col items-center gap-4 transition-all glassmorphism rounded-3xl border border-primary/5 hover:border-primary/20"
    >
      <div className="text-primary p-4 bg-background rounded-2xl shadow-lg group-hover:neon-glow transition-all">{icon}</div>
      <span className="text-md font-black tracking-widest uppercase">{label}</span>
    </motion.a>
  );
}