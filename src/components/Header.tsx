
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Short delay before showing the header for a nice entrance effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className={`py-8 transition-all duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 transform -translate-y-4'}`}>
      <div className="container-custom">
        <nav className="flex justify-between items-center">
          <Link to="/" className="text-xl font-serif font-medium hover:text-primary/80 transition-colors">Rasmic</Link>
          <ul className="flex items-center space-x-8">
            <li>
              <Link to="/#work" className="underline-grow text-sm">Work</Link>
            </li>
            <li>
              <Link to="/#about" className="underline-grow text-sm">About</Link>
            </li>
            <li>
              <a href="mailto:hello@example.com" className="underline-grow text-sm">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
