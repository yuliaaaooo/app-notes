import React, { useState } from "react";
import { CloseCircleOutlined, InboxOutlined, KeyOutlined } from '@ant-design/icons';
import Form from "antd/lib/form";
import ImgCrop from 'antd-img-crop';
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
import NumberWithUnit from "../common/number-with-unit";
//？？？？
//？？？
import {DurationUnit, gutter} from "../../lib/constant";
import styled from "styled-components";
import FormItem from "antd/lib/form/FormItem";
import TextArea from "antd/lib/input/TextArea";

const UploadItem = styled(Form.Item)`
  .ant-upload.ant-upload-select{
    width: 100% !important;
    height: 100% !important;
  }
  .ant-upload-list-item-container{
    width: 100% !important;
    height: 100% !important;
  }
  .ant-upload.ant-upload-select-picture-card {
    width: 100%;
    margin: 0;
  }
  .ant-form-item-control {
    position: absolute;
    inset: 0;
    top: 37px;
    bottom: 30px;
  }
  .ant-upload-picture-card-wrapper,
  .ant-form-item-control-input,
  .ant-form-item-control-input div {
    height: 100%;
  }
  .ant-upload-picture-card-wrapper img {
    object-fit: cover !important;
  }
  .ant-upload-list-item-progress,
  .ant-tooltip {
    height: auto !important;
    .ant-tooltip-arrow {
      height: 13px;
    }
  }
  .ant-upload-list-picture-card-container {
    width: 100%;
  }
  .ant-upload-list-item-actions {
    .anticon-delete {
      color: red;
    }
  }
`;

const UploadInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgb(240, 240, 240);
  width: 100%;
  .anticon {
    font-size: 44px;
    color: #1890ff;
  }
  p {
    font-size: 24px;
    color: #999;
  }
`;
const DeleteIcon = styled(CloseCircleOutlined)`
  color: red;
  position: absolute;
  right: -10px;
  top: 1em;
  font-size: 24px;
  opacity: 0.5;
`;
// import UploadComponent from "./upload";
export default function AddCourseForm() {
  const [isTeacherSearching, setIsTeacherSearching] = useState(false);
  //干嘛用的 set teacher
  const [teachers, setTeachers] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const DurationUnit = ['year','month','day','week','hour']
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = (await getBase64(file.originFileObj));
    }

    setPreview({
      previewImage: file.url || file.preview,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };
  return (
    <div>
      <Form layout="vertical">
        <Row gutter={gutter}>
          <Col span={8}>
            <Form.Item
              label="Course Name"
              name="name"
              rules={[{ required: true }, { max: 100, min: 3 }]}
            >
              <Input type="text" placeholder="course name" />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Row  gutter={gutter}>
            <Col span={8}>
              <Form.Item
                label="Teacher"
                name="teacherId"
                rules={[{ required: true }]}
                style={{ marginLeft: 5 }}
              >
                <Select
                  style={{width:"100%"}}
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
              >
                <Input type="text"  />
              </Form.Item>
            </Col>
            <Col span={8} >
              <Form.Item
                label="Course Code"
                name="type"
                rules={[{ required: true }]}
              >
                <Input type="text"  disabled/>
              </Form.Item>
            </Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={gutter}>
          <Col span={8}>
            <Form.Item
                label="Start Date"
                name="startTime"
            >
              <DatePicker style={{width:"100%"}}/>
            </Form.Item>
            <Form.Item
                label="Price"
                name="startTime"
                required
            >
              <InputNumber
                  style={{width:"100%"}}
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
            <Form.Item
                label="Student Limit"
                name="startTime"
                required
            >
              <Input
                  style={{width:"100%"}}
              />
            </Form.Item>
            <Form.Item
                label="Duration"
                name="startTime"
                required
            >
              <NumberWithUnit
                  style={{width:"100%"}}
                  defaultUnit={2}
                  options={DurationUnit.map((item, index)=>({
                    unit: index + 1, label: item
                  }))}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
                label="Description"
                name="sescription"
                required
            >
              <Input.TextArea
                  style={{height:294}}
              />
            </Form.Item>
            {/*<Form.Item label="Price" name="price" rules={[{ required: true }]}>*/}
            {/*  <InputNumber*/}
            {/*    formatter={(value) =>*/}
            {/*      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")*/}
            {/*    }*/}
            {/*    // @ts-ignore*/}
            {/*    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}*/}
            {/*    min={0}*/}
            {/*    style={{ width: "100%" }}*/}
            {/*  />*/}
            {/*</Form.Item>*/}
          </Col>
        <Col span={8}  style={{ position: 'relative' }}>
          <UploadItem  label="Cover" name="cover">
            <ImgCrop rotate aspect={16 / 9}>
              <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={({ fileList: newFileList, file }) => {
                    const { status } = file;

                    if (file.response) {
                      const { url } = file.response;

                      // form.setFieldsValue({ cover: url });
                    } else {
                      // form.setFieldsValue({ cover: course.cover || '' });
                    }

                    setIsUploading(status === 'uploading');
                    setFileList(newFileList);
                  }}
                  onPreview={handlePreview}
              >
                {fileList.length >= 1 ? null : (
                    <UploadInner>
                      <InboxOutlined />
                      <p>Click or drag file to this area to upload</p>
                    </UploadInner>
                )}
              </Upload>
            </ImgCrop>
          </UploadItem>
          {/* 用于上传超时取消上传 */}
          {isUploading && (
              <DeleteIcon
                  onClick={() => {
                    setIsUploading(false);
                    setFileList([]);
                  }}
              />
          )}
            {/*<Form.Item*/}
            {/*  label="Student Limit"*/}
            {/*  name="maxStudents"*/}
            {/*  rules={[{ required: true }]}*/}
            {/*>*/}
            {/*  <InputNumber min={1} max={10} style={{ width: "100%" }} />*/}
            {/*</Form.Item>*/}
        </Col>
          {/*<Col>*/}
          {/*  <Form.Item*/}
          {/*    label="Duration"*/}
          {/*    name="duration"*/}
          {/*    //   rules={[{ required: true }, { validator: validateDuration }]}*/}
          {/*  >*/}
          {/*    <NumberWithUnit*/}
          {/*      options={new Array(5).fill("").map((_, index) => ({*/}
          {/*        unit: index + 1,*/}
          {/*        label: DurationUnit[index + 1],*/}
          {/*      }))}*/}
          {/*      defaultUnit={DurationUnit.month}*/}
          {/*    />*/}
          {/*  </Form.Item>*/}
          {/*</Col>*/}

          {/*<Col span={8} style={{ position: "relative" }}>*/}
          {/*  <FormItem*/}
          {/*    label="Description"*/}
          {/*    name="detail"*/}
          {/*    rules={[*/}
          {/*      { required: true },*/}
          {/*      {*/}
          {/*        min: 100,*/}
          {/*        max: 1000,*/}
          {/*        message:*/}
          {/*          "Description length must between 100 - 1000 characters.",*/}
          {/*      },*/}
          {/*    ]}*/}
          {/*  >*/}
          {/*    <TextArea*/}
          {/*      placeholder="Course description"*/}
          {/*      style={{ height: "100%" }}*/}
          {/*    />*/}
          {/*  </FormItem>*/}

          {/*</Col>*/}

          {/*<Col span={8}>/!* <UploadComponent /> *!/</Col>*/}
        </Row>
      </Form>
      <Modal
          visible={!!preview}
          title={preview&&preview.previewTitle}
          footer={null}
          onCancel={() => setPreview(null)}
      >
        <img alt="example" style={{ width: '100%' }} src={preview&&preview.previewImage} />
      </Modal>
    </div>
  );
}
