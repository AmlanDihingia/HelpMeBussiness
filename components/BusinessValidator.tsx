'use client';

import { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, CheckCircle2, User, Mail, Phone, Briefcase, Calendar, Activity, Sparkles } from 'lucide-react';
import { submitValidatorAction, ValidatorData } from '@/app/actions/submit-validator';

// ─── Phase config (maps to the 3 step-circle indicators) ──────────────────────
const PHASES = [
    { id: 1, label: 'Business Profile' },
    { id: 2, label: 'Operations' },
    { id: 3, label: 'Your Report' },
];

function getActivePhase(step: number): number {
    if (step >= 1 && step <= 5) return 1;
    if (step >= 6 && step <= 10) return 2;
    if (step >= 11) return 3;
    return 0;
}

// ─── Step meta ─────────────────────────────────────────────────────────────────
const STEP_META: Record<number, { title: string; subtitle: string }> = {
    1:  { title: 'Business Info',         subtitle: 'Tell us about your business' },
    2:  { title: 'Location',              subtitle: 'Where is your business based?' },
    3:  { title: 'Monthly Revenue',       subtitle: "What's your current monthly revenue?" },
    4:  { title: 'Monthly Customers',     subtitle: 'Approximate customers you serve per month' },
    5:  { title: 'Revenue Concentration', subtitle: 'How distributed is your revenue?' },
    6:  { title: 'Buying Pattern',        subtitle: 'How do customers usually buy from you?' },
    7:  { title: 'Repeat Customers',      subtitle: 'How often do customers come back?' },
    8:  { title: 'Customer Source',       subtitle: 'Where do most of your customers come from?' },
    9:  { title: 'Follow-up System',      subtitle: 'What happens after someone shows interest?' },
    10: { title: 'Drop-off Tracking',     subtitle: 'Do you track where customers drop off?' },
    12: { title: 'Analysis Complete',     subtitle: 'Enter your details to receive your business report' },
};

export function BusinessValidator({ onClose }: { onClose: () => void }) {
    const [step, setStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [loadingText, setLoadingText] = useState('Mapping your revenue structure...');

    const [formData, setFormData] = useState<ValidatorData>({
        businessType: '',
        customBusinessDescription: '',
        location: '',
        monthlyRevenue: '',
        monthlyCustomers: '',
        revenueConcentration: '',
        buyingPattern: '',
        repeatCustomers: '',
        customerSource: '',
        followUpSystem: '',
        tracking: '',
        fullName: '',
        designation: '',
        email: '',
        phone: '',
        businessVintage: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    // Loading animation for step 11
    useEffect(() => {
        if (step === 11) {
            const texts = [
                'Mapping your revenue structure...',
                'Identifying conversion gaps...',
                'Checking system dependencies...',
            ];
            let i = 0;
            const interval = setInterval(() => {
                i = (i + 1) % texts.length;
                setLoadingText(texts[i]);
            }, 1000);
            const timer = setTimeout(() => { clearInterval(interval); setStep(12); }, 3000);
            return () => { clearInterval(interval); clearTimeout(timer); };
        }
    }, [step]);

    // ─── Handlers ────────────────────────────────────────────────────────────
    const handleSelect = (field: keyof ValidatorData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Auto-advance for option steps (not text inputs)
        if (step !== 1 || (field !== 'customBusinessDescription')) {
            setTimeout(() => setStep(s => s + 1), 180);
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(s => s - 1);
    };

    const validateFinalStep = () => {
        const e: Record<string, string> = {};
        if (!formData.fullName.trim()) e.fullName = 'Required';
        if (!formData.designation.trim()) e.designation = 'Required';
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Valid email required';
        if (!formData.businessVintage) e.businessVintage = 'Required';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateFinalStep()) return;
        setIsLoading(true);
        setSubmitError(null);
        try {
            const result = await submitValidatorAction(formData);
            if (result.success) setIsSuccess(true);
            else setSubmitError(result.error || 'Something went wrong. Please try again.');
        } catch (err: any) {
            setSubmitError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // ─── Styles ───────────────────────────────────────────────────────────────
    const inputClass = (field: string) =>
        `w-full bg-white border ${errors[field] ? 'border-red-400' : 'border-zinc-200'} rounded-xl px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 text-sm`;

    const labelClass = 'block text-xs font-semibold text-cyan-600 mb-1.5 ml-0.5 flex items-center gap-1.5';

    // ─── Option button (select + auto-advance) ────────────────────────────────
    const OptionButton = ({ label, field, value, noAutoAdvance }: {
        label: string;
        field: keyof ValidatorData;
        value?: string;
        noAutoAdvance?: boolean;
    }) => {
        const val = value ?? label;
        const isSelected = formData[field] === val;
        return (
            <button
                onClick={() => {
                    setFormData(prev => ({ ...prev, [field]: val }));
                    if (!noAutoAdvance) setTimeout(() => setStep(s => s + 1), 180);
                }}
                className={`w-full text-left px-5 py-4 rounded-xl border-2 font-medium text-sm transition-all duration-200 ${
                    isSelected
                        ? 'border-cyan-400 bg-cyan-50 text-cyan-900 shadow-sm'
                        : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50'
                }`}
            >
                {label}
            </button>
        );
    };

    // ─── Success screen ───────────────────────────────────────────────────────
    if (isSuccess) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                <div className="w-full max-w-md bg-white rounded-3xl border border-zinc-200 shadow-2xl p-8 text-center relative animate-in zoom-in-95 fade-in duration-300">
                    <button onClick={onClose} className="absolute right-5 top-5 p-1.5 text-zinc-400 hover:text-zinc-700 rounded-lg hover:bg-zinc-100 transition-all"><X size={18} /></button>
                    <div className="w-16 h-16 bg-cyan-50 border border-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                        <CheckCircle2 className="text-cyan-500 w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-900 mb-2">Report Sent!</h2>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-7">
                        Your validation report is on its way to your inbox. Our experts will review your responses and reach out shortly.
                    </p>
                    <button onClick={onClose} className="w-full py-3.5 rounded-xl bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 active:scale-95 transition-all duration-200">
                        Return to site
                    </button>
                </div>
            </div>
        );
    }

    // ─── Step header (phase circles) ──────────────────────────────────────────
    const activePhase = getActivePhase(step);
    const meta = STEP_META[step];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-lg bg-white rounded-3xl border border-zinc-200 shadow-2xl flex flex-col max-h-[92dvh] overflow-hidden animate-in zoom-in-95 fade-in duration-300">

                {/* ── Gradient accent line ── */}
                {step > 0 && step !== 11 && (
                    <div className="h-[3px] w-full bg-gradient-to-r from-violet-500 via-cyan-400 to-blue-500 flex-shrink-0" />
                )}

                {/* ── Header ── */}
                {step === 0 || step === 11 ? null : (
                    <div className="px-6 pt-5 pb-3 flex-shrink-0">
                        {/* Close */}
                        <button
                            onClick={onClose}
                            className="absolute right-5 top-5 p-1.5 text-zinc-400 hover:text-zinc-700 rounded-lg hover:bg-zinc-100 transition-all z-10"
                        >
                            <X size={18} />
                        </button>

                        {/* Phase step indicators */}
                        <div className="flex items-center gap-1 mb-4">
                            {PHASES.map((phase, i) => (
                                <div key={phase.id} className="flex items-center gap-1">
                                    {/* Circle — no numbers, just dot indicators */}
                                    <div className={`rounded-full transition-all duration-300 ${
                                        activePhase > phase.id
                                            ? 'w-2.5 h-2.5 bg-cyan-500'
                                            : activePhase === phase.id
                                                ? 'w-3 h-3 bg-zinc-900 ring-4 ring-zinc-900/10'
                                                : 'w-2.5 h-2.5 bg-zinc-200'
                                    }`} />
                                    {/* Connecting line */}
                                    {i < PHASES.length - 1 && (
                                        <div className={`flex-1 h-px w-10 transition-all duration-500 ${activePhase > phase.id ? 'bg-cyan-400' : 'bg-zinc-200'}`} />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Title + subtitle */}
                        {meta && (
                            <div>
                                <h2 className="text-lg font-bold text-zinc-900 leading-snug">{meta.title}</h2>
                                <p className="text-sm text-zinc-500 mt-0.5">{meta.subtitle}</p>
                            </div>
                        )}
                    </div>
                )}

                {/* ── Scrollable body ── */}
                <div className="flex-1 overflow-y-auto px-6 pb-4 scrollbar-thin">

                    {/* SCREEN 0 — entry */}
                    {step === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-5 py-10">
                            <button onClick={onClose} className="absolute right-5 top-5 p-1.5 text-zinc-400 hover:text-zinc-700 rounded-lg hover:bg-zinc-100 transition-all"><X size={18} /></button>
                            <div className="w-14 h-14 bg-zinc-50 border border-zinc-200 rounded-2xl flex items-center justify-center">
                                <Activity className="w-7 h-7 text-cyan-500" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-zinc-900 leading-tight">
                                    Let&apos;s understand your<br />business
                                </h2>
                                <p className="text-zinc-500 text-sm mt-2">A brief professional assessment to tailor our solutions.</p>
                            </div>
                            <button
                                onClick={() => setStep(1)}
                                className="mt-4 w-full max-w-xs py-3.5 flex items-center justify-center gap-2 rounded-xl bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 active:scale-95 transition-all duration-200 shadow-sm"
                            >
                                Start Analysis <ArrowRight size={16} />
                            </button>
                        </div>
                    )}

                    {/* SCREEN 1 — type of business */}
                    {step === 1 && (
                        <div className="space-y-2.5 pt-3 animate-in slide-in-from-right-4 fade-in duration-200">
                            <OptionButton label="D2C / Brand"     field="businessType" />
                            <OptionButton label="Retail"          field="businessType" />
                            <OptionButton label="Hospitality"     field="businessType" />
                            <OptionButton label="B2B / Services"  field="businessType" />
                            <OptionButton label="Other"           field="businessType" value="Other" noAutoAdvance />
                            {formData.businessType === 'Other' && (
                                <div className="pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <label className={labelClass}>Describe your business</label>
                                    <input
                                        type="text"
                                        autoFocus
                                        className={inputClass('customBusinessDescription')}
                                        value={formData.customBusinessDescription}
                                        onChange={e => setFormData({ ...formData, customBusinessDescription: e.target.value })}
                                        placeholder="e.g. Real Estate Tech"
                                        onKeyDown={e => e.key === 'Enter' && formData.customBusinessDescription.trim() && setStep(2)}
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {/* SCREEN 2 — location */}
                    {step === 2 && (
                        <div className="pt-3 animate-in slide-in-from-right-4 fade-in duration-200">
                            <label className={labelClass}>
                                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                City or Region
                            </label>
                            <input
                                type="text"
                                autoFocus
                                className={inputClass('location')}
                                value={formData.location}
                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                                placeholder="e.g. Mumbai, Delhi, Bangalore"
                                onKeyDown={e => e.key === 'Enter' && formData.location.trim() && setStep(3)}
                            />
                        </div>
                    )}

                    {/* SCREEN 3 — monthly revenue */}
                    {step === 3 && (
                        <div className="space-y-2.5 pt-3 animate-in slide-in-from-right-4 fade-in duration-200">
                            <OptionButton label="Under ₹5L"   field="monthlyRevenue" />
                            <OptionButton label="₹5L–₹15L"   field="monthlyRevenue" />
                            <OptionButton label="₹15L–₹30L"  field="monthlyRevenue" />
                            <OptionButton label="₹30L–₹50L"  field="monthlyRevenue" />
                            <OptionButton label="₹50L+"       field="monthlyRevenue" />
                        </div>
                    )}

                    {/* SCREEN 4 — monthly customers */}
                    {step === 4 && (
                        <div className="space-y-2.5 pt-3 animate-in slide-in-from-right-4 fade-in duration-200">
                            <OptionButton label="Under 100"  field="monthlyCustomers" />
                            <OptionButton label="100–500"    field="monthlyCustomers" />
                            <OptionButton label="500–1000"   field="monthlyCustomers" />
                            <OptionButton label="1000+"      field="monthlyCustomers" />
                        </div>
                    )}

                    {/* SCREEN 5 — revenue concentration */}
                    {step === 5 && (
                        <div className="space-y-2.5 pt-3 animate-in slide-in-from-right-4 fade-in duration-200">
                            <OptionButton label="Less than 30%"  field="revenueConcentration" />
                            <OptionButton label="30–60%"         field="revenueConcentration" />
                            <OptionButton label="60–80%"         field="revenueConcentration" />
                            <OptionButton label="80%+"           field="revenueConcentration" />
                        </div>
                    )}

                    {/* SCREEN 6 — buying pattern */}
                    {step === 6 && (
                        <div className="space-y-2.5 pt-3 animate-in slide-in-from-right-4 fade-in duration-200">
                            <OptionButton label="Single purchase"  field="buyingPattern" />
                            <OptionButton label="Bundles / combos" field="buyingPattern" />
                            <OptionButton label="Custom pricing"   field="buyingPattern" />
                            <OptionButton label="Not structured"   field="buyingPattern" />
                        </div>
                    )}

                    {/* SCREEN 7 — repeat customers */}
                    {step === 7 && (
                        <div className="space-y-2.5 pt-3 animate-in slide-in-from-right-4 fade-in duration-200">
                            <OptionButton label="Frequently"   field="repeatCustomers" />
                            <OptionButton label="Sometimes"    field="repeatCustomers" />
                            <OptionButton label="Rarely"       field="repeatCustomers" />
                            <OptionButton label="Not tracked"  field="repeatCustomers" />
                        </div>
                    )}

                    {/* SCREEN 8 — customer source */}
                    {step === 8 && (
                        <div className="space-y-2.5 pt-3 animate-in slide-in-from-right-4 fade-in duration-200">
                            <OptionButton label="Instagram"    field="customerSource" />
                            <OptionButton label="Ads"          field="customerSource" />
                            <OptionButton label="Walk-ins"     field="customerSource" />
                            <OptionButton label="Referrals"    field="customerSource" />
                            <OptionButton label="Marketplace"  field="customerSource" />
                            <OptionButton label="Mix"          field="customerSource" />
                        </div>
                    )}

                    {/* SCREEN 9 — follow-up system */}
                    {step === 9 && (
                        <div className="space-y-2.5 pt-3 animate-in slide-in-from-right-4 fade-in duration-200">
                            <OptionButton label="Structured follow-up" field="followUpSystem" />
                            <OptionButton label="Manual follow-up"     field="followUpSystem" />
                            <OptionButton label="Depends on team"      field="followUpSystem" />
                            <OptionButton label="No clear process"     field="followUpSystem" />
                        </div>
                    )}

                    {/* SCREEN 10 — tracking */}
                    {step === 10 && (
                        <div className="space-y-2.5 pt-3 animate-in slide-in-from-right-4 fade-in duration-200">
                            <OptionButton label="Yes (clearly)" field="tracking" />
                            <OptionButton label="Somewhat"      field="tracking" />
                            <OptionButton label="No"            field="tracking" />
                        </div>
                    )}

                    {/* SCREEN 11 — analyzing */}
                    {step === 11 && (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-16">
                            <div className="relative w-20 h-20">
                                <svg className="w-full h-full animate-spin text-cyan-500" viewBox="0 0 100 100">
                                    <circle className="opacity-10" cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" />
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="283" strokeDashoffset="75" strokeLinecap="round" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-zinc-900 mb-3">Analysing your business…</h2>
                                <p className="text-cyan-600 font-medium text-sm">{loadingText}</p>
                            </div>
                            <p className="text-zinc-400 text-xs">We&apos;ve identified key patterns in your business.</p>
                        </div>
                    )}

                    {/* SCREEN 12 — contact form */}
                    {step === 12 && (
                        <div className="space-y-4 pt-3 pb-2 animate-in slide-in-from-bottom-4 fade-in duration-300">
                            {/* Icon */}
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-cyan-50 border border-cyan-100 rounded-xl flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-cyan-500" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className={labelClass}><User size={11} /> Full Name</label>
                                    <input type="text" className={inputClass('fullName')} value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} placeholder="John Doe" />
                                    {errors.fullName && <p className="text-red-400 text-xs mt-1 ml-0.5">{errors.fullName}</p>}
                                </div>
                                <div>
                                    <label className={labelClass}><Briefcase size={11} /> Designation</label>
                                    <input type="text" className={inputClass('designation')} value={formData.designation} onChange={e => setFormData({ ...formData, designation: e.target.value })} placeholder="Founder / CEO" />
                                    {errors.designation && <p className="text-red-400 text-xs mt-1 ml-0.5">{errors.designation}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className={labelClass}><Mail size={11} /> Email</label>
                                    <input type="email" className={inputClass('email')} value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com" />
                                    {errors.email && <p className="text-red-400 text-xs mt-1 ml-0.5">{errors.email}</p>}
                                </div>
                                <div>
                                    <label className={labelClass}><Phone size={11} /> Phone (Optional)</label>
                                    <input type="tel" className={inputClass('phone')} value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 99999 99999" />
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}><Calendar size={11} /> Business Vintage</label>
                                <select
                                    className={`${inputClass('businessVintage')} appearance-none cursor-pointer`}
                                    value={formData.businessVintage}
                                    onChange={e => setFormData({ ...formData, businessVintage: e.target.value })}
                                >
                                    <option value="" disabled>Select vintage…</option>
                                    <option value="Idea">Idea</option>
                                    <option value="Less than 6 months">Less than 6 months</option>
                                    <option value="6–12 months">6–12 months</option>
                                    <option value="1–3 years">1–3 years</option>
                                    <option value="3+ years">3+ years</option>
                                </select>
                                {errors.businessVintage && <p className="text-red-400 text-xs mt-1 ml-0.5">{errors.businessVintage}</p>}
                            </div>

                            {/* Privacy note */}
                            <div className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 flex items-start gap-2.5">
                                <svg className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                <p className="text-xs text-zinc-500 leading-relaxed">
                                    <span className="font-semibold text-cyan-600">100% Private.</span> Your details are only used to send your personalised report.
                                </p>
                            </div>

                            {submitError && (
                                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-xs text-red-600">
                                    <strong>⚠ Error:</strong> {submitError}
                                </div>
                            )}
                        </div>
                    )}

                </div>

                {/* ── Footer ── */}
                {(step >= 1 && step <= 10) || step === 12 ? (
                    <div className="px-6 py-4 border-t border-zinc-100 flex gap-2.5 flex-shrink-0">
                        {/* Back button */}
                        {step > 1 && (
                            <button
                                onClick={handleBack}
                                className="flex items-center gap-1.5 px-4 py-3 rounded-xl border border-zinc-200 text-zinc-600 text-sm font-medium hover:bg-zinc-50 hover:text-zinc-900 active:scale-95 transition-all duration-200"
                            >
                                <ArrowLeft size={15} /> Back
                            </button>
                        )}

                        {/* Continue / Submit */}
                        {step === 12 ? (
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-900 text-white text-sm font-bold hover:bg-zinc-800 active:scale-95 transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none shadow-sm"
                            >
                                {isLoading ? (
                                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing…</>
                                ) : (
                                    <>Get My Report <ArrowRight size={15} /></>
                                )}
                            </button>
                        ) : (
                            /* Continue button for steps that need explicit advance (location + custom biz) */
                            (step === 2 || (step === 1 && formData.businessType === 'Other')) ? (
                                <button
                                    onClick={() => setStep(s => s + 1)}
                                    disabled={step === 2 ? !formData.location.trim() : !formData.customBusinessDescription.trim()}
                                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none shadow-sm"
                                >
                                    Continue <ArrowRight size={15} />
                                </button>
                            ) : null
                        )}
                    </div>
                ) : null}

            </div>
        </div>
    );
}
