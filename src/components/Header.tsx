
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    // Short delay before showing the header for a nice entrance effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`py-6 fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${scrolled ? 'backdrop-blur-lg bg-background/80 shadow-sm dark:bg-background/50' : ''} ${isVisible ? 'opacity-100' : 'opacity-0 transform -translate-y-4'}`}>
      <div className="container-custom">
        <nav className="flex justify-between items-center">
          <Link 
            to="/" 
            className={`text-xl font-medium hover:text-primary/80 transition-all duration-300 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
          >
            rasmic
          </Link>
          
          <div className={`hidden md:flex items-center space-x-8 ${isVisible ? 'animate-fade-in animate-delay-200' : 'opacity-0'}`}>
            <Link to="/#work" className="underline-grow text-sm">Work</Link>
            <Link to="/#about" className="underline-grow text-sm">About</Link>
            <Link to="/#contact" className="underline-grow text-sm">Contact</Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="underline-grow text-sm">GitHub</a>
            <ThemeToggle />
          </div>
          
          {/* Mobile navigation */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/#work" className="underline-grow text-sm">Work</Link>
            <Link to="/#about" className="underline-grow text-sm">About</Link>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
