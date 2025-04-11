
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { ThemeToggle } from './ThemeToggle';

const Header = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/#work', label: 'Work' },
    { href: '/#skills', label: 'Skills' },
    { href: '/#about', label: 'About' },
  ];

  const navigateToAnchor = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
    e.preventDefault();
    
    // Only handle smooth scrolling on the main page
    if (location.pathname === '/') {
      const element = document.querySelector(anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on a different page, navigate to home first, then to the anchor
      window.location.href = anchor;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md">
      <div className="container-custom flex h-16 items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/" className="text-xl font-bold">
            <span className="gradient-text">hanumantha</span>
          </Link>
          
          <nav className="hidden md:flex gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => navigateToAnchor(e, link.href)}
                className={cn(
                  "text-sm transition-colors hover:text-primary",
                  (location.pathname === '/' && location.hash === link.href.replace('/', '')) || 
                  (link.href === '/' && location.pathname === '/' && !location.hash) 
                    ? "text-primary font-medium" 
                    : ""
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={() => logout()}
            >
              <LogOut size={16} /> Logout
            </Button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
