import { Button, Card, Flex, List, Statistic, Tag, Tooltip, Typography } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { IAssetData } from "../interfaces/IData";
import { Fragment, useContext, useState } from "react";
import CryptoContext from "../contex/crypto-contex";
import { AssetForm } from "./AssetForm";
import { useAuth } from "../hooks/useAuth";

const assetCardStyle: React.CSSProperties = {
    width: '100%',
    marginBottom: '1rem',
}

const buttonsStyle: React.CSSProperties = {
    position: 'absolute',
    top: '1.5rem',
    right: '1rem'

}

interface AssetCardProps {
    asset: IAssetData;
}

const AssetCard: React.FC<AssetCardProps> = ({ asset }) => {
    const { removeAssetFromFirebase, removeAsset, updateAssetInFirebase, crypto } = useContext(CryptoContext);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const { isAuth } = useAuth();

    const coin = crypto.find(c => c.id === asset.id);

    if (!coin) {
        console.error('Coin not found for asset with id:', asset.id);
        return null;
    }

    const toggleEdit = () => setIsEditOpen(!isEditOpen);

    const onCancel = () => setIsEditOpen(false);

    const handleDeleteClick = () => {
        if (asset.firestoreId) {
            removeAssetFromFirebase(asset.firestoreId);
            removeAsset(asset.firestoreId)
        } else {
            console.error("Firestore ID is missing for the asset.");
        }
    };

    const onEditFinish = (values: { amount: number; price: number }) => {
        if (asset.firestoreId) {
            updateAssetInFirebase(asset.firestoreId, {
                amount: values.amount,
                price: values.price,
            });
            setIsEditOpen(false); 
        } else {
            console.error("Firestore ID is missing for the asset.");
        }
    };

    return (
        <Card bordered={false} style={assetCardStyle}>
            {!isEditOpen ? (
                <Fragment>
                    <Statistic
                        title={asset.name}
                        value={asset.totalAmount}
                        precision={2}
                        valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
                        prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                        suffix="%"
                    />
                    <List
                        size="small"
                        dataSource={[
                            { title: 'Total Profit', value: asset.totalProfit, isPlain: true, withTag: true },
                            { title: 'Asset Amount', value: asset.amount }
                        ]}
                        renderItem={(item) => (
                            <List.Item>
                                <span>{item.title}</span>
                                <span>
                                    {item.withTag && <Tag color={asset.grow ? 'success' : 'error'}>{asset.growPercent}%</Tag>}
                                    {item.isPlain ? (
                                        <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                                            {item.value !== undefined
                                                ? (item.value < 0 ? '-' : '') + '$' + Math.abs(item.value).toFixed(2)
                                                : ''}
                                        </Typography.Text>
                                    ) : (
                                        <span>{item.value}</span>
                                    )}
                                </span>
                            </List.Item>
                        )}
                    />
                </Fragment>
            ) : (
                <AssetForm
                    coin={coin}
                    isEditAssetForm
                    onFinish={onEditFinish}
                    onCancel={onCancel}
                    initialValues={{
                        amount: asset.amount,
                        price: asset.price,
                    }}
                />
            )}
            {isAuth && (
                <Flex style={buttonsStyle} gap={8}>
                    <Tooltip title="Remove">
                        <Button shape="circle" onClick={handleDeleteClick} icon={<DeleteOutlined />} />
                    </Tooltip>

                    <Tooltip title="Edit">
                        <Button shape="circle" onClick={toggleEdit} icon={<EditOutlined />} />
                    </Tooltip>
                </Flex>
            )}
        </Card>
    );
};

export default AssetCard;