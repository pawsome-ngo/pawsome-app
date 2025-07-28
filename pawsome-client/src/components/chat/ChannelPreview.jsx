import React from 'react';

export const ChannelPreview = ({ channel, onSelect, isActive }) => {
    return (
        <div onClick={onSelect} className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${isActive ? 'bg-indigo-50' : ''}`}>
            <div className="flex-shrink-0 mr-4"><div className="w-12 h-12 bg-indigo-200 rounded-full flex items-center justify-center"><span className="text-indigo-600 font-bold">{channel.name.charAt(0)}</span></div></div>
            <div className="flex-grow border-b border-gray-200 pb-3">
                <div className="flex justify-between"><h3 className="text-md font-semibold text-gray-800">{channel.name}</h3></div>
                <div className="flex justify-between items-center mt-1"><p className="text-sm text-gray-600 truncate w-4/5">No messages yet...</p></div>
            </div>
        </div>
    );
};