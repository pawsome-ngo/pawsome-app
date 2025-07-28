import React, { useState } from 'react';

export const MessageInput = ({ onSendMessage }) => {
    const [text, setText] = useState('');
    const handleSubmit = (e) => { e.preventDefault(); if (text.trim() === '') return; onSendMessage(text); setText(''); };

    return (
        <div className="bg-white p-4 border-t border-gray-200 flex-shrink-0">
            <form onSubmit={handleSubmit} className="flex items-center space-x-4">
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message..." className="flex-grow bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <button type="submit" className="bg-indigo-500 text-white rounded-full p-2 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                </button>
            </form>
        </div>
    );
};