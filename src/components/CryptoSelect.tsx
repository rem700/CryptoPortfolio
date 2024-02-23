import { useState } from "react";
import { ICryptoCurrency } from "../interfaces/IData";
import { Grid, Select, Space } from "antd";

const { useBreakpoint } = Grid;

interface CryptoSelectProps {
    crypto: ICryptoCurrency[];
    onSelect: (value: string) => void;
}

export const CryptoSelect: React.FC<CryptoSelectProps> = ({ crypto, onSelect }) => {
    const [select, setSelect] = useState(false);

    const screens = useBreakpoint();
    const isMobile = screens.xs && !screens.sm;

    const selectStyle: React.CSSProperties = {
        width: !isMobile ? 250 : '100%',
        marginRight: '10px'
    };

    return (
        <Select
            open={select}
            onClick={() => setSelect((prev) => !prev)}
            style={selectStyle}
            placeholder="press / to open"
            onSelect={onSelect}
            options={crypto.map((coin: ICryptoCurrency) => ({
                label: coin.name,
                value: coin.id,
                icon: coin.icon
            }))}
            optionRender={(option) => (
                <Space>
                    <img src={option.data.icon} style={{ width: '20px', paddingTop: '6px' }} alt={option.data.id} />
                    <span> {option.data.label}</span>
                </Space>
            )}
        />
    );
};