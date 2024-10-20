"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

export default function AttendancePage() {
  const [dateTime, setDateTime] = useState(new Date())
  const [dateTimeText, setDateTimeText] = useState("")
  const [userNo, setUserNo] = useState("")
  type AttendanceRecord = {
    date: string;
    records: {
      time: string;
      userName: string;
      signInStateStr: string;
      signInState: number;
    }[];
  };
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false)
  const [btnConfirmLoading, setBtnConfirmLoading] = useState(false)
  const [btnQueryLoading, setBtnQueryLoading] = useState(false)
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setDateTimeText(format(dateTime, "yyyy-MM-dd HH:mm:ss"))
  }, [dateTime])

  // const handleDateSelect = (date: Date) => {
  //   setDateTime((prev) => new Date(date.setHours(prev.getHours(), prev.getMinutes(), prev.getSeconds())))
  //   setIsDatePickerOpen(false)
  //   setIsTimePickerOpen(true)
  // }
  const handleDateSelect = (date: Date | undefined) => {
    if (date) { // 确保 date 不是 undefined
      setDateTime((prev) => new Date(date.setHours(prev.getHours(), prev.getMinutes(), prev.getSeconds())));
      setIsDatePickerOpen(false);
      setIsTimePickerOpen(true);
    }
  }

  const handleTimeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTime = e.target.value;  // 获取用户选择的时间
    // 在这里处理选择的时间
  };


  const doMockAttendanceCustom = async () => {
    setBtnConfirmLoading(true)
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Attendance recorded:", { userNo, dateTimeText })
    } catch (err) {
      setError("Failed to record attendance. Please try again.")
    } finally {
      setBtnConfirmLoading(false)
    }
  }

  const doQueryAttendanceRecord = async () => {
    setBtnQueryLoading(true);
    setError(null);
    try {
      let beginOfMonth = format(new Date(dateTime.getFullYear(), dateTime.getMonth(), 1), "yyyy-MM-dd HH:mm:ss");
      console.log("beginOfMonth", beginOfMonth)
      let endOfMonth = format(new Date(dateTime.getFullYear(), dateTime.getMonth() + 1, 0, 23, 59, 59), "yyyy-MM-dd HH:mm:ss");
      console.log("endOfMonth", endOfMonth)
      endOfMonth = '2024-10-10 23:59:59';
      console.log("endOfMonth2", endOfMonth)
      const requestData = {
        userNo: userNo || '3000002',
        timeStart: beginOfMonth,
        timeEnd: endOfMonth,
        openId: 'o45LO4l28n6aa4dFCXB3BBYOFWNs',
        userVerifyNumber: '15824821718',
      };

      const queryParams = new URLSearchParams(requestData).toString();
      const response = await fetch(`/api/attendance?${queryParams}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      const attendanceData = await response.json();
      console.info("attendanceData:", attendanceData)
      console.info("attendanceData:", JSON.stringify(attendanceData))
    } catch (err) {
      console.error('Error fetching attendance records:', err);
      setError(err instanceof Error ? err.message : "Failed to fetch attendance records. Please try again.");
    } finally {
      setBtnQueryLoading(false);
    }
  };
  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold">Attendance Clock-in</h1>

      <Card>
        <CardHeader>
          <CardTitle>Clock-in Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="datetime">Date and Time</Label>
            <div className="flex space-x-2">
              <Input
                id="datetime"
                value={dateTimeText}
                readOnly
                onClick={() => setIsDatePickerOpen(true)}
              />
              <Dialog open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Select Date</DialogTitle>
                  </DialogHeader>
                  <Calendar
                    mode="single"
                    selected={dateTime}
                    onSelect={handleDateSelect}
                  />
                </DialogContent>
              </Dialog>
              <Dialog open={isTimePickerOpen} onOpenChange={setIsTimePickerOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Select Time</DialogTitle>
                  </DialogHeader>
                  <Input
                    type="time"
                    onChange={handleTimeSelect}
                    value={format(dateTime, "HH:mm")}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Button onClick={doMockAttendanceCustom} disabled={btnConfirmLoading}>
            {btnConfirmLoading ? "Processing..." : "Confirm Clock-in"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userNo">User Number (Admin only)</Label>
            <Input
              id="userNo"
              value={userNo}
              onChange={(e) => setUserNo(e.target.value)}
              placeholder="Enter user number"
            />
          </div>

          <Button onClick={doQueryAttendanceRecord} disabled={btnQueryLoading}>
            {btnQueryLoading ? "Querying..." : "Query Records"}
          </Button>

          {attendanceRecords.map((dayRecord, dayIndex) => (
            <Card key={dayIndex}>
              <CardHeader>
                <CardTitle>{dayRecord.date} ({dayRecord.records.length} records)</CardTitle>
              </CardHeader>
              <CardContent>
                {dayRecord.records.map((record, recordIndex) => (
                  <div key={recordIndex} className="py-2 border-b last:border-b-0">
                    <p>{record.time} - {record.userName} - {record.signInStateStr}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}