import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';

export const purSideBarSlice = createSlice({
    name: 'purSideBar',
    initialState: [],
    reducers: {
        setCart: (state, action) =>{
            const products= action.payload;
            return products;
        }
    }
});

export const getPurSideBarThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
        .get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig()) 
        .then((res) => dispatch(setCart(res.data.data.cart.products)))
        .finally(() => dispatch(setIsLoading(false)));
};

export const addProductSideThunk = (add) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
        .post("https://ecommerce-api-react.herokuapp.com/api/v1/cart", add, getConfig())
        .then(() => dispatch(getPurSideBarThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}

export const purchaseCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/purchases", {}, getConfig())
        .then(() => dispatch(setCart([])))
        .finally(() => dispatch(setIsLoading(false)));
};

export const { setCart } = purSideBarSlice.actions;

export default purSideBarSlice.reducer;
