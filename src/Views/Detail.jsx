import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleProduct } from '../Confing/Firebase';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../Store/Cartslice'; // Import actions
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Container,
  Paper,
} from '@mui/material';

export default function Detail() {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();

  const themeColor = useSelector((state) => state.theme.color);
  const cartItems = useSelector((state) => state.cart.cart);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await getSingleProduct(params.id);
        setProduct(product);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchData();
  }, [params.id]);

  // Find the product in the cart
  const cartProduct = cartItems.find((item) => item.id === product.id);

  const onBack = () => {
    navigate(-1);
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Paper elevation={4} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box
          sx={{
            backgroundColor: themeColor,
            borderRadius: 2,
            p: 3,
            boxShadow: 3,
          }}
        >
          <Button
            onClick={onBack}
            variant="outlined"
            color="primary"
            sx={{ mb: 3 }}
          >
            Back
          </Button>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Card sx={{ borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  height="400"
                  image={product.imageUrl}
                  alt={product.title}
                  sx={{
                    borderRadius: 2,
                    objectFit: 'cover',
                    boxShadow: 2,
                  }}
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <CardContent>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ color: 'text.primary' }}
                >
                  {product.title}
                </Typography>
                <Typography
                  variant="h5"
                  color="textSecondary"
                  gutterBottom
                  sx={{ fontWeight: 'bold' }}
                >
                  Rs. {product.price}
                </Typography>
                <Typography variant="body1" paragraph>
                  {product.description}
                </Typography>

                {/* Display current quantity */}
                {cartProduct && (
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Quantity in Cart: {cartProduct.quantity}
                  </Typography>
                )}

                {/* Add to Cart Button */}
                <Button
                  onClick={() => dispatch(addToCart(product))}
                  variant="contained"
                  color="secondary"
                  sx={{
                    mt: 2,
                    fontWeight: 'bold',
                    paddingX: 3,
                    paddingY: 1,
                    mr: 1,
                  }}
                >
                  Add to Cart
                </Button>

                {/* Remove from Cart Button */}
                {cartProduct && (
                  <Button
                    onClick={() => dispatch(removeFromCart(product))}
                    variant="outlined"
                    color="error"
                    sx={{
                      mt: 2,
                      fontWeight: 'bold',
                      paddingX: 3,
                      paddingY: 1,
                    }}
                  >
                    Remove from Cart
                  </Button>
                )}
              </CardContent>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
