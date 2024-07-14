import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import 'bootstrap/dist/css/bootstrap.min.css';

const Detail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product details:', error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const onBack = () => {
        navigate(-1);
    };

    // Inline styles
    const styles = {
        container: {
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '2rem',
            maxWidth: '800px',
            margin: '2rem auto',
        },
        button: {
            marginBottom: '2rem',
        },
        title: {
            marginBottom: '1rem',
            fontFamily: 'Roboto, sans-serif',
            color: '#333',
            textAlign: 'center',
        },
        image: {
            width: '100%',
            borderRadius: '8px',
            marginBottom: '1rem',
        },
        description: {
            marginBottom: '1rem',
            fontFamily: 'Roboto, sans-serif',
            color: '#555',
            textAlign: 'justify',
        },
        price: {
            fontFamily: 'Roboto, sans-serif',
            color: '#007bff',
            fontSize: '1.25rem',
            fontWeight: 'bold',
        },
        loadingContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        },
    };

    if (loading) {
        return (
            <Container style={styles.loadingContainer}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container style={styles.container}>
            <Button variant="contained" color="primary" onClick={onBack} style={styles.button}>
                Back
            </Button>
            <h1 style={styles.title}>{product.title}</h1>
            <img src={product.image} alt={product.title} style={styles.image} />
            <p style={styles.description}>{product.description}</p>
            <p style={styles.price}>Price: ${product.price}</p>
        </Container>
    );
};

export default Detail;
