
import React, { useEffect, useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';

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

  const skills = [
    "UI/UX Design",
    "React & React Native",
    "TypeScript",
    "Node.js",
    "TailwindCSS",
  ];

  return (
    <section id="about" className="py-24 bg-secondary/30 dark:bg-secondary/5" ref={sectionRef}>
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <div className={`w-20 h-1 bg-primary mb-6 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}></div>
            <h2 className={`text-3xl md:text-4xl font-medium mb-6 ${isVisible ? 'animate-text-focus' : 'opacity-0'}`}>
              <span className="gradient-text">About Me</span>
            </h2>
            <p className={`text-lg text-muted-foreground mb-8 ${isVisible ? 'animate-fade-up animate-delay-100' : 'opacity-0'}`}>
              I'm a designer and developer with over 5 years of experience creating digital products. I specialize in building clean, user-friendly interfaces and bringing them to life with code.
            </p>
            
            <p className={`text-lg text-muted-foreground mb-8 ${isVisible ? 'animate-fade-up animate-delay-200' : 'opacity-0'}`}>
              I'm passionate about creating accessible and performant web experiences that look beautiful on any device. When I'm not coding, you'll find me exploring new design trends or experimenting with new technologies.
            </p>
            
            <div className={`flex space-x-4 mb-8 ${isVisible ? 'animate-fade-up animate-delay-300' : 'opacity-0'}`}>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon" className="rounded-full glow">
                  <Github size={18} />
                </Button>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon" className="rounded-full glow">
                  <Twitter size={18} />
                </Button>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon" className="rounded-full glow">
                  <Linkedin size={18} />
                </Button>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className={`text-xl font-medium mb-6 ${isVisible ? 'animate-fade-up animate-delay-400' : 'opacity-0'}`}>Skills</h3>
            <ul className={`space-y-3 mb-8 ${isVisible ? 'animate-fade-up animate-delay-500' : 'opacity-0'}`}>
              {skills.map((skill, index) => (
                <li key={index} className={`flex items-center opacity-0 ${isVisible ? `animate-fade-up animate-delay-${(index + 6) * 100}` : ''}`}>
                  <span className="inline-flex items-center justify-center w-5 h-5 mr-2 rounded-full bg-primary/10 text-primary">•</span>
                  {skill}
                </li>
              ))}
            </ul>
            
            <div className={`mt-8 ${isVisible ? 'animate-fade-up animate-delay-800' : 'opacity-0'}`}>
              <h3 className="text-xl font-medium mb-4">Let's Connect</h3>
              <p className="text-muted-foreground mb-6">
                I'm always open to new opportunities and collaborations. Feel free to reach out if you want to work together.
              </p>
              <a href="#contact">
                <Button className="rounded-full px-6 py-2 h-12 hover-lift glow">
                  Contact Me
                  <ArrowRight className="ml-2 h-4 w-4" />
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
