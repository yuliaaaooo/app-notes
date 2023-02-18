import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const breadcrumbNameMap = {
  "/Overview": "Overview",
  "/studentList": "Student List",
  "/teachers": "Teacher List",
  "/course": "All Course",
  "/message": "Message",
  "/AddCourse": "Add-course",
  "/AllCourse": "All-course",
};

export default function AppBreadcrumb(props) {
  // 这里思路不对，不应该直接点击面包屑后触发sider变化，而是面包屑>Url变化（useEffect）>sider变化
  // const { setCurrent } = props;
  // const [currentBreadcrumb, setcurrentBreadcrumb] = useState("Overview");
  //我们得有URL才行
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link
          to={url}
          //为什么我加的这个setCurrent不起效呢
          onClick={(e) => {
            console.log("e.key", e.key);
            // setcurrentBreadcrumb(e.key);
          }}
        >
          {breadcrumbNameMap[url]}
        </Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/Overview">CMS MANAGER SYSTEM</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);
  return (
    <Breadcrumb style={{ marginLeft: 20, marginTop: 10 }}>
      {breadcrumbItems}
    </Breadcrumb>
    // <Breadcrumb separator="/">
    //   <Breadcrumb.Item>
    //     <Link to="/overview">CMS MANAGER SYSTEM</Link>
    //   </Breadcrumb.Item>
    //   <Breadcrumb.Item href="">Student</Breadcrumb.Item>
    //   <Breadcrumb.Item href="">Student List</Breadcrumb.Item>
    // </Breadcrumb>
  );
}
