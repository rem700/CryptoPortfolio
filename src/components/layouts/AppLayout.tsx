import { useContext } from "react";
import { Grid, Layout, Spin } from "antd";
import Header from "./Header";
import Sider from "./Sider";
import Content from "./Content";
import CryptoContext from "../../contex/crypto-contex";

const layoutStyle = {
    overflow: 'hidden',
};

const { useBreakpoint } = Grid;

export default function AppLayout() {
    const { loading } = useContext(CryptoContext);

    const screens = useBreakpoint();
    const isMobile = screens.xs && !screens.sm;
    const isTablet = screens.sm && !screens.lg;

    if (loading) return <Spin size="large" fullscreen />

    return (
        <Layout style={layoutStyle}>
            <Header />
            <Layout>
                {!isTablet && !isMobile && <Sider />}
                <Content />
            </Layout>
        </Layout>
    )
}