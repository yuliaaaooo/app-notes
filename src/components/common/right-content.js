import { MinusCircleOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {Input, Row, Col, Button, TimePicker, Select} from "antd";
import Form from "antd/lib/form";
import React, { useState } from "react";
import { useDynamicList } from 'ahooks';
import {gutter} from "../../lib/constant";


export default () => {
    const { list, remove, getKey, insert, replace, push } = useDynamicList([{}]);
    const disabledObj = {};
    for(let item of list){
        disabledObj[item.weekday] = true;
    }
    const RowLeftItem = (index, item) => {
        let isLast = index===list.length - 1;
        return (
            <div key={getKey(index)} style={{marginBottom: 16}}>
                <div>
                    <Select
                        style={{width: 300}}
                        placeholder="Please enter weekday"
                        onChange={(value) =>{
                            const item = list[index];
                            item["weekday"] =  value;
                            replace(index, item)
                        }}
                        options={[
                            { value: 'Sunday', label: 'Sunday',disabled:disabledObj['Sunday'] },
                            { value: 'Monday', label: 'Monday',disabled:disabledObj['Monday'] },
                            { value: 'Tuesday', label: 'Tuesday',disabled:disabledObj['Tuesday'] },
                            { value: 'Wednesday', label: 'Wednesday',disabled:disabledObj['Wednesday'] },
                            { value: 'Thursday', label: 'Thursday',disabled:disabledObj['Thursday'] },
                            { value: 'Friday', label: 'Friday',disabled:disabledObj['Friday'] },
                            { value: 'Saturday', label: 'Saturday',disabled:disabledObj['Saturday'] },
                        ]}
                        value={item.weekday}
                    />

                    <TimePicker
                        style={{width: 300, marginLeft: 10}}
                        placeholder="Please enter time"
                        onChange={(value) =>{
                            item["time"] =  value;
                            replace(index, item)
                        }}
                        value={item.time}
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
