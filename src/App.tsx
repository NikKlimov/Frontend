import "./styles/main.sass"
import "./styles/reset.sass"
import { useState } from 'react'
import Header from "./components/Header/Header";
import {Product} from "./utils/types";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import ProductPage from "./pages/ProductPage/ProductPage";
import ProductsList from "./pages/ProductsList/ProductsList";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {

    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined)

    return (
        <BrowserRouter basename="/customer">

            <div className="App">

                <div className="wrapper">

                    <Header />

                    <div className="content-wrapper">

                        <Breadcrumbs selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct}/>

                        <Routes>

                            <Route path="/" element={<Navigate to="/products" replace />} />

                            <Route path="/profile" element={<ProfilePage />} />

                            <Route path="/products" element={<ProductsList />} />

                            <Route path="/products/:id" element={<ProductPage selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />} />

                        </Routes>

                    </div>

                </div>

            </div>

        </BrowserRouter>
    )
}

export default App
