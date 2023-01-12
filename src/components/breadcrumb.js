import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
export default function AppBreadcrumb() {
  return (
    <Breadcrumb separator="/">
      <Breadcrumb.Item>
        <Link to="/overview">CMS MANAGER SYSTEM</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item href="">Student</Breadcrumb.Item>
      <Breadcrumb.Item href="">Student List</Breadcrumb.Item>
    </Breadcrumb>
  );
}
