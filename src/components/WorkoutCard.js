import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function WorkoutCard({ workout, onDelete, onComplete }) {
  return (
    <Card className='mb-3'>
      <Card.Body>
        <Card.Title>{workout.name}</Card.Title>
        <Card.Text>Duration: {workout.duration} mins</Card.Text>
        <Card.Text>Status: {workout.status}</Card.Text>
        <Button variant='success' onClick={() => onComplete(workout._id)} disabled={workout.status === 'completed'}>
          Complete
        </Button>
        <Button variant='danger' className='ms-2' onClick={() => onDelete(workout._id)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}