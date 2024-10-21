import React from "react";
import {BadgeProps, CalendarProps, ConfigProvider, DatePicker} from "antd";
import {Badge, Calendar} from "antd";
import type {Dayjs} from "dayjs";
import locale from 'antd/locale/zh_CN';
import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');


const getListData = (value: Dayjs) => {
  let listData: { type: string; content: string }[] = []; // Specify the type of listData
  switch (value.date()) {
    case 8:
      listData = [
        {type: "warning", content: "This is warning event."},
        {type: "success", content: "This is usual event."},
      ];
      break;
    case 10:
      listData = [
        {type: "warning", content: "This is warning event."},
        {type: "success", content: "This is usual event."},
        {type: "error", content: "This is error event."},
      ];
      break;
    case 15:
      listData = [
        {type: "warning", content: "This is warning event"},
        {type: "success", content: "This is very long usual event......"},
        {type: "error", content: "This is error event 1."},
        {type: "error", content: "This is error event 2."},
        {type: "error", content: "This is error event 3."},
        {type: "error", content: "This is error event 4."},
      ];
      break;
    default:
  }
  return listData || [];
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const AttendanceCalendarTest: React.FC = () => {
  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ConfigProvider locale={locale}>
        <ul className="events">
          {listData.map((item) => (
            <li key={item.content}>
              <Badge
                status={item.type as BadgeProps["status"]}
                text={item.content}
              />
            </li>
          ))}
        </ul>
      </ConfigProvider>
    )
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return <Calendar cellRender={cellRender}/>;
};

export default AttendanceCalendarTest;
