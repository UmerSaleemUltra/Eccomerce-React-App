import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleProduct } from '../Confing/Firebase';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../Store/Cartslice';
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
  Chip,
  Divider,
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
      <Paper elevation={6} sx={{ borderRadius: 6, overflow: 'hidden' }}>
        <Box
          sx={{
            background: `linear-gradient(135deg, ${themeColor} 30%, #ffffff 100%)`,
            p: 4,
            position: 'relative',
          }}
        >
          <Button
            onClick={onBack}
            variant="contained"
            color="primary"
            sx={{
              mb: 3,
              fontWeight: 'bold',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
              borderRadius: '20px',
            }}
          >
            Back
          </Button>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  boxShadow: 6,
                  borderRadius: 4,
                  overflow: 'hidden',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="400"
                  image={product.imageUrl}
                  alt={product.title}
                  sx={{ objectFit: 'cover' }}
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <CardContent sx={{ p: 0 }}>
                <Typography
                  variant="h3"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    color: 'text.primary',
                    mb: 2,
                    letterSpacing: '0.5px',
                  }}
                >
                  {product.title}
                </Typography>
                <Chip
                  label={`Rs. ${product.price}`}
                  color="secondary"
                  sx={{
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    mb: 3,
                    backgroundColor: '#1976d2',
                    color: '#fff',
                    px: 2,
                  }}
                />
                <Typography variant="body1" paragraph sx={{ mb: 4, lineHeight: 1.7 }}>
                  {product.description}
                </Typography>

                {cartProduct && (
                  <Chip
                    label={`In Cart: ${cartProduct.quantity}`}
                    color="primary"
                    sx={{
                      mb: 3,
                      fontWeight: 'bold',
                      backgroundColor: '#43a047',
                      color: '#fff',
                      px: 2,
                    }}
                  />
                )}

                <Divider sx={{ my: 3 }} />

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    onClick={() => dispatch(addToCart(product))}
                    variant="contained"
                    sx={{
                      backgroundColor: '#43a047',
                      color: '#fff',
                      fontWeight: 'bold',
                      paddingX: 3,
                      paddingY: 1,
                      borderRadius: '20px',
                      flexGrow: 1,
                      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                      '&:hover': {
                        backgroundColor: '#388e3c',
                      },
                    }}
                  >
                    Add to Cart
                  </Button>

                  {cartProduct && (
                    <Button
                      onClick={() => dispatch(removeFromCart(product))}
                      variant="outlined"
                      sx={{
                        borderColor: '#d32f2f',
                        color: '#d32f2f',
                        fontWeight: 'bold',
                        paddingX: 3,
                        paddingY: 1,
                        borderRadius: '20px',
                        flexGrow: 1,
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                        '&:hover': {
                          backgroundColor: '#ffebee',
                        },
                      }}
                    >
                      Remove from Cart
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
