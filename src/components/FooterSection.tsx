import React, { useState } from 'react';
import { FadeIn } from './FadeIn';
import {
  Mail,
  MapPin,
  ArrowUpRight,
  ArrowUp,
  Copy,
  Check,
} from 'lucide-react';

export const FooterSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const contactEmail = 'binethma.jayawickrama@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-10 pt-16 sm:pt-20 pb-12 sm:pb-16 w-full overflow-hidden select-none border-t border-white/10">
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <FadeIn delay={0.1} y={30} duration={0.7}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 items-start pb-12 sm:pb-16 border-b border-[#D7E2EA]/15">
            {/* Left Side: Brand Pitch & Availability */}
            <div className="md:col-span-5 flex flex-col gap-5">
              <div className="inline-flex items-center gap-2.5 self-start px-4 py-2 rounded-full bg-white/[0.05] border border-white/15 backdrop-blur-md">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-medium tracking-wider uppercase text-[#D7E2EA]">
                  Available for New Opportunities
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wide text-white leading-tight">
                Let&apos;s build something extraordinary together.
              </h3>

              <p className="text-sm sm:text-base font-light text-[#D7E2EA]/75 leading-relaxed">
                Open to software engineering, full-stack development, AI, and QA / testing opportunities. Reach out directly via email or connect on social media.
              </p>
            </div>

            {/* Right Side: Direct Contact & Social Media Platforms */}
            <div className="md:col-span-7 flex flex-col gap-6">
              {/* Direct Contact Cards (Email & Location) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email Card */}
                <div className="group flex items-center justify-between p-4 sm:p-5 rounded-3xl bg-[#141414]/90 border border-[#D7E2EA]/15 hover:border-[#D7E2EA]/40 transition-all duration-300">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-11 h-11 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0 text-[#D7E2EA] group-hover:text-white transition-all">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[11px] uppercase tracking-widest text-[#D7E2EA]/50 font-medium">
                        Email
                      </span>
                      <a
                        href={`mailto:${contactEmail}`}
                        className="text-xs sm:text-sm font-medium text-[#D7E2EA] hover:text-white truncate transition-colors"
                      >
                        {contactEmail}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    title="Copy email address"
                    className="ml-2 p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/15 border border-white/10 text-[#D7E2EA] hover:text-white transition-all shrink-0 cursor-pointer"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Location / Education Card */}
                <div className="flex items-center gap-3.5 p-4 sm:p-5 rounded-3xl bg-[#141414]/90 border border-[#D7E2EA]/15">
                  <div className="w-11 h-11 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0 text-[#D7E2EA]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] uppercase tracking-widest text-[#D7E2EA]/50 font-medium">
                      Location &amp; Education
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-[#D7E2EA]">
                      Sri Lanka • Univ. of Westminster
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="flex flex-col gap-3">
                <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 font-medium">
                  Social Media &amp; Profiles
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  {/* GitHub */}
                  <a
                    href="https://github.com/BinethmaJayawickrama"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#141414] hover:bg-[#1F1F1F] border border-[#D7E2EA]/20 hover:border-[#D7E2EA] text-xs sm:text-sm font-medium text-[#D7E2EA] hover:text-white transition-all duration-300"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#141414] hover:bg-[#1F1F1F] border border-[#D7E2EA]/20 hover:border-[#D7E2EA] text-xs sm:text-sm font-medium text-[#D7E2EA] hover:text-white transition-all duration-300"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#141414] hover:bg-[#1F1F1F] border border-[#D7E2EA]/20 hover:border-[#D7E2EA] text-xs sm:text-sm font-medium text-[#D7E2EA] hover:text-white transition-all duration-300"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <span>Instagram</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  {/* X / Twitter */}
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#141414] hover:bg-[#1F1F1F] border border-[#D7E2EA]/20 hover:border-[#D7E2EA] text-xs sm:text-sm font-medium text-[#D7E2EA] hover:text-white transition-all duration-300"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span>X / Twitter</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Bottom Copyright & Navigation Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs sm:text-sm text-[#D7E2EA]/60">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#D7E2EA] uppercase tracking-wider">
              Bine
            </span>
            <span>•</span>
            <span>© {new Date().getFullYear()} All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 uppercase tracking-wider font-medium text-xs">
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="#services" className="hover:text-white transition-colors">
              Skills
            </a>
            <a href="#projects" className="hover:text-white transition-colors">
              Projects
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/15 border border-white/10 hover:border-white/20 text-[#D7E2EA] hover:text-white text-xs uppercase tracking-widest transition-all cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
