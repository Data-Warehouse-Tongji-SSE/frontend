import { Input, Card, Divider, Table, Select, Row, DatePicker, Space, notification } from 'antd';
import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Chart, Interval, Coordinate } from 'bizcharts';
import request from '@/utils/request';
const { Search } = Input;

const Composition = () => {
  const [dataList, setDataList] = useState([]);

  const [timeData, setTimeData] = useState([
    {
      数据库: "MySQL",
      执行时间: 0
    },
    {
      数据库: "Neo4j",
      执行时间: 0
    },
    {
      数据库: "Hive",
      执行时间: 0
    },
  ]);

  const columns = [
    {
      title: "电影ID",
      dataIndex: 'id',
      sorter: (a, b) => {
        return (a.id > b.id) ? 1 : -1
      },
    },
    {
      title: "电影名称",
      dataIndex: 'title',
    },
    {
      title: "电影时长",
      dataIndex: "videoTime",
      sorter: (a, b) => a.videoTime - b.videoTime,
      render: (val) =>
        `${val}${' 分钟 '}`,
    },
    {
      title: '电影评分',
      dataIndex: 'points',
      sorter: (a, b) => a.points - b.points,
    },
    {
      title: "版本数量",
      dataIndex: 'totalNumber',
      sorter: (a, b) => a.totalNumber - b.totalNumber,
    },
  ];

  return (
    <PageContainer>
      <Card title="执行时间（毫秒）" style={{ width: '100%' }}>
        <Chart height={150} data={timeData} autoFit>
          <Coordinate transpose />
          <Interval position="数据库*执行时间" />
        </Chart>
      </Card>
      <Divider />
      <Space direction="vertical">
        <Input.Group>
          <Input
            style={{
              width: "12%",
              borderRight: 0,
              pointerEvents: 'none',
              backgroundColor: '#f0f0f0',
              textAlign: 'center',
            }}
            placeholder="导演姓名"
            disabled
          />
          <Input
            style={{ width: "12%" }}
            placeholder="示例:" />
          <Input
            style={{
              width: "12%",
              borderLeft: 0,
              borderRight: 0,
              pointerEvents: 'none',
              backgroundColor: '#f0f0f0',
              textAlign: 'center',
            }}
            placeholder="主演姓名"
            disabled
          />
          <Input
            style={{ width: "12%" }}
            placeholder="示例:" />
          <Input
            style={{
              width: "12%",
              borderLeft: 0,
              borderRight: 0,
              pointerEvents: 'none',
              backgroundColor: '#f0f0f0',
              textAlign: 'center',
            }}
            placeholder="参演姓名"
            disabled
          />
          <Input
            style={{ width: "12%" }}
            placeholder="示例:" />                        
          <Input
            style={{
              width: "12%",
              borderLeft: 0,
              borderRight: 0,
              pointerEvents: 'none',
              backgroundColor: '#f0f0f0',
              textAlign: 'center',
            }}
            placeholder="电影类别"
            disabled
          />
          <Search
            style={{
              width: "16%",
              borderLeft: 0,
            }}
            placeholder="示例:"
          />
        </Input.Group>
      </Space>
      <Divider />
      <Table
        dataSource={dataList}
        columns={columns}
      />
    </PageContainer>
  );
};

export default Composition;