import { Card } from 'antd';
import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Chart, Interval, Coordinate } from 'bizcharts';

const GeneralStatistics = () => {
  // 此页面仅充当幻灯片使用，不调用后端和数据库
  const timeData = [
    {
      数据字段: "电影",
      数据量: 134452
    },
    {
      数据字段: "导演和演员",
      数据量: 193556
    },
    {
      数据字段: "用户",
      数据量: 820879
    },
    {
      数据字段: "评论数",
      数据量: 2557147
    },  
  ];

  return (
    <PageContainer>
      <Card title="数据量统计" style={{ width: '100%' }}>
        <Chart height={300} data={timeData} autoFit>
          <Coordinate transpose />
          <Interval position="数据字段*数据量" />
        </Chart>
      </Card>
    </PageContainer>
  );
};

export default GeneralStatistics;