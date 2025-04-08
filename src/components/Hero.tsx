
import React, { useEffect, useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Set typing animation to complete after the animation duration
      setTimeout(() => {
        setTypingComplete(true);
      }, 3500);
    }, 200);
    
    // Add scroll magic
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const heroHeight = heroRef.current.offsetHeight;
      const opacity = 1 - (scrollY / heroHeight) * 1.5;
      const translateY = scrollY * 0.4;
      
      if (heroRef.current) {
        heroRef.current.style.opacity = Math.max(0, opacity).toString();
        heroRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <section 
      className="py-32 md:py-40 min-h-screen flex items-center relative overflow-hidden" 
      ref={heroRef}
    >
      <div 
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none animate-float"
        style={{animationDelay: '1s'}}
      ></div>
      <div 
        className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none animate-float"
        style={{animationDelay: '2s'}}
      ></div>
      
      <div className="container-custom relative z-10">
        <div className={`max-w-4xl space-y-6`}>
          <h1 className={`text-5xl md:text-6xl lg:text-7xl font-serif font-normal leading-tight mb-6 opacity-0 ${isVisible ? 'animate-text-focus' : ''}`}>
            <span className={`gradient-text ${isVisible ? 'animate-typing' : ''} ${typingComplete ? 'w-full' : ''}`}>
              Rasmic
            </span> — Designer & Developer
          </h1>
          
          <div className={`w-20 h-1 bg-primary opacity-0 ${isVisible ? 'animate-fade-up animate-delay-300' : ''}`}></div>
          
          <p className={`text-lg md:text-xl text-muted-foreground max-w-2xl opacity-0 ${isVisible ? 'animate-fade-up animate-delay-400' : ''}`}>
            I'm a designer and developer who combines creativity with technical skills to build beautiful, functional websites and applications.
          </p>
          
          <div className={`pt-4 space-x-4 opacity-0 ${isVisible ? 'animate-fade-up animate-delay-500' : ''}`}>
            <a href="#work">
              <Button className="rounded-full px-6 py-2 h-12 hover-lift glow magnetic-button">
                View My Work
                <ArrowDown className="ml-2 h-4 w-4 animate-bounce" style={{animationDuration: '2s'}} />
              </Button>
            </a>
            <a href="#contact">
              <Button variant="outline" className="rounded-full px-6 py-2 h-12 hover-lift">
                Contact Me
              </Button>
            </a>
          </div>
          
          <div className="hidden md:grid grid-cols-4 gap-3 mt-16 opacity-0 pt-8">
            {[1, 2, 3, 4].map((item, index) => (
              <div 
                key={index}
                className={`aspect-video rounded-xl bg-secondary/30 border border-primary/10 transition-all hover-lift opacity-0 glow animated-border ${
                  isVisible ? `animate-scale-in animate-delay-${(index + 6) * 100}` : ''
                }`}
              >
                <div className="h-full w-full rounded-lg bg-gradient-to-br from-secondary/50 to-accent/30 p-4 flex items-center justify-center text-muted-foreground tilt-card">
                  <span className="tilt-card-content">Project {index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce" style={{animationDuration: '3s'}}>
        <ArrowDown className="h-6 w-6 text-muted-foreground/50" />
      </div>
    </section>
  );
};

export default Hero;
