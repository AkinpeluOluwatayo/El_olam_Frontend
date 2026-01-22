import React, { useState } from 'react';
import { Lock, Loader2, Mail } from 'lucide-react';
import { useCeoLoginMutation, useDirectorLoginMutation } from '../../../services/AuthApi.js';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../services/slices/UserSlice.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // Import toast

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ceoLogin, { isLoading: isCeoLoading }] = useCeoLoginMutation();
    const [directorLogin, { isLoading: isDirLoading }] = useDirectorLoginMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const loadingToast = toast.loading('Verifying Admin Credentials...');

        try {
            let userData;

            // Attempt CEO login first
            try {
                userData = await ceoLogin({ email, password }).unwrap();
            } catch (ceoErr) {
                // If CEO fails, immediately attempt Director login
                userData = await directorLogin({ email, password }).unwrap();
            }

            // Success Handling
            dispatch(setCredentials(userData));
            toast.success(`Welcome, ${userData.role} Access Granted`, { id: loadingToast });

            // Route based on role
            if (userData.role === 'CEO') {
                navigate('/ceo/dashboard');
            } else if (userData.role === 'DIRECTOR') {
                navigate('/director/dashboard');
            }

        } catch (err) {
            const errorMsg = 'Unauthorized: Invalid Admin Credentials';
            setError(errorMsg);
            toast.error(errorMsg, { id: loadingToast });
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
             style={{ backgroundImage: `url('/images/backgroundImage.jpeg')` }}>

            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"></div>

            <div className="relative z-10 w-full max-w-md p-8 mx-4 bg-white/95 backdrop-blur-md rounded-[2.5rem] shadow-2xl border border-white/20 text-center">
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center p-3 shadow-lg">
                        <img
                            src="/images/elolamLogo.png"
                            alt="Logo"
                            className="w-full h-full object-contain"
                            onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/3063/3063176.png' }}
                        />
                    </div>
                </div>

                <h1 className="text-4xl font-semibold text-slate-800 mb-2 tracking-tight">ADMIN LOGIN</h1>
                <p className="text-sky-600 font-bold text-xs uppercase tracking-widest mb-10">Authorized Personnel</p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Admin Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-6 py-4 bg-white border-2 border-slate-200 rounded-full text-slate-700 focus:outline-none focus:border-sky-500 transition-all placeholder:text-slate-400"
                        />
                        <Mail className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-6 py-4 bg-white border-2 border-slate-200 rounded-full text-slate-700 focus:outline-none focus:border-sky-500 transition-all placeholder:text-slate-400"
                        />
                        <Lock className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                    </div>

                    {error && <p className="text-red-500 text-sm font-bold animate-pulse">{error}</p>}

                    <button
                        type="submit"
                        disabled={isCeoLoading || isDirLoading}
                        className="w-full mt-6 py-4 bg-slate-800 hover:bg-sky-600 text-white font-bold text-lg rounded-full shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center"
                    >
                        {isCeoLoading || isDirLoading ? (
                            <Loader2 className="animate-spin mr-2" />
                        ) : (
                            'Enter Portal'
                        )}
                    </button>

                    <div className="mt-6">
                        <a href="#" className="text-slate-400 hover:text-sky-600 text-sm font-medium transition-colors">
                            Secure Encrypted Access
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;