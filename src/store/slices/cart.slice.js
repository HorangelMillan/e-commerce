import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../helpers/getConfig';
import { setIsLoading } from './isLoading.slice';

export const cartSlice = createSlice({
    name: 'Cart',
    initialState: {},
    reducers: {
        setCart: (state, action) => {
            return action.payload
        }
    }
})

export const { setCart } = cartSlice.actions;

export const getCart = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/cart', getConfig())
        .then(res => dispatch(setCart(res.data.data.cart)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const addProduct = (id, quantity) => (dispatch) => {
    dispatch(setIsLoading(true));

    const product = {
        id,
        quantity
    }

    return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', product, getConfig())
        .then(res => console.log(res.data))
        .catch(error => console.log(error.response.data))
        .finally(() => dispatch(setIsLoading(false)));
}

export default cartSlice.reducer;
