import { createUserAPI } from "@/services/api";
import { App, Divider, Form, FormProps, Input, Modal } from "antd";
import { useState } from "react";
interface IProps {
    openNew: boolean
    setOpenNew: (open: boolean) => void
    reloadTable: () => void
}
const NewUser = (props: IProps) => {
    const { notification, message } = App.useApp();
    const [isSubmit, setIsSubmit] = useState(false)
    type FieldType = {
        fullName: string
        password: string;
        email: string
        phone: string;
    };
    const { openNew, setOpenNew, reloadTable } = props;
    const [form] = Form.useForm();

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        form.resetFields();
        setOpenNew(false);
    };
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        setIsSubmit(true);
        const resCreate = await createUserAPI(values.fullName, values.password, values.email, values.phone);
        if (resCreate && resCreate.data) {
            message.success("Create an account successfully");
            reloadTable();
        }
        else {
            notification.info({
                message: 'Create failed',
                description: `${resCreate.message}`,
                placement: 'topRight',
                showProgress: true,
                pauseOnHover: true
            });
        }
        setIsSubmit(false);
        setOpenNew(false);
        form.resetFields();
    }
    return (
        <>
            <Modal title="New User"
                confirmLoading={isSubmit} okText='Create' open={openNew} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    layout="vertical"
                    name="basic"
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
                >
                    <Divider />
                    <Form.Item<FieldType>
                        label="Full name"
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: "Please input your full name!"
                            }
                        ]}
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
                        rules={[
                            {
                                required: true,
                                message: "Please input your Phone!"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>

            </Modal>
        </>
    )
}
export default NewUser;