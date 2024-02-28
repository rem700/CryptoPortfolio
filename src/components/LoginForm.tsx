import { Button, Checkbox, Flex, Form, Input, Typography } from 'antd';
import { useState } from 'react';
import { useLogIn } from '../hooks/useLogIn';

interface LoginFormProps {
    onSignUp: () => void;
    onClose: () => void;
}

export function LoginForm({ onSignUp, onClose }: LoginFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);
    const [error, setError] = useState('');
    const logIn = useLogIn();

    const onFinish = async () => {
        try {
            await logIn(email, password, rememberMe);
            onClose && onClose();
        } catch (error: any) {
            setError('Invalid email or password. Please try again.');
        }

    };

    return (
        <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 18 }}
            layout="horizontal"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input
                    onChange={(e) => { setEmail(e.target.value) }}
                />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password
                    onChange={(e) => { setPassword(e.target.value) }}
                />
            </Form.Item>

            {error && (
                <Form.Item wrapperCol={{ offset: 4, span: 18 }} style={{marginTop: -24, marginBottom: 0}}>
                    <Typography.Paragraph type='danger'>{error}</Typography.Paragraph>
                </Form.Item>
            )}

            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 4, span: 18 }}
            >
                <Checkbox
                    onChange={(e) => { setRememberMe(e.target.checked) }}
                >Remember me</Checkbox>
            </Form.Item>

            <Flex gap={12}>
                <Button type="primary" htmlType="submit">Log In</Button>
                <Button type="primary" onClick={onSignUp}>Sign Up</Button>
            </Flex>
        </Form>
    )
}