import React, { useState } from 'react';
import { addProduct, auth } from '../Confing/Firebase';
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AddProduct() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const onSubmit = async () => {
    try {
      if (!auth.currentUser) {
        alert('You must be logged in to add a product.');
        return;
      }

      console.log('Adding product with details:', { title, description, price, image });
      const productId = await addProduct({ title, description, price, image });
      alert(`Product added successfully with ID: ${productId}`);
      // Reset the form
      setTitle('');
      setDescription('');
      setPrice('');
      setImage(null);
    } catch (e) {
      console.error('Error adding product:', e);
      alert(e.message);
    }
  };

  const goback = () =>{
  Navigate('/productcard')
  }

  return (
    <div className="container mt-5">
      <h2>Add Product Form</h2>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          className="form-control"
          value={title}
          placeholder="Title"
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          className="form-control"
          value={description}
          placeholder="Description"
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          className="form-control"
          value={price}
          placeholder="Price"
          onChange={e => setPrice(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="file"
          className="form-control"
          onChange={e => setImage(e.target.files[0])}
        />
      </div>
      <br />
      <Button variant="contained" color="primary" onClick={onSubmit}>Submit</Button>
      <Button variant="contained" color="primary">See Product</Button>

    </div>
  );
}
