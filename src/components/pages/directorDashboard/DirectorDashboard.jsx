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
    useGetInventoryQuery,
    useAddInventoryMutation,
    useUpdateStockMutation,
    useRemoveInventoryMutation,
    useAddReportMutation,
} from '../../services/DirectorApi.js';
import toast, { Toaster } from 'react-hot-toast';
import {
    LayoutDashboard, Boxes, LogOut, User, X,
    Loader2, CheckCircle, Edit, Trash2, Plus,
    Users, ClipboardList, AlertTriangle, Menu, Package, ArrowLeft
} from 'lucide-react';

const DirectorDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState('dashboard');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [deleteType, setDeleteType] = useState(null);
    const [showParentModal, setShowParentModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showStockModal, setShowStockModal] = useState(false);
    const [adjustmentValue, setAdjustmentValue] = useState('');
    const [generatedCreds, setGeneratedCreds] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [childForm, setChildForm] = useState({ name: '', age: '', dateOfBirth: '', condition: '', medicalHistory: '' });
    const [parentForm, setParentForm] = useState({ name: '', phone: '', email: '' });
    const [reportForm, setReportForm] = useState({ title: '', content: '', category: '' });
    const [inventoryForm, setInventoryForm] = useState({ itemName: '', category: '', quantity: '' });

    const { data: children = [] } = useGetAllChildrenQuery();
    const { data: inventory = [] } = useGetInventoryQuery();

    const [enrollChild, { isLoading: isEnrolling }] = useEnrollChildMutation();
    const [updateChild, { isLoading: isUpdatingChild }] = useUpdateChildMutation();
    const [removeChild] = useRemoveChildMutation();
    const [onboardParent, { isLoading: isOnboarding }] = useOnboardParentMutation();
    const [addInventory, { isLoading: isAddingInventory }] = useAddInventoryMutation();
    const [updateStock, { isLoading: isUpdatingStock }] = useUpdateStockMutation();
    const [removeInventory] = useRemoveInventoryMutation();
    const [addReport, { isLoading: isReporting }] = useAddReportMutation();

    const stats = [
        { label: 'Total Children', value: children.length, icon: <Users size={24}/>, color: 'bg-indigo-500' },
        { label: 'Inventory Items', value: inventory.length, icon: <Boxes size={24}/>, color: 'bg-purple-500' },
        { label: 'Stock Levels', value: inventory.reduce((acc, item) => acc + parseInt(item.quantity || 0), 0), icon: <Package size={24}/>, color: 'bg-emerald-500' },
        { label: 'Status', value: 'Active', icon: <ClipboardList size={24}/>, color: 'bg-orange-500' },
    ];

    const confirmDelete = async () => {
        try {
            if (deleteType === 'child') await removeChild(selectedId).unwrap();
            else await removeInventory(selectedId).unwrap();
            toast.success("Deleted successfully");
            setShowDeleteModal(false);
        } catch (err) {
            toast.error("Failed to delete");
        }
    };

    const handleInventorySubmit = async (e) => {
        e.preventDefault();
        try {
            await addInventory(inventoryForm).unwrap();
            toast.success("Item Added!");
            setInventoryForm({ itemName: '', category: '', quantity: '' });
        } catch (err) { toast.error("Failed to add item"); }
    };

    const handleStockSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateStock({ itemId: selectedId, quantity: adjustmentValue }).unwrap();
            toast.success("Stock Updated!");
            setShowStockModal(false);
            setAdjustmentValue('');
        } catch (err) { toast.error("Update failed"); }
    };

    const handleEnrollOrUpdate = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) await updateChild({ childId: selectedId, ...childForm }).unwrap();
            else await enrollChild(childForm).unwrap();
            toast.success(isEditing ? "Profile Updated!" : "Child Enrolled!");
            setChildForm({ name: '', age: '', dateOfBirth: '', condition: '', medicalHistory: '' });
            setIsEditing(false);
        } catch (err) { toast.error("Operation failed"); }
    };

    const handleOnboardParent = async (e) => {
        e.preventDefault();
        try {
            const response = await onboardParent({
                childId: selectedId,
                name: parentForm.name,
                email: parentForm.email,
                phoneNumber: parentForm.phone,
                password: "AUTO_GENERATED",
                role: "PARENT"
            }).unwrap();
            setGeneratedCreds(response);
            toast.success("Parent linked!");
        } catch (err) { toast.error("Linking failed"); }
    };

    const handleAddReportWithMedia = async (e) => {
        e.preventDefault();
        try {
            await addReport({ childId: selectedId, milestones: reportForm.title, observations: reportForm.content, therapyNotes: reportForm.category, date: new Date().toISOString().split('T')[0] }).unwrap();
            toast.success("Report Published!");
            setShowReportModal(false);
        } catch (err) { toast.error("Failed"); }
    };

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        navigate('/');
    };

    const sendWhatsApp = () => {
        if (!generatedCreds) return;
        const message = `Hello ${generatedCreds.name}, your account for El-Olam is ready.%0A%0AEmail: ${generatedCreds.email}%0APassword: ${generatedCreds.password}`;
        window.open(`https://wa.me/${parentForm.phone.replace(/\D/g, '')}?text=${message}`, '_blank');
    };

    return (
        <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
            <Toaster position="top-right" />
            {isMobileMenuOpen && <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-[101] w-72 bg-white border-r border-slate-200 flex flex-col h-screen transition-transform duration-300 transform lg:sticky lg:top-0 lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg">EO</div>
                        <span className="font-bold text-slate-800 text-xl">El-Olam</span>
                    </div>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden p-2 text-slate-400"><X size={20} /></button>
                </div>

                <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                    <SidebarLink icon={<LayoutDashboard size={20}/>} label="Overview" active={activeTab === 'dashboard'} onClick={() => {setActiveTab('dashboard'); setIsMobileMenuOpen(false);}} />
                    <SidebarLink icon={<User size={20}/>} label="Registry" active={activeTab === 'children'} onClick={() => {setActiveTab('children'); setIsMobileMenuOpen(false);}} />
                    <SidebarLink icon={<Boxes size={20}/>} label="Inventory" active={activeTab === 'inventory'} onClick={() => {setActiveTab('inventory'); setIsMobileMenuOpen(false);}} />
                </nav>

                <div className="mt-auto p-6 border-t bg-white">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 text-slate-500 hover:text-red-500 font-bold p-3 rounded-2xl hover:bg-red-50 transition-all duration-300">
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            <main className="flex-1 overflow-x-hidden min-w-0 w-full">
                <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 lg:px-8 py-5 sticky top-0 z-40 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-slate-600 bg-slate-100 rounded-lg"><Menu size={20} /></button>
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-600 px-4 py-2 rounded-xl transition-all duration-300 group font-bold text-xs uppercase tracking-wider shadow-sm"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            <span>Go Back</span>
                        </button>
                    </div>
                    <div className="text-right">
                        <h1 className="text-lg lg:text-xl font-black text-slate-900 uppercase tracking-tight">{activeTab}</h1>
                    </div>
                </header>

                <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 lg:space-y-10">
                    {activeTab === 'dashboard' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                            {stats.map((s, i) => (
                                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
                                    <div className={`${s.color} p-4 rounded-2xl text-white shadow-lg`}>{s.icon}</div>
                                    <div>
                                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{s.label}</p>
                                        <p className="text-xl lg:text-2xl font-black text-slate-800">{s.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'children' && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                                <h3 className="text-lg lg:text-xl font-black mb-6">{isEditing ? 'Update Profile' : 'Child Registration'}</h3>
                                <form onSubmit={handleEnrollOrUpdate} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
                                    <input required className="w-full p-4 rounded-2xl bg-slate-50 outline-none text-sm" placeholder="Full Name" value={childForm.name} onChange={(e) => setChildForm({...childForm, name: e.target.value})} />
                                    <input className="w-full p-4 rounded-2xl bg-slate-50 outline-none text-sm" placeholder="Age" value={childForm.age} onChange={(e) => setChildForm({...childForm, age: e.target.value})} />
                                    <input required type="date" className="w-full p-4 rounded-2xl bg-slate-50 outline-none text-sm" value={childForm.dateOfBirth} onChange={(e) => setChildForm({...childForm, dateOfBirth: e.target.value})} />
                                    <input className="w-full p-4 rounded-2xl bg-slate-50 outline-none font-bold text-indigo-600 text-sm" placeholder="Condition" value={childForm.condition} onChange={(e) => setChildForm({...childForm, condition: e.target.value})} />
                                    <input className="sm:col-span-2 w-full p-4 rounded-2xl bg-slate-50 outline-none text-sm" placeholder="Medical History" value={childForm.medicalHistory} onChange={(e) => setChildForm({...childForm, medicalHistory: e.target.value})} />
                                    <button type="submit" disabled={isEnrolling || isUpdatingChild} className="sm:col-span-2 md:col-span-3 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-colors disabled:opacity-50">
                                        {isEnrolling || isUpdatingChild ? 'Processing...' : isEditing ? 'Save Changes' : 'Enroll Student'}
                                    </button>
                                </form>
                            </div>

                            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                                <div className="overflow-x-auto scrollbar-hide">
                                    <table className="w-full text-left min-w-[600px]">
                                        <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400">
                                        <tr><th className="px-8 py-5">Child</th><th className="px-8 py-5">Status</th><th className="px-8 py-5 text-right">Actions</th></tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                        {children.map((child) => (
                                            <tr key={child.id} className="hover:bg-slate-50/50 transition-colors group">
                                                <td className="px-8 py-5 font-bold text-slate-700 whitespace-nowrap">{child.name}</td>
                                                <td className="px-8 py-5"><span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-full uppercase">{child.condition}</span></td>
                                                <td className="px-8 py-5 text-right flex justify-end gap-2 min-w-[300px]">
                                                    <button onClick={() => {setIsEditing(true); setSelectedId(child.id); setChildForm(child);}} className="p-2 text-slate-300 hover:text-indigo-600"><Edit size={16}/></button>
                                                    {/* Added Title for Testing */}
                                                    <button title="delete-button" onClick={() => {setSelectedId(child.id); setDeleteType('child'); setShowDeleteModal(true);}} className="p-2 text-slate-300 hover:text-red-500"><Trash2 size={16}/></button>
                                                    <button onClick={() => {setSelectedId(child.id); setShowReportModal(true);}} className="text-emerald-500 font-black text-[10px] bg-emerald-50 px-4 py-2 rounded-lg hover:bg-emerald-500 hover:text-white transition-all">Report</button>
                                                    <button onClick={() => {setSelectedId(child.id); setShowParentModal(true);}} className="text-indigo-600 font-black text-[10px] bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-600 hover:text-white transition-all">Link Parent</button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'inventory' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <div className="bg-white p-6 lg:p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
                                <h3 className="text-xl font-black mb-6 flex items-center gap-2"><Plus size={20} className="text-indigo-600"/> Register New Asset</h3>
                                <form onSubmit={handleInventorySubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <input required className="w-full p-4 rounded-2xl bg-slate-50 outline-none text-sm" placeholder="Item Name" value={inventoryForm.itemName} onChange={(e) => setInventoryForm({...inventoryForm, itemName: e.target.value})} />
                                    <input required className="w-full p-4 rounded-2xl bg-slate-50 outline-none text-sm" placeholder="Category" value={inventoryForm.category} onChange={(e) => setInventoryForm({...inventoryForm, category: e.target.value})} />
                                    <input required type="number" className="w-full p-4 rounded-2xl bg-slate-50 outline-none text-sm" placeholder="Initial Quantity" value={inventoryForm.quantity} onChange={(e) => setInventoryForm({...inventoryForm, quantity: e.target.value})} />
                                    <button type="submit" disabled={isAddingInventory} className="md:col-span-3 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                                        {isAddingInventory ? <Loader2 className="animate-spin"/> : "Add to Stock Registry"}
                                    </button>
                                </form>
                            </div>

                            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                                <div className="overflow-x-auto scrollbar-hide">
                                    <table className="w-full text-left min-w-[600px]">
                                        <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                                        <tr><th className="px-8 py-5">Asset Details</th><th className="px-8 py-5">Category</th><th className="px-8 py-5">Current Stock</th><th className="px-8 py-5 text-right">Actions</th></tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                        {inventory.map((item) => (
                                            <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                                                <td className="px-8 py-5 font-bold text-slate-800 whitespace-nowrap">{item.itemName}</td>
                                                <td className="px-8 py-5 text-slate-500 text-sm whitespace-nowrap">{item.category}</td>
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`font-black text-lg ${item.quantity < 5 ? 'text-red-500' : 'text-slate-800'}`}>{item.quantity}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 text-right flex justify-end gap-3 min-w-[200px]">
                                                    <button onClick={() => {setSelectedId(item.id); setShowStockModal(true);}} className="text-emerald-600 font-black text-[10px] bg-emerald-50 px-4 py-2 rounded-lg hover:bg-emerald-600 hover:text-white transition-all uppercase">Update</button>
                                                    {/* Added Title for Testing */}
                                                    <button title="delete-button" onClick={() => {setSelectedId(item.id); setDeleteType('inventory'); setShowDeleteModal(true);}} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Modals remain the same as your source */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[300] flex items-center justify-center p-4">
                        <div className="bg-white rounded-[2.5rem] w-full max-w-sm p-10 shadow-2xl text-center">
                            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6 mx-auto"><AlertTriangle size={32} /></div>
                            <h3 className="text-xl font-black mb-2">Delete Record?</h3>
                            <p className="text-slate-500 text-sm mb-8">This action is permanent.</p>
                            <div className="flex gap-4">
                                <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-4 bg-slate-100 rounded-2xl font-bold">Cancel</button>
                                <button onClick={confirmDelete} className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-black">Delete</button>
                            </div>
                        </div>
                    </div>
                )}
                {/* ... other modals (Parent, Report, Stock) ... */}
            </main>
        </div>
    );
};

const SidebarLink = ({ icon, label, active, onClick }) => (
    <button onClick={onClick} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${active ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50 hover:text-indigo-600'}`}>
        {icon} <span className="text-sm tracking-tight">{label}</span>
    </button>
);

export default DirectorDashboard;