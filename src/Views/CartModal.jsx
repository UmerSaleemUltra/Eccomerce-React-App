import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../Store/Cartslice';
import {
  Modal,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Button,
} from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

const CartModal = ({ open, handleClose, cartItems }) => {
  const dispatch = useDispatch();

  const handleRemove = (productId) => {
    dispatch(removeFromCart({ id: productId }));
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Shopping Cart
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {cartItems.length === 0 ? (
          <Typography variant="body1">Your cart is empty.</Typography>
        ) : (
          cartItems.map((item) => (
            <Card sx={{ display: 'flex', mb: 2 }} key={item.id}>
              <CardMedia
                component="img"
                sx={{ width: 100 }}
                image={item.imageUrl}
                alt={item.title}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rs. {item.price} x {item.quantity}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total: Rs. {item.price * item.quantity}
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', p: 1 }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemove(item.id)}
                    sx={{ mr: 2 }}
                  >
                    Remove
                  </Button>
                </Box>
              </Box>
            </Card>
          ))
        )}

        <Divider sx={{ mt: 2, mb: 2 }} />
        <Button onClick={handleClose} color="primary" variant="outlined">
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default CartModal;
