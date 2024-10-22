import React from "react";
import {Badge, Calendar, Tooltip, DatePicker} from "antd";
import {theme, ConfigProvider, Alert,Col, Radio, Row, Select} from "antd";
import { HolidayUtil, Lunar } from 'lunar-typescript';
import type {Dayjs} from "dayjs";
import dayjs from "dayjs";

import locale from 'antd/locale/zh_CN';


import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

interface AttendanceRecord {
  date: string;
  time: string;
  signInStateStr: string;
}

interface AttendanceData {
  [date: string]: AttendanceRecord[];
}

interface AttendanceCalendarProps {
  attendanceData: AttendanceData;
}

const AttendanceCalendar: React.FC<AttendanceCalendarProps> = ({
                                                                 attendanceData,
                                                               }) => {
  const dateCellRender = (value: Dayjs) => {
    const date = value.format("YYYY-MM-DD");
    const records = attendanceData[date];

    if (!records || records.length === 0) {
      return null;
    }

    return (
      <ConfigProvider locale={locale} theme={{algorithm: theme.darkAlgorithm,}}>
        <ul className="events">
          {records.map((record, index) => (
            <Tooltip
              key={index}
              title={`${record.time} - ${record.signInStateStr}`}
            >
              <li>
                <Badge
                  status={getBadgeStatus(record.signInStateStr)}
                  text={`${record.time.split(":")[0]}:${record.time.split(":")[1]} ${record.signInStateStr}`}
                />
              </li>
            </Tooltip>
          ))}
        </ul>
      </ConfigProvider>
    );
  };

  const getBadgeStatus = (status: string) => {
    switch (status) {
      case "正常签到":
      case "正常签退":
        return "success";
      case "迟到":
        return "warning";
      case "加班":
        return "processing";
      case "未签退":
        return "error";
      default:
        return "default";
    }
  };

  const getYearLabel = (year: number) => {
    const d = Lunar.fromDate(new Date(year + 1, 0));
    return `${d.getYearInChinese()}年（${d.getYearInGanZhi()}${d.getYearShengXiao()}年）`;
  };

  const getMonthLabel = (month: number, value: Dayjs) => {
    const d = Lunar.fromDate(new Date(value.year(), month));
    const lunar = d.getMonthInChinese();
    return `${month + 1}月（${lunar}月）`;
  };

  return (
    <Calendar 
    cellRender={dateCellRender} 
    fullscreen={false}
    headerRender={({ value, type, onChange, onTypeChange }) => {
      const start = 0;
      const end = 12;
      const monthOptions = [];

      let current = value.clone();
      const localeData = value.localeData();
      const months = [];
      for (let i = 0; i < 12; i++) {
        current = current.month(i);
        months.push(localeData.monthsShort(current));
      }

      for (let i = start; i < end; i++) {
        monthOptions.push({
          label: getMonthLabel(i, value),
          value: i,
        });
      }

      const year = value.year();
      const month = value.month();
      const options = [];
      for (let i = year - 10; i < year + 10; i += 1) {
        options.push({
          label: getYearLabel(i),
          value: i,
        });
      }
      return (
        <Row justify="end" gutter={8} style={{ padding: 8 }}>
          <Col>
            <Select
              size="small"
              popupMatchSelectWidth={false}
              className="my-year-select"
              value={year}
              options={options}
              onChange={(newYear) => {
                const now = value.clone().year(newYear);
                onChange(now);
              }}
            />
          </Col>
          <Col>
            <Select
              size="small"
              popupMatchSelectWidth={false}
              value={month}
              options={monthOptions}
              onChange={(newMonth) => {
                const now = value.clone().month(newMonth);
                onChange(now);
              }}
            />
          </Col>
          <Col>
            <Radio.Group
              size="small"
              onChange={(e) => onTypeChange(e.target.value)}
              value={type}
            >
              <Radio.Button value="month">月</Radio.Button>
              <Radio.Button value="year">年</Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
      );
    }}
    style={{borderRadius: "20px"}}/>
  );
};

export default AttendanceCalendar;
