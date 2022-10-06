import { useEffect, useState } from 'react'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import Login from './page/Login'
import Purchases from './page/Purchases'
import MyNav from './components/MyNav'
import LoadingScreen from './components/LoadingScreen'
import { useDispatch, useSelector } from 'react-redux'
import ProductDetail from './page/ProductDetail'
import { getNewProductsThunk } from './store/slice/newproducts.slice'
import { Container } from 'react-bootstrap'
import ProtectedRoutes from './components/ProtectedRoutes'
import Footer from './components/Footer'

function App() {

  const isLoading = useSelector(state => state.isLoading);
  const dispatch = useDispatch();

  useEffect(() => { 
    dispatch(getNewProductsThunk())
  }, [])

  return (
    <div className="App">
      <HashRouter>
        <MyNav />
        {isLoading && <LoadingScreen />}
        <Container className='mt-5'>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/productDetail/:id' element={<ProductDetail/>}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route element={<ProtectedRoutes />}>
            <Route path='/purchases' element={<Purchases/>}></Route>
            </Route>
          </Routes>
        </Container>
        <Footer />
      </HashRouter>
    </div>
  )
}

export default App
