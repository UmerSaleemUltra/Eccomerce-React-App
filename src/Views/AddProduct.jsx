import { useState } from 'react';
import { addProduct } from '../Confing/Firebase';

export default function AddProduct() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const onSubmit = async () => {
    try {
      console.log('Adding product with details:', { title, description, price, image });
      await addProduct({ title, description, price, image });
      alert('Product added successfully!');
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <h2>Add Product Form</h2>
      <input
        value={title}
        placeholder="Title"
        onChange={e => setTitle(e.target.value)}
      />
      <input
        value={description}
        placeholder="Description"
        onChange={e => setDescription(e.target.value)}
      />
      <input
        value={price}
        placeholder="Price"
        onChange={e => setPrice(e.target.value)}
      />
      <input
        type="file"
        onChange={e => setImage(e.target.files[0])}
      />
      <br />
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}
