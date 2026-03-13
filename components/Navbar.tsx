'use client';

import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-content">
        <a href="#" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Open Book Base */}
            <path d="M4 19.5C4 18.837 4.53726 18.3 5.2 18.3H12V5.5C12 5.5 10.5 4.5 5.5 4.5C4.67157 4.5 4 5.17157 4 6V19.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 5.5V18.3H18.8C19.4627 18.3 20 18.837 20 19.5V6C20 5.17157 19.3284 4.5 18.5 4.5C13.5 4.5 12 5.5 12 5.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            {/* The letter B forming out of the book's right page */}
            <path d="M12 8H15.5C16.8807 8 18 9.11929 18 10.5C18 11.4552 17.464 12.285 16.634 12.7208C17.6534 13.0645 18.3889 14.0207 18.3889 15.1667C18.3889 16.5474 17.2696 17.6667 15.8889 17.6667H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          BAB
        </a>
        
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <ThemeToggle />
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'var(--bg-primary)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-color)',
          padding: '20px',
        }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {navItems.map((item) => (
              <li key={item.href}>
                <a 
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '1rem' }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
