import {NextResponse} from 'next/server';

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url);
  // 127.0.0.1:8081
  const serverUrl = 'http' + '://' + '127.0.0.1:8081';
  try {
    // console.info("searchParams:", searchParams)
    const response = await fetch(`${serverUrl}/xb/zk/attendance/v2/record.do?${searchParams}`);

    if (!response.ok) {
      // throw new Error(`HTTP error! status: ${response.status}`);
      console.error('Response status:', response.status, await response.text());
    }
    if (response.status === 404) {
      // 处理 404 错误
    }
    else if (response.status >= 500) {
      // 处理服务端错误
    }

    const data = await response.json();
    return NextResponse.json(data);
  }
  catch (error) {
    console.error('Error fetching attendance records:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({message: 'Internal server error', error: errorMessage}, {status: 500});
  }
}
