import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../services/slices/UserSlice.js';
import toast, { Toaster } from 'react-hot-toast';
import {
    BarChart3, Users, Search, LogOut, ChevronRight,
    TrendingUp, Menu, UserCheck, UserX, Loader2, Baby, Mail, Phone, AlertCircle, ArrowLeft
} from 'lucide-react';

import {
    useGetGlobalUsersQuery,
    useGetGlobalChildrenQuery,
    useRemoveUserMutation
} from '../../services/CeoApi.js';

const CEODashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState('analytics');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const { data: allUsers = [], isLoading: loadingUsers } = useGetGlobalUsersQuery();
    const { data: allChildren = [], isLoading: loadingChildren } = useGetGlobalChildrenQuery();
    const [removeUser, { isLoading: isDeleting }] = useRemoveUserMutation();

    const filteredUsers = allUsers.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredChildren = allChildren.filter(child =>
        child.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await removeUser(userToDelete.id).unwrap();
            toast.success(`${userToDelete.name || 'User'} removed successfully`);
            setShowDeleteModal(false);
            setUserToDelete(null);
        } catch (err) {
            toast.error(err.data?.message || "Failed to remove user");
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-900 relative">
            <Toaster position="top-right" />

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl animate-in zoom-in duration-200">
                        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6">
                            <AlertCircle size={32} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 mb-2">Confirm Removal</h3>
                        <p className="text-slate-500 mb-8 leading-relaxed">
                            Are you sure you want to remove <span className="font-bold text-slate-800">{userToDelete?.email}</span>?
                            This action is permanent and will revoke all access.
                        </p>
                        <div className="flex gap-4">
                            <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-colors">Cancel</button>
                            <button onClick={confirmDelete} disabled={isDeleting} className="flex-1 py-4 bg-red-500 text-white font-black rounded-2xl hover:bg-red-600 transition-all flex items-center justify-center gap-2">
                                {isDeleting ? <Loader2 className="animate-spin" size={20}/> : "Delete User"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isSidebarOpen && <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] lg:hidden" onClick={() => setIsSidebarOpen(false)} />}

            {/* --- Sidebar --- */}
            <aside className={`fixed lg:sticky top-0 left-0 z-[101] h-screen w-72 bg-slate-900 flex flex-col transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="p-8 flex items-center gap-3">
                    <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center text-white font-black shadow-lg">CEO</div>
                    <span className="font-bold text-white text-xl tracking-tight uppercase">El-Olam</span>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
                    <CEONavLink icon={<BarChart3 size={20}/>} label="Overview" active={activeTab === 'analytics'} onClick={() => {setActiveTab('analytics'); setIsSidebarOpen(false); setSearchTerm("");}} />
                    <CEONavLink icon={<Users size={20}/>} label="Manage Staff & Parents" active={activeTab === 'staff'} onClick={() => {setActiveTab('staff'); setIsSidebarOpen(false); setSearchTerm("");}} />
                    <CEONavLink icon={<Baby size={20}/>} label="Child Registry" active={activeTab === 'children'} onClick={() => {setActiveTab('children'); setIsSidebarOpen(false); setSearchTerm("");}} />
                </nav>

                <div className="mt-auto p-8 border-t border-slate-800 bg-slate-900">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 text-slate-400 hover:text-red-400 font-bold p-3 rounded-2xl hover:bg-red-500/10 transition-all duration-300">
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            {/* --- Main Content --- */}
            <main className="flex-1 overflow-x-hidden min-w-0 w-full">
                <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
                    {/* Top Row: Navigation and Profile */}
                    <div className="px-4 lg:px-8 py-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 bg-slate-100 rounded-lg"><Menu size={20} /></button>
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-600 px-3 py-2 lg:px-4 rounded-xl transition-all duration-300 group font-bold text-[10px] lg:text-xs uppercase tracking-wider shadow-sm"
                            >
                                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                                <span>Go Back</span>
                            </button>
                        </div>

                        {/* Desktop Search Bar */}
                        <div className="relative hidden md:block w-64 lg:w-96 mx-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search everything..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-full text-sm outline-none ring-sky-500/20 focus:ring-4 transition-all"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <h1 className="hidden sm:block text-xs font-black text-slate-400 uppercase tracking-widest">{activeTab}</h1>
                            <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white text-[10px] font-black uppercase shadow-md">CEO</div>
                        </div>
                    </div>

                    {/* Mobile Search Row (Visible only on small screens) */}
                    <div className="px-4 pb-4 md:hidden">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder={`Search ${activeTab}...`}
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 rounded-xl text-sm outline-none border border-slate-200 focus:border-sky-500 transition-all"
                            />
                        </div>
                    </div>
                </header>

                <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-8">
                    {activeTab === 'analytics' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <CEOStatCard label="Total Organization Users" value={loadingUsers ? "..." : allUsers.length} icon={<Users className="text-sky-500" />} color="bg-sky-50" />
                            <CEOStatCard label="Global Child Count" value={loadingChildren ? "..." : allChildren.length} icon={<TrendingUp className="text-emerald-500" />} color="bg-emerald-50" />
                            <CEOStatCard label="Live System Status" value="Active" icon={<UserCheck className="text-indigo-500" />} color="bg-indigo-50" />
                        </div>
                    )}

                    {activeTab === 'staff' && (
                        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="text-xl font-black">Staff & Parent Directory</h3>
                                {searchTerm && <span className="text-xs font-bold text-sky-500">Showing {filteredUsers.length} results</span>}
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left min-w-[700px]">
                                    <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                                    <tr>
                                        <th className="px-8 py-5">Identified Name</th>
                                        <th className="px-8 py-5">Contact Details</th>
                                        <th className="px-8 py-5">System Role</th>
                                        <th className="px-8 py-5 text-right">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                    {filteredUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-slate-50/80 transition-colors group">
                                            <td className="px-8 py-5">
                                                <div className="font-bold text-slate-800">{user.name || 'External User'}</div>
                                                <div className="text-[10px] text-slate-400 uppercase font-black">Member ID: #{user.id}</div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="text-sm font-bold text-slate-600 flex items-center gap-2"><Mail size={14} className="text-slate-400"/> {user.email}</div>
                                                <div className="text-xs text-sky-600 font-mono mt-1 flex items-center gap-2"><Phone size={12} className="text-sky-400"/> {user.phoneNumber || '---'}</div>
                                            </td>
                                            <td className="px-8 py-5">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${user.role?.includes('DIRECTOR') ? 'bg-indigo-100 text-indigo-700' : 'bg-sky-100 text-sky-700'}`}>
                                                        {user.role?.replace('ROLE_', '') || 'USER'}
                                                    </span>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <button onClick={() => handleDeleteClick(user)} className="p-3 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                                                    <UserX size={18}/>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'children' && (
                        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 lg:p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-black">Live Enrollment List</h3>
                                {searchTerm && <span className="text-xs font-bold text-sky-500 font-black uppercase tracking-widest">{filteredChildren.length} Found</span>}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredChildren.map((child) => (
                                    <div key={child.id} className="p-6 border border-slate-100 rounded-[2.5rem] bg-slate-50/50 hover:bg-white hover:border-sky-300 hover:shadow-xl transition-all group">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-sky-600 shadow-sm font-black text-xl group-hover:bg-sky-600 group-hover:text-white transition-all">{child.name?.[0]}</div>
                                            <div>
                                                <p className="font-black text-slate-800 text-lg">"{child.name}"</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{child.condition || 'Healthy'}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center border-t border-slate-200/60 pt-4">
                                            <p className="text-[10px] text-slate-400 font-black uppercase">Age: {child.age} Yrs</p>
                                            <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

const CEONavLink = ({ icon, label, active, onClick }) => (
    <button onClick={onClick} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black transition-all ${active ? 'bg-sky-500 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
        {icon} <span className="text-sm tracking-tight">{label}</span>
    </button>
);

const CEOStatCard = ({ label, value, icon, color }) => (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6">
        <div className={`p-5 ${color} rounded-2xl scale-110 shadow-inner`}>{icon}</div>
        <div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{label}</p>
            <h4 className="text-3xl font-black text-slate-800 mt-1">{value}</h4>
        </div>
    </div>
);

export default CEODashboard;