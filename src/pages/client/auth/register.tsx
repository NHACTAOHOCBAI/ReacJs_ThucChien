import { registerAPI } from "@/services/api";
import { App, Button, Divider, Form, FormProps, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const RegisterPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { message } = App.useApp();
    type FieldType = {
        fullName: string;
        password: string;
        email: string;
        phone: string;
    };
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        setIsLoading(true);
        const resRegister = await registerAPI(values.fullName, values.email, values.password, values.phone);
        if (resRegister && resRegister.data) {
            navigate("/login");
            message.success("register an account successfully");
        }
        else
            message.error(resRegister.message);
        setIsLoading(false);
    };
    console.log(import.meta.env.VITE_BACKEND_URL)
    return (
        <div style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: 'center'
        }}>
            <div style={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "white",
                flexDirection: "column",
                alignContent: 'center',
                width: 500,
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)"
            }}
            >
                <div style={{
                    margin: 20
                }}>
                    <h1 style={{
                        textAlign: "center"
                    }}>
                        Please Register an account</h1>
                    <Divider />
                    <Form
                        layout="vertical"
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item<FieldType>
                            label="Full name"
                            name="fullName"
                            rules={[{ required: true, message: 'Please input your full name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Email"
                            name="email"
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
                        <Form.Item<FieldType>
                            label="Phone"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your phone!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label={null}>
                            <Button
                                loading={isLoading}
                                type="primary"
                                htmlType="submit"
                            >
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                    <Divider />
                    <div style={{
                        textAlign: "center"
                    }}> Have an account? Login here</div>
                </div>
            </div>
        </div>
    )
}
export default RegisterPage;