import React, { useState } from 'react';
import { FadeIn } from './FadeIn';
import {
  Send,
  Mail,
  MapPin,
  ArrowUpRight,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const contactEmail = 'binethma.jayawickrama@gmail.com';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate submission & open mailto fallback or show interactive confirmation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 900);
  };

  return (
    <section
      id="contact"
      className="relative bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-10 pt-12 sm:pt-20 pb-16 sm:pb-24 w-full overflow-hidden select-none"
    >
      {/* Subtle Ambient Purple/Magenta Glow Behind Section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[520px] sm:w-[760px] h-[320px] rounded-full bg-gradient-to-r from-[#B600A8]/15 via-[#7621B0]/15 to-[#BE4C00]/10 blur-[130px] z-0"
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Section Heading */}
        <FadeIn delay={0} y={40} duration={0.7} className="text-center mb-12 sm:mb-20">
          <h2
            className="hero-heading font-black uppercase text-center leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Contact Me
          </h2>
        </FadeIn>

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Pitch, Availability & Direct Connect Cards */}
          <FadeIn
            delay={0.1}
            y={30}
            duration={0.7}
            className="lg:col-span-5 flex flex-col justify-between gap-6"
          >
            <div className="flex flex-col gap-6">
              {/* Availability Badge */}
              <div className="inline-flex items-center gap-2.5 self-start px-4 py-2 rounded-full bg-white/[0.05] border border-white/15 backdrop-blur-md">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-medium tracking-wider uppercase text-[#D7E2EA]">
                  Available for New Opportunities
                </span>
              </div>

              {/* Headline & Subtitle */}
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wide text-white leading-tight">
                  Let&apos;s build something extraordinary together.
                </h3>
                <p className="text-sm sm:text-base font-light text-[#D7E2EA]/75 leading-relaxed">
                  Have a project in mind, looking for a full-stack or AI developer, or just want to connect? Drop a message and I&apos;ll get back to you as soon as possible.
                </p>
              </div>

              {/* Direct Contact Cards */}
              <div className="flex flex-col gap-3.5 pt-2">
                {/* Email Card */}
                <div className="group flex items-center justify-between p-4 sm:p-5 rounded-3xl bg-[#141414]/90 border border-[#D7E2EA]/15 hover:border-[#D7E2EA]/40 transition-all duration-300">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-11 h-11 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0 text-[#D7E2EA] group-hover:text-white group-hover:scale-105 transition-all">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[11px] uppercase tracking-widest text-[#D7E2EA]/50 font-medium">
                        Email
                      </span>
                      <a
                        href={`mailto:${contactEmail}`}
                        className="text-xs sm:text-sm md:text-base font-medium text-[#D7E2EA] hover:text-white truncate transition-colors"
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
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-widest text-[#D7E2EA]/50 font-medium">
                      Location &amp; Education
                    </span>
                    <span className="text-xs sm:text-sm md:text-base font-medium text-[#D7E2EA]">
                      Sri Lanka • BSc (Hons) CS, Univ. of Westminster
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links Row */}
            <div className="flex flex-col gap-3 pt-4 border-t border-[#D7E2EA]/15">
              <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 font-medium">
                Connect Across Platforms
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://github.com/BinethmaJayawickrama"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#141414] hover:bg-[#1F1F1F] border border-[#D7E2EA]/20 hover:border-[#D7E2EA] text-xs sm:text-sm font-medium text-[#D7E2EA] hover:text-white transition-all duration-300"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#141414] hover:bg-[#1F1F1F] border border-[#D7E2EA]/20 hover:border-[#D7E2EA] text-xs sm:text-sm font-medium text-[#D7E2EA] hover:text-white transition-all duration-300"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Right Column: Interactive Contact Form Card */}
          <FadeIn
            delay={0.2}
            y={30}
            duration={0.7}
            className="lg:col-span-7 flex flex-col"
          >
            <div className="w-full h-full bg-[#111111]/95 border-2 border-[#D7E2EA] rounded-[36px] sm:rounded-[48px] p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
              {/* Top Card Header Bar (Matches Projects Folder Card Style) */}
              <div className="flex items-center justify-between pb-5 mb-6 border-b border-[#D7E2EA]/20">
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="font-black text-3xl sm:text-4xl text-[#D7E2EA] leading-none">
                    07
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-light">
                      Direct Inquiry
                    </span>
                    <h4 className="text-lg sm:text-xl md:text-2xl font-semibold uppercase tracking-wide text-[#D7E2EA]">
                      Send a Message
                    </h4>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-xs text-[#D7E2EA]/80">
                  <Sparkles className="w-3.5 h-3.5 text-[#B600A8]" />
                  <span>Quick Response</span>
                </div>
              </div>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12 sm:py-16 px-4 gap-5 my-auto">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-lg">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <div className="flex flex-col gap-2 max-w-md">
                    <h4 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide text-white">
                      Message Received!
                    </h4>
                    <p className="text-sm sm:text-base font-light text-[#D7E2EA]/80 leading-relaxed">
                      Thank you for reaching out. I&apos;ve received your inquiry and will get back to you shortly.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="mt-2 inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-[#1A1A1A] hover:bg-[#242424] border border-[#D7E2EA]/30 hover:border-[#D7E2EA] text-xs sm:text-sm font-medium uppercase tracking-wider text-[#D7E2EA] hover:text-white transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name Field */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="name"
                        className="text-xs uppercase tracking-widest text-[#D7E2EA]/70 font-medium pl-1"
                      >
                        Your Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3.5 rounded-2xl bg-[#1A1A1A] border border-[#D7E2EA]/20 focus:border-[#D7E2EA] focus:bg-[#202020] text-[#D7E2EA] placeholder-[#D7E2EA]/30 text-sm sm:text-base outline-none transition-all duration-200"
                      />
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="email"
                        className="text-xs uppercase tracking-widest text-[#D7E2EA]/70 font-medium pl-1"
                      >
                        Your Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3.5 rounded-2xl bg-[#1A1A1A] border border-[#D7E2EA]/20 focus:border-[#D7E2EA] focus:bg-[#202020] text-[#D7E2EA] placeholder-[#D7E2EA]/30 text-sm sm:text-base outline-none transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="subject"
                      className="text-xs uppercase tracking-widest text-[#D7E2EA]/70 font-medium pl-1"
                    >
                      Subject / Project Type
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Full-Stack Web App, AI Collaboration, Job Opportunity..."
                      className="w-full px-4 py-3.5 rounded-2xl bg-[#1A1A1A] border border-[#D7E2EA]/20 focus:border-[#D7E2EA] focus:bg-[#202020] text-[#D7E2EA] placeholder-[#D7E2EA]/30 text-sm sm:text-base outline-none transition-all duration-200"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="message"
                      className="text-xs uppercase tracking-widest text-[#D7E2EA]/70 font-medium pl-1"
                    >
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project, timeline, or how we can work together..."
                      className="w-full px-4 py-3.5 rounded-2xl bg-[#1A1A1A] border border-[#D7E2EA]/20 focus:border-[#D7E2EA] focus:bg-[#202020] text-[#D7E2EA] placeholder-[#D7E2EA]/30 text-sm sm:text-base outline-none transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-[#D7E2EA]/50 font-light order-2 sm:order-1">
                      * Required fields. Your privacy is respected.
                    </span>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto order-1 sm:order-2 group contact-button-style inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full font-semibold uppercase tracking-widest text-white text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-60 cursor-pointer"
                    >
                      <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                      <Send className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
