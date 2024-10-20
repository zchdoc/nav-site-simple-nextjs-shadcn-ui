import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userNo = searchParams.get('userNo');
  const timeStart = searchParams.get('timeStart');
  const timeEnd = searchParams.get('timeEnd');
  const openId = searchParams.get('openId');
  const userVerifyNumber = searchParams.get('userVerifyNumber');

  const apiUrl = `https://a2.4000063966.com:8443/xb/zk/attendance/record.do?userNo=${userNo}&timeStart=${timeStart}&timeEnd=${timeEnd}&openId=${openId}&userVerifyNumber=${userVerifyNumber}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data);
    } else {
      return NextResponse.json({ message: 'Failed to fetch attendance records', status: response.status }, { status: response.status });
    }
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}