// components/AddWorkout.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function AddWorkout({ show, handleClose, onWorkoutAdded }) {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://fitnessapp-api-ln8u.onrender.com/workouts/addWorkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name, duration, status: 'pending', dateAdded: new Date() })
      });

      if (!response.ok) throw new Error(`Error ${response.status}: ${await response.text()}`);

      setName(''); // ✅ Clear name field
      setDuration(''); // ✅ Clear duration field
      onWorkoutAdded(); // Refresh workouts
      handleClose();
    } catch (error) {
      console.error("Error adding workout:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Workout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>Workout Name</Form.Label>
            <Form.Control type='text' value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Duration (mins)</Form.Label>
            <Form.Control type='number' value={duration} onChange={(e) => setDuration(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>Close</Button>
        <Button variant='primary' onClick={handleSubmit}>Add Workout</Button>
      </Modal.Footer>
    </Modal>
  );
}
