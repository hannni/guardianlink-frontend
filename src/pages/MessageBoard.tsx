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

    const handleSend = async () => {
        const token = localStorage.getItem('accessToken');

        try {
            // Step 1: Lookup user ID by username
            const lookupResponse = await axios.get(
                `http://localhost:8000/api/users/lookup/?username=${receiverUsername}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const receiverId = lookupResponse.data.id;

            // Step 2: Send message using user ID
            await axios.post('http://localhost:8000/api/messages/', {
                receiver: receiverId,
                content: newMessage
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert('Message sent!');
            setReceiverUsername('');
            setNewMessage('');
            window.location.reload();

        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                console.error('Message failed:', err.response?.data || err.message);
            } else {
                console.error('Unexpected error:', err);
            }
            alert('Failed to send message. Check username.');
        }
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
