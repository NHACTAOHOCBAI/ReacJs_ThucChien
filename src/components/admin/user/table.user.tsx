/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloudDownloadOutlined, CloudUploadOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { App, Button, Popconfirm } from 'antd';
import { useRef, useState } from 'react';

import { deleteUserAPI, getUsersWithPaginateAPI } from '@/services/api';
import { dateRangeValidate } from '@/services/helper';
import UserDetail from './userDetail';
import NewUser from './new.user';
import ImportUser from './import.use';
import { CSVLink } from 'react-csv';
import UpdateUser from './update.user';

type TSearch = {
    fullName: string,
    email: string,
    createdAt: string,
    createdAtRange: string
}
const TableUser = () => {
    const { message } = App.useApp();
    const actionRef = useRef<ActionType>(null);
    const [userDetail, setUserDetail] = useState<IUserTable>();
    const [openDetail, setOpenDetail] = useState<boolean>(false);
    const [openNew, setOpenNew] = useState<boolean>(false);
    const [openUpdate, setOpenUpdate] = useState<boolean>(false);
    const [updatedUser, setUpdatedUser] = useState<IUserTable>();
    const [openImport, setOpenImport] = useState<boolean>(false);
    const [userData, setUserData] = useState<IUserTable[]>([])
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0
    })
    const reloadTable = () => {
        actionRef.current?.reload();
    }
    const handleUpdate = (value: IUserTable) => {
        setUpdatedUser(value);
        setOpenUpdate(true);
    }
    const handleConfirm = async (value: IUserTable) => {
        const res = await deleteUserAPI(value._id);
        if (res.data) {
            message.success("delete the user done");
            reloadTable();
        }
        else {
            message.error("delete failed")
        }
    }
    const columns: ProColumns<IUserTable>[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 50,
        },
        {
            title: 'ID',
            dataIndex: '_id',
            search: false,
            render: (_, record) => (
                <a onClick={() => {
                    setOpenDetail(true)
                    setUserDetail(record)
                }} href='#'>{record._id}</a>
            ),
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            copyable: true,

        },
        {
            title: 'Created at',
            dataIndex: 'createdAt',
            sorter: true,
            hideInSearch: true,
            valueType: 'date',
        },
        {
            title: 'Created at',
            dataIndex: 'createdAtRange',
            hideInTable: true,
            valueType: 'dateRange',
        },
        {
            title: 'Action',
            search: false,
            render: (_, record) => (
                <div style={{
                    display: "flex",
                    gap: 10
                }}>
                    <EditOutlined
                        onClick={() => handleUpdate(record)}
                        style={{
                            color: "#ee5253"
                        }} />
                    <Popconfirm
                        title="Delete the user"
                        description="Are you sure to delete this user?"
                        onConfirm={() => handleConfirm(record)}
                        okText="ok"
                        cancelText="No"
                    >
                        <DeleteOutlined style={{
                            color: "#54a0ff"
                        }} />
                    </Popconfirm>
                </div>
            )
        },
    ];
    return (
        <>
            <CSVLink data={userData as string | IUserTable[]}></CSVLink>9
            <NewUser
                openNew={openNew}
                setOpenNew={setOpenNew}
                reloadTable={reloadTable}
            />
            <UpdateUser
                openUpdate={openUpdate}
                setOpenUpdate={setOpenUpdate}
                updatedUser={updatedUser}
                reloadTable={reloadTable}
            />
            <ImportUser
                openImport={openImport}
                setOpenImport={setOpenImport}
                reloadTable={reloadTable}
            />
            <ProTable<IUserTable, TSearch>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params, sort) => {
                    let query = "";
                    if (params)
                        query += `current=${params.current}&pageSize=${params.pageSize}&sort=-createdAt`;
                    if (sort.createdAt === "ascend")
                        query += `&sort=createdAt`;
                    if (params.fullName)
                        query += `&fullName=/${params.fullName}/i`;
                    if (params.email)
                        query += `&email=/${params.email}/i`;
                    if (params.createdAtRange) {
                        const createDateRange = dateRangeValidate(params.createdAtRange) || [];
                        query += `&createAt>=${createDateRange[0]}&createAt<=${createDateRange[1]}}`;
                    }
                    const res = await getUsersWithPaginateAPI(query);
                    if (res.data) {
                        setMeta(res.data.meta);
                        setUserData(res.data?.result);
                    }
                    return {
                        data: res.data?.result
                    }

                }}
                pagination={{
                    current: meta.current,
                    pageSizeOptions: ['5', '10', '20', '50'],
                    showSizeChanger: true,
                    pageSize: meta.pageSize,
                    total: meta.total,
                }}
                headerTitle="Table user"
                toolBarRender={() => [
                    <div style={{
                        display: "flex",
                        gap: 10,
                        flexDirection: "row-reverse"
                    }}>
                        <Button
                            key="AddBtn"
                            icon={<PlusOutlined />}
                            onClick={() => {
                                setOpenNew(true);
                            }}
                            type="primary"
                        >
                            Add user
                        </Button>
                        <Button
                            key="ImportBtn"
                            icon={<CloudUploadOutlined />}
                            onClick={() => {
                                setOpenImport(true);
                            }}
                            type="primary"
                        >
                            Import
                        </Button>
                        <CSVLink data={userData as string | IUserTable[]}></CSVLink>
                        <Button
                            key="ExportBtn"
                            icon={<CloudDownloadOutlined />}
                            type="primary"
                        >
                            <CSVLink
                                data={userData}
                                filename='export-user.csv'>
                                Export
                            </CSVLink>
                        </Button>
                    </div>

                ]}
            />
            <UserDetail
                userDetail={userDetail}
                openDetail={openDetail}
                setOpenDetail={setOpenDetail}
            />
        </>
    );
};

export default TableUser;