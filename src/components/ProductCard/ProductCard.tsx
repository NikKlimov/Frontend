import "./ProductCard.sass"
import {Product} from "../../utils/types";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/users/useAuth";
import {useOrder} from "../../hooks/orders/useOrder";
import CustomButton from "../CustomButton/CustomButton";
import {variables} from "../../utils/consts";
import {useProducts} from "../../hooks/products/useProducts";

const ProductCard = ({ product, refetch }: {product:Product}) => {

    const {is_authenticated, is_moderator} = useAuth()

    const {is_draft, addProductToOrder, deleteProductFromOrder} = useOrder()

    const {deleteProduct} = useProducts()

    const {searchProducts} = useProducts()

    const handleAddProduct = async (e) => {
        e.preventDefault()
        await addProductToOrder(product)
        await searchProducts()
    }

    const handleDeleteProductFromOrder = async (e) => {
        e.preventDefault()
        await deleteProductFromOrder(product)
    }

    const handleDeleteProduct = async () => {
        await deleteProduct(product)
        refetch()
    }

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={product.image}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {product.name} </h3>

                </div>

                <div className="content-bottom">

                    {!is_moderator &&
                        <Link to={`/products/${product.id}`}>
                            <CustomButton bg={variables.primary}>
                                Подробнее
                            </CustomButton>
                        </Link>
                    }

                    {is_authenticated && is_moderator && location.pathname.includes("products-list") &&
                        <Link to={`/products/${product.id}/edit`}>
                            <CustomButton bg={variables.primary}>Редактировать</CustomButton>
                        </Link>
                    }

                    {is_authenticated && !is_moderator && location.pathname.includes("products-list") &&
                        <CustomButton onClick={handleAddProduct} bg={variables.green}>Добавить</CustomButton>
                    }

                    {is_authenticated && is_moderator && location.pathname.includes("products-list") &&
                        <CustomButton onClick={handleDeleteProduct} bg={variables.red}>Удалить</CustomButton>
                    }

                    {is_authenticated && !is_moderator && is_draft && location.pathname.includes("orders") &&
                        <CustomButton onClick={handleDeleteProductFromOrder} bg={variables.red}>Удалить</CustomButton>
                    }

                </div>

            </div>

        </div>
    )
}

export default ProductCard;