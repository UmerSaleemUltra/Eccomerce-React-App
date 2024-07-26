import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { getProducts } from '../Confing/Firebase';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { email } = location.state || {}; // Extract email from state
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const firebaseProducts = await getProducts();
                console.log('Firebase Products:', firebaseProducts);
                setProducts(firebaseProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Failed to load products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const goToDetail = (item) => {
        navigate(`/detail/${item.id}`);
    };

    const styles = {
        container: {
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '2rem',
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%',
        },
        title: {
            textAlign: 'center',
            marginBottom: '2rem',
            fontFamily: 'Roboto, sans-serif',
            color: '#333',
        },
        buttonGroup: {
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '2rem',
        },
        productGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '50px',
        },
        productCard: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            padding: '1rem',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
            height: '400px',
            overflow: 'hidden',
            textAlign: 'center',
        },
        productCardHover: {
            transform: 'scale(1.05)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
        },
        productImage: {
            width: 'auto',
            maxHeight: '200px',
            borderRadius: '8px',
            objectFit: 'cover',
            marginBottom: '1rem',
        },
        productTitle: {
            marginTop: 'auto',
            fontSize: '1rem',
            color: '#333',
            height: '3rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            marginBottom: '1rem',
        },
        loading: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '400px',
        },
        error: {
            color: 'red',
            textAlign: 'center',
        },
    };

    return (
        <Container style={styles.container}>
            <h1 style={styles.title}>Dashboard</h1>
            {email && <Typography variant="h6" align="center">Welcome, {email}!</Typography>}
            <div style={styles.buttonGroup}>
                <Button variant="contained" color="secondary" component={Link} to="/addproduct">
                    Add Product
                </Button>
            </div>

            {loading ? (
                <div style={styles.loading}>
                    <CircularProgress />
                </div>
            ) : error ? (
                <Typography variant="body1" style={styles.error}>
                    {error}
                </Typography>
            ) : (
                <div style={styles.productGrid}>
                    {products.map(item => (
                        <div
                            key={item.id}
                            onClick={() => goToDetail(item)}
                            style={styles.productCard}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = styles.productCardHover.transform;
                                e.currentTarget.style.boxShadow = styles.productCardHover.boxShadow;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'none';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <img src={item.imageUrl || item.image} alt={item.title} style={styles.productImage} />
                            <h5 style={styles.productTitle}>{item.title}</h5>
                        </div>
                    ))}
                </div>
            )}
        </Container>
    );
};

export default Dashboard;
