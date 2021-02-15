import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client';
import { Button, FormControl, InputGroup, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom'

export default function Chat({ id, name }) {

    const { room } = useParams();
    console.log(room);
    const messageRef = useRef();
    const socket = io('http://localhost:5000')
    const [messages, setMessages] = useState([]);


    function addMessageToChat(message) {
        if (message.room !== room) return
        setMessages(prevMessages => {
            return [...prevMessages, message]
        })
    }

    useEffect(() => {
        socket.emit('new-user', { id: id, name: name, room: room })
    }, [])

    useEffect(() => {
        if (socket) {
            socket.on('new-message', (data) => {
                addMessageToChat(data);
            })

            socket.on('user-joined', (data) => {
                if (data.room !== room) return
                const newUserMessage = { id: 'admin', message: data.message, room: room }
                addMessageToChat(newUserMessage)
            })

            return () => {
                socket.off('user-joined')
                socket.off('new-message');
            }
        }
    }, [socket])

    function sendMessage(e) {
        e.preventDefault();
        const message = { message: messageRef.current.value, id: id, name: name, room: room };
        socket.emit('send-message', message)
        messageRef.current.value = ''
        addMessageToChat(message);
    }

    return (
        <div >
            <div className="d-flex flex-column align-items-start justify-content-end px-3">
                {messages.map((message, index) => {
                    const text = `${message.id === id ? 'You' : message.name} : ${message.message}`;
                    return <div key={index} className={`rounded px-2 py-1 my-1 ${message.id !== id ? 'bg-primary text-white' : 'border align-self-end'}`}>{message.id === 'admin' ? message.message : text}</div>
                })}
            </div>
            <Form className='d-flex' onSubmit={sendMessage} style={{ position: 'fixed', right: 0, bottom: 0, width: '100vw' }}>
                <InputGroup className='mt-2'>
                    <FormControl as="textarea" required ref={messageRef} style={{ resize: 'none' }} />
                </InputGroup>
                <Button type='submit' className='mt-2'>Send</Button>
            </Form>
        </div>
    )
}
