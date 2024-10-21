import React from "react";
import { Calendar, Badge, Tooltip } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

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

  return <Calendar cellRender={dateCellRender} />;
};

export default AttendanceCalendar;
