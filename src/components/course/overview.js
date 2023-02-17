//???要好好研究一下
import { HeartFilled, UserOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { gutter } from "../../lib/constant";
import { DurationUnit } from "../../lib/constant";

const StyledRow = styled(Row)`
  position: relative;
  :after {
    content: "";
    position: absolute;
    bottom: 0;
    background: #f0f0f0;
    width: 100%;
    height: 1px;
  }
`;

const getDuration = (data) => {
  const { duration, durationUnit } = data;
  const text = `${duration} ${DurationUnit[durationUnit]}`;

  return duration > 1 ? text + "s" : text;
};
export default function CourseOverview(props) {
  return (
    <Card
      cover={<img src={props.cover} style={{ height: 260 }} />}
      {...props.cardProps}
    >
      <Row gutter={gutter}>
        <h3>{props.name}</h3>
      </Row>

      <StyledRow gutter={gutter} justify="space-between" align="middle">
        <Col>{props.startTime}</Col>
        <Col style={{ display: "flex", alignItems: "center" }}>
          <HeartFilled style={{ marginRight: 5, fontSize: 16, color: "red" }} />
          <b>{props.star}</b>
        </Col>
      </StyledRow>

      <StyledRow gutter={gutter} justify="space-between">
        <Col>Duration:</Col>
        <Col>
          <b>{getDuration(props)}</b>
        </Col>
      </StyledRow>

      <StyledRow gutter={gutter} justify="space-between">
        <Col>Teacher:</Col>
        <Col style={{ fontWeight: "bold" }}>
          {props?.teacherName && (
            <Link to="/dashboard/manager">{props.teacherName}</Link>
          )}
        </Col>
      </StyledRow>

      <Row gutter={gutter} justify="space-between">
        <Col>
          <UserOutlined
            style={{ marginRight: 5, fontSize: 16, color: "#1890ff" }}
          />
          <span>Student Limit:</span>
        </Col>
        <Col>
          <b>{props.maxStudents}</b>
        </Col>
      </Row>

      {props.children}
    </Card>
  );
}
