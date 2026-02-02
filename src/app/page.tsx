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
  GraduationCap,
  Database,
  Layers,
  Cpu,
  ArrowUpRight,
  Terminal,
  Server,
  Cloud,
  Wrench,
  Smartphone
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef, useMemo } from "react";
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

const categories = ["All", "Frontend", "Backend", "Fullstack", "AI", "Mobile App"];

export default function PortfolioPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<{ role: 'user' | 'model', content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
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

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return PlaceHolderImages;
    return PlaceHolderImages.filter(p => (p as any).category === activeCategory);
  }, [activeCategory]);

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
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50 glassmorphism px-4 md:px-8 py-2 md:py-3 flex justify-between items-center border border-white/10 rounded-2xl shadow-2xl transition-all duration-300">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-black tracking-tighter text-primary neon-text-glow cursor-pointer"
        >
          RAJEEL<span className="text-foreground">.</span>
        </motion.div>
        
        <div className="hidden md:flex gap-8 text-[10px] font-black tracking-[0.2em] uppercase">
          {["About", "Skills", "Experience", "Education", "Projects", "Contact"].map((item) => (
            <motion.a 
              whileHover={{ y: -2 }}
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="hover:text-primary transition-colors relative group opacity-60 hover:opacity-100"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="rounded-full h-9 w-9 hover:bg-primary/10 hover:text-primary transition-all"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="hidden md:flex h-9 rounded-xl text-[10px] font-black uppercase tracking-widest px-6"
            onClick={() => setIsChatOpen(true)}
          >
            Connect AI
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
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-[90%] bg-background/95 backdrop-blur-2xl z-40 border border-primary/10 rounded-3xl md:hidden flex flex-col p-8 gap-6 shadow-2xl"
          >
            {["About", "Skills", "Experience", "Education", "Projects", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-sm font-black uppercase tracking-widest hover:text-primary transition-colors flex items-center justify-between group"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
                <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
            <Button className="w-full font-bold h-12 rounded-xl" onClick={() => { setIsChatOpen(true); setMobileMenuOpen(false); }}>Ask AI Assistant</Button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 pt-32 pb-12 px-6 md:px-12 max-w-5xl mx-auto space-y-32">
        
        {/* Hero Section */}
        <section id="hero" className="flex flex-col items-center justify-center text-center space-y-10 min-h-[60vh]">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-full border-2 border-primary/20 p-2 neon-glow mb-8 mx-auto relative group">
              <div className="w-full h-full rounded-full bg-muted flex items-center justify-center overflow-hidden relative shadow-2xl">
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
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tight font-headline leading-[1.1]">
              Muhammad <span className="text-primary italic">Rajeel</span>
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto opacity-80 leading-relaxed">
              Full-Stack Architect & <span className="text-foreground font-bold underline decoration-primary/50 decoration-2 underline-offset-4">Agentic AI Explorer</span>.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col sm:flex-row gap-5 justify-center w-full max-w-sm mx-auto"
          >
            <a href="/cv.pdf" download className="w-full">
              <Button size="lg" className="w-full h-12 text-[11px] font-black uppercase tracking-widest rounded-xl shadow-xl hover:neon-glow transition-all">
                <Download className="mr-2 h-4 w-4" /> Download CV
              </Button>
            </a>
            <a href="https://github.com/rajeelsiddiqui" target="_blank" rel="noopener noreferrer" className="w-full">
              <Button variant="outline" size="lg" className="w-full h-12 text-[11px] font-black uppercase tracking-widest rounded-xl glassmorphism border-primary/20 transition-all hover:bg-primary/5">
                <Github className="mr-2 h-4 w-4" /> GitHub Profile
              </Button>
            </a>
          </motion.div>
        </section>

        {/* About Me */}
        <section id="about" className="space-y-12">
          <SectionHeader title="The Vision" />
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp} className="space-y-8">
              <p className="text-xl text-muted-foreground leading-relaxed">
                Specializing in <span className="text-primary font-bold">React, Next.js, and Laravel</span>. 
                I focus on building intelligent systems that prioritize user experience and technical excellence.
              </p>
              <div className="grid gap-4">
                <FeatureItem 
                  icon={<Award className="text-secondary h-5 w-5" />}
                  title="TechWaze 3rd Position"
                  desc="Secured 3rd position in TechWaze competition at Aptech. I was responsible for the AI development for the team."
                />
                <FeatureItem 
                  icon={<Zap className="text-primary h-5 w-5" />}
                  title="Agentic AI"
                  desc="Developing autonomous AI agents using Genkit."
                />
              </div>
            </motion.div>
            
            <motion.div 
              {...fadeInUp}
              className="relative aspect-video rounded-3xl overflow-hidden glassmorphism p-10 flex flex-col items-center justify-center border border-white/10 shadow-2xl"
            >
               <div className="space-y-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 neon-glow border border-primary/20">
                    <Zap size={32} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-black italic">Intelligence + Logic</h3>
                  <p className="text-muted-foreground text-sm max-w-[240px] mx-auto opacity-70">Merging Agentic AI with robust backend architecture.</p>
               </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="space-y-12">
          <SectionHeader title="Skills" />
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <SkillCard 
              title="Frontend & UI" 
              skills={["HTML", "CSS", "JavaScript", "Bootstrap", "Reactjs", "Shadcn", "Aceternity", "DaisyUI"]} 
              icon={<Globe size={24} className="text-cyan-400" />} 
              borderColor="border-cyan-500/30" 
            />
            <SkillCard 
              title="Backend & Full Stack" 
              skills={["Node", "Python", "Nextjs", "Django", "MERN"]} 
              icon={<Server size={24} className="text-emerald-400" />} 
              borderColor="border-emerald-500/30" 
            />
            <SkillCard 
              title="Databases & AI" 
              skills={["MySQL", "MySQL Lite", "MONGODB", "GENAI", "AGENTIC AI"]} 
              icon={<Database size={24} className="text-purple-400" />} 
              borderColor="border-purple-500/30" 
            />
            <SkillCard 
              title="DevOps & Cloud" 
              skills={["VPS", "AWS", "Docker", "Git", "GitHub", "Postman"]} 
              icon={<Cloud size={24} className="text-blue-400" />} 
              borderColor="border-blue-500/30" 
            />
            <SkillCard 
              title="Libraries" 
              skills={["Zod", "React-hooks-form", "BcryptJs", "Pydantic", "Streamlit"]} 
              icon={<Wrench size={24} className="text-orange-400" />} 
              borderColor="border-orange-500/30" 
            />
            <SkillCard 
              title="Specialized AI" 
              skills={["Genkit", "Gemini", "LLMs", "Autonomous Agents"]} 
              icon={<Cpu size={24} className="text-red-400" />} 
              borderColor="border-red-500/30" 
            />
          </motion.div>
        </section>

        {/* Work Experience */}
        <section id="experience" className="space-y-12">
          <SectionHeader title="Work Experience" />
          <div className="space-y-6">
            <TimelineItem 
              title="MHN Enterprises" 
              period="Jan 2025 - Present" 
              role="Full Stack Developer" 
              bullets={[
                "Developing dynamic web pages with Laravel Blade, Nextjs and MERN stack.",
                "Integrating backend data with frontend views.",
                "Writing clean, efficient and scalable code.",
                "Collaborating to implement and enhance features."
              ]} 
            />
            <TimelineItem 
              title="Genentech Solutions" 
              period="October - December 2024, 3 months" 
              role="Full-Stack Developer" 
              bullets={[
                "Working as a Full-Stack Developer at Genentech Solutions",
                "Using Django for back-end development",
                "Using Next.js for front-end development",
                "Creating RESTful APIs",
                "Optimizing application performance"
              ]} 
            />
            <TimelineItem 
              title="Hakam Techsoul" 
              period="August - September 2024, 2 months" 
              role="React Developer" 
              bullets={[
                "Worked as a React Developer at Hakam Techsoul",
                "Built static user interfaces using React and JSX",
                "Collaborated with designers to enhance UX",
                "Improved application performance"
              ]} 
            />
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="space-y-12">
          <SectionHeader title="Education" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <EducationCard 
              title="Diploma in Web Development"
              institution="Aptech"
              status="In Progress"
              icon={<GraduationCap className="text-primary" size={24} />}
            />
            <EducationCard 
              title="Agentic AI Course"
              institution="PIAIC"
              status="Quarter 2 of 6"
              desc="Comprehensive program on Agentic Artificial Intelligence and LLMs."
              icon={<Zap className="text-purple-500" size={24} />}
            />
            <EducationCard 
              title="Intermediate (ICS)"
              institution="Completed 1st Year"
              desc="Specialized in Computer Science."
              icon={<BookOpen className="text-blue-500" size={24} />}
            />
            <EducationCard 
              title="Hifz-ul-Quran"
              institution="Completed"
              status="2021"
              icon={<Award className="text-secondary" size={24} />}
            />
            <EducationCard 
              title="Matriculation"
              institution="Alkamran Public School"
              status="2022 - 2023"
              icon={<GraduationCap className="text-muted-foreground" size={24} />}
            />
          </div>
        </section>

        {/* Projects Grid */}
        <section id="projects" className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeader title="Projects" />
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button 
                  key={cat}
                  variant={activeCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "text-[10px] font-black uppercase tracking-widest rounded-full px-4 h-8 transition-all",
                    activeCategory === cat ? "shadow-lg neon-glow" : "opacity-60 hover:opacity-100"
                  )}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Footer */}
        <footer id="contact" className="pt-24 pb-16 text-center glassmorphism rounded-[3rem] border border-white/10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          <motion.div {...fadeInUp} className="space-y-10 max-w-2xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-black font-headline tracking-tighter">Let's <span className="text-primary italic">Connect</span></h2>
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              <ContactLink icon={<Mail size={20} />} label="Email" href="mailto:rajeelsiddiqui3@gmail.com" />
              <ContactLink icon={<Linkedin size={20} />} label="LinkedIn" href="https://www.linkedin.com/in/rajeel-siddiqui/" />
              <ContactLink icon={<Github size={20} />} label="GitHub" href="https://github.com/rajeelsiddiqui" />
            </div>
            <p className="text-[10px] font-black text-muted-foreground tracking-[0.3em] uppercase opacity-40">© 2025 Muhammad Rajeel Siddiqui • Engineered with Passion</p>
          </motion.div>
        </footer>
      </main>

      {/* AI Assistant */}
      <div className="fixed bottom-8 right-8 z-[60]">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" }}
              className="mb-6 w-[90vw] md:w-[360px] h-[500px] glassmorphism rounded-3xl border border-primary/30 shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/10"
            >
              <div className="p-4 border-b border-white/10 flex justify-between items-center bg-primary/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg">
                    <Cpu size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-black uppercase tracking-widest leading-none">Rajeel AI</span>
                    <span className="text-[8px] opacity-60 font-medium">Always Online</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(false)} className="h-8 w-8 rounded-full hover:bg-white/10">
                  <X size={16} />
                </Button>
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
                {messages.length === 0 && (
                  <div className="text-center py-10 opacity-40 italic">Ask me about Rajeel's projects, skills, or experience!</div>
                )}
                {messages.map((msg, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={i} 
                    className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}
                  >
                    <div className={cn(
                      "max-w-[85%] p-3 rounded-2xl shadow-sm", 
                      msg.role === 'user' 
                        ? "bg-primary text-primary-foreground rounded-tr-none" 
                        : "bg-muted text-foreground border border-white/5 rounded-tl-none"
                    )}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted p-3 rounded-2xl rounded-tl-none border border-white/5">
                      <Loader2 className="h-4 w-4 animate-spin opacity-50" />
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-background/50 flex gap-3">
                <Input 
                  placeholder="Type a question..." 
                  value={chatInput} 
                  onChange={(e) => setChatInput(e.target.value)} 
                  className="h-11 rounded-xl text-xs bg-muted/50 border-white/5 focus-visible:ring-primary/30" 
                />
                <Button type="submit" size="icon" className="h-11 w-11 rounded-xl shadow-lg shrink-0">
                  <Send size={18} />
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsChatOpen(!isChatOpen)} 
          className="w-16 h-16 rounded-full shadow-2xl neon-glow bg-primary text-primary-foreground flex items-center justify-center transition-all"
        >
          {isChatOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </motion.button>
      </div>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <motion.div {...fadeInUp} className="space-y-4">
      <h2 className="text-3xl md:text-4xl font-black font-headline tracking-widest uppercase">{title}</h2>
      <div className="w-16 h-1 bg-primary rounded-full neon-glow"></div>
    </motion.div>
  );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-4 p-5 rounded-2xl glassmorphism border border-white/10 hover:border-primary/20 transition-all group">
      <div className="shrink-0 mt-1 p-2 rounded-xl bg-primary/5 text-primary transition-all group-hover:scale-110">{icon}</div>
      <div>
        <h4 className="font-black text-xs uppercase tracking-widest group-hover:text-primary transition-colors">{title}</h4>
        <p className="text-muted-foreground text-[11px] leading-relaxed mt-1 opacity-70">{desc}</p>
      </div>
    </div>
  );
}

function SkillCard({ title, skills, icon, borderColor }: { title: string, skills: string[], icon: React.ReactNode, borderColor: string }) {
  return (
    <motion.div 
      variants={fadeInUp} 
      className={cn(
        "p-8 rounded-3xl border bg-card/40 backdrop-blur-md transition-all hover:bg-card/60 hover:shadow-2xl group", 
        borderColor
      )}
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 rounded-2xl bg-background/50 shadow-inner group-hover:scale-110 transition-transform">{icon}</div>
        <h3 className="text-sm font-black uppercase tracking-[0.2em] opacity-80">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {skills.map((s) => (
          <Badge 
            key={s} 
            variant="outline" 
            className="text-[10px] px-3.5 py-1 rounded-full bg-background/40 border-white/10 font-bold tracking-tight opacity-60 hover:opacity-100 hover:bg-primary/10 hover:border-primary/30 transition-all cursor-default"
          >
            {s}
          </Badge>
        ))}
      </div>
    </motion.div>
  );
}

function EducationCard({ title, institution, status, desc, icon }: { title: string, institution: string, status?: string, desc?: string, icon: React.ReactNode }) {
  return (
    <motion.div {...fadeInUp} className="p-6 neumorphic-flat rounded-3xl border border-white/5 space-y-4 hover:shadow-xl transition-all group">
      <div className="flex justify-between items-start gap-3">
        <div className="p-3 bg-background rounded-2xl shadow-lg transition-all group-hover:scale-110">{icon}</div>
        {status && <Badge className="text-[9px] font-black uppercase tracking-[0.2em] py-1 px-3 rounded-lg shadow-sm">{status}</Badge>}
      </div>
      <div>
        <h4 className="text-sm font-black uppercase tracking-wider leading-tight group-hover:text-primary transition-colors">{title}</h4>
        <p className="text-xs text-primary font-bold mt-1">{institution}</p>
        {desc && <p className="text-[11px] text-muted-foreground mt-3 leisure-relaxed opacity-70">{desc}</p>}
      </div>
    </motion.div>
  );
}

function TimelineItem({ title, period, role, bullets }: { title: string, period: string, role: string, bullets: string[] }) {
  return (
    <motion.div {...fadeInUp} className="p-8 neumorphic-flat rounded-[2.5rem] border border-white/5 relative group hover:shadow-2xl transition-all">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h3 className="text-2xl font-black text-primary italic leading-none group-hover:neon-text-glow transition-all">{title}</h3>
          <p className="text-[10px] font-black text-secondary tracking-[0.25em] uppercase mt-2">{role}</p>
        </div>
        <Badge variant="outline" className="w-fit text-[10px] font-black uppercase px-4 py-1.5 rounded-full border-primary/20 bg-primary/5 text-primary">{period}</Badge>
      </div>
      <ul className="space-y-3">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-4 text-muted-foreground text-xs leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
            <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function ProjectCard({ project }: { project: any }) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="neumorphic-flat rounded-[2rem] overflow-hidden group border border-white/5 hover:shadow-2xl transition-all bg-card/20"
    >
      <div className="relative h-56 overflow-hidden">
        <Image src={project.imageUrl} alt={project.description} fill className="object-cover transition-transform duration-700 group-hover:scale-110" data-ai-hint={project.imageHint} />
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-5 backdrop-blur-md">
          <Button size="icon" variant="secondary" className="h-12 w-12 rounded-full shadow-lg hover:scale-110 transition-transform"><Github size={20} /></Button>
          <Button size="icon" variant="secondary" className="h-12 w-12 rounded-full shadow-lg hover:scale-110 transition-transform"><ExternalLink size={20} /></Button>
        </div>
        <div className="absolute top-4 left-4">
          <Badge className="text-[8px] font-black uppercase tracking-widest bg-primary/90 text-primary-foreground backdrop-blur-md border-none px-3 py-1">
            {project.category}
          </Badge>
        </div>
      </div>
      <div className="p-8">
        <h4 className="text-sm font-black uppercase tracking-widest leading-relaxed group-hover:text-primary transition-colors">{project.description}</h4>
        <div className="mt-4 flex gap-2">
          {project.category === "Fullstack" && <Badge variant="outline" className="text-[8px] uppercase tracking-widest opacity-40">MERN Stack</Badge>}
          {project.category === "AI" && <Badge variant="outline" className="text-[8px] uppercase tracking-widest opacity-40">Genkit</Badge>}
          {project.category === "Mobile App" && <Badge variant="outline" className="text-[8px] uppercase tracking-widest opacity-40">React Native</Badge>}
          <Badge variant="outline" className="text-[8px] uppercase tracking-widest opacity-40">TypeScript</Badge>
        </div>
      </div>
    </motion.div>
  );
}

function ContactLink({ icon, label, href }: { icon: React.ReactNode, label: string, href: string }) {
  return (
    <motion.a 
      whileHover={{ y: -5, scale: 1.05 }} 
      href={href} 
      className="flex flex-col items-center gap-3 p-6 glassmorphism rounded-3xl border border-white/5 hover:border-primary/30 transition-all shadow-lg group"
    >
      <div className="text-primary p-3 bg-primary/10 rounded-2xl group-hover:shadow-xl transition-all">{icon}</div>
      <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 group-hover:opacity-100 transition-opacity">{label}</span>
    </motion.a>
  );
}
