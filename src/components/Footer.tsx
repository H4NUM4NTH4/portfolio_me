
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
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className={`text-lg font-medium mb-4 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>NextStarter</h3>
            <p className={`text-sm text-muted-foreground mb-4 ${isVisible ? 'animate-fade-up animate-delay-100' : 'opacity-0'}`}>
              Beautiful UI components and templates to build modern web applications.
            </p>
          </div>
          
          <div className={`${isVisible ? 'animate-fade-up animate-delay-200' : 'opacity-0'}`}>
            <h4 className="text-sm font-medium mb-3">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground underline-grow">Documentation</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground underline-grow">Components</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground underline-grow">Templates</a></li>
            </ul>
          </div>
          
          <div className={`${isVisible ? 'animate-fade-up animate-delay-300' : 'opacity-0'}`}>
            <h4 className="text-sm font-medium mb-3">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground underline-grow">About</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground underline-grow">Blog</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground underline-grow">Careers</a></li>
            </ul>
          </div>
          
          <div className={`${isVisible ? 'animate-fade-up animate-delay-400' : 'opacity-0'}`}>
            <h4 className="text-sm font-medium mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground underline-grow">Privacy</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground underline-grow">Terms</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground underline-grow">License</a></li>
            </ul>
          </div>
        </div>
        
        <div className={`mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center ${isVisible ? 'animate-fade-up animate-delay-500' : 'opacity-0'}`}>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NextStarter. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground">Twitter</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground">GitHub</a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground">Discord</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
