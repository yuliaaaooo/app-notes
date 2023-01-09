import React from "react";
import http from "../utils/http";
import { Button, Checkbox, Form, Input, Select } from "antd";
import lodash from "lodash";
const studentListModalForm = (props) => {
  //3.2.3忘记写这一步了！！还有 =（props）
  const { handleSaveSuccess, editRow } = props;

  const onFinish = async (values) => {
    //？？为什么用let不用const，为什么要写null而不是{}
    let res = null;
    if (values.id) {
      //错误写法1：http.post("/students")...;
      //错误写法2：http.post('/students',{values}错了
      res = await http.put("/students", values);
    } else {
      res = await http.post("/students", values);
    }

    //3.2.4 ❌：res.data.msg；如果success，就关闭Modal添加页面，所以要setIsModalOpen（从studentList文件传进来），也就是handleSvaesuccess函数
    if (lodash.get(res, "data.msg") === "success") {
      handleSaveSuccess();
    }
    console.log("Modal Submit Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Modal Submit Failed:", errorInfo);
  };

  return (
    <Form
      initialValues={editRow}
      name="Edit Student"
      // 想让他居中结果用 display:flex, justifyContent:'center'发现不行
      labelCol={{
        span: 7,
      }}
      wrapperCol={{
        span: 14,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item label="id" name="id" style={{ display: "none" }}></Form.Item>
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input your Name!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        //name对应的是Swagger UI里面的字段哈
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your Email!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Area"
        name="country"
        rules={[
          {
            required: true,
            message: "Please input your Area!",
          },
        ]}
      >
        {/* 一般来说这里应该调后端api,然后获取有哪些area,但是没提供api，所以写死*/}
        <Select>
          <Select.Option value="China">China</Select.Option>
          <Select.Option value="New Zealand">New Zealand</Select.Option>
          <Select.Option value="Canada">Canada</Select.Option>
          <Select.Option value="Australia">Australia</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Student Type"
        name="type"
        rules={[
          {
            required: true,
            message: "Please input your Student Type!",
          },
        ]}
      >
        <Select>
          <Select.Option value="tester">tester</Select.Option>
          <Select.Option value="developer">developer</Select.Option>
        </Select>
      </Form.Item>

      {/* style={{display:'none'}要写在form.item组件里面而不是button组件 */}
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
        style={{ display: "none" }}
      >
        <Button type="primary" htmlType="submit" id="studentFormSubmit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default studentListModalForm;
