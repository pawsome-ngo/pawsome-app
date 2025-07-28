import React from 'react';
import { ChannelPreview } from './ChannelPreview';

export const ChannelList = ({ channels, onSelectChannel, activeChannelId }) => {
    return (
        <div className="w-full flex flex-col h-full">
            <div className="p-4 border-b border-gray-200 flex-shrink-0"><h2 className="text-xl font-bold text-gray-800">Chats</h2></div>
            <div className="flex-grow overflow-y-auto">
                {channels.map(channel => (<ChannelPreview key={channel.id} channel={channel} onSelect={() => onSelectChannel(channel)} isActive={channel.id === activeChannelId} />))}
            </div>
        </div>
    );
};