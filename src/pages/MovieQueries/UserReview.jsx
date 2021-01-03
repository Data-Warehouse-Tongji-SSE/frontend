import { Input, Card, Divider, Table, notification } from 'antd';
import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Chart, Interval, Coordinate } from 'bizcharts';
import request from '@/utils/request';
const { Search } = Input;

const UserReview = () => {
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

  const [minValue, setMinValue] = useState(0);

  const minValueChange = value => {
    if (value) {
      setMinValue(value)
    }
    else{
      setMinValue(0)
    }    
  }

  const SearchMovieLength = maxValue => {
    const minToSend = parseFloat(minValue)
    const maxToSend = parseFloat(maxValue)
    if ((!minToSend) && (!maxToSend)) {
      notification.error({
        message: `查询失败`,
        description: `请输入最低评分或最高评分。`,
      })
      return
    }
    else {
      let requestURL = '/api/userComment' + '?'
      if (minToSend) {
        requestURL += 'min=' + minToSend + "&"
      }
      if (maxToSend) {
        requestURL += 'max=' + maxToSend + "&"
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
      <Input.Group compact>
        <Input
          addonBefore={`当前结果总数：${counter}`}
          style={{
            width: "30%",
            borderRight: 0,
            pointerEvents: 'none',
            backgroundColor: '#f0f0f0',
            textAlign: 'center',
          }}
          placeholder="评分范围"
          disabled
        />
        <Input
          onChange={e => minValueChange(e.target.value)}
          style={{ width: "30%", textAlign: 'center' }}
          placeholder="最低评分（示例：3.8）" />
        <Input
          style={{
            width: "10%",
            borderRight: 0,
            pointerEvents: 'none',
            backgroundColor: '#fff',
            textAlign: 'center',
          }}
          placeholder="~"
          disabled
        />
        <Search
          style={{
            width: "30%",
            borderLeft: 0,
            textAlign: 'center',
          }}
          placeholder="最高评分（示例：3.9）"
          onSearch={SearchMovieLength}
        />
      </Input.Group>
      <Divider />
      <Table
        dataSource={dataList}
        columns={columns}
      />
    </PageContainer>
  );
};

export default UserReview;