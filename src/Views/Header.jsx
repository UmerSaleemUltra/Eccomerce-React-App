// Header.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../Store/ThemeSlice';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  Box,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ColorLensIcon from '@mui/icons-material/ColorLens';

export default function Header() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const theme = useSelector((state) => state.theme);

  // Function to handle theme change
  const handleThemeChange = (color) => {
    dispatch(setTheme(color));
  };

  return (
    <AppBar position="static" style={{ backgroundColor: theme.color }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ShopName
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={() => handleThemeChange('red')}
            sx={{ color: 'red', marginRight: 1 }}
          >
            <ColorLensIcon />
          </IconButton>
          <IconButton
            onClick={() => handleThemeChange('blue')}
            sx={{ color: 'blue', marginRight: 1 }}
          >
            <ColorLensIcon />
          </IconButton>
          <IconButton
            onClick={() => handleThemeChange('green')}
            sx={{ color: 'green', marginRight: 1 }}
          >
            <ColorLensIcon />
          </IconButton>

          <IconButton color="inherit">
            <Badge badgeContent={cart.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
