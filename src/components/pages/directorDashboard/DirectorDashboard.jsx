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
    useAddReportMutation,
    useUploadMediaMutation
} from '../../services/DirectorApi.js';
import toast from 'react-hot-toast';
import {
    LayoutDashboard, UserPlus, Boxes, LogOut, User, X,
    Loader2, CheckCircle, Copy, MessageCircle, Edit, Trash2,
    FileText, Plus, Package, Upload, Users, ClipboardList, TrendingUp, AlertTriangle
} from 'lucide-react';

const DirectorDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState('dashboard');
    const [selectedChildId, setSelectedChildId] = useState(null);
    const [showParentModal, setShowParentModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [generatedCreds, setGeneratedCreds] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const [childForm, setChildForm] = useState({ name: '', age: '', dateOfBirth: '', condition: 'Healthy', medicalHistory: 'None' });
    const [parentForm, setParentForm] = useState({ name: '', phone: '', email: '' });
    const [reportForm, setReportForm] = useState({ title: '', content: '', category: 'General' });
    const [inventoryForm, setInventoryForm] = useState({ itemName: '', category: '', quantity: '' });

    const { data: children = [] } = useGetAllChildrenQuery();
    const { data: inventory = [] } = useGetInventoryQuery();
    const [enrollChild] = useEnrollChildMutation();
    const [updateChild] = useUpdateChildMutation();
    const [removeChild, { isLoading: isDeleting }] = useRemoveChildMutation();
    const [onboardParent, { isLoading: isOnboarding }] = useOnboardParentMutation();
    const [addInventory] = useAddInventoryMutation();
    const [updateStock] = useUpdateStockMutation();
    const [addReport, { isLoading: isReporting }] = useAddReportMutation();
    const [uploadMedia] = useUploadMediaMutation();

    const stats = [
        { label: 'Total Children', value: children.length, icon: <Users size={24}/>, color: 'bg-indigo-500' },
        { label: 'Inventory Items', value: inventory.length, icon: <Boxes size={24}/>, color: 'bg-purple-500' },
        { label: 'Stock Levels', value: inventory.reduce((acc, item) => acc + parseInt(item.quantity || 0), 0), icon: <Package size={24}/>, color: 'bg-emerald-500' },
        { label: 'Status', value: 'Active', icon: <ClipboardList size={24}/>, color: 'bg-orange-500' },
    ];

    // --- PARENT ONBOARDING (FIXED WITH PASSWORD PAYLOAD) ---
    const handleOnboardParent = async (e) => {
        e.preventDefault();
        try {
            const response = await onboardParent({
                childId: selectedChildId,
                name: parentForm.name,
                email: parentForm.email,
                phoneNumber: parentForm.phone,
                password: "AUTO_GENERATED", // Added this to satisfy @NotBlank on Backend
                role: "PARENT"
            }).unwrap();
            setGeneratedCreds(response);
            toast.success("Parent linked!");
        } catch (err) {
            console.error("Payload sent:", { childId: selectedChildId, ...parentForm });
            toast.error(err?.data?.message || "Linking failed - check console");
        }
    };

    const sendWhatsApp = () => {
        if (!generatedCreds) return;
        const message = `Hello ${generatedCreds.name}, your account for El-Olam is ready.%0A%0AEmail: ${generatedCreds.email}%0APassword: ${generatedCreds.password}`;
        window.open(`https://wa.me/${parentForm.phone.replace(/\D/g, '')}?text=${message}`, '_blank');
    };

    // --- DELETE LOGIC ---
    const confirmDelete = async () => {
        try {
            await removeChild(selectedChildId).unwrap();
            toast.success("Child record deleted");
            setShowDeleteModal(false);
            setSelectedChildId(null);
        } catch (err) { toast.error("Failed to delete record"); }
    };

    // --- REMAINING HANDLERS ---
    const handleStockAdjustment = async (itemId) => {
        const newQty = prompt("Adjust stock by (e.g. 5 or -5):", "0");
        if (newQty && !isNaN(newQty)) {
            try {
                await updateStock({ itemId, quantity: newQty }).unwrap();
                toast.success("Stock updated");
            } catch (err) { toast.error("Update failed"); }
        }
    };

    const handleEnrollOrUpdate = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await updateChild({ childId: selectedChildId, ...childForm }).unwrap();
                toast.success("Updated!");
            } else {
                await enrollChild(childForm).unwrap();
                toast.success("Enrolled!");
            }
            setChildForm({ name: '', age: '', dateOfBirth: '', condition: 'Healthy', medicalHistory: 'None' });
            setIsEditing(false);
            setSelectedChildId(null);
        } catch (err) { toast.error("Error occurred"); }
    };

    const handleAddReportWithMedia = async (e) => {
        e.preventDefault();
        try {
            await addReport({ childId: selectedChildId, ...reportForm }).unwrap();
            if (selectedFile) {
                const formData = new FormData();
                formData.append('file', selectedFile);
                formData.append('childId', selectedChildId);
                formData.append('type', 'IMAGE');
                await uploadMedia(formData).unwrap();
            }
            toast.success("Report Shared!");
            setShowReportModal(false);
            setReportForm({ title: '', content: '', category: 'General' });
            setSelectedFile(null);
        } catch (err) { toast.error("Reporting failed"); }
    };

    return (
        <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
            <aside className="w-72 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 shadow-sm">
                <div className="p-8 flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black">EO</div>
                    <span className="font-bold text-slate-800 text-xl tracking-tight">El-Olam</span>
                </div>
                <nav className="flex-1 px-4 space-y-1">
                    <SidebarLink icon={<LayoutDashboard size={20}/>} label="Overview" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
                    <SidebarLink icon={<User size={20}/>} label="Registry" active={activeTab === 'children'} onClick={() => setActiveTab('children')} />
                    <SidebarLink icon={<Boxes size={20}/>} label="Inventory" active={activeTab === 'inventory'} onClick={() => setActiveTab('inventory')} />
                </nav>
                <div className="p-6 border-t">
                    <button onClick={() => { dispatch(logout()); navigate('/admin-login'); }} className="w-full flex items-center gap-3 text-slate-400 hover:text-red-500 font-bold p-3 transition-colors">
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            <main className="flex-1 overflow-x-hidden min-w-0">
                <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-5 sticky top-0 z-40">
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">{activeTab.toUpperCase()}</h2>
                </header>

                <div className="p-8 max-w-7xl mx-auto space-y-10">
                    {activeTab === 'dashboard' && (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {stats.map((s, i) => (
                                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
                                        <div className={`${s.color} p-4 rounded-2xl text-white shadow-lg`}>{s.icon}</div>
                                        <div>
                                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{s.label}</p>
                                            <p className="text-2xl font-black text-slate-800">{s.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm text-center">
                                <h3 className="text-3xl font-black text-slate-800">Director's Hub</h3>
                                <p className="text-slate-500 mt-2">Manage Student Registry and Resource Tracking.</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'children' && (
                        <div className="space-y-8">
                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                                <h3 className="text-xl font-black mb-6">{isEditing ? 'Update Profile' : 'Child Registration'}</h3>
                                <form onSubmit={handleEnrollOrUpdate} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <input required className="w-full p-4 rounded-2xl bg-slate-50 outline-none" placeholder="Full Name" value={childForm.name} onChange={(e) => setChildForm({...childForm, name: e.target.value})} />
                                    <input className="w-full p-4 rounded-2xl bg-slate-50 outline-none" placeholder="Age" value={childForm.age} onChange={(e) => setChildForm({...childForm, age: e.target.value})} />
                                    <input required type="date" className="w-full p-4 rounded-2xl bg-slate-50 outline-none" value={childForm.dateOfBirth} onChange={(e) => setChildForm({...childForm, dateOfBirth: e.target.value})} />
                                    <input className="w-full p-4 rounded-2xl bg-slate-50 outline-none font-bold text-indigo-600" placeholder="Condition" value={childForm.condition} onChange={(e) => setChildForm({...childForm, condition: e.target.value})} />
                                    <input className="lg:col-span-2 w-full p-4 rounded-2xl bg-slate-50 outline-none" placeholder="Medical History" value={childForm.medicalHistory} onChange={(e) => setChildForm({...childForm, medicalHistory: e.target.value})} />
                                    <button type="submit" className="lg:col-span-3 py-4 bg-slate-900 text-white font-black rounded-2xl">
                                        {isEditing ? 'Save Changes' : 'Enroll Student'}
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
                                        <tr key={child.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-8 py-5 font-bold text-slate-700">{child.name}</td>
                                            <td className="px-8 py-5 text-slate-500 text-xs">{child.condition}</td>
                                            <td className="px-8 py-5 text-right flex justify-end gap-3 items-center">
                                                <button onClick={() => {setIsEditing(true); setSelectedChildId(child.id); setChildForm(child);}} className="text-slate-400 hover:text-indigo-600"><Edit size={18}/></button>
                                                <button onClick={() => {setSelectedChildId(child.id); setShowDeleteModal(true);}} className="text-slate-400 hover:text-red-500"><Trash2 size={18}/></button>
                                                <button onClick={() => {setSelectedChildId(child.id); setShowReportModal(true);}} className="text-emerald-500 font-black text-[10px] bg-emerald-50 px-4 py-2 rounded-lg uppercase">Report</button>
                                                <button onClick={() => {setSelectedChildId(child.id); setShowParentModal(true);}} className="text-indigo-600 font-black text-[10px] bg-indigo-50 px-4 py-2 rounded-lg uppercase">Link Parent</button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'inventory' && (
                        <div className="space-y-8">
                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                                <h3 className="text-xl font-black mb-6">Inventory Entry</h3>
                                <form onSubmit={(e) => { e.preventDefault(); addInventory(inventoryForm); setInventoryForm({itemName:'', category:'', quantity:''}); }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <input required className="p-4 rounded-2xl bg-slate-50 outline-none" placeholder="Item Name" value={inventoryForm.itemName} onChange={(e)=>setInventoryForm({...inventoryForm, itemName: e.target.value})} />
                                    <input required className="p-4 rounded-2xl bg-slate-50 outline-none" placeholder="Category" value={inventoryForm.category} onChange={(e)=>setInventoryForm({...inventoryForm, category: e.target.value})} />
                                    <input required type="number" className="p-4 rounded-2xl bg-slate-50 outline-none" placeholder="Stock" value={inventoryForm.quantity} onChange={(e)=>setInventoryForm({...inventoryForm, quantity: e.target.value})} />
                                    <button className="md:col-span-3 py-4 bg-indigo-600 text-white font-black rounded-2xl">Register Stock</button>
                                </form>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {inventory.map((item) => (
                                    <div key={item.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                                        <div className="relative">
                                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{item.category}</p>
                                            <h4 className="text-xl font-black text-slate-800 mt-1">{item.itemName}</h4>
                                            <div className="mt-8 flex items-baseline gap-2">
                                                <span className="text-4xl font-black text-slate-900">{item.quantity}</span>
                                                <span className="text-slate-400 font-bold text-xs uppercase">Items</span>
                                            </div>
                                            <button onClick={() => handleStockAdjustment(item.id)} className="mt-6 w-full py-3 bg-slate-50 text-slate-600 text-xs font-black rounded-xl hover:bg-indigo-600 hover:text-white transition-all">Update Stock</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* DELETE MODAL */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[300] flex items-center justify-center p-4">
                        <div className="bg-white rounded-[2.5rem] w-full max-w-sm p-8 shadow-2xl text-center">
                            <AlertTriangle className="mx-auto text-red-500 mb-4" size={48} />
                            <h3 className="text-xl font-black text-slate-800">Confirm Deletion</h3>
                            <p className="text-slate-500 text-sm mt-2">Permanently remove this record? This cannot be undone.</p>
                            <div className="flex gap-3 mt-8">
                                <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-3 bg-slate-100 rounded-xl font-bold">Cancel</button>
                                <button onClick={confirmDelete} disabled={isDeleting} className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold flex justify-center">
                                    {isDeleting ? <Loader2 className="animate-spin" size={18}/> : 'Delete'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* PARENT MODAL */}
                {showParentModal && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                        <div className="bg-white rounded-[3rem] w-full max-w-md p-10 shadow-2xl relative">
                            {!generatedCreds ? (
                                <form onSubmit={handleOnboardParent} className="space-y-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-xl font-black">Link Parent</h3>
                                        <button type="button" onClick={() => setShowParentModal(false)}><X size={18}/></button>
                                    </div>
                                    <input required className="w-full p-4 rounded-2xl bg-slate-50 outline-none" placeholder="Parent Name" value={parentForm.name} onChange={(e)=>setParentForm({...parentForm, name: e.target.value})} />
                                    <input required className="w-full p-4 rounded-2xl bg-slate-50 outline-none" placeholder="Phone" value={parentForm.phone} onChange={(e)=>setParentForm({...parentForm, phone: e.target.value})} />
                                    <input required type="email" className="w-full p-4 rounded-2xl bg-slate-50 outline-none" placeholder="Email" value={parentForm.email} onChange={(e)=>setParentForm({...parentForm, email: e.target.value})} />
                                    <button type="submit" disabled={isOnboarding} className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl flex justify-center">
                                        {isOnboarding ? <Loader2 className="animate-spin" /> : 'Confirm & Link'}
                                    </button>
                                </form>
                            ) : (
                                <div className="text-center">
                                    <CheckCircle className="mx-auto text-emerald-500 mb-4" size={48} />
                                    <h3 className="text-xl font-black">Linked!</h3>
                                    <div className="bg-slate-50 p-6 rounded-3xl my-6 text-center">
                                        <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Generated Password</p>
                                        <p className="text-xl font-mono font-black text-indigo-600">{generatedCreds.password}</p>
                                    </div>
                                    <button onClick={sendWhatsApp} className="w-full py-4 bg-emerald-500 text-white font-black rounded-2xl flex items-center justify-center gap-2">
                                        <MessageCircle size={18}/> Send to Parent
                                    </button>
                                    <button onClick={()=>{setShowParentModal(false); setGeneratedCreds(null);}} className="w-full py-4 text-slate-400 font-bold">Close</button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* REPORT MODAL */}
                {showReportModal && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                        <div className="bg-white rounded-[3rem] w-full max-w-lg p-10 shadow-2xl relative">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-black">Daily Report</h3>
                                <button onClick={() => setShowReportModal(false)}><X size={18}/></button>
                            </div>
                            <form onSubmit={handleAddReportWithMedia} className="space-y-4">
                                <input required className="w-full p-4 rounded-2xl bg-slate-50 outline-none" placeholder="Title" value={reportForm.title} onChange={(e)=>setReportForm({...reportForm, title: e.target.value})} />
                                <textarea required className="w-full p-4 rounded-2xl bg-slate-50 outline-none min-h-[120px]" placeholder="Details..." value={reportForm.content} onChange={(e)=>setReportForm({...reportForm, content: e.target.value})} />
                                <label className="w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer bg-slate-50">
                                    <Upload className="text-slate-400 mb-2" size={24}/>
                                    <span className="text-xs font-bold text-slate-500">{selectedFile ? selectedFile.name : 'Attach Image'}</span>
                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} />
                                </label>
                                <button type="submit" disabled={isReporting} className="w-full py-5 bg-emerald-500 text-white font-black rounded-2xl flex justify-center">
                                    {isReporting ? <Loader2 className="animate-spin" /> : 'Publish Report'}
                                </button>
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
        {icon} <span className="text-sm">{label}</span>
    </button>
);

export default DirectorDashboard;