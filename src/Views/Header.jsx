import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../../Store/ThemeSlice';
import { AppBar, Toolbar, IconButton, Badge, Box, Button, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartModal from './CartModal'; // Import the CartModal component

export default function Header() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  // Calculate total quantity of items in the cart
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCartClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AppBar position="static" color="default" sx={{ mb: 4 }}>
        <Toolbar>
          {/* Logo */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <img src="/path-to-logo.png" alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
            YourBrand
          </Typography>

          {/* Navigation Links */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexGrow: 1 }}>
            <Button   color="inherit" sx={{ textTransform: 'none' }}>
              Home
            </Button>
            <Button   color="inherit" sx={{ textTransform: 'none' }}>
              Products
            </Button>
            <Button  color="inherit" sx={{ textTransform: 'none' }}>
              About
            </Button>
            <Button   color="inherit" sx={{ textTransform: 'none' }}>
              Contact
            </Button>
          </Box>

          {/* Theme Selectors */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: 'red',
                cursor: 'pointer',
              }}
              onClick={() => dispatch(setTheme('red'))}
            ></div>
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: 'blue',
                cursor: 'pointer',
                marginLeft: '8px',
              }}
              onClick={() => dispatch(setTheme('blue'))}
            ></div>
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: 'green',
                cursor: 'pointer',
                marginLeft: '8px',
              }}
              onClick={() => dispatch(setTheme('green'))}
            ></div>
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: 'white',
                cursor: 'pointer',
                marginLeft: '8px',
              }}
              onClick={() => dispatch(setTheme('white'))}
            ></div>
          </Box>

          {/* Shopping Cart */}
          <IconButton color="inherit" onClick={handleCartClick}>
            <Badge badgeContent={totalItems} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Cart Modal */}
      <CartModal open={isModalOpen} handleClose={handleModalClose} cartItems={cart} />
    </>
  );
}
