import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const PawIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" viewBox="0 0 20 20" fill="currentColor"><path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-7a.75.75 0 00-1.5 0v1.51a4.508 4.508 0 00-3.243 3.243H3.75a.75.75 0 000 1.5h1.51a4.508 4.508 0 003.243 3.243v1.51a.75.75 0 001.5 0v-1.51a4.508 4.508 0 003.243-3.243h1.51a.75.75 0 000-1.5h-1.51a4.508 4.508 0 00-3.243-3.243V3z" /><path fillRule="evenodd" d="M10 1a9 9 0 100 18 9 9 0 000-18zM9.25 11.5a.75.75 0 01.75-.75h.01a.75.75 0 010 1.5H10a.75.75 0 01-.75-.75zm1.5 2.5a.75.75 0 100-1.5.75.75 0 000 1.5zM10 5.25a.75.75 0 01.75.75v.01a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75zm-3.25 3a.75.75 0 10-1.5 0 .75.75 0 001.5 0z" clipRule="evenodd" /></svg> );

const Navbar = ({ setPage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { logout } = useAuth();

    const handleNavClick = (page) => {
        setPage(page);
        setIsOpen(false);
    };

    return (
        <nav className="bg-white shadow-md flex-shrink-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
                        <PawIcon />
                        <span className="ml-2 text-xl font-bold text-gray-800">Pawsome</span>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <button onClick={() => handleNavClick('home')} className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Home</button>
                            <button onClick={() => handleNavClick('profile')} className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Profile</button>
                            <button onClick={() => handleNavClick('chat')} className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Chat</button>
                            <button onClick={logout} className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Logout</button>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} type="button" className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            ) : (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <button onClick={() => handleNavClick('home')} className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 block w-full text-left px-3 py-2 rounded-md text-base font-medium">Home</button>
                        <button onClick={() => handleNavClick('profile')} className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 block w-full text-left px-3 py-2 rounded-md text-base font-medium">Profile</button>
                        <button onClick={() => handleNavClick('chat')} className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 block w-full text-left px-3 py-2 rounded-md text-base font-medium">Chat</button>
                        <button onClick={logout} className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 block w-full text-left px-3 py-2 rounded-md text-base font-medium">Logout</button>
                    </div>
                </div>
            )}
        </nav>
    );
};
export default Navbar;