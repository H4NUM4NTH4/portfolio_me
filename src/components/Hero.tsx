
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className={`max-w-4xl space-y-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h1 className={`text-4xl md:text-5xl lg:text-7xl font-serif font-normal leading-tight mb-6 opacity-0 ${isVisible ? 'animate-text-focus' : ''}`}>
            Build your next idea even faster.
          </h1>
          <p className={`text-lg md:text-xl text-muted-foreground max-w-2xl opacity-0 ${isVisible ? 'animate-fade-up animate-delay-400' : ''}`}>
            A collection of modern, responsive, and customizable UI templates designed to help you build your next project quickly and efficiently.
          </p>
          <div className={`pt-4 space-x-4 opacity-0 ${isVisible ? 'animate-fade-up animate-delay-500' : ''}`}>
            <Button className="rounded-full px-6 py-2 h-12">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="rounded-full px-6 py-2 h-12">
              View Components
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
