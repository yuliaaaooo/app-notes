import { Button } from "antd";
//2.0⬇️Search不是直接import的，根据antd文档是input变来的。
//2.0import Search from "antd/es/transfer/search";

import React, { useCallback, useEffect, useState, useRef } from "react";
import { Space, Table, Input, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { formatDistanceToNow } from "date-fns";
import lodash from "lodash";
import http from "../utils/http";
import StudentModalForm from "../components/studentListModalForm";

import service from "../service";

//2.0search 和 columns声明变量之前写错位置，写到了function里面
const { Search } = Input;

// const onFinish = (values) => {
//   console.log('Success:', values);
// };
// const onFinishFailed = (errorInfo) => {
//   console.log('Failed:', errorInfo);
// };

export default function StudentList() {
  //2.5.2搜索部分
  const [list, setList] = useState();
  // 3.1.2 antd：这个setSate 应该放前面 不要放错位置
  const [data, setData] = useState();
  //？？3.4为什么要用Ref
  const searchValue = useRef("");
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      //原来这里current变，页面就会变
      current: 1,
      pageSize: 10,
    },
  });
  const [editingStudent, setEditingStudent] = useState();

  //3.2 Modal Add+Edit: 本来叫const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOk = () => {
    //为啥要改true呢 不对不能改true  showModal才是OnClick的 这个应该是点击完成什么的后Modal关掉
    setIsModalOpen(false);
  };
  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  //2.
  const columns = ({ getStudent }) => [
    {
      title: "No.",
      //2.0 No.1234这种 没有dataIndex: "name",写了dataIndex: "index",好像也没事
      key: "index",
      render: (_1, _2, index) => index + 1,
    },
    {
      title: "Name",
      //2.0 是怎么知道的？？？？还有key是随便写的吗,useffect里写个console.log("ls", list)就能看到
      dataIndex: "name",
      key: "name",
      //sort也没反应？？？？？
      sorter: true,
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
      //2.0 数组拼接！！所以map返回的是一个新数组，再用.join
      //2.0 key是不是随便写 无所谓的吧？？
      render: (courses) => {
        return (courses || []).map((item) => item.name).join(",");
      },
    },
    {
      title: "Student Type",
      key: "typeName",
      //所以数据其实跟dataIndex没关系？？
      dataIndex: "typeName",
      filters: [
        {
          text: "tester",
          value: "tester",
        },
        {
          text: "developer",
          value: "developer",
        },
      ],
      //value是选中的值
      onFilter: (value, record) => record.type.name === value,
      //lodash或者ts就是type?.name(不能用value哈？万一本来没name呢)
      render: (_, record) => lodash.get(record, "type.name"),
    },
    //

    // {
    //   title: "Student Type",
    //   key: "typeName",
    //   dataIndex: "type",
    //   render: (_, record) => {
    //     lodash.get(record, "type.name");
    //   },

    //   filters: [
    //     {
    //       text: "tester",
    //       value: "tester",
    //     },
    //     {
    //       text: "developer",
    //       value: "developer",
    //     },
    //   ],
    //   //注意这里antd的record.name.includes(value)要改，要看record具体结构
    //   onFilter: (value, record) => {
    //     record.type.name.includes(value);
    //     console.log("type", record.type.name, "value"), value;
    //   },
    // },
    {
      title: "Join Time",
      key: "joinTime",
      //2.0 打错成createAt，报错Invalid time value
      dataIndex: "createdAt",
      render: (value) =>
        formatDistanceToNow(new Date(value), { addSuffix: true }),
    },
    {
      title: "Action",
      key: "action",
      //2.0这不需要写dataIndex
      //为了给两个a标签之间留点空间，用了antd 的 space
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              if (record) {
                const editRow = lodash.cloneDeep(record);
                editRow.type = editRow.type.name;
                setEditingStudent(editRow);
              }
              setIsModalOpen(true);
            }}
          >
            Edit
          </a>
          <a
            onClick={() => {
              service.deleteStudent(record.id).then((res) => {
                if (lodash.get(res, "msg") === "success") {
                  getStudent();
                }
              });
              // http.delete("/students/" + record.id).then((res) => {
              //   if (lodash.get(res, "data.msg") === "success") {
              //     message.success("delete student success!");
              //     getStudent();
              //   }
              // });
            }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];
  //2.0在这里面setList
  const getStudent = useCallback(
    lodash.debounce(async (query, tableInfo) => {
      const params = {};
      //3.如果有handleTableChange的话⬇️
      //老师用的方法是重新发新的request去？？但是其实改一下current不就行了吗
      if (tableInfo) {
        //console.log('tableInfo',tableInfo)
        params.page = tableInfo.pagination.current;
        params.limit = tableInfo.pagination.pageSize;
      } else {
        params.page = tableParams.pagination.current;
        params.limit = tableParams.pagination.pageSize;
      }
      //2.0把search value加到params里面
      //query不是必传
      if (query) {
        params.query = query;
      } //else 是3.新加的，是为了保持saerch不被刷新？？
      else {
        //3.4这里不懂？？？如果说没有传search value的话
        params.query = searchValue.current;
      }
      //2.0get params里没body哈，post才可以通过body传
      setLoading(true);
      const res = await service.getStudents(params);
      // const res = await http.get("students", { params });
      setLoading(false);

      //拿到数据以后各种set
      setList(lodash.get(res, "data.students", []));
      //3.1.4 设置table的total总页数

      // 设置table的总页数
      if (tableInfo) {
        tableInfo.pagination.total = lodash.get(res, "data.total");
        setTableParams(tableInfo);
      } else {
        tableParams.pagination.total = lodash.get(res, "data.total");
        setTableParams(tableParams);
      }
      //3. debug分析：为什么点击3 数据变了 但是页标签还是1（因为current没变） 因为点击的tableInfo传进来之后你要去更新tableParams啊
      //3. 写代码的时候区分一下tableParams和这个函数里发请求用的params
      //3. 不仅要用新params（tableInfo）发请求，还要用它去更新TableParams！！！！
      // setTableParams({
      //   // 不懂为什么要这一步加个tableParams？？
      //   ...tableParams,
      //   pagination:{
      //     ...tableParams.pagination,
      //     //为什么老师要用lodash.get？？
      //     total:res.data.data.total
      //   }
      // })
      // console.log('tabelarams',tableParams)
    }, 1000),
    []
  );

  // onChange={handleTableChange}， onChange ：callback execute when 分页/filter/sort change
  const handleTableChange = (pagination, filters, sorter) => {
    //3.1.3为什么在这里debugger
    //既然会重新设current page 为什么没有重设？？
    // console.log('current',pagination.current)
    setTableParams({
      pagination,
      filters,
      // sorter为什么要展开啊？？？？？
      ...sorter,
    });
    // `dataSource` is useless since `pageSize` changed 可是什么情况下pagesize会变？？？
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
    //为什么说undefined
    // console.log('pagination',pagination);
    // getStudent(null,{pagination,filters,...sorter});
    // ??这里null对吗，写searchValue.current？
    getStudent(null, { pagination, filters, ...sorter });
  };

  //3.1.3 antd 自带
  // useEffect(() => {
  //因为getStudent里用了table？
  //   getStudent();
  // }, [JSON.stringify(tableParams)]);

  //2.0 第一次获取数据 而且这个时候query没有东西，所以才有if query，哦好像懂了
  useEffect(() => {
    getStudent();
  }, []);
  //2.5搜索部分：试着让搜索框打的字在console.log(value)显示出来
  //2.5.1 为什么可以接收搜索框打的字：onSearch是callbackfunction 可以接收到(value,event)
  //之前搜索框取字是不是用onclick  e e.target.value来着？
  //textarea onchange 也是 e e.target.value
  function onSearch(value) {
    //3.4 不太懂 把值保存下来
    searchValue.current = value;
    //2.0特别关键的地方，这里拿到最新的用户想 searchvalue之后 点击按钮触发⬇️getStudent 把searchvalue字直接传进去 直接去http request
    //而不是 const [search, setsearch] = useState() 再在84行里去写到params ，因为你只有点击onsearch 才有最新值 ，你这样setstate没有最新值
    //除非你在这个onSearch函数里加一行setState
    getStudent(value);
  }
  //3.2.2成功后两件事，关闭页面+刷新列表
  //其实你直接  <StudentModalForm setIsModalOpen={setIsModalOpen}/>一个一个传进去也行
  //但现在是
  const handleSaveSuccess = () => {
    setIsModalOpen(false);
    getStudent();
    message.success("save success!");
  };
  return (
    <div>
      {isModalOpen && (
        <Modal
          title={editingStudent ? "Edit Student" : "Add Student"}
          open={isModalOpen}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          footer={[
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={() => {
                const dom = document.getElementById("studentFormSubmit");
                dom.click();
              }}
            >
              {editingStudent ? "Edit" : "Add"}
            </Button>,
            <Button key="back" onClick={handleModalCancel}>
              Cancel
            </Button>,
          ]}
        >
          <StudentModalForm
            handleSaveSuccess={handleSaveSuccess}
            editRow={editingStudent}
          />
        </Modal>
      )}
      {/* 2.0 注意他用一个div装起来这两个元素button和search，而之前header也是 */}
      <div
        // 2.0 这个style很重要
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          marginBottom: "8px",
        }}
      >
        {/* 2.0 style加的 */}
        <Button
          type="primary"
          onClick={() => {
            //?
            setEditingStudent(null);
            setIsModalOpen(true);
          }}
        >
          <PlusOutlined />
          Add
        </Button>
        {/* 2.0 抄search的时候,上面有行const{search}=input 忘记抄了导致样式不一样 */}

        <Search
          placeholder="input search text"
          allowClear
          onSearch={onSearch}
          // 2.0 好神奇之前写的width:'300'的话就不会stick to 浏览器最右，但是改成30%就可以了
          style={{
            width: "30%",
          }}
        />
      </div>
      {/* //3.1.1 做分页: Form antd 第12个 */}
      {/* pagination这个属性主要是有total（在 current page 三个属性 */}
      {/* onChange在pagination /sorter /filter改变时会自动调用 */}

      <Table
        columns={columns({ getStudent })}
        dataSource={list}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
}
