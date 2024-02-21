

import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    // Extract the URL to proxy from the request query parameters
    const url = request.nextUrl.searchParams.get("url");
    if (!url) {
      return NextResponse.error();
    }

    // Make a request to the external endpoint
    const response = await axios.get(url);

    // Return the response from the external endpoint
    return NextResponse.json({ data: response.data });
  } catch (err: any) {
    console.error('Proxy request failed:', err.response?.data || err.message);
    const errorMessage = err.response?.data?.error || err.message || 'Proxy request failed';
    return NextResponse.error();
  }
}

export async function POST(request: NextRequest) {
  console.log("working POST")
  try {
    // Extract the URL to proxy from the request body
    const data = await request.json();
    const url = request.nextUrl.searchParams.get("url");
    console.log(url, data)
    if (!url || !data) {
      return NextResponse.error();
    }

    // Make a request to the external endpoint
    const response = await axios.post(url, data);

    // Return the response from the external endpoint
    return NextResponse.json({ data: response.data });
  } catch (err: any) {
    console.error('Proxy request failed:', err.response?.data || err.message);
    const errorMessage = err.response?.data?.error || err.message || 'Proxy request failed';
    return NextResponse.error();
  }
}

export async function PUT(request: NextRequest) {
  console.log("working PUT")
  try {
    // Extract the URL to proxy from the request body
    const data = await request.json();
    const url = request.nextUrl.searchParams.get("url");
    console.log(url, data)
    if (!url || !data) {
      return NextResponse.error();
    }

    // Make a request to the external endpoint
    const response = await axios.put(url, data);

    // Return the response from the external endpoint
    return NextResponse.json({ data: response.data });
  } catch (err: any) {
    console.error('Proxy request failed:', err.response?.data || err.message);
    const errorMessage = err.response?.data?.error || err.message || 'Proxy request failed';
    return NextResponse.error();
  }
}


export async function DELETE(request: NextRequest) {
  console.log("working DELETE")
  try {
    // Extract the URL to proxy from the request body
    const data = await request.json();
    const url = request.nextUrl.searchParams.get("url");
    console.log(url, data)
    if (!url || !data) {
      return NextResponse.error();
    }

    // Make a request to the external endpoint
    const response = await axios.delete(url, data);

    // Return the response from the external endpoint
    return NextResponse.json({ data: response.data });
  } catch (err: any) {
    console.error('Proxy request failed:', err.response?.data || err.message);
    const errorMessage = err.response?.data?.error || err.message || 'Proxy request failed';
    return NextResponse.error();
  }
}

