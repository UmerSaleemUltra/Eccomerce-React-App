import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

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

    return (
        <div className="container">
            <h1 className="title">Dashboard</h1>
            <div className="product-grid">
                {products.map(item => (
                    <div
                        key={item.id}
                        onClick={() => goToDetail(item)}
                        className="product-card"
                    >
                        <img src={item.image} alt={item.title} className="product-image" />
                        <h5 className="product-title">{item.title}</h5>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
