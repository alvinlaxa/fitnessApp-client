// pages/Workouts.js
import React, { useState, useEffect, useContext } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import WorkoutCard from '../components/WorkoutCard';
import AddWorkout from './AddWorkout';
import UserContext from '../UserContext';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.id) {
      navigate('/login');
    }
  }, [user, navigate]);

  const fetchWorkouts = async () => {
    try {
      const response = await fetch('https://fitnessapp-api-ln8u.onrender.com/workouts/getMyWorkouts', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      const text = await response.text(); // Log raw text response
      console.log("Raw Workouts Response:", text);

      let data;
      try {
        data = JSON.parse(text); // Try parsing JSON
      } catch (error) {
        throw new Error("Invalid JSON response from server");
      }

      console.log("Parsed Workouts Data:", data);
      setWorkouts(data.workouts || []); // Ensure it's an array
    } catch (error) {
      console.error("Failed to fetch workouts:", error);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const deleteWorkout = async (id) => {
    try {
      const response = await fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/deleteWorkout/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      if (!response.ok) throw new Error(`Error ${response.status}: ${await response.text()}`);

      fetchWorkouts();
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  const completeWorkout = async (id) => {
    try {
      const response = await fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/completeWorkoutStatus/${id}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      if (!response.ok) throw new Error(`Error ${response.status}: ${await response.text()}`);

      fetchWorkouts();
    } catch (error) {
      console.error("Error completing workout:", error);
    }
  };

  return (
    <Container>
      <h1 className='my-4'>My Workouts</h1>
      <Button id='addWorkout' onClick={() => setShowModal(true)}>Add Workout</Button>
      
      {workouts && workouts.length > 0 ? (
        workouts.map((workout, index) => (
          <WorkoutCard key={index} workout={workout} onDelete={deleteWorkout} onComplete={completeWorkout} />
        ))
      ) : (
        <p>No workouts found. Start adding workouts!</p>
      )}

      <AddWorkout show={showModal} handleClose={() => setShowModal(false)} onWorkoutAdded={fetchWorkouts} />
    </Container>
  );
}
