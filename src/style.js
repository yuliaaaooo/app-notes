
import styled from "styled-components";

export const HeaderIcon = styled.span`
  ${"" /* 调整图标大小用font-size就可以？厉害 */}
  font-size: 18px;
  color: #fff;
  ${"" /* 鼠标设置:接触显示蓝色 */}
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #1890ff;
  }
`;

//因为header里几个icon都用到了（不同的文件里），所以要专门写个这个文档
//而且像折叠按钮那一块⬇️ 根本没有办法加styled 所以可以用这个headerIcon包裹一下
// {React.createElement(
// collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
