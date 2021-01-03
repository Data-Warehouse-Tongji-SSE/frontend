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

  const [counter, setCounter] = useState(0);

  const [directorName, setDirectorName] = useState("");

  const [starringName, setStarringName] = useState("");

  const [supportingName, setSupportingName] = useState("");

  const DirectorNameChange = value => {
    if (value) {
      setDirectorName(value)
    }
    else{
      setDirectorName("")
    }
  }

  const StarringNameChange = value => {
    if (value) {
      setStarringName(value)
    }
    else{
      setStarringName("")
    }    
  }

  const SupportingNameChange = value => {
    if (value) {
      setSupportingName(value)
    }
    else{
      setSupportingName("")
    }    
  }

  const CompositionSearch = Genres => {
    if ((!directorName) && (!starringName) && (!supportingName) && (!Genres)) {
      notification.error({
        message: `查询失败`,
        description: `请至少输入导演、主演、参演、电影类型中的一个。`,
      })
      return
    }
    else {
      let requestURL = '/api/composition' + '?'
      if (directorName) {
        requestURL += 'Director=' + directorName + "&"
      }
      if (starringName) {
        requestURL += 'Starring=' + starringName + "&"
      }
      if (supportingName) {
        requestURL += 'Actor=' + supportingName + "&"
      }
      if (Genres) {
        requestURL += 'Genres=' + Genres + "&"
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
      <Space direction="vertical">
        <Input.Group compact>
          <Input
            addonBefore={`当前结果总数：${counter}`}
            style={{
              width: "25%",
              borderRight: 0,
              pointerEvents: 'none',
              backgroundColor: '#f0f0f0',
              textAlign: 'center',
            }}
            placeholder="导演姓名"
            disabled
          />
          <Input
            onChange={e => DirectorNameChange(e.target.value)}
            style={{ width: "10%" }}
            placeholder="（可选）" />
          <Input
            style={{
              width: "10%",
              borderRight: 0,
              pointerEvents: 'none',
              backgroundColor: '#f0f0f0',
              textAlign: 'center',
            }}
            placeholder="主演姓名"
            disabled
          />
          <Input
            onChange={e => StarringNameChange(e.target.value)}
            style={{ width: "10%" }}
            placeholder="（可选）" />
          <Input
            style={{
              width: "10%",
              borderRight: 0,
              pointerEvents: 'none',
              backgroundColor: '#f0f0f0',
              textAlign: 'center',
            }}
            placeholder="参演姓名"
            disabled
          />
          <Input
            onChange={e => SupportingNameChange(e.target.value)}
            style={{ width: "10%" }}
            placeholder="（可选）" />
          <Input
            style={{
              width: "10%",
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
              width: "15%",
              borderLeft: 0,
            }}
            placeholder="（可选）"
            onSearch={CompositionSearch}
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