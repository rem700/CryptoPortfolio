import { Button, Form, Input, Result, Typography } from 'antd';
import { useState } from 'react';
import { useSignIn } from '../hooks/useSignIn';
import { useLogIn } from '../hooks/useLogIn';

interface RegisterFormProps {
    onLogin: () => void;
    onClose: () => void;
}

type FieldType = {
    email?: string;
    password?: string;
    confirm?: string;
};

export function RegistrationForm({ onLogin, onClose }: RegisterFormProps) {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmedPassword, setConfirmedPassword ] = useState('');
    const [ submitted, setSubmitted ] = useState(false);
    const signIn = useSignIn();
    const logIn = useLogIn();

    const onFinish = () => {
        signIn(email, password, confirmedPassword)
            .then(() => {
                setSubmitted(true);
                logIn(email, password); 
                onClose && onClose(); 
            })
            .catch((error) => {
                
            });
    };
    
    if (submitted) {
        return (
            <Result
                status="success"
                title="New User Registered"
                extra={[
                    <Button type="primary" key="close" onClick={onClose}>
                        Close
                    </Button>
                ]}
            />
        )
    }

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
            <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input
                    value={email || ''}
                    onChange={(e) => {setEmail(e.target.value)}}
                />
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password 
                    value={password || ''}
                    onChange={(e) => {setPassword(e.target.value)}}
                />
            </Form.Item>

            <Form.Item<FieldType>
                label="Confirm"
                name="confirm"
                rules={[{ required: true, message: 'Please repeat your password!' }]}
            >
                <Input.Password 
                    value={confirmedPassword || ''}
                    onChange={(e) => {setConfirmedPassword(e.target.value)}}
                />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 18 }} >
                <Button type="primary" htmlType="submit" style={{ marginRight: 12 }}>
                    Register
                </Button>
                <Typography.Text>Already have an account? <Typography.Link strong onClick={onLogin}>Log In</Typography.Link></Typography.Text>
            </Form.Item>

        </Form>
    )
}