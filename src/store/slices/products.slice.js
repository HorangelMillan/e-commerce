import { createSlice } from '@reduxjs/toolkit';
import { getConfig } from '@testing-library/react';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';

export const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProducts: (state, action) => {
            return action.payload;
        }
    }
})

export const { setProducts } = productsSlice.actions;

export const getproducts = () => dispatch => {
    dispatch(setIsLoading(true));
    return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products')
        .then(res => dispatch(setProducts(res.data.data.products)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const productsFilter = (query) => dispatch => {
    dispatch(setIsLoading(true));
    return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/?query=${query}`)
        .then(res => dispatch(setProducts(res.data.data.products))).catch(error => console.log('este es el error' + JSON.stringify(error.response)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const getProductsByCategory = (id) => dispatch => {
    dispatch(setIsLoading(true));
    return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${id}`)
        .then(res => {
            dispatch(setProducts(res.data.data.products));
            console.log(res.data, 'hola');
        }).catch(error => console.log(error.response))
        .finally(() => dispatch(setIsLoading(false)));
}

export const getProductByCategoryMod = (categorieId) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories', getConfig())
        .then(res => {
            const finaly = res.data.data.categories;
            for (let i = 0; i < finaly.length; i++) {
                if (finaly[i].name === categorieId) {
                    dispatch(getProductsByCategory(finaly[i].id));
                };
            }
        })
        .finally(() => dispatch(setIsLoading(false)));
}

export default productsSlice.reducer;
