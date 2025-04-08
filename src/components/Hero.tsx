
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-32 md:py-40 min-h-screen flex items-center">
      <div className="container-custom">
        <div className={`max-w-4xl space-y-6`}>
          <h1 className={`text-5xl md:text-6xl lg:text-7xl font-serif font-normal leading-tight mb-6 opacity-0 ${isVisible ? 'animate-text-focus' : ''}`}>
            <span className="gradient-text">Rasmic</span> — Designer & Developer
          </h1>
          
          <div className={`w-20 h-1 bg-primary opacity-0 ${isVisible ? 'animate-fade-up animate-delay-300' : ''}`}></div>
          
          <p className={`text-lg md:text-xl text-muted-foreground max-w-2xl opacity-0 ${isVisible ? 'animate-fade-up animate-delay-400' : ''}`}>
            I'm a designer and developer who combines creativity with technical skills to build beautiful, functional websites and applications.
          </p>
          
          <div className={`pt-4 space-x-4 opacity-0 ${isVisible ? 'animate-fade-up animate-delay-500' : ''}`}>
            <a href="#work">
              <Button className="rounded-full px-6 py-2 h-12 hover-lift glow">
                View My Work
                <ArrowDown className="ml-2 h-4 w-4" />
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
                className={`aspect-video rounded-xl bg-secondary/30 border border-primary/10 transition-all hover-lift opacity-0 glow ${
                  isVisible ? `animate-scale-in animate-delay-${(index + 6) * 100}` : ''
                }`}
              >
                <div className="h-full w-full rounded-lg bg-gradient-to-br from-secondary/50 to-accent/30 p-4 flex items-center justify-center text-muted-foreground">
                  <span>Project {index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
