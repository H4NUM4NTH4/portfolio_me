
import React, { useEffect, useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const About: React.FC = () => {
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

  const features = [
    "60+ components built with Tailwind CSS",
    "Fully responsive and accessible components",
    "Dark mode support",
    "TypeScript support",
    "Built with React and Next.js",
  ];

  return (
    <section id="components" className="py-16 bg-secondary/30" ref={sectionRef}>
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className={`text-3xl md:text-4xl font-medium mb-6 ${isVisible ? 'animate-text-focus' : 'opacity-0'}`}>
              Beautiful UI components, crafted with care
            </h2>
            <p className={`text-lg text-muted-foreground mb-8 ${isVisible ? 'animate-fade-up animate-delay-100' : 'opacity-0'}`}>
              NextStarter includes a comprehensive collection of pre-built UI components that are fully customizable to fit your project's needs.
            </p>
            
            <ul className={`space-y-3 mb-8 ${isVisible ? 'animate-fade-up animate-delay-200' : 'opacity-0'}`}>
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="inline-flex items-center justify-center w-5 h-5 mr-2 rounded-full bg-primary/10 text-primary">•</span>
                  {feature}
                </li>
              ))}
            </ul>
            
            <Button className={`rounded-full px-6 py-2 h-12 ${isVisible ? 'animate-fade-up animate-delay-300' : 'opacity-0'}`}>
              Explore Components
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className={`grid grid-cols-2 gap-4 ${isVisible ? 'animate-fade-in animate-delay-400' : 'opacity-0'}`}>
            <div className="space-y-4">
              <div className="h-32 rounded-lg bg-primary/5 border border-primary/10"></div>
              <div className="h-48 rounded-lg bg-primary/5 border border-primary/10"></div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="h-48 rounded-lg bg-primary/5 border border-primary/10"></div>
              <div className="h-32 rounded-lg bg-primary/5 border border-primary/10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
