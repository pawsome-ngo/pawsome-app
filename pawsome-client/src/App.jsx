import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import AuthForm from './components/AuthForm';
import Layout from './components/Layout';
import { HomePage, ProfilePage } from './pages/HomePage';
import { ChatPage } from './pages/ChatPage';

function App() {
    const { isAuthenticated, loading } = useAuth();
    const [page, setPage] = useState('home');

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    if (!isAuthenticated) {
        return <AuthForm />;
    }

    const renderPage = () => {
        switch (page) {
            case 'profile':
                return <ProfilePage />;
            case 'chat':
                return <ChatPage />;
            case 'home':
            default:
                return <HomePage />;
        }
    };

    return (
        <Layout setPage={setPage}>
            {renderPage()}
        </Layout>
    );
}
export default App;