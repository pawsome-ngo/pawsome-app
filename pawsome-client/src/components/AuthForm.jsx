import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ firstName: '', lastName: '', phoneNumber: '', username: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { login, signup } = useAuth();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            if (isLogin) {
                await login(formData.username, formData.password);
                setSuccess('Login successful!');
            } else {
                const { username, ...signupData } = formData;
                await signup(signupData);
                setSuccess(`Signup successful! Your username is "${formData.firstName.toLowerCase()}". Please log in.`);
                setIsLogin(true);
            }
        } catch (err) {
            const message = err.response?.data?.message || 'An error occurred. Please try again.';
            setError(message);
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setError('');
        setSuccess('');
        setFormData({ firstName: '', lastName: '', phoneNumber: '', username: '', password: '' });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md"><h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{isLogin ? 'Sign in to your account' : 'Create a new account'}</h2></div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <>
                                <div><label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label><div className="mt-1"><input id="firstName" name="firstName" type="text" required value={formData.firstName} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" /></div></div>
                                <div><label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label><div className="mt-1"><input id="lastName" name="lastName" type="text" required value={formData.lastName} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" /></div></div>
                                <div><label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label><div className="mt-1"><input id="phoneNumber" name="phoneNumber" type="tel" required value={formData.phoneNumber} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" /></div></div>
                            </>
                        )}
                        {isLogin && (
                            <div><label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label><div className="mt-1"><input id="username" name="username" type="text" required value={formData.username} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" /></div></div>
                        )}
                        <div><label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label><div className="mt-1"><input id="password" name="password" type="password" required value={formData.password} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" /></div></div>
                        {error && <p className="text-sm text-red-600">{error}</p>}
                        {success && <p className="text-sm text-green-600">{success}</p>}
                        <div><button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{isLogin ? 'Sign in' : 'Create account'}</button></div>
                    </form>
                    <div className="mt-6"><div className="relative"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div><div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or</span></div></div><div className="mt-6 text-center"><button onClick={toggleForm} className="font-medium text-indigo-600 hover:text-indigo-500">{isLogin ? 'create a new account' : 'sign in to your account'}</button></div></div>
                </div>
            </div>
        </div>
    );
};
export default AuthForm;