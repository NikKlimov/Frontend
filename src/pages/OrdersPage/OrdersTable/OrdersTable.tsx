import React from "react";
import "./OrdersTable.sass"
import {STATUSES} from "/src/utils/consts";
import {ru} from "/src/utils/momentLocalization";
import moment from "moment";
import {useQuery} from "react-query";
import {useOrders} from "../../../hooks/orders/useOrders";
import {useCustomTable} from "../../../hooks/other/useCustomTable";
import CustomTable from "../../../components/CustomTable/CustomTable";
import {useNavigate} from "react-router-dom"
import OrdersFilters from "../OrdersFilters/OrdersFilters";

const OrdersTable = () => {

    const navigate = useNavigate()

    const {searchOrders} = useOrders()

    const columns = [
        {
            Header: "№",
            accessor: "id"
        },
        {
            Header: "Статус",
            accessor: "status",
            Cell: ({ value }) => { return STATUSES.find(status => status.id == value).name }
        },
        {
            Header: "Дата формирования",
            accessor: "date_formation",
            Cell: ({ value }) => { return moment(value).locale(ru()).format("D MMMM HH:mm") }
        }
    ]

    const { isLoading, data, isSuccess, refetch } = useQuery(
        ["orders"],
        () => searchOrders(),
        {
            keepPreviousData: true,
        }
    );

    const {
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow
    } = useCustomTable(
        columns,
        isSuccess,
        data
    )

    const handleClick = (order_id) => {
        navigate(`/orders/${order_id}`)
    }

    return (
        <div>

            <CustomTable
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                page={page}
                prepareRow={prepareRow}
                isLoading={isLoading}
                onClick={handleClick}
            >
                <OrdersFilters refetch={refetch}/>
            </CustomTable>

        </div>
    )
}

export default OrdersTable