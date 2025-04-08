
import React, { useEffect, useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "I'll get back to you as soon as possible.",
      });
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <footer className="py-24 border-t border-border dark:border-border/20" ref={footerRef} id="contact">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <div className={`w-16 h-0.5 bg-primary mb-6 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}></div>
            <h2 className={`text-3xl md:text-4xl font-medium mb-6 ${isVisible ? 'animate-text-focus' : 'opacity-0'}`}>
              <span className="gradient-text">Get in touch</span>
            </h2>
            <p className={`text-lg text-muted-foreground mb-8 ${isVisible ? 'animate-fade-up animate-delay-100' : 'opacity-0'}`}>
              Have a project in mind or just want to chat? Send me a message and I'll get back to you as soon as possible.
            </p>
            
            <div className={`${isVisible ? 'animate-fade-up animate-delay-200' : 'opacity-0'}`}>
              <p className="text-sm mb-2 text-muted-foreground">Email</p>
              <p className="text-lg mb-6">hello@rasmic.xyz</p>
              
              <p className="text-sm mb-2 text-muted-foreground">Location</p>
              <p className="text-lg">San Francisco, CA</p>
            </div>
          </div>
          
          <div className={`${isVisible ? 'animate-fade-up animate-delay-300' : 'opacity-0'}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input 
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="rounded-lg border-border/40 bg-background"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project..."
                  required
                  className="min-h-[150px] rounded-lg border-border/40 bg-background"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full rounded-lg hover-lift glow"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
        
        <div className={`mt-16 pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center ${isVisible ? 'animate-fade-up animate-delay-500' : 'opacity-0'}`}>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Rasmic. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground">Twitter</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
