import { useState } from "react";
import CommonHeroSec from "../components/CommonHeroSec";
import Icon from "../components/Icon"


/* ─── Info Block ─────────────────────────────────────────────── */
const InfoBlock = ({ icon, label, value, href, color }) => (
  <a
    href={href || "#"}
    target={href?.startsWith("http") ? "_blank" : undefined}
    rel="noreferrer"
    className="flex items-start gap-4 group"
    style={{ textDecoration: "none" }}
  >
    <span
      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200"
      style={{ backgroundColor: color + "14", color }}
    >
      <Icon name={icon} size={19} />
    </span>
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: "var(--text-muted)" }}>
        {label}
      </p>
      <p className="text-sm font-medium leading-snug transition-colors duration-150 group-hover:underline" style={{ color: "var(--text-main)" }}>
        {value}
      </p>
    </div>
  </a>
);

/* ─── Input Field ────────────────────────────────────────────── */
const Field = ({ label, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold" style={{ color: "var(--text-main)" }}>{label}</label>
    {children}
    {error && <p className="text-xs font-medium" style={{ color: "var(--error-text)" }}>{error}</p>}
  </div>
);

const inputStyle = (hasError) => ({
  backgroundColor: hasError ? "var(--error-bg)" : "var(--bg-page)",
  border: `1.5px solid ${hasError ? "var(--error-border)" : "var(--border-default)"}`,
  color: "var(--text-main)",
  borderRadius: "10px",
  padding: "10px 14px",
  fontSize: "14px",
  outline: "none",
  width: "100%",
  fontFamily: "inherit",
  transition: "border-color 0.15s, box-shadow 0.15s",
});

/* ─── Main ───────────────────────────────────────────────────── */
export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success

  const subjects = [
    "General Inquiry",
    "Restaurant Listing",
    "Partnership",
    "Report an Issue",
    "Press & Media",
    "Other",
  ];

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.subject) e.subject = "Please select a subject.";
    if (!form.message.trim()) e.message = "Message cannot be empty.";
    else if (form.message.trim().length < 20) e.message = "Message must be at least 20 characters.";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1800);
  };

  const handleChange = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  return (
    <div style={{ backgroundColor: "var(--bg-page)", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Sora:wght@600;700;800&display=swap');
        .contact-input:focus { border-color: var(--primary) !important; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
        .submit-btn:hover:not(:disabled) { background: var(--primary-hover) !important; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(37,99,235,0.3); }
        .submit-btn { transition: background 0.15s, transform 0.15s, box-shadow 0.15s; }
        .social-btn:hover { background: var(--primary) !important; color: #fff !important; border-color: var(--primary) !important; }
        .social-btn { transition: background 0.15s, color 0.15s, border-color 0.15s; }
        .faq-item { transition: border-color 0.15s; }
        .faq-item:hover { border-color: var(--primary) !important; }
      `}</style>

      {/* ── Page Header ── */}
      <CommonHeroSec pageName="Contact Us" heading="Get in Touch" para="Have a question, a listing request, or just want to say hello? We'd love to hear from you. Our team typically responds within 24 hours." />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left: Form + Map + FAQ ── */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Contact Form */}
            <div className="rounded-2xl p-6 sm:p-8" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-default)" }}>
              <h2 className="text-xl font-bold mb-1" style={{ color: "var(--text-main)", fontFamily: "'Sora', sans-serif" }}>Send us a Message</h2>
              <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>Fill out the form below and we'll get back to you as soon as possible.</p>

              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-16 gap-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(37,99,235,0.1)", color: "var(--primary)" }}>
                    <Icon name="check" size={28} />
                  </div>
                  <h3 className="text-xl font-bold" style={{ color: "var(--text-main)", fontFamily: "'Sora', sans-serif" }}>Message Sent!</h3>
                  <p className="text-sm text-center max-w-xs" style={{ color: "var(--text-muted)" }}>
                    Thanks for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setStatus("idle"); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    className="mt-2 px-6 py-2.5 rounded-xl text-sm font-semibold"
                    style={{ backgroundColor: "var(--primary)", color: "#fff" }}
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <Field label="Full Name" error={errors.name}>
                    <input
                      className="contact-input"
                      style={inputStyle(!!errors.name)}
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  </Field>

                  {/* Email */}
                  <Field label="Email Address" error={errors.email}>
                    <input
                      className="contact-input"
                      style={inputStyle(!!errors.email)}
                      placeholder="john@example.com"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  </Field>

                  {/* Subject */}
                  <Field label="Subject" error={errors.subject}>
                    <select
                      className="contact-input"
                      style={{ ...inputStyle(!!errors.subject), appearance: "none", cursor: "pointer" }}
                      value={form.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                    >
                      <option value="">Select a subject...</option>
                      {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </Field>

                  {/* Phone (optional) */}
                  <Field label={<span>Phone <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(optional)</span></span>}>
                    <input
                      className="contact-input"
                      style={inputStyle(false)}
                      placeholder="+1 (555) 000-0000"
                      type="tel"
                    />
                  </Field>

                  {/* Message */}
                  <div className="sm:col-span-2">
                    <Field label="Message" error={errors.message}>
                      <textarea
                        className="contact-input"
                        style={{ ...inputStyle(!!errors.message), resize: "vertical", minHeight: "140px" }}
                        placeholder="Tell us how we can help you..."
                        value={form.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                      />
                    </Field>
                    <p className="text-xs mt-1 text-right" style={{ color: "var(--text-muted)" }}>{form.message.length} / 1000</p>
                  </div>

                  {/* Submit */}
                  <div className="sm:col-span-2 flex items-center gap-4 flex-wrap">
                    <button
                      className="submit-btn flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-bold text-white"
                      style={{ backgroundColor: "var(--primary)", cursor: status === "loading" ? "not-allowed" : "pointer", opacity: status === "loading" ? 0.8 : 1 }}
                      onClick={handleSubmit}
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? (
                        <>
                          <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="2" strokeOpacity="0.3" />
                            <path d="M8 2a6 6 0 016 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Icon name="send" size={15} />
                          Send Message
                        </>
                      )}
                    </button>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                      We'll never share your information with anyone.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Google Map */}
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border-default)", height: "260px" }}>
              <iframe
                title="Office Location"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019565!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjYiTiAxMjLCsDI1JzA5LjgiVw!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
              />
            </div>

            {/* FAQ */}
            <div className="rounded-2xl p-6 sm:p-8" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-default)" }}>
              <h2 className="text-xl font-bold mb-5" style={{ color: "var(--text-main)", fontFamily: "'Sora', sans-serif" }}>Frequently Asked Questions</h2>
              <div className="flex flex-col gap-3">
                {[
                  {
                    q: "How do I add my restaurant to Rank Eats?",
                    a: "Simply create an account, click 'Add Listing', and fill in your restaurant's details. Our team will review and approve your listing within 48 hours.",
                  },
                  {
                    q: "Is listing on Rank Eats free?",
                    a: "Yes, basic listings are completely free. We also offer premium plans with enhanced visibility and additional features.",
                  },
                  {
                    q: "How do I report an incorrect listing?",
                    a: "Use the 'Report' button on any listing page, or contact us directly via this form with the listing name and the issue.",
                  },
                  {
                    q: "Can I respond to reviews on my listing?",
                    a: "Absolutely. Verified restaurant owners can respond to any review from their dashboard.",
                  },
                ].map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
              </div>
            </div>

          </div>

          {/* ── Right: Contact Info ── */}
          <div className="flex flex-col gap-5 self-start sticky top-0">

            {/* Info card */}
            <div className="rounded-2xl p-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-default)" }}>
              <h2 className="text-base font-bold mb-5" style={{ color: "var(--text-main)", fontFamily: "'Sora', sans-serif" }}>Contact Information</h2>
              <div className="flex flex-col gap-5">
                <InfoBlock icon="phone" label="Phone" value="+1 (415) 882-4400" href="tel:+14158824400" color="#2563eb" />
                <InfoBlock icon="whatsapp" label="WhatsApp" value="+1 (415) 882-4411" href="https://wa.me/14158824411" color="#22c55e" />
                <InfoBlock icon="email" label="Email" value="hello@rankeats.com" href="mailto:hello@rankeats.com" color="#f59e0b" />
                <InfoBlock icon="location" label="Address" value="142 West Elm Street, Suite 3, San Francisco, CA 94102" color="#e11d48" />
              </div>
            </div>

            {/* Office hours */}
            <div className="rounded-2xl p-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-default)" }}>
              <h2 className="text-base font-bold mb-4" style={{ color: "var(--text-main)", fontFamily: "'Sora', sans-serif" }}>Office Hours</h2>
              <div className="flex flex-col gap-2">
                {[
                  { days: "Monday – Friday", hours: "9:00 AM – 6:00 PM" },
                  { days: "Saturday", hours: "10:00 AM – 4:00 PM" },
                  { days: "Sunday", hours: "Closed" },
                ].map((r) => (
                  <div key={r.days} className="flex items-center justify-between text-sm py-2" style={{ borderBottom: "1px solid var(--border-default)" }}>
                    <span style={{ color: "var(--text-muted)" }}>{r.days}</span>
                    <span className="font-semibold" style={{ color: r.hours === "Closed" ? "var(--error-text)" : "var(--text-main)" }}>{r.hours}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-4 p-3 rounded-xl text-sm" style={{ backgroundColor: "rgba(37,99,235,0.07)", color: "var(--primary)" }}>
                <Icon name="clock" size={15} />
                <span className="font-medium">Avg. response time: under 24 hrs</span>
              </div>
            </div>

            {/* Social */}
            <div className="rounded-2xl p-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-default)" }}>
              <h2 className="text-base font-bold mb-4" style={{ color: "var(--text-main)", fontFamily: "'Sora', sans-serif" }}>Follow Us</h2>
              <div className="flex gap-3">
                {[
                  { icon: "facebook", href: "#", label: "Facebook" },
                  { icon: "instagram", href: "#", label: "Instagram" },
                  { icon: "twitter", href: "#", label: "Twitter" },
                  { icon: "whatsapp", href: "#", label: "WhatsApp" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="social-btn w-10 h-10 rounded-xl flex items-center justify-center border"
                    style={{ borderColor: "var(--border-default)", color: "var(--text-muted)", backgroundColor: "var(--bg-page)" }}
                  >
                    <Icon name={s.icon} size={17} />
                  </a>
                ))}
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}

/* ─── FAQ Accordion ──────────────────────────────────────────── */
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="faq-item rounded-xl overflow-hidden cursor-pointer"
      style={{ border: `1.5px solid ${open ? "var(--primary)" : "var(--border-default)"}`, transition: "border-color 0.15s" }}
      onClick={() => setOpen((p) => !p)}
    >
      <div className="flex items-center justify-between p-4 gap-3">
        <p className="text-sm font-semibold" style={{ color: "var(--text-main)" }}>{q}</p>
        <span
          className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200"
          style={{ backgroundColor: open ? "var(--primary)" : "var(--bg-page)", color: open ? "#fff" : "var(--text-muted)", transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
      </div>
      {open && (
        <div className="px-4 pb-4">
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{a}</p>
        </div>
      )}
    </div>
  );
}