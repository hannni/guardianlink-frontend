import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Message {
    id: number;
    sender_username: string;
    receiver_username: string;
    content: string;
    timestamp: string;
    receiver: number;
}

const MessageBoard: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [receiverUsername, setReceiverUsername] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        axios.get('http://localhost:8000/api/messages/', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => setMessages(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleSend = () => {
        const token = localStorage.getItem('accessToken');
        axios.post('http://localhost:8000/api/messages/', {
            content: newMessage,
            receiver: receiverUsername
        }, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(() => {
            setNewMessage('');
            setReceiverUsername('');
            window.location.reload();
        }).catch(err => console.error(err));
    };

    return (
        <div>
            <h2>Your Inbox</h2>
            <ul>
                {messages.map(msg => (
                    <li key={msg.id}>
                        <strong>From:</strong> {msg.sender_username}<br />
                        <strong>Message:</strong> {msg.content}<br />
                        <strong>Time:</strong> {new Date(msg.timestamp).toLocaleString()}
                        <hr />
                    </li>
                ))}
            </ul>

            <h3>Send New Message</h3>
            <input
                type="text"
                placeholder="Receiver Username"
                value={receiverUsername}
                onChange={e => setReceiverUsername(e.target.value)}
            />
            <br />
            <textarea
                rows={4}
                placeholder="Message content"
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
            />
            <br />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default MessageBoard;
