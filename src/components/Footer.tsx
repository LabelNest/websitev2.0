'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// ─── TOKENS (accent colours are the same in both themes) ──────────────────────
const C = {
  bg:     "var(--bg)",
  white:  "var(--surface)",
  border: "var(--border)",
  line:   "var(--border)",
  ink:    "var(--text)",
  sub:    "var(--text2)",
  muted:  "var(--text2)",
  dim:    "var(--text3)",
  navy:   "#0F172A",
  pink:   "#E91E8C",  pinkDk:"#DB2777",
  purple: "#7C3AED",
  blue:   "#2563EB",
  orange: "#F97316",  orangeDk:"#EA580C",
  green:  "#059669",  greenBg:"#ECFDF5", greenBd:"#A7F3D0",
  red:    "#DC2626",
};

const LOGO_URL =
  "https://pub-a36a86a8b72a466f95980705b327476f.r2.dev/brand/labelnest-logo.png";

// ─── LINK COLUMNS ─────────────────────────────────────────────────────────────
const COLUMNS = [
  {
    title: "Products",
    links: [
      { label: "NestLens",          href: "/nestlens" },
      { label: "Intelligence",      href: "/nestlens/intelligence" },
      { label: "Exchange",          href: "/nestlens/exchange" },
      { label: "Capital Readiness", href: "/nestlens/capital" },
      { label: "NestHR",            href: "/nesthr" },
      { label: "All products",      href: "/ecosystem" },
      { label: "Resource Hub",      href: "https://nestlens.labelnest.in/DIY" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About",     href: "/about" },
      { label: "Team",      href: "/team" },
      { label: "Founder",   href: "/about/ankit" },
      { label: "Careers",   href: "/careers" },
      { label: "Briefings", href: "/briefings" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Managed Services", href: "/services" },
      { label: "Contact",          href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy",       href: "/legal/privacy" },
      { label: "Terms and Conditions", href: "/legal/terms" },
      { label: "Cookie Policy",        href: "/legal/cookies" },
      { label: "Security Policy",      href: "/legal/security" },
      { label: "All legal docs",       href: "/legal" },
    ],
  },
];

// ─── ANIMATED TAGLINE ─────────────────────────────────────────────────────────
// "Data Not Done Wrong" corrects itself into "Data Done, Right." — brand promise
// shown live. Loops every ~5 s.
function AnimatedTagline() {
  const [phase, setPhase] = useState(0); // 0=wrong, 1=striking, 2=corrected

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      setPhase(0);
      timers.push(setTimeout(() => setPhase(1), 1400));
      timers.push(setTimeout(() => setPhase(2), 2100));
      timers.push(setTimeout(() => run(),        5200));
    };
    run();
    return () => timers.forEach(clearTimeout);
  }, []);

  const struck: React.CSSProperties = {
    position: "relative",
    color: phase >= 1 ? C.dim : C.ink,
    transition: "color 0.4s",
  };
  const strike = (on: boolean): React.CSSProperties => ({
    position: "absolute", left: 0, top: "52%", height: 2,
    width: on ? "100%" : "0%",
    background: C.red, borderRadius: 2,
    transition: "width 0.35s ease-out",
  });

  return (
    <div style={{
      fontSize: 16, fontWeight: 600, marginBottom: 6,
      minHeight: 24, display: "flex", alignItems: "center",
      flexWrap: "wrap", gap: 6, lineHeight: 1.3,
    }}>
      <span style={{ color: C.ink }}>Data</span>

      {/* "Not" — strikes then collapses */}
      <span style={{
        display: "inline-block", overflow: "hidden",
        maxWidth: phase >= 2 ? 0 : 40,
        opacity: phase >= 2 ? 0 : 1,
        marginRight: phase >= 2 ? -6 : 0,
        transition: "max-width 0.5s ease, opacity 0.4s, margin 0.5s",
      }}>
        <span style={struck}>
          Not
          <span style={strike(phase >= 1)} />
        </span>
      </span>

      <span style={{ color: C.ink }}>Done</span>

      {/* comma appears when corrected */}
      <span style={{
        color: C.ink, marginLeft: -6,
        opacity: phase >= 2 ? 1 : 0,
        maxWidth: phase >= 2 ? 12 : 0,
        transition: "opacity 0.4s 0.1s, max-width 0.4s",
        display: "inline-block", overflow: "hidden",
      }}>,</span>

      {/* "Wrong" → "Right" */}
      <span style={{ position: "relative", display: "inline-block" }}>
        <span style={{
          ...struck,
          opacity: phase >= 2 ? 0 : 1,
          position: phase >= 2 ? "absolute" : "relative",
          transition: "opacity 0.35s, color 0.4s",
          whiteSpace: "nowrap",
        }}>
          Wrong
          <span style={strike(phase >= 1)} />
        </span>
        <span style={{
          color: C.pink, fontWeight: 700, whiteSpace: "nowrap",
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? "translateY(0)" : "translateY(6px)",
          transition: "opacity 0.4s 0.15s, transform 0.4s 0.15s",
          position: phase >= 2 ? "relative" : "absolute", left: 0,
        }}>
          Right.
          <span style={{
            marginLeft: 5, fontSize: 13,
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? "scale(1)" : "scale(0)",
            transition: "opacity 0.3s 0.35s, transform 0.4s 0.35s cubic-bezier(.34,1.56,.64,1)",
            display: "inline-block",
          }}>✓</span>
        </span>
      </span>
    </div>
  );
}

// ─── NEWSLETTER SUBSCRIBE ──────────────────────────────────────────────────────
function NewsletterSubscribe() {
  const [email, setEmail]   = useState("");
  const [state, setState]   = useState<"idle"|"loading"|"success"|"error">("idle");
  const [message, setMessage] = useState("");
  const [burst, setBurst]   = useState(false);

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const submit = async () => {
    if (!valid) {
      setState("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setState("loading");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "website_footer" }),
      });
      if (!res.ok) throw new Error("server");
      setState("success");
      setMessage("You're in. Watch your inbox for the next issue.");
      setEmail("");
      setBurst(true);
      setTimeout(() => setBurst(false), 900);
    } catch {
      setState("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: 380, width: "100%" }}>
      <div style={{
        fontSize: 11, fontWeight: 700, color: C.dim,
        textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10,
      }}>
        Join the list
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, color: C.ink, marginBottom: 6 }}>
        Join the LabelNest subscriber list
      </div>
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, marginBottom: 16 }}>
        Private market data, product updates, and the occasional field note. No spam, ever.
      </div>

      {state === "success" ? (
        <div style={{
          position: "relative", display: "flex", alignItems: "flex-start", gap: 10,
          background: C.greenBg, border: `1px solid ${C.greenBd}`,
          borderRadius: 10, padding: "12px 14px",
        }}>
          {burst && ([0,1,2,3,4,5,6,7] as const).map(i => (
            <span key={i} style={{
              position: "absolute", left: 22, top: 18,
              width: 6, height: 6, borderRadius: "50%",
              background: [C.pink,C.orange,C.blue,C.green,C.purple][i%5],
              animation: `ln-burst-${i%4} 0.8s ease-out forwards`,
            }} />
          ))}
          <span style={{ fontSize: 16, flexShrink: 0 }}>🎉</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.green, marginBottom: 2 }}>
              You&apos;re subscribed!
            </div>
            <div style={{ fontSize: 12, color: C.sub, lineHeight: 1.5 }}>{message}</div>
          </div>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type="email" value={email} placeholder="you@company.com"
              onChange={e => { setEmail(e.target.value); if (state === "error") setState("idle"); }}
              onKeyDown={e => e.key === "Enter" && submit()}
              onFocus={e => {
                e.target.style.borderColor = C.pink;
                e.target.style.boxShadow = `0 0 0 3px ${C.pink}1A`;
              }}
              onBlur={e => {
                e.target.style.borderColor = state === "error" ? C.red : "var(--border)";
                e.target.style.boxShadow = "none";
              }}
              style={{
                flex: 1, minWidth: 0, padding: "11px 13px", fontSize: 14,
                border: `1px solid ${state === "error" ? C.red : "var(--border)"}`,
                borderRadius: 10, background: C.white, color: C.ink,
                outline: "none", fontFamily: "inherit",
                transition: "border 0.15s, box-shadow 0.15s",
              }}
            />
            <button
              onClick={submit} disabled={state === "loading"}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              style={{
                padding: "11px 20px", fontSize: 14, fontWeight: 600,
                background: C.navy, color: "#fff", border: "none", borderRadius: 10,
                cursor: state === "loading" ? "wait" : "pointer", fontFamily: "inherit",
                whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 7,
                transition: "opacity 0.15s",
              }}
            >
              {state === "loading" ? (
                <>
                  <span style={{
                    width: 13, height: 13,
                    border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff",
                    borderRadius: "50%", display: "inline-block",
                    animation: "ln-spin 0.7s linear infinite",
                  }} />
                  Joining
                </>
              ) : "Subscribe"}
            </button>
          </div>
          {state === "error" && (
            <div style={{ fontSize: 12, color: C.red, marginTop: 7 }}>{message}</div>
          )}
          <div style={{ fontSize: 11, color: C.dim, marginTop: 10 }}>
            By subscribing you agree to our{" "}
            <Link href="/legal/privacy" style={{ color: C.muted, textDecoration: "underline" }}>
              privacy policy
            </Link>. Unsubscribe anytime.
          </div>
        </>
      )}
    </div>
  );
}

// ─── FOUNDER CTA ──────────────────────────────────────────────────────────────
function FounderCTA() {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ maxWidth: 300 }}>
      <div style={{
        fontSize: 11, fontWeight: 700, color: C.pink,
        textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10,
      }}>
        Founder&apos;s Newsletter
      </div>
      <div style={{ fontSize: 17, fontWeight: 700, color: C.ink, marginBottom: 8 }}>
        Operator to Founder
      </div>
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, marginBottom: 18 }}>
        Building LabelNest from zero. Sharing the journey as it happens.
      </div>
      <a
        href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7472967819387686913"
        target="_blank" rel="noreferrer"
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "11px 20px", fontSize: 14, fontWeight: 600,
          background: hov ? C.orangeDk : C.orange, color: "#fff",
          borderRadius: 10, textDecoration: "none",
          transition: "background 0.15s, transform 0.15s, box-shadow 0.15s",
          transform: hov ? "translateY(-1px)" : "none",
          boxShadow: hov ? `0 8px 20px ${C.orange}55` : "none",
        }}
      >
        Follow on LinkedIn
        <span style={{
          transition: "transform 0.15s",
          transform: hov ? "translate(3px,-3px)" : "none",
          display: "inline-block",
        }}>↗</span>
      </a>
    </div>
  );
}

// ─── FOOTER LINK (arrow slides in on hover) ───────────────────────────────────
function FooterLink({ link }: { link: { label: string; href: string } }) {
  const [hov, setHov] = useState(false);
  return (
    <Link
      href={link.href}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 5,
        fontSize: 13.5, color: hov ? C.ink : C.sub,
        textDecoration: "none", padding: "6px 0",
        transition: "color 0.12s",
      }}
    >
      <span style={{
        position: "relative",
        transform: hov ? "translateX(3px)" : "none",
        transition: "transform 0.18s cubic-bezier(.34,1.56,.64,1)",
      }}>
        {link.label}
      </span>
      <span style={{
        fontSize: 12, color: C.pink,
        opacity: hov ? 1 : 0,
        transform: hov ? "translateX(0)" : "translateX(-6px)",
        transition: "opacity 0.15s, transform 0.18s",
      }}>→</span>
    </Link>
  );
}

// ─── ROTATING SIGNATURE LINE ──────────────────────────────────────────────────
function SignatureLine() {
  const words = ["potential", "precision", "curiosity", "care", "grit"];
  const [i, setI] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setI(prev => (prev + 1) % words.length);
        setShow(true);
      }, 300);
    }, 2600);
    return () => clearInterval(iv);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{
      fontSize: 12, color: C.dim, fontFamily: "monospace",
      display: "flex", alignItems: "center", gap: 5,
    }}>
      Built by people with the right{" "}
      <span style={{ position: "relative", display: "inline-block", minWidth: 72, color: C.pink, fontWeight: 600 }}>
        <span style={{
          display: "inline-block",
          opacity: show ? 1 : 0,
          transform: show ? "translateY(0)" : "translateY(-6px)",
          transition: "opacity 0.3s, transform 0.3s",
        }}>
          {words[i]}
        </span>
      </span>
      <span style={{ animation: "ln-sparkle 2.6s ease-in-out infinite" }}>✨</span>
    </div>
  );
}

// ─── MAIN FOOTER ──────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer style={{
      fontFamily: "'Inter',-apple-system,BlinkMacSystemFont,sans-serif",
      background: C.bg, position: "relative",
    }}>
      {/* Animated gradient sweep on the top hairline */}
      <div style={{ height: 2, width: "100%", overflow: "hidden", background: C.border, position: "relative" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(90deg, transparent, ${C.pink}, ${C.purple}, ${C.orange}, transparent)`,
          backgroundSize: "50% 100%", backgroundRepeat: "no-repeat",
          animation: "ln-sweep 4s linear infinite",
        }} />
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 32px 36px" }}>

        {/* ── Row 1: brand · newsletter · founder ── */}
        <div
          className="ln-top-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1.3fr 1fr",
            gap: 44, alignItems: "start", marginBottom: 44,
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ marginBottom: 18 }}>
              <Link href="/" style={{ display: "inline-block", lineHeight: 0 }}>
                <Image
                  src={LOGO_URL}
                  alt="LabelNest"
                  width={130}
                  height={42}
                  className="ln-logo"
                  style={{ height: 42, width: "auto", objectFit: "contain" }}
                  priority
                />
              </Link>
            </div>
            <AnimatedTagline />
            <div style={{ fontSize: 13, color: C.dim }}>
              Bengaluru, Karnataka, India
            </div>
          </div>

          {/* Newsletter — centre, with side dividers */}
          <div
            className="ln-mid"
            style={{
              borderLeft: `1px solid ${C.border}`,
              borderRight: `1px solid ${C.border}`,
              padding: "0 40px",
            }}
          >
            <NewsletterSubscribe />
          </div>

          {/* Founder CTA */}
          <div><FounderCTA /></div>
        </div>

        {/* ── Row 2: link columns ── */}
        <div
          className="ln-cols"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 32, paddingTop: 36,
            borderTop: `1px solid ${C.border}`,
          }}
        >
          {COLUMNS.map(col => (
            <div key={col.title}>
              <div style={{
                fontSize: 11, fontWeight: 700, color: C.dim,
                textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12,
              }}>
                {col.title}
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {col.links.map(link => <FooterLink key={link.label} link={link} />)}
              </div>
            </div>
          ))}
        </div>

        {/* ── Row 3: bottom bar ── */}
        <div style={{
          marginTop: 40, paddingTop: 22,
          borderTop: `1px solid ${C.border}`,
          display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 16, flexWrap: "wrap",
        }}>
          <div style={{ fontSize: 12, color: C.dim }}>
            © {new Date().getFullYear()} LabelNest India Private Limited ·
            CIN: U63111KA2025PTC211812 · All rights reserved.
          </div>
          <SignatureLine />
        </div>
      </div>

      {/* Keyframes + responsive + logo theme filter */}
      <style>{`
        @keyframes ln-spin    { to { transform: rotate(360deg); } }
        @keyframes ln-sweep {
          0%   { background-position: -60% 0; }
          100% { background-position: 160% 0; }
        }
        @keyframes ln-sparkle {
          0%,100% { opacity: 0.4; transform: scale(0.9) rotate(0deg); }
          50%     { opacity: 1;   transform: scale(1.15) rotate(15deg); }
        }
        @keyframes ln-burst-0 { to { transform: translate(-18px,-20px) scale(0); opacity:0; } }
        @keyframes ln-burst-1 { to { transform: translate(16px,-22px)  scale(0); opacity:0; } }
        @keyframes ln-burst-2 { to { transform: translate(-14px,14px)  scale(0); opacity:0; } }
        @keyframes ln-burst-3 { to { transform: translate(20px,10px)   scale(0); opacity:0; } }

        /* Logo: invert to white in dark mode (logo is navy on transparent) */
        [data-theme="dark"]  .ln-logo { filter: brightness(0) invert(1); }
        [data-theme="light"] .ln-logo { filter: none; }

        @media (max-width: 920px) {
          .ln-top-grid { grid-template-columns: 1fr !important; gap: 34px !important; }
          .ln-mid {
            border-left: none !important;
            border-right: none !important;
            padding: 32px 0 !important;
            border-top: 1px solid var(--border);
            border-bottom: 1px solid var(--border);
          }
          .ln-cols { grid-template-columns: 1fr 1fr !important; gap: 28px !important; }
        }
        @media (max-width: 520px) {
          .ln-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
