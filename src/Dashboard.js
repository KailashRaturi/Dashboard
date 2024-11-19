import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the form data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('age', age);
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Error submitting form');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Healthcare Dashboard
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          margin="normal"
        />
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFileChange}
          required
          style={{ marginTop: 10 }}
        />
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Submit
        </Button>
      </form>
      {message && (
        <Typography variant="body1" sx={{ marginTop: 2, color: 'green' }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default Dashboard;
