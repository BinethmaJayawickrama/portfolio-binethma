import React from 'react';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';

export const App: React.FC = () => {
  return (
    <main className="w-full min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-kanit overflow-x-clip relative">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <MarqueeSection />
    </main>
  );
};

export default App;
