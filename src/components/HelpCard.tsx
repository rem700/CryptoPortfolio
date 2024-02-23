import { Card, Typography } from "antd";

const helpCardStyle: React.CSSProperties = {
    marginBottom: '1rem'
};

export function HelpCard() {
    return (
        <Card style={helpCardStyle} >
            <Typography.Paragraph strong>View Your Crypto Portfolio Without Registration!</Typography.Paragraph>
            <Typography.Paragraph >Here, you can effortlessly explore the current state of your crypto portfolio without registration. Enjoy the freedom and convenience of instant access!</Typography.Paragraph>
            <Typography.Paragraph strong>Want More? Go Through a Simple Registration!</Typography.Paragraph>
            <Typography.Paragraph >Create an account to save your portfolio and return to it every time you log in.<br></br>Gain full access to all the features and functionalities of our service,<br></br> making managing your cryptocurrency easier and safer.</Typography.Paragraph>
            <Typography.Paragraph >Join us and take control of your cryptocurrencies in your own hands!</Typography.Paragraph>
        </Card>
    )
}