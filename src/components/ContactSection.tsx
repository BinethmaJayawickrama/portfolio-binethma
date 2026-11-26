import React, { useState } from 'react';
import { FadeIn } from './FadeIn';
import { Send, Mail, Phone, CheckCircle2 } from 'lucide-react';

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const contactEmail = 'binethmad@gmail.com';
  const contactPhone = '+94701131651';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const submitViaHiddenForm = () => {
    const iframeName = 'formsubmit_hidden_iframe';
    let iframe = document.getElementById(iframeName) as HTMLIFrameElement | null;
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = iframeName;
      iframe.name = iframeName;
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
    }

    const tempForm = document.createElement('form');
    tempForm.method = 'POST';
    tempForm.action = `https://formsubmit.co/${contactEmail}`;
    tempForm.target = iframeName;
    tempForm.style.display = 'none';

    const fields: Record<string, string> = {
      name: formData.name,
      email: formData.email,
      _replyto: formData.email,
      _subject: formData.subject.trim()
        ? `Portfolio Inquiry: ${formData.subject}`
        : `New Portfolio Message from ${formData.name}`,
      subject: formData.subject || 'General Inquiry',
      message: formData.message,
      _template: 'table',
      _captcha: 'false',
    };

    Object.entries(fields).forEach(([key, val]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = val;
      tempForm.appendChild(input);
    });

    document.body.appendChild(tempForm);
    tempForm.submit();
    setTimeout(() => {
      if (document.body.contains(tempForm)) {
        document.body.removeChild(tempForm);
      }
    }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('_replyto', formData.email);
      payload.append(
        '_subject',
        formData.subject.trim()
          ? `Portfolio Inquiry: ${formData.subject}`
          : `New Portfolio Message from ${formData.name}`
      );
      payload.append('subject', formData.subject || 'General Inquiry');
      payload.append('message', formData.message);
      payload.append('_template', 'table');
      payload.append('_captcha', 'false');

      const response = await fetch(`https://formsubmit.co/ajax/${contactEmail}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: payload,
      });

      const result = await response.json();

      if (
        response.ok &&
        (result.success === 'true' ||
          result.success === true ||
          (typeof result.message === 'string' &&
            result.message.toLowerCase().includes('activation')))
      ) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setErrorMessage(
          result.message || 'Unable to send message right now. Please try again.'
        );
      }
    } catch {
      // Only use hidden form fallback if fetch itself failed due to network/CORS
      submitViaHiddenForm();
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-10 pt-12 sm:pt-20 pb-16 sm:pb-24 w-full overflow-hidden select-none"
    >
      {/* Subtle Ambient Purple/Magenta Glow Behind Form */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[520px] sm:w-[760px] h-[320px] rounded-full bg-gradient-to-r from-[#B600A8]/15 via-[#7621B0]/15 to-[#BE4C00]/10 blur-[130px] z-0"
      />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        {/* Section Heading */}
        <FadeIn delay={0} y={40} duration={0.7} className="text-center mb-12 sm:mb-16">
          <h2
            className="hero-heading font-black uppercase text-center leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Contact Me
          </h2>
        </FadeIn>

        {/* Centered Contact Form Card */}
        <FadeIn delay={0.15} y={30} duration={0.7} className="w-full">
          <div className="w-full bg-[#111111]/95 border-2 border-[#D7E2EA] rounded-[36px] sm:rounded-[48px] p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl flex flex-col gap-8">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center text-center py-12 sm:py-16 px-4 gap-5">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-lg">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div className="flex flex-col gap-2 max-w-md">
                  <h4 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide text-white">
                    Message Received!
                  </h4>
                  <p className="text-sm sm:text-base font-light text-[#D7E2EA]/80 leading-relaxed">
                    Thank you for reaching out. I&apos;ve received your message and will get back to you shortly.
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
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry, QA / Software Engineering Opportunity..."
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
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3.5 rounded-2xl bg-[#1A1A1A] border border-[#D7E2EA]/20 focus:border-[#D7E2EA] focus:bg-[#202020] text-[#D7E2EA] placeholder-[#D7E2EA]/30 text-sm sm:text-base outline-none transition-all duration-200 resize-none"
                  />
                </div>

                {errorMessage && (
                  <p className="text-xs sm:text-sm text-[#D7E2EA] bg-white/[0.06] border border-white/15 rounded-xl py-2.5 px-4 text-center">
                    {errorMessage}
                  </p>
                )}

                {/* Submit Button Centered */}
                <div className="pt-2 flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto group contact-button-style inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-full font-semibold uppercase tracking-widest text-white text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-60 cursor-pointer"
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    <Send className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </form>
            )}

            {/* Bottom of Form: Social Icons (Instagram, LinkedIn, Email) + Mobile Number */}
            <div className="pt-6 border-t border-[#D7E2EA]/15 flex flex-col items-center justify-center gap-5">
              {/* Icons Row: Instagram, LinkedIn, GitHub, Email */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                {/* Instagram Icon */}
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram"
                  className="group relative flex items-center justify-center w-12 h-12 rounded-2xl bg-[#1A1A1A] hover:bg-white/15 border border-[#D7E2EA]/20 hover:border-[#D7E2EA] text-[#D7E2EA] hover:text-white hover:scale-110 transition-all duration-300"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* LinkedIn Icon */}
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  className="group relative flex items-center justify-center w-12 h-12 rounded-2xl bg-[#1A1A1A] hover:bg-white/15 border border-[#D7E2EA]/20 hover:border-[#D7E2EA] text-[#D7E2EA] hover:text-white hover:scale-110 transition-all duration-300"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>

                {/* GitHub Icon */}
                <a
                  href="https://github.com/BinethmaJayawickrama"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                  className="group relative flex items-center justify-center w-12 h-12 rounded-2xl bg-[#1A1A1A] hover:bg-white/15 border border-[#D7E2EA]/20 hover:border-[#D7E2EA] text-[#D7E2EA] hover:text-white hover:scale-110 transition-all duration-300"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </a>

                {/* Email Icon */}
                <a
                  href={`mailto:${contactEmail}`}
                  title={contactEmail}
                  className="group relative flex items-center justify-center w-12 h-12 rounded-2xl bg-[#1A1A1A] hover:bg-white/15 border border-[#D7E2EA]/20 hover:border-[#D7E2EA] text-[#D7E2EA] hover:text-white hover:scale-110 transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>

              {/* Email & Mobile Number Details */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-[#D7E2EA]/80">
                <a
                  href={`mailto:${contactEmail}`}
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#D7E2EA]/60" />
                  <span>{contactEmail}</span>
                </a>

                <a
                  href={`tel:${contactPhone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#D7E2EA]/60" />
                  <span>{contactPhone}</span>
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ContactSection;
