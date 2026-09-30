import React from 'react';
import { ArrowUp, Code2, Globe, Sparkles, Terminal } from 'lucide-react';
import { FOOTER_DATA } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-4 h-4" />;
      case 'Globe':
        return <Globe className="w-4 h-4" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4" />;
      case 'Terminal':
        return <Terminal className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-12 text-zinc-400 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-zinc-900">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <a href="#hero" className="text-2xl font-heading font-bold text-white tracking-tight inline-block">
              {FOOTER_DATA.name}<span className="text-indigo-500">.</span>
            </a>
            <p className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
              {FOOTER_DATA.role}
            </p>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              {FOOTER_DATA.bio}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-mono uppercase text-zinc-500 tracking-widest block mb-4">
              Quick Links
            </span>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {FOOTER_DATA.navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-white transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Socials & Location */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-xs font-mono uppercase text-zinc-500 tracking-widest block mb-4">
              Connect & Socials
            </span>
            <div className="flex flex-wrap gap-3">
              {FOOTER_DATA.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors flex items-center justify-center"
                  aria-label={social.name}
                  data-cursor-text={social.name}
                >
                  {getSocialIcon(social.icon)}
                </a>
              ))}
            </div>
            <p className="text-xs font-mono text-zinc-500 pt-2">
              Based in {FOOTER_DATA.location}
            </p>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <p>{FOOTER_DATA.copyright}</p>
          
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
            data-cursor-text="Top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
