import LoginForm from "../components/Form";
import {Button, Input, Typography} from "antd";
import {
    PlusOutlined
} from '@ant-design/icons';
import styled from "styled-components";
import { Space, Table, Tag } from 'antd';
import React, {useCallback, useEffect, useState} from 'react';
import lodash from 'lodash';
import {formatDistanceToNow} from "date-fns"
import http from "../utils/http";
const { Search } = Input;
const columns = [
    {
        title: 'No.',
        dataIndex: 'index',
        key: 'index',
        render: (_,record,index) => index+1,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Area',
        dataIndex: 'country',
        key: 'country',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Selected Curriculum',
        key: 'courses',
        dataIndex: 'courses',
        render:(courses)=>{
            return (courses||[]).map(item=>item.name).join(',')
        }
    },
    {
        title: 'Student Type',
        key: 'typeName',
        dataIndex: 'typeName',
        render:(_,record)=>lodash.get(record,'type.name')
    },
    {
        title: 'Join Time',
        key: 'joinTime',
        dataIndex: 'createdAt',
        render:(value)=>formatDistanceToNow(new Date(value),{addSuffix:true})
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Edit</a>
                <a>Delete</a>
            </Space>
        ),
    },
];
function StudentList() {
    const [list, setList ]= useState();
    const getStudent = useCallback(lodash.debounce(async (query)=>{
        const params = {
            page:1,
            limit:10
        }
        if(query){
            params.query = query;
        }
        const res = await http.get('students',{params});
        setList(lodash.get(res,'data.data.students',[]))
    },2000),[])
    useEffect(()=>{
       getStudent();
    },[]);

    function onSearch(value){
        getStudent(value)
    }
    return (
        <div>
            <div style={{display:'flex',justifyContent:'space-between',margin:'0 5px'}}>
                <Button style={{margin:8}} type="primary"><PlusOutlined />Add</Button>
                <Search placeholder="Search by name"
                        allowClear
                        onSearch={onSearch}
                        style={{
                            width: 300,
                        }} />
            </div>

            <Table columns={columns} dataSource={list} />
        </div>
    );
}

export default StudentList;
