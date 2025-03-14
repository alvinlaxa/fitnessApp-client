// pages/Home.js
import React, { useContext } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';

export default function Home() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <Container className='text-center mt-5'>
      <h1>Welcome to Zuitt Workouts</h1>
      <p>Your Workout Tracker!</p>
      {user.id ? (
        <Button variant='primary' onClick={() => navigate('/workouts')}>
          View My Workouts
        </Button>
      ) : (
        <Button variant='primary' onClick={() => navigate('/login')}>
          Login to get Started
        </Button>
      )}
    </Container>
  );
}