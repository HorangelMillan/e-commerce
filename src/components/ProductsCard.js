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
                        <div onClick={() => navigate(`/shop/${product.id}`)}>
                            <img src={product.productImgs[0]} alt="" />
                        </div>
                        <div>
                            <b>{product.title}</b>
                            <div>
                                <div>
                                    <span>Price</span>
                                    <b>{product.price}</b>
                                </div>
                                <button onClick={() => dispatch(addProduct(product.id, 1))}><i className="fa-solid fa-cart-arrow-down"></i></button>
                            </div>
                        </div>
                    </div>
                ))

            }
        </div>
    );
};

export default ProductsCard;