"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function RemoveDuplicates() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInput(value)
    const cleanedValue = value.replace(/[，。、；！]/g, ",").trim()
    const elements = cleanedValue.split(",")
    const uniqueElements = [...new Set(elements.map((element) => element.trim()))]
    setOutput(uniqueElements.join(","))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Remove Duplicates</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Input
          placeholder="Input elements, separated by commas"
          value={input}
          onChange={handleInputChange}
        />
        <div className="p-2 bg-muted rounded-md">
          <p>{output}</p>
        </div>
      </CardContent>
    </Card>
  )
}