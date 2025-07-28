import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children, setPage }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar setPage={setPage} />
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 h-full">
                    {children}
                </div>
            </main>
        </div>
    );
};
export default Layout;