import React, { useEffect } from 'react';
import { getPurchases } from '../store/slices/purchases.slice';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/purchases.css';

const Purchases = () => {

    const purchases = useSelector(state => state.purchases);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPurchases())
    }, []);

    return (
        <div className='purchases'>
            {
                purchases.map(purchase => (
                    <li key={purchase.id}>
                        {purchase.cart.products.map(product => (
                            <div key={product.title} className="purchase-card">
                                <p>{product.title}</p>
                                
                            </div>
                        ))}
                    </li>
                ))
            }
        </div>
    );
};

export default Purchases;