import {BrowserRouter, Routes, Route } from 'react-router-dom'

//import logo from './logo.svg';
import './App.css';

import Page404 from './pages/404';
import MapView from './pages';
import LandingPage from './pages/landing';



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route index element={<LandingPage />} />
            <Route path='/' element={<LandingPage />} />
            <Route path='/demo' element={<MapView />} />
            <Route path='*' element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
