import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/productDetail.css';
import { addProduct } from '../store/slices/cart.slice';
import { getProductsByCategory } from '../store/slices/products.slice';


const ProductDetail = () => {

    const { id } = useParams();

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(0);

    const dispatch = useDispatch();
    const products = useSelector(state => state.products);

    useEffect(() => {
        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/${id}`)
            .then(res => {
                setProduct(res.data.data.product);
                dispatch(getProductsByCategory(res.data.data.product.category));
                console.log(res.data);
            });
    }, []);

    const addProductFromShop = () => {
        dispatch(addProduct(id, quantity))
        setQuantity(0);
    }

    return (
        <div className='product-detail'>
            <p>Home  <span>•</span>  <b>{product.title}</b></p>
            <div className='product'>
                <div className='product-image'>
                    <div className='preview'>
                        {
                            product.productImgs && (
                                <img src={product.productImgs[0]} alt="" />
                            )
                        }
                    </div>
                    <div className='galery'>
                        {
                            product.productImgs && product.productImgs.map(productImg => (
                                <div key={productImg}>
                                    <img src={productImg} alt="" />
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className='product-shop'>

                    <input type="number" onChange={e => setQuantity(e.target.value)} value={quantity}/>
                    <button onClick={() => addProductFromShop()}>Add to cart</button>

                </div>
            </div>

            <div className='product-similar'>
                        {console.log(products)}
            </div>
        </div>
    );
};

export default ProductDetail;