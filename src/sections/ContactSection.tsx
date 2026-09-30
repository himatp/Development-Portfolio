import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle2, Copy, Check, MessageSquare } from 'lucide-react';
import { FOOTER_DATA } from '../data/portfolioData';
import { TextReveal } from '../components/motion/TextReveal';
import { MagneticButton } from '../components/motion/MagneticButton';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Web Development',
    budget: '₹15,000 - ₹30,000',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Please provide brief details about your project';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setServerError(null);

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'YOUR_ACCESS_KEY_HERE';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: 'New Project Inquiry — Portfolio Contact Form',
          from_name: formData.name,
          name: formData.name,
          email: formData.email,
          project_type: formData.projectType,
          budget_range: formData.budget,
          project_overview: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
      } else {
        setServerError(
          result.message || 'Something went wrong — please email me directly at pariharhimatsingh@gmail.com instead'
        );
      }
    } catch (err) {
      console.error('Web3Forms submit error:', err);
      setServerError('Something went wrong — please email me directly at pariharhimatsingh@gmail.com instead');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(FOOTER_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-24 md:py-36 bg-zinc-950 border-t border-zinc-900 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[350px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Headline & Direct Contact */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-light tracking-tight text-white leading-tight mb-6">
                <TextReveal text="Have an idea?" />
                <br />
                <span className="text-zinc-300 font-normal">
                  <TextReveal text="Let's build it." delay={0.2} />
                </span>
              </h2>

              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-8">
                Tell me what you're working on and let's turn the idea into a useful digital product.
              </p>
            </div>

            {/* Quick Contact Links */}
            <div className="space-y-4 pt-8 border-t border-zinc-900">
              {/* Email Copy Card */}
              <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">Direct Email</span>
                    <span className="text-sm font-medium text-white">{FOOTER_DATA.email}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Copy Email"
                  data-cursor-text="Copy"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* WhatsApp Card */}
              <a
                href={`https://wa.me/${FOOTER_DATA.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 flex items-center justify-between hover:border-zinc-700 transition-colors group"
                data-cursor-text="WhatsApp"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">WhatsApp Chat</span>
                    <span className="text-sm font-medium text-white">{FOOTER_DATA.whatsapp}</span>
                  </div>
                </div>
                <span className="text-xs font-mono text-zinc-500 group-hover:text-white transition-colors">
                  Chat →
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 shadow-2xl relative">
              
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  /* Framer Motion Success Animation State */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="py-12 flex flex-col items-center text-center space-y-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
                      className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center text-emerald-400"
                    >
                      <CheckCircle2 className="w-10 h-10" />
                    </motion.div>

                    <h3 className="text-2xl font-heading font-medium text-white">
                      Message Received!
                    </h3>

                    <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
                      Thank you for reaching out, <span className="text-white font-medium">{formData.name}</span>. I have received your project details and will reply to <span className="text-indigo-400">{formData.email}</span> within 24 hours.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({ name: '', email: '', projectType: 'Web Development', budget: '₹15,000 - ₹30,000', message: '' });
                      }}
                      className="px-6 py-2.5 rounded-full bg-zinc-800 text-white text-xs font-mono border border-zinc-700 hover:bg-zinc-700 transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  /* Live Form */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. John Doe"
                          className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white placeholder-zinc-600 text-sm transition-colors focus:border-indigo-500"
                        />
                        {errors.name && <span className="text-xs text-rose-400 mt-1 block">{errors.name}</span>}
                      </div>

                      <div>
                        <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@company.com"
                          className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white placeholder-zinc-600 text-sm transition-colors focus:border-indigo-500"
                        />
                        {errors.email && <span className="text-xs text-rose-400 mt-1 block">{errors.email}</span>}
                      </div>
                    </div>

                    {/* Service & Budget Selectors */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                          Project Type
                        </label>
                        <select
                          value={formData.projectType}
                          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white text-sm focus:border-indigo-500"
                        >
                          <option>Web Development</option>
                          <option>AI Application</option>
                          <option>Software Development</option>
                          <option>UI/UX Design & Motion</option>
                          <option>Custom Enterprise Project</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                          Estimated Budget Range
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white text-sm focus:border-indigo-500"
                        >
                          <option>₹15,000 - ₹30,000 (Starter)</option>
                          <option>₹30,000 - ₹60,000 (Professional)</option>
                          <option>₹60,000+ (Custom / Enterprise)</option>
                          <option>Flexible / To be discussed</option>
                        </select>
                      </div>
                    </div>

                    {/* Message Box */}
                    <div>
                      <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                        Project Overview *
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me a bit about your project goals, timeline, and deliverables..."
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white placeholder-zinc-600 text-sm transition-colors focus:border-indigo-500 resize-none"
                      />
                      {errors.message && <span className="text-xs text-rose-400 mt-1 block">{errors.message}</span>}
                    </div>

                    {serverError && (
                      <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
                        ⚠️ {serverError}
                      </div>
                    )}

                    {/* Submit Button */}
                    <MagneticButton type="submit" disabled={isSubmitting} className="w-full">
                      <span
                        className="w-full py-4 rounded-full bg-white text-black font-medium text-sm tracking-wide flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors shadow-lg cursor-pointer"
                        data-cursor-text="Send"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Project Details</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </span>
                    </MagneticButton>
                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
