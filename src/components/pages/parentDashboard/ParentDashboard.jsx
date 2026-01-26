import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../services/slices/UserSlice.js';
import {
    useGetParentChildProfileQuery,
    useGetParentChildReportsQuery,
    useGetLatestChildReportQuery,
    useGetParentChildMediaQuery,
} from '../../services/ParentApi.js';
import {
    Heart, Calendar, LogOut, ChevronRight, Menu,
    User, Image as ImageIcon, FileText, Loader2, X, Info
} from 'lucide-react';

const ParentDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('feed');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [viewingReport, setViewingReport] = useState(null);

    const { userInfo } = useSelector((state) => state.user);
    const childId = userInfo?.childId || userInfo?.child_id;

    const { data: child, isLoading: isChildLoading } = useGetParentChildProfileQuery(childId, { skip: !childId });
    const { data: latestReport, isLoading: isLatestLoading } = useGetLatestChildReportQuery(childId, { skip: !childId });
    const { data: reportHistory = [], isLoading: isHistoryLoading } = useGetParentChildReportsQuery(childId, { skip: !childId });
    const { data: media = [], isLoading: isMediaLoading } = useGetParentChildMediaQuery(childId, { skip: !childId });

    const { latestPhoto, galleryPhotos } = useMemo(() => {
        if (!media || media.length === 0) return { latestPhoto: null, galleryPhotos: [] };
        const sortedMedia = [...media].sort((a, b) => b.id?.localeCompare(a.id || '') || 0);
        const newestPhoto = sortedMedia[0]?.images?.[0];
        let allOtherImages = [];
        sortedMedia.forEach((item, index) => {
            if (index === 0) {
                if (item.images && item.images.length > 1) allOtherImages.push(...item.images.slice(1));
            } else {
                if (item.images) allOtherImages.push(...item.images);
            }
        });
        return { latestPhoto: newestPhoto, galleryPhotos: allOtherImages };
    }, [media]);

    // UPDATED: Correct redirect after logout
    const handleSignOut = () => {
        dispatch(logout());
        navigate('/login');
    };

    if (isChildLoading || isLatestLoading || isHistoryLoading || isMediaLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <Loader2 className="w-12 h-12 text-sky-600 animate-spin" />
        </div>
    );

    return (
        <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-900 relative">
            {/* Image Modal */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 cursor-zoom-out" onClick={() => setSelectedImage(null)}>
                    <img src={selectedImage} className="max-w-full max-h-full rounded-lg object-contain shadow-2xl" alt="Full view" />
                </div>
            )}

            {/* Report Details Modal */}
            {viewingReport && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-black text-slate-800 tracking-tight">Session Details</h3>
                                <p className="text-[10px] font-bold text-sky-600 uppercase tracking-widest mt-1">{viewingReport.date}</p>
                            </div>
                            <button onClick={() => setViewingReport(null)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                                <X size={24} className="text-slate-400" />
                            </button>
                        </div>
                        <div className="p-8 space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Milestones reached</label>
                                <p className="text-lg font-bold text-slate-800 leading-tight">{viewingReport.milestones}</p>
                            </div>
                            <div className="space-y-3 bg-slate-50 p-6 rounded-3xl">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <Info size={12} /> Detailed Observations
                                </label>
                                <p className="text-slate-600 leading-relaxed italic">"{viewingReport.observations}"</p>
                            </div>
                        </div>
                        <div className="p-6 bg-slate-50/50 text-center">
                            <button onClick={() => setViewingReport(null)} className="px-8 py-3 bg-slate-800 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-slate-700 transition-all">Close Report</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Sidebar */}
            <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen bg-white border-r border-slate-100 transition-transform duration-300 w-72 flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="p-8">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-sky-100">E</div>
                        <span className="font-bold text-slate-800 text-xl tracking-tight">El-Olam</span>
                    </div>
                    <nav className="space-y-2">
                        <ParentNavLink icon={<Heart size={20}/>} label="Updates Feed" active={activeTab === 'feed'} onClick={() => { setActiveTab('feed'); setIsSidebarOpen(false); }} />
                        <ParentNavLink icon={<ImageIcon size={20}/>} label="Media Gallery" active={activeTab === 'gallery'} onClick={() => { setActiveTab('gallery'); setIsSidebarOpen(false); }} />
                        <ParentNavLink icon={<FileText size={20}/>} label="Full History" active={activeTab === 'history'} onClick={() => { setActiveTab('history'); setIsSidebarOpen(false); }} />
                    </nav>
                </div>
                <div className="mt-auto p-8 border-t border-slate-50">
                    <button onClick={handleSignOut} className="w-full flex items-center gap-3 text-slate-400 hover:text-red-500 font-bold p-3 transition-colors group">
                        <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" /> Sign Out
                    </button>
                </div>
            </aside>

            <main className="flex-1 min-w-0">
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 lg:px-12 py-5 flex justify-between items-center">
                    <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-slate-600"><Menu size={24} /></button>
                    <h1 className="text-lg font-black text-slate-800 uppercase tracking-tighter italic">Parent Portal</h1>
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold border border-slate-200 uppercase">{child?.name?.[0]}</div>
                </header>

                <div className="p-6 lg:p-12 max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                        <div className="xl:col-span-2 space-y-10">
                            {activeTab === 'feed' && (
                                <>
                                    <section className="space-y-4">
                                        <h3 className="font-bold text-slate-800 text-sm uppercase tracking-widest">Latest Session Report</h3>
                                        <div onClick={() => setViewingReport(latestReport)} className="bg-white rounded-[2.5rem] p-8 lg:p-10 border border-slate-100 shadow-sm cursor-pointer hover:border-sky-200 transition-all group">
                                            {latestReport ? (
                                                <>
                                                    <div className="flex items-center gap-3 text-slate-400 mb-6">
                                                        <Calendar size={16} /> <span className="text-xs font-bold uppercase tracking-widest">{latestReport.date}</span>
                                                    </div>
                                                    <h4 className="text-2xl font-black text-slate-800 mb-4 group-hover:text-sky-600 transition-colors">{latestReport.milestones}</h4>
                                                    <p className="text-slate-600 leading-relaxed text-lg italic line-clamp-2">"{latestReport.observations}"</p>
                                                </>
                                            ) : (
                                                <div className="text-center py-10 italic text-slate-400 text-sm">No recent report found.</div>
                                            )}
                                        </div>
                                    </section>

                                    <section className="space-y-4">
                                        <h3 className="font-bold text-slate-800 text-sm uppercase tracking-widest">Recent Photo</h3>
                                        <div className="bg-white p-4 rounded-[2.5rem] border border-slate-100 shadow-sm">
                                            {latestPhoto ? (
                                                <div className="group relative cursor-pointer overflow-hidden rounded-[2rem] bg-slate-100" onClick={() => setSelectedImage(latestPhoto)}>
                                                    <img
                                                        src={latestPhoto}
                                                        alt="Latest"
                                                        className="aspect-video w-full object-cover group-hover:scale-105 transition-transform duration-700 min-h-[300px]"
                                                        onError={(e) => { e.target.src = "https://placehold.co/600x400?text=Photo+Unavailable"; }}
                                                    />
                                                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-sm">
                                                        <p className="text-[10px] font-black text-sky-600 uppercase tracking-widest italic">Featured Update</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="py-20 text-center text-slate-300 font-bold uppercase tracking-widest text-xs">Waiting for today's photo...</div>
                                            )}
                                        </div>
                                    </section>
                                </>
                            )}

                            {activeTab === 'gallery' && (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    {galleryPhotos.length > 0 ? galleryPhotos.map((url, idx) => (
                                        <div key={idx} className="aspect-square bg-slate-100 border border-slate-100 p-1 rounded-3xl cursor-pointer group hover:shadow-lg transition-all overflow-hidden" onClick={() => setSelectedImage(url)}>
                                            <img
                                                src={url}
                                                alt="Gallery"
                                                className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-all duration-500"
                                                onError={(e) => { e.target.src = "https://placehold.co/300x300?text=Error"; }}
                                            />
                                        </div>
                                    )) : (
                                        <div className="col-span-full py-20 text-center text-slate-300 font-bold uppercase tracking-widest text-xs italic">Previous images will appear here.</div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'history' && (
                                <div className="space-y-3">
                                    {reportHistory.length > 0 ? reportHistory.map((report) => (
                                        <div key={report.id} onClick={() => setViewingReport(report)} className="bg-white p-6 rounded-[2rem] border border-slate-100 flex justify-between items-center hover:border-sky-200 transition-all cursor-pointer group shadow-sm">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-slate-50 text-slate-400 group-hover:text-sky-600 group-hover:bg-sky-50 rounded-2xl flex items-center justify-center transition-all"><FileText size={20} /></div>
                                                <div>
                                                    <p className="font-bold text-slate-800 text-sm">{report.milestones}</p>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{report.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] font-black text-slate-300 uppercase opacity-0 group-hover:opacity-100 transition-all">View Details</span>
                                                <ChevronRight size={18} className="text-slate-300 group-hover:text-sky-600" />
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="text-center py-20 text-slate-400 italic">No historical reports available.</div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Profile Card */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm text-center">
                                <div className="w-24 h-24 bg-slate-50 rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-white shadow-xl">
                                    <User size={40} className="text-slate-300" />
                                </div>
                                <h4 className="font-black text-2xl text-slate-800 mb-1 leading-tight">{child?.name}</h4>
                                <p className="text-[10px] font-black text-sky-600 bg-sky-50 px-3 py-1 rounded-full inline-block uppercase tracking-widest">{child?.condition}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const ParentNavLink = ({ icon, label, active, onClick }) => (
    <button onClick={onClick} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${active ? 'bg-sky-600 text-white shadow-xl' : 'text-slate-400 hover:bg-slate-50'}`}>
        {icon} <span className="text-sm">{label}</span>
    </button>
);

export default ParentDashboard;