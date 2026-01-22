import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Added for navigation
import {
    LayoutDashboard, UserPlus, ClipboardList, Boxes,
    Search, Bell, LogOut, ChevronRight, PlusCircle,
    MoreVertical, Edit, Trash2, CheckCircle, Filter,
    User, Calendar, FileText, Save, Send, Image as ImageIcon,
    Plus, Upload, History, X, Phone
} from 'lucide-react';

const DirectorDashboard = () => {
    const navigate = useNavigate(); // Initialize navigation
    const [activeTab, setActiveTab] = useState('dashboard');
    const [filterQuery, setFilterQuery] = useState('');
    const [showParentModal, setShowParentModal] = useState(false);

    // --- State for 18 Endpoint Integration ---
    const [children, setChildren] = useState([
        { id: "C001", name: "David Adeleke", status: "Active" },
        { id: "C002", name: "Chioma Obi", status: "Active" }
    ]);
    const [selectedParent, setSelectedParent] = useState(null);

    // --- Logout Logic ---
    const handleLogout = () => {
        // Clear tokens and roles from storage
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');

        // Redirect to Admin Login page
        navigate('/admin-login');
    };

    // Pillar 7: Fetch Parent Data Logic
    const handleViewParent = (childId) => {
        // Mocking fetching parent for child
        setSelectedParent({
            name: "John Adeleke",
            email: "john.adeleke@example.com",
            phone: "+234 801 234 5678",
            childName: "David Adeleke"
        });
        setShowParentModal(true);
    };

    const filteredChildren = children.filter(c =>
        c.name.toLowerCase().includes(filterQuery.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">

            {/* --- Parent Info Modal (Pillar 7 UI) --- */}
            {showParentModal && selectedParent && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl animate-in zoom-in duration-300">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center">
                                <User size={24} />
                            </div>
                            <button onClick={() => setShowParentModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                <X size={20} className="text-slate-400" />
                            </button>
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 mb-1">{selectedParent.name}</h3>
                        <p className="text-slate-500 text-sm mb-6 uppercase tracking-widest font-bold">Parent of {selectedParent.childName}</p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                                <Send size={18} className="text-sky-500" />
                                <span className="text-sm font-medium text-slate-600 text-ellipsis overflow-hidden">{selectedParent.email}</span>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                                <Phone size={18} className="text-emerald-500" />
                                <span className="text-sm font-medium text-slate-600">{selectedParent.phone}</span>
                            </div>
                        </div>
                        <button onClick={() => setShowParentModal(false)} className="w-full mt-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all">
                            Close Profile
                        </button>
                    </div>
                </div>
            )}

            {/* --- Sidebar (Pillars 2, 8, 13, 18) --- */}
            <aside className="w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col sticky top-0 h-screen">
                <div className="p-8 flex items-center gap-3">
                    <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-sky-100">E</div>
                    <span className="font-bold text-slate-800 text-xl tracking-tight">El-Olam</span>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <SidebarLink icon={<LayoutDashboard size={20}/>} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
                    <SidebarLink icon={<UserPlus size={20}/>} label="Admissions" active={activeTab === 'onboarding'} onClick={() => setActiveTab('onboarding')} />
                    <SidebarLink icon={<User size={20}/>} label="Registry" active={activeTab === 'children'} onClick={() => setActiveTab('children')} />
                    <SidebarLink icon={<ClipboardList size={20}/>} label="Reports" active={activeTab === 'reports'} onClick={() => setActiveTab('reports')} />
                    <SidebarLink icon={<ImageIcon size={20}/>} label="Gallery" active={activeTab === 'media'} onClick={() => setActiveTab('media')} />
                    <SidebarLink icon={<Boxes size={20}/>} label="Inventory" active={activeTab === 'inventory'} onClick={() => setActiveTab('inventory')} />
                </nav>

                <div className="p-6 border-t border-slate-100">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 text-slate-400 hover:text-red-500 transition-colors font-bold p-3 group"
                    >
                        <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* --- Main Content --- */}
            <main className="flex-1 overflow-x-hidden min-w-0">
                <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-30">
                    <h2 className="text-xl font-bold text-slate-800 capitalize tracking-tight">{activeTab.replace('-', ' ')}</h2>
                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input type="text" placeholder="Search Users..." className="pl-10 pr-4 py-2 bg-slate-100 rounded-full text-sm outline-none w-64 focus:ring-2 focus:ring-sky-500 transition-all" />
                        </div>
                        <div className="w-10 h-10 bg-slate-900 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white font-bold">D</div>
                    </div>
                </header>

                <div className="p-8 max-w-7xl mx-auto space-y-8">
                    {/* --- DASHBOARD VIEW --- */}
                    {activeTab === 'dashboard' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard label="Active Kids" value={children.length} icon={<User size={20}/>} />
                            <StatCard label="Supplies" value="45" icon={<Boxes size={20}/>} />
                            <StatCard label="Reports" value="08" icon={<Send size={20}/>} />
                            <StatCard label="Staff Users" value="12" icon={<CheckCircle size={20}/>} />
                        </div>
                    )}

                    {/* --- REGISTRY VIEW --- */}
                    {activeTab === 'children' && (
                        <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
                            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                                <div>
                                    <h3 className="font-bold text-slate-800 text-lg">Child Registry</h3>
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Pillar 2: GET /children/all</p>
                                </div>
                                <div className="relative">
                                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input type="text" placeholder="Filter registry..." value={filterQuery} onChange={(e)=>setFilterQuery(e.target.value)} className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-sky-500 w-48 lg:w-64" />
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    <tr>
                                        <th className="px-8 py-5">Name</th>
                                        <th className="px-8 py-5">Parent Info</th>
                                        <th className="px-8 py-5 text-center">Status</th>
                                        <th className="px-8 py-5 text-right">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                    {filteredChildren.map((child) => (
                                        <tr key={child.id} className="group hover:bg-slate-50 transition-colors">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center font-bold text-xs">{child.name[0]}</div>
                                                    <span className="font-bold text-slate-700">{child.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <button
                                                    onClick={() => handleViewParent(child.id)}
                                                    className="flex items-center gap-2 text-xs font-bold text-sky-600 hover:text-white hover:bg-sky-600 bg-sky-50 px-4 py-2 rounded-xl transition-all"
                                                >
                                                    <User size={14}/> Profile
                                                </button>
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">{child.status}</span>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg"><Edit size={16}/></button>
                                                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16}/></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* --- ADMISSIONS VIEW --- */}
                    {activeTab === 'onboarding' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
                                <h3 className="text-xl font-black mb-6 flex items-center gap-2 tracking-tight">
                                    <PlusCircle className="text-sky-500" size={24}/> Enroll Child
                                </h3>
                                <div className="space-y-4">
                                    <input type="text" placeholder="Full Legal Name" className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-sky-500 transition-all font-medium" />
                                    <button className="w-full py-4 bg-sky-600 text-white font-bold rounded-2xl hover:bg-sky-700 shadow-lg shadow-sky-100 transition-all uppercase text-xs tracking-widest">POST /enroll</button>
                                </div>
                            </div>
                            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
                                <h3 className="text-xl font-black mb-6 flex items-center gap-2 tracking-tight">
                                    <UserPlus className="text-emerald-500" size={24}/> Onboard Parent
                                </h3>
                                <div className="space-y-4">
                                    <input type="text" placeholder="Child ID" className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium" />
                                    <input type="email" placeholder="Parent Email Address" className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium" />
                                    <button className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all uppercase text-xs tracking-widest">POST /onboard-parent</button>
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
const SidebarLink = ({ icon, label, active, onClick }) => (
    <button onClick={onClick} className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all ${active ? 'bg-sky-600 text-white shadow-xl shadow-sky-100' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}>
        {icon} <span className="text-sm">{label}</span> {active && <ChevronRight size={14} className="ml-auto" />}
    </button>
);

const StatCard = ({ label, value, icon }) => (
    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 flex items-center gap-5 shadow-sm hover:shadow-md transition-all">
        <div className="p-4 bg-slate-50 text-sky-600 rounded-2xl">{icon}</div>
        <div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{label}</p>
            <p className="text-2xl font-black text-slate-800 leading-none mt-1">{value}</p>
        </div>
    </div>
);

export default DirectorDashboard;