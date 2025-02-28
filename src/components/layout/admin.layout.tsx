import React, { useState } from 'react';
import {
    BilibiliOutlined,
    FileWordOutlined,
    PieChartOutlined,
    ShoppingOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Divider, Layout, Menu } from 'antd';
import { useCurrentUser } from '../context/app.context';
import { Link, Outlet } from 'react-router-dom';

const { Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(<Link to='/admin'>Dashboard</Link>, 'dashboard', <PieChartOutlined />),
    getItem('Manage Users', 'manageUsers', <TeamOutlined />, [
        getItem(<Link to='/admin/user'>CRUD</Link>, 'CRUD'),
    ]),
    getItem(<Link to='/admin/book'>Manage Books</Link>, 'manageBooks', <FileWordOutlined />),

    getItem(<Link to='/admin/order'>Manage Orders</Link>, 'manageOrders', <ShoppingOutlined />),
];

const AdminLayout = () => {
    const { user } = useCurrentUser();
    const [collapsed, setCollapsed] = useState(false);
    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user?.avatar}`;
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div style={{
                    color: "#d63031",
                    paddingTop: 5,
                    display: "flex",
                    justifyContent: "center",
                    margin: 10
                }}>
                    <BilibiliOutlined style={{
                        fontSize: 20,
                    }} />
                    <span style={{
                        fontWeight: "bold",
                        fontSize: 17
                    }}> Cuhp </span></div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout style={{
                padding: 10
            }}>

                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: 5,
                    height: 50,
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
                    <div style={{
                        marginRight: 10
                    }}>{`Hi! ${user?.fullName}`}</div>
                </div>
                <Divider style={{
                    margin: 0
                }} />
                <Outlet />
                <Footer style={{
                    display: "flex",
                    padding: 0,
                    justifyContent: "center"
                }}>
                    <div style={{
                        textAlign: 'center',
                        position: "fixed",
                        bottom: 0
                    }}>Hi My name is Phuc. I am majoring in software engineering</div>
                </Footer>
            </Layout>
        </Layout >
    );
};

export default AdminLayout;