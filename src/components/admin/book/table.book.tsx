import { deleteBookAPI, getBooksWithPaginateAPI } from "@/services/api";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components";
import { App, Button, Popconfirm } from "antd";
import { useRef, useState } from "react";
import BookDetail from "./book.detail";
import NewBook from "./new.book";
import UpdateBook from "./update.book";

const BookTable = () => {
    const { message } = App.useApp();
    const [openDetail, setOpenDetail] = useState<boolean>(false);
    const [bookDetail, setBookDetail] = useState<IBookTable>();
    const [openNew, setOpenNew] = useState<boolean>(false);
    const [openUpdate, setOpenUpdate] = useState<boolean>(false);
    const [updatedBook, setUpdatedBook] = useState<IBookTable>();
    const handleBtnNew = () => {
        setOpenNew(true);
    }
    const handleBtnUpdate = (book: IBookTable) => {
        setUpdatedBook(book);
        setOpenUpdate(true);
    }
    const reloadTable = async () => {
        actionRef.current?.reload();
    }
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0
    });
    const handleConfirm = async (value: IBookTable) => {
        const res = await deleteBookAPI(value._id);
        if (res.data) {
            message.success("delete the book done");
            reloadTable();
        }
        else {
            message.error("delete failed")
        }
    }
    const columns: ProColumns<IBookTable>[] = [
        {
            title: 'ID',
            search: false,
            render: (_, record) => (
                <a onClick={
                    () => {
                        setOpenDetail(true);
                        setBookDetail(record);
                    }
                }
                    href="#">{record._id}</a>
            )
        },
        {
            title: 'Title',
            dataIndex: 'mainText',

        },
        {
            title: 'Author',
            dataIndex: 'author',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            search: false,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            search: false,
            sorter: true,
        },
        {
            title: 'Updated at',
            dataIndex: 'updatedAt',
            search: false,
            sorter: true,
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
                        style={{
                            color: "#ee5253"
                        }}
                        onClick={() => handleBtnUpdate(record)}
                    />
                    <Popconfirm
                        title="Delete the book"
                        description="Are you sure to delete this book?"
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
        }
    ];
    const actionRef = useRef<ActionType>(null);
    return (
        <>
            <NewBook
                setOpenNew={setOpenNew}
                openNew={openNew}
                reloadTable={reloadTable}
            />
            <UpdateBook
                setOpenUpdate={setOpenUpdate}
                openUpdate={openUpdate}
                setUpdatedBook={setUpdatedBook}
                updatedBook={updatedBook}
                reloadTable={reloadTable}
            />
            <BookDetail
                setOpenDetail={setOpenDetail}
                openDetail={openDetail}
                bookDetail={bookDetail}
            />
            <ProTable<IBookTable>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params, sort) => {
                    let url = `current=${params.current}&pageSize=${params.pageSize}&sort=-createdAt`;
                    if (sort.createdAt === "ascend")
                        url += `&sort=createdAt`;
                    if (sort.createdAt === "descend")
                        url += `&sort=-createdAt`;
                    if (sort.price === "ascend")
                        url += `&sort=price`;
                    if (sort.price === "descend")
                        url += `&sort=-price`;
                    if (params.mainText)
                        url += `&mainText=/${params.mainText}/i`;
                    if (params.author)
                        url += `&author=/${params.author}/i`;
                    const res = await getBooksWithPaginateAPI(url);
                    if (res && res.data) {
                        setMeta(res.data.meta)
                    }
                    return {
                        data: res.data?.result
                    }
                }}
                pagination={{
                    pageSizeOptions: [5, 10, 20],
                    showSizeChanger: true,
                    pageSize: meta.pageSize,
                    total: meta.total,
                    current: meta.current,
                }}
                headerTitle="Book Table"
                toolBarRender={() => [
                    <Button
                        key="button"
                        icon={<PlusOutlined />}
                        onClick={handleBtnNew}
                        type="primary"
                    >
                        New Book
                    </Button>
                ]}
            />
        </>
    );
}
export default BookTable;