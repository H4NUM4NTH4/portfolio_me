
import React, { useEffect, useState, useRef } from 'react';

const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);
  
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
    
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    
    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer className="py-16 border-t border-border" ref={footerRef}>
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h2 className={`text-3xl font-serif mb-4 ${isVisible ? 'animate-text-focus' : 'opacity-0'}`}>Contact</h2>
          </div>
          <div className="md:col-span-2">
            <p className={`text-lg mb-6 ${isVisible ? 'animate-fade-up animate-delay-100' : 'opacity-0'}`}>
              Let's work together on your next project. I'm currently available for new opportunities.
            </p>
            
            <div className={`space-y-2 mb-8 ${isVisible ? 'animate-fade-up animate-delay-200' : 'opacity-0'}`}>
              <p className="font-medium">Email</p>
              <a href="mailto:hello@example.com" className="underline-grow text-muted-foreground">
                hello@example.com
              </a>
            </div>
            
            <div className={`space-y-2 mb-8 ${isVisible ? 'animate-fade-up animate-delay-300' : 'opacity-0'}`}>
              <p className="font-medium">Connect</p>
              <div className="flex space-x-6">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="underline-grow text-muted-foreground">
                  Twitter
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="underline-grow text-muted-foreground">
                  LinkedIn
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="underline-grow text-muted-foreground">
                  GitHub
                </a>
                <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="underline-grow text-muted-foreground">
                  Dribbble
                </a>
              </div>
            </div>
            
            <p className={`text-sm text-muted-foreground ${isVisible ? 'animate-fade-up animate-delay-400' : 'opacity-0'}`}>
              © {new Date().getFullYear()} All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
