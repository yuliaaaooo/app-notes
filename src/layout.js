import "./App.css";
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    BellOutlined,
    UserOutlined,
    SmileOutlined
} from '@ant-design/icons';
import {Breadcrumb, Button, Dropdown, Menu} from 'antd';
import React, { useState } from 'react';
import http from "./utils/http";
import lodash from "lodash";
import storage from "./utils/storage";
import {useNavigate} from "react-router-dom";
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('Overview', '1', <PieChartOutlined />),
    getItem('Student', 'sub1', <MailOutlined />, [
        getItem('Student List', '5'),
    ]),
    getItem('Teacher', '2', <DesktopOutlined />),
    getItem('Course', '3', <ContainerOutlined />),
    getItem('Manage', 'sub2', <AppstoreOutlined />),
];
const userItems= (navigate) => [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
               profile
            </a>
        ),
    },
    {
        key: '4',
        danger: true,
        label: <span onClick={()=>{
            http.post("logout").then((res)=>{
                if(lodash.get(res,'data.data')){
                    storage.setUserInfo(null);
                    navigate("/login");
                }
            })
        }}>logout</span>,
    },
];
function Layout({children}) {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const navigate = useNavigate();
    return (
        <div style={{display:'flex'}}>
            <div
                style={{
                    flexBasis: 256,
                }}
            >

                <div style={{
                    height: '50px',
                    background: '#001529',
                    color:'white',
                    textAlign: 'center',
                    lineHeight: '50px',
                    textShadow: '3px 2px 11px',
                    letterSpacing: '3px'}}>

                    CMS
                </div>
                <Menu
                    defaultSelectedKeys={['5']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={collapsed}
                    items={items}
                />
            </div>
            <div style={{flex:1,background: '#f2f2f2',height: '100vh', overflow: 'auto'}}>
                <div style={{
                    background:'#001529',
                    lineHeight:'50px',
                    height: 50,
                    display:'flex',
                    justifyContent:'space-between',

                }}>
                    <Button
                        type="primary"
                        onClick={toggleCollapsed}
                        style={{
                            margin: 8,
                        }}
                    >
                        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </Button>
                    <div style={{  color:'white',width: 80,fontSize: 16}}>
                        <BellOutlined style={{marginRight: 16}}/>
                        <Dropdown
                            menu={{
                                items:userItems(navigate),
                            }}
                        >
                            <UserOutlined />
                        </Dropdown>
                    </div>
                </div>
                <Breadcrumb>
                    <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="">Student</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Student List</Breadcrumb.Item>
                </Breadcrumb>
                {children}
            </div>
        </div>
    );
}

export default Layout;
