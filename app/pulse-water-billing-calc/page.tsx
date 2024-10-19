"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function PulseWaterBillingCalc() {
  const [price, setPrice] = useState('2')
  const [priceUnit, setPriceUnit] = useState('0.1')
  const [volume, setVolume] = useState('1.67')
  const [volumeUnit, setVolumeUnit] = useState('0.001')
  const [result, setResult] = useState('0')
  const [num1, setNum1] = useState('')
  const [num2, setNum2] = useState('2')
  const [operator, setOperator] = useState('*')
  const [calcResult, setCalcResult] = useState('')

  useEffect(() => {
    calculatePulses()
  }, [price, priceUnit, volume, volumeUnit])

  useEffect(() => {
    calculate()
  }, [num1, num2, operator])

  const calculatePulses = () => {
    const p = parseFloat(price)
    const pu = parseFloat(priceUnit)
    const v = parseFloat(volume)
    const vu = parseFloat(volumeUnit)
    if (p > 0 && v > 0) {
      const pulses = 0.01 / (p * pu * v * vu)
      const pulsesFixed = pulses.toFixed(10)
      setResult(pulsesFixed)
      setNum1(pulsesFixed)
    } else {
      setResult('0')
      setNum1('')
    }
  }

  const calculate = () => {
    const n1 = parseFloat(num1)
    const n2 = parseFloat(num2)
    if (!isNaN(n1) && !isNaN(n2)) {
      let result
      switch (operator) {
        case '+': result = n1 + n2; break
        case '-': result = n1 - n2; break
        case '*': result = n1 * n2; break
        case '/': result = n2 !== 0 ? n1 / n2 : '除数不能为0'; break
      }
      setCalcResult(typeof result === 'number' ? result.toFixed(10) : result)
    } else {
      setCalcResult('')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">每分钱脉冲数计算器</h1>
      <Card>
        <CardHeader>
          <CardTitle>计算器</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="price">水的单价:</Label>
            <Input id="price" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
            <Select value={priceUnit} onValueChange={setPriceUnit}>
              <SelectTrigger>
                <SelectValue placeholder="选择单位" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.1">毛/升</SelectItem>
                <SelectItem value="1">元/升</SelectItem>
                <SelectItem value="0.01">分/升</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="volume">每个脉冲的水量:</Label>
            <Input id="volume" type="number" step="0.001" value={volume} onChange={(e) => setVolume(e.target.value)} />
            <Select value={volumeUnit} onValueChange={setVolumeUnit}>
              <SelectTrigger>
                <SelectValue placeholder="选择单位" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.001">毫升</SelectItem>
                <SelectItem value="1">升</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="font-bold">每分钱对应的脉冲数: {result}</div>
          <div className="flex space-x-2">
            <Input type="number" value={num1} onChange={(e) => setNum1(e.target.value)} placeholder="num1" />
            <Select value={operator} onValueChange={setOperator}>
              <SelectTrigger>
                <SelectValue placeholder="选择操作" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="*">✖️</SelectItem>
                <SelectItem value="+">➕</SelectItem>
                <SelectItem value="-">➖</SelectItem>
                <SelectItem value="/">➗</SelectItem>
              </SelectContent>
            </Select>
            <Input type="number" value={num2} onChange={(e) => setNum2(e.target.value)} placeholder="num2" />
          </div>
          <Input type="text" value={calcResult} readOnly placeholder="结果" />
        </CardContent>
      </Card>
    </div>
  )
}