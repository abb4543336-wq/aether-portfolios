import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Cloud,
  CloudCog,
  Database,
  Globe,
  HardDriveDownload,
  Headphones,
  Mail,
  MapPin,
  ChevronDown,
  Menu,
  X,
  ScanFace,
  ServerCog,
  ShieldCheck,
  Store,
  Workflow,
} from "lucide-react";
import { SceneBackground } from "@/components/SceneBackground";
import { ServiceSection, type Service } from "@/components/ServiceSection";
import { ContactModal } from "@/components/ContactModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LateralWorx" },
      {
        name: "description",
        content:
          "Your trusted partner for comprehensive IT services, cloud solutions, and digital transformation.",
      },
      { property: "og:title", content: "LateralWorx — IT & Cloud Solutions" },
      {
        property: "og:description",
        content:
          "Cloud migration, cybersecurity, ERP, and managed IT operations engineered for uptime.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const cloud: Service[] = [
  {
    title: "Cloud Migration & Transformation",
    description:
      "Assessment, landing zones, and zero-downtime workload migration to AWS, Azure, or hybrid targets.",
    icon: Cloud,
  },
  {
    title: "Cloud Infrastructure Management",
    description:
      "FinOps-tuned, IaC-governed environments with observability, autoscaling, and patch automation.",
    icon: CloudCog,
  },
  {
    title: "Infrastructure & Network Solutions",
    description:
      "Data center build-outs, SD-WAN, structured cabling, and high-availability core switching.",
    icon: ServerCog,
  },
];

const apps: Service[] = [
  {
    title: "ERP Implementation & Integration",
    description:
      "End-to-end ERP rollouts with clean data migration and API integration into your existing stack.",
    icon: Workflow,
  },
  {
    title: "Cloud POS Solution",
    description:
      "Multi-branch, offline-resilient point of sale with real-time inventory and revenue dashboards.",
    icon: Store,
  },
];

const security: Service[] = [
  {
    title: "Cybersecurity Services",
    description:
      "Zero-trust architecture, endpoint hardening, SOC monitoring, and compliance readiness.",
    icon: ShieldCheck,
  },
  {
    title: "Data Backup & Disaster Recovery",
    description:
      "Immutable backups, tested runbooks, and RPO/RTO targets you can prove to auditors.",
    icon: HardDriveDownload,
  },
];

const managed: Service[] = [
  {
    title: "Managed IT Services",
    description:
      "24/7 NOC and helpdesk coverage, proactive maintenance, and SLA-backed incident response.",
    icon: Headphones,
  },
  {
    title: "Email & Communication Services",
    description:
      "Microsoft 365 and Google Workspace management, mail security, and unified collaboration.",
    icon: Mail,
  },
];

const consulting: Service[] = [
  {
    title: "IT Consulting & Strategy",
    description: "Roadmaps, architecture reviews, and technology budgeting aligned to growth plans.",
    icon: BarChart3,
  },
  {
    title: "Web Development",
    description: "High-performance corporate sites and web platforms built for scale and SEO.",
    icon: Globe,
    tag: "via AWSOL",
  },
  {
    title: "Digital Marketing",
    description: "Demand generation, paid search, and content engines measured on pipeline.",
    icon: ScanFace,
    tag: "via AWSOL",
  },
];

const SERVICES_DROPDOWN = [
  { href: "/services/cloud-infrastructure", label: "Cloud & Infrastructure" },
  { href: "/services/business-applications", label: "Business Applications" },
  { href: "/services/security-data", label: "Security & Data Management" },
  { href: "/services/managed-it", label: "Managed IT Services" },
  { href: "/services/consulting", label: "Consulting & Digital" },
];

function Navbar({ onContact }: { onContact: () => void }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
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
          <a href="#home" className={navLinkClass}>Home</a>

          <div className="relative" ref={dropdownRef}>
            <button
              id="services-dropdown-btn"
              className={`${navLinkClass} flex items-center gap-1`}
              onClick={() => setServicesOpen((v) => !v)}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
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
                  role="menu"
                >
                  {SERVICES_DROPDOWN.map((item) => (
                    item.href.startsWith("/") ? (
                      <Link
                        key={item.href}
                        to={item.href}
                        role="menuitem"
                        className="block px-4 py-2.5 text-sm text-foreground/70 transition-all hover:bg-red-600/10 hover:text-foreground"
                        onClick={() => setServicesOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        key={item.href}
                        href={item.href}
                        role="menuitem"
                        className="block px-4 py-2.5 text-sm text-foreground/70 transition-all hover:bg-red-600/10 hover:text-foreground"
                        onClick={() => setServicesOpen(false)}
                      >
                        {item.label}
                      </a>
                    )
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/about" className={navLinkClass}>About</Link>
          <Link to="/contact" className={navLinkClass}>Contact</Link>
        </nav>

        <Link
          to="/contact"
          id="nav-talk-btn"
          className="hidden rounded-full px-5 py-2 text-sm font-semibold text-white transition-all hover:brightness-110 md:block"
          style={{
            background: "linear-gradient(135deg, #dc2626, #b91c1c)",
            boxShadow: "0 2px 12px rgba(220,38,38,0.28)",
          }}
        >
          Talk to us
        </Link>

        <button
          id="mobile-menu-btn"
          className="flex items-center justify-center rounded-lg p-2 text-foreground/70 hover:text-foreground md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
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
            <a href="#home" className="block py-2.5 text-sm text-foreground/80 hover:text-foreground" onClick={() => setMobileOpen(false)}>Home</a>
            <button className="flex w-full items-center justify-between py-2.5 text-sm text-foreground/80 hover:text-foreground" onClick={() => setMobileServicesOpen((v) => !v)}>
              Services
              <ChevronDown className={`size-3.5 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {mobileServicesOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden pl-4"
                >
                  {SERVICES_DROPDOWN.map((item) => (
                    item.href.startsWith("/") ? (
                      <Link key={item.href} to={item.href} className="block py-2 text-sm text-foreground/60 hover:text-foreground" onClick={() => setMobileOpen(false)}>
                        {item.label}
                      </Link>
                    ) : (
                      <a key={item.href} href={item.href} className="block py-2 text-sm text-foreground/60 hover:text-foreground" onClick={() => setMobileOpen(false)}>
                        {item.label}
                      </a>
                    )
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            <Link to="/about" className="block py-2.5 text-sm text-foreground/80 hover:text-foreground" onClick={() => setMobileOpen(false)}>About</Link>
            <Link
              to="/contact"
              className="mt-1 block text-center w-full rounded-full py-2.5 text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, #dc2626, #991b1b)" }}
              onClick={() => setMobileOpen(false)}
            >
              Contact Us
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Home() {
  const [open, setOpen] = useState(false);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <SceneBackground />
      <Navbar onContact={() => setOpen(true)} />

      {/* Hero */}
      <section id="home" className="relative z-10 flex min-h-screen items-center px-5 pt-28 sm:px-8 lg:px-14">
        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.28em] text-red-700"
              style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.22)" }}
            >
              <Database className="size-3 text-red-500" />
              Trusted IT Partner · Est. 2024
            </span>

            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
              <span className="text-gradient">Transforming Businesses</span>
              <br />
              Through Innovative IT Solutions
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground/60">
              Your trusted partner for comprehensive IT services, cloud solutions, and digital transformation
            </p>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/50">
              We provide cutting-edge technology solutions to help businesses streamline operations, enhance
              productivity, and achieve their strategic goals. From cloud migration to cybersecurity, ERP
              implementation to managed IT services, we deliver excellence at every step.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                id="hero-cta-btn"
                className="group flex items-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-semibold text-white transition-all hover:brightness-110"
                style={{
                  background: "linear-gradient(135deg, #dc2626, #b91c1c)",
                  boxShadow: "0 2px 20px rgba(220,38,38,0.25)",
                }}
              >
                Get Started Today
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#cloud"
                className="flex items-center gap-2 rounded-full border border-foreground/10 px-7 py-3.5 text-sm font-medium text-foreground/70 transition-all hover:border-red-500/40 hover:text-foreground"
              >
                Explore Services
              </a>
            </div>
          </motion.div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Cloud & Infrastructure", icon: Cloud, href: "/services/cloud-infrastructure" },
              { label: "Business Applications", icon: Workflow, href: "/services/business-applications" },
              { label: "Security & Data", icon: ShieldCheck, href: "/services/security-data" },
              { label: "Managed IT Services", icon: Headphones, href: "/services/managed-it" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass group flex flex-col gap-3 rounded-xl p-5 transition-all hover:border-red-500/30 bg-white border border-black/5 shadow-sm"
                style={{ textDecoration: "none" }}
              >
                <div className="flex size-10 items-center justify-center rounded-lg" style={{ background: "rgba(220,38,38,0.08)" }}>
                  <item.icon className="size-5 text-red-600" />
                </div>
                <Link to={item.href} className="font-display text-sm font-semibold text-foreground/90 stretched-link">{item.label}</Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ServiceSection id="cloud" index="01" label="Cloud & Infrastructure" heading="Cloud & Infrastructure Modernization" subtext="Comprehensive cloud migration, infrastructure management, and network solutions engineered for reliability and scale." services={cloud} />
      <ServiceSection id="applications" index="02" label="Business Applications" heading="Enterprise Business Applications" subtext="Core systems that run operations, integrated cleanly with the platforms you already use." services={apps} align="right" />
      <ServiceSection id="security" index="03" label="Security & Data Management" heading="Cyber Security & Data Protection" subtext="Defense in depth across identity, endpoint, and network — with recovery you have actually tested." services={security} />
      <ServiceSection id="managed" index="04" label="Managed IT Services" heading="24/7 Managed IT & Operations" subtext="An always-on engineering team keeping your environment patched, monitored, and answered." services={managed} align="right" />
      <ServiceSection id="consulting" index="05" label="Consulting & Digital Services" heading="Strategic Consulting & Growth" subtext="From architecture roadmaps to the digital surface your customers actually touch." services={consulting} />

      {/* About */}
      <section id="about" className="relative z-10 flex min-h-[60vh] items-center px-5 py-24 sm:px-8 lg:px-14">
        <div className="mx-auto w-full max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.28em] text-red-700"
              style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.22)" }}
            >
              About LateralWorx
            </span>
            <h2 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              Your Trusted Technology Partner
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-foreground/55">
              LateralWorx is a full-service IT company dedicated to helping businesses leverage technology as
              a competitive advantage. Our team of experienced engineers and consultants brings enterprise-grade
              expertise to organizations of every size.
            </p>
            <div className="mt-8">
              <Link to="/about" className="inline-flex items-center gap-2 rounded-full border border-foreground/10 px-7 py-3 text-sm font-medium text-foreground/70 transition-all hover:border-red-500/40 hover:text-foreground">Read Full Story</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <ContactModal open={open} onClose={() => setOpen(false)} />
    </main>
  );
}