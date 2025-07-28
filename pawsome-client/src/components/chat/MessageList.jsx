import React, { useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { MessageBubble } from './MessageBubble';

export const MessageList = ({ messages }) => {
    const { user } = useAuth();
    const messagesEndRef = useRef(null);
    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

    return (
        <div className="flex-grow p-4 overflow-y-auto">
            <div className="space-y-4">
                {messages.map((msg, index) => {
                    if (msg.type === 'JOIN' || msg.type === 'LEAVE') {
                        return (<div key={index} className="text-center text-xs text-gray-500 my-2">{msg.sender} {msg.type === 'JOIN' ? 'joined' : 'left'}</div>)
                    }
                    return <MessageBubble key={index} message={msg} isSender={user.username === msg.sender} />
                })}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
};