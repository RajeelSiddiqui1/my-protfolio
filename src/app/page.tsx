
"use client";

import { motion } from "framer-motion";
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
  ChevronRight
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glassmorphism px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold tracking-tighter text-primary neon-text-glow">
          MR<span className="text-foreground">.</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium">
          {["About", "Skills", "Experience", "Education", "Projects", "Contact"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="hover:text-primary transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
        <Button variant="outline" size="sm" className="neumorphic-flat border-none text-xs hover:neon-glow">
          Let's Chat
        </Button>
      </nav>

      <main className="pt-24 pb-12 px-6 max-w-6xl mx-auto space-y-32">
        {/* Hero Section */}
        <section id="hero" className="flex flex-col items-center justify-center text-center space-y-8 min-h-[70vh]">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="w-32 h-32 rounded-full border-2 border-primary/20 p-2 neon-glow mb-8 mx-auto">
              <div className="w-full h-full rounded-full bg-muted flex items-center justify-center overflow-hidden">
                <User size={64} className="text-primary opacity-50" />
              </div>
            </div>
          </motion.div>
          
          <motion.div {...fadeIn} className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground font-headline">
              Muhammad <span className="text-primary neon-text-glow">Rajeel</span> Siddiqui
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Full-Stack Developer Specializing in React, Next.js, and Django.
            </p>
          </motion.div>

          <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="flex gap-4 flex-wrap justify-center">
            <Button className="h-12 px-8 neumorphic-flat border-none hover:neon-glow transition-all">
              <Download className="mr-2 h-4 w-4" /> Download CV
            </Button>
            <Button variant="outline" className="h-12 px-8 glassmorphism border-primary/20 hover:bg-primary/10">
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Button>
          </motion.div>
        </section>

        {/* About Me */}
        <section id="about" className="space-y-12">
          <motion.div {...fadeIn} className="text-center">
            <h2 className="text-3xl font-bold mb-4 font-headline">About Me</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full neon-glow"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div {...fadeIn} className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Expertise in <span className="text-primary font-semibold">React.js, Next.js, and Django</span>. 
                Passionate about creating fluid user experiences and robust backend systems.
              </p>
              <div className="p-6 neumorphic-flat rounded-2xl border border-primary/10">
                <div className="flex items-start gap-4">
                  <Award className="text-secondary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-secondary">HTML/CSS Hackathon Winner</h4>
                    <p className="text-sm text-muted-foreground mt-1">Recognized for excellence in design implementation and clean coding standards.</p>
                  </div>
                </div>
              </div>
              <div className="p-6 glassmorphism rounded-2xl border border-primary/5">
                <div className="flex items-start gap-4">
                  <Zap size={24} className="text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-primary">Problem Solver</h4>
                    <p className="text-sm text-muted-foreground mt-1">Focused on building scalable solutions for complex web challenges.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div {...fadeIn} className="relative aspect-square md:aspect-video rounded-3xl overflow-hidden glassmorphism p-8 flex items-center justify-center">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
               <div className="text-center space-y-4">
                  <Zap size={48} className="mx-auto text-primary animate-pulse" />
                  <p className="font-bold text-xl">Turning complex ideas into interactive realities</p>
               </div>
            </motion.div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="space-y-12">
          <motion.div {...fadeIn} className="text-center">
            <h2 className="text-3xl font-bold mb-4 font-headline">Technical Skills</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full neon-glow"></div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <SkillCard title="Frontend" skills={["HTML", "CSS", "JS", "React", "Bootstrap"]} icon={<Globe className="text-primary" />} className="md:col-span-2" />
            <SkillCard title="Backend" skills={["Node.js", "Python", "Django", "C#"]} icon={<Code2 className="text-primary" />} />
            <SkillCard title="Full Stack" skills={["Next.js", "MERN", "Laravel"]} icon={<Zap className="text-primary" />} />
            <SkillCard title="Databases" skills={["MySQL", "MongoDB"]} icon={<Briefcase className="text-primary" />} />
            <SkillCard title="DevOps" skills={["Docker", "VPS", "AWS"]} icon={<ExternalLink className="text-primary" />} className="md:col-span-2" />
            <SkillCard title="Libraries" skills={["Shadcn", "Aceternity", "Zod", "RHF"]} icon={<Award className="text-primary" />} />
          </div>
        </section>

        {/* Work Experience */}
        <section id="experience" className="space-y-12">
          <motion.div {...fadeIn} className="text-center">
            <h2 className="text-3xl font-bold mb-4 font-headline">Work Experience</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full neon-glow"></div>
          </motion.div>

          <div className="space-y-8">
            <TimelineItem 
              title="MHN Enterprises"
              period="Jan 2025 - Present"
              role="Full Stack Developer"
              bullets={[
                "Developing dynamic web pages with Laravel Blade, Nextjs and MERN stack.",
                "Integrating backend data with frontend views.",
                "Writing clean, efficient, and scalable code.",
                "Collaborating to implement and enhance features."
              ]}
            />
            <TimelineItem 
              title="Genentech Solutions"
              period="Oct - Dec 2024 (3 months)"
              role="Full-Stack Developer"
              bullets={[
                "Working as a Full-Stack Developer at Genetech Solutions",
                "Using Django for back-end development",
                "Using Next.js for front-end development",
                "Creating RESTful APIs",
                "Optimizing application performance"
              ]}
            />
            <TimelineItem 
              title="Hakam Techsoul"
              period="Aug - Sep 2024 (2 months)"
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
          <motion.div {...fadeIn} className="text-center">
            <h2 className="text-3xl font-bold mb-4 font-headline">Education</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full neon-glow"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <EducationCard 
              title="Diploma in Web Development"
              institution="Aptech"
              status="In Progress"
            />
            <EducationCard 
              title="Agentic (Artificial Intelligence) Course"
              institution="PIAIC"
              status="Enrolled (6-quarter program; 2 quarters completed, currently in 2nd quarter)"
            />
            <EducationCard 
              title="Intermediate (ICS)"
              institution="Completed First year"
              status="Computer Science"
            />
            <EducationCard 
              title="Matriculation"
              institution="Alkamran Public School"
              status="2022 - 2023"
            />
            <EducationCard 
              title="Hifz-ul-Quran"
              institution="Completed"
              status="2021"
              icon={<Award className="text-secondary" />}
            />
          </div>
        </section>

        {/* Projects Grid */}
        <section id="projects" className="space-y-12">
          <motion.div {...fadeIn} className="text-center">
            <h2 className="text-3xl font-bold mb-4 font-headline">Featured Projects</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full neon-glow"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {PlaceHolderImages.map((project, idx) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* Footer / Contact */}
        <footer id="contact" className="mt-32 pt-12 pb-24 text-center glassmorphism rounded-[2rem] border border-primary/10 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary neon-glow"></div>
          <motion.div {...fadeIn} className="space-y-8 max-w-2xl mx-auto px-6">
            <h2 className="text-4xl font-bold font-headline">Get In Touch</h2>
            <p className="text-muted-foreground">Open for collaborations and professional opportunities.</p>
            
            <div className="grid md:grid-cols-3 gap-6 py-8">
              <ContactLink icon={<Mail />} label="rajeelsiddiqui3@gmail.com" href="mailto:rajeelsiddiqui3@gmail.com" />
              <ContactLink icon={<Phone />} label="03300644215" href="tel:03300644215" />
              <ContactLink icon={<MapPin />} label="Malir, Karachi" href="#" />
            </div>

            <div className="flex justify-center gap-6 pt-8">
              <a href="#" className="p-3 glassmorphism rounded-full hover:neon-glow transition-all text-primary"><Github /></a>
              <a href="https://www.linkedin.com/in/rajeel-siddiqui/" className="p-3 glassmorphism rounded-full hover:neon-glow transition-all text-primary"><Linkedin /></a>
              <a href="mailto:rajeelsiddiqui3@gmail.com" className="p-3 glassmorphism rounded-full hover:neon-glow transition-all text-primary"><Mail /></a>
            </div>

            <p className="text-xs text-muted-foreground mt-12 opacity-50 uppercase tracking-widest">
              © 2025 Muhammad Rajeel Siddiqui • Built with Next.js
            </p>
          </motion.div>
        </footer>
      </main>
    </div>
  );
}

function SkillCard({ title, skills, icon, className = "" }: { title: string; skills: string[]; icon: React.ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`p-6 neumorphic-flat rounded-2xl border border-primary/5 group ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="font-bold">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge key={skill} variant="secondary" className="bg-primary/5 hover:bg-primary/20 hover:neon-glow transition-all">
            {skill}
          </Badge>
        ))}
      </div>
    </motion.div>
  );
}

function TimelineItem({ title, period, role, bullets }: { title: string; period: string; role: string; bullets: string[] }) {
  return (
    <motion.div 
      {...fadeIn}
      className="p-6 neumorphic-flat rounded-2xl border border-primary/5 space-y-4"
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <div>
          <h3 className="text-xl font-bold text-primary">{title}</h3>
          <p className="text-sm font-semibold text-secondary">{role}</p>
        </div>
        <Badge variant="outline" className="w-fit">{period}</Badge>
      </div>
      <ul className="space-y-2">
        {bullets.map((bullet, idx) => (
          <li key={idx} className="flex gap-3 text-muted-foreground text-sm">
            <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function EducationCard({ title, institution, status, icon }: { title: string; institution: string; status: string; icon?: React.ReactNode }) {
  return (
    <motion.div 
      {...fadeIn}
      className="p-6 neumorphic-inset rounded-2xl border-l-4 border-primary"
    >
      <div className="flex gap-4 items-start">
        {icon || <BookOpen className="text-primary mt-1 shrink-0" />}
        <div>
          <h4 className="font-bold text-lg">{title}</h4>
          <p className="text-sm text-primary font-medium">{institution}</p>
          <p className="text-xs text-muted-foreground mt-1">{status}</p>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project }: { project: any }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="neumorphic-flat rounded-2xl overflow-hidden group border border-primary/5"
    >
      <div className="relative h-64 overflow-hidden">
        <Image 
          src={project.imageUrl} 
          alt={project.description} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          data-ai-hint={project.imageHint}
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <Button size="icon" variant="secondary" className="rounded-full hover:neon-glow"><ExternalLink size={18} /></Button>
          <Button size="icon" variant="secondary" className="rounded-full hover:neon-glow"><Github size={18} /></Button>
        </div>
      </div>
      <div className="p-6">
        <h4 className="font-bold mb-3 text-lg">{project.description}</h4>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-[10px] uppercase tracking-tighter">TypeScript</Badge>
          <Badge variant="outline" className="text-[10px] uppercase tracking-tighter">Full Stack</Badge>
        </div>
      </div>
    </motion.div>
  );
}

function ContactLink({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <a href={href} className="group p-4 flex flex-col items-center gap-3 transition-transform hover:scale-105">
      <div className="text-primary group-hover:neon-glow transition-all">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </a>
  );
}
