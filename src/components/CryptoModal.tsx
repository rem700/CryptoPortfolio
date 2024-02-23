import { Fragment } from "react";
import { ICryptoCurrency } from "../interfaces/IData";
import { Divider, Flex, List, Tag, Typography } from "antd";

interface ICryptoModalProps {
    coin: ICryptoCurrency | null;
}

const setColor = (a: number) => {
    return a > 0 ? 'green' : 'red';
}

export const CryptoModal: React.FC<ICryptoModalProps> = ({ coin }) => {
    if (!coin) return <Typography>Error</Typography>;

    return (
        <Fragment>
            <Flex align="center" gap={10}>
                <img src={coin.icon} style={{ width: '35px', paddingTop: '5px' }} alt={coin.id} />
                <Typography.Title style={{ margin: 0 }} level={3}>[{coin.symbol}] {coin.name}</Typography.Title>
            </Flex>
            <Divider />
            <Typography.Paragraph>
                <Typography.Text strong>1 hour: </Typography.Text>
                <Tag color={setColor(coin.priceChange1h)}>{coin.priceChange1h.toFixed(2)}</Tag>
                <Typography.Text strong>1 day: </Typography.Text>
                <Tag color={setColor(coin.priceChange1d)}>{coin.priceChange1d.toFixed(2)}</Tag>
                <Typography.Text strong>1 week: </Typography.Text>
                <Tag color={setColor(coin.priceChange1w)}>{coin.priceChange1w.toFixed(2)}</Tag>
            </Typography.Paragraph>
            <Typography.Paragraph strong >Price: ${coin.price.toFixed(2)}</Typography.Paragraph>
            <Typography.Paragraph strong >Price BTC: {coin.priceBtc.toFixed(2)}</Typography.Paragraph>
            <Typography.Paragraph strong >Market Cap: {coin.marketCap.toFixed(2)}</Typography.Paragraph>
        </Fragment>
    );
};