import React, { useState } from 'react';
import { addProduct, auth } from '../Confing/Firebase';
import { Button, TextField, Box, Typography, Container, Grid, Paper } from '@mui/material';
import { useSelector } from 'react-redux';

export default function AddProduct() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const themeColor = useSelector((state) => state.theme.color);

  const onSubmit = async () => {
    try {
      if (!auth.currentUser) {
        alert('You must be logged in to add a product.');
        return;
      }

      setLoading(true);
      const productId = await addProduct({ title, description, price, image });
      alert(`Product added successfully with ID: ${productId}`);

      // Reset the form and set submitted state
      setTitle('');
      setDescription('');
      setPrice('');
      setImage(null);
      setSubmitted(true);
      setLoading(false);
    } catch (e) {
      console.error('Error adding product:', e);
      alert(e.message);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ backgroundColor: themeColor, minHeight: '100vh', py: 4, display: 'flex', justifyContent: 'center' }}>
      <Container maxWidth="sm">
        <Paper elevation={2} sx={{ p: 4, borderRadius: '8px' }}>
          <Typography variant="h5" component="h1" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', mb: 2 }}>
            Add New Product
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="title"
                label="Product Title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                label="Product Description"
                variant="outlined"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="price"
                label="Price (USD)"
                variant="outlined"
                fullWidth
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{ mt: 1, textTransform: 'none' }}
              >
                Upload Image
                <input
                  id="image"
                  type="file"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Button>
              {image && (
                <Typography variant="body2" sx={{ mt: 1, textAlign: 'center', color: 'text.secondary' }}>
                  {image.name}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={onSubmit}
              sx={{ textTransform: 'none' }}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Product'}
            </Button>
          </Box>
          {submitted && (
            <Typography variant="body1" sx={{ mt: 2, textAlign: 'center', color: 'green' }}>
              Product added successfully!
            </Typography>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

