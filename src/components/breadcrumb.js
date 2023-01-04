import { Breadcrumb } from "antd";
export default function AppBreadcrumb() {
  return (
    <Breadcrumb separator="/">
      <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
      <Breadcrumb.Item href="">Student</Breadcrumb.Item>
      <Breadcrumb.Item href="">Student List</Breadcrumb.Item>
    </Breadcrumb>
  );
}
