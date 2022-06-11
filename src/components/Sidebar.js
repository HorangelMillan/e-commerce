import React, { useEffect } from 'react';
import { getCart } from '../store/slices/cart.slice';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/sidebar.css';

const Sidebar = ({ handleShow, showSidebar }) => {

    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getCart());
    }, []);

    return (
        <div className={`sidebar ${handleShow && 'show'}`}>
            <button onClick={showSidebar}>X</button>
            <ul>
                {
                    cart.products && cart.products.map(product => (
                        <li key={product.id}>
                            <h1>{product.title}</h1>
                        </li>

                    ))
                }
            </ul>
        </div>
    );
};

export default Sidebar;