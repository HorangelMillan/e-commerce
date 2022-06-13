import React, { useEffect, useState } from 'react';
import { deleteProduct, getCart } from '../store/slices/cart.slice';
import { useDispatch, useSelector } from 'react-redux';
import { purchase } from '../store/slices/purchases.slice';
import { useNavigate } from 'react-router-dom';
import '../styles/sidebar.css';

const Sidebar = ({ handleShow, showSidebar }) => {

    const cart = useSelector(state => state.cart);
    const [total, setTotal] = useState(0)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            dispatch(getCart());
        };
    }, []);

    const purchaseRedirect = () => {
        dispatch(purchase());
        navigate('/purchase');
    };

    return (
        <div className={`sidebar ${handleShow && 'show'}`}>
            <button onClick={showSidebar}>X</button>
            <h3>Shopping Cart</h3>
            <div>
                <ul>
                    {
                        cart.products && cart.products.map(product => (
                            <li key={product.id} onLoad={() => setTotal(total + product.price * product.productsInCart.quantity)}>
                                <p>{product.brand}</p>
                                <b>{product.title}</b>
                                <div>
                                    <span>{product.productsInCart.quantity}</span>
                                    <button onClick={() => dispatch(deleteProduct(product.id))}><i className="fa-solid fa-trash"></i></button>
                                </div>
                                <p>Total: <b>$ {product.price * product.productsInCart.quantity}</b></p>
                            </li>
                        ))
                    }
                </ul>
                <div>
                    <h6>Total: <p>${}</p></h6>
                    <button onClick={() => purchaseRedirect()}>Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;