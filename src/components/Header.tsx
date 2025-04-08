
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [lastScrollY, setLastScrollY] = useState(0);
  
  useEffect(() => {
    // Short delay before showing the header for a nice entrance effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Determine scroll direction
      if (scrollPosition > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      
      setLastScrollY(scrollPosition);
      setScrolled(scrollPosition > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    // Prevent body scroll when menu is open
    if (!menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  // Classes to control header visibility based on scroll direction
  const headerVisibilityClass = scrolled 
    ? scrollDirection === 'down' 
      ? '-translate-y-full' 
      : 'translate-y-0'
    : '';

  return (
    <>
      <header className={`py-6 fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${scrolled ? 'backdrop-blur-lg bg-background/80 shadow-sm dark:bg-background/50' : ''} ${isVisible ? 'opacity-100' : 'opacity-0 transform -translate-y-4'} ${headerVisibilityClass}`}>
        <div className="container-custom">
          <nav className="flex justify-between items-center">
            <Link 
              to="/" 
              className={`text-xl font-medium hover:text-primary/80 transition-all duration-300 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
            >
              <span className="relative overflow-hidden inline-block">
                <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary dark:after:bg-white after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100">
                  rasmic
                </span>
              </span>
            </Link>
            
            <div className={`hidden md:flex items-center space-x-8 ${isVisible ? 'animate-fade-in animate-delay-200' : 'opacity-0'}`}>
              {['work', 'about', 'contact'].map((item, index) => (
                <Link 
                  key={item} 
                  to={`/#${item}`}
                  className="underline-grow text-sm relative overflow-hidden group"
                  style={{transitionDelay: `${index * 50}ms`}}
                >
                  <span className="relative z-10">{item.charAt(0).toUpperCase() + item.slice(1)}</span>
                  <span className="absolute left-0 bottom-0 h-[1px] w-full bg-primary dark:bg-white/70 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
              ))}
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="underline-grow text-sm relative overflow-hidden group"
              >
                <span className="relative z-10">GitHub</span>
                <span className="absolute left-0 bottom-0 h-[1px] w-full bg-primary dark:bg-white/70 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>
              <ThemeToggle />
            </div>
            
            {/* Mobile navigation trigger */}
            <div className="md:hidden flex items-center space-x-4">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                className="p-1 -m-1 transition-transform duration-200 hover:scale-110"
              >
                <Menu className={`h-6 w-6 transform transition-opacity duration-300 ${menuOpen ? 'opacity-0 scale-90' : 'opacity-100'}`} />
                <X className={`h-6 w-6 absolute transform transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0 scale-90'}`} />
              </Button>
            </div>
          </nav>
        </div>
      </header>
      
      {/* Mobile menu overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-xl dark:bg-background/90 transform transition-transform duration-500 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col items-center justify-center h-full py-16 space-y-8">
          {['work', 'about', 'contact'].map((item, index) => (
            <Link
              key={item}
              to={`/#${item}`}
              onClick={() => {
                setMenuOpen(false);
                document.body.style.overflow = '';
              }}
              className={`text-2xl font-medium transition-all duration-300 transform ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              style={{transitionDelay: `${index * 100 + 100}ms`}}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
          <a 
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-2xl font-medium transition-all duration-300 transform ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            style={{transitionDelay: '400ms'}}
          >
            GitHub
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
