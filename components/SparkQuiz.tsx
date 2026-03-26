'use client';

import { useState } from 'react';
import { X, ArrowRight, ArrowLeft, CheckCircle2, Mail, Building2, Briefcase, Calendar, TrendingUp, AlertCircle, FileText, CreditCard } from 'lucide-react';
import { submitOrderAction } from '@/app/actions/submit-order';
import { useRouter } from 'next/navigation';

const steps = [
    { id: 1, title: 'Business Info', description: 'Tell us about your business' },
    { id: 2, title: 'Business Details', description: 'Help us understand your scale' },
    { id: 3, title: 'Schedule Meeting', description: 'Pick a time that works' },
    { id: 4, title: 'Pay & Confirm', description: 'Complete your booking' },
];

export function SparkQuiz({ onClose }: { onClose: () => void }) {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = useState({
        businessName: '',
        businessEmail: '',
        businessType: '' as '' | 'Product' | 'Service',
        vintage: '',
        turnover: '',
        challenge: '',
        details: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateStep1 = () => {
        const e: Record<string, string> = {};
        if (!formData.businessName.trim()) e.businessName = 'Business name is required';
        if (!formData.businessEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail)) e.businessEmail = 'Enter a valid email';
        if (!formData.businessType) e.businessType = 'Please select Product or Service';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const validateStep2 = () => {
        const e: Record<string, string> = {};
        if (!formData.vintage.trim()) e.vintage = 'Business vintage is required';
        if (!formData.turnover.trim()) e.turnover = 'Yearly turnover is required';
        if (!formData.challenge.trim()) e.challenge = 'Please describe your main challenge';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleNext = () => {
        if (step === 1 && validateStep1()) { setErrors({}); setStep(2); }
        else if (step === 2 && validateStep2()) { setErrors({}); setStep(3); }
        else if (step === 3) { setErrors({}); setStep(4); }
    };

    const handleBack = () => { setErrors({}); setStep(s => s - 1); };

    const handlePayment = async () => {
        setIsLoading(true);
        await new Promise(r => setTimeout(r, 1500));
        const fd = new FormData();
        fd.append('fullName', formData.businessName);
        fd.append('email', formData.businessEmail);
        fd.append('phone', '');
        fd.append('serviceName', 'Stage 1: Clarity - Idea Spark');
        fd.append('amount', '999');

        const intakeData = {
            businessName: formData.businessName,
            businessEmail: formData.businessEmail,
            businessType: formData.businessType,
            vintage: formData.vintage,
            turnover: formData.turnover,
            challenge: formData.challenge,
            details: formData.details,
        };

        const result = await submitOrderAction(fd, intakeData);
        if (result.success) { router.push('/success'); }
        else { alert('Something went wrong. Please try again.'); setIsLoading(false); }
    };

    const inputClass = (field: string) =>
        `w-full bg-white/5 border ${errors[field] ? 'border-red-500/70' : 'border-white/10'} rounded-2xl px-4 py-3 md:py-3.5 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400/60 focus:bg-white/8 transition-all duration-200 text-sm`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <div className="w-full max-w-lg bg-[#0d0d0d] rounded-3xl border border-white/8 shadow-2xl flex flex-col max-h-[90dvh] md:max-h-[90vh] overflow-hidden transition-all duration-300">

                {/* Progress Bar */}
                <div className="h-0.5 bg-white/5 flex-shrink-0">
                    <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 ease-out"
                        style={{ width: `${(step / 4) * 100}%` }}
                    />
                </div>

                {/* Header */}
                <div className="flex items-start justify-between px-5 md:px-6 pt-5 md:pt-6 pb-3 md:pb-4 flex-shrink-0">
                    <div>
                        <div className="flex items-center gap-1.5 mb-1.5 md:mb-2">
                            {steps.map((s, i) => (
                                <div key={s.id} className="flex items-center gap-1">
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${step > s.id ? 'bg-cyan-400 text-black' : step === s.id ? 'bg-white text-black' : 'bg-white/10 text-zinc-500'}`}>
                                        {step > s.id ? '✓' : s.id}
                                    </div>
                                    {i < steps.length - 1 && (
                                        <div className={`w-3 md:w-5 h-px transition-all duration-300 ${step > s.id ? 'bg-cyan-400' : 'bg-white/10'}`} />
                                    )}
                                </div>
                            ))}
                        </div>
                        <h2 className="text-base md:text-lg font-bold text-white">{steps[step - 1].title}</h2>
                        <p className="text-zinc-500 text-[10px] md:text-xs mt-0.5">{steps[step - 1].description}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/8 rounded-xl transition-colors text-zinc-500 hover:text-white flex-shrink-0 ml-4"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Body — scrollable */}
                <div className="flex-1 overflow-y-auto px-5 md:px-6 pb-4 scrollbar-thin scrollbar-thumb-white/10">

                    {/* Step 1: Business Info */}
                    {step === 1 && (
                        <div className="space-y-3.5 md:space-y-4">
                            <div>
                                <label className="block text-[10px] md:text-xs font-medium text-zinc-400 mb-1.5 ml-1 flex items-center gap-1.5">
                                    <Building2 size={12} className="text-cyan-400" /> Business Name
                                </label>
                                <div className="relative">
                                    <Building2 size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                                    <input
                                        type="text"
                                        autoFocus
                                        className={`${inputClass('businessName')} pl-10`}
                                        value={formData.businessName}
                                        onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                                        placeholder="e.g. Acme Technologies"
                                    />
                                </div>
                                {errors.businessName && <p className="text-red-400 text-[10px] md:text-xs mt-1.5 ml-1">{errors.businessName}</p>}
                            </div>

                            <div>
                                <label className="block text-[10px] md:text-xs font-medium text-zinc-400 mb-1.5 ml-1 flex items-center gap-1.5">
                                    <Mail size={12} className="text-cyan-400" /> Business Email
                                </label>
                                <div className="relative">
                                    <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                                    <input
                                        type="email"
                                        className={`${inputClass('businessEmail')} pl-10`}
                                        value={formData.businessEmail}
                                        onChange={e => setFormData({ ...formData, businessEmail: e.target.value })}
                                        placeholder="you@company.com"
                                    />
                                </div>
                                {errors.businessEmail && <p className="text-red-400 text-[10px] md:text-xs mt-1.5 ml-1">{errors.businessEmail}</p>}
                            </div>

                            <div>
                                <label className="block text-[10px] md:text-xs font-medium text-zinc-400 mb-1.5 ml-1 flex items-center gap-1.5">
                                    <Briefcase size={12} className="text-cyan-400" /> Type of Business
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {(['Product', 'Service'] as const).map(opt => (
                                        <button
                                            key={opt}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, businessType: opt })}
                                            className={`p-3.5 rounded-2xl border text-sm font-semibold text-center transition-all duration-200 ${formData.businessType === opt ? 'border-cyan-400/60 bg-cyan-400/10 text-cyan-400' : 'border-white/10 bg-white/3 text-zinc-400 hover:border-white/20 hover:text-zinc-300'}`}
                                        >
                                            {opt === 'Product' ? '📦' : '🛠️'} {opt}
                                        </button>
                                    ))}
                                </div>
                                {errors.businessType && <p className="text-red-400 text-[10px] md:text-xs mt-1.5 ml-1">{errors.businessType}</p>}
                            </div>

                            <div className="bg-white/3 border border-white/6 rounded-2xl p-4 mt-2">
                                <p className="text-zinc-400 text-[10px] md:text-xs leading-relaxed">
                                    <span className="text-cyan-400 font-medium">🔒 100% Private.</span> Your business details are only used to personalise your clarity session.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Business Details */}
                    {step === 2 && (
                        <div className="space-y-3.5 md:space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] md:text-xs font-medium text-zinc-400 mb-1.5 ml-1 flex items-center gap-1.5">
                                        <Calendar size={12} className="text-cyan-400" /> Business Vintage
                                    </label>
                                    <input
                                        type="text"
                                        autoFocus
                                        className={inputClass('vintage')}
                                        value={formData.vintage}
                                        onChange={e => setFormData({ ...formData, vintage: e.target.value })}
                                        placeholder="e.g. 3 years, 6 months"
                                    />
                                    {errors.vintage && <p className="text-red-400 text-[10px] md:text-xs mt-1.5 ml-1">{errors.vintage}</p>}
                                </div>
                                <div>
                                    <label className="block text-[10px] md:text-xs font-medium text-zinc-400 mb-1.5 ml-1 flex items-center gap-1.5">
                                        <TrendingUp size={12} className="text-cyan-400" /> Yearly Turnover
                                    </label>
                                    <input
                                        type="text"
                                        className={inputClass('turnover')}
                                        value={formData.turnover}
                                        onChange={e => setFormData({ ...formData, turnover: e.target.value })}
                                        placeholder="e.g. ₹10 Lakh, ₹1 Crore"
                                    />
                                    {errors.turnover && <p className="text-red-400 text-[10px] md:text-xs mt-1.5 ml-1">{errors.turnover}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] md:text-xs font-medium text-zinc-400 mb-1.5 ml-1 flex items-center gap-1.5">
                                    <AlertCircle size={12} className="text-cyan-400" /> Main Challenge
                                </label>
                                <input
                                    type="text"
                                    className={inputClass('challenge')}
                                    value={formData.challenge}
                                    onChange={e => setFormData({ ...formData, challenge: e.target.value })}
                                    placeholder="e.g. Customer acquisition, cash flow, scaling"
                                />
                                {errors.challenge && <p className="text-red-400 text-[10px] md:text-xs mt-1.5 ml-1">{errors.challenge}</p>}
                            </div>

                            <div>
                                <label className="block text-[10px] md:text-xs font-medium text-zinc-400 mb-1.5 ml-1 flex items-center gap-1.5">
                                    <FileText size={12} className="text-cyan-400" /> More Details About Your Business
                                </label>
                                <textarea
                                    rows={3}
                                    className={`${inputClass('details')} resize-none`}
                                    value={formData.details}
                                    onChange={e => setFormData({ ...formData, details: e.target.value })}
                                    placeholder="Share anything that helps us understand your business better..."
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 3: Schedule Meeting (Calendly) */}
                    {step === 3 && (
                        <div className="space-y-4">
                            <div className="text-center pb-2">
                                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                                    Pick a time slot for your <span className="text-cyan-400 font-semibold">30-min 1:1 Clarity Session</span>
                                </p>
                            </div>
                            <div className="w-full rounded-2xl overflow-hidden bg-zinc-900/50 border border-white/8" style={{ height: '380px' }}>
                                <iframe
                                    src="https://calendly.com/nexversestudios/spark-call-clarity-session"
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    className="w-full h-full"
                                    title="Schedule Meeting"
                                />
                            </div>
                            <div className="bg-white/3 border border-white/6 rounded-2xl p-3">
                                <p className="text-zinc-500 text-[10px] md:text-xs leading-relaxed text-center">
                                    💡 You can also schedule later — proceed to payment to lock your slot.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Pay & Confirm */}
                    {step === 4 && (
                        <div className="space-y-4 md:space-y-5">
                            <div className="text-center py-2 md:py-4">
                                <div className="w-12 h-12 md:w-14 md:h-14 bg-cyan-400/15 border border-cyan-400/30 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                                    <CheckCircle2 className="text-cyan-400 w-6 h-6 md:w-7 md:h-7" />
                                </div>
                                <h3 className="text-lg md:text-xl font-bold">You&apos;re almost there!</h3>
                                <p className="text-zinc-400 text-xs md:text-sm mt-1.5 max-w-xs mx-auto leading-relaxed">
                                    Complete the ₹999 payment to confirm your clarity session.
                                </p>
                            </div>

                            {/* Summary Card */}
                            <div className="bg-white/4 border border-white/8 rounded-2xl divide-y divide-white/6 text-xs md:text-sm overflow-hidden">
                                <div className="flex justify-between px-4 py-2.5 md:py-3">
                                    <span className="text-zinc-400">Business</span>
                                    <span className="text-white font-medium">{formData.businessName}</span>
                                </div>
                                <div className="flex justify-between px-4 py-2.5 md:py-3">
                                    <span className="text-zinc-400">Type</span>
                                    <span className="text-white font-medium">{formData.businessType}</span>
                                </div>
                                <div className="flex justify-between px-4 py-2.5 md:py-3">
                                    <span className="text-zinc-400">Turnover</span>
                                    <span className="text-white font-medium">{formData.turnover}</span>
                                </div>
                                <div className="flex justify-between px-4 py-2.5 md:py-3">
                                    <span className="text-zinc-400">Challenge</span>
                                    <span className="text-white font-medium truncate ml-4">{formData.challenge}</span>
                                </div>
                            </div>

                            {/* Order Total */}
                            <div className="bg-gradient-to-r from-cyan-400/10 to-blue-500/10 border border-cyan-400/20 rounded-2xl px-4 py-3 md:py-4 flex justify-between items-center">
                                <div>
                                    <div className="text-xs md:text-sm font-semibold text-white">Stage 1: Clarity Session</div>
                                    <div className="text-[10px] md:text-xs text-zinc-400 mt-0.5">30-min 1:1 Session</div>
                                </div>
                                <div className="text-xl md:text-2xl font-extrabold text-cyan-400">₹999</div>
                            </div>

                            <p className="text-center text-zinc-600 text-[10px]">
                                🔒 Secure payment · 100% satisfaction
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-5 md:px-6 py-4 border-t border-white/6 flex gap-2 md:gap-3 flex-shrink-0 bg-[#0d0d0d]">
                    {step > 1 && (
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 px-3.5 py-2.5 md:px-4 md:py-3 rounded-2xl border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all text-sm font-medium"
                        >
                            <ArrowLeft size={15} className="md:block hidden" /> Back
                        </button>
                    )}

                    {step < 4 ? (
                        <button
                            onClick={handleNext}
                            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white text-black text-sm font-semibold hover:bg-zinc-100 active:scale-95 transition-all duration-200"
                        >
                            {step === 3 ? 'Proceed to Payment' : 'Continue'} <ArrowRight size={15} />
                        </button>
                    ) : (
                        <button
                            onClick={handlePayment}
                            disabled={isLoading}
                            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black text-sm font-bold hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none"
                        >
                            {isLoading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    Processing…
                                </>
                            ) : (
                                <><CreditCard size={16} /> Pay ₹999 &amp; Confirm</>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
