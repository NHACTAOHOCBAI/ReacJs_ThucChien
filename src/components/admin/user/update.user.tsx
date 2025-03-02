import { updateUserAPI } from "@/services/api";
import { App, Divider, Form, Input, Modal } from "antd";
import { FormProps } from "antd/lib";
import { useEffect } from "react";
interface IProps {
    openUpdate: boolean
    setOpenUpdate: (value: boolean) => void
    updatedUser: IUserTable | undefined
    reloadTable: () => void
}
const UpdateUser = (props: IProps) => {
    const { openUpdate, setOpenUpdate, updatedUser, reloadTable } = props;
    const { notification, message } = App.useApp();
    const [form] = Form.useForm();
    type FieldType = {
        email: string,
        fullName: string
        phone: string;
    };
    const handleCancel = () => {
        setOpenUpdate(false);
    }
    const handleOk = () => {
        form.submit();
    }
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const resUpdate = await updateUserAPI(updatedUser?._id, values.fullName, values.phone);
        if (resUpdate && resUpdate.data) {
            message.success("Update an account successfully");
            reloadTable();
        }
        else {
            notification.info({
                message: 'update failed',
                description: `${resUpdate.message}`,
                placement: 'topRight',
                showProgress: true,
                pauseOnHover: true
            });
        }
        setOpenUpdate(false);
    }
    useEffect(() => {
        form.setFieldsValue({
            email: updatedUser?.email,
            fullName: updatedUser?.fullName,
            phone: updatedUser?.phone
        })
    }, [updatedUser])
    return (
        <>
            <>
                <Modal title="Update User" onOk={handleOk} onCancel={handleCancel}
                    okText='Update' open={openUpdate} >
                    <Form
                        form={form}
                        layout="vertical"
                        name="basic"
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Divider />
                        <Form.Item<FieldType>
                            label="Email"
                            name="email"
                        >
                            <Input disabled />
                        </Form.Item>
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
        </>
    )
}
export default UpdateUser;