'use client';

import React from 'react';
import Link from 'next/link';
import Logo from '../resources/Logo';

export type MarketingNavItem = {
  label: string;
  href: string;
};

type Props = {
  navItems: readonly MarketingNavItem[];
  primaryCta: MarketingNavItem;
  secondaryCta: MarketingNavItem;
};

export default function MarketingHeader({
  navItems,
  primaryCta,
  secondaryCta,
}: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur border-b border-black/5">
      <div className="mx-auto max-w-5xl px-6">
        <div className="h-16 flex items-center justify-between">
          <Link
            href="/"
            aria-label="Esturide"
            className="flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-700 hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href={secondaryCta.href}
              className="text-sm font-semibold text-slate-700 hover:text-slate-900"
            >
              {secondaryCta.label}
            </Link>
            <Link
              href={primaryCta.href}
              className="inline-flex items-center justify-center rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
            >
              {primaryCta.label}
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {open ? (
                <path
                  d="M6 6L18 18M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 6H20M4 12H20M4 18H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 z-50 bg-white">
          <div className="mx-auto max-w-5xl px-6">
            <div className="h-16 flex items-center justify-between border-b border-black/5">
              <Link
                href="/"
                aria-label="Esturide"
                className="flex items-center gap-3"
                onClick={() => setOpen(false)}
              >
                <Logo />
              </Link>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100"
                aria-label="Cerrar menú"
                onClick={() => setOpen(false)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6L18 18M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <nav className="py-8" aria-label="Mobile">
              <div className="flex flex-col gap-4">
                {navItems.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-base font-semibold text-slate-800"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center justify-center rounded-md bg-teal-700 px-4 py-3 text-base font-semibold text-white hover:bg-teal-800"
                  onClick={() => setOpen(false)}
                >
                  {primaryCta.label}
                </Link>
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center justify-center rounded-md border border-slate-200 px-4 py-3 text-base font-semibold text-slate-800 hover:bg-slate-50"
                  onClick={() => setOpen(false)}
                >
                  {secondaryCta.label}
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
