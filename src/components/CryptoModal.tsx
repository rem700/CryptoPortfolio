import { Fragment } from "react";
import { ICryptoCurrency } from "../interfaces/IData";
import { Divider, Flex, Grid, Tag, Typography } from "antd";

interface ICryptoModalProps {
    coin: ICryptoCurrency | null;
}

const setColor = (a: number) => {
    return a > 0 ? 'green' : 'red';
}

const iconImageStyle: React.CSSProperties = {
    width: '35px',
    paddingTop: '5px'
};




const { useBreakpoint } = Grid;

export const CryptoModal: React.FC<ICryptoModalProps> = ({ coin }) => {
    const screens = useBreakpoint();
    const isMobile = screens.xs && !screens.sm;

    if (!coin) return <Typography>Error</Typography>;

    return (
        <Fragment>
            <Flex align="center" gap={10}>
                <img src={coin.icon} style={iconImageStyle} alt={coin.id} />
                <Typography.Title style={{ margin: 0 }} level={3}>[{coin.symbol}] {coin.name}</Typography.Title>
            </Flex>
            <Divider />
            <Flex gap={!isMobile ? 5 : 2} className="custom-flex" style={{ fontSize: !isMobile ? 14 : 12 }}>
                <Typography.Text strong>1 hour: </Typography.Text>
                <Tag color={setColor(coin.priceChange1h)}>{coin.priceChange1h.toFixed(2)}</Tag>
                <Typography.Text strong>1 day: </Typography.Text>
                <Tag color={setColor(coin.priceChange1d)}>{coin.priceChange1d.toFixed(2)}</Tag>
                <Typography.Text strong>1 week: </Typography.Text>
                <Tag color={setColor(coin.priceChange1w)}>{coin.priceChange1w.toFixed(2)}</Tag>
            </Flex>
            <Divider />
            <Typography.Paragraph strong >Price: ${coin.price.toFixed(2)}</Typography.Paragraph>
            <Typography.Paragraph strong >Price BTC: {coin.priceBtc.toFixed(2)}</Typography.Paragraph>
            <Typography.Paragraph strong >Market Cap: {coin.marketCap.toFixed(2)}</Typography.Paragraph>
        </Fragment>
    );
};