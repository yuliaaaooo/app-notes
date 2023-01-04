import { Button } from "antd";
//⬇️Search不是直接import的，根据antd文档是input变来的。
// import Search from "antd/es/transfer/search";

import React, { useCallback, useEffect, useState } from "react";
import { Radio, Space, Table, Tag, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { formatDistanceToNow } from "date-fns";
import lodash from "lodash";
import http from "../utils/http";
//search 和 columns声明变量之前写错位置，写到了function里面
const { Search } = Input;

const columns = [
  {
    title: "No.",
    // No.1234这种 没有dataIndex: "name",写了dataIndex: "index",好像也没事
    key: "index",
    render: (_1, _2, index) => index + 1,
  },
  {
    title: "Name",
    //是怎么知道的？？？？还有key是随便写的吗,useffect里写个console.log("ls", list)就能看到
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Area",
    dataIndex: "country",
    key: "country",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Selected Curriculum",
    key: "courses",
    dataIndex: "courses",
    //数组拼接！！所以map返回的是一个新数组，再用.join
    //key是不是随便写 无所谓的吧？？
    render: (courses) => {
      return (courses || []).map((item) => item.name).join(",");
    },
  },
  {
    title: "Student Type",
    key: "typeName",
    dataIndex: "typeName",
    render: (_, record) => lodash.get(record, "type.name"),
    //为啥不行？？
    // render: (_, record) => {
    //   console.log("record", record.type.name);
    //   lodash.get(record, "type.name");
    // },
  },
  {
    title: "Join Time",
    key: "joinTime",
    //打错成createAt，报错Invalid time value
    dataIndex: "createdAt",
    render: (value) =>
      formatDistanceToNow(new Date(value), { addSuffix: true }),
  },
  {
    title: "Action",
    key: "action",
    //这不需要写dataIndex
    //为了给两个a标签之间留点空间，用了antd 的 space
    render: (_, record) => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

export default function StudentList() {
  const [list, setList] = useState();
  const getStudent = useCallback(
    lodash.debounce(async (query) => {
      const params = {
        page: 1,
        limit: 10,
      };
      if (query) {
        params.query = query;
      }
      const res = await http.get("students", { params });
      setList(lodash.get(res, "data.data.students", []));
    }, 1000),
    []
  );
  useEffect(() => {
    getStudent();
  }, []);

  function onSearch(value) {
    getStudent(value);
  }

  return (
    <div>
      {/* 注意他用一个div装起来这两个元素button和search，而之前header也是 */}
      <div
        //   这个style很重要
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          marginBottom: "8px",
        }}
      >
        {/* style加的 */}
        <Button type="primary">
          <PlusOutlined />
          Add
        </Button>
        {/* 抄search的时候,上面有行const{search}=input 忘记抄了导致样式不一样 */}

        <Search
          placeholder="input search text"
          allowClear
          onSearch={onSearch}
          // 好神奇之前写的width:'300'的话就不会stick to 浏览器最右，但是改成30%就可以了
          style={{
            width: "30%",
          }}
        />
      </div>
      <Table columns={columns} dataSource={list} />
    </div>
  );
}
