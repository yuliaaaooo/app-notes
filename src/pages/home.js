import LoginForm from "../components/Form";
import { Typography } from "antd";

import styled from "styled-components";
const { Title } = Typography;
export const StyledTitle = styled(Title)`
  text-align: center;
  margin: 0.5em 0;
  @media (max-width: 700px) {
    margin-top: 2em;
    font-size: 18px !important;
    padding-bottom: 0;
  }
`;
function Home() {
  return (
    <div>
      <StyledTitle>this is home</StyledTitle>
    </div>
  );
}

export default Home;
