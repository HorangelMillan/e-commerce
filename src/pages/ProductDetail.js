import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/productDetail.css';
import { addProduct } from '../store/slices/cart.slice';
import { getProductByCategoryMod } from '../store/slices/products.slice';


const ProductDetail = () => {

    let imgNumber = -1;

    const { id } = useParams();

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(0);
    const [translate, setTranslate] = useState(0);
    const products = useSelector(state => state.products);

    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/${id}`)
            .then(res => {
                setProduct(res.data.data.product);
                dispatch(getProductByCategoryMod(res.data.data.product.category));
            });
    }, []);

    const addProductFromShop = () => {
        dispatch(addProduct(id, quantity));
        setQuantity(0);
    };

    const translateImg = (mod, limit) => {

        if (mod === 'next' && translate <= limit - 2) {
            setTranslate(translate + 1);
        } else if (mod === 'previous' && translate > 0) {
            setTranslate(translate - 1);
        };

    };

    return (
        <div className='product-detail'>
            <p>Home  <span>•</span>  <b>{product.title}</b></p>
            <div className='product'>
                <div className='product-image'>
                    <div className='preview'>
                        <button className='previous' onClick={() => translateImg('previous', product.productImgs.length)}>
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <ul>
                            {
                                product.productImgs && product.productImgs.map(productImg => (
                                    <li key={productImg} style={{ transform: `translateX(-${translate}00%)` }} onClick={() => setTranslate()}>
                                        <img src={productImg} alt="" />
                                    </li>
                                ))
                            }
                        </ul>
                        <button className='next' onClick={() => translateImg('next', product.productImgs.length)}>
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>
                    <div className='galery'>
                        {
                            product.productImgs && product.productImgs.map(productImg => {
                                imgNumber = imgNumber + 1
                                return (
                                    <div key={productImg} onClick={e => setTranslate(e.target.classList[0])}><img className={`${imgNumber}`} src={productImg} alt="" /></div>
                                );
                            })
                        }
                    </div>
                </div>

                <div className='product-shop'>

                    <h2>{product.title}</h2>
                    <p>{product.description}</p>

                    <input type="number" onChange={e => setQuantity(e.target.value)} value={quantity} />
                    <button onClick={() => addProductFromShop()}>Add to cart</button>

                </div>
            </div>

            <span>Similar products</span>

            <div className='product-similar'>
                {
                    products && products.map(product => (
                        <div key={product.id}>
                            <h1>{product.title}</h1>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ProductDetail;