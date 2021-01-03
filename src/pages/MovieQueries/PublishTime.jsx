import { Input, Card, Divider, Table, Select, Row, DatePicker, Space, notification } from 'antd';
import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Chart, Interval, Coordinate } from 'bizcharts';
import request from '@/utils/request';
const { Search } = Input;

const PublishTime = () => {
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

  const [counter, setCounter] = useState(0);
  const [datePickerType, setDatePickerType] = useState('year');
  const [yearToSend, setYearToSend] = useState(-1);
  const [quarterToSend, setQuarterToSend] = useState(-1);
  const [monthToSend, setMonthToSend] = useState(-1);

  const handleTime = (moment, value) => {
    if (value) {
      if (datePickerType == 'year') {
        setYearToSend(parseInt(value))
        setQuarterToSend(-1)
        setMonthToSend(-1)
      }
      if (datePickerType == 'quarter') {
        setYearToSend(parseInt(value.split("-Q")[0]))
        setQuarterToSend(parseInt(value.split("-Q")[1]))
        setMonthToSend(-1)
      }
      if (datePickerType == 'month') {
        setYearToSend(parseInt(value.split("-")[0]))
        setQuarterToSend(-1)
        setMonthToSend(parseInt(value.split("-")[1]))
      }
    }
  };

  const SearchCommentUser = value => {
    value = parseInt(value)
    if ((yearToSend === -1) && (quarterToSend === -1) && (monthToSend === -1) && (!value)) {
      notification.error({
        message: `查询失败`,
        description: `请至少输入年、季度、月、周中的一个。`,
      })
      return
    }
    else {
      let requestURL = '/api/time' + '?'
      if (yearToSend !== -1) {
        requestURL += 'Year=' + yearToSend + "&"
      }
      if (quarterToSend !== -1) {
        requestURL += 'Season=' + quarterToSend + "&"
      }
      if (monthToSend !== -1) {
        requestURL += 'Month=' + monthToSend + "&"
      }
      if (value) {
        requestURL += 'Weekday=' + value + "&"
      }
      if (requestURL.endsWith("&")) {
        requestURL = requestURL.substring(0, requestURL.length - 1)
      }
      request(requestURL).
        then((res) => {
          console.log(res);
          if (res.data) {
            setCounter(res.data.count);
            setTimeData([
              {
                数据库: "MySQL",
                执行时间: res.data.MySqlTime
              },
              {
                数据库: "Neo4j",
                执行时间: res.data.Neo4jTime
              },
              {
                数据库: "Hive",
                执行时间: res.data.HiveTime
              },
            ]);
            setDataList(res.data.movieDatas.map((movie) => ({
              id: movie.id,
              title: movie.title,
              videoTime: movie.videoTime,
              points: movie.points,
              totalNumber: movie.totalNumber
            })))
          }
        })
    }
  }

  const timeTypeSelector = () => {
    const handleSelectorChange = value => {
      setDatePickerType(value);
    };

    return (
      <Select defaultValue="year" style={{ width: 120 }} onChange={handleSelectorChange}>
        <Option value="year">年</Option>
        <Option value="quarter">季度</Option>
        <Option value="month">月</Option>
      </Select>
    );
  };

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
        <Row>
          <span>{timeTypeSelector()}</span>
          <DatePicker
            picker={datePickerType}
            onChange={handleTime}
          ></DatePicker>
        </Row>
        <Row />
        <Row>
          <Search
            placeholder="周几（可选，周日请输7）"
            addonBefore={`当前结果总数：${counter}`}
            enterButton="开始查询"
            onSearch={SearchCommentUser}
          />
        </Row>
      </Space>
      <Divider />
      <Table
        dataSource={dataList}
        columns={columns}
      />
    </PageContainer>
  );
};

export default PublishTime;