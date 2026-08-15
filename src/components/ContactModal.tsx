import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Mail, X } from "lucide-react";

export function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 900);
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-white/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Schedule a consultation"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass relative w-full max-w-md rounded-2xl p-6 bg-white shadow-xl border border-black/5"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-4" />
            </button>

            {sent ? (
              <div className="py-8 text-center">
                <Mail className="mx-auto size-8 text-primary" />
                <h3 className="mt-4 text-xl font-semibold">Request received</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Our solutions team will reach out within one business day.
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-display text-xl font-semibold">Schedule a consultation</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tell us about your infrastructure goals.
                </p>
                <form onSubmit={submit} className="mt-5 space-y-3">
                  {[
                    { id: "name", label: "Full name", type: "text" },
                    { id: "email", label: "Work email", type: "email" },
                    { id: "company", label: "Company", type: "text" },
                  ].map((f) => (
                    <div key={f.id}>
                      <label htmlFor={f.id} className="text-xs uppercase tracking-widest text-muted-foreground">
                        {f.label}
                      </label>
                      <input
                        id={f.id}
                        type={f.type}
                        required={f.id !== "company"}
                        className="mt-1 w-full rounded-lg border border-input bg-white px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  ))}
                  <div>
                    <label htmlFor="msg" className="text-xs uppercase tracking-widest text-muted-foreground">
                      What do you need?
                    </label>
                    <textarea
                      id="msg"
                      rows={3}
                      className="mt-1 w-full resize-none rounded-lg border border-input bg-white px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-display text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
                    style={{ background: "linear-gradient(135deg, #dc2626, #b91c1c)", boxShadow: "0 2px 12px rgba(220,38,38,0.25)" }}
                  >
                    {sending ? <Loader2 className="size-4 animate-spin" /> : null}
                    {sending ? "Sending" : "Request consultation"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
