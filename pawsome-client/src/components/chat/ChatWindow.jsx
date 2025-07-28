import React from 'react';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';

export const ChatWindow = ({ channel, messages, onSendMessage, onBack }) => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center p-3 border-b border-gray-200 bg-white flex-shrink-0">
                <button onClick={onBack} className="md:hidden mr-4 text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg></button>
                <div className="w-10 h-10 bg-indigo-200 rounded-full flex items-center justify-center mr-3"><span className="text-indigo-600 font-bold">{channel.name.charAt(0)}</span></div>
                <h2 className="text-lg font-semibold text-gray-800">{channel.name}</h2>
            </div>
            <MessageList messages={messages} />
            <MessageInput onSendMessage={onSendMessage} />
        </div>
    );
};