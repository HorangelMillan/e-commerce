import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Home, Login, ProductDetail, Purchases } from './pages/index'
import './App.css';
import { Container } from "react-bootstrap";
import { Footer, LoadingScreen, Navbar } from "./components";
import { useSelector } from 'react-redux';
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {

  const isLoading = useSelector(state => state.isLoading)

  return (
    <div className="App">

      <HashRouter>
        <Navbar />
        <Container>
          {isLoading && <LoadingScreen />}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/shop/:id' element={<ProductDetail />} />
            
            <Route element={<ProtectedRoutes />}>
              <Route path='/purchase' element={<Purchases />} />
            </Route>
            
          </Routes>
        </Container>
        <Footer/>
      </HashRouter>
    </div>
  );
}

export default App;
