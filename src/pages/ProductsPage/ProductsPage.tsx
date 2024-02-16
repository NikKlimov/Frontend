import "./ProductsPage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import ProductsList from "./ProductsList/ProductsList";
import ProductsFilters from "./ProductsFilters/ProductsFilters";

const ProductsPage = () => {

    const {is_moderator} = useAuth()

    return (
        <div className="products-wrapper">

            <ProductsFilters />

            {!is_moderator && <ProductsList />}

        </div>
    )
}

export default ProductsPage;