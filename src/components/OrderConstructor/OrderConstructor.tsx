import "./OrderConstructor.sass"
import {useOrder} from "../../hooks/orders/useOrder";
import {Link} from "react-router-dom";

const OrderConstructor = () => {

    const {order} = useOrder()

    if (order == undefined) {
        return (
            <div className="constructor-container disabled">
                <span className="title">Новая заявка</span>
            </div>
        )
    }

    return (
        <Link to={`/orders/${order.id}`} className="constructor-container">
            <span className="title">Новая заявка</span>
            {order.products.length > 0 && <span className="badge">{order.products.length}</span>}
        </Link>
    )
}

export default OrderConstructor