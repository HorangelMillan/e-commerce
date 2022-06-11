import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const ProductDetail = () => {

    const { id } = useParams();

    const [product, setProduct] = useState({});

    useEffect(() => {
        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/${id}`)
            .then(res => setProduct(res.data.data.product))
    }, []);

    return (
        <div>
            <h1>{product.title}</h1>
        </div>
    );
};

export default ProductDetail;