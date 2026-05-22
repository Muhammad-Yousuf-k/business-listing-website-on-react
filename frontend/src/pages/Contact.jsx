import { useState } from "react";
import CommonHeroSec from "../components/CommonHeroSec";
import Icon from "../components/Icon";
import { useContent } from "../hooks/useContent";
import { useUser } from "../hooks/useUser";

const inputClass = (hasError) =>
  `contact-input w-full rounded-[10px] border-[1.5px] px-[14px] py-[10px] text-sm font-[inherit] text-[var(--text-main)] outline-none transition-[border-color,box-shadow] duration-150 focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)] ${hasError
    ? "border-[var(--error-border)] bg-[var(--error-bg)]"
    : "border-[var(--border-default)] bg-[var(--bg-page)]"
  }`;

const InfoBlock = ({ icon, label, value, href, color }) => (
  <a
    href={href || "#"}
    target={href?.startsWith("http") ? "_blank" : undefined}
    rel="noreferrer"
    className="flex items-start gap-4 no-underline group"
  >
    <span
      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${color === "#2563eb"
        ? "bg-blue-100 text-blue-600"
        : color === "#22c55e"
          ? "bg-green-100 text-green-500"
          : color === "#f59e0b"
            ? "bg-yellow-100 text-yellow-500"
            : "bg-red-100 text-red-600"
        }`}
    >
      <Icon name={icon} size={19} />
    </span>

    <div>
      <p className="text-xs font-semibold uppercase tracking-wider mb-0.5 text-[var(--text-muted)]">
        {label}
      </p>
      <p className="text-sm font-medium leading-snug transition-colors duration-150 group-hover:underline text-[var(--text-main)]">
        {value}
      </p>
    </div>
  </a>
);

const Field = ({ label, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-[var(--text-main)]">
      {label}
    </label>
    {children}
    {error && (
      <p className="text-xs font-medium text-[var(--error-text)]">{error}</p>
    )}
  </div>
);

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });

  const { ContactPagePackage } = useContent();
  const { handleContactForm } = useUser();
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

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
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address.";
    if (!form.subject) e.subject = "Please select a subject.";
    if (!form.message.trim()) e.message = "Message cannot be empty.";
    else if (form.message.trim().length < 20)
      e.message = "Message must be at least 20 characters.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      ...form,
    };

    const res = await handleContactForm(payload);

    setErrors({});
    setStatus("loading");

    if (res) {
      setStatus("success")
    } else {
      setStatus("idle")
    }

  };

  const handleChange = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] font-['DM_Sans',sans-serif]">
      <CommonHeroSec
        pageName="Contact Us"
        heading="Get in Touch"
        para="Have a question, a listing request, or just want to say hello? We'd love to hear from you. Our team typically responds within 24 hours."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="rounded-2xl p-6 sm:p-8 bg-[var(--bg-card)] border border-[var(--border-default)]">
              <h2 className="text-xl font-bold mb-1 text-[var(--text-main)] font-['Sora',sans-serif]">
                Send us a Message
              </h2>

              <p className="text-sm mb-6 text-[var(--text-muted)]">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>

              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-16 gap-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-blue-100 text-[var(--primary)]">
                    <Icon name="check" size={28} />
                  </div>

                  <h3 className="text-xl font-bold text-[var(--text-main)] font-['Sora',sans-serif]">
                    Message Sent!
                  </h3>

                  <p className="text-sm text-center max-w-xs text-[var(--text-muted)]">
                    Thanks for reaching out. We'll get back to you within 24
                    hours.
                  </p>

                  <button
                    onClick={() => {
                      setStatus("idle");
                      setForm({
                        name: "",
                        email: "",
                        subject: "",
                        message: "",
                        phone: "",
                      });
                    }}
                    className="mt-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-[var(--primary)] text-white"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Full Name" error={errors.name}>
                    <input
                      className={inputClass(!!errors.name)}
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  </Field>

                  <Field label="Email Address" error={errors.email}>
                    <input
                      className={inputClass(!!errors.email)}
                      placeholder="john@example.com"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  </Field>

                  <Field label="Subject" error={errors.subject}>
                    <select
                      className={`${inputClass(
                        !!errors.subject
                      )} appearance-none cursor-pointer`}
                      value={form.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                    >
                      <option value="">Select a subject...</option>
                      {subjects.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field
                    label={
                      <span>
                        Phone{" "}
                        <span className="text-[var(--text-muted)] font-normal">
                          (optional)
                        </span>
                      </span>
                    }
                  >
                    <input
                      className={inputClass(!!errors.phone)}
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                    />
                  </Field>

                  <div className="sm:col-span-2">
                    <Field label="Message" error={errors.message}>
                      <textarea
                        className={`${inputClass(
                          !!errors.message
                        )} resize-y min-h-[140px]`}
                        placeholder="Tell us how we can help you..."
                        value={form.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                      />
                    </Field>

                    <p className="text-xs mt-1 text-right text-[var(--text-muted)]">
                      {form.message.length} / 1000
                    </p>
                  </div>

                  <div className="sm:col-span-2 flex items-center gap-4 flex-wrap">
                    <button
                      className={`flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-bold text-white bg-[var(--primary)] transition-[background,transform,box-shadow] duration-150 hover:not-disabled:bg-[var(--primary-hover)] hover:not-disabled:-translate-y-px hover:not-disabled:shadow-[0_6px_20px_rgba(37,99,235,0.3)] ${status === "loading"
                        ? "cursor-not-allowed opacity-80"
                        : "cursor-pointer"
                        }`}
                      onClick={handleSubmit}
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? (
                        <>
                          <svg
                            className="animate-spin"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <circle
                              cx="8"
                              cy="8"
                              r="6"
                              stroke="white"
                              strokeWidth="2"
                              strokeOpacity="0.3"
                            />
                            <path
                              d="M8 2a6 6 0 016 6"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
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

                    <p className="text-xs text-[var(--text-muted)]">
                      We'll never share your information with anyone.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-2xl overflow-hidden border border-[var(--border-default)] h-[260px]">
              <iframe
                title="Office Location"
                width="100%"
                height="100%"
                frameBorder="0"
                className="border-0"
                allowFullScreen
                loading="lazy"
                src={ContactPagePackage?.contactInfo?.googleMap || ""}
              />
            </div>

            <div className="rounded-2xl p-6 sm:p-8 bg-[var(--bg-card)] border border-[var(--border-default)]">
              <h2 className="text-xl font-bold mb-5 text-[var(--text-main)] font-['Sora',sans-serif]">
                Frequently Asked Questions
              </h2>

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
                ].map((faq, i) => (
                  <FAQItem key={i} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 self-start sticky top-6">
            <div className="rounded-2xl p-6 bg-[var(--bg-card)] border border-[var(--border-default)]">
              <h2 className="text-base font-bold mb-5 text-[var(--text-main)] font-['Sora',sans-serif]">
                Contact Information
              </h2>

              <div className="flex flex-col gap-5">
                <InfoBlock
                  icon="phone"
                  label="Phone"
                  value={ContactPagePackage?.contactInfo?.tel}
                  href={`tel:${ContactPagePackage?.contactInfo?.telLink}`}
                  color="#2563eb"
                />

                <InfoBlock
                  icon="whatsapp"
                  label="WhatsApp"
                  value={ContactPagePackage?.contactInfo?.tel}
                  href={`https://wa.me/${ContactPagePackage?.contactInfo?.telLink}`}
                  color="#22c55e"
                />

                <InfoBlock
                  icon="email"
                  label="Email"
                  value={ContactPagePackage?.contactInfo?.email}
                  href={`mailto:${ContactPagePackage?.contactInfo?.email}`}
                  color="#f59e0b"
                />

                <InfoBlock
                  icon="location"
                  label="Address"
                  value={ContactPagePackage?.contactInfo?.address}
                  color="#e11d48"
                />

                <div className="flex items-center gap-2 mt-4 p-3 rounded-xl text-sm bg-blue-50 text-[var(--primary)]">
                  <Icon name="clock" size={15} />
                  <span className="font-medium">
                    Avg. response time: under 24 hrs
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-6 bg-[var(--bg-card)] border border-[var(--border-default)]">
              <h2 className="text-base font-bold mb-4 text-[var(--text-main)] font-['Sora',sans-serif]">
                Follow Us
              </h2>

              <div className="flex gap-3">
                {ContactPagePackage?.socialLink?.map((s) => (
                  <a
                    key={s.label}
                    href={s.to}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="w-10 h-10 rounded-xl flex items-center justify-center border border-[var(--border-default)] text-[var(--text-muted)] bg-[var(--bg-page)] transition-[background,color,border-color] duration-150 hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)]"
                  >
                    <Icon name={s.name} size={17} />
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

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`rounded-xl overflow-hidden cursor-pointer border-[1.5px] transition-colors duration-150 hover:border-[var(--primary)] ${open ? "border-[var(--primary)]" : "border-[var(--border-default)]"
        }`}
      onClick={() => setOpen((p) => !p)}
    >
      <div className="flex items-center justify-between p-4 gap-3">
        <p className="text-sm font-semibold text-[var(--text-main)]">{q}</p>

        <span
          className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${open
            ? "bg-[var(--primary)] text-white rotate-90"
            : "bg-[var(--bg-page)] text-[var(--text-muted)] rotate-0"
            }`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
      </div>

      {open && (
        <div className="px-4 pb-4">
          <p className="text-sm leading-relaxed text-[var(--text-muted)]">
            {a}
          </p>
        </div>
      )}
    </div>
  );
}