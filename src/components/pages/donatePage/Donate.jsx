import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Globe, Landmark, Copy, ArrowRight, ArrowLeft } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';


const AccountCard = ({ acc, onCopy, color }) => {
    const activeColorClass = color === 'emerald'
        ? 'group-hover:bg-emerald-600 group-hover:text-white'
        : 'group-hover:bg-indigo-600 group-hover:text-white';

    return (
        <div className="group bg-slate-50 p-6 rounded-3xl border border-transparent hover:border-slate-200 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{acc.bank}</p>
                    <p className="text-sm font-bold text-slate-600 uppercase leading-tight">{acc.accountName}</p>
                </div>
                <button
                    onClick={onCopy}
                    className={`p-3 rounded-xl bg-white shadow-sm transition-all text-slate-400 ${activeColorClass}`}
                >
                    <Copy size={18} />
                </button>
            </div>
            <p className="text-2xl font-black text-slate-800 tracking-tighter">{acc.accountNo}</p>
        </div>
    );
};

const Donate = () => {
    const navigate = useNavigate();


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const localAccounts = [
        { bank: "Zenith Bank", accountName: "El-Olam Center Ltd", accountNo: "1012345678" },
        { bank: "GTBank", accountName: "El-Olam Foundation", accountNo: "0123456789" },
        { bank: "Access Bank", accountName: "El-Olam Children Fund", accountNo: "0098765432" },
    ];

    const foreignAccounts = [
        { bank: "Zenith Bank (USD)", accountName: "El-Olam Center Ltd", accountNo: "5070001234" },
        { bank: "GTBank (GBP)", accountName: "El-Olam Foundation", accountNo: "2010005678" },
        { bank: "First Bank (EUR)", accountName: "El-Olam Children Fund", accountNo: "3040009012" },
    ];

    const copyToClipboard = (num) => {
        if (!navigator.clipboard) {
            toast.error("Clipboard not supported");
            return;
        }
        navigator.clipboard.writeText(num);
        toast.success("Account number copied!", {
            icon: '📋',
            style: {
                borderRadius: '15px',
                background: '#1e293b',
                color: '#fff',
                fontWeight: 'bold'
            },
        });
    };

    return (
        <div className="min-h-screen bg-[#FDFEFF] font-sans text-slate-900 pb-20">

            {/* --- Navigation Back Button --- */}
            <div className="fixed top-6 left-6 z-[100]"> {/* Adjusted top value for better visibility */}
                <button
                    onClick={() => navigate(-1)} // Now works because navigate is defined
                    className="group flex items-center gap-2 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-xl border border-slate-100 hover:bg-sky-600 transition-all duration-300 active:scale-90"
                    title="Go Back"
                >
                    <ArrowLeft size={24} className="text-slate-600 group-hover:text-white transition-colors" />
                    <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:pl-2 transition-all duration-500 font-bold group-hover:text-white whitespace-nowrap">
                        Go Back
                    </span>
                </button>
            </div>

            <Toaster position="bottom-center" reverseOrder={false} />


            <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/60 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=2000"
                    alt="Children Support"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-20 text-center px-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-black uppercase tracking-widest mb-6">
                        <Heart size={14} className="text-rose-400 fill-rose-400" /> Make an Impact
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-black text-white mb-4 tracking-tight uppercase">Support Our Children</h1>
                    <p className="text-indigo-50 text-base lg:text-lg max-w-2xl mx-auto font-medium">
                        Your generosity provides therapy, education, and a future for children with special needs. Every kobo makes a difference.
                    </p>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-30">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">


                    <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                                <Landmark size={28} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black">Local Donations</h2>
                                <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Nigeria (NGN)</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {localAccounts.map((acc, i) => (
                                <AccountCard key={i} acc={acc} onCopy={() => copyToClipboard(acc.accountNo)} color="emerald" />
                            ))}
                        </div>
                    </div>

                    {/* Foreign Donations Column */}
                    <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center">
                                <Globe size={28} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black">Foreign Currency</h2>
                                <p className="text-slate-500 text-xs font-black uppercase tracking-widest">International Donors</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {foreignAccounts.map((acc, i) => (
                                <AccountCard key={i} acc={acc} onCopy={() => copyToClipboard(acc.accountNo)} color="indigo" />
                            ))}
                        </div>
                    </div>

                </div>


                <div className="mt-16 bg-slate-900 rounded-[3rem] p-10 lg:p-16 text-center text-white relative overflow-hidden">
                    <Heart className="absolute -top-10 -right-10 text-white/5" size={300} />
                    <h3 className="text-3xl font-black mb-6">Transparent & Accountable</h3>
                    <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed mb-10">
                        El-Olam ensures that 100% of public donations go directly toward child welfare, specialized therapy equipment, and facility maintenance. We provide annual reports to all our major donors.
                    </p>
                    <a
                        href="tel:+2348137973130"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition-all shadow-lg shadow-indigo-500/20 uppercase text-xs tracking-widest"
                    >
                        Contact Support for Enquiries <ArrowRight size={16} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Donate;