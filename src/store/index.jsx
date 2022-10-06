import { configureStore } from '@reduxjs/toolkit'
import  favoritesSlice  from './slice/favorites.slice'
import isLoadingSlice from './slice/isLoading.slice'
import  newproductsSlice  from './slice/newproducts.slice'
import purSideBarSlice  from './slice/purSideBar.slice'

export default configureStore({
    reducer: {
        isLoading: isLoadingSlice,
        newProducts: newproductsSlice,
        favorites: favoritesSlice,
        purSideBar: purSideBarSlice
    }
})
