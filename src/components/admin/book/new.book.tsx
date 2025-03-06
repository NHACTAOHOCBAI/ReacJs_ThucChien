
import { createBookAPI, getCategories, uploadFileAPI } from "@/services/api";
import { PlusOutlined } from "@ant-design/icons";
import { App, Col, Divider, Form, FormProps, GetProp, Image, Input, InputNumber, Modal, Row, Select, Upload, UploadFile, UploadProps } from "antd";
import { useEffect, useState } from "react";

interface IProp {
    setOpenNew: (value: boolean) => void
    openNew: boolean
    reloadTable: () => void;
}
type FieldType1 = {
    thumbnail: any
    slider: any,
    mainText: string
    author: string
    price: number
    quantity: number,
    category: string
};
const NewBook = (Props: IProp) => {
    const { notification, message } = App.useApp();
    const [form] = Form.useForm();
    const { setOpenNew, openNew, reloadTable } = Props;
    const onFinish: FormProps<FieldType1>['onFinish'] = async (values) => {
        // upload file
        const nameThumbnail = (await uploadFileAPI(values.thumbnail[0].originFileObj, "book")).data?.fileUploaded as string;

        const nameSlider: string[] = await Promise.all(
            values.slider.map(async (value: any) => {
                return (await uploadFileAPI(value.originFileObj, "book")).data?.fileUploaded;
            })
        );
        const resCreate = await createBookAPI(nameThumbnail, nameSlider, values.mainText, values.author, values.price, values.quantity, values.category)
        if (resCreate && resCreate.data) {
            message.success("Create a book successfully");
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
        handleCancel();
    }
    // xu ly anh 
    type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
    const [previewOpenThumbnail, setPreviewOpenThumbnail] = useState(false);
    const [previewImageThumbnail, setPreviewImageThumbnail] = useState('');
    const [fileListThumbnail, setFileListThumbnail] = useState<UploadFile[]>([]);
    const [previewOpenSlider, setPreviewOpenSlider] = useState(false);
    const [previewImageSlider, setPreviewImageSlider] = useState('');
    const [fileListSlider, setFileListSlider] = useState<UploadFile[]>([]);
    const props: UploadProps = {
        beforeUpload: (file) => {
            const isPNG = file.type === 'image/png';
            if (!isPNG) {
                message.error(`${file.name} is not a png file`);
            }
            return isPNG || Upload.LIST_IGNORE;
        },
        customRequest({ onSuccess }) {
            setTimeout(() => {
                if (onSuccess)
                    onSuccess("ok");
            }, 0);
        },
    };

    const getBase64 = (file: FileType): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    const handlePreviewThumbnail = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImageThumbnail(file.url || (file.preview as string));
        setPreviewOpenThumbnail(true);
    };
    const handlePreviewSlider = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImageSlider(file.url || (file.preview as string));
        setPreviewOpenSlider(true);
    };
    const handleChangeThumbnail: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileListThumbnail(newFileList);
        form.setFieldsValue({ thumbnail: fileListThumbnail });
    }
    const handleChangeSlider: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileListSlider(newFileList);
        form.setFieldsValue({ slider: fileListSlider });
    }
    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    //
    const [options, setOptions] = useState<{ value: string, label: string }[]>([]);
    const handleOk = () => {
        form.submit();
    }
    const handleCancel = () => {
        setPreviewImageSlider("");
        setPreviewImageThumbnail("");
        setFileListSlider([]);
        setFileListThumbnail([]);
        form.resetFields();
        setOpenNew(false);
    }
    useEffect(() => {
        const funct = async () => {
            const res = await getCategories();
            if (res.data) {
                setOptions(res.data.map((value) => {
                    return {
                        value: value,
                        label: value
                    }
                }))
            }
        }
        funct();
    }, []);
    return (
        <>
            <Modal title="New Book"
                width={700}

                okText='Create' open={openNew} onOk={handleOk} onCancel={handleCancel}>
                <Divider />
                <Form
                    layout="vertical"
                    name="basic"
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
                >
                    <Row gutter={15}>
                        <Col span={12} >
                            <Form.Item<FieldType1>
                                label="Title"
                                name="mainText"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input book's title!"
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item<FieldType1>
                                label="Author"
                                name="author"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input book's author"
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8} >
                            <Form.Item<FieldType1>
                                label="Price"
                                name="price"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input book's price"
                                    }
                                ]}
                            >
                                <InputNumber
                                    formatter={value => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    addonAfter={"d"} />
                            </Form.Item>
                        </Col>

                        <Col span={8} >
                            <Form.Item<FieldType1>
                                label="Category"
                                name="category"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input book's category"
                                    }
                                ]}
                            >
                                <Select options={options} />
                            </Form.Item>
                        </Col>

                        <Col span={8} >
                            <Form.Item<FieldType1>
                                label="Quantity"
                                name="quantity"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input book's quantity"
                                    }
                                ]}
                            >
                                <InputNumber />
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item<FieldType1>
                                label="Thumbnail"
                                name="thumbnail"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input book's thumbnail"
                                    }
                                ]}
                                getValueFromEvent={(e) => e?.fileList || []}
                            >
                                <Upload
                                    {...props}
                                    listType="picture-card"
                                    fileList={fileListThumbnail}
                                    onPreview={handlePreviewThumbnail}
                                    onChange={handleChangeThumbnail}
                                >
                                    {fileListThumbnail.length >= 1 ? null : uploadButton}
                                </Upload>
                                {previewImageThumbnail && (
                                    <Image
                                        wrapperStyle={{ display: 'none' }}
                                        preview={{
                                            visible: previewOpenThumbnail,
                                            onVisibleChange: (visible) => setPreviewOpenThumbnail(visible),
                                            afterOpenChange: (visible) => !visible && setPreviewImageThumbnail(''),
                                        }}
                                        src={previewImageThumbnail}
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item<FieldType1>
                                label="Slider"
                                name="slider"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input book's Slider"
                                    }
                                ]}
                                getValueFromEvent={(e) => e?.fileList || []}
                            >
                                <Upload
                                    {...props}
                                    listType="picture-card"
                                    fileList={fileListSlider}
                                    onPreview={handlePreviewSlider}
                                    onChange={handleChangeSlider}
                                >
                                    {fileListSlider.length >= 8 ? null : uploadButton}
                                </Upload>
                                {previewImageSlider && (
                                    <Image
                                        wrapperStyle={{ display: 'none' }}
                                        preview={{
                                            visible: previewOpenSlider,
                                            onVisibleChange: (visible) => setPreviewOpenSlider(visible),
                                            afterOpenChange: (visible) => !visible && setPreviewImageSlider(''),
                                        }}
                                        src={previewImageSlider}
                                    />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

            </Modal>
        </>
    )
}
export default NewBook