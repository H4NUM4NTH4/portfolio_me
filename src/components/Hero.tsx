
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

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
            Build your next idea even faster.
          </h1>
          
          <div className={`w-20 h-1 bg-primary opacity-0 ${isVisible ? 'animate-fade-up animate-delay-300' : ''}`}></div>
          
          <p className={`text-lg md:text-xl text-muted-foreground max-w-2xl opacity-0 ${isVisible ? 'animate-fade-up animate-delay-400' : ''}`}>
            A collection of modern, responsive, and customizable UI templates designed to help you build your next project quickly and efficiently.
          </p>
          
          <div className={`pt-4 space-x-4 opacity-0 ${isVisible ? 'animate-fade-up animate-delay-500' : ''}`}>
            <Button className="rounded-full px-6 py-2 h-12 hover-lift">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="rounded-full px-6 py-2 h-12 hover-lift">
              View Components
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-3 mt-16 md:mt-24 opacity-0 pt-8 hidden md:grid">
            {[1, 2, 3, 4].map((item, index) => (
              <div 
                key={index}
                className={`h-[120px] rounded-lg bg-secondary/30 border border-primary/10 transition-all hover-lift opacity-0 ${
                  isVisible ? `animate-scale-in animate-delay-${(index + 6) * 100}` : ''
                }`}
              >
                <Skeleton className="h-full w-full rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
