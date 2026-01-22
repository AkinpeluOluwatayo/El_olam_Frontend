import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Added for navigation
import {
    Heart, Calendar, Activity,
    Bell, LogOut, ChevronRight, Menu, X,
    Clock, User, Image as ImageIcon, FileText,
    CheckCircle2
} from 'lucide-react';

const ParentDashboard = () => {
    const navigate = useNavigate(); // Initialize navigation
    const [activeTab, setActiveTab] = useState('feed');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // --- API State Management (Aligned with your 4 Pillars) ---
    const [isLoading, setIsLoading] = useState(true);
    const [child, setChild] = useState(null);
    const [latestReport, setLatestReport] = useState(null);
    const [reportHistory, setReportHistory] = useState([]);
    const [media, setMedia] = useState([]);

    useEffect(() => {
        const fetchParentData = async () => {
            setIsLoading(true);
            try {
                // Simulation of API load
                setTimeout(() => {
                    setChild({
                        name: "David Adeleke",
                        id: "C001",
                        condition: "Autism Spectrum",
                        age: "7 Years",
                        enrollmentDate: "Jan 2025"
                    });
                    setLatestReport({
                        title: "Sensory Integration Progress",
                        note: "David was exceptionally responsive during the tactile stimulation exercises today. He engaged with the weighted blankets and showed improved patience.",
                        date: "Jan 21, 2026",
                        mood: "Calm & Focused"
                    });
                    setMedia([1, 2, 3, 4, 5, 6]);
                    setIsLoading(false);
                }, 800);
            } catch (error) {
                console.error("Data Fetch Error:", error);
                setIsLoading(false);
            }
        };
        fetchParentData();
    }, []);

    // --- Navigation Logic ---
    const handleSignOut = () => {
        // Clear tokens/session if you're using localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');

        // Redirect to Login Page
        navigate('/login');
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-400 font-bold text-sm tracking-widest uppercase">Syncing Care Data...</p>
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-900 relative">

            {/* --- Mobile Sidebar Overlay --- */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40 lg:hidden transition-opacity"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* --- Navigation Sidebar --- */}
            <aside className={`
                fixed lg:sticky top-0 left-0 z-50 h-screen bg-white border-r border-slate-100 transition-transform duration-300 ease-in-out
                w-72 flex flex-col
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-8">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-sky-100">E</div>
                            <span className="font-bold text-slate-800 text-xl tracking-tight">El-Olam</span>
                        </div>
                        <button onClick={toggleSidebar} className="lg:hidden p-2 text-slate-400 hover:bg-slate-50 rounded-lg">
                            <X size={20} />
                        </button>
                    </div>

                    <nav className="space-y-2">
                        <ParentNavLink
                            icon={<Heart size={20}/>} label="Updates Feed"
                            active={activeTab === 'feed'}
                            onClick={() => { setActiveTab('feed'); setIsSidebarOpen(false); }}
                        />
                        <ParentNavLink
                            icon={<ImageIcon size={20}/>} label="Media Gallery"
                            active={activeTab === 'gallery'}
                            onClick={() => { setActiveTab('gallery'); setIsSidebarOpen(false); }}
                        />
                        <ParentNavLink
                            icon={<FileText size={20}/>} label="Full History"
                            active={activeTab === 'history'}
                            onClick={() => { setActiveTab('history'); setIsSidebarOpen(false); }}
                        />
                    </nav>
                </div>

                <div className="mt-auto p-8 border-t border-slate-50">
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 text-slate-400 hover:text-red-500 transition-colors font-bold text-sm group"
                    >
                        <LogOut size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* --- Main Dashboard Area --- */}
            <main className="flex-1 min-w-0">
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 lg:px-12 py-5 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button onClick={toggleSidebar} className="lg:hidden p-2 -ml-2 text-slate-600">
                            <Menu size={24} />
                        </button>
                        <h1 className="text-lg font-black text-slate-800 uppercase tracking-tighter">Parent Portal</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-400 relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="w-10 h-10 bg-slate-100 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs">
                            {child.name[0]}
                        </div>
                    </div>
                </header>

                <div className="p-6 lg:p-12 max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">

                        {/* Main Feed Content */}
                        <div className="xl:col-span-2 space-y-10">
                            {activeTab === 'feed' && (
                                <>
                                    <section className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-widest">Latest Progress</h3>
                                            <span className="flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                                                <CheckCircle2 size={12}/> VERIFIED
                                            </span>
                                        </div>

                                        <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 border border-slate-100 shadow-sm">
                                            <div className="flex items-center gap-3 text-slate-400 mb-6">
                                                <Calendar size={16} />
                                                <span className="text-xs font-bold uppercase tracking-widest">{latestReport.date}</span>
                                            </div>
                                            <h4 className="text-2xl lg:text-3xl font-black text-slate-800 mb-4">{latestReport.title}</h4>
                                            <p className="text-slate-600 leading-relaxed text-lg italic mb-8 italic">
                                                "{latestReport.note}"
                                            </p>
                                            <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-50">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-sky-500"></div>
                                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mood: {latestReport.mood}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-widest">Recent Media</h3>
                                            <button onClick={() => setActiveTab('gallery')} className="text-xs font-bold text-sky-600 hover:underline">View All Gallery</button>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                            {media.slice(0, 3).map((m, i) => (
                                                <div key={i} className="aspect-[4/3] bg-slate-100 rounded-[1.5rem] flex items-center justify-center text-slate-300 border-2 border-dashed border-slate-200">
                                                    <ImageIcon size={24} />
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </>
                            )}

                            {activeTab === 'gallery' && (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {media.map((m, i) => (
                                        <div key={i} className="aspect-square bg-white border border-slate-100 p-2 rounded-3xl shadow-sm">
                                            <div className="w-full h-full bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
                                                <ImageIcon size={32} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'history' && (
                                <div className="space-y-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 flex justify-between items-center hover:border-sky-200 transition-all cursor-pointer group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-slate-50 text-slate-400 group-hover:text-sky-600 group-hover:bg-sky-50 rounded-2xl flex items-center justify-center transition-all">
                                                    <FileText size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-800 text-sm">Daily Report - Jan {21-i}, 2026</p>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Official Progress Log</p>
                                                </div>
                                            </div>
                                            <ChevronRight size={18} className="text-slate-300 group-hover:text-sky-600" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right Profile Column */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm text-center">
                                <div className="w-24 h-24 bg-gradient-to-br from-slate-50 to-slate-100 rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-white shadow-xl relative">
                                    <User size={40} className="text-slate-300" />
                                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white"></div>
                                </div>
                                <h4 className="font-black text-2xl text-slate-800 mb-1 leading-tight">{child.name}</h4>
                                <p className="text-[10px] font-black text-sky-600 bg-sky-50 px-3 py-1 rounded-full inline-block uppercase tracking-widest">{child.condition}</p>
                                <div className="mt-10 pt-8 border-t border-slate-50 grid grid-cols-2 gap-4">
                                    <div className="text-left"><p className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">Age</p><p className="font-bold text-slate-700 text-sm">{child.age}</p></div>
                                    <div className="text-left"><p className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">Enrolled</p><p className="font-bold text-slate-700 text-sm">{child.enrollmentDate}</p></div>
                                    <div className="text-left mt-2"><p className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">Child ID</p><p className="font-bold text-sky-600 text-sm tracking-widest">{child.id}</p></div>
                                </div>
                            </div>

                            <div className="bg-sky-600 rounded-[2.5rem] p-8 text-white shadow-lg shadow-sky-100">
                                <h5 className="font-bold mb-3 flex items-center gap-2"><Activity size={18}/> Facility Notice</h5>
                                <p className="text-sky-100 text-xs leading-relaxed">Physical copies of the monthly assessment are now available at the front desk.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

const ParentNavLink = ({ icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${active ? 'bg-sky-600 text-white shadow-xl shadow-sky-100' : 'text-slate-400 hover:bg-slate-50'}`}
    >
        {icon}
        <span className="text-sm">{label}</span>
    </button>
);

export default ParentDashboard;