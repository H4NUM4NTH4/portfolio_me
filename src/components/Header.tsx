
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="py-8">
      <div className="container-custom">
        <nav className="flex justify-between items-center">
          <Link to="/" className="text-xl font-serif font-medium">Rasmic</Link>
          <ul className="flex items-center space-x-8">
            <li>
              <Link to="/#work" className="link text-sm">Work</Link>
            </li>
            <li>
              <Link to="/#about" className="link text-sm">About</Link>
            </li>
            <li>
              <a href="mailto:hello@example.com" className="link text-sm">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
