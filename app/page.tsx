'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SparkQuiz } from '@/components/SparkQuiz';
import { ServicesSection } from '@/components/ServicesSection';
import { BusinessValidator } from '@/components/BusinessValidator';

export default function Home() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isValidatorOpen, setIsValidatorOpen] = useState(false);

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Background visual effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-purple/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-cyan/20 blur-[120px]" />
      </div>

      {/* Navbar */}
      <header className="w-full px-6 py-4 lg:px-12 flex justify-between items-center z-10 glass-card mx-auto max-w-7xl mt-4 rounded-2xl sticky top-4">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/logo.svg"
            alt="HelpMeBusiness Logo"
            width={160}
            height={50}
            className="h-10 w-auto object-contain"
            priority
          />
        </div>

        <nav className="hidden md:flex gap-6 text-sm font-medium text-zinc-600">
          <a href="#services" className="hover:text-zinc-900 transition-colors">Services</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" onClick={() => setIsValidatorOpen(true)}>Validate Your Business</Button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center pt-24 pb-32 px-6">

        {/* Hero Section */}
        <section className="w-full max-w-4xl text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-[1.1]">
            Don&apos;t burn money on the<br />
            <span className="text-gradient">wrong business.</span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-zinc-600 max-w-3xl lg:max-w-4xl mx-auto font-light leading-relaxed">
            Validate your idea, pricing, and revenue model before you invest big.<br />
            <strong className="text-zinc-900">₹999</strong> now can save you lakhs later.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 flex-wrap">
            <Button size="lg" onClick={() => setIsValidatorOpen(true)} className="group w-full sm:w-auto text-base">
              Validate My Business
            </Button>
            <Button
              onClick={() => setIsQuizOpen(true)}
              variant="secondary"
              size="lg"
              className="group w-full sm:w-auto text-base"
            >
              Get Clarity — ₹999
            </Button>
          </div>
        </section>

        {/* Detailed Services Section */}
        <div className="w-full mt-20 md:mt-40">
          <ServicesSection onQuizOpen={() => setIsQuizOpen(true)} />
        </div>

      </main>

      {isQuizOpen && <SparkQuiz onClose={() => setIsQuizOpen(false)} />}
      {isValidatorOpen && <BusinessValidator onClose={() => setIsValidatorOpen(false)} />}
    </div>
  );
}
