import { FORMATE_DATE_VN } from "@/services/helper"
import { Badge, Descriptions, Drawer, Image } from "antd"
import { DescriptionsProps } from "antd/lib"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
interface IProp {
    setOpenDetail: (value: boolean) => void
    openDetail: boolean
    bookDetail: IBookTable | undefined
}
const BookDetail = (props: IProp) => {
    const [listImages, setListImages] = useState<string[]>([]);
    const { setOpenDetail, openDetail, bookDetail } = props;
    const onClose = () => {
        setOpenDetail(false);
    }
    useEffect(() => {
        if (bookDetail?.thumbnail && bookDetail.slider) {
            setListImages([bookDetail?.thumbnail, ...bookDetail.slider]);
            console.log("test");
        }
    }, [bookDetail])
    const items: DescriptionsProps['items'] = [
        {
            key: '_id',
            label: 'ID',
            span: 1,
            children: bookDetail?._id,
        },
        {
            key: 'mainText',
            label: 'Title',
            span: 2,
            children: bookDetail?.mainText,
        },
        {
            key: 'author',
            label: 'Author',
            span: 1,
            children: bookDetail?.author
        },
        {
            key: 'price',
            label: 'Price',
            children: bookDetail?.price
        },
        {
            key: 'category',
            label: 'Category',
            span: 2,
            children: <Badge status="processing" text={`${bookDetail?.category}`} />,
        },
        {
            key: 'createdAt',
            label: 'Created At',
            children: dayjs(bookDetail?.createdAt).format(FORMATE_DATE_VN)
        },
        {
            key: 'createdAt',
            label: 'Created At',
            span: 2,
            children: dayjs(bookDetail?.updatedAt).format(FORMATE_DATE_VN)
        },
    ];
    return (
        <>
            <Drawer title="Book Detail" onClose={onClose} open={openDetail} size="large">
                <Descriptions title="User Info" bordered items={items} />
                <div >
                    <h4 style={{
                        height: 60,
                        alignContent: "center"
                    }}>Avatar</h4>
                </div>
                {
                    listImages.map((item) => {
                        return (
                            <Image
                                width={200}
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`}
                            />
                        )
                    })
                }
            </Drawer>
        </>
    )
}
export default BookDetail;