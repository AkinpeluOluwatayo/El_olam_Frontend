import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../services/slices/UserSlice.js';
import {
    useGetAllChildrenQuery,
    useEnrollChildMutation,
    useUpdateChildMutation,
    useRemoveChildMutation,
    useOnboardParentMutation,
} from '../../services/DirectorApi.js';
import toast from 'react-hot-toast';
import {
    LayoutDashboard, UserPlus, Boxes, LogOut, User, X,
    Loader2, CheckCircle, Copy, MessageCircle, Edit, Trash2
} from 'lucide-react';

const DirectorDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState('dashboard');
    const [selectedChildId, setSelectedChildId] = useState(null);
    const [showParentModal, setShowParentModal] = useState(false);
    const [filterQuery, setFilterQuery] = useState('');
    const [generatedCreds, setGeneratedCreds] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [childForm, setChildForm] = useState({
        name: '',
        age: '',
        dateOfBirth: '',
        condition: 'Healthy',
        medicalHistory: 'None'
    });
    const [parentForm, setParentForm] = useState({ name: '', phone: '', email: '' });

    const { data: children = [] } = useGetAllChildrenQuery();
    const [enrollChild, { isLoading: isEnrolling }] = useEnrollChildMutation();
    const [updateChild, { isLoading: isUpdating }] = useUpdateChildMutation();
    const [removeChild] = useRemoveChildMutation();
    const [onboardParent, { isLoading: isOnboarding }] = useOnboardParentMutation();

    const handleEnrollOrUpdate = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await updateChild({ childId: selectedChildId, ...childForm }).unwrap();
                toast.success("Child updated!");
            } else {
                await enrollChild(childForm).unwrap();
                toast.success("Child enrolled!");
            }
            setChildForm({ name: '', age: '', dateOfBirth: '', condition: 'Healthy', medicalHistory: 'None' });
            setIsEditing(false);
            setSelectedChildId(null);
        } catch (err) {
            toast.error("Operation failed");
        }
    };

    const handleEditInitiation = (child) => {
        setIsEditing(true);
        setSelectedChildId(child.id);
        setChildForm({
            name: child.name,
            age: child.age,
            dateOfBirth: child.dateOfBirth,
            condition: child.condition,
            medicalHistory: child.medicalHistory
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteChild = async (id) => {
        if (window.confirm("Are you sure you want to remove this child?")) {
            try {
                await removeChild(id).unwrap();
                toast.success("Child removed");
            } catch (err) {
                toast.error("Failed to remove");
            }
        }
    };

    const handleOnboardParent = async (e) => {
        e.preventDefault();
        try {
            const response = await onboardParent({
                childId: selectedChildId,
                name: parentForm.name,
                email: parentForm.email,
                phoneNumber: parentForm.phone,
                role: "PARENT",
                password: "TEMP"
            }).unwrap();
            setGeneratedCreds(response);
            toast.success("Parent linked!");
        } catch (err) {
            toast.error(err.data?.message || "Linking failed");
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied");
    };

    const sendWhatsApp = () => {
        const message = `Hello ${generatedCreds.name}, your El-Olam parent account is ready.%0A%0AEmail: ${generatedCreds.email}%0APassword: ${generatedCreds.password}`;
        const phone = parentForm.phone.replace(/\D/g, '');
        window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    };

    const filteredChildren = children.filter(c =>
        c.name?.toLowerCase().includes(filterQuery.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
            <aside className="w-72 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0">
                <div className="p-8 flex items-center gap-3">
                    <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center text-white font-black text-xl">E</div>
                    <span className="font-bold text-slate-800 text-xl tracking-tight">El-Olam</span>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    <SidebarLink icon={<LayoutDashboard size={20}/>} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
                    <SidebarLink icon={<User size={20}/>} label="Registry" active={activeTab === 'children'} onClick={() => setActiveTab('children')} />
                    <SidebarLink icon={<Boxes size={20}/>} label="Inventory" active={activeTab === 'inventory'} onClick={() => setActiveTab('inventory')} />
                </nav>
                <div className="p-6 border-t border-slate-100">
                    <button onClick={() => { dispatch(logout()); navigate('/admin-login'); }} className="w-full flex items-center gap-3 text-slate-400 hover:text-red-500 font-bold p-3 transition-colors">
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            <main className="flex-1 overflow-x-hidden min-w-0">
                <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-40">
                    <h2 className="text-lg font-black text-slate-800 capitalize">{activeTab}</h2>
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-black uppercase">
                        {selectedChildId ? "ACT" : "ADM"}
                    </div>
                </header>

                <div className="p-8 max-w-7xl mx-auto space-y-8">
                    {activeTab === 'children' && (
                        <div className="space-y-8">
                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                                <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                                    {isEditing ? <Edit className="text-sky-600" /> : <UserPlus className="text-sky-600" />}
                                    {isEditing ? 'Update Child Profile' : 'Child Enrollment'}
                                </h3>
                                <form onSubmit={handleEnrollOrUpdate} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase text-slate-400 px-1">Full Name</label>
                                        <input required className="w-full p-4 rounded-2xl bg-slate-50 outline-none focus:ring-2 ring-sky-100" value={childForm.name} onChange={(e) => setChildForm({...childForm, name: e.target.value})} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase text-slate-400 px-1">Age</label>
                                        <input className="w-full p-4 rounded-2xl bg-slate-50 outline-none focus:ring-2 ring-sky-100" value={childForm.age} onChange={(e) => setChildForm({...childForm, age: e.target.value})} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase text-slate-400 px-1">Date of Birth</label>
                                        <input required type="date" className="w-full p-4 rounded-2xl bg-slate-50 outline-none focus:ring-2 ring-sky-100" value={childForm.dateOfBirth} onChange={(e) => setChildForm({...childForm, dateOfBirth: e.target.value})} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase text-slate-400 px-1">Medical Condition</label>
                                        <input className="w-full p-4 rounded-2xl bg-slate-50 outline-none focus:ring-2 ring-sky-100" value={childForm.condition} onChange={(e) => setChildForm({...childForm, condition: e.target.value})} />
                                    </div>
                                    <div className="lg:col-span-2 space-y-1">
                                        <label className="text-[10px] font-black uppercase text-slate-400 px-1">Medical History</label>
                                        <input className="w-full p-4 rounded-2xl bg-slate-50 outline-none focus:ring-2 ring-sky-100" value={childForm.medicalHistory} onChange={(e) => setChildForm({...childForm, medicalHistory: e.target.value})} />
                                    </div>
                                    <div className="lg:col-span-3 flex gap-4">
                                        <button type="submit" disabled={isEnrolling || isUpdating} className="flex-1 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all">
                                            {isEnrolling || isUpdating ? <Loader2 className="animate-spin mx-auto" /> : isEditing ? 'Update Record' : 'Register Child'}
                                        </button>
                                        {isEditing && (
                                            <button type="button" onClick={() => {setIsEditing(false); setChildForm({name:'', age:'', dateOfBirth:'', condition:'Healthy', medicalHistory:'None'});}} className="px-8 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl">
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>

                            <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
                                <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                                    <h3 className="font-bold text-slate-800">Registry</h3>
                                    <input placeholder="Search..." className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none" onChange={(e) => setFilterQuery(e.target.value)} />
                                </div>
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400">
                                    <tr><th className="px-8 py-5">Child</th><th className="px-8 py-5">Details</th><th className="px-8 py-5 text-right">Actions</th></tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                    {filteredChildren.map((child) => (
                                        <tr key={child.id} className="hover:bg-slate-50">
                                            <td className="px-8 py-5 font-bold text-slate-700">{child.name}</td>
                                            <td className="px-8 py-5 text-slate-500 text-xs">{child.age} yrs • {child.dateOfBirth}</td>
                                            <td className="px-8 py-5 text-right flex justify-end gap-3">
                                                <button onClick={() => handleEditInitiation(child)} className="p-2 text-slate-400 hover:text-sky-600 transition-colors">
                                                    <Edit size={18} />
                                                </button>
                                                <button onClick={() => handleDeleteChild(child.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                                                    <Trash2 size={18} />
                                                </button>
                                                <button onClick={() => {setSelectedChildId(child.id); setShowParentModal(true);}} className="text-[10px] font-black text-sky-600 bg-sky-50 px-4 py-2 rounded-lg hover:bg-sky-100 transition-colors">
                                                    LINK PARENT
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                {showParentModal && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                        <div className="bg-white rounded-[3rem] w-full max-w-md p-10 shadow-2xl relative">
                            {!generatedCreds ? (
                                <>
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-xl font-black">Parent Access</h3>
                                        <button onClick={() => {setShowParentModal(false); setSelectedChildId(null);}}><X size={18}/></button>
                                    </div>
                                    <form onSubmit={handleOnboardParent} className="space-y-4">
                                        <input required className="w-full p-4 rounded-2xl bg-slate-50 outline-none" placeholder="Name" value={parentForm.name} onChange={(e)=>setParentForm({...parentForm, name: e.target.value})} />
                                        <input required className="w-full p-4 rounded-2xl bg-slate-50 outline-none" placeholder="WhatsApp Number" value={parentForm.phone} onChange={(e)=>setParentForm({...parentForm, phone: e.target.value})} />
                                        <input required type="email" className="w-full p-4 rounded-2xl bg-slate-50 outline-none" placeholder="Email Address" value={parentForm.email} onChange={(e)=>setParentForm({...parentForm, email: e.target.value})} />
                                        <button type="submit" disabled={isOnboarding} className="w-full py-5 bg-sky-600 text-white font-black rounded-2xl shadow-lg flex items-center justify-center">
                                            {isOnboarding ? <Loader2 className="animate-spin" /> : 'Generate Account'}
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div className="text-center py-2">
                                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle size={32} />
                                    </div>
                                    <h3 className="text-2xl font-black mb-2">Account Ready</h3>
                                    <div className="space-y-3 my-8">
                                        <div className="bg-slate-50 p-4 rounded-2xl text-left border border-slate-100">
                                            <p className="text-[10px] font-black uppercase text-slate-400">Email</p>
                                            <p className="font-bold text-slate-700">{generatedCreds.email}</p>
                                        </div>
                                        <div className="bg-sky-50 p-4 rounded-2xl text-left border border-sky-100 flex justify-between items-center">
                                            <div>
                                                <p className="text-[10px] font-black uppercase text-sky-400">Password</p>
                                                <p className="font-mono font-bold text-sky-700 text-xl">{generatedCreds.password}</p>
                                            </div>
                                            <button onClick={() => copyToClipboard(generatedCreds.password)} className="p-2 text-sky-600 hover:bg-sky-100 rounded-lg">
                                                <Copy size={20} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <button onClick={sendWhatsApp} className="w-full py-5 bg-emerald-500 text-white font-black rounded-2xl flex items-center justify-center gap-3">
                                            <MessageCircle size={20} /> Send via WhatsApp
                                        </button>
                                        <button onClick={() => { setShowParentModal(false); setGeneratedCreds(null); setSelectedChildId(null); setParentForm({ name: '', phone: '', email: '' }); }} className="w-full py-4 text-slate-400 font-bold">
                                            Done
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

const SidebarLink = ({ icon, label, active, onClick }) => (
    <button onClick={onClick} className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all ${active ? 'bg-sky-600 text-white shadow-xl' : 'text-slate-400 hover:bg-slate-50'}`}>
        {icon} <span className="text-sm">{label}</span>
    </button>
);

export default DirectorDashboard;