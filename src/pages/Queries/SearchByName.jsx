import { Button, message, Input, Drawer, Card, Col, Row, Divider, Table } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { Chart, Interval, Line, Point, Tooltip, Axis, useView, Coordinate } from 'bizcharts';
const { Search } = Input;

const SearchByName = () => {

  const [dataList, setDataList] = useState([]);

  const [starData, setStarData] = useState([]);

  const [dailyData, setDailyData] = useState([]);

  // useEffect(() => {
  //   getSalesAnalysis().then((res) => {
  //     if (!res.data) return;
  //     let newDailyData = [];
  //     const curDate = new Date();
  //     for (let i = res.data.length - 1; i >= 0 ; i--) {
  //       let historyDate = new Date(curDate.getTime() - 24 * 60 * 60 * 1000 * i);
  //       let month = historyDate.getMonth() + 1;
  //       let date = historyDate.getDate();
  //       newDailyData.push({
  //         date: month + '-' + date,
  //         销售额: res.data[i],
  //       })
  //     }
  //     setDailyData(newDailyData);
  //   })
  // }, []);

  // useEffect(
  //   () => {
  //     getTopSellingItem().then((res) => {
  //       if (!res.data) return;
  //       let newStarData = [];
  //       for (let i = 0; i < res.data.length; i++) {
  //         newStarData.push({
  //           source: '商品 ' + res.data[i].name,
  //           金额: res.data[i].total,
  //         })
  //       }
  //       getBestCustomer().then((res) => {
  //         if (!res.data) return;
  //         for (let i = 0; i < res.data.length; i++) {
  //           newStarData.push({
  //             source: '用户 ' + res.data[i].name,
  //             金额: res.data[i].total,
  //           })
  //         }
  //         console.log(newStarData);
  //         setStarData(
  //           newStarData
  //         )
  //       })
  //     })
  //   }, []
  // )

  // useEffect(
  //   () => {
  //     getAllOrder().then((res) => {
  //       setDataList(res.data);
  //     })
  //   }, []
  // );

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

  const time_data = [
    {
      数据库: "MySQL",
      执行时间: 131744
    },
    {
      数据库: "Neo4j",
      执行时间: 104970
    },
    {
      数据库: "Hive",
      执行时间: 29034
    },
  ];
  const counter = 0

  return (
    <PageContainer>
      <Card title="执行时间（毫秒）" style={{ width: '100%' }}>
        <Chart height={150} data={time_data} autoFit>
          <Coordinate transpose />
          <Interval position="数据库*执行时间" />
        </Chart>
      </Card>
      <Divider />
      <Search
        placeholder="示例：Living Water"
        addonBefore={`当前结果总数：${counter}`}
        allowClear
        enterButton="开始查询"
        size="large" />
      <Divider />
      <Table
        dataSource={dataList}
        columns={columns}
      />
    </PageContainer>
  );
};

export default SearchByName;