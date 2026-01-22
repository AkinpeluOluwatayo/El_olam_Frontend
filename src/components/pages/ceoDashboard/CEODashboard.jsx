import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Added for navigation
import {
    BarChart3, Users, Search, LogOut, ChevronRight,
    TrendingUp, Package, Menu, X, UserCheck, UserX
} from 'lucide-react';

const CEODashboard = () => {
    const navigate = useNavigate(); // Initialize navigation
    const [activeTab, setActiveTab] = useState('analytics');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // --- API Data States ---
    const [staffList, setStaffList] = useState([]); // Pillar 1
    const [childrenList, setChildrenList] = useState([]); // Pillar 3
    const [searchQuery, setSearchQuery] = useState(""); // Pillar 2

    // --- Logout Logic ---
    const handleLogout = () => {
        // Clear tokens and roles for security
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');

        // Redirect back to Admin Login
        navigate('/admin-login');
    };

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 relative">

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)}/>
            )}

            {/* --- Sidebar --- */}
            <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-slate-900 border-r border-slate-800 transition-transform duration-300 ease-in-out flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="p-8">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-sky-500/20">E</div>
                        <span className="font-bold text-white text-xl tracking-tight uppercase tracking-tighter">El-Olam CEO</span>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <CEONavLink icon={<BarChart3 size={20}/>} label="Global Overview" active={activeTab === 'analytics'} onClick={() => { setActiveTab('analytics'); setIsSidebarOpen(false); }} />
                    <CEONavLink icon={<Users size={20}/>} label="Manage Staff" active={activeTab === 'staff'} onClick={() => { setActiveTab('staff'); setIsSidebarOpen(false); }} />
                    <CEONavLink icon={<Users size={20}/>} label="Child Registry" active={activeTab === 'children'} onClick={() => { setActiveTab('children'); setIsSidebarOpen(false); }} />
                </nav>

                <div className="p-8 border-t border-slate-800">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 text-slate-400 hover:text-red-400 transition-colors font-bold p-2 group"
                    >
                        <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* --- Main Content Area --- */}
            <main className="flex-1 overflow-x-hidden min-w-0">
                <header className="bg-white border-b border-slate-200 px-4 lg:px-8 py-4 flex justify-between items-center sticky top-0 z-30">
                    <div className="flex items-center gap-4 flex-1">
                        <button onClick={() => setIsSidebarOpen(true)} className="p-2 lg:hidden bg-slate-100 rounded-xl text-slate-600">
                            <Menu size={20} />
                        </button>

                        {/* PILLAR 2: User Search */}
                        <div className="relative hidden md:block w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Find user by email (GET /search)..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm outline-none ring-sky-500/20 focus:ring-4 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">System</p>
                            <p className="text-xs font-bold text-slate-800 mt-1">Administrator</p>
                        </div>
                        <div className="w-10 h-10 bg-slate-900 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white text-[10px] font-black uppercase">CEO</div>
                    </div>
                </header>

                <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-8">

                    {/* PILLAR 1 & 3: Analytics */}
                    {activeTab === 'analytics' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <CEOStatCard label="Total Staff Members" value="18" icon={<Users className="text-sky-500" />} />
                            <CEOStatCard label="Total Enrolled Children" value="128" icon={<TrendingUp className="text-emerald-500" />} />
                        </div>
                    )}

                    {/* PILLAR 1: User Management List */}
                    {activeTab === 'staff' && (
                        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-500">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="text-xl font-bold">Organization Users</h3>
                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Pillar 1: Staff API</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left min-w-[600px]">
                                    <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest">
                                    <tr>
                                        <th className="px-8 py-5">Email Address</th>
                                        <th className="px-8 py-5">System Role</th>
                                        <th className="px-8 py-5 text-right">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <td className="px-8 py-5 font-bold text-slate-700 font-mono text-sm tracking-tight">director.lagos@elolam.com</td>
                                        <td className="px-8 py-5">
                                            <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-[10px] font-bold">DIRECTOR</span>
                                        </td>
                                        <td className="px-8 py-5 text-right flex justify-end gap-2">
                                            <button className="p-2 text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-all shadow-sm" title="Approve">
                                                <UserCheck size={16}/>
                                            </button>
                                            <button className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-all shadow-sm" title="Revoke">
                                                <UserX size={16}/>
                                            </button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* PILLAR 3 & 4: Child Registry */}
                    {activeTab === 'children' && (
                        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-500">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="text-xl font-bold">Global Child List</h3>
                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Pillar 3 & 4</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                                <div className="p-6 border border-slate-100 rounded-3xl hover:border-sky-300 hover:shadow-xl hover:shadow-sky-50 cursor-pointer transition-all group bg-slate-50/50">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-sky-600 shadow-sm font-bold group-hover:bg-sky-600 group-hover:text-white transition-all">D</div>
                                        <p className="font-black text-slate-800 group-hover:text-sky-600 transition-colors tracking-tight italic">"David Adeleke"</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">Click for Profile</p>
                                        <ChevronRight size={14} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

// UI Components
const CEONavLink = ({ icon, label, active, onClick }) => (
    <button onClick={onClick} className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all ${active ? 'bg-sky-500 text-white shadow-xl shadow-sky-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
        {icon} <span className="text-sm">{label}</span>
    </button>
);

const CEOStatCard = ({ label, value, icon }) => (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6 hover:shadow-md transition-shadow">
        <div className="p-5 bg-slate-50 rounded-2xl scale-110">{icon}</div>
        <div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{label}</p>
            <h4 className="text-3xl font-black text-slate-800 mt-1">{value}</h4>
        </div>
    </div>
);

export default CEODashboard;