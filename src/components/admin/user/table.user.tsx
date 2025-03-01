/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef, useState } from 'react';

import { getUsersWithPaginateAPI } from '@/services/api';
import { dateRangeValidate } from '@/services/helper';

type TSearch = {
    fullName: string,
    email: string,
    createdAt: string,
    createdAtRange: string
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
            <a href='#'>{record._id}</a>
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
        render: () => (
            <div style={{
                display: "flex",
                gap: 10
            }}>
                <EditOutlined style={{
                    color: "#ee5253"
                }} />
                <DeleteOutlined style={{
                    color: "#54a0ff"
                }} />
            </div>
        )
    },
];

const TableUser = () => {
    const actionRef = useRef<ActionType>(null);
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0
    })
    return (
        <>
            <ProTable<IUserTable, TSearch>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params, sort, filter) => {
                    console.log(sort, filter);
                    let query = "";
                    if (params)
                        query += `current=${params.current}&pageSize=${params.pageSize}`;
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
                    }
                    return {
                        data: res.data?.result,
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
                    <Button
                        key="button"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            actionRef.current?.reload();
                        }}
                        type="primary"
                    >
                        Add new
                    </Button>

                ]}
            />
        </>
    );
};

export default TableUser;