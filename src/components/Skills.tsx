
import React, { useEffect, useState, useRef } from 'react';
import { 
  Code, Palette, Layout, Database, 
  Server, Globe, Smartphone, Figma, 
  Github, Layers, PenTool, Terminal 
} from 'lucide-react';

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  isVisible: boolean;
}

const SkillCard: React.FC<SkillCardProps> = ({ icon, title, description, index, isVisible }) => {
  return (
    <div 
      className={`skill-card p-6 rounded-xl border border-primary/10 dark:border-primary/20 
      bg-secondary/20 dark:bg-secondary/10 backdrop-blur-sm hover:shadow-lg transition-all 
      duration-300 hover:-translate-y-1 opacity-0 parallax ${
        isVisible ? `animate-fade-up animate-delay-${(index + 2) * 100}` : ''
      }`}
      data-speed={0.03 + (index % 3) * 0.01}
    >
      <div className="mb-4 text-primary dark:text-primary w-12 h-12 flex items-center justify-center bg-primary/5 dark:bg-primary/10 rounded-full">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const Skills: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    // Add parallax effect
    const handleScroll = () => {
      if (sectionRef.current) {
        const scrollY = window.scrollY;
        const sectionOffset = sectionRef.current.offsetTop;
        const elements = sectionRef.current.querySelectorAll('.parallax');
        
        elements.forEach((element) => {
          const speed = parseFloat((element as HTMLElement).dataset.speed || '0.1');
          const yPos = (scrollY - sectionOffset) * speed;
          (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const skillsData = [
    {
      icon: <Code size={24} />,
      title: "Frontend Development",
      description: "Building responsive and interactive user interfaces with React, TypeScript and modern CSS frameworks."
    },
    {
      icon: <Server size={24} />,
      title: "Backend Development",
      description: "Creating robust and scalable server-side applications with Node.js, Express, and databases."
    },
    {
      icon: <Palette size={24} />,
      title: "UI/UX Design",
      description: "Designing intuitive user experiences and visually appealing interfaces that engage users."
    },
    {
      icon: <Database size={24} />,
      title: "Database Design",
      description: "Structuring and optimizing databases for performance, security, and scalability."
    },
    {
      icon: <Globe size={24} />,
      title: "Web Performance",
      description: "Optimizing websites for speed, accessibility, and search engine visibility."
    },
    {
      icon: <Smartphone size={24} />,
      title: "Mobile Development",
      description: "Building cross-platform mobile applications that work seamlessly across devices."
    },
    {
      icon: <Figma size={24} />,
      title: "Design Tools",
      description: "Proficient in industry-standard design tools like Figma, Adobe XD, and Sketch."
    },
    {
      icon: <Github size={24} />,
      title: "Version Control",
      description: "Managing code changes efficiently with Git and collaborative workflows."
    },
    {
      icon: <Layout size={24} />,
      title: "Responsive Design",
      description: "Creating layouts that adapt beautifully to any screen size or device."
    },
    {
      icon: <PenTool size={24} />,
      title: "Visual Design",
      description: "Crafting cohesive visual systems with attention to typography, color, and composition."
    },
    {
      icon: <Terminal size={24} />,
      title: "DevOps",
      description: "Setting up CI/CD pipelines and maintaining deployment infrastructure."
    },
    {
      icon: <Layers size={24} />,
      title: "Full Stack Integration",
      description: "Seamlessly connecting frontend and backend systems for cohesive applications."
    }
  ];

  return (
    <section id="skills" className="py-24 relative bg-secondary/30 dark:bg-secondary/5" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float parallax" data-speed="0.07"></div>
        <div className="absolute bottom-40 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float parallax" style={{animationDelay: '2s'}} data-speed="0.05"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-[20%] w-1 h-1 rounded-full bg-primary animate-pulse-slow parallax" data-speed="0.02"></div>
        <div className="absolute top-1/3 right-[30%] w-1.5 h-1.5 rounded-full bg-primary animate-pulse-slow parallax" style={{animationDelay: '0.5s'}} data-speed="0.04"></div>
        <div className="absolute bottom-1/3 left-[40%] w-1 h-1 rounded-full bg-primary animate-pulse-slow parallax" style={{animationDelay: '1s'}} data-speed="0.03"></div>
        <div className="absolute bottom-1/4 right-[25%] w-1.5 h-1.5 rounded-full bg-primary animate-pulse-slow parallax" style={{animationDelay: '1.5s'}} data-speed="0.06"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className={`w-20 h-1 bg-primary mb-6 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}></div>
        <h2 className={`text-3xl md:text-4xl font-medium mb-12 ${isVisible ? 'animate-text-focus' : 'opacity-0'}`}>
          <span className="gradient-text">My Skills</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((skill, index) => (
            <SkillCard 
              key={index}
              icon={skill.icon}
              title={skill.title}
              description={skill.description}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
