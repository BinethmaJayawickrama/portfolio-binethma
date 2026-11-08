import React from 'react';
import { FadeIn } from './FadeIn';
import { TechIcon } from './TechIcon';

interface TechCategory {
  number: string;
  name: string;
  skills: string[];
  description: string;
}

const TECHNOLOGIES: TechCategory[] = [
  {
    number: '01',
    name: 'Programming Languages',
    skills: ['Python', 'Java', 'JavaScript'],
    description:
      'Core programming paradigms, object-oriented design, algorithm optimization, and software development in Python, Java, and JavaScript.',
  },
  {
    number: '02',
    name: 'Frontend Development',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Next.js', 'Responsive Web Design'],
    description:
      'Building responsive, interactive, and high-performance web applications using modern component architectures, React.js, and Next.js.',
  },
  {
    number: '03',
    name: 'Mobile Application Development',
    skills: ['Flutter'],
    description:
      'Cross-platform mobile application engineering with Flutter, delivering smooth reactive user interfaces and native performance.',
  },
  {
    number: '04',
    name: 'Computer Vision & Image Processing',
    skills: ['OpenCV'],
    description:
      'Image processing, feature detection, object recognition, and visual analytics workflows implemented with OpenCV.',
  },
  {
    number: '05',
    name: 'Database Management',
    skills: ['MySQL', 'SQL'],
    description:
      'Relational database architecture, data modeling, schema design, normalization, and efficient SQL query optimization.',
  },
  {
    number: '06',
    name: 'Networking',
    skills: ['Network Fundamentals'],
    description:
      'Understanding of IP addressing, subnetting, basic network configuration, and core data communication fundamentals.',
  },
  {
    number: '07',
    name: 'UI/UX & Design Tools',
    skills: ['Figma', 'Wireframing', 'UI Design', 'Prototyping'],
    description:
      'User-centered interface design, comprehensive wireframing, component-based design systems, and interactive prototypes in Figma.',
  },
  {
    number: '08',
    name: 'Development Tools & Platforms',
    skills: ['Git', 'GitHub', 'Vercel', 'Version Control', 'Web App Deployment'],
    description:
      'Collaborative version control, CI/CD pipelines, and seamless cloud deployments using Git, GitHub, and Vercel.',
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
              key={item.number}
              delay={index * 0.08}
              y={30}
              duration={0.65}
              className="w-full"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-8 sm:py-10 md:py-12 border-b border-[rgba(12,12,12,0.15)] gap-4 sm:gap-8 md:gap-14 group transition-colors duration-200">
                {/* Left: Number */}
                <span
                  className="font-black text-[#0C0C0C] leading-none shrink-0 opacity-80 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ fontSize: 'clamp(2.5rem, 8vw, 120px)' }}
                >
                  {item.number}
                </span>

                {/* Right: Name + Skills Badges + Description */}
                <div className="flex flex-col flex-1 gap-2.5 sm:gap-3">
                  <h3
                    className="font-semibold uppercase text-[#0C0C0C] leading-tight"
                    style={{ fontSize: 'clamp(1.15rem, 2.4vw, 2.2rem)' }}
                  >
                    {item.name}
                  </h3>

                  {/* Skills: Large prominent icons only */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 my-2.5">
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

                  {/* Description */}
                  <p
                    className="font-normal text-[#0C0C0C] leading-relaxed max-w-2xl opacity-70"
                    style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.15rem)' }}
                  >
                    {item.description}
                  </p>
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
