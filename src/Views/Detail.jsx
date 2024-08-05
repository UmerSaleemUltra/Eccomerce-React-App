import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleProduct } from '../Confing/Firebase'; // Correct import path
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../Store/Cartslice';
import { Button, Card, CardContent, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import 'bootstrap/dist/css/bootstrap.min.css';

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Make sure the parameter matches your route setup
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // For handling errors
  const dispatch = useDispatch();

  const color = useSelector((state) => state.color); // Redux selector
  console.log('color', color);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getSingleProduct(id);
        console.log("Fetched Product:", productData); // Debugging log
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Failed to load product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const onBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="container my-4" style={{ textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" style={{ marginTop: '10px' }}>
          Loading...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-4" style={{ textAlign: 'center', color: 'red' }}>
        <Typography variant="h6">{error}</Typography>
      </div>
    );
  }

  return (
    <div className="container my-4" style={{ backgroundColor: color }}>
      <Button variant="outlined" color="primary" onClick={onBack}>
        Back
      </Button>

      <Card className="my-4">
        <CardContent>
          <Typography variant="h4" component="h2">
            {product.title || 'No Title Available'}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Rs. {product.price || 'N/A'}
          </Typography>
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.title || 'Product Image'}
              className="img-fluid my-3"
              style={{ maxWidth: '600px' }}
            />
          ) : (
            <Typography variant="body2" color="error">
              Image not available
            </Typography>
          )}
          <Typography variant="body1">
            {product.description || 'No Description Available'}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => dispatch(addToCart(product))}
            className="mt-3"
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Detail;
