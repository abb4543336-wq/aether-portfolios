import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Menu, X, CheckCircle2, ArrowLeft } from "lucide-react";
import { ContactModal } from "@/components/ContactModal";
import { Footer } from "@/components/Footer";
import { AnimatePresence } from "framer-motion";

const SERVICES_NAV = [
  { href: "/services/cloud-infrastructure", label: "Cloud & Infrastructure" },
  { href: "/services/business-applications", label: "Business Applications" },
  { href: "/services/security-data", label: "Security & Data Management" },
  { href: "/services/managed-it", label: "Managed IT Services" },
  { href: "/services/consulting", label: "Consulting & Digital" },
];

export type ServiceCard = {
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
};

export type ServicePageData = {
  hero: { title: string; subtitle: string };
  services: ServiceCard[];
  cta: { title: string; subtitle: string };
};

function ServiceNavbar({ onContact }: { onContact: () => void }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinkClass = "text-sm font-medium text-foreground/70 transition-colors hover:text-foreground";

  return (
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

        <nav className="hidden items-center gap-7 md:flex">
          <Link to="/" className={navLinkClass}>Home</Link>

          <div className="relative" ref={dropdownRef}>
            <button
              className={`${navLinkClass} flex items-center gap-1`}
              onClick={() => setServicesOpen((v) => !v)}
            >
              Services
              <ChevronDown className={`size-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-0 top-full mt-2 overflow-hidden rounded-xl py-1.5"
                  style={{
                    background: "rgba(255,255,255,0.97)",
                    border: "1px solid rgba(0,0,0,0.08)",
                    boxShadow: "0 16px 50px rgba(0,0,0,0.08)",
                    minWidth: "220px",
                  }}
                >
                  {SERVICES_NAV.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="block px-4 py-2.5 text-sm text-foreground/70 transition-all hover:bg-red-600/10 hover:text-foreground"
                      onClick={() => setServicesOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/#about" className={navLinkClass}>About</Link>
          <button onClick={onContact} className={navLinkClass}>Contact</button>
        </nav>

        <button
          onClick={onContact}
          className="hidden rounded-full px-5 py-2 text-sm font-semibold text-white transition-all hover:brightness-110 md:block"
          style={{
            background: "linear-gradient(135deg, #dc2626, #b91c1c)",
            boxShadow: "0 2px 12px rgba(220,38,38,0.28)",
          }}
        >
          Talk to us
        </button>

        <button
          className="flex items-center justify-center rounded-lg p-2 text-foreground/70 hover:text-foreground md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 w-[min(94%,1200px)] overflow-hidden rounded-xl px-4 py-3 md:hidden"
            style={{
              background: "rgba(255,255,255,0.97)",
              border: "1px solid rgba(0,0,0,0.08)",
              backdropFilter: "blur(20px)",
            }}
          >
            <Link to="/" className="block py-2.5 text-sm text-foreground/80 hover:text-foreground" onClick={() => setMobileOpen(false)}>Home</Link>
            {SERVICES_NAV.map((item) => (
              <Link key={item.href} to={item.href} className="block py-2 text-sm text-foreground/60 hover:text-foreground pl-3" onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
            ))}
            <button
              className="mt-2 w-full rounded-full py-2.5 text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, #dc2626, #991b1b)" }}
              onClick={() => { onContact(); setMobileOpen(false); }}
            >
              Contact Us
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function ServicePageLayout({ data }: { data: ServicePageData }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Red grid background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 grid-glow opacity-30" aria-hidden />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(220,38,38,0.12) 0%, transparent 60%)",
          }}
          aria-hidden
        />
      </div>

      <ServiceNavbar onContact={() => setOpen(true)} />

      {/* Hero */}
      <section className="relative z-10 px-5 pb-16 pt-36 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-foreground/40 transition-colors hover:text-foreground/70"
          >
            <ArrowLeft className="size-3.5" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="inline-flex items-center rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.28em] text-red-700"
              style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.22)" }}
            >
              LateralWorx Services
            </span>
            <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              <span className="text-gradient">{data.hero.title}</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/60">
              {data.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div
        className="mx-auto w-[min(94%,1400px)]"
        style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(220,38,38,0.3), transparent)" }}
      />

      {/* Service Cards */}
      <section className="relative z-10 px-5 py-20 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-6xl space-y-16">
          {data.services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Sub-section divider line + number */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-display text-xs font-bold tracking-[0.35em] text-red-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="h-px flex-1" style={{ background: "linear-gradient(to right, rgba(220,38,38,0.4), transparent)" }} />
              </div>

              <div
                className="rounded-2xl p-8 lg:p-10"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                }}
              >
                <h2 className="text-2xl font-semibold sm:text-3xl">{svc.title}</h2>
                <p className="mt-2 text-base font-medium text-red-400">{svc.subtitle}</p>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/60">{svc.description}</p>

                {/* ERP sub-cards support (passed as special bullets starting with "##") */}
                <div className="mt-8">
                  {renderBullets(svc.bullets)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer onContact={() => setOpen(true)} />

      <ContactModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

/** Renders bullets — supports section headers prefixed with "##" and sub-headers with "###" */
function renderBullets(bullets: string[]) {
  const groups: { header?: string; subheader?: string; items: string[] }[] = [];
  let current: { header?: string; subheader?: string; items: string[] } = { items: [] };

  for (const b of bullets) {
    if (b.startsWith("###")) {
      if (current.items.length || current.header) groups.push(current);
      current = { subheader: b.slice(3).trim(), items: [] };
    } else if (b.startsWith("##")) {
      if (current.items.length || current.header) groups.push(current);
      current = { header: b.slice(2).trim(), items: [] };
    } else {
      current.items.push(b);
    }
  }
  if (current.items.length || current.header || current.subheader) groups.push(current);

  return (
    <div className="space-y-8">
      {groups.map((g, gi) => (
        <div key={gi}>
          {g.header && (
            <h3 className="mb-3 text-base font-semibold text-foreground/80">{g.header}</h3>
          )}
          {g.subheader && (
            <h4 className="mb-2 text-sm font-semibold text-red-400">{g.subheader}</h4>
          )}
          {g.items.length > 0 && (
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {g.items.map((item, ii) => (
                <li key={ii} className="flex items-start gap-2.5 text-sm text-foreground/60">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-red-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
