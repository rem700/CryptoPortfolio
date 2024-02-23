import { Button, Checkbox, Flex, Form, Input } from 'antd';
import { useState } from 'react';
import { useLogIn } from '../hooks/useLogIn';

interface LoginFormProps {
    onSignUp: () => void;
    onClose: () => void;
}

type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
};

export function LoginForm({ onSignUp, onClose }: LoginFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const logIn = useLogIn();

    const onFinish = () => {
        logIn(email, password); 
        onClose && onClose(); 
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 18 }}
            layout="horizontal"
            initialValues={{ remember: true }}
            onFinish={() => {onFinish(); onClose()}}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input
                    value={email || ''}
                    onChange={(e) => { setEmail(e.target.value) }}
                />
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password
                    value={password || ''}
                    onChange={(e) => { setPassword(e.target.value) }}
                />
            </Form.Item>

            <Form.Item<FieldType>
                name="remember"
                valuePropName="checked"
                wrapperCol={{ span: 18 }}
            >
                <Checkbox
                    value={rememberMe}
                    onChange={(e) => { setRememberMe(e.target.checked) }}
                >Remember me</Checkbox>
            </Form.Item>

            <Flex gap={12}>
                <Form.Item wrapperCol={{ span: 18 }}>
                    <Button type="primary" htmlType="submit">
                        Log In
                    </Button>
                </Form.Item>
                <Button type="primary" onClick={onSignUp}>Sign Up</Button>
            </Flex>
        </Form>
    )
}