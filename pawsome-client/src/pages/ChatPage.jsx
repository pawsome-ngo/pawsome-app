// =================================================================
// File: src/pages/ChatPage.jsx (MODIFIED)
// This version uses the Stomp.over() connection method, matching your working example.
// =================================================================
import React, { useState, useEffect, useRef } from 'react';
import { ChannelList } from '../components/chat/ChannelList';
import { ChatWindow } from '../components/chat/ChatWindow';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs'; // Using the older stompjs library directly

export const ChatPage = () => {
    const { user } = useAuth();
    const [channels, setChannels] = useState([]);
    const [activeChannel, setActiveChannel] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const stompClient = useRef(null);

    useEffect(() => {
        if (!user) { setLoading(false); return; }

        const setupChat = async () => {
            try {
                const response = await api.get('/chat/groups');
                setChannels(response.data);
                if (response.data.length > 0) {
                    setActiveChannel(response.data[0]);
                }
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch chat groups:", err);
                setError("Could not load chat groups.");
                setLoading(false);
            }
        };
        setupChat();

    }, [user]);

    useEffect(() => {
        if (!activeChannel) return;

        const socket = new SockJS('http://localhost:8080/ws');
        const client = Stomp.over(socket);
        stompClient.current = client;

        client.connect({}, (frame) => {
            console.log('SUCCESS: Connected to WebSocket:', frame);

            // Subscribe to the specific group topic
            client.subscribe(`/topic/chat/${activeChannel.id}`, (message) => {
                setMessages((prevMessages) => [...prevMessages, JSON.parse(message.body)]);
            });

            // Send a join message
            client.send(`/app/chat/${activeChannel.id}/addUser`, {}, JSON.stringify({
                sender: user.username,
                type: 'JOIN'
            }));

        }, (err) => {
            console.error('STOMP Error:', err);
            setError("Could not connect to chat. Please refresh the page.");
        });

        return () => {
            if (stompClient.current && stompClient.current.connected) {
                stompClient.current.disconnect();
            }
        };
    }, [activeChannel, user.username]);

    const sendMessage = (msgContent) => {
        if (msgContent && stompClient.current?.connected && activeChannel && user) {
            const chatMessage = { sender: user.username, content: msgContent, type: 'CHAT' };
            stompClient.current.send(`/app/chat/${activeChannel.id}/sendMessage`, {}, JSON.stringify(chatMessage));
        } else {
            console.error('Cannot send message, WebSocket is not connected.');
        }
    };

    if (loading) { return <div className="p-4 text-center">Loading chats...</div>; }
    if (error) { return <div className="p-4 text-center text-red-500">{error}</div>; }

    return (
        <div className="h-full flex">
            <div className={`w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 bg-white ${activeChannel && 'hidden md:flex'}`}>
                <ChannelList channels={channels} onSelectChannel={setActiveChannel} activeChannelId={activeChannel?.id} />
            </div>
            <div className={`w-full md:w-2/3 lg:w-3/4 bg-gray-50 ${!activeChannel && 'hidden md:flex'}`}>
                {activeChannel ? (
                    <ChatWindow channel={activeChannel} messages={messages} onSendMessage={sendMessage} onBack={() => setActiveChannel(null)} />
                ) : (
                    <div className="flex items-center justify-center h-full text-center p-4">
                        <p className="text-gray-500">You are not in any chat groups yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
