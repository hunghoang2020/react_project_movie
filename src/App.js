import 'swiper/swiper.min.css';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './App.scss';

import { BrowserRouter } from 'react-router-dom';

import Header from './component/header/Header';
import Footer from './component/footer/Footer';

import Routers from './config/Routers';

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routers />
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
