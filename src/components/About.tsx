
import React, { useEffect, useState, useRef } from 'react';

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

  return (
    <section id="about" className="py-16" ref={sectionRef}>
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h2 className={`text-3xl font-serif mb-4 ${isVisible ? 'animate-text-focus' : 'opacity-0'}`}>About</h2>
          </div>
          <div className="md:col-span-2">
            <p className={`text-lg mb-4 ${isVisible ? 'animate-fade-up animate-delay-100' : 'opacity-0'}`}>
              I'm a designer and developer with over 5 years of experience creating digital products.
              My background in both design and engineering allows me to bridge the gap between aesthetics and functionality.
            </p>
            <p className={`text-lg mb-4 ${isVisible ? 'animate-fade-up animate-delay-200' : 'opacity-0'}`}>
              I believe in minimalist design principles that focus on content and usability. My approach emphasizes
              simplicity, clean typography, and thoughtful interactions to create memorable experiences.
            </p>
            <p className={`text-lg mb-8 ${isVisible ? 'animate-fade-up animate-delay-300' : 'opacity-0'}`}>
              Currently, I'm focused on helping companies refine their digital presence through strategic design and development.
            </p>
            
            <h3 className={`text-xl font-serif mb-3 ${isVisible ? 'animate-fade-up animate-delay-400' : 'opacity-0'}`}>Experience</h3>
            <div className={`space-y-4 mb-8 ${isVisible ? 'animate-fade-up animate-delay-500' : 'opacity-0'}`}>
              <div className="hover-lift">
                <div className="flex justify-between mb-1">
                  <p className="font-medium">Senior Product Designer</p>
                  <p className="text-muted-foreground">2020 — Present</p>
                </div>
                <p className="text-muted-foreground">Design Studio Inc.</p>
              </div>
              <div className="hover-lift">
                <div className="flex justify-between mb-1">
                  <p className="font-medium">UX Engineer</p>
                  <p className="text-muted-foreground">2018 — 2020</p>
                </div>
                <p className="text-muted-foreground">Tech Company LLC</p>
              </div>
              <div className="hover-lift">
                <div className="flex justify-between mb-1">
                  <p className="font-medium">Web Developer</p>
                  <p className="text-muted-foreground">2016 — 2018</p>
                </div>
                <p className="text-muted-foreground">Digital Agency Co.</p>
              </div>
            </div>
            
            <h3 className={`text-xl font-serif mb-3 ${isVisible ? 'animate-fade-up animate-delay-600' : 'opacity-0'}`}>Skills</h3>
            <div className={`grid grid-cols-2 gap-x-8 gap-y-2 ${isVisible ? 'animate-fade-up animate-delay-700' : 'opacity-0'}`}>
              <ul className="list-disc list-inside">
                <li className="hover-lift">UI/UX Design</li>
                <li className="hover-lift">Design Systems</li>
                <li className="hover-lift">Prototyping</li>
                <li className="hover-lift">User Research</li>
              </ul>
              <ul className="list-disc list-inside">
                <li className="hover-lift">Frontend Development</li>
                <li className="hover-lift">React.js</li>
                <li className="hover-lift">Tailwind CSS</li>
                <li className="hover-lift">TypeScript</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
