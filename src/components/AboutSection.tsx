import React from 'react';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { Download } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const handleDownloadCV = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/assets/cv.pdf');
      if (!response.ok) throw new Error('Failed to fetch CV');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Binethma_Jayawickrama_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch {
      window.open('/assets/cv.pdf', '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 pt-14 sm:pt-20 md:pt-24 pb-16 sm:pb-20 bg-[#0C0C0C] overflow-hidden select-none"
    >
      {/* Content Center Container */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl text-center w-full">
        {/* Heading */}
        <FadeIn delay={0} y={40} duration={0.7} className="w-full">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        {/* Gap between heading and text */}
        <div className="h-8 sm:h-10 md:h-12 w-full" />

        {/* Animated Paragraph */}
        <div className="max-w-[760px] w-full px-4 text-center">
          <AnimatedText
            text="Dedicated and motivated undergraduate pursuing a BSc (Hons) in Computer Science at University of Westminster, with a strong passion for web development and software engineering. Possesses a solid foundation in programming languages including Java and Python, along with modern web technologies such as HTML, CSS, JavaScript, React.js, and Next.js. Demonstrates strong analytical thinking, problem solving abilities, and a commitment to continuous learning. Eager to apply academic knowledge and technical skills in practical, real-world environments while further developing expertise in full-stack and modern web application development."
            className="text-[#D7E2EA] font-medium text-center text-base sm:text-lg md:text-xl leading-relaxed"
          />
        </div>

        {/* Gap between text block and buttons */}
        <div className="h-10 sm:h-12 md:h-14 w-full" />

        {/* Action Buttons styled to match website theme */}
        <FadeIn delay={0.2} y={20} duration={0.6}>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            {/* View Projects Button - Signature Magenta/Purple Gradient */}
            <a
              href="#projects"
              className="group contact-button-style inline-flex items-center justify-center px-8 py-3.5 sm:px-9 sm:py-4 text-white font-semibold text-base sm:text-lg rounded-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer select-none"
            >
              <span>View Projects</span>
            </a>

            {/* Download CV Button - Obsidian & Chrome Silver Border */}
            <a
              href="/assets/cv.pdf"
              download="Binethma_Jayawickrama_CV.pdf"
              onClick={handleDownloadCV}
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:px-9 sm:py-4 bg-[#141414]/90 hover:bg-[#1F1F1F] text-[#D7E2EA] hover:text-white font-semibold text-base sm:text-lg rounded-2xl border-2 border-[#D7E2EA] hover:border-white shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_4px_20px_rgba(215,226,234,0.15)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer select-none backdrop-blur-sm"
            >
              <span>Download CV</span>
              <Download className="w-5 h-5 transition-transform duration-200 group-hover:translate-y-0.5" strokeWidth={2.2} />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default AboutSection;
