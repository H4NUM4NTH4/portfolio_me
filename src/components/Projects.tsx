
import React, { useEffect, useState, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  link: string;
  index: number;
}

const ProjectCard: React.FC<ProjectProps> = ({ title, description, tags, link, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const delayClass = `animate-delay-${(index + 1) * 100}`; 

  return (
    <div 
      ref={cardRef}
      className={`project-card glow border border-border/60 dark:border-primary/10 p-6 dark:hover:bg-primary/5 hover:bg-secondary/30 ${isVisible ? `animate-fade-up ${delayClass}` : 'opacity-0'}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-medium mb-2">{title}</h3>
          <p className="text-muted-foreground mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="text-xs px-2 py-1 bg-secondary text-secondary-foreground dark:bg-secondary/20 dark:text-primary rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-primary hover:text-primary/80 transition-colors hover-lift"
        >
          <ArrowUpRight size={20} />
        </a>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
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

  const projects = [
    {
      title: "Portfolio Website",
      description: "A clean, modern portfolio website with dark mode support and animations.",
      tags: ["React", "TailwindCSS", "TypeScript"],
      link: "#",
    },
    {
      title: "E-commerce Dashboard",
      description: "Admin dashboard for managing products, orders, and customer data.",
      tags: ["React", "shadcn/ui", "Recharts"],
      link: "#",
    },
    {
      title: "Mobile Banking App",
      description: "User-friendly mobile banking application with robust security features.",
      tags: ["React Native", "TypeScript", "API"],
      link: "#",
    },
  ];

  return (
    <section id="work" className="py-24" ref={sectionRef}>
      <div className="container-custom">
        <div className="flex justify-between items-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-medium mb-2 ${isVisible ? 'animate-text-focus' : 'opacity-0'}`}>
            <span className="gradient-text">Selected Work</span>
          </h2>
          <Button variant="ghost" className={`rounded-full ${isVisible ? 'animate-fade-in animate-delay-200' : 'opacity-0'}`}>
            View all
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="hidden md:block">
          <div className="grid gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} index={index} />
            ))}
          </div>
        </div>
        
        {/* Mobile carousel view */}
        <div className="md:hidden">
          <Carousel className={isVisible ? 'animate-fade-in animate-delay-300' : 'opacity-0'}>
            <CarouselContent>
              {projects.map((project, index) => (
                <CarouselItem key={index} className="basis-full">
                  <div className="project-card rounded-lg border border-border p-6 glow">
                    <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-secondary dark:bg-secondary/20 dark:text-primary text-secondary-foreground rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a href={project.link} className="text-primary hover:text-primary/80 transition-colors">
                      View Project <ArrowUpRight size={16} className="inline" />
                    </a>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Projects;
