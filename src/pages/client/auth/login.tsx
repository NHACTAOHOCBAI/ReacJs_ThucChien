import { useCurrentUser } from "@/components/context/app.context";
import { loginAPI } from "@/services/api";
import { App, Button, Col, Divider, Form, FormProps, Input } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { notification, message } = App.useApp();
    const { setUser, setIsAuth } = useCurrentUser();
    type FieldType = {
        username: string;
        password: string;
    };
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        setIsLoading(true);
        const resLogin = await loginAPI(values.username, values.password)
        if (resLogin && resLogin.data) {
            setIsAuth(true);
            setUser(resLogin.data.user);
            navigate("/");
            localStorage.setItem('access_token', resLogin.data.access_token);
            message.success("Login successfully");
        }
        else
            notification.info({
                message: 'Login failed',
                description: `${resLogin.message}`,
                placement: 'topRight',
                showProgress: true,
                pauseOnHover: true
            });
        setIsLoading(false);
    };
    return (
        <div style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: 'center'
        }}>
            <Col xs={22} md={14} xl={8}>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "white",
                    flexDirection: "column",
                    alignContent: 'center',
                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)"
                }}
                >
                    <div style={{
                        margin: 20
                    }}>
                        <h1 style={{
                            textAlign: "center"
                        }}>
                            Login</h1>
                        <Divider />
                        <Form
                            layout="vertical"
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item<FieldType>
                                label="Email"
                                name="username"
                                rules={[
                                    {
                                        type: "email",
                                        message: "The input is not valid E-mail!"
                                    },
                                    {
                                        required: true,
                                        message: "Please input your email!"
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item<FieldType>
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item label={null}>
                                <Button
                                    loading={isLoading}
                                    type="primary"
                                    htmlType="submit"
                                >
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                        <Divider />
                        <div style={{
                            textAlign: "center"
                        }}> Don't have any account <Link to="/register">Register now</Link></div>
                    </div>
                </div>
            </Col>
        </div>
    )
}
export default LoginPage;