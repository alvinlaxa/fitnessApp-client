// pages/Login.js
import { useState, useContext } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Navigate } from 'react-router-dom'; 
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Login() {
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(true);

  const retrieveUserDetails = (token) => {
    fetch(`https://fitnessapp-api-ln8u.onrender.com/users/details`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      if (data.user) {
        setUser({ id: data.user._id, isAdmin: data.user.isAdmin });
      } else {
        console.error("Error retrieving user details", data);
      }
    })
    .catch(error => console.error("Fetch error: ", error));
  };

  async function authenticate(e) {
    e.preventDefault();

    try {
      const response = await fetch(`https://fitnessapp-api-ln8u.onrender.com/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const text = await response.text(); // Read raw text response
      console.log("Raw Login Response:", text); // ✅ Debugging line

      let data;
      try {
        data = JSON.parse(text); // Attempt to parse JSON
      } catch (error) {
        throw new Error("Invalid JSON response from server");
      }

      console.log("Parsed Login Response:", data); // ✅ Debugging line

      if (response.ok && data.access) {
        localStorage.setItem('token', data.access);
        retrieveUserDetails(data.access);
        Swal.fire({ title: 'Login Successful', icon: 'success', text: 'Welcome!' });
      } else {
        Swal.fire({ title: 'Error', text: data.error || 'Login failed. Please check your credentials.', icon: 'error' });
      }
    } catch (error) {
      Swal.fire({ title: 'Error', text: error.message || 'Server error. Please try again later.', icon: 'error' });
    }
  }

  return (
    user.id !== null ?
      <Navigate to="/workouts" />
      :
      <Container>
        <h1>Login</h1>
        <Form onSubmit={authenticate}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>
          <Button type='submit'>Log In</Button>
        </Form>
      </Container>
  );
}
