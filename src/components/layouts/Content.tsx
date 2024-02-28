import { Grid, Layout, Typography } from "antd";
import { useContext } from "react";
import CryptoContext from "../../contex/crypto-contex";
import { PortfolioChart } from "../PortfolioChart";
import { AssetsTable } from "../AssetsTable";
import { AssetsCards } from "../AssetsCards";


const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 64px)',
    color: '#fff',
    backgroundColor: '#001529',
    padding: '1rem'
};

const contentTitleStyle: React.CSSProperties = {
    textAlign: 'start',
    color: 'white'
};

const { useBreakpoint } = Grid;

export default function Content() {
    const { assets, crypto } = useContext(CryptoContext);

    const screens = useBreakpoint();
    const isMobile = screens.xs && !screens.sm;
    const isTablet = screens.sm && !screens.lg;

    const cryptoPriceMap = crypto.reduce((acc: Record<string, number>, c) => {
        acc[c.id] = c.price;
        return acc;
    }, {});

    const portfolioSumm = () => {
        return assets.map(asset => {
            return asset.amount * cryptoPriceMap[asset.id];
        }).reduce((acc, v) => (acc += v), 0).toFixed(2);
    }

    return (
        <Layout.Content style={contentStyle}>
            <Typography.Title level={3} style={contentTitleStyle}>Portfolio: ${portfolioSumm()}</Typography.Title>
            <PortfolioChart />
            {(isTablet || isMobile) && <AssetsCards />}
            {assets.length !== 0 && <AssetsTable />}
        </Layout.Content>
    )
}