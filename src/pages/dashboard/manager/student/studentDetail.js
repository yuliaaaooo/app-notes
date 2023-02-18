import { Card, Row, Col, Tabs, Tag, Table } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React, { useEffect, useState, Component, Link } from "react";
import service from "../../../../service";
import { useParams } from "react-router-dom";

const Page = () => {
  const [data, setData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [info, setInfo] = useState([]);
  const [about, setAbout] = useState([]);
  const { id } = useParams();

  const columns = [
    {
      title: "No.",
      key: "index",
      render: (_, _2, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      render: () => <Link>Mary</Link>,
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (type) => type.map((item) => item.name).join(","),
    },
    {
      title: "Join Time",
      dataIndex: "ctime",
      render: () => <a>Time</a>,
    },
  ];

  useEffect(() => {
    (async () => {
      const { data } = await service.getStudentById(id);
      console.log("data", data);
      const info = [
        { label: "Name", value: data.name },
        { label: "Age", value: data.age },
        { label: "Email", value: data.email },
        { label: "Phone", value: data.phone },
      ];
      const about = [
        { label: "Eduction", value: data.education },
        { label: "Area", value: data.country },
        { label: "Gender", value: data.gender === 1 ? "Male" : "Female" },
        {
          label: "Member Period",
          value: data.memberStartAt + " - " + data.memberEndAt,
        },
        { label: "Type", value: data.type.name },
        { label: "Create Time", value: data.ctime },
        { label: "Update Time", value: data.updateAt },
      ];
      setInfo(info);
      setCourses(data.courses);
      console.log(data.courses);
      console.log("courses", courses);
      setAbout(about);
      setData(data);
    })();
  }, []);

  return (
    <Row gutter={[6, 16]}>
      <Col span={8}>
        <Card
          title={
            <Avatar
              style={{
                width: 100,
                height: 100,
                display: "block",
                margin: "auto",
              }}
            />
          }
        >
          <Row gutter={[6, 16]}>
            {info.map((item) => (
              <Col span={12} key={item.label} style={{ textAlign: "center" }}>
                <b>{item.label}</b>
                <p>{item.value}</p>
              </Col>
            ))}
          </Row>
          <Row gutter={[6, 16]}>
            <Col span={24} style={{ textAlign: "center" }}>
              <b>Address</b>
              <p>1 </p>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col offset={1} span={15}>
        <Card>
          <Tabs defaultActiveKey="1" animated={true}>
            <Tabs.TabPane tab="About" key="1">
              <h3>Information</h3>
              <Row gutter={[6, 16]}>
                {about.map((item) => (
                  <Col span={24} key={item.label}>
                    <b
                      style={{
                        marginRight: 16,
                        minWidth: 150,
                        display: "inline-block",
                      }}
                    >
                      {item.label}:
                    </b>
                    <span>{item.value}</span>
                  </Col>
                ))}
              </Row>
              <h3>Interesting</h3>
              <Row gutter={[6, 16]}>
                {}
                <Col></Col>
              </Row>
              <h3>Description</h3>
              <Row gutter={[6, 16]}>
                <Col style={{ lineHeight: 2 }}>1</Col>
              </Row>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Courses" key="2">
              <Table dataSource={courses} columns={columns}></Table>
            </Tabs.TabPane>
          </Tabs>
        </Card>
      </Col>
    </Row>
  );
};

export default Page;
