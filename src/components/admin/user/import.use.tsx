
import { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { App, Modal, Table, Upload } from 'antd';
const { Dragger } = Upload;
import Exceljs from 'exceljs'
import { Buffer } from 'buffer'
import { createListUsersAPI } from '@/services/api';
import template from "assets/template/template.xlsx?url"
interface IProps {
    openImport: boolean
    setOpenImport: (open: boolean) => void
    reloadTable: () => void
}
interface IDataImport {
    fullName: string
    email: string
    phone: string
}
const ImportUser = (Props: IProps) => {
    const columns = [
        {
            title: 'Full name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
    ];
    const { message, notification } = App.useApp();
    const { openImport, setOpenImport, reloadTable } = Props;
    const [dataImport, setDataImport] = useState<IDataImport[]>([]);
    const handleOk = async () => {
        const dataUser = dataImport.map((values) => {
            return { ...values, password: import.meta.env.VITE_USER_CREATE_DEFAULT_PASSWORD }
        })
        const res = await createListUsersAPI(dataUser);
        if (res.data) {
            notification.success({
                message: "Bulk Create Users",
                description: `Success :${res.data.countSuccess}, Error :${res.data.countError}`
            })
        }
        setOpenImport(false);
        reloadTable();
    };

    const handleCancel = () => {
        setOpenImport(false);
        setDataImport([]);

    };
    const props: UploadProps = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        accept: ".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        customRequest({ onSuccess }) {
            setTimeout(() => {
                if (onSuccess)
                    onSuccess("ok");
            }, 0);
        },
        async onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                {
                    console.log(info);
                    message.success(`${info.file.name} file uploaded successfully.`);
                    if (info.fileList && info.fileList.length > 0) {
                        const file = info.fileList[0].originFileObj;
                        // chuyen file thanh  buffer de cho thu vien co the su dung
                        const arrayBuffer = await file?.arrayBuffer();
                        const buffer = Buffer.from(arrayBuffer);
                        const workbook = new Exceljs.Workbook();
                        await workbook.xlsx.load(buffer);
                        //convert file to json
                        const jsonData: IDataImport[] = [];
                        workbook.worksheets.forEach(function (sheet) {
                            // read first row as data keys
                            const firstRow = sheet.getRow(1);
                            if (!firstRow.cellCount) return;
                            const keys = firstRow.values as any[];
                            sheet.eachRow((row, rowNumber) => {
                                if (rowNumber == 1) return;
                                const values = row.values as any;
                                const obj: any = {};
                                for (let i = 1; i < keys.length; i++) {
                                    obj[keys[i]] = values[i];
                                }
                                jsonData.push(obj);
                            })
                        });
                        setDataImport(jsonData);
                    }
                }
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };
    return (
        <>
            <Modal title="Import User"
                width={"650px"}
                okText='Import'
                okButtonProps={{
                    disabled: dataImport.length > 0 ? false : true
                }}
                maskClosable={false}
                destroyOnClose={true}
                open={openImport} onOk={handleOk} onCancel={handleCancel}>
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Only accept .csv, .xls, .xlsx.
                        <span> Or </span>
                        <a onClick={e => e.stopPropagation()}
                            href={template} download
                        >
                            Download Sample File
                        </a>
                    </p>
                </Dragger>
                <div>
                    <div style={{
                        margin: 10
                    }}>Upload Data</div>
                    <Table dataSource={dataImport} columns={columns} />;
                </div>
            </Modal>
        </>
    )
}
export default ImportUser;