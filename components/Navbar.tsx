'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';

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

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" className="nav-logo">
          &lt;Portfolio /&gt;
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Link href="#home">Home</Link>
          <Link href="#about">About</Link>
          <Link href="#skills">Skills</Link>
          <Link href="#projects">Projects</Link>
          <Link href="#experience">Experience</Link>
          <Link href="#contact">Contact</Link>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
            Resume
          </a>
        </div>

        {/* Mobile Menu Button  */}
        <div className="nav-controls" style={{ display: 'flex', alignItems: 'center' }}>
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            style={{ display: 'none', background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-menu" style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'var(--bg-primary)', padding: '20px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex', flexDirection: 'column', gap: '16px'
        }}>
          <Link href="#home" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link href="#about" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link href="#skills" onClick={() => setMobileMenuOpen(false)}>Skills</Link>
          <Link href="#projects" onClick={() => setMobileMenuOpen(false)}>Projects</Link>
          <Link href="#experience" onClick={() => setMobileMenuOpen(false)}>Experience</Link>
          <Link href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" onClick={() => setMobileMenuOpen(false)} style={{ textAlign: 'center' }}>
            Resume
          </a>
        </div>
      )}
    </nav>
  );
}
