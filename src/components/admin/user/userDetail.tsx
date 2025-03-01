import { FORMATE_DATE_VN } from "@/services/helper"
import { Badge, Descriptions, DescriptionsProps, Drawer } from "antd"
import dayjs from "dayjs"
interface IProps {
    userDetail: IUserTable | undefined
    openDetail: boolean
    setOpenDetail: (open: boolean) => void
}
const UserDetail = (props: IProps) => {
    const { userDetail, openDetail, setOpenDetail } = props;
    const items: DescriptionsProps['items'] = [
        {
            key: '_id',
            label: 'ID',
            span: 2,
            children: userDetail?._id,
        },
        {
            key: 'fullname',
            label: 'Full Name',
            children: userDetail?.fullName,
        },
        {
            key: 'email',
            label: 'Email',
            span: 2,
            children: userDetail?.email
        },
        {
            key: 'phone',
            label: 'Phone',
            children: userDetail?.phone
        },
        {
            key: 'role',
            label: 'Role',
            span: 3,
            children: <Badge status="processing" text={`${userDetail?.role}`} />,
        },
        {
            key: 'createdAt',
            label: 'Created At',
            children: dayjs(userDetail?.createdAt).format(FORMATE_DATE_VN)
        },
        {
            key: 'createdAt',
            label: 'Created At',
            children: dayjs(userDetail?.updatedAt).format(FORMATE_DATE_VN)
        },
    ];
    return (
        <>

            <Drawer title="User Detail Information" onClose={() => setOpenDetail(false)} open={openDetail} size="large">
                <Descriptions title="User Info" bordered items={items} />;
            </Drawer>
        </>
    )
}
export default UserDetail