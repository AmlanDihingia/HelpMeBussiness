'use client';

import Image from 'next/image';

const footerLinks = {
  Services: [
    { label: 'Idea Spark', href: '#services' },
    { label: 'Capital to Concept', href: '#services' },
    { label: 'Location Opportunity', href: '#services' },
    { label: 'Revenue Model Design', href: '#services' },
    { label: 'Website Development', href: '#services' },
    { label: 'Lead Generation', href: '#services' },
  ],
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Our Process', href: '#' },
    { label: 'Testimonials', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  Support: [
    { label: 'Contact Us', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
};

const socials = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.47a2.78 2.78 0 0 0-1.95 1.97A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.42a2.78 2.78 0 0 0 1.95-1.98A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    ),
  },
];

export function Footer({ onQuizOpen, onValidatorOpen }: { onQuizOpen: () => void; onValidatorOpen: () => void }) {
  return (
    <footer className="w-full border-t border-zinc-200/80 bg-white">

      {/* ── CTA Strip ── */}
      <div className="w-full bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Ready to get started?</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                Stop guessing. Start building<br className="hidden md:block" /> with clarity.
              </h2>
              <p className="text-zinc-400 text-sm mt-2 max-w-md">
                Join hundreds of Indian entrepreneurs who validated their ideas before investing.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <button
                onClick={onValidatorOpen}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-zinc-900 text-sm font-bold hover:bg-zinc-100 active:scale-95 transition-all duration-200 shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Validate My Business
              </button>
              <button
                onClick={onQuizOpen}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-zinc-700 text-zinc-300 text-sm font-semibold hover:border-zinc-500 hover:text-white active:scale-95 transition-all duration-200"
              >
                Get Clarity
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Image
              src="/logo.svg"
              alt="HelpMeBusiness"
              width={140}
              height={44}
              className="h-9 w-auto object-contain"
            />
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              India&apos;s business clarity platform. We help entrepreneurs validate, plan, and launch the right business — before they risk their capital.
            </p>

            {/* Contact */}
            <div className="space-y-2">
              <a
                href="mailto:hello@helpmebusiness.in"
                className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-zinc-400 group-hover:text-violet-500 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                hello@helpmebusiness.in
              </a>
              <a
                href="https://wa.me/919999999999"
                className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-zinc-400 group-hover:text-emerald-500 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                WhatsApp Us
              </a>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2 pt-1">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 hover:bg-zinc-50 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest mb-4">{category}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-400 text-center sm:text-left">
            © {new Date().getFullYear()} HelpMeBusiness. All rights reserved. Made with ❤️ in India.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors">Privacy</a>
            <span className="w-px h-3 bg-zinc-200" />
            <a href="#" className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors">Terms</a>
            <span className="w-px h-3 bg-zinc-200" />
            <a href="#" className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
