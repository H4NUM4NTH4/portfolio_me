
import React, { useEffect, useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowUpRight, Loader2 } from 'lucide-react';
import emailjs from 'emailjs-com';

const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
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
    setFormStatus('submitting');
    
    // Initialize EmailJS with your user ID
    // Note: In production, you should use environment variables for these keys
    emailjs.init("YOUR_USER_ID"); // Replace with your actual EmailJS User ID
    
    const templateParams = {
      from_email: email,
      to_email: "thisishanumantha.in@gmail.com",
      message: message
    };
    
    emailjs.send(
      'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
      'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
      templateParams
    )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        toast({
          title: "Message sent!",
          description: "I'll get back to you as soon as possible.",
        });
        setEmail("");
        setMessage("");
        setIsSubmitting(false);
        setFormStatus('success');
        
        setTimeout(() => {
          setFormStatus('idle');
        }, 3000);
      })
      .catch((err) => {
        console.error('FAILED...', err);
        toast({
          title: "Something went wrong",
          description: "Please try again or contact me directly at thisishanumantha.in@gmail.com",
          variant: "destructive"
        });
        setIsSubmitting(false);
        setFormStatus('error');
      });
  };

  return (
    <footer className="py-24 border-t border-border dark:border-border/20 relative overflow-hidden" ref={footerRef} id="contact">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <div className={`w-16 h-0.5 bg-primary mb-6 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}></div>
            <h2 className={`text-3xl md:text-4xl font-medium mb-6 ${isVisible ? 'animate-text-focus' : 'opacity-0'}`}>
              <span className="gradient-text">Get in touch</span>
            </h2>
            <p className={`text-lg text-muted-foreground mb-8 ${isVisible ? 'animate-fade-up animate-delay-100' : 'opacity-0'}`}>
              Have a project in mind or just want to chat? Send me a message and I'll get back to you as soon as possible.
            </p>
            
            <div className={`${isVisible ? 'animate-fade-up animate-delay-200' : 'opacity-0'} space-y-6`}>
              <div className="group">
                <p className="text-sm mb-2 text-muted-foreground">Email</p>
                <p className="text-lg mb-6 relative inline-block group-hover:text-primary transition-colors duration-300">
                  thisishanumantha.in@gmail.com
                  <span className="absolute left-0 bottom-0 h-[1px] w-full bg-primary/50 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </p>
              </div>
              
              <div className="group">
                <p className="text-sm mb-2 text-muted-foreground">Location</p>
                <p className="text-lg mb-2 group-hover:text-primary transition-colors duration-300">Hubli, India</p>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <a href="https://x.com/Hanumantha_05" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 relative group">
                  <span>Twitter</span>
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
                <a href="https://github.com/H4NUM4NTH4" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 relative group">
                  <span>GitHub</span>
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
                <a href="https://www.linkedin.com/in/hanumantha-sm" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 relative group">
                  <span>LinkedIn</span>
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              </div>
            </div>
          </div>
          
          <div className={`${isVisible ? 'animate-fade-up animate-delay-300' : 'opacity-0'}`}>
            <form onSubmit={handleSubmit} className="space-y-6 relative">
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
                  className="rounded-lg border-border/40 bg-background focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  disabled={isSubmitting}
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
                  className="min-h-[150px] rounded-lg border-border/40 bg-background focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  disabled={isSubmitting}
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full rounded-lg hover-lift glow group relative overflow-hidden"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                  {formStatus === 'submitting' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : formStatus === 'success' ? "Message sent!" : "Send Message"}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60 dark:from-white/80 dark:to-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                
                {formStatus === 'success' && (
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <ArrowUpRight size={16} className="animate-fade-in" />
                  </span>
                )}
              </Button>
              
              <div className={`absolute -inset-4 rounded-lg border-2 border-primary/50 dark:border-white/50 transition-all duration-500 ${formStatus === 'success' ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}></div>
            </form>
          </div>
        </div>
        
        <div className={`mt-16 pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center ${isVisible ? 'animate-fade-up animate-delay-500' : 'opacity-0'}`}>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Hanumantha. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://x.com/Hanumantha_05" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground">Twitter</a>
            <a href="https://github.com/H4NUM4NTH4" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground">GitHub</a>
            <a href="https://www.linkedin.com/in/hanumantha-sm" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
