// pages/Register.js
import React, { useState } from 'react';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://fitnessapp-api-ln8u.onrender.com/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const text = await response.text();
      console.log('Raw API Response:', text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (error) {
        throw new Error('Invalid JSON response from server');
      }

      console.log('Parsed API Response:', data);

      if (response.ok && data.message && data.message.includes('Registered')) {
        Swal.fire({ title: 'Success', text: 'Registered successfully!', icon: 'success' });
        navigate('/login');
      } else {
        let errorMessage = data.error || 'Registration failed.';
        if (response.status === 400) {
          errorMessage = 'Invalid email or password.';
        } else if (response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        }
        Swal.fire({ title: 'Error', text: errorMessage, icon: 'error' });
      }
    } catch (error) {
      console.error('Registration Error:', error);
      Swal.fire({
        title: 'Error',
        text: error.message || 'Server error. Please try again later.',
        icon: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <h1>Register</h1>
      <Form onSubmit={handleRegister}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              Registering... <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            </>
          ) : (
            'Register'
          )}
        </Button>
      </Form>
    </Container>
  );
}