import React from 'react';
import Link from 'next/link';

export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type FooterColumn = {
  title: string;
  links: readonly FooterLink[];
};

type SocialLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

type Props = {
  columns: readonly FooterColumn[];
  social: readonly SocialLink[];
  copyrightText: string;
};

function SocialIconLink({ label, href, icon }: SocialLink) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex items-center justify-center rounded-md p-2 text-white/90 hover:text-white hover:bg-white/10"
    >
      {icon}
    </a>
  );
}

export default function MarketingFooter({
  columns,
  social,
  copyrightText,
}: Props) {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-teal-700 inset-shadow-sm inset-shadow-teal-800 text-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {columns.map(col => (
            <section key={col.title} aria-label={col.title}>
              <h2 className="text-sm font-semibold tracking-tight">{col.title}</h2>
              <ul className="mt-4 flex flex-col gap-2">
                {col.links.map(link => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-white/90 hover:text-white"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-white/90 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-white/90">
            {copyrightText.replace('{year}', String(year))}
          </p>
          <div className="flex items-center gap-2">
            {social.map(item => (
              <SocialIconLink key={item.href} {...item} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
