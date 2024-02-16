import {useDispatch, useSelector} from 'react-redux';
import {
	updateOrder
} from "../../store/orders/orderSlice";
import {useToken} from "../users/useToken";
import {api} from "../../utils/api";

export function useOrder() {

	const {access_token} = useToken()

	const order = useSelector(state => state.order.order)

	const is_draft = order?.status == 1

	const dispatch = useDispatch()

	const setOrder = (value) => {
		dispatch(updateOrder(value))
	}

	const sendOrder = async () => {

		const response = await api.put(`orders/${order.id}/update_status_user/`, {}, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setOrder(undefined)
		}
	}

	const deleteOrder = async () => {

		const response = await api.delete(`orders/${order.id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setOrder(undefined)
		}

	}

	const saveOrder = async () => {

		await api.put(`orders/${order.id}/update/`, {}, {
			headers: {
				'authorization': access_token
			}
		})

	}

	const fetchOrder = async (order_id) => {

		const {data} = await api.get(`orders/${order_id}/`, {
			headers: {
				'authorization': access_token
			},
		})

		setOrder(data)
	}

	const addProductToOrder = async (product) => {

		const response = await api.post(`products/${product.id}/add_to_order/`, {}, {
			headers: {
				'authorization': access_token
			},
		});

		if (response.status == 200) {
			setOrder(response.data)
		}
	}

	const deleteProductFromOrder = async (product) => {
		const response = await api.delete(`orders/${order.id}/delete_product/${product.id}/`, {
			headers: {
				'authorization': access_token
			},
		});

		if (response.status == 200) {
			setOrder(response.data)
		}
	}

	return {
		order,
		is_draft,
		setOrder,
		saveOrder,
		sendOrder,
		deleteOrder,
		fetchOrder,
		addProductToOrder,
		deleteProductFromOrder
	};
}