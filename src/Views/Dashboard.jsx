import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => setProducts(json))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const goToDetail = (item) => {
        navigate(`/detail/${item.id}`);
    };

    // Inline styles
    const styles = {
        container: {
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '2rem',
            maxWidth: '1200px',
            margin: '0 auto',
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
            gap: '1.5rem',
        },
        productCard: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            padding: '1rem',
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            height: '300px',
        },
        productCardHover: {
            transform: 'scale(1.05)',
        },
        productImage: {
            width: 'auto',
            maxHeight: '150px',
            borderRadius: '8px',
            objectFit: 'cover',
        },
        productTitle: {
            marginTop: '1rem',
            fontSize: '1rem',
            color: '#333',
            textAlign: 'center',
        },
    };

    return (
        <Container style={styles.container}>
            <h1 style={styles.title}>Dashboard</h1>
            <div style={styles.buttonGroup}>
                <Button variant="contained" color="primary" component={Link} to="/login">
                    Login
                </Button>
                <Button variant="contained" color="secondary" component={Link} to="/signup">
                    Signup
                </Button>
            </div>

            <div style={styles.productGrid}>
                {products.map(item => (
                    <div
                        key={item.id}
                        onClick={() => goToDetail(item)}
                        style={styles.productCard}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = styles.productCardHover.transform)}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
                    >
                        <img src={item.image} alt={item.title} style={styles.productImage} />
                        <h5 style={styles.productTitle}>{item.title}</h5>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default Dashboard;
