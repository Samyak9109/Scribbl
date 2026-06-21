import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Info, X, Mail, Code2 } from "lucide-react";

const LinkedinIcon = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/samyak-jain-122aaa273/",
    Icon: LinkedinIcon,
    color: "#0A66C2",
  },
  {
    label: "GitHub",
    href: "https://github.com/Samyak9109",
    Icon: GithubIcon,
    color: "#6e40c9",
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/user7969yQ/",
    Icon: Code2,
    color: "#FFA116",
  },
  {
    label: "Email",
    href: "mailto:samyak.0325@gmail.com",
    Icon: Mail,
    color: "#EA4335",
  },
];

const InfoButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);
  const buttonRef = useRef(null);
  const theme = useSelector((state) => state.tools.theme);
  const isDark = theme === "dark";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, [isOpen]);

  const surface = isDark
    ? "border-slate-700 bg-slate-950/95 text-slate-100"
    : "border-slate-200 bg-white/97 text-slate-700";

  const mutedText = isDark ? "text-slate-400" : "text-slate-500";
  const divider = isDark ? "border-slate-700/60" : "border-slate-200";
  const linkHover = isDark
    ? "hover:bg-slate-800/70"
    : "hover:bg-slate-50";

  return (
    <>
      {/* Floating info button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Project information"
        className={`whiteboard-info-button fixed z-50 flex items-center justify-center
          w-10 h-10 rounded-full border shadow-lg backdrop-blur-sm
          transition-all duration-200 cursor-pointer
          ${surface}
          ${isOpen ? "ring-2 ring-violet-500/40 scale-95" : "hover:scale-105 hover:shadow-xl"}
        `}
      >
        {isOpen ? <X size={18} /> : <Info size={18} />}
      </button>

      {/* Info panel */}
      {isOpen && (
        <div
          ref={panelRef}
          className={`whiteboard-info-panel fixed z-50 w-72 rounded-2xl border shadow-2xl
            backdrop-blur-xl transition-all duration-300 animate-in
            ${surface}
          `}
          style={{
            animation: "info-pop-in 0.25s cubic-bezier(0.16,1,0.3,1) both",
          }}
        >
          {/* Header */}
          <div className="px-4 pt-4 pb-3">
            <div className="flex items-center gap-2 mb-1.5">
              <div
                className="flex items-center justify-center w-7 h-7 rounded-lg"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                }}
              >
                <span className="text-white text-sm font-bold">S</span>
              </div>
              <h3
                className={`text-base font-bold tracking-tight ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Scribbl
              </h3>
            </div>
            <p className={`text-xs leading-relaxed ${mutedText}`}>
              A real-time collaborative whiteboard — draw together, drop shapes &amp; text,
              switch themes, and export as PNG. Built with React, Socket.IO &amp;
              Redux Toolkit.
            </p>
          </div>

          {/* Divider */}
          <div className={`mx-4 border-t ${divider}`} />

          {/* Social links */}
          <div className="px-2 py-2">
            <p
              className={`px-2 pb-1.5 text-[0.65rem] font-semibold uppercase tracking-wider ${mutedText}`}
            >
              Built by Samyak Jain
            </p>
            {socialLinks.map(({ label, href, Icon, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 px-2 py-2 rounded-xl text-sm font-medium
                  transition-colors duration-150 no-underline
                  ${isDark ? "text-slate-200" : "text-slate-700"}
                  ${linkHover}
                `}
              >
                <span
                  className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
                  style={{ backgroundColor: `${color}18` }}
                >
                  <Icon size={16} style={{ color }} />
                </span>
                <span>{label}</span>
              </a>
            ))}
          </div>

          {/* Footer */}
          <div className={`mx-4 border-t ${divider}`} />
          <div className="px-4 py-2.5">
            <p className={`text-[0.6rem] text-center ${mutedText}`}>
              © 2025 Samyak Jain · Free for non-commercial use
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoButton;
