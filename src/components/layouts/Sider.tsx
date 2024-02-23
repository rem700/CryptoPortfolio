import { Grid, Layout } from "antd";
import { AssetsCards } from "../AssetsCards";

const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    padding: '1rem',
};

const { useBreakpoint } = Grid;

export default function Sider() {
    const screens = useBreakpoint();
    const isLaptop = screens.lg && !screens.xl;

    return (
        <Layout.Sider width={isLaptop ? "33.33%" : "25%"} style={siderStyle}>
            <AssetsCards />
        </Layout.Sider>
    )
}