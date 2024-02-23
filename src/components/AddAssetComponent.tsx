import { useContext, useRef, useState } from "react";
import CryptoContext from "../contex/crypto-contex";
import { Button, Result, Select, Space } from "antd";
import { IAssetData, ICryptoCurrency } from "../interfaces/IData";
import { useAuth } from "../hooks/useAuth";
import { AssetForm } from "./AssetForm";

interface AddAssetComponentProps {
    onClose: () => void;
}

export function AddAssetComponent({ onClose }: AddAssetComponentProps) {
    const { crypto, addNewAssetToFirebase, addNewAsset } = useContext(CryptoContext);
    const [coin, setCoin] = useState<ICryptoCurrency | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const assetRef = useRef<IAssetData | undefined>();
    const { isAuth } = useAuth()

    const handleAssetSelect = (value: string) => {
        const selectedCrypto = crypto.find((c) => c.id === value);
        if (selectedCrypto) {
            setCoin(selectedCrypto);
        }
    }

    const onFinish = async (values: any) => {
        if (coin) {
            const newAsset = {
                id: coin.id,
                amount: values.amount,
                price: values.price,
                date: values.date?.$d ?? new Date(),
            };

            try {
                isAuth ? await addNewAssetToFirebase(newAsset) : addNewAsset(newAsset);
                setSubmitted(true);
            } catch (error) {
                console.error("Failed to add asset:", error);
            }
        }
    };

    if (submitted) {
        return (
            <Result
                status="success"
                title="New Asset Added"
                subTitle={`Added ${assetRef.current?.amount} of ${coin?.name} for $${assetRef.current?.price}`}
                extra={[
                    <Button type="primary" key="close" onClick={onClose}>
                        Close
                    </Button>
                ]}
            />
        )
    }

    if (!coin) {
        return (
            <Select
                style={{ width: '100%' }}
                placeholder="Select coin"
                onSelect={handleAssetSelect}
                options={crypto.map((coin: ICryptoCurrency) => (
                    {
                        label: coin.name,
                        value: coin.id,
                        icon: coin.icon
                    }
                ))}
                optionRender={(option) => (
                    <Space>
                        <img src={option.data.icon} style={{ width: '20px', paddingTop: '6px' }} alt={option.data.id} />
                        <span> {option.data.label}</span>
                    </Space>
                )}
            />
        )
    } else return (
        <AssetForm
            coin={coin}
            onFinish={onFinish}
        />
    )
}