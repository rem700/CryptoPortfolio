import { Divider, Flex, Typography } from "antd";
import { Fragment } from "react";

export function CryptoCoinTitle(coin: any) {
    return (
        <Fragment>
            <Flex align="center" gap={10}>
                <img src={coin.icon} style={{ width: '35px', paddingTop: '5px' }} alt={coin.id} />
                <Typography.Title style={{ margin: 0 }} level={3}>[{coin.symbol}] {coin.name}</Typography.Title>
            </Flex>
            <Divider />
        </Fragment>
    )
}