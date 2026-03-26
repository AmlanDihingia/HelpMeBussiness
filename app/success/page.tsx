import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function SuccessPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-xl w-full flex flex-col items-center text-center space-y-8 animate-in slide-in-from-bottom-8 duration-700">
                <div className="w-20 h-20 bg-brand-cyan/20 border border-brand-cyan/50 rounded-full flex items-center justify-center text-4xl mb-4 text-brand-cyan">
                    <CheckCircle2 size={40} />
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Booking Confirmed!</h1>
                    <p className="text-xl text-zinc-400 max-w-xl">
                        Your ₹999 investment is received. You&apos;ve successfully scheduled your Clarity Session. 
                    </p>
                </div>

                <div className="w-full glass-card p-8 rounded-3xl border border-white/10 space-y-6">
                    <p className="text-zinc-400">
                        Check your email for the meeting invite and preparation details. We look forward to helping you build your business with precision.
                    </p>
                    
                    <Link href="/" className="block">
                        <Button variant="primary" size="lg" className="w-full group">
                            Return to Homepage
                            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>

                <p className="text-zinc-500 text-sm">
                    Have questions? Contact us at support@helpmebusiness.com
                </p>
            </div>
        </div>
    );
}
