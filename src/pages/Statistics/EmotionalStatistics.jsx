import { Card } from 'antd';
import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Chart, Interval, Coordinate } from 'bizcharts';

const EmotionalStatistics = () => {
  // 此页面仅充当幻灯片使用，不调用后端和数据库
  const timeData = [
    { 正面倾向: 0, 电影数: 0 }, { 正面倾向: 1, 电影数: 11 }, { 正面倾向: 2, 电影数: 19 }, { 正面倾向: 3, 电影数: 25 }, { 正面倾向: 4, 电影数: 22 }, { 正面倾向: 5, 电影数: 34 }, { 正面倾向: 6, 电影数: 57 }, { 正面倾向: 7, 电影数: 13 }, { 正面倾向: 8, 电影数: 178 }, { 正面倾向: 9, 电影数: 16 }, { 正面倾向: 10, 电影数: 35 }, { 正面倾向: 11, 电影数: 29 }, { 正面倾向: 12, 电影数: 589 }, { 正面倾向: 13, 电影数: 4 }, { 正面倾向: 14, 电影数: 40 }, { 正面倾向: 15, 电影数: 57 }, { 正面倾向: 16, 电影数: 37 }, { 正面倾向: 17, 电影数: 267 }, { 正面倾向: 18, 电影数: 47 }, { 正面倾向: 19, 电影数: 129 }, { 正面倾向: 20, 电影数: 133 }, { 正面倾向: 21, 电影数: 94 }, { 正面倾向: 22, 电影数: 56 }, { 正面倾向: 23, 电影数: 1035 }, { 正面倾向: 24, 电影数: 1032 }, { 正面倾向: 25, 电影数: 666 }, { 正面倾向: 26, 电影数: 1021 }, { 正面倾向: 27, 电影数: 1066 }, { 正面倾向: 28, 电影数: 291 }, { 正面倾向: 29, 电影数: 0 }, { 正面倾向: 30, 电影数: 163 }, { 正面倾向: 31, 电影数: 316 }, { 正面倾向: 32, 电影数: 171 }, { 正面倾向: 33, 电影数: 884 }, { 正面倾向: 34, 电影数: 104 }, { 正面倾向: 35, 电影数: 280 }, { 正面倾向: 36, 电影数: 188 }, { 正面倾向: 37, 电影数: 68 }, { 正面倾向: 38, 电影数: 2120 }, { 正面倾向: 39, 电影数: 219 }, { 正面倾向: 40, 电影数: 404 }, { 正面倾向: 41, 电影数: 197 }, { 正面倾向: 42, 电影数: 949 }, { 正面倾向: 43, 电影数: 296 }, { 正面倾向: 44, 电影数: 699 }, { 正面倾向: 45, 电影数: 436 }, { 正面倾向: 46, 电影数: 539 }, { 正面倾向: 47, 电影数: 1346 }, { 正面倾向: 48, 电影数: 3344 }, { 正面倾向: 49, 电影数: 13199 }, { 正面倾向: 50, 电影数: 13337 }, { 正面倾向: 51, 电影数: 13225 }, { 正面倾向: 52, 电影数: 3484 }, { 正面倾向: 53, 电影数: 2394 }, { 正面倾向: 54, 电影数: 2764 }, { 正面倾向: 55, 电影数: 2855 }, { 正面倾向: 56, 电影数: 3881 }, { 正面倾向: 57, 电影数: 2142 }, { 正面倾向: 58, 电影数: 2000 }, { 正面倾向: 59, 电影数: 2587 }, { 正面倾向: 60, 电影数: 3173 }, { 正面倾向: 61, 电影数: 875 }, { 正面倾向: 62, 电影数: 4587 }, { 正面倾向: 63, 电影数: 2368 }, { 正面倾向: 64, 电影数: 1025 }, { 正面倾向: 65, 电影数: 1206 }, { 正面倾向: 66, 电影数: 793 }, { 正面倾向: 67, 电影数: 3159 }, { 正面倾向: 68, 电影数: 1259 }, { 正面倾向: 69, 电影数: 2113 }, { 正面倾向: 70, 电影数: 1589 }, { 正面倾向: 71, 电影数: 1591 }, { 正面倾向: 72, 电影数: 1324 }, { 正面倾向: 73, 电影数: 3103 }, { 正面倾向: 74, 电影数: 4809 }, { 正面倾向: 75, 电影数: 4300 }, { 正面倾向: 76, 电影数: 4898 }, { 正面倾向: 77, 电影数: 3436 }, { 正面倾向: 78, 电影数: 3715 }, { 正面倾向: 79, 电影数: 4189 }, { 正面倾向: 80, 电影数: 4376 }, { 正面倾向: 81, 电影数: 4797 }, { 正面倾向: 82, 电影数: 1995 }, { 正面倾向: 83, 电影数: 4082 }, { 正面倾向: 84, 电影数: 1840 }, { 正面倾向: 85, 电影数: 2462 }, { 正面倾向: 86, 电影数: 2315 }, { 正面倾向: 87, 电影数: 1193 }, { 正面倾向: 88, 电影数: 1964 }, { 正面倾向: 89, 电影数: 2145 }, { 正面倾向: 90, 电影数: 2400 }, { 正面倾向: 91, 电影数: 725 }, { 正面倾向: 92, 电影数: 582 }, { 正面倾向: 93, 电影数: 684 }, { 正面倾向: 94, 电影数: 783 }, { 正面倾向: 95, 电影数: 873 }, { 正面倾向: 96, 电影数: 132 }, { 正面倾向: 97, 电影数: 396 }, { 正面倾向: 98, 电影数: 176 }, { 正面倾向: 99, 电影数: 73 }, { 正面倾向: 100, 电影数: 4 }
  ];

  return (
    <PageContainer>
      <Card title="用户评价倾向分析" style={{ width: '100%' }}>
        <Chart height={500} data={timeData} autoFit>
          <Coordinate transpose />
          <Interval position="正面倾向*电影数" />
        </Chart>
      </Card>
    </PageContainer>
  );
};

export default EmotionalStatistics;