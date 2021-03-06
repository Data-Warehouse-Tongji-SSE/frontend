import { Input, Card, Divider, Table, notification } from 'antd';
import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Chart, Interval, Coordinate } from 'bizcharts';
import request from '@/utils/request';
const { Search } = Input;

const SearchByName = () => {
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

  const [loadingState, setLoadingState ] = useState(false);

  const SearchMovieName = value => {
    if (value) {
      setLoadingState(true)
      request('/api/title' + '?' + 'Title=' + value).
        then((res) => {
          console.log(res);
          setLoadingState(false)
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
              totalNumber: movie.totalNumber,
              positiveComments: movie.positiveComments,
              neutralComments: movie.neutralComments,
              negativeComments: movie.negativeComments
            })))
          }
        })
    }
    else {
      notification.error({
        message: `查询失败`,
        description: `请输入要查询的电影名称。`,
      })
      return
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
    {
      title: "正面评价数",
      dataIndex: 'positiveComments',
      sorter: (a, b) => a.positiveComments - b.positiveComments,
    },
    {
      title: "中立评价数",
      dataIndex: 'neutralComments',
      sorter: (a, b) => a.neutralComments - b.neutralComments,
    },
    {
      title: "负面评价数",
      dataIndex: 'negativeComments',
      sorter: (a, b) => a.negativeComments - b.negativeComments,
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
      <Search
        placeholder="示例：Living Water"
        addonBefore={`当前结果总数：${counter}`}
        enterButton="开始查询"
        onSearch={SearchMovieName}
        loading={loadingState}
      />
      <Divider />
      <Table
        dataSource={dataList}
        columns={columns}
      />
    </PageContainer>
  );
};

export default SearchByName;