import React from 'react';
import { FadeIn } from './FadeIn';
import { TechIcon } from './TechIcon';

interface TechCategory {
  name: string;
  skills: string[];
}

const TECHNOLOGIES: TechCategory[] = [
  {
    name: 'Programming Languages',
    skills: ['Python', 'Java', 'JavaScript'],
  },
  {
    name: 'Frontend Development',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Next.js', 'Responsive Web Design'],
  },
  {
    name: 'Mobile Application Development',
    skills: ['Flutter'],
  },
  {
    name: 'Computer Vision & Image Processing',
    skills: ['OpenCV'],
  },
  {
    name: 'Database Management',
    skills: ['MySQL', 'SQL'],
  },
  {
    name: 'Networking',
    skills: ['Network Fundamentals'],
  },
  {
    name: 'UI/UX & Design Tools',
    skills: ['Figma', 'Wireframing', 'UI Design', 'Prototyping'],
  },
  {
    name: 'Software Testing & QA',
    skills: [
      'Postman',
      'API Testing',
      'Unit Testing',
      'Functional Testing',
      'Boundary & Negative Testing',
    ],
  },
  {
    name: 'Development Tools & Platforms',
    skills: ['Git', 'GitHub', 'Vercel', 'Version Control', 'Web App Deployment'],
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 w-full relative z-0 select-none"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Heading */}
        <FadeIn delay={0} y={40} duration={0.7} className="text-center">
          <h2
            className="text-[#0C0C0C] font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20 md:mb-28"
            style={{ fontSize: 'clamp(2.75rem, 11vw, 150px)' }}
          >
            Technical Skills
          </h2>
        </FadeIn>

        {/* 8 Technology categories in vertical list */}
        <div className="w-full flex flex-col border-t border-[rgba(12,12,12,0.15)]">
          {TECHNOLOGIES.map((item, index) => (
            <FadeIn
              key={item.name}
              delay={index * 0.08}
              y={30}
              duration={0.65}
              className="w-full"
            >
              <div className="flex flex-col items-center justify-center text-center py-8 sm:py-10 md:py-12 border-b border-[rgba(12,12,12,0.15)] gap-3 sm:gap-4 group transition-colors duration-200">
                {/* Name + Skills Badges */}
                <div className="flex flex-col items-center text-center gap-2.5 sm:gap-3">
                  <h3
                    className="font-semibold uppercase text-[#0C0C0C] leading-tight text-center"
                    style={{ fontSize: 'clamp(1.15rem, 2.4vw, 2.2rem)' }}
                  >
                    {item.name}
                  </h3>

                  {/* Skills: Large prominent icons only */}
                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-1">
                    {item.skills.map((skill) => (
                      <div
                        key={skill}
                        title={skill}
                        className="relative group/icon flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-[#0C0C0C]/[0.04] border border-[#0C0C0C]/10 hover:border-[#0C0C0C]/30 hover:bg-[#0C0C0C]/[0.08] hover:scale-110 hover:shadow-md transition-all duration-300 cursor-pointer select-none p-2.5 sm:p-3"
                      >
                        <TechIcon
                          name={skill}
                          className="w-full h-full object-contain transition-transform duration-200 group-hover/icon:scale-110"
                        />
                        {/* Hover Tooltip */}
                        <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#0C0C0C] text-white text-xs font-medium rounded-lg opacity-0 group-hover/icon:opacity-100 pointer-events-none transition-opacity duration-200 shadow-xl whitespace-nowrap z-30">
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
