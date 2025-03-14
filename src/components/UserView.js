import React, { useContext } from 'react';
import { Container, Card } from 'react-bootstrap';
import UserContext from '../UserContext';

export default function UserView() {
  const { user } = useContext(UserContext);

  return (
    <Container className='mt-5'>
      <h1>User Profile</h1>
      {user.id ? (
        <Card className='p-3'>
          <Card.Body>
            <Card.Title>Welcome, User</Card.Title>
            <Card.Text>User ID: {user.id}</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </Container>
  );
}
