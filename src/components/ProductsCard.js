import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getproducts } from '../store/slices/products.slice';
import { addProduct } from '../store/slices/cart.slice';
import '../styles/productsCard.css';

const ProductsCard = () => {

    const products = useSelector(state => state.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getproducts());
    }, []);

    return (
        <div className='productsCard'>
            {
                products.map(product => (
                    <div key={product.title}>
                        <img src={product.productImgs[0]} alt="" onClick={() => navigate(`/product/${product.id}`)} />
                        <p>{product.title}</p>
                        <button onClick={() => dispatch(addProduct(product.id, 1))}>Add</button>
                    </div>
                ))

            }
        </div>
    );
};

export default ProductsCard;