"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import AttendanceCalendar from "@/components/AttendanceCalendar";
import { ConfigProvider, DatePicker, Space, theme, Alert } from "antd";
import dayjs from "dayjs";
import locale from "antd/locale/zh_CN";
import "dayjs/locale/zh-cn";

dayjs.locale("zh-cn");

export default function AttendancePage() {
  const [dateTime, setDateTime] = useState(new Date());
  const [dateTimeText, setDateTimeText] = useState("");
  const [userNo, setUserNo] = useState("");
  const [beginOfMonth, setBeginOfMonth] = useState("");
  const [endOfMonth, setEndOfMonth] = useState("");
  //
  const [clockInUserNo, setClockInUserNo] = useState("");
  const [clockInDateTime, setClockInDateTime] = useState("");
  //
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [btnConfirmLoading, setBtnConfirmLoading] = useState(false);
  const [btnQueryLoading, setBtnQueryLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attUserName, setAttUserName] = useState("");
  const [attQueryTimeStart, setAttQueryTimeStart] = useState("");
  const [attQueryTimeEnd, setAttQueryTimeEnd] = useState("");
  useEffect(() => {
    setDateTimeText(format(dateTime, "yyyy-MM-dd HH:mm:ss"));
  }, [dateTime]);

  const doMockAttendanceCustom = async () => {
    setBtnConfirmLoading(true);
    setError(null);
    try {
      let userNo = clockInUserNo; // Assuming this is the correct user number
      let postTime = clockInDateTime;
      let data = `${userNo}\t${postTime}\t0\t15\t\t0\t0`;

      const queryParams = new URLSearchParams({
        sn: "CJDE193560303",
        table: "ATTLOG",
        Stamp: postTime,
      }).toString();

      const response = await fetch(`/api/iclock/attDataCustom?${queryParams}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: data }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // const result = await response.json()
      // console.log("Attendance recorded:", result)

      // alert('OK: ' + JSON.stringify(result))
      const contentType = response.headers.get("content-type");
      let result;
      console.info("contentType:", contentType);

      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        result = await response.text();
      }
      alert(result);
    } catch (err) {
      console.error("Error recording attendance:", err);
      setError("Failed to record attendance. Please try again.");

      // 类型断言
      if (err instanceof Error) {
        alert("FAIL: " + err.message);
      } else {
        alert(err);
      }
    } finally {
      setTimeout(() => {
        setBtnConfirmLoading(false);
      }, 1000);
    }
  };

  const doQueryAttendanceRecord = async () => {
    setBtnQueryLoading(true);
    setError(null);
    try {
      let beginOfMonthDefault = format(
        new Date(dateTime.getFullYear(), dateTime.getMonth(), 1),
        "yyyy-MM-dd HH:mm:ss"
      );
      let endOfMonthDefault = format(
        new Date(
          dateTime.getFullYear(),
          dateTime.getMonth() + 1,
          0,
          23,
          59,
          59
        ),
        "yyyy-MM-dd HH:mm:ss"
      );
      const requestData = {
        userNo: userNo || "3000002",
        timeStart: beginOfMonth || beginOfMonthDefault,
        timeEnd: endOfMonth || endOfMonthDefault,
        openId: "o45LO4l28n6aa4dFCXB3BBYOFWNs",
        userVerifyNumber: "15824821718",
      };
      setAttQueryTimeStart(requestData.timeStart);
      setAttQueryTimeEnd(requestData.timeEnd);
      const queryParams = new URLSearchParams(requestData).toString();
      const response = await fetch(`/api/attendance?${queryParams}`);
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || `HTTP error! status: ${response.status}`);
        return;
      }
      const attendanceData = await response.json();
      // 检查 attendanceData 是否为空或未定义
      if (!attendanceData || attendanceData.length === 0) {
        setError("No attendance records found.");
        return;
      }
      let currentRecordUserName = attendanceData[0][0].userName;
      // console.info("currentRecordUserName:", currentRecordUserName)
      setAttUserName(currentRecordUserName);
      setAttendanceRecords(attendanceData);
    } catch (err) {
      console.error("Error fetching attendance records:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch attendance records. Please try again."
      );
    } finally {
      setBtnQueryLoading(false);
    }
  };

  interface AttendanceRecord {
    date: string;
    time: string;
    signInStateStr: string;
  }

  const formatAttendanceData = (records: AttendanceRecord[][]) => {
    const formattedData: { [key: string]: AttendanceRecord[] } = {};
    // 判断 records 是否为空数组 是否为 undefined 是否为 null
    if (!records || records.length === 0) {
      return formattedData;
    }
    // console.info('records:', records)

    records.forEach((dayRecords) => {
      dayRecords.forEach((record) => {
        if (!formattedData[record.date]) {
          formattedData[record.date] = [];
        }
        formattedData[record.date].push({
          date: record.date, // 确保包含 date 属性
          time: record.time,
          signInStateStr: record.signInStateStr,
        });
      });
    });

    return formattedData;
  };
  const { RangePicker } = DatePicker;
  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold">Attendance Clock-in</h1>
      {/* query records */}
      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/*{attendanceRecords.length > 0 && (<AttendanceCalendar )}*/}
          <ConfigProvider
            locale={locale}
            theme={{ algorithm: theme.darkAlgorithm }}
          >
            <Space>
              <Input
                id="userNo"
                value={userNo}
                onChange={(e) => setUserNo(e.target.value)}
                placeholder="请输入要查询的编号"
              />
              <RangePicker
                size="large"
                showTime
                allowClear
                onChange={(dates, dateStrings) => {
                  // dates 是 dayjs 对象的数组，dateStrings 是格式化后的日期字符串数组
                  if (dates && dates.length === 2) {
                    // 设置开始日期和结束日期
                    setBeginOfMonth(dateStrings[0]); // 获取格式化后的开始日期字符串
                    setEndOfMonth(dateStrings[1]); // 获取格式化后的结束日期字符串
                  } else {
                    // 如果清除了日期选择器的值，则重置状态
                    setBeginOfMonth("");
                    setEndOfMonth("");
                  }
                }}
              />
              <Button
                onClick={doQueryAttendanceRecord}
                disabled={btnQueryLoading}
              >
                {btnQueryLoading ? "Querying..." : "Query Records"}
              </Button>
            </Space>
            <br />
            <br />
            {attUserName && (
              <Alert
                message={`当前查询用户 : ${attUserName} 时间段 : ${attQueryTimeStart} - ${attQueryTimeEnd}`}
                type="success"
                showIcon
                closable
              />
            )}

            <AttendanceCalendar
              attendanceData={formatAttendanceData(attendanceRecords)}
            />
          </ConfigProvider>
        </CardContent>
      </Card>
      {error && (
        <Alert message="Error" description={error} type="error" showIcon />
      )}
      {/* check in */}
      <Card>
        <CardHeader>
          <CardTitle>Clock-in Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ConfigProvider
            locale={locale}
            theme={{ algorithm: theme.darkAlgorithm }}
          >
            <Space>
              <Input
                id="clockInUserNo"
                value={clockInUserNo}
                onChange={(e) => setClockInUserNo(e.target.value)}
                placeholder="模拟卡号"
              />
              <DatePicker
                size="large"
                showTime
                allowClear
                placeholder="模拟时间"
                value={
                  clockInDateTime
                    ? dayjs(new Date(clockInDateTime))
                    : dayjs(new Date())
                }
                onChange={(date, dateString) => {
                  if (date) {
                    // Format the date to match your desired format
                    const formattedDate = date.format("YYYY-MM-DD HH:mm:ss");
                    setClockInDateTime(formattedDate);
                  } else {
                    // If the date is cleared, reset the state
                    setClockInDateTime("");
                  }
                }}
              />
            </Space>
            <br />
            <Button
              onClick={doMockAttendanceCustom}
              disabled={btnConfirmLoading}
            >
              {btnConfirmLoading ? "Processing..." : "Confirm Clock-in"}
            </Button>
          </ConfigProvider>
        </CardContent>
      </Card>
    </div>
  );
}
