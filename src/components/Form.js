import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Row } from "antd";
import styled from "styled-components";
import { Radio } from "antd";
import http from '../utils/http';
import {encrypt} from '../utils/encrypt';
import storage from "../utils/storage";
import { useNavigate } from "react-router-dom";

export const StyledButton = styled(Button)`
  &&& {
    width: 100%;
  }
`;

const loginRequest = async (values) => {
  const { password, ...rest } = values;
  const newParams = {
    ...rest,
    password: encrypt(password),
  };
  //网络问题 为啥
  return http
    .post("login", newParams)
    .then((res) => res.data);
};

// const [form] = Form.useForm();
// const router = useRouter();
const login = async (values) => {
  const { data } = await loginRequest(values);
  console.log("response", data);
  return data;
};

const LoginForm = () => {

  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    const data = await login(values);
    if (!!data) {
      console.log("success");
      storage.setUserInfo(data);
      navigate('/home');
    }
  };
  return (
    <Row justify="center">
      <Form
        style={{ width: 308 }}
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item name="role">
          <Radio.Group>
            <Radio.Button value="student">Student</Radio.Button>
            <Radio.Button value="teacher">Teacher</Radio.Button>
            <Radio.Button value="manager">Manager</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item
            style={{
              background: "pink",
              display: "flex",
              justifyContent: "center",
            }}
            name="remember"
            valuePropName="checked"
            noStyle
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <StyledButton
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </StyledButton>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </Row>
  );
};
export default LoginForm;
