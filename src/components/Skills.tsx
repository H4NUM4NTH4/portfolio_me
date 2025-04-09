
import React, { useEffect, useState, useRef } from 'react';
import { 
  Code, FileCode, Server, Database, 
  Github, Binary, Laptop, Library,
  Braces, Globe, BoxIcon, LayoutGrid
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  skills: string[];
  index: number;
  isVisible: boolean;
}

interface FloatingIconProps {
  icon: React.ReactNode;
  position: string;
  delay: string;
  size?: number;
}

const FloatingIcon: React.FC<FloatingIconProps> = ({ icon, position, delay, size = 24 }) => {
  return (
    <div 
      className={`absolute ${position} text-primary/30 dark:text-primary/20 animate-float`} 
      style={{ animationDelay: delay }}
    >
      {React.cloneElement(icon as React.ReactElement, { size })}
    </div>
  );
};

const SkillCard: React.FC<SkillCardProps> = ({ icon, title, skills, index, isVisible }) => {
  return (
    <div 
      className={`skill-card p-6 rounded-xl border border-primary/10 dark:border-primary/20 
      bg-secondary/20 dark:bg-secondary/10 backdrop-blur-sm hover:shadow-lg transition-all 
      duration-300 hover:-translate-y-1 opacity-0 ${
        isVisible ? `animate-fade-up animate-delay-${(index + 2) * 100}` : ''
      }`}
    >
      <div className="mb-4 text-primary dark:text-primary w-12 h-12 flex items-center justify-center bg-primary/5 dark:bg-primary/10 rounded-full">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <Badge 
            key={i} 
            variant="secondary" 
            className="bg-primary/5 hover:bg-primary/10 text-foreground"
          >
            {skill}
          </Badge>
        ))}
      </div>
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
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const skillsData = [
    {
      icon: <Globe size={24} />,
      title: "Frontend Development",
      skills: ["HTML", "CSS", "TailwindCSS", "Bootstrap", "ReactJs"]
    },
    {
      icon: <Server size={24} />,
      title: "Backend Development",
      skills: ["Node.js", "Express.js", "MongoDB", "MySQL"]
    },
    {
      icon: <Braces size={24} />,
      title: "Programming Languages",
      skills: ["C++", "C", "Java", "JavaScript"]
    },
    {
      icon: <Github size={24} />,
      title: "Technical Skills",
      skills: ["Git/GitHub", "NumPy", "Pandas"]
    }
  ];

  // Floating icons configuration
  const floatingIcons = [
    { icon: <FileCode />, position: "top-20 left-[10%]", delay: "0s", size: 28 },
    { icon: <Laptop />, position: "top-32 right-[15%]", delay: "1.5s", size: 32 },
    { icon: <Database />, position: "bottom-24 left-[20%]", delay: "3s", size: 26 },
    { icon: <Binary />, position: "bottom-40 right-[22%]", delay: "2s", size: 30 },
    { icon: <Library />, position: "top-1/2 left-[5%]", delay: "4s", size: 24 },
    { icon: <BoxIcon />, position: "top-1/3 right-[8%]", delay: "3.5s", size: 22 },
    { icon: <LayoutGrid />, position: "bottom-1/3 left-[12%]", delay: "2.5s", size: 28 },
    { icon: <Code />, position: "bottom-1/4 right-[10%]", delay: "1s", size: 34 }
  ];

  return (
    <section id="skills" className="py-24 relative bg-secondary/30 dark:bg-secondary/5" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        
        {/* Floating skill icons */}
        {floatingIcons.map((iconConfig, index) => (
          <FloatingIcon 
            key={index}
            icon={iconConfig.icon} 
            position={iconConfig.position} 
            delay={iconConfig.delay}
            size={iconConfig.size}
          />
        ))}
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-[20%] w-1 h-1 rounded-full bg-primary animate-pulse-slow" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-1/3 right-[30%] w-1.5 h-1.5 rounded-full bg-primary animate-pulse-slow" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-1/3 left-[40%] w-1 h-1 rounded-full bg-primary animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 right-[25%] w-1.5 h-1.5 rounded-full bg-primary animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className={`w-20 h-1 bg-primary mb-6 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}></div>
        <h2 className={`text-3xl md:text-4xl font-medium mb-12 ${isVisible ? 'animate-text-focus' : 'opacity-0'}`}>
          <span className="gradient-text">My Skills</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillsData.map((skill, index) => (
            <SkillCard 
              key={index}
              icon={skill.icon}
              title={skill.title}
              skills={skill.skills}
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
