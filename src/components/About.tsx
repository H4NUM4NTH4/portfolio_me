
import React, { useEffect, useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const skillRefs = useRef<(HTMLLIElement | null)[]>([]);
  
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

  // Removed parallax effect

  return (
    <section id="about" className="py-24 bg-secondary/30 dark:bg-secondary/5 relative overflow-hidden" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50">
        <div className="absolute top-20 left-[20%] w-1 h-1 rounded-full bg-primary animate-pulse-slow"></div>
        <div className="absolute top-40 right-[30%] w-2 h-2 rounded-full bg-primary animate-pulse-slow" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-60 left-[40%] w-1.5 h-1.5 rounded-full bg-primary animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 right-[25%] w-1 h-1 rounded-full bg-primary animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
        
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <div className={`w-20 h-1 bg-primary mb-6 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}></div>
            <h2 className={`text-3xl md:text-4xl font-medium mb-6 ${isVisible ? 'animate-text-focus' : 'opacity-0'}`}>
              <span className="gradient-text">About Me</span>
            </h2>
            <p className={`text-lg text-muted-foreground mb-8 ${isVisible ? 'animate-fade-up animate-delay-100' : 'opacity-0'}`}>
              I'm a passionate full stack developer and software engineering enthusiast who loves turning ideas into interactive digital experiences. With a strong focus on clean code, performance, and user-centric design, I enjoy building solutions that are not just functional but also intuitive and engaging.
            </p>
            
            <p className={`text-lg text-muted-foreground mb-8 ${isVisible ? 'animate-fade-up animate-delay-200' : 'opacity-0'}`}>
              I'm always curious, always learning, and driven by the thrill of creating something meaningful through technology.
            </p>
            
            <div className={`flex space-x-4 mb-8 ${isVisible ? 'animate-fade-up animate-delay-300' : 'opacity-0'}`}>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="group">
                <Button variant="outline" size="icon" className="rounded-full glow group-hover:scale-110 transition-all duration-300">
                  <Github size={18} className="group-hover:text-primary transition-colors duration-300" />
                </Button>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="group">
                <Button variant="outline" size="icon" className="rounded-full glow group-hover:scale-110 transition-all duration-300">
                  <Twitter size={18} className="group-hover:text-primary transition-colors duration-300" />
                </Button>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="group">
                <Button variant="outline" size="icon" className="rounded-full glow group-hover:scale-110 transition-all duration-300">
                  <Linkedin size={18} className="group-hover:text-primary transition-colors duration-300" />
                </Button>
              </a>
            </div>
          </div>
          
          <div>
            <div id="connect">
              <h3 className={`text-xl font-medium mb-4 ${isVisible ? 'animate-fade-up animate-delay-800' : 'opacity-0'}`}>Let's Connect</h3>
              <p className="text-muted-foreground mb-6">
                I'm always open to new opportunities and collaborations. Feel free to reach out if you want to work together.
              </p>
              <a href="#contact">
                <Button className="rounded-full px-6 py-2 h-12 hover-lift glow group relative overflow-hidden">
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">Contact Me</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60 dark:from-white/80 dark:to-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <ArrowRight className="ml-2 h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
