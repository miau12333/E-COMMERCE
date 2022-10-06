import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';


export const favoritesSlice = createSlice({
    name: 'Purchases',
    initialState: [],
    reducers: {
        setPurchases: (state, action) => {
            return action.payload
        }

    }
})

export const getPurchasesThunk= () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
        .get("https://ecommerce-api-react.herokuapp.com/api/v1/purchases", getConfig())
        .then((res) => dispatch(setPurchases(res.data.data.purchases)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setPurchases } = favoritesSlice.actions;

export default favoritesSlice.reducer;


