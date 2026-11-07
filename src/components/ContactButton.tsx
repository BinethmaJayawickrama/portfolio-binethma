import React from 'react';

interface ContactButtonProps {
  className?: string;
  onClick?: () => void;
  href?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  className = '',
  onClick,
  href = '#contact',
}) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`contact-btn contact-button-style inline-flex items-center justify-center rounded-full font-medium uppercase tracking-widest text-white transition-all duration-300 hover:scale-105 active:scale-95 px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base cursor-pointer ${className}`}
    >
      Contact Me
    </a>
  );
};
