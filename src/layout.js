/*
next部分
第二次
import Link from 'next/link';

*/

//2----
import React, { useState } from "react";
import styled from "styled-components";
//useNavigate是react-dom里的不是react里的，import from 错了，怪不得Thrown Error
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
//Can't resolve './utils/test/http 路径写错
import http from "./utils/http";
//是from 'lodash' 不是'/lodash'
import lodash from "lodash";
import storage from "./utils/storage";
import { HeaderIcon } from "./style";
//------

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
} from "@ant-design/icons";
import { Layout, Menu, theme, Row, Dropdown, Breadcrumb } from "antd";
import AppBreadcrumb from "./components/breadcrumb";
//这行要在style（header）的前面

import service from "./service";

const { Header, Sider, Content } = Layout;

const Logo = styled.div`
  height: 64px;
  ${"" /*老师写法:width: 100%; display: inline-flex; vs 我：display: flex;*/}
  ${"" /* 这个width：100% 帮助居中了诶，或者说侧面通过扩充盒子居中了 */}
  ${
    "" /* 为什么没有display: inline-flex字体大小就会变啊？？有inline-flex的时候字体正常 */
    /* 而且flex和inline-flex—width效果一样 但是！！display:flex是添加在父项的，但这也是父项没错啊*/
  }
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 24px;
  color: #fff;
  ${"" /* letter-space: 5px; */}
  text-shadow: 5px 1px 5px;
  transform: rotateX(45deg);
  font-family: monospace;
`;

const StyledLayoutHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${"" /* position: sticky; */}
  ${"" /* top: 0; */}
  ${"" /* z-index: 10; */}
`;
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
//2.0.2
const items = [
  //key？？？
  getItem("Overview", "Overview", <PieChartOutlined />),
  getItem("Student", "student", <MailOutlined />, [
    getItem("Student List", "studentList"),
  ]),
  getItem("Teacher", "teacher", <DesktopOutlined />, [
    getItem("Teacher List", "6"),
  ]),
  getItem("Course", "course", <ContainerOutlined />, [
    getItem("All Course", "AllCourse"),
    getItem("Add Course", "AddCourse"),
    getItem("Edit Course", "EditCourse"),
  ]),
  getItem("Manage", "sub2", <AppstoreOutlined />),
];
//2.2 就是下拉菜单dropdown的第一个example,和2.1一起的
//这里要加上useRole！=='manager'
const userItems = (navigate) => [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        profile
      </a>
    ),
  },
  {
    key: "4",
    danger: true,
    label: (
      <span
        onClick={() => {
          // http.post("login", newParams).then((res) => res.data)
          //而下面这个是logout，不用传参数newParams
          // http.post("logout").then((res) => {
          //   console.log("logout res", res);
          //   if (lodash.get(res, "data.data")) {
          //     storage.setUserInfo(null);
          //     navigate("/login");
          //   }
          // });
          service.logout().then((res) => {
            console.log("logout res", res);
            if (lodash.get(res, "data")) {
              storage.setUserInfo(null);
              navigate("/login");
            }
          });
        }}
      >
        logout
      </span>
    ),
  },
];
//2.2--------
const App = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  //2.3本来很诧异，这都是在2.2下面是怎么调用到的,2.2只是声明啊，调用在2.3之后
  const navigate = useNavigate();
  //2.3--------
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  //4. 为了实现点击Sider跳转，antd里的menu里随便粘贴了onClick相关的部分
  const [current, setCurrent] = useState("Overview");
  //为啥这里e就能取到key了，所有onClick都这样吗
  const handleClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    navigate("/" + e.key);
  };
  //
  const location = useLocation();
  useEffect(() => {
    const LastUrl = location.pathname.slice(1);
    setCurrent(LastUrl);
  }, [location.pathname]);
  return (
    //2.0 如何让Layout铺满整个：style={{ height: "100vh" }}
    //代码是Antd 的Layout
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Logo>
          {/* 为啥这里用span元素？行内文字用span？ */}
          <span
            onClick={() => navigate("/")}
            style={{ color: "#fff", cursor: "pointer" }}
          >
            CMS
          </span>
        </Logo>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["Overview"]}
          defaultOpenKeys={["sub1"]}
          //2.0.1这里把原代码的item数组提到最前面去了
          items={items}
          //4. 为了实现点击Sider跳转，antd里的menu里随便粘贴了onClick相关的部分
          onClick={handleClick}
          selectedKeys={[current]}
        />
      </Sider>
      <Layout className="site-layout">
        {/* 2.0.3 Antd原代码的Header,被答案换成了StyledLayoutHeader 但是好像StyledLayoutHeader的css不生效 我就还是用Header写吧*/}
        {/* 2.0.3 这里像CMS答案里写color:#fff怎么就不行了 但是'#fff' 好像可以，tips：橙色是字符串*/}
        {/* style={{ color: "#fff", zIndex: 2 }} */}
        <StyledLayoutHeader style={{ color: "white" }}>
          {/* 所以这块就是折叠的那个button吗 */}
          <HeaderIcon>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            {/* 所以这块就是折叠的那个button吗------*/}
          </HeaderIcon>

          {/* 这里用Row和用div都一样，反正display：flex会让他水平分布*/}
          {/*不不不，用Row的话铃铛图标会挤到上面去，不知道为啥*/}
          <div
            style={{
              color: "white",
              width: 80,
              fontSize: 16,
            }}
          >
            {/* 1.不是用等于号font-size=18px 是冒号; 2.写法和./style文件里不一样,而且要加‘’*/}
            <HeaderIcon>
              <BellOutlined style={{ marginRight: "2em" }} />
            </HeaderIcon>
            {/* 2.1 页面最右边带下拉菜单的User图标 Antd Dropdown的代码，要搜Dropdown后找component overview*/}
            {/* 就是下拉菜单dropdown的第一个example,和2.2一起的 */}
            {/* items:userItems(navigate)这里本来是menu={{items,}}，冒号是可以这样用的？*/}
            {/* (navigate)是因为里面要做跳转*/}
            {/* Dropdown里加style={{ marginLeft: "5em" }}不管用，要在UserOuelined里加 */}
            <HeaderIcon>
              <Dropdown
                menu={{
                  items: userItems(navigate),
                }}
              >
                <UserOutlined />
              </Dropdown>
              {/* 2.1 -------*/}
            </HeaderIcon>
          </div>
        </StyledLayoutHeader>
        {/* 为什么这里加setCurrent没用 ？？*/}
        <AppBreadcrumb setCurrent={setCurrent} />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            //为什么没有px，为什么不能width:100%,height: 100vh,
            height: "100vh",
            background: colorBgContainer,
            //overflow这里注意！！
            overflow: "auto",
            flex: 1,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
    //2.0---------------
  );
};
export default App;
