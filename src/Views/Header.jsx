import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../../Store/ThemeSlice'; // Make sure the path is correct
import { AppBar, Toolbar, IconButton, Badge, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Header() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  // Calculate total quantity of items in the cart
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AppBar position="static" color="default" sx={{ mb: 4 }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{ display: 'flex', gap: 1 }}
          >
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
              }}
              onClick={() => dispatch(setTheme('green'))}
            ></div>
          </Box>
        </Box>
        <IconButton color="inherit" sx={{ ml: 2 }}>
          <Badge badgeContent={totalItems} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
