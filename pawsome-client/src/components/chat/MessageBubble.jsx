import React from 'react';

export const MessageBubble = ({ message, isSender }) => {
    const bubbleClasses = isSender ? 'bg-indigo-500 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none';
    const containerClasses = isSender ? 'justify-end' : 'justify-start';

    return (
        <div className={`flex items-end ${containerClasses}`}>
            <div className={`px-4 py-2 rounded-lg max-w-xs md:max-w-md shadow ${bubbleClasses}`}>
                {!isSender && <p className="text-xs font-bold text-indigo-500 mb-1">{message.sender}</p>}
                <p className="text-sm">{message.content}</p>
            </div>
        </div>
    );
};
