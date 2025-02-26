import React, { useState } from 'react';
import {
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
        getItem('Admins', 'admins'),
        getItem('Users', 'users'),
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
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout>

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
                <Footer style={{ textAlign: 'center' }}>
                    Hi My name is Phuc. I am majoring in software engineering
                </Footer>
            </Layout>
        </Layout >
    );
};

export default AdminLayout;