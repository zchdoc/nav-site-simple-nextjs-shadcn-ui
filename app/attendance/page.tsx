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
  // const [attendanceRecords, setAttendanceRecords] = useState([])
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
  // const [error, setError] = useState(null)
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setDateTimeText(format(dateTime, "yyyy-MM-dd HH:mm:ss"))
  }, [dateTime])

  const handleDateSelect = (date: Date) => {
    setDateTime((prev) => new Date(date.setHours(prev.getHours(), prev.getMinutes(), prev.getSeconds())))
    setIsDatePickerOpen(false)
    setIsTimePickerOpen(true)
  }

  const handleTimeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [hours, minutes] = e.target.value.split(":")
    setDateTime((prev) => {
      const newDate = new Date(prev)
      newDate.setHours(Number(hours), Number(minutes)) // 将字符串转换为数字
      return newDate
    })
    setIsTimePickerOpen(false)
  }

  

  const doMockAttendanceCustom = async () => {
    setBtnConfirmLoading(true)
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Attendance recorded:", { userNo, dateTimeText })
    } catch (err) {
      setError("Failed to record attendance. Please try again.") // 现在可以传入字符串
    } finally {
      setBtnConfirmLoading(false)
    }
  }

  const doQueryAttendanceRecord = async () => {
    setBtnQueryLoading(true)
    setError(null)
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Mock data - in a real app, this would come from an API
      setAttendanceRecords([
        {
          date: "2024-03-15", records: [
            { time: "09:00:00", userName: "John Doe", signInStateStr: "Clock In", signInState: 0 },
            { time: "18:00:00", userName: "John Doe", signInStateStr: "Clock Out", signInState: 1 },
          ]
        },
        {
          date: "2024-03-14", records: [
            { time: "08:55:00", userName: "John Doe", signInStateStr: "Clock In", signInState: 0 },
            { time: "17:30:00", userName: "John Doe", signInStateStr: "Clock Out", signInState: 1 },
          ]
        },
      ])
    } catch (err) {
      setError("Failed to fetch attendance records. Please try again.")
    } finally {
      setBtnQueryLoading(false)
    }
  }

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