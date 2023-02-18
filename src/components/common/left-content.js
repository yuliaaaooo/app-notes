import { MinusCircleOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {Input, Row, Col, Button} from "antd";
import Form from "antd/lib/form";
import React, { useState } from "react";
import { useDynamicList } from 'ahooks';
import {gutter} from "../../lib/constant";


export default () => {
    const { list, remove, getKey, insert, replace, push } = useDynamicList([{}]);

    const RowLeftItem = (index, item) => {
        let isLast = index===list.length - 1;
        return (
            <div key={getKey(index)} style={{marginBottom: 16}}>
                <div>
                    <Input
                        style={{width: 300}}
                        placeholder="Please enter name"
                        onChange={(e) =>{
                            const item = list[index];
                            item["name"] =  e.target.value;
                            replace(index, item)
                        }}
                        value={item.name}
                    />

                    <Input
                        style={{width: 300, marginLeft: 10}}
                        placeholder="Please enter content"
                        onChange={(e) =>{
                            const item = list[index];
                            item["content"] =  e.target.value;
                            replace(index, item)
                        }}
                        value={item.content}
                    />

                    {list.length > 1 && (
                        <MinusCircleOutlined
                            style={{marginLeft: 8}}
                            onClick={() => {
                                remove(index);
                            }}
                        />
                    )}
                    <PlusCircleOutlined
                        style={{marginLeft: 8}}
                        onClick={() => {
                            insert(index + 1, '');
                        }}
                    />
                </div>
                {isLast&&<div>
                    <Row>
                        <Col span={24}>
                            <Button
                                type="dashed"
                                size="large"
                                onClick={() => push({})}
                                block
                                icon={<PlusOutlined />}
                            >
                                Add Chapter
                            </Button>
                        </Col>
                    </Row>
                </div>}
            </div>
        );
    }

    return (
        list.map((ele, index) => RowLeftItem(index, ele))
    );
};
