import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Mail, Globe } from "lucide-react";

export function Footer({ onContact }: { onContact: () => void }) {
  return (
    <footer className="relative z-10 mt-10">
      {/* CTA bar */}
      <div
        className="mx-4 rounded-3xl px-6 py-10 text-center sm:mx-5 sm:px-12 lg:mx-14"
        style={{
          background: "linear-gradient(135deg, rgba(220,38,38,0.08), rgba(220,38,38,0.03))",
          border: "1px solid rgba(220,38,38,0.15)",
          backdropFilter: "blur(18px)",
        }}
      >
        <h2 className="text-2xl font-semibold sm:text-3xl text-foreground">
          Ready to transform your <span className="text-gradient">business?</span>
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-foreground/60">
          Book a 30-minute session with our architects and leave with a concrete roadmap tailored to your business goals.
        </p>
        <button
          onClick={onContact}
          className="mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3 font-display text-sm font-semibold text-white transition-all hover:brightness-110"
          style={{
            background: "linear-gradient(135deg, #dc2626, #b91c1c)",
            boxShadow: "0 2px 12px rgba(220,38,38,0.28)",
          }}
        >
          Schedule a Consultation
          <ArrowRight className="size-4" />
        </button>
      </div>

      {/* Main footer grid */}
      <div
        className="px-4 pt-14 sm:px-8 lg:px-14"
        style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.08)" }}
      >
        <div className="mx-auto max-w-6xl grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <Link to="/" className="inline-flex items-center mb-4 transition-transform hover:scale-[1.02]">
              <img
                src="/lateralworx_logo.png"
                alt="LateralWorx Logo"
                className="h-10 w-auto object-contain"
                style={{
                  filter: "brightness(0.9) contrast(1.1)",
                }}
              />
            </Link>
            <p className="text-sm leading-relaxed text-foreground/50 max-w-[240px]">
              Transforming Businesses Through Innovative IT Solutions
            </p>
            <div className="mt-5 flex items-start gap-2 text-sm text-foreground/60 justify-center sm:justify-start">
              <MapPin className="mt-0.5 size-3.5 shrink-0 text-red-500/70" />
              <span className="leading-relaxed">
                Suite 405 Beaumont Plaza,<br />
                Beaumont Road,<br />
                Karachi, Pakistan
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.2em] text-foreground/80">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "/", contact: false },
                { label: "Services", href: "/#cloud", contact: false },
                { label: "About", href: "/about", contact: false },
                { label: "Contact", href: "/contact", contact: false },
              ].map((l) => (
                <li key={l.label}>
                  {l.href.startsWith("/") && !l.href.includes("#") ? (
                    <Link
                      to={l.href}
                      className="group flex items-center gap-2 text-sm text-foreground/50 transition-colors hover:text-foreground"
                    >
                      <span className="h-px w-3 bg-red-600/50 transition-all group-hover:w-5 group-hover:bg-red-500" />
                      {l.label}
                    </Link>
                  ) : (
                    <a
                      href={l.href}
                      className="group flex items-center gap-2 text-sm text-foreground/50 transition-colors hover:text-foreground"
                      onClick={l.contact ? (e) => { e.preventDefault(); onContact(); } : undefined}
                    >
                      <span className="h-px w-3 bg-red-600/50 transition-all group-hover:w-5 group-hover:bg-red-500" />
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.2em] text-foreground/80">Services</h3>
            <ul className="space-y-2.5">
              {[
                { label: "Cloud & Infrastructure", href: "/services/cloud-infrastructure" },
                { label: "Business Applications", href: "/services/business-applications" },
                { label: "Security & Data", href: "/services/security-data" },
                { label: "Managed IT Services", href: "/services/managed-it" },
                { label: "Consulting & Digital", href: "/services/consulting" },
              ].map((l) => (
                <li key={l.label}>
                  {l.href.startsWith("/services") ? (
                    <Link to={l.href} className="group flex items-center gap-2 text-sm text-foreground/50 transition-colors hover:text-foreground">
                      <span className="h-px w-3 bg-red-600/50 transition-all group-hover:w-5 group-hover:bg-red-500" />
                      {l.label}
                    </Link>
                  ) : (
                    <a href={l.href} className="group flex items-center gap-2 text-sm text-foreground/50 transition-colors hover:text-foreground">
                      <span className="h-px w-3 bg-red-600/50 transition-all group-hover:w-5 group-hover:bg-red-500" />
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Get in Touch */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.2em] text-foreground/80">Get in Touch</h3>
            <ul className="space-y-4">
              <li>
                <a href="mailto:info@lateralworx.com" className="group flex items-center gap-3 text-sm text-foreground/50 transition-colors hover:text-foreground">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg" style={{ background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.2)" }}>
                    <Mail className="size-3.5 text-red-500" />
                  </span>
                  <span>info@lateralworx.com</span>
                </a>
              </li>
              <li>
                <a href="#" className="group flex items-center gap-3 text-sm text-foreground/50 transition-colors hover:text-foreground">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg" style={{ background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.2)" }}>
                    <Globe className="size-3.5 text-red-500" />
                  </span>
                  <span>Webmail</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mx-auto mt-12 max-w-6xl flex flex-col items-center justify-between gap-2 border-t border-black/5 py-6 text-xs text-foreground/40 sm:flex-row">
          <span className="text-center sm:text-left">© {new Date().getFullYear()} LateralWorx · All rights reserved</span>
          <span className="text-center sm:text-right">Cloud · Security · Managed IT · Consulting</span>
        </div>
      </div>
    </footer>
  );
}
