import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { getProducts } from '../Confing/Firebase';
import { Box, Grid, Card, CardMedia, CardContent, CardActionArea, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Confing/Firebase'; 

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { email } = location.state || {}; 
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null); 
    const themeColor = useSelector(state => state.theme.color);
    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                navigate('/login'); 
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    useEffect(() => {
        if (user) {
            const fetchProducts = async () => {
                try {
                    const firebaseProducts = await getProducts();
                    setProducts(firebaseProducts);
                } catch (error) {
                    setError('Failed to load products. Please try again later.');
                } finally {
                    setLoading(false);
                }
            };

            fetchProducts();
        }
    }, [user]);

    const goToDetail = (item) => {
        navigate(`/detail/${item.id}`);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login'); 
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <Box sx={{ backgroundColor: themeColor, minHeight: '100vh', py: 5 }}>
            <Container maxWidth="lg" sx={{ backgroundColor: '#f5f5f5', borderRadius: '16px', p: 4, boxShadow: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#333' }}>
                        Dashboard
                    </Typography>

                    <h5 className='text-center text-black'>Welcome {user?.email}</h5>


                    <Button variant="contained" color="primary" onClick={handleLogout}>
                        Logout
                    </Button>
                </Box>
                <Divider sx={{ mb: 4 }} />
                <Box display="flex" justifyContent="center" mb={4}>
                    <Button variant="contained" color="secondary" component={Link} to="/AddProduct">
                        Add Product
                    </Button>
                </Box>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Typography variant="body1" color="error" align="center">
                        {error}
                    </Typography>
                ) : (
                    <Grid container spacing={4}>
                        {products.map((item) => (
                            <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        transition: 'transform 0.3s, box-shadow 0.3s',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
                                        },
                                        borderRadius: '16px',
                                        overflow: 'hidden',
                                    }}
                                    onClick={() => goToDetail(item)}
                                >
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="180"
                                            image={item.imageUrl || item.image}
                                            alt={item.title}
                                            sx={{ objectFit: 'cover' }}
                                        />
                                        <CardContent sx={{ textAlign: 'center' }}>
                                            <Typography
                                                variant="h6"
                                                component="div"
                                                sx={{
                                                    fontWeight: 'bold',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" mt={1}>
                                                {item.description ? item.description.substring(0, 60) + '...' : 'No description available.'}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    );
};

export default Dashboard;
