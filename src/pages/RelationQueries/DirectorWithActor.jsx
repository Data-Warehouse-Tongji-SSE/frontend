import { Input, Card, Divider, Table, notification } from 'antd';
import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Chart, Interval, Coordinate } from 'bizcharts';
import request from '@/utils/request';
const { Search } = Input;

const DirectorWithActor = () => {
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

  const SearchDirectorName = value => {
    if (value) {
      request('/api/connection' + '?' + 'Director=' + value).
        then((res) => {
          console.log(res);
          if (res.data) {
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
            setDataList(res.data.actors.map((actor) => ({
              name: actor.name,
              times: actor.times,
            })))
          }
        })
    }
    else {
      notification.error({
        message: `查询失败`,
        description: `请输入要查询的导演名称。`,
      })
      return
    }
  }

  const columns = [
    {
      title: "演员姓名",
      dataIndex: 'name',
    },
    {
      title: '合作次数',
      dataIndex: 'times',
      sorter: (a, b) => a.times - b.times,
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
        placeholder="导演姓名（示例：Mike Christie）"
        addonBefore={`按导演查询经常合作的演员`}
        enterButton="开始查询"
        size="large"
        onSearch={SearchDirectorName}
      />
      <Divider />
      <Table
        dataSource={dataList}
        columns={columns}
      />
    </PageContainer>
  );
};

export default DirectorWithActor;