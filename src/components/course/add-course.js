import React, { useState } from "react";
import Form from "antd/lib/form";
import {
  Button,
  Col,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Spin,
  Upload,
} from "antd";
import Service from "../../service";
import DatePicker from "../common/date-picker";
//？？？？
import NumberWithUnit from "../common/number-with-unit";
//？？？
import { DurationUnit } from "../../lib/constant";
import FormItem from "antd/lib/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
// import UploadComponent from "./upload";
export default function AddCourseForm() {
  const [isTeacherSearching, setIsTeacherSearching] = useState(false);
  //干嘛用的 set teacher
  const [teachers, setTeachers] = useState([]);
  return (
    <div>
      <Form layout="vertical">
        <Row gutter={[6, 16]}>
          <Col span={8}>
            <Form.Item
              label="Course Name"
              name="name"
              rules={[{ required: true }, { max: 100, min: 3 }]}
            >
              <Input type="text" placeholder="course name" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Teacher"
              name="teacherId"
              rules={[{ required: true }]}
              style={{ marginLeft: 5 }}
            >
              <Select
                //让宽度变宽了
                placeholder="Select teacher"
                //showSearch是为了能打字
                showSearch
                onSearch={(query) => {
                  setIsTeacherSearching(true);

                  Service.getTeachers({ query }).then((res) => {
                    const { data } = res;

                    if (!!data) {
                      setTeachers(data.teachers);
                    }
                    setIsTeacherSearching(false);
                  });
                }}
              >
                {/* 原来下拉框是select option */}
                {teachers.map(({ id, name }) => (
                  <Select.Option key={id} value={id}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true }]}
            ></Form.Item>
          </Col>
          <Col span={8} style={{ backgroundColor: "blue" }}>
            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true }]}
            ></Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item label="Start Date" name="startTime">
              <DatePicker />
            </Form.Item>
            <Form.Item label="Price" name="price" rules={[{ required: true }]}>
              <InputNumber
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                // @ts-ignore
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                min={0}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              label="Student Limit"
              name="maxStudents"
              rules={[{ required: true }]}
            >
              <InputNumber min={1} max={10} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Duration"
              name="duration"
              //   rules={[{ required: true }, { validator: validateDuration }]}
            >
              <NumberWithUnit
                options={new Array(5).fill("").map((_, index) => ({
                  unit: index + 1,
                  label: DurationUnit[index + 1],
                }))}
                defaultUnit={DurationUnit.month}
              />
            </Form.Item>
          </Col>

          <Col span={8} style={{ position: "relative" }}>
            <FormItem
              label="Description"
              name="detail"
              rules={[
                { required: true },
                {
                  min: 100,
                  max: 1000,
                  message:
                    "Description length must between 100 - 1000 characters.",
                },
              ]}
            >
              <TextArea
                placeholder="Course description"
                style={{ height: "100%" }}
              />
            </FormItem>
          </Col>

          <Col span={8}>{/* <UploadComponent /> */}</Col>
        </Row>
      </Form>
    </div>
  );
}
