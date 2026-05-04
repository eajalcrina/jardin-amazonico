"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Catálogo", href: "/#catalogo" },
  { label: "Membresía", href: "/#membresia" },
  { label: "Paisajismo", href: "/paisajismo" },
  { label: "Corporativo", href: "/corporativo" },
  { label: "FAQ", href: "/#faq" },
];

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? "51914401895";

const WA_MESSAGES: Record<string, string> = {
  "/paisajismo": "Estoy interesado en el servicio de paisajismo",
  "/corporativo": "Estoy interesado en las plantas como merch",
};

function getWhatsAppUrl(pathname: string) {
  const msg = WA_MESSAGES[pathname];
  if (msg) return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  return `https://wa.me/${WA_NUMBER}`;
}

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
    }
    if (menuOpen) {
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [menuOpen, closeMenu]);

  const showSolid = !isHome || scrolled || menuOpen;
  const waUrl = getWhatsAppUrl(pathname);

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          showSolid
            ? "bg-ja-paper/95 backdrop-blur-md border-b border-ja-dark/10"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="container mx-auto px-6 max-w-6xl h-14 flex items-center justify-between">
          <Link
            href="/"
            className={[
              "font-display text-lg tracking-tight transition-colors",
              showSolid ? "text-ja-dark" : "text-ja-paper",
            ].join(" ")}
          >
            Jardín Amazónico
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Principal">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "text-[13px] uppercase tracking-[0.12em] transition-colors",
                  showSolid
                    ? "text-ja-ink/70 hover:text-ja-dark"
                    : "text-ja-paper/80 hover:text-ja-paper",
                ].join(" ")}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className={[
                "text-[13px] uppercase tracking-[0.12em] transition-colors",
                showSolid
                  ? "text-ja-ink/70 hover:text-ja-dark"
                  : "text-ja-paper/80 hover:text-ja-paper",
              ].join(" ")}
            >
              Contacto
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            className="md:hidden relative w-8 h-8 flex items-center justify-center"
          >
            <span className="sr-only">{menuOpen ? "Cerrar" : "Menú"}</span>
            <span
              className={[
                "absolute left-1 right-1 h-[1.5px] rounded-full transition-all duration-300",
                showSolid ? "bg-ja-dark" : "bg-ja-paper",
                menuOpen
                  ? "rotate-45 translate-y-0"
                  : "-translate-y-[4px]",
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-1 right-1 h-[1.5px] rounded-full transition-all duration-300",
                showSolid ? "bg-ja-dark" : "bg-ja-paper",
                menuOpen
                  ? "-rotate-45 translate-y-0"
                  : "translate-y-[4px]",
              ].join(" ")}
            />
          </button>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-ja-paper flex flex-col"
          >
            {/* Spacer for the header */}
            <div className="h-14 shrink-0" />

            <nav
              className="flex-1 flex flex-col justify-center px-8 gap-1"
              aria-label="Menú principal"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="block py-3 font-display text-3xl text-ja-dark hover:text-ja-mid transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + NAV_LINKS.length * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeMenu}
                  className="block py-3 font-display text-3xl text-ja-dark hover:text-ja-mid transition-colors"
                >
                  Contacto
                </a>
              </motion.div>
            </nav>

            <div className="px-8 pb-10">
              <p className="text-xs text-ja-ink/50">
                Plantas vivas. Alma amazónica.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
