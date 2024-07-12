import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Details.css';

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

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="detail-container">
            <button className="detail-button" onClick={onBack}>Back</button>
            <h1 className="detail-title">{product.title}</h1>
            <img className="detail-image" src={product.image} alt={product.title} />
            <p className="detail-description">{product.description}</p>
            <p className="detail-price">Price: ${product.price}</p>
        </div>
    );
};

export default Detail;
