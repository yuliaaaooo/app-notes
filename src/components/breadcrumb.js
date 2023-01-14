import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

const breadcrumbNameMap = {
  "/Overview": "Overview",
  "/studentList": "Student List",
  "/teachers": "Teacher List",
  "/course": "All Course",
  "/message": "Message",
};

export default function AppBreadcrumb(props) {
  const { setCurrent } = props;
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
            setCurrent(e.key);
            console.log("e.key", e.key);
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
