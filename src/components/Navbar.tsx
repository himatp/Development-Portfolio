import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { FOOTER_DATA } from '../data/portfolioData';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Scroll spy for active section
      const sections = ['hero', 'about', 'services', 'projects', 'process', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#hero', id: 'hero' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Process', href: '#process', id: 'process' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-4 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80 shadow-2xl'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2 group cursor-pointer"
            data-cursor-text="Home"
          >
            <span className="text-xl md:text-2xl font-heading font-bold text-white tracking-tight">
              Himat<span className="text-indigo-500">.</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-900/60 p-1.5 rounded-full border border-zinc-800/80 backdrop-blur-sm">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-zinc-800 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-xs font-medium tracking-wide hover:bg-zinc-200 transition-colors shadow-lg hover:shadow-white/10"
              data-cursor-text="Let's Talk"
            >
              <span>Let's Work Together</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-200 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-zinc-950/95 backdrop-blur-xl md:hidden pt-24 px-6 pb-8 flex flex-col justify-between"
          >
            <div className="flex flex-col gap-6">
              <span className="text-xs font-mono uppercase text-zinc-500 tracking-widest">
                Navigation
              </span>
              {navItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.4 }}
                  className="text-2xl font-heading font-light text-zinc-200 hover:text-white transition-colors flex items-center justify-between border-b border-zinc-900 pb-3"
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-mono text-zinc-600">0{index + 1}</span>
                </motion.a>
              ))}
            </div>

            <div className="pt-8 border-t border-zinc-900 flex flex-col gap-4">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-full bg-white text-black text-center text-sm font-medium flex items-center justify-center gap-2"
              >
                <span>Let's Work Together</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <p className="text-xs text-zinc-500 text-center">
                {FOOTER_DATA.email}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
