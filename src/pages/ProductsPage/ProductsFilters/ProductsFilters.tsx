import "./ProductsFilters.sass"
import SearchBar from "../../../components/SearchBar/SearchBar";
import {useProducts} from "../../../hooks/products/useProducts";

const ProductsFilters = () => {

    const {query, setQuery, fetchProducts} = useProducts()

    const handleSubmit = () => fetchProducts()

    return (
        <div className="products-filters">

            <h2>Поиск деклараций</h2>

            <SearchBar query={query} setQuery={setQuery} onSubmit={handleSubmit} />

        </div>
    )
}

export default ProductsFilters