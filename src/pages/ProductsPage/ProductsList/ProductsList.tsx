import "./ProductsList.sass"
import {useEffect} from "react";
import ProductCard from "../../../components/ProductCard/ProductCard";
import {useProducts} from "../../../hooks/products/useProducts";

const ProductsList = () => {

    const {products, fetchProducts} = useProducts()

    useEffect(() => {
        fetchProducts()
    }, [])

    const cards = products.map(product  => (
        <ProductCard product={product} key={product.id}/>
    ))

    return (
        <div className="products-list">

            { cards }

        </div>
    )
}

export default ProductsList;