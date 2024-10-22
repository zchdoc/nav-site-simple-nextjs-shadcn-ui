"use client"

import React, {useState, useEffect} from "react"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {AlertCircle} from "lucide-react"
import {format} from "date-fns"
import AttendanceCalendar from "@/components/AttendanceCalendar"
import {ConfigProvider, DatePicker, Space, theme} from 'antd';
import dayjs from "dayjs";

import locale from 'antd/locale/zh_CN';


import 'dayjs/locale/zh-cn';
import {bool} from "prop-types";

dayjs.locale('zh-cn');

export default function AttendancePage() {
  const [dateTime, setDateTime] = useState(new Date())
  const [dateTimeText, setDateTimeText] = useState('')
  const [userNo, setUserNo] = useState('')
  const [beginOfMonth, setBeginOfMonth] = useState('')
  const [endOfMonth, setEndOfMonth] = useState('')
  //
  const [clockInUserNo, setClockInUserNo] = useState('')
  const [clockInDateTime, setClockInDateTime] = useState("")
  //
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [btnConfirmLoading, setBtnConfirmLoading] = useState(false)
  const [btnQueryLoading, setBtnQueryLoading] = useState(false)
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    setDateTimeText(format(dateTime, "yyyy-MM-dd HH:mm:ss"))
  }, [dateTime])

  const doMockAttendanceCustom = async () => {
    setBtnConfirmLoading(true)
    setError(null)
    try {
      let userNo = clockInUserNo // Assuming this is the correct user number
      let postTime = clockInDateTime
      let data = `${userNo}\t${postTime}\t0\t15\t\t0\t0`

      const queryParams = new URLSearchParams({
        sn: 'CJDE193560303',
        table: 'ATTLOG',
        Stamp: postTime
      }).toString()

      const response = await fetch(`/api/a2/iclock/attDataCustom?${queryParams}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({data: data}),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log("Attendance recorded:", result)

      alert('OK: ' + JSON.stringify(result))
    }
    catch (err) {
      console.error("Error recording attendance:", err);
      setError("Failed to record attendance. Please try again.");

      // 类型断言
      if (err instanceof Error) {
        alert('FAIL: ' + err.message);
      }
      else {
        alert(err);
      }
    }
    finally {
      setTimeout(() => {
        setBtnConfirmLoading(false)
      }, 1000)
    }
  }

  const doQueryAttendanceRecord = async () => {
    setBtnQueryLoading(true);
    setError(null);
    try {
      let beginOfMonthDefault = format(new Date(dateTime.getFullYear(), dateTime.getMonth(), 1), "yyyy-MM-dd HH:mm:ss");
      let endOfMonthDefault = format(new Date(dateTime.getFullYear(), dateTime.getMonth() + 1, 0, 23, 59, 59), "yyyy-MM-dd HH:mm:ss");
      const requestData = {
        userNo: userNo || '3000002',
        timeStart: beginOfMonth || beginOfMonthDefault,
        timeEnd: endOfMonth || endOfMonthDefault,
        openId: 'o45LO4l28n6aa4dFCXB3BBYOFWNs',
        userVerifyNumber: '15824821718',
      };

      const queryParams = new URLSearchParams(requestData).toString();
      const response = await fetch(`/api/attendance?${queryParams}`);
      if (!response.ok) {
        const errorData = await response.json();
        // throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        setError(errorData.message || `HTTP error! status: ${response.status}`);
      }
      const attendanceData = await response.json();
      setAttendanceRecords(attendanceData);
    }
    catch (err) {
      console.error('Error fetching attendance records:', err);
      setError(err instanceof Error ? err.message : "Failed to fetch attendance records. Please try again.");
    }
    finally {
      setBtnQueryLoading(false);
    }
  };

  interface AttendanceRecord {
    date: string;
    time: string;
    signInStateStr: string;
  }

  // const formatAttendanceData = (records) => {
  //   const formattedData = {};
  //   console.info('records:', records)
  //   records.forEach(dayRecords => {
  //     dayRecords.forEach(record => {
  //       if (!formattedData[record.date]) {
  //         formattedData[record.date] = [];
  //       }
  //       formattedData[record.date].push({
  //         time: record.time,
  //         signInStateStr: record.signInStateStr
  //       });
  //     });
  //   });
  //   return formattedData;
  // };
  const formatAttendanceData = (records: AttendanceRecord[][]) => {
    const formattedData: { [key: string]: AttendanceRecord[] } = {};
    console.info('records:', records);

    records.forEach(dayRecords => {
      dayRecords.forEach(record => {
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
  const {RangePicker} = DatePicker;
  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold">Attendance Clock-in</h1>
      {/* check in */}
      <Card>
        <CardHeader>
          <CardTitle>Clock-in Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ConfigProvider locale={locale} theme={{algorithm: theme.darkAlgorithm,}}>
            <Space>
              <Input
                id="clockInUserNo"
                value={clockInUserNo}
                onChange={(e) => setClockInUserNo(e.target.value)}
                placeholder="模拟卡号"
              />
              <DatePicker
                size='large'
                showTime
                allowClear
                placeholder="模拟时间"
                onChange={(date, dateString) => {
                  if (date) {
                    // Format the date to match your desired format
                    const formattedDate = date.format("YYYY-MM-DD HH:mm:ss")
                    setClockInDateTime(formattedDate)
                  }
                  else {
                    // If the date is cleared, reset the state
                    setClockInDateTime("")
                  }
                }}
              />
            </Space>
            <br/>
            <Button onClick={doMockAttendanceCustom} disabled={btnConfirmLoading}>
              {btnConfirmLoading ? "Processing..." : "Confirm Clock-in"}
            </Button>
          </ConfigProvider>
        </CardContent>
      </Card>
      {/* query records */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/*{attendanceRecords.length > 0 && (<AttendanceCalendar )}*/}
          <ConfigProvider locale={locale} theme={{algorithm: theme.darkAlgorithm,}}>
            <Space>
              <Input
                id="userNo"
                value={userNo}
                onChange={(e) => setUserNo(e.target.value)}
                placeholder="请输入要查询的编号"
              />
              <RangePicker
                size='large'
                showTime
                allowClear
                onChange={(dates, dateStrings) => {
                  // dates 是 dayjs 对象的数组，dateStrings 是格式化后的日期字符串数组
                  if (dates && dates.length === 2) {
                    // 设置开始日期和结束日期
                    setBeginOfMonth(dateStrings[0]); // 获取格式化后的开始日期字符串
                    setEndOfMonth(dateStrings[1]);   // 获取格式化后的结束日期字符串
                  }
                  else {
                    // 如果清除了日期选择器的值，则重置状态
                    setBeginOfMonth('');
                    setEndOfMonth('');
                  }
                }}
              />
            </Space>
            <br/>
            <Button onClick={doQueryAttendanceRecord} disabled={btnQueryLoading}>
              {btnQueryLoading ? "Querying..." : "Query Records"}
            </Button>
            <br/>
            <AttendanceCalendar attendanceData={formatAttendanceData(attendanceRecords)}/>
          </ConfigProvider>
        </CardContent>
      </Card>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4"/>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
