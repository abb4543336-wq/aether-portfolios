import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Mail, Clock, Send, Menu, X } from "lucide-react";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending
    console.log("Form submitted", formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Background grid */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 grid-glow opacity-30" aria-hidden />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(220,38,38,0.12) 0%, transparent 60%)",
          }}
          aria-hidden
        />
      </div>

      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className="mx-auto mt-4 flex w-[min(94%,1200px)] items-center justify-between rounded-full px-5 py-3"
          style={{
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(20px) saturate(160%)",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
          }}
        >
          <Link
            to="/"
            className="flex shrink-0 items-center transition-transform hover:scale-[1.02]"
            aria-label="LateralWorx Home"
          >
            <img
              src="/lateralworx_logo.png"
              alt="LateralWorx Logo"
              className="h-10 w-auto object-contain"
              style={{
                filter: "brightness(0.9) contrast(1.1)",
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 md:flex">
            <Link to="/" className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground">Home</Link>
            <Link to="/#cloud" className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground">Services</Link>
            <Link to="/about" className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground">About</Link>
            <Link to="/contact" className="text-sm font-medium text-red-600">Contact</Link>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center p-1.5 text-foreground transition-colors hover:text-red-600 md:hidden"
            aria-label="Toggle Mobile Menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mx-auto mt-2 w-[min(94%,1200px)] rounded-2xl p-6 shadow-xl md:hidden"
              style={{
                background: "rgba(255,255,255,0.98)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <nav className="flex flex-col space-y-4 text-center">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base font-medium text-foreground/70 transition-colors hover:text-red-600"
                >
                  Home
                </Link>
                <Link
                  to="/#cloud"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base font-medium text-foreground/70 transition-colors hover:text-red-600"
                >
                  Services
                </Link>
                <Link
                  to="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base font-medium text-foreground/70 transition-colors hover:text-red-600"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base font-semibold text-red-600"
                >
                  Contact
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero */}
      <section className="relative z-10 px-5 pt-36 pb-16 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="inline-flex items-center rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.28em] text-red-700"
              style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.22)" }}
            >
              Contact Us
            </span>
            <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              We'd love to <span className="text-gradient">hear from you.</span>
            </h1>
            <p className="mt-6 text-foreground/60 text-lg">Get in touch today!</p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 px-5 py-12 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-2xl font-semibold mb-3">Get in Touch</h2>
              <p className="text-foreground/60">We're here to help! Reach out to us through any of the following channels.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-foreground/4 border border-foreground/10">
                <MapPin className="size-6 text-red-600 mb-4" />
                <h3 className="font-semibold mb-2">Office Location</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">Suite 405 Beaumont Plaza<br />Beaumont Road<br />Karachi, Pakistan</p>
              </div>
              
              <div className="p-6 rounded-xl bg-foreground/4 border border-foreground/10">
                <Mail className="size-6 text-red-600 mb-4" />
                <h3 className="font-semibold mb-2">Email</h3>
                <a href="mailto:info@lateralworx.com" className="text-sm text-red-600 hover:text-red-500">info@lateralworx.com</a>
              </div>

              <div className="p-6 rounded-xl bg-foreground/4 border border-foreground/10 sm:col-span-2">
                <Clock className="size-6 text-red-600 mb-4" />
                <h3 className="font-semibold mb-2">Business Hours</h3>
                <ul className="text-sm text-foreground/60 space-y-2">
                  <li className="flex justify-between"><span>Monday - Friday:</span> <span>9:00 AM - 6:00 PM</span></li>
                  <li className="flex justify-between"><span>Saturday:</span> <span>10:00 AM - 2:00 PM</span></li>
                  <li className="flex justify-between text-foreground/40"><span>Sunday:</span> <span>Closed</span></li>
                </ul>
              </div>
            </div>

            <div className="p-6 rounded-xl" style={{ background: "linear-gradient(135deg, rgba(220,38,38,0.05), rgba(0,0,0,0))", border: "1px solid rgba(220,38,38,0.15)" }}>
              <h3 className="font-semibold mb-2 text-foreground">Quick Response</h3>
              <p className="text-sm text-foreground/60 leading-relaxed">For urgent matters, please call us or send an email. We typically respond within 24 hours.</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl p-8 lg:p-10"
            style={{
              background: "rgba(255,255,255,0.85)",
              border: "1px solid rgba(0,0,0,0.08)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
            }}
          >
            <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Name *</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white/40 border border-foreground/10 rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-red-500 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Email *</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white/40 border border-foreground/10 rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-red-500 transition-colors" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Phone</label>
                  <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-white/40 border border-foreground/10 rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-red-500 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Subject</label>
                  <input type="text" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full bg-white/40 border border-foreground/10 rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-red-500 transition-colors" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Message *</label>
                <textarea required rows={5} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-white/40 border border-foreground/10 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-red-500 transition-colors resize-none" />
              </div>
              <button type="submit" className="w-full flex items-center justify-center gap-2 rounded-lg py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110 mt-6" style={{ background: "linear-gradient(135deg, #dc2626, #b91c1c)", boxShadow: "0 4px 14px rgba(220,38,38,0.25)" }}>
                Send Message
                <Send className="size-4" />
              </button>
            </form>
          </motion.div>

        </div>
      </section>

      <Footer onContact={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }} />
    </main>
  );
}