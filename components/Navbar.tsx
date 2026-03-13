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
        <a href="#" className="nav-logo" aria-label="Home">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2L28 9V23L16 30L4 23V9L16 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="2"/>
            <path d="M16 2L16 11M16 21L16 30M4 9L12 13.5M28 9L20 13.5M4 23L12 18.5M28 23L20 18.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
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
