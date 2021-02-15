import React, { useRef } from 'react'
import { v4 as uuidV4 } from 'uuid';
import { Container, Button, Form } from 'react-bootstrap';

export default function Login({ setId, setName }) {

    const nameRef = useRef();

    function handleClick(e) {
        e.preventDefault();
        setName(nameRef.current.value);
        setId(uuidV4());
    }

    return (
        <Container style={{ height: '100vh' }} className='d-flex align-items-center'>
            <Form onSubmit={handleClick} className="w-100">
                <Form.Group>
                    <Form.Label>Enter Your Name</Form.Label>
                    <Form.Control type="text" ref={nameRef} required />
                </Form.Group>
                <Button type='submit'>Log In</Button>
            </Form>
        </Container>
    )
}
