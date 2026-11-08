import React from 'react';

interface TechIconProps {
  name: string;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className = 'w-5 h-5' }) => {
  const norm = name.toLowerCase().trim();

  // Python
  if (norm.includes('python')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path
          d="M11.9 2c-3.1 0-5.1 1.4-5.1 4.1v2.1h5.3v.8H4.6C2.3 9 1 10.9 1 14.1s1.3 5 3.6 5.1h2.2v-3.1c0-2.3 2-4.1 4.3-4.1h5.2c1.9 0 3.3-1.4 3.3-3.3V6.1C19.6 3.4 17.6 2 11.9 2zm-1.8 1.9c.7 0 1.2.6 1.2 1.3 0 .7-.5 1.2-1.2 1.2-.7 0-1.2-.5-1.2-1.2 0-.7.5-1.3 1.2-1.3z"
          fill="#3776AB"
        />
        <path
          d="M12.1 22c3.1 0 5.1-1.4 5.1-4.1v-2.1h-5.3v-.8h7.5c2.3 0 3.6-1.9 3.6-5.1s-1.3-5-3.6-5.1h-2.2v3.1c0 2.3-2 4.1-4.3 4.1H7.7c-1.9 0-3.3 1.4-3.3 3.3v2.7c0 2.7 2 4.1 7.7 4.1zm1.8-1.9c-.7 0-1.2-.6-1.2-1.3 0-.7.5-1.2 1.2-1.2.7 0 1.2.5 1.2 1.2 0 .7-.5 1.3-1.2 1.3z"
          fill="#FFD43B"
        />
      </svg>
    );
  }

  // Java
  if (norm.includes('java') && !norm.includes('javascript')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path
          d="M8.8 19.5c3.2.3 6.3-.1 9.3-.9-1.2.6-3.8 1.1-6.1 1.2-2.3.1-3.2-.3-3.2-.3zm-1.1 2.2c4.7.4 9.4-.2 13.9-1.4-1.8.8-5.7 1.7-9.1 1.8-3.5.1-4.8-.4-4.8-.4zm8.6-6.4c1.1.9 1.8 1.7 1.8 2.5 0 .2 0 .3-.1.4-1.5.3-3.2.4-4.8.4-3.2 0-6.1-.7-6.1-1.6 0-.8.9-1.2 2.3-1.7 2.1-.8 4.7-1.4 6.9 0zM12.4 8.7c-1.2 1.4-2.4 2.8-1.8 4.2 1.1-.3 2.1-.9 2.9-1.7 1.1-1 1.8-2.3 1.2-3.7-.8.3-1.6.7-2.3 1.2zm2.9-4.8c-.8.8-1.6 1.7-1.2 2.6.7-.2 1.4-.6 1.9-1.1.7-.7 1.2-1.5.8-2.4-.5.3-1 .6-1.5.9z"
          fill="#E76F00"
        />
        <path
          d="M17.8 13.2c1.7-1.4 2.2-3.4 1.2-5.1-.3.5-.7 1-1.2 1.4-1.3 1.1-2 2.4-1.4 3.8.5 0 .9-.1 1.4-.1z"
          fill="#5382A1"
        />
      </svg>
    );
  }

  // JavaScript
  if (norm.includes('javascript') || norm === 'js') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#F7DF1E" />
        <path
          d="M7 17.5c.6.9 1.4 1.5 2.6 1.5 1.3 0 2.1-.6 2.1-2.1v-6.3h-1.9v6.3c0 .5-.2.8-.7.8-.4 0-.7-.3-.9-.7l-1.2.5zm7.3-.2c.7.4 1.6.7 2.4.7 1.4 0 2.2-.7 2.2-1.7 0-1-.7-1.4-1.9-1.9l-.6-.3c-1.2-.5-1.9-1.2-1.9-2.3 0-1.4 1.1-2.3 2.8-2.3.9 0 1.6.2 2.2.6l-.6 1.4c-.5-.3-1-.5-1.6-.5-.8 0-1.3.4-1.3 1 0 .7.5 1 1.5 1.4l.6.3c1.4.6 2.3 1.2 2.3 2.5 0 1.6-1.2 2.6-3.2 2.6-1.1 0-2-.3-2.7-.8l.5-1.5z"
          fill="#000000"
        />
      </svg>
    );
  }

  // HTML5
  if (norm.includes('html')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M3 2l1.6 18.4L12 23l7.4-2.6L21 2H3z" fill="#E44D26" />
        <path d="M12 21.1l6.1-2.1 1.3-15H12v17.1z" fill="#F16529" />
        <path
          d="M12 7.7H7.7l.2 2.5H12V7.7zm0 5H7.9l.3 2.5H12v-2.5zm0 4.9l-2.9-.8-.2-2.1H6.4l.4 4.1L12 19.8v-2.2z"
          fill="#EBEBEB"
        />
        <path
          d="M12 7.7v2.5h4.1l-.4 4.8-3.7 1v2.1l5.8-1.6.5-6.3.3-2.5H12z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // CSS3
  if (norm.includes('css')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M3 2l1.6 18.4L12 23l7.4-2.6L21 2H3z" fill="#1572B6" />
        <path d="M12 21.1l6.1-2.1 1.3-15H12v17.1z" fill="#33A9DC" />
        <path
          d="M12 7.7H7.7l.2 2.5H12V7.7zm0 5H7.9l.3 2.5H12v-2.5zm0 4.9l-2.9-.8-.2-2.1H6.4l.4 4.1L12 19.8v-2.2z"
          fill="#EBEBEB"
        />
        <path
          d="M12 7.7v2.5h4.1l-.4 4.8-3.7 1v2.1l5.8-1.6.5-6.3.3-2.5H12z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // React.js
  if (norm.includes('react')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4"
          transform="rotate(60 12 12)"
          stroke="#61DAFB"
          strokeWidth="1.5"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4"
          transform="rotate(120 12 12)"
          stroke="#61DAFB"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
      </svg>
    );
  }

  // Next.js
  if (norm.includes('next')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="11" fill="#000000" />
        <path
          d="M16.5 8.5v7m-9-7v7l8.2-7"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Responsive Web Design
  if (norm.includes('responsive')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.8">
        <rect x="2" y="3" width="14" height="11" rx="2" />
        <line x1="6" y1="17" x2="12" y2="17" />
        <line x1="9" y1="14" x2="9" y2="17" />
        <rect x="14" y="8" width="8" height="13" rx="2" fill="#FFFFFF" />
        <circle cx="18" cy="18" r="0.8" fill="#2563EB" />
      </svg>
    );
  }

  // Flutter
  if (norm.includes('flutter')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M14.2 2.5L4 12.7l3.6 3.6L19.4 4.5h-5.2z" fill="#42A5F5" />
        <path d="M14.2 11.8L9.5 16.5l4.7 4.7h5.2l-6.5-6.5 2.7-2.9h-1.4z" fill="#01579B" />
        <path d="M10.8 15.2l2.3-2.3 3.6 3.6-2.3 2.3-3.6-3.6z" fill="#29B6F6" />
      </svg>
    );
  }

  // OpenCV
  if (norm.includes('opencv')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="6" r="4.2" stroke="#EA4335" strokeWidth="2.2" />
        <circle cx="6.5" cy="16" r="4.2" stroke="#4285F4" strokeWidth="2.2" />
        <circle cx="17.5" cy="16" r="4.2" stroke="#34A853" strokeWidth="2.2" />
      </svg>
    );
  }

  // MySQL
  if (norm.includes('mysql')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path
          d="M18.7 13.8c-1.3-.8-2.6-1.5-4-1.8 1.4-.4 2.8-.4 4.1.2.6.3 1.2.8 1.7 1.3-.6.2-1.2.3-1.8.3zm2.5-1.9c-.8-.9-1.9-1.5-3-1.8-.7-.2-1.5-.3-2.3-.2-1.7.1-3.3.8-4.7 1.8-.8.6-1.5 1.4-2.1 2.2-.4.5-.7 1.1-.9 1.7-.1.4-.2.8-.2 1.2 0 .5.2.9.5 1.3.4.4.9.7 1.4.8.8.2 1.6.1 2.4-.2.9-.3 1.8-.8 2.5-1.4 1.1-.9 2-2 2.7-3.2.7-.3 1.5-.5 2.3-.5.5 0 1 .1 1.5.3-.1-.7-.2-1.5-.2-2.2z"
          fill="#00758F"
        />
        <path
          d="M7.8 13.1c-.8.8-1.5 1.8-2 2.8-.3.7-.5 1.5-.6 2.3 0 .4.1.8.3 1.1.2.3.6.5 1 .6.6.1 1.2 0 1.8-.2.7-.3 1.4-.7 2-1.2.4-.3.7-.7 1-1.1.3-.5.5-1 .6-1.6.1-.7 0-1.4-.2-2-.3-.5-.7-.9-1.2-1.2-.8-.6-1.8-.9-2.7-.9v1.4z"
          fill="#F29111"
        />
      </svg>
    );
  }

  // SQL (Generic Database)
  if (norm === 'sql') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#00758F" strokeWidth="1.8">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    );
  }

  // Figma
  if (norm.includes('figma')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M8 2h4v5H8a2.5 2.5 0 0 1 0-5z" fill="#F24E1E" />
        <path d="M12 2h4a2.5 2.5 0 0 1 0 5h-4V2z" fill="#FF7262" />
        <path d="M8 7h4v5H8a2.5 2.5 0 0 1 0-5z" fill="#A259FF" />
        <circle cx="14.5" cy="9.5" r="2.5" fill="#1ABCFE" />
        <path d="M8 12h4v4.5A2.5 2.5 0 1 1 8 14v-2z" fill="#0ACF83" />
      </svg>
    );
  }

  // Wireframing
  if (norm.includes('wireframe')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
        <line x1="13" y1="13" x2="17" y2="13" />
        <line x1="13" y1="17" x2="17" y2="17" />
      </svg>
    );
  }

  // UI Design
  if (norm.includes('ui design')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="1.8">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  }

  // Prototyping
  if (norm.includes('prototyping') || norm.includes('prototype')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.8">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    );
  }

  // Git
  if (norm === 'git') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path
          d="M21.7 10.7l-8.4-8.4a1.8 1.8 0 0 0-2.6 0L8.4 4.6l3.3 3.3a2.2 2.2 0 0 1 2.7 2.8l3.1 3.1a2.1 2.1 0 1 1-1.3 1.2l-2.9-2.9v4.3a2.2 2.2 0 1 1-1.8 0V11a2.2 2.2 0 0 1-1.2-2.9L7 4.8 2.3 9.5a1.8 1.8 0 0 0 0 2.6l8.4 8.4a1.8 1.8 0 0 0 2.6 0l8.4-8.4a1.8 1.8 0 0 0 0-2.6z"
          fill="#F05032"
        />
      </svg>
    );
  }

  // GitHub
  if (norm.includes('github')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="#181717">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.57 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85 0 1.7.12 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.23 10.23 0 0 0 22 12.23C22 6.58 17.52 2 12 2z"
        />
      </svg>
    );
  }

  // Vercel
  if (norm.includes('vercel')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="#000000">
        <path d="M12 2L23 21H1L12 2z" />
      </svg>
    );
  }

  // Version Control
  if (norm.includes('version control')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.8">
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="12" r="3" />
        <path d="M6 9v6" />
        <path d="M18 9a9 9 0 0 0-9 9" />
      </svg>
    );
  }

  // Deployment
  if (norm.includes('deployment') || norm.includes('web app')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.8">
        <path d="M12 2v8m0 0l-3-3m3 3l3-3" />
        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
        <path d="M16 16l-4-4-4 4" />
      </svg>
    );
  }

  // IP Addressing / Networking
  if (norm.includes('ip') || norm.includes('network')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="1.8">
        <rect x="2" y="2" width="6" height="6" rx="1" />
        <rect x="16" y="2" width="6" height="6" rx="1" />
        <rect x="9" y="16" width="6" height="6" rx="1" />
        <path d="M5 8v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8" />
        <path d="M12 13v3" />
      </svg>
    );
  }

  // Fallback generic code icon
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
};

export default TechIcon;
