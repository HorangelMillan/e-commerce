import React, { useEffect } from 'react';
import { getPurchases } from '../store/slices/purchases.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Purchases = () => {

    const navigate = useNavigate();

    const purchases = useSelector(state => state.purchases);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPurchases())
    }, []);

    return (
        <div>
            {
                purchases.map(purchase => (
                    <li key={purchase.id}>{purchase.cart.products.map(product => (
                        <div key={product.title} onClick={() => navigate(`/product/${product.id}`)}>
                            <h1>{product.title}</h1>
                        </div>
                    ))}</li>
                ))
            }
        </div>
    );
};

export default Purchases;