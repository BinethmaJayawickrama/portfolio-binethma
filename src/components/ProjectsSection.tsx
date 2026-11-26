import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LiveProjectButton } from './LiveProjectButton';
import { FadeIn } from './FadeIn';

interface ProjectData {
  number: string;
  name: string;
  subtitle: string;
  category: string;
  year: string;
  description: string;
  techStack: string[];
  link: string;
  image: string;
}

const PROJECTS: ProjectData[] = [
  {
    number: '01',
    name: 'Adorix',
    subtitle: 'AI-Powered Conversational Sales Kiosk',
    category: 'AI & Computer Vision',
    year: '2025 – 2026',
    link: 'https://github.com/ADORIX000',
    description:
      'Developed an AI kiosk that detects shoppers and displays targeted video ads in real time. Integrated face tracking and age/gender detection with a voice-activated chatbot for customer Q&A.',
    techStack: ['Python', 'OpenCV', 'FastAPI', 'React.js', 'Tailwind CSS', 'WebSockets', 'Supabase'],
    image: '/assets/project_adorix.jpg',
  },
  {
    number: '02',
    name: 'Smart Tail Pod',
    subtitle: 'IoT-Based Cattle Heat Detection System',
    category: 'IoT & Embedded Systems',
    year: '2026 – Ongoing',
    link: '#contact',
    description:
      'Developing a smart IoT device to detect heat signs in cattle for better artificial insemination timing. Building a wearable sensor system to monitor cattle activity and temperature, paired with mobile and web monitoring apps.',
    techStack: ['ESP32', 'IoT Sensors', 'Python', 'React.js', 'Firebase', 'JavaScript'],
    image: '/assets/project_cattle.jpg',
  },
  {
    number: '03',
    name: 'TeamFlow',
    subtitle: 'Role-Based Workspace Collaboration Platform',
    category: 'Full-Stack Web Platform',
    year: '2026',
    link: 'https://github.com/BinethmaJayawickrama/TeamFlow-Project',
    description:
      'Developed a full-stack project and task management platform featuring role-based dashboards (Admin, Project Manager, Team Collaborator) and workspace segregation with real-time socket notification channels.',
    techStack: ['Next.js', 'Express.js', 'Prisma ORM', 'PostgreSQL', 'Socket.io', 'Tailwind CSS', 'WebSockets', 'JWT Auth'],
    image: '/assets/project_teamflow.jpg',
  },
  {
    number: '04',
    name: 'ApexFled',
    subtitle: 'Premium Digital E-Commerce & Account Store',
    category: 'Full-Stack E-Commerce',
    year: '2026',
    link: 'https://github.com/SithikaWeerasinghe/digital-account-store',
    description:
      'Developed a high-performance e-commerce platform with automated instant digital delivery and custom cart management. Engineered full-stack reviews, ticketing, and a secure Supabase admin dashboard bypassing RLS safely.',
    techStack: ['Next.js (App Router)', 'React.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'REST APIs'],
    image: '/assets/project_apexfled.jpg',
  },
  {
    number: '05',
    name: 'Vision Brightness Sync',
    subtitle: 'AI-Powered Gesture Brightness Controller',
    category: 'Computer Vision & AI Utility',
    year: '2026',
    link: 'https://github.com/BinethmaJayawickrama/vision-brightness-sync',
    description:
      'Built a high-performance Windows system utility utilizing computer vision to dynamically control screen brightness via hand gestures. Implemented distance-independent tracking using hand-pose estimation with edge-snapping optimizations.',
    techStack: ['Python 3.12', 'MediaPipe', 'OpenCV', 'NumPy', 'screen-brightness-control'],
    image: '/assets/project_visionsync.jpg',
  },
  {
    number: '06',
    name: 'Smart Campus API',
    subtitle: 'Smart Campus Sensor & Room Management API',
    category: 'RESTful API & QA Testing',
    year: '2026',
    link: 'https://github.com/BinethmaJayawickrama/smart-campus-API',
    description:
      'Developed and deployed a RESTful Smart Campus Management API using Java and JAX-RS (Jersey) with the DAO pattern and global exception handling to manage campus rooms, IoT sensors, and sensor readings. Designed and executed functional, unit, non-functional, and negative/boundary test cases using Postman to validate endpoints, CRUD operations, HTTP status codes, and JSON payload consistency.',
    techStack: [
      'Java 8',
      'Java EE',
      'JAX-RS (Jersey)',
      'Jackson',
      'Apache Tomcat',
      'Maven',
      'RESTful APIs',
      'Postman',
      'Git',
    ],
    image: '/assets/project_smartcampus.jpg',
  },
];

const ProjectCard: React.FC<{
  project: ProjectData;
  index: number;
  totalCards: number;
}> = ({ project, index, totalCards }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.02;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="min-h-[85vh] flex items-start justify-center sticky w-full mb-10 sm:mb-16"
      style={{
        top: `calc(${index * 22}px + 5.5rem)`,
      }}
    >
      <motion.div
        style={{ scale }}
        className="w-full max-w-6xl bg-[#0C0C0C] border-2 border-[#D7E2EA] rounded-[36px] sm:rounded-[48px] md:rounded-[56px] p-5 sm:p-7 md:p-9 flex flex-col justify-between shadow-2xl overflow-hidden backdrop-blur-xl"
      >
        {/* Top Folder Tab Row: Number, Meta, Name, Action Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 md:pb-6 border-b border-[#D7E2EA]/20">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            {/* Folder Number */}
            <span className="font-black text-4xl sm:text-5xl md:text-6xl text-[#D7E2EA] leading-none shrink-0">
              {project.number}
            </span>

            {/* Category, Year & Name */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <span className="text-[#D7E2EA]/60 uppercase font-light tracking-widest text-xs sm:text-sm">
                  {project.category}
                </span>
                <span className="text-[#D7E2EA]/40 text-xs">•</span>
                <span className="text-[#D7E2EA]/60 font-light text-xs sm:text-sm">
                  {project.year}
                </span>
              </div>
              <h3 className="text-[#D7E2EA] font-semibold uppercase tracking-wide text-lg sm:text-2xl md:text-3xl">
                {project.name}
              </h3>
            </div>
          </div>

          {/* Repository / Project Action Button */}
          <LiveProjectButton
            href={project.link}
            label={project.link.includes('github.com') ? 'GitHub' : 'View Project'}
          />
        </div>

        {/* Content Row: Description & Tech Stack (Left) + UI Preview (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8 pt-5 sm:pt-6 w-full items-stretch">
          {/* Left Column: Details & Tech Stack */}
          <div className="md:col-span-5 flex flex-col justify-between gap-5">
            <div className="flex flex-col gap-3">
              <p className="text-sm sm:text-base font-medium text-[#D7E2EA] opacity-90 leading-tight">
                {project.subtitle}
              </p>
              <p className="text-xs sm:text-sm font-light text-[#D7E2EA]/80 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-col gap-2 pt-2 border-t border-[#D7E2EA]/10">
              <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#D7E2EA]/50 font-medium">
                Technologies Used
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-medium bg-white/[0.06] border border-white/10 text-[#D7E2EA] hover:bg-white/15 hover:border-white/20 transition-all duration-200 select-none"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: High-Res UI Mockup Showcase */}
          <div className="md:col-span-7 flex flex-col">
            <div className="w-full h-[240px] sm:h-[300px] md:h-[360px] rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden bg-[#181818] border border-white/10 shadow-inner group/img relative">
              <img
                src={project.image}
                alt={`${project.name} preview`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative px-5 sm:px-8 md:px-10 pt-20 pb-16 sm:pb-24 w-full select-none"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Heading: "Projects" */}
        <FadeIn delay={0} y={40} duration={0.7} className="text-center mb-16 sm:mb-24">
          <h2
            className="hero-heading font-black uppercase text-center leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Projects
          </h2>
        </FadeIn>

        {/* 6 Stacking Folder Cards */}
        <div className="flex flex-col w-full relative">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={index}
              totalCards={PROJECTS.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
