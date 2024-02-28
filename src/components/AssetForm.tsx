import React from "react";
import { Form, InputNumber, DatePicker, Button, Flex, Typography, Divider } from "antd";
import { ICryptoCurrency } from "../interfaces/IData";

const inputStyle: React.CSSProperties = {
    width: '100%'
};

const coinIconStyle: React.CSSProperties = {
    width: '35px',
    paddingTop: '5px',
};

interface AssetFormProps {
    coin: ICryptoCurrency;
    onFinish: (values: any) => void;
    onCancel?: () => void;
    initialValues?: any;
    isEditAssetForm?: boolean;
}

export const AssetForm: React.FC<AssetFormProps> = ({
    coin,
    onFinish,
    onCancel,
    initialValues,
    isEditAssetForm = false
}) => {
    const [form] = Form.useForm();

    const handleAmountChange = (amount: any) => {
        if (coin) {
            form.setFieldsValue({
                total: (amount * coin?.price).toFixed(2)
            })
        }
    }

    const handlePriceChange = (price: any) => {
        const amount = form.getFieldValue('amount');
        form.setFieldsValue({
            total: (amount * price).toFixed(2)
        })
    }

    return (
        <Form
            form={form}
            labelCol={{ span: isEditAssetForm? 7 : 4 }}
            wrapperCol={{ span: isEditAssetForm? 20 : 18 }}
            layout="horizontal"
            initialValues={initialValues || {
                price: +coin.price.toFixed(2),
                amount: 0,
                total: 0
            }}
            onFinish={onFinish}
        >
            <Flex align="center" gap={10}>
                <img src={coin.icon} style={coinIconStyle} alt={coin.id} />
                <Typography.Title style={{ margin: 0 }} level={isEditAssetForm? 5 : 3}>[{coin.symbol}] {coin.name}</Typography.Title>
            </Flex>
            <Divider />

            <Form.Item
                label="Amount"
                name="amount"
                rules={[
                    {
                        required: true,
                        message: 'Please enter your amount',
                    },
                    {
                        type: 'number',
                        min: 0.01, 
                        message: 'Amount must be greater than zero',
                    }
                ]}>
            
                <InputNumber
                    placeholder="Please enter coin amount"
                    onChange={handleAmountChange}
                    style={inputStyle} 
                    min={0.01} />
            </Form.Item>

            <Form.Item
                label="Price"
                name="price"
                rules={[
                    {
                        type: 'number',
                        min: 0.01, 
                        message: 'Price must be greater than zero',
                    }
                ]}>
                <InputNumber
                    placeholder="You can change coin price"
                    onChange={handlePriceChange}
                    style={inputStyle}
                    min={0.01} />
            </Form.Item>

            <Form.Item
                label="Total"
                name="total"
            >
                <InputNumber disabled style={inputStyle} />
            </Form.Item>

            {!isEditAssetForm && (
                <Form.Item label="Date" name="date">
                    <DatePicker />
                </Form.Item>
            )}

            <Flex gap={10}>
                <Button type="primary" htmlType="submit">{!isEditAssetForm ? 'Add Asset' : 'Save'}</Button>
                {isEditAssetForm && <Button type="primary" onClick={onCancel} >Cancel</Button>}
            </Flex>
        </Form>
    );
};
