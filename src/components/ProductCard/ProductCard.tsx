import "./ProductCard.sass"
import {Product} from "../../utils/types";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/users/useAuth";
import {useOrder} from "../../hooks/orders/useOrder";
import CustomButton from "../CustomButton/CustomButton";
import {variables} from "../../utils/consts";

const ProductCard = ({ product }: {product:Product}) => {
    
    const {is_authenticated, is_moderator} = useAuth()

    const {order, is_draft, addProductToOrder, deleteProductFromOrder} = useOrder()

    const handleAddProduct = (e) => {
        e.preventDefault()
        addProductToOrder(product)
    }

    const handleDeleteProduct = (e) => {
        deleteProductFromOrder(product)
    }

    const is_chosen = order?.products.find(g => g.id == product.id)

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

                    <Link to={`/products/${product.id}`}>
                        <CustomButton bg={variables.primary}>
                            Подробнее
                        </CustomButton>
                    </Link>
                    
                    {is_authenticated && !is_chosen && !is_moderator && location.pathname.includes("products") &&
                        <CustomButton onClick={handleAddProduct} bg={variables.green}>Добавить</CustomButton>
                    }

                    {is_authenticated && is_chosen && location.pathname.includes("products") &&
                        <CustomButton onClick={handleDeleteProduct} bg={variables.red} >Удалить</CustomButton>
                    }

                    {is_authenticated && !is_moderator && is_draft && location.pathname.includes("orders") &&
                        <CustomButton onClick={handleDeleteProduct} bg={variables.red}>Удалить</CustomButton>
                    }

                </div>

            </div>

        </div>
    )
}

export default ProductCard;