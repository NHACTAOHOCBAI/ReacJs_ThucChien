import { BilibiliOutlined, SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { App, Avatar, Badge, Dropdown, Input, MenuProps, Space } from "antd"
import { useCurrentUser } from "../context/app.context";
import { Link } from "react-router-dom";
import { logoutAPI } from "@/services/api";

const Header = () => {
    const { user, isAuth, setUser, setIsAuth } = useCurrentUser();
    const { message } = App.useApp();
    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user?.avatar}`;
    const handleClick = async () => {
        const resLogout = await logoutAPI();
        if (resLogout && resLogout.data) {
            setIsAuth(false);
            setUser(null);
            localStorage.removeItem("access_token");
            message.success("Logout successfully");
        }
        else
            message.error("Logout failed");
    }
    const items: MenuProps['items'] = [
        {
            key: 'adminPage',
            label: <Link to='/admin'>Admin page</Link>,
        },
        {
            key: 'setting',
            label: 'Setting account',
        },
        {
            key: 'history',
            label: 'Purchase history',
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            label: <div onClick={handleClick}> Logout</div>,
        },
    ];
    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "row",
                gap: 20,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#81ecec",
                height: 54
            }}>
                <div style={{
                    color: "#d63031",
                    paddingTop: 5
                }}>
                    <BilibiliOutlined style={{
                        fontSize: 20
                    }} />
                    <span style={{
                        fontWeight: "bold",
                        fontSize: 17
                    }}> Cuhp's Website </span></div>

                <Input
                    style={{
                        width: "70em"
                    }}
                    placeholder="What do you want to find?"
                    prefix={<SearchOutlined />} />

                <Badge count={1}>
                    <Avatar style={{ backgroundColor: 'rgba(0, 0, 255, 0)', color: '#3498db' }} shape="square" icon={<ShoppingCartOutlined />} />
                </Badge>
                {
                    isAuth ?
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5
                        }}>
                            <div style={{
                                width: 25,
                                height: 25,
                                borderRadius: "50%",
                                backgroundImage: `url(${urlAvatar})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}>
                            </div>
                            <Dropdown menu={{ items }}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        {`Hi! ${user?.fullName}`}
                                    </Space>
                                </a>
                            </Dropdown>
                        </div>
                        :
                        <Link to="/login">Login here</Link>
                }
            </div>
        </>
    )
}
export default Header