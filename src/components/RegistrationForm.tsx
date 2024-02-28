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
    repeatedPassword?: string;
};

export function RegistrationForm({ onLogin, onClose }: RegisterFormProps) {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ repeatedPassword, setRepeatedPassword ] = useState('');
    const [error, setError] = useState('');
    const [ submitted, setSubmitted ] = useState(false);
    
    const signIn = useSignIn();
    const logIn = useLogIn();
    

    const onFinish = () => {
        if (password !== repeatedPassword) { 
            setError('Passwords do not match. Please try again.');
            return; 
        }

        signIn(email, password)
            .then(() => {
                setSubmitted(true);
                logIn(email, password, true);
                onClose && onClose();
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    setError('This email is already in use. Please log in or use a different email.');
                } else {
                    setError('An error occurred during registration. Please try again.');
                }
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

    if (error) {
        return (
            <Result
                status="warning"
                title="Registration Error"
                subTitle={error}
                extra={[
                    <Button type="primary" key="tryAgain" onClick={() => setError('')}>
                        Try Again
                    </Button>,
                    <Button key="login" onClick={onLogin}>
                        Log In
                    </Button>
                ]}
            />
        );
    }

    return (
        <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            layout="horizontal"
            initialValues={{ remember: false }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input
                    value={''}
                    onChange={(e) => {setEmail(e.target.value)}}
                />
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password 
                    value={''}
                    onChange={(e) => {setPassword(e.target.value)}}
                />
            </Form.Item>

            <Form.Item<FieldType>
                label="Confirm Password"
                name="repeatedPassword"
                rules={[{ required: true, message: 'Please confirm your password!' }]}
            >
                <Input.Password 
                    value={''}
                    onChange={(e) => {setRepeatedPassword(e.target.value)}}
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