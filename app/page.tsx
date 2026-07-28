'use client';

import Image from 'next/image';
import { useState } from 'react';
import { SparkQuiz } from '@/components/SparkQuiz';
import { ServicesSection } from '@/components/ServicesSection';
import { BusinessValidator } from '@/components/BusinessValidator';
import { Footer } from '@/components/Footer';

export default function Home() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isValidatorOpen, setIsValidatorOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen relative flex flex-col hero-mesh">

      {/* ── Navbar ── */}
      <header className="w-full z-50 sticky top-0">
        {/* Gradient accent bar */}
        <div className="h-[2px] w-full bg-gradient-to-r from-violet-500 via-cyan-400 to-blue-500" />

        <div className="bg-white/90 backdrop-blur-xl border-b border-zinc-200/80 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">

              {/* Logo */}
              <a href="/" className="flex items-center gap-2 flex-shrink-0">
                <Image
                  src="/logo.svg"
                  alt="HelpMeBusiness Logo"
                  width={140}
                  height={44}
                  className="h-8 w-auto object-contain"
                  priority
                />
              </a>

              {/* Desktop nav links */}
              <nav className="hidden md:flex items-center gap-1">
                {[
                  { label: 'Services', href: '#services' },
                  { label: 'How It Works', href: '#services' },
                  { label: 'About', href: '#' },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="relative px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 rounded-lg transition-all duration-200 group"
                  >
                    {link.label}
                    <span className="absolute bottom-1 left-4 right-4 h-px bg-violet-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
                  </a>
                ))}
              </nav>

              {/* Right CTAs + mobile toggle */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsQuizOpen(true)}
                  className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 rounded-lg hover:bg-zinc-100 transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                  Get Clarity
                </button>

                <button
                  onClick={() => setIsValidatorOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 active:scale-95 transition-all duration-200 shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  <span className="hidden sm:inline">Validate Business</span>
                  <span className="sm:hidden">Validate</span>
                </button>

                {/* Mobile hamburger */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-all"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile dropdown menu */}
            {mobileMenuOpen && (
              <div className="md:hidden border-t border-zinc-100 py-3 space-y-1 animate-in slide-in-from-top-2 fade-in duration-200">
                {[
                  { label: 'Services', href: '#services' },
                  { label: 'How It Works', href: '#services' },
                  { label: 'About', href: '#' },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded-lg transition-all"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-2 pb-1 border-t border-zinc-100 mt-2">
                  <button
                    onClick={() => { setIsQuizOpen(true); setMobileMenuOpen(false); }}
                    className="w-full text-left px-3 py-2.5 text-sm font-medium text-cyan-600 hover:bg-cyan-50 rounded-lg transition-all"
                  >
                    Get Clarity →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="flex-1 flex flex-col">

        {/* Hero section */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left column */}
            <div className="flex flex-col items-start text-left space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">

              {/* Trust badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-violet-200 badge-shimmer">
                <span className="w-2 h-2 rounded-full bg-violet-500 shadow-[0_0_6px_2px_rgba(139,92,246,0.5)]" />
                <span className="text-xs font-semibold text-violet-700 tracking-wide uppercase">
                  India&apos;s Business Clarity Platform
                </span>
              </div>

              {/* Headline */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-zinc-900">
                  Don&apos;t burn money<br />
                  on the{' '}
                  <span className="text-gradient">wrong business.</span>
                </h1>
                <p className="text-lg sm:text-xl text-zinc-500 leading-relaxed max-w-lg font-light">
                  Validate your idea, pricing, and revenue model before you invest big.
                  Expert clarity — before the risk.
                </p>
              </div>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2">
                {['✓ Business Validation', '✓ Revenue Modelling', '✓ 1:1 Expert Sessions', '✓ Idea-to-Income Roadmap'].map((f) => (
                  <span key={f} className="px-3 py-1.5 rounded-lg bg-zinc-100 text-zinc-600 text-xs font-medium border border-zinc-200">
                    {f}
                  </span>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setIsValidatorOpen(true)}
                  className="cta-pulse inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-zinc-900 text-white text-sm font-bold hover:bg-zinc-800 active:scale-95 transition-all duration-200 shadow-lg shadow-zinc-900/20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Validate My Business
                </button>
                <button
                  onClick={() => setIsQuizOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border-2 border-zinc-200 bg-white text-zinc-800 text-sm font-semibold hover:border-zinc-300 hover:bg-zinc-50 active:scale-95 transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                  Get Clarity
                </button>
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-8 pt-2 border-t border-zinc-100 w-full">
                {[
                  { value: '500+', label: 'Businesses Guided' },
                  { value: '98%', label: 'Satisfaction Rate' },
                  { value: '3 Stages', label: 'Proven Framework' },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-xl font-bold text-zinc-900">{stat.value}</span>
                    <span className="text-xs text-zinc-400 mt-0.5">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column — visual card */}
            <div className="hidden lg:flex items-center justify-center animate-in fade-in slide-in-from-right-8 duration-1000">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-8 -right-8 w-64 h-64 rounded-full bg-violet-400/10 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-8 -left-8 w-64 h-64 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />

                <div className="relative liquid-card rounded-3xl p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Business Assessment</p>
                      <h3 className="text-lg font-bold text-zinc-900 mt-1">Your Clarity Score</h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { label: 'Revenue Model', pct: 85, color: 'bg-violet-500' },
                      { label: 'Market Fit', pct: 70, color: 'bg-cyan-500' },
                      { label: 'Execution Plan', pct: 60, color: 'bg-blue-500' },
                    ].map((bar) => (
                      <div key={bar.label}>
                        <div className="flex justify-between text-xs text-zinc-500 mb-1.5">
                          <span className="font-medium">{bar.label}</span>
                          <span>{bar.pct}%</span>
                        </div>
                        <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${bar.color}`} style={{ width: `${bar.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {[
                      { icon: '💡', label: 'Ideas Curated', value: '3 tailored' },
                      { icon: '📈', label: 'Revenue Path', value: 'Mapped out' },
                      { icon: '🎯', label: 'Target Market', value: 'Identified' },
                      { icon: '⚡', label: 'Time to Launch', value: '30 days' },
                    ].map((item) => (
                      <div key={item.label} className="bg-zinc-50 border border-zinc-100 rounded-2xl p-3">
                        <span className="text-base">{item.icon}</span>
                        <p className="text-[10px] text-zinc-400 mt-1">{item.label}</p>
                        <p className="text-xs font-semibold text-zinc-800">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="float-anim absolute -bottom-5 -left-6 glass-card rounded-2xl px-4 py-3 flex items-center gap-2.5 shadow-xl border border-zinc-100">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">✓</div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900">Validation Complete</p>
                    <p className="text-[10px] text-zinc-400">Report sent to inbox</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Services Section */}
        <div className="w-full px-4 sm:px-6 lg:px-8 pb-24">
          <ServicesSection onQuizOpen={() => setIsQuizOpen(true)} />
        </div>

      </main>

      {/* ── Footer ── */}
      <Footer onQuizOpen={() => setIsQuizOpen(true)} onValidatorOpen={() => setIsValidatorOpen(true)} />

      {isQuizOpen && <SparkQuiz onClose={() => setIsQuizOpen(false)} />}
      {isValidatorOpen && <BusinessValidator onClose={() => setIsValidatorOpen(false)} />}
    </div>
  );
}
