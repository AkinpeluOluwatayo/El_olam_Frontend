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
    useUploadMediaMutation
} from '../../services/DirectorApi.js';
import toast, { Toaster } from 'react-hot-toast';
import {
    LayoutDashboard, Boxes, LogOut, User, X,
    Loader2, CheckCircle, Edit, Trash2, Plus,
    Upload, Users, ClipboardList, AlertTriangle, Menu, Package
} from 'lucide-react';

const DirectorDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // --- UI State ---
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
    const [selectedFile, setSelectedFile] = useState(null);

    // --- Form States ---
    const [childForm, setChildForm] = useState({ name: '', age: '', dateOfBirth: '', condition: 'Healthy', medicalHistory: 'None' });
    const [parentForm, setParentForm] = useState({ name: '', phone: '', email: '' });
    const [reportForm, setReportForm] = useState({ title: '', content: '', category: 'General' });
    const [inventoryForm, setInventoryForm] = useState({ itemName: '', category: '', quantity: '' });

    // --- API Data ---
    const { data: children = [], isLoading: isFetchingChildren } = useGetAllChildrenQuery();
    const { data: inventory = [] } = useGetInventoryQuery();

    // --- Mutations ---
    const [enrollChild, { isLoading: isEnrolling }] = useEnrollChildMutation();
    const [updateChild, { isLoading: isUpdatingChild }] = useUpdateChildMutation();
    const [removeChild, { isLoading: isDeletingChild }] = useRemoveChildMutation();
    const [onboardParent, { isLoading: isOnboarding }] = useOnboardParentMutation();
    const [addInventory, { isLoading: isAddingInventory }] = useAddInventoryMutation();
    const [updateStock, { isLoading: isUpdatingStock }] = useUpdateStockMutation();
    const [removeInventory, { isLoading: isDeletingStock }] = useRemoveInventoryMutation();
    const [addReport, { isLoading: isReporting }] = useAddReportMutation();
    const [uploadMedia] = useUploadMediaMutation();

    const stats = [
        { label: 'Total Children', value: children.length, icon: <Users size={24}/>, color: 'bg-indigo-500' },
        { label: 'Inventory Items', value: inventory.length, icon: <Boxes size={24}/>, color: 'bg-purple-500' },
        { label: 'Stock Levels', value: inventory.reduce((acc, item) => acc + parseInt(item.quantity || 0), 0), icon: <Package size={24}/>, color: 'bg-emerald-500' },
        { label: 'Status', value: 'Active', icon: <ClipboardList size={24}/>, color: 'bg-orange-500' },
    ];

    // --- Logic Handlers ---

    const confirmDelete = async () => {
        try {
            if (deleteType === 'child') {
                await removeChild(selectedId).unwrap();
            } else {
                await removeInventory(selectedId).unwrap();
            }
            toast.success("Deleted successfully");
            setShowDeleteModal(false);
        } catch (err) {
            // Fix for the "Failed" toast when server returns non-JSON success
            if (err.status === 200 || err.status === 'PARSING_ERROR') {
                toast.success("Deleted successfully");
                setShowDeleteModal(false);
            } else {
                toast.error(err.data?.message || "Failed to delete");
            }
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
            if (isEditing) {
                await updateChild({ childId: selectedId, ...childForm }).unwrap();
                toast.success("Profile Updated!");
            } else {
                await enrollChild(childForm).unwrap();
                toast.success("Child Enrolled!");
            }
            setChildForm({ name: '', age: '', dateOfBirth: '', condition: 'Healthy', medicalHistory: 'None' });
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
            <aside className={`fixed inset-y-0 left-0 z-[101] w-72 bg-white border-r border-slate-200 flex flex-col h-full transition-transform duration-300 transform lg:sticky lg:top-0 lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg">EO</div>
                        <span className="font-bold text-slate-800 text-xl">El-Olam</span>
                    </div>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden p-2 text-slate-400"><X size={20} /></button>
                </div>
                <nav className="flex-1 px-4 space-y-1">
                    <SidebarLink icon={<LayoutDashboard size={20}/>} label="Overview" active={activeTab === 'dashboard'} onClick={() => {setActiveTab('dashboard'); setIsMobileMenuOpen(false);}} />
                    <SidebarLink icon={<User size={20}/>} label="Registry" active={activeTab === 'children'} onClick={() => {setActiveTab('children'); setIsMobileMenuOpen(false);}} />
                    <SidebarLink icon={<Boxes size={20}/>} label="Inventory" active={activeTab === 'inventory'} onClick={() => {setActiveTab('inventory'); setIsMobileMenuOpen(false);}} />
                </nav>
                <div className="p-6 border-t">
                    <button onClick={() => { dispatch(logout()); navigate('/admin-login'); }} className="w-full flex items-center gap-3 text-slate-400 hover:text-red-500 font-bold p-3 transition-colors">
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            <main className="flex-1 overflow-x-hidden min-w-0 w-full">
                <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 lg:px-8 py-5 sticky top-0 z-40 flex items-center gap-4">
                    <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-slate-600 bg-slate-100 rounded-lg"><Menu size={20} /></button>
                    <h2 className="text-lg lg:text-xl font-black text-slate-800 tracking-tight uppercase">{activeTab}</h2>
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
                            <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400">
                                    <tr><th className="px-8 py-5">Child</th><th className="px-8 py-5">Status</th><th className="px-8 py-5 text-right">Actions</th></tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                    {children.map((child) => (
                                        <tr key={child.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-8 py-5 font-bold text-slate-700">{child.name}</td>
                                            <td className="px-8 py-5"><span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-full uppercase">{child.condition}</span></td>
                                            <td className="px-8 py-5 text-right flex justify-end gap-2">
                                                <button onClick={() => {setIsEditing(true); setSelectedId(child.id); setChildForm(child);}} className="p-2 text-slate-300 hover:text-indigo-600"><Edit size={16}/></button>
                                                <button onClick={() => {setSelectedId(child.id); setDeleteType('child'); setShowDeleteModal(true);}} className="p-2 text-slate-300 hover:text-red-500"><Trash2 size={16}/></button>
                                                <button onClick={() => {setSelectedId(child.id); setShowReportModal(true);}} className="text-emerald-500 font-black text-[10px] bg-emerald-50 px-4 py-2 rounded-lg hover:bg-emerald-500 hover:text-white transition-all">Report</button>
                                                <button onClick={() => {setSelectedId(child.id); setShowParentModal(true);}} className="text-indigo-600 font-black text-[10px] bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-600 hover:text-white transition-all">Link Parent</button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'inventory' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <div className="bg-white p-6 lg:p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
                                <h3 className="text-xl font-black mb-6 flex items-center gap-2"><Plus size={20} className="text-indigo-600"/> Register New Asset</h3>
                                <form onSubmit={handleInventorySubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Item Name</label>
                                        <input required className="w-full p-4 rounded-2xl bg-slate-50 outline-none text-sm border border-transparent focus:border-indigo-500 transition-all" placeholder="e.g. Therapy Mats" value={inventoryForm.itemName} onChange={(e) => setInventoryForm({...inventoryForm, itemName: e.target.value})} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Category</label>
                                        <input required className="w-full p-4 rounded-2xl bg-slate-50 outline-none text-sm border border-transparent focus:border-indigo-500 transition-all" placeholder="e.g. Equipment" value={inventoryForm.category} onChange={(e) => setInventoryForm({...inventoryForm, category: e.target.value})} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Initial Quantity</label>
                                        <input required type="number" className="w-full p-4 rounded-2xl bg-slate-50 outline-none text-sm border border-transparent focus:border-indigo-500 transition-all" placeholder="0" value={inventoryForm.quantity} onChange={(e) => setInventoryForm({...inventoryForm, quantity: e.target.value})} />
                                    </div>
                                    <button type="submit" disabled={isAddingInventory} className="md:col-span-3 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                                        {isAddingInventory ? <Loader2 className="animate-spin"/> : "Add to Stock Registry"}
                                    </button>
                                </form>
                            </div>

                            <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                                    <tr><th className="px-8 py-5">Asset Details</th><th className="px-8 py-5">Category</th><th className="px-8 py-5">Current Stock</th><th className="px-8 py-5 text-right">Actions</th></tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                    {inventory.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-8 py-5 font-bold text-slate-800">{item.itemName}</td>
                                            <td className="px-8 py-5 text-slate-500 text-sm">{item.category}</td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-2">
                                                    <span className={`font-black text-lg ${item.quantity < 5 ? 'text-red-500' : 'text-slate-800'}`}>{item.quantity}</span>
                                                    {item.quantity < 5 && <span className="text-[8px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-black uppercase">Low Stock</span>}
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-right flex justify-end gap-3">
                                                <button onClick={() => {setSelectedId(item.id); setShowStockModal(true);}} className="text-emerald-600 font-black text-[10px] bg-emerald-50 px-4 py-2 rounded-lg hover:bg-emerald-600 hover:text-white transition-all uppercase">Update Stock</button>
                                                <button onClick={() => {setSelectedId(item.id); setDeleteType('inventory'); setShowDeleteModal(true);}} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                {/* --- Modals --- */}

                {/* Stock Modal */}
                {showStockModal && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[300] flex items-center justify-center p-4">
                        <div className="bg-white rounded-[2.5rem] w-full max-w-sm p-10 shadow-2xl relative">
                            <button onClick={() => setShowStockModal(false)} className="absolute top-6 right-6 text-slate-400"><X size={20}/></button>
                            <h3 className="text-xl font-black mb-6 text-center">Adjust Stock</h3>
                            <form onSubmit={handleStockSubmit} className="space-y-4">
                                <input required type="number" className="w-full p-4 rounded-2xl bg-slate-50 outline-none text-lg font-bold text-center border-2 border-emerald-100 focus:border-emerald-500" value={adjustmentValue} onChange={(e) => setAdjustmentValue(e.target.value)} placeholder="New total" />
                                <button type="submit" disabled={isUpdatingStock} className="w-full py-4 bg-emerald-500 text-white font-black rounded-2xl">Confirm Change</button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Delete Modal */}
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

                {/* Parent Modal */}
                {showParentModal && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                        <div className="bg-white rounded-[2.5rem] w-full max-w-md p-10 shadow-2xl relative">
                            {!generatedCreds ? (
                                <form onSubmit={handleOnboardParent} className="space-y-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-xl font-black">Link Parent</h3>
                                        <button type="button" onClick={() => setShowParentModal(false)}><X size={18}/></button>
                                    </div>
                                    <input required className="w-full p-4 rounded-2xl bg-slate-50 outline-none text-sm" placeholder="Name" value={parentForm.name} onChange={(e)=>setParentForm({...parentForm, name: e.target.value})} />
                                    <input required className="w-full p-4 rounded-2xl bg-slate-50 outline-none text-sm" placeholder="Phone" value={parentForm.phone} onChange={(e)=>setParentForm({...parentForm, phone: e.target.value})} />
                                    <input required type="email" className="w-full p-4 rounded-2xl bg-slate-50 outline-none text-sm" placeholder="Email" value={parentForm.email} onChange={(e)=>setParentForm({...parentForm, email: e.target.value})} />
                                    <button type="submit" disabled={isOnboarding} className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl disabled:opacity-50">Confirm & Link</button>
                                </form>
                            ) : (
                                <div className="text-center">
                                    <CheckCircle className="mx-auto text-emerald-500 mb-4" size={40} />
                                    <h3 className="text-lg font-black">Linked!</h3>
                                    <div className="bg-slate-50 p-6 rounded-3xl my-6">
                                        <p className="text-sm font-bold truncate">{generatedCreds.email}</p>
                                        <p className="text-xl font-mono font-black text-indigo-600">{generatedCreds.password}</p>
                                    </div>
                                    <button onClick={sendWhatsApp} className="w-full py-4 bg-emerald-500 text-white font-black rounded-2xl mb-2">WhatsApp Login</button>
                                    <button onClick={()=>{setShowParentModal(false); setGeneratedCreds(null);}} className="w-full py-4 text-slate-400 font-bold">Close</button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Report Modal */}
                {showReportModal && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                        <div className="bg-white rounded-[2rem] w-full max-w-lg p-10 shadow-2xl relative">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-black">Daily Report</h3>
                                <button onClick={() => setShowReportModal(false)}><X size={18}/></button>
                            </div>
                            <form onSubmit={handleAddReportWithMedia} className="space-y-4">
                                <input required className="w-full p-4 rounded-2xl bg-slate-50 outline-none text-sm" placeholder="Title" value={reportForm.title} onChange={(e)=>setReportForm({...reportForm, title: e.target.value})} />
                                <textarea required className="w-full p-4 rounded-2xl bg-slate-50 outline-none min-h-[120px] text-sm" placeholder="Observations..." value={reportForm.content} onChange={(e)=>setReportForm({...reportForm, content: e.target.value})} />
                                <input className="w-full p-4 rounded-2xl bg-slate-50 outline-none text-sm" placeholder="Category" value={reportForm.category} onChange={(e)=>setReportForm({...reportForm, category: e.target.value})} />
                                <label className="w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer bg-slate-50 hover:bg-white transition-all">
                                    <Upload className="text-slate-400 mb-2" size={20}/>
                                    <span className="text-xs font-bold text-slate-500">{selectedFile ? selectedFile.name : 'Attach Image'}</span>
                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} />
                                </label>
                                <button type="submit" disabled={isReporting} className="w-full py-5 bg-emerald-500 text-white font-black rounded-2xl disabled:opacity-50">Publish Report</button>
                            </form>
                        </div>
                    </div>
                )}
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