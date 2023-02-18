import { MinusCircleOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {Input, Row, Col, Button} from "antd";
import Form from "antd/lib/form";
import React, { useState } from "react";
import { useDynamicList } from 'ahooks';
import {gutter} from "../../lib/constant";
import LeftContent from "../common/left-content";
import RightContent from "../common/right-content";


export default () => {


    return (
        <Row gutter={gutter}>
            <Col span={12}>
                <LeftContent/>
            </Col>
            <Col span={12}>
                <RightContent/>
            </Col>
        </Row>
    );
};
