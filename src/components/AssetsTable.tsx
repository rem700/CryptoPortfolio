import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { useContext } from 'react';
import CryptoContext from '../contex/crypto-contex';

interface DataType {
    key: string | undefined;
    name: string | undefined;
    price: number | undefined;
    amount: number | undefined;
}

const columns: TableColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => {
            if (a.name && b.name) {
                return a.name.localeCompare(b.name);
            }
            return 0;
        },
    },
    {
        title: 'Price, $',
        dataIndex: 'price',
        sorter: (a, b) => {
            if (a.price !== undefined && b.price !== undefined) {
                return a.price - b.price;
            }
            return 0;
        },
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        sorter: (a, b) => {
            if (a.amount !== undefined && b.amount !== undefined) {
                return a.amount - b.amount;
            }
            return 0;
        },
    },
];



export function AssetsTable() {
    const { assets } = useContext(CryptoContext);

    const data: DataType[] = assets.map((a) => ({
        key: a.id,
        name: a.name,
        price: a.price,
        amount: a.amount
    }))
    return (
        <Table columns={columns} dataSource={data} pagination={false} />
    )
}