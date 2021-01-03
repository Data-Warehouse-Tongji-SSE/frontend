import { Input, Card, Divider, Table } from 'antd';
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Chart, Interval, Coordinate } from 'bizcharts';
import request from '@/utils/request';

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

  useEffect(() => {
    request('/api/connection').
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
          setDataList(res.data.pairs.map((pair) => ({
            director: pair.director,
            actor: pair.actor,
            times: pair.times,
          })))
        }
      })
  }, []);

  const columns = [
    {
      title: "导演姓名",
      dataIndex: 'director',
    },
    {
      title: "演员姓名",
      dataIndex: 'actor',
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
      <Table
        dataSource={dataList}
        columns={columns}
      />
    </PageContainer>
  );
};

export default DirectorWithActor;