import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProductsByCategory } from '../store/slices/products.slice';
import '../styles/filter.css';


const Filter = () => {

    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
            .then(res => setCategories(res.data.data.categories));
    }, []);

    const selectCategory = id => {
        dispatch(getProductsByCategory(id));
    };

    return (
        <div className='filter'>
            <ul>
                {
                    categories.map(category => (
                        <li key={category.id} onClick={() => selectCategory(category.id)}>
                            {category.name}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Filter;