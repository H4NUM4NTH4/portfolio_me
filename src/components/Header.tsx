
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

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
    <header className={`py-6 fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${scrolled ? 'backdrop-blur-lg bg-background/80 shadow-sm' : ''} ${isVisible ? 'opacity-100' : 'opacity-0 transform -translate-y-4'}`}>
      <div className="container-custom">
        <nav className="flex justify-between items-center">
          <Link 
            to="/" 
            className={`text-xl font-medium hover:text-primary/80 transition-all duration-300 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
          >
            NextStarter
          </Link>
          
          <NavigationMenu className={`${isVisible ? 'animate-fade-in animate-delay-200' : 'opacity-0'}`}>
            <NavigationMenuList className="hidden md:flex space-x-8">
              <NavigationMenuItem>
                <Link to="/#components" className="underline-grow text-sm">Components</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/#templates" className="underline-grow text-sm">Templates</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="underline-grow text-sm">GitHub</a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          {/* Mobile navigation */}
          <ul className="md:hidden flex items-center space-x-6">
            <li>
              <Link to="/#components" className="underline-grow text-sm">Components</Link>
            </li>
            <li>
              <Link to="/#templates" className="underline-grow text-sm">Templates</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
