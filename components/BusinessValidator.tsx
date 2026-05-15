'use client';

import { useState, useEffect } from 'react';
import { X, ArrowRight, CheckCircle2, User, Mail, Phone, Briefcase, Calendar } from 'lucide-react';
import { submitValidatorAction, ValidatorData } from '@/app/actions/submit-validator';

const SCROLL_TO_TOP = () => {
    // Optional utility to scroll within modal if needed
};

export function BusinessValidator({ onClose }: { onClose: () => void }) {
    const [step, setStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

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
        businessVintage: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    // Animation for Step 11
    const [loadingText, setLoadingText] = useState('Mapping your revenue structure');
    useEffect(() => {
        if (step === 11) {
            const texts = [
                'Mapping your revenue structure...',
                'Identifying conversion gaps...',
                'Checking system dependencies...'
            ];
            let i = 0;
            const interval = setInterval(() => {
                i = (i + 1) % texts.length;
                setLoadingText(texts[i]);
            }, 1000);

            const timer = setTimeout(() => {
                clearInterval(interval);
                setStep(12);
            }, 3000);

            return () => {
                clearInterval(interval);
                clearTimeout(timer);
            };
        }
    }, [step]);

    const handleSelect = (field: keyof ValidatorData, value: string, nextStep: boolean = true) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (nextStep) {
            setTimeout(() => setStep(s => s + 1), 150); // slight delay for visual feedback
        }
    };

    const validateFinalStep = () => {
        const e: Record<string, string> = {};
        if (!formData.fullName.trim()) e.fullName = 'Required';
        if (!formData.designation.trim()) e.designation = 'Required';
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Valid email required';
        if (!formData.businessVintage.trim()) e.businessVintage = 'Required';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateFinalStep()) return;

        setIsLoading(true);
        setSubmitError(null);

        try {
            const result = await submitValidatorAction(formData);

            if (result.success) {
                setIsSuccess(true);
            } else {
                setSubmitError(result.error || 'Something went wrong. Please try again.');
            }
        } catch (err: any) {
            console.error('[HMB] Submission failed:', err);
            let friendlyError = err.message || 'Something went wrong. Please try again.';
            if (friendlyError.includes('fetch') || (err.message && err.message.includes('fetch'))) {
                friendlyError = "Network error: The server could not reach Supabase. This should work in production if environment variables are set.";
            }
            setSubmitError(friendlyError);
        } finally {
            setIsLoading(false);
        }
    };

    const inputClass = (field: string) =>
        `w-full bg-white border ${errors[field] ? 'border-red-500' : 'border-zinc-300'} rounded-2xl px-4 py-3 md:py-3.5 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 text-sm shadow-sm`;

    const labelClass = "block text-xs font-medium text-zinc-600 mb-1.5 ml-1 flex items-center gap-1.5";

    if (isSuccess) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
                <div className="w-full max-w-md bg-white rounded-3xl border border-zinc-200 shadow-xl p-6 md:p-8 text-center relative">
                    <button onClick={onClose} className="absolute right-6 top-6 text-zinc-400 hover:text-zinc-700"><X size={20} /></button>
                    <div className="w-16 h-16 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="text-blue-500 w-8 h-8" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-2">Report Sent!</h2>
                    <p className="text-zinc-600 text-sm leading-relaxed mb-6 md:mb-8">
                        Thank you for sharing your business details. Your validation report is on its way to your inbox. Our experts will review your responses and reach out shortly.
                    </p>
                    <button onClick={onClose} className="w-full py-3.5 rounded-2xl bg-zinc-900 text-white shadow-lg shadow-zinc-900/20 text-sm font-semibold hover:bg-zinc-800 transition-all">
                        Return to site
                    </button>
                </div>
            </div>
        );
    }

    const OptionButton = ({ label, field, value }: { label: string, field: keyof ValidatorData, value?: string }) => {
        const val = value || label;
        const isSelected = formData[field] === val;
        return (
            <button
                onClick={() => handleSelect(field, val)}
                className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-200 font-medium text-sm md:text-base ${
                    isSelected 
                    ? 'border-blue-500 bg-blue-50 text-blue-900 shadow-sm' 
                    : 'border-zinc-200 bg-white text-zinc-700 hover:border-blue-200 hover:bg-blue-50/50'
                }`}
            >
                {label}
            </button>
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-md">
            <div className="w-full max-w-lg bg-white rounded-3xl border border-zinc-200 shadow-xl flex flex-col max-h-[90dvh] md:max-h-[85vh] overflow-hidden transition-all duration-300 relative">
                
                {/* Close Button */}
                {(step < 11 || step === 12) && (
                    <button onClick={onClose} className="absolute right-5 top-5 p-2 z-10 bg-white rounded-full hover:bg-zinc-100 transition-colors text-zinc-400 hover:text-zinc-700 shadow-sm border border-zinc-100">
                        <X size={18} />
                    </button>
                )}

                {/* Progress Indicator (Steps 1-10) */}
                {step > 0 && step <= 10 && (
                    <div className="pt-6 px-6 pb-2">
                        <p className="text-center text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                            Step {step} of 10
                        </p>
                        <div className="h-1 bg-zinc-100 rounded-full mt-3 overflow-hidden">
                        <div className="h-full bg-blue-500 transition-all duration-300 ease-out" style={{ width: `${(step / 10) * 100}%` }} />
                        </div>
                    </div>
                )}

                {/* Body Content */}
                <div className="flex-1 overflow-y-auto px-6 py-6 md:py-8 scrollbar-hide">
                    
                    {/* SCREEN 0 - ENTRY */}
                    {step === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-6 pt-8">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-2">
                                <span className="text-2xl">📊</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight leading-tight">
                                Let’s understand your business.
                            </h2>
                            <p className="text-zinc-500 text-lg">
                                Takes ~2 minutes. No fluff.
                            </p>
                            <div className="pt-8 w-full max-w-xs">
                                <button onClick={() => setStep(1)} className="w-full py-4 rounded-2xl bg-zinc-900 text-white shadow-lg shadow-zinc-900/20 text-base font-semibold hover:bg-zinc-800 hover:scale-[1.02] active:scale-95 transition-all duration-200">
                                    👉 Start Analysis
                                </button>
                            </div>
                        </div>
                    )}

                    {/* SCREEN 1 - TYPE OF BUSINESS */}
                    {step === 1 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                            <h2 className="text-2xl font-bold text-zinc-900">What kind of business are you running?</h2>
                            <div className="space-y-3">
                                <OptionButton label="D2C / Brand" field="businessType" />
                                <OptionButton label="Retail" field="businessType" />
                                <OptionButton label="Hospitality" field="businessType" />
                                <OptionButton label="B2B / Services" field="businessType" />
                                <OptionButton label="Other" field="businessType" value="Other" />
                            </div>
                            {formData.businessType === 'Other' && (
                                <div className="pt-2 space-y-3 animate-in fade-in slide-in-from-top-2">
                                    <label className="block text-sm font-medium text-zinc-700">Briefly describe your business:</label>
                                    <input 
                                        type="text" 
                                        autoFocus
                                        className={inputClass('customBusinessDescription')} 
                                        value={formData.customBusinessDescription} 
                                        onChange={e => setFormData({ ...formData, customBusinessDescription: e.target.value })} 
                                        placeholder="e.g. Real Estate Tech" 
                                    />
                                    <button onClick={() => setStep(2)} className="w-full py-3.5 rounded-2xl bg-blue-600 text-white font-semibold">Continue →</button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* SCREEN 2 - LOCATION */}
                    {step === 2 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300 h-full flex flex-col justify-center">
                            <h2 className="text-2xl font-bold text-zinc-900 mb-2">Where is your business based?</h2>
                            <input 
                                type="text" 
                                autoFocus
                                className="w-full text-2xl bg-transparent border-b-2 border-zinc-200 px-2 py-4 focus:outline-none focus:border-blue-500 transition-colors placeholder-zinc-300"
                                value={formData.location} 
                                onChange={e => setFormData({ ...formData, location: e.target.value })} 
                                placeholder="City or Region" 
                                onKeyDown={e => e.key === 'Enter' && formData.location && setStep(3)}
                            />
                            <div className="pt-6">
                                <button disabled={!formData.location} onClick={() => setStep(3)} className="w-full py-4 rounded-2xl bg-zinc-900 text-white font-semibold disabled:opacity-50 transition-all">
                                    Next
                                </button>
                            </div>
                        </div>
                    )}

                    {/* SCREEN 3 - MONTHLY REVENUE */}
                    {step === 3 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                            <h2 className="text-2xl font-bold text-zinc-900">What’s your current monthly revenue?</h2>
                            <div className="space-y-3">
                                <OptionButton label="Under ₹5L" field="monthlyRevenue" />
                                <OptionButton label="₹5L–₹15L" field="monthlyRevenue" />
                                <OptionButton label="₹15L–₹30L" field="monthlyRevenue" />
                                <OptionButton label="₹30L–₹50L" field="monthlyRevenue" />
                                <OptionButton label="₹50L+" field="monthlyRevenue" />
                            </div>
                        </div>
                    )}

                    {/* SCREEN 4 - MONTHLY CUSTOMERS */}
                    {step === 4 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                            <h2 className="text-2xl font-bold text-zinc-900">How many customers do you serve monthly?</h2>
                            <p className="text-zinc-500 mt-[-16px] text-sm">(approximate)</p>
                            <div className="space-y-3">
                                <OptionButton label="Under 100" field="monthlyCustomers" />
                                <OptionButton label="100–500" field="monthlyCustomers" />
                                <OptionButton label="500–1000" field="monthlyCustomers" />
                                <OptionButton label="1000+" field="monthlyCustomers" />
                            </div>
                        </div>
                    )}

                    {/* SCREEN 5 - REVENUE CONCENTRATION */}
                    {step === 5 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                            <h2 className="text-2xl font-bold text-zinc-900">How much of your revenue comes from a few products/services?</h2>
                            <div className="space-y-3">
                                <OptionButton label="Less than 30%" field="revenueConcentration" />
                                <OptionButton label="30–60%" field="revenueConcentration" />
                                <OptionButton label="60–80%" field="revenueConcentration" />
                                <OptionButton label="80%+" field="revenueConcentration" />
                            </div>
                        </div>
                    )}

                    {/* SCREEN 6 - BUYING PATTERN */}
                    {step === 6 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                            <h2 className="text-2xl font-bold text-zinc-900">How do customers usually buy from you?</h2>
                            <div className="space-y-3">
                                <OptionButton label="Single purchase" field="buyingPattern" />
                                <OptionButton label="Bundles / combos" field="buyingPattern" />
                                <OptionButton label="Custom pricing" field="buyingPattern" />
                                <OptionButton label="Not structured" field="buyingPattern" />
                            </div>
                        </div>
                    )}

                    {/* SCREEN 7 - REPEAT CUSTOMERS */}
                    {step === 7 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                            <h2 className="text-2xl font-bold text-zinc-900">How often do customers come back?</h2>
                            <div className="space-y-3">
                                <OptionButton label="Frequently" field="repeatCustomers" />
                                <OptionButton label="Sometimes" field="repeatCustomers" />
                                <OptionButton label="Rarely" field="repeatCustomers" />
                                <OptionButton label="Not tracked" field="repeatCustomers" />
                            </div>
                        </div>
                    )}

                    {/* SCREEN 8 - CUSTOMER SOURCE */}
                    {step === 8 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                            <h2 className="text-2xl font-bold text-zinc-900">Where do most of your customers come from?</h2>
                            <div className="space-y-3">
                                <OptionButton label="Instagram" field="customerSource" />
                                <OptionButton label="Ads" field="customerSource" />
                                <OptionButton label="Walk-ins" field="customerSource" />
                                <OptionButton label="Referrals" field="customerSource" />
                                <OptionButton label="Marketplace" field="customerSource" />
                                <OptionButton label="Mix" field="customerSource" />
                            </div>
                        </div>
                    )}

                    {/* SCREEN 9 - FOLLOW-UP SYSTEM */}
                    {step === 9 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                            <h2 className="text-2xl font-bold text-zinc-900">What happens after someone shows interest?</h2>
                            <div className="space-y-3">
                                <OptionButton label="Structured follow-up" field="followUpSystem" />
                                <OptionButton label="Manual follow-up" field="followUpSystem" />
                                <OptionButton label="Depends on team" field="followUpSystem" />
                                <OptionButton label="No clear process" field="followUpSystem" />
                            </div>
                        </div>
                    )}

                    {/* SCREEN 10 - TRACKING */}
                    {step === 10 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                            <h2 className="text-2xl font-bold text-zinc-900">Do you track where customers drop off?</h2>
                            <div className="space-y-3">
                                <OptionButton label="Yes (clearly)" field="tracking" />
                                <OptionButton label="Somewhat" field="tracking" />
                                <OptionButton label="No" field="tracking" />
                            </div>
                        </div>
                    )}

                    {/* SCREEN 11 - ANALYSIS */}
                    {step === 11 && (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-8 py-12">
                            <div className="relative w-24 h-24">
                                <svg className="w-full h-full animate-spin text-blue-500" viewBox="0 0 100 100">
                                    <circle className="opacity-20" cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" />
                                    <circle className="opacity-100" cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="283" strokeDashoffset="75" strokeLinecap="round" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-zinc-900 mb-4">Analyzing your business…</h2>
                                <div className="h-8">
                                    <p className="text-blue-600 font-medium text-lg animate-in fade-in slide-in-from-bottom-2 key={loadingText}">{loadingText}</p>
                                </div>
                            </div>
                            <p className="text-zinc-500 text-sm mt-8">We’ve identified key patterns in your business.</p>
                        </div>
                    )}

                    {/* SCREEN 12 - REPORT UNLOCK */}
                    {step === 12 && (
                        <div className="space-y-6 animate-in slide-in-from-bottom-8 fade-in duration-500 py-2">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🎉</span>
                                </div>
                                <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Your report is ready.</h2>
                                <p className="text-zinc-500 mt-2">Enter your details to receive your business validation report.</p>
                            </div>

                            <div className="space-y-4 bg-zinc-50/50 p-1 rounded-3xl">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}><User size={12} className="text-blue-500" /> Full Name</label>
                                        <input type="text" className={inputClass('fullName')} value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} placeholder="John Doe" />
                                        {errors.fullName && <p className="text-red-400 text-xs mt-1 ml-1">{errors.fullName}</p>}
                                    </div>
                                    <div>
                                        <label className={labelClass}><Briefcase size={12} className="text-blue-500" /> Designation</label>
                                        <input type="text" className={inputClass('designation')} value={formData.designation} onChange={e => setFormData({ ...formData, designation: e.target.value })} placeholder="Founder / CEO" />
                                        {errors.designation && <p className="text-red-400 text-xs mt-1 ml-1">{errors.designation}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}><Mail size={12} className="text-blue-500" /> Email</label>
                                        <input type="email" className={inputClass('email')} value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com" />
                                        {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <label className={labelClass}><Phone size={12} className="text-blue-500" /> Phone (Optional)</label>
                                        <input type="tel" className={inputClass('phone')} value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 99999 99999" />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}><Calendar size={12} className="text-blue-500" /> Business Vintage</label>
                                    <select className={`${inputClass('businessVintage')} appearance-none`} value={formData.businessVintage} onChange={e => setFormData({ ...formData, businessVintage: e.target.value })}>
                                        <option value="" disabled>Select vintage...</option>
                                        <option value="Idea">Idea</option>
                                        <option value="Less than 6 months">Less than 6 months</option>
                                        <option value="6–12 months">6–12 months</option>
                                        <option value="1–3 years">1–3 years</option>
                                        <option value="3+ years">3+ years</option>
                                    </select>
                                    {errors.businessVintage && <p className="text-red-400 text-xs mt-1 ml-1">{errors.businessVintage}</p>}
                                </div>
                            </div>

                            {submitError && (
                                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl px-4 py-3 text-xs text-red-400 mt-2">
                                    <strong className="text-red-300">⚠ Error:</strong> {submitError}
                                </div>
                            )}

                            <div className="pt-4">
                                <button onClick={handleSubmit} disabled={isLoading} className="w-full py-4 rounded-2xl bg-blue-600 text-white text-base font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 disabled:opacity-70 flex justify-center items-center gap-2">
                                    {isLoading ? (
                                        <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing…</>
                                    ) : (
                                        <>Get My Report</>
                                    )}
                                </button>
                                <p className="text-center text-[10px] text-zinc-400 mt-3">We respect your privacy. No spam ever.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
