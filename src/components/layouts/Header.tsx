import { Avatar, Button, Drawer, Dropdown, Flex, Layout, MenuProps, Modal, Tag, Typography, Grid } from "antd";
import { LogoutOutlined, MailOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from "react";
import CryptoContext from "../../contex/crypto-contex";
import { ICryptoCurrency } from "../../interfaces/IData";
import { CryptoModal } from "../CryptoModal";
import { AddAssetComponent } from "../AddAssetComponent";
import { LoginForm } from "../LoginForm";
import { RegistrationForm } from "../RegistrationForm";
import { useAuth } from "../../hooks/useAuth";
import { UserOutlined } from '@ant-design/icons';
import useLogOut from "../../hooks/useLogOut";
import { CryptoSelect } from "../CryptoSelect";


const headerStyle: React.CSSProperties = {
    color: '#fff',
    height: 64,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
};

const { useBreakpoint } = Grid;

export default function Header() {
    const { crypto } = useContext(CryptoContext);
    const [select, setSelect] = useState(false);
    const [showModal, setshowModal] = useState(false);
    const [coin, setCoin] = useState<ICryptoCurrency | null>(null);
    const [showDrawer, setShowDrawer] = useState(false);
    const [showCoinForm, setShowCoinForm] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const logOut = useLogOut();

    const screens = useBreakpoint();
    const isMobile = screens.xs && !screens.sm;

    const headerButtonStyle: React.CSSProperties = {
        backgroundColor: "white",
        color: '#001529',
        padding: isMobile ? '4px 8px' : '4px 15px'
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Typography.Text style={{fontSize: 14}} onClick={logOut}>Log Out <Button size="small" shape="circle" icon={<LogoutOutlined />} /></Typography.Text>
            ),
        }
    ];

    const { isAuth, email } = useAuth();

    const handleSelect = (value: string) => {
        const selectedCoin = crypto.find((c) => c.id === value)
        if (selectedCoin) {
            setshowModal(true);
            setCoin(selectedCoin);
        }
    }

    const handleAddAsset = () => {
        setShowDrawer(true);
        setShowCoinForm(true);
        setShowLoginForm(false);
        setShowRegistrationForm(false);
    }

    const handleRegistration = () => {
        setShowDrawer(true);
        setShowRegistrationForm(true);
        setShowCoinForm(false);
        setShowLoginForm(false);
    }

    const handleLogin = () => {
        setShowDrawer(true);
        setShowLoginForm(true);
        setShowRegistrationForm(false);
        setShowCoinForm(false);
    }

    useEffect(() => {
        const keypress = (event: any) => {
            if (event.key === '/') {
                setSelect((prev) => !prev);
            }
        }
        document.addEventListener('keypress', keypress);
        return () => document.removeEventListener('keypress', keypress);
    }, [])

    const formNames = () => {
        if (showCoinForm) return 'Add Asset'
        if (showRegistrationForm) return 'Registration'
        if (showLoginForm) return 'Log In'
    }


    return (
        <Layout.Header style={headerStyle}>
            <CryptoSelect crypto={crypto} onSelect={handleSelect} />

            <Flex gap={10}>
                {isAuth ? (
                    <Flex align="center">
                        {!isMobile && <Tag color="geekblue" icon={<MailOutlined />}>{email}</Tag>}
                        <Dropdown menu={{ items }} placement="bottomRight" arrow>
                            <Avatar style={{cursor: 'pointer'}} icon={<UserOutlined />} />
                        </Dropdown>
                    </Flex>
                ) : (
                    <Button onClick={handleLogin} style={headerButtonStyle}>Log In</Button>
                )}
                <Button onClick={handleAddAsset} style={headerButtonStyle}>Add Asset</Button>
            </Flex>

            <Modal open={showModal} style={{ maxWidth: '420px' }} onCancel={() => setshowModal(false)} footer={null}>
                <CryptoModal coin={coin} />
            </Modal>

            <Drawer
                width={600}
                destroyOnClose
                title={formNames()}
                onClose={() => {
                    setShowDrawer(false);
                    setShowCoinForm(false);
                    setShowLoginForm(false);
                    setShowRegistrationForm(false)
                }}
                open={showDrawer}
            >
                {showCoinForm && (
                    <AddAssetComponent onClose={() => { setShowDrawer(false); setShowCoinForm(false) }} />
                )}

                {showLoginForm && (
                    <LoginForm onSignUp={handleRegistration} onClose={() => setShowDrawer(false)} />
                )}

                {showRegistrationForm && (
                    <RegistrationForm onLogin={handleLogin} onClose={() => setShowDrawer(false)} />
                )}
            </Drawer>
        </Layout.Header>
    )
}