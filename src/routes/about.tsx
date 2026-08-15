import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Target, Users, Zap, ShieldCheck, HeartHandshake, Lightbulb, ArrowLeft, ArrowRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { ContactModal } from "@/components/ContactModal";
import { Link } from "@tanstack/react-router";
import { Navbar } from "./index"; // Adjust import if needed, or we can copy/paste a simple nav

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  const [open, setOpen] = useState(false);

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
          <nav className="hidden items-center gap-7 md:flex">
            <Link to="/" className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground">Home</Link>
            <Link to="/#cloud" className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground">Services</Link>
            <Link to="/about" className="text-sm font-medium text-red-600">About</Link>
            <Link to="/contact" className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground">Contact</Link>
          </nav>
          <button
            onClick={() => setOpen(true)}
            className="hidden rounded-full px-5 py-2 text-sm font-semibold text-white transition-all hover:brightness-110 md:block"
            style={{
              background: "linear-gradient(135deg, #dc2626, #b91c1c)",
              boxShadow: "0 2px 12px rgba(220,38,38,0.28)",
            }}
          >
            Talk to us
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 px-5 pt-36 pb-20 sm:px-8 lg:px-14">
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
              About LateralWorx
            </span>
            <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Your trusted partner in <span className="text-gradient">IT innovation</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 px-5 py-12 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-4xl space-y-24">
          
          {/* Who We Are */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold mb-6">Who We Are</h2>
            <div className="prose max-w-none space-y-6 text-foreground/60 text-lg leading-relaxed">
              <p className="font-medium text-foreground/90 text-xl">
                LateralWorx is a leading IT services company dedicated to transforming businesses through innovative technology solutions.
              </p>
              <p>
                With years of experience in the industry, we specialize in providing comprehensive IT services that help businesses streamline operations, enhance productivity, and achieve their strategic goals. Our team of skilled professionals combines technical expertise with business acumen to deliver solutions that drive real value.
              </p>
              <p>
                We understand that every business is unique, which is why we take a customized approach to each project. Whether you're looking to migrate to the cloud, implement an ERP system, or enhance your cybersecurity posture, we work closely with you to understand your specific needs and deliver solutions that align with your business objectives.
              </p>
            </div>
          </motion.div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl p-8"
              style={{
                background: "rgba(255,255,255,0.85)",
                border: "1px solid rgba(0,0,0,0.08)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
              }}
            >
              <Target className="size-8 text-red-500 mb-5" />
              <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
              <p className="text-foreground/60 leading-relaxed mb-4">
                To empower businesses with cutting-edge IT solutions that drive innovation, efficiency, and growth. We are committed to delivering exceptional service and building long-term partnerships with our clients.
              </p>
              <p className="text-foreground/60 leading-relaxed">
                Our mission is to be the trusted technology partner that helps businesses navigate the complexities of the digital landscape and achieve sustainable success.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-2xl p-8"
              style={{
                background: "rgba(255,255,255,0.85)",
                border: "1px solid rgba(0,0,0,0.08)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
              }}
            >
              <Lightbulb className="size-8 text-red-500 mb-5" />
              <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
              <p className="text-foreground/60 leading-relaxed mb-4">
                To be recognized as the premier IT services provider, known for our innovation, reliability, and commitment to client success. We envision a future where technology seamlessly enables business transformation.
              </p>
              <p className="text-foreground/60 leading-relaxed">
                We strive to continuously evolve our services and solutions to stay ahead of technological trends and provide our clients with the tools they need to thrive in an ever-changing business environment.
              </p>
            </motion.div>
          </div>

          {/* Core Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold mb-10 text-center">Our Core Values</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Excellence", icon: "🎯", desc: "We strive for excellence in everything we do, delivering high-quality solutions that exceed expectations." },
                { title: "Partnership", icon: "🤝", desc: "We build lasting relationships with our clients, working as an extension of their team." },
                { title: "Innovation", icon: "💡", desc: "We embrace new technologies and innovative approaches to solve complex business challenges." },
                { title: "Integrity", icon: "🛡️", desc: "We conduct business with honesty, transparency, and ethical practices." },
                { title: "Agility", icon: "⚡", desc: "We adapt quickly to changing requirements and deliver solutions efficiently." },
                { title: "Customer Focus", icon: "👥", desc: "Our clients' success is our top priority, and we go above and beyond to ensure their satisfaction." },
              ].map((value, i) => (
                <div key={value.title} className="p-6 rounded-xl bg-foreground/4 border border-foreground/10 hover:border-red-500/40 transition-colors">
                  <div className="text-2xl mb-4">{value.icon}</div>
                  <h4 className="text-lg font-semibold mb-2">{value.title}</h4>
                  <p className="text-sm text-foreground/55 leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Our Team */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold mb-6">Our Team</h2>
            <p className="text-foreground/55 text-lg mb-10">Our team consists of experienced professionals dedicated to delivering exceptional IT solutions.</p>
            
            <div className="space-y-4">
              {[
                { title: "Expert Consultants", icon: "👨‍💼", desc: "Our consultants bring years of industry experience and deep technical expertise to every project." },
                { title: "Technical Specialists", icon: "👩‍💻", desc: "Our technical team specializes in cloud technologies, infrastructure, security, and enterprise solutions." },
                { title: "Support Team", icon: "🛡️", desc: "Our support team provides 24/7 assistance to ensure your systems run smoothly at all times." },
              ].map(member => (
                <div key={member.title} className="flex gap-4 items-start p-6 rounded-xl bg-foreground/4 border border-foreground/10">
                  <div className="text-3xl bg-red-500/10 p-3 rounded-lg border border-red-500/20">{member.icon}</div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">{member.title}</h4>
                    <p className="text-foreground/55">{member.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      <Footer onContact={() => setOpen(true)} />
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </main>
  );
}
