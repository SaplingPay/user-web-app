

import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';

const serverUrl = process.env.SERVER_URL ? process.env.SERVER_URL : ''
const serverAuthUrl = process.env.SERVER_AUTH_URL ? process.env.SERVER_AUTH_URL : ''

export async function GET(request: NextRequest) {
  console.log("working GET")
  try {
    // Extract the URL to proxy from the request query parameters
    const reqPath = request.nextUrl.searchParams.get("request")
    if (!reqPath) {
      return NextResponse.error();
    }

    const req = serverUrl + reqPath;
    const token = await (await axios.post(serverAuthUrl + '/getToken', {})).data.token;

    const response = 
      await axios.get(req, {
          headers: {
            'Authorization': 'Bearer ' + token,
          },
      });

    // Return the response from the external endpoint
    return NextResponse.json({ data: response.data });
  } catch (err: any) {
    console.error('Proxy request failed:', err.response?.data || err.message);
    console.log(err.response?.status)
    const errorMessage = err.response?.data?.error || err.message || 'Proxy request failed';
    return NextResponse.json({ error: errorMessage }, { status:  err.response?.status || 500})
  }
}

export async function POST(request: NextRequest) {
  console.log("working POST")
  try {

    const reqPath = request.nextUrl.searchParams.get("request")
    if (!reqPath) {
      return NextResponse.error();
    }

    const req = serverUrl + reqPath;
    const token = await (await axios.post(serverAuthUrl + '/getToken', {})).data.token;

    const data = await request.json();
    console.log(req, data)

    const response = 
      await axios.post(req, data, {
          headers: {
            'Authorization': 'Bearer ' + token,
          },
      });

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
    const reqPath = request.nextUrl.searchParams.get("request")
    if (!reqPath) {
      return NextResponse.error();
    }

    const req = serverUrl + reqPath;
    const token = await (await axios.post(serverAuthUrl + '/getToken', {})).data.token;

    const data = await request.json();
    console.log(req, data)

    const response = 
      await axios.put(req, data, {
          headers: {
            'Authorization': 'Bearer ' + token,
          },
      });

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
    const reqPath = request.nextUrl.searchParams.get("request")
    if (!reqPath) {
      return NextResponse.error();
    }

    const req = serverUrl + reqPath;
    const token = await (await axios.post(serverAuthUrl + '/getToken', {})).data.token;

    const data = await request.json();
    console.log(req, data)

    const response = 
      await axios.delete(req, {
          headers: {
            'Authorization': 'Bearer ' + token,
          },
      });

    // Return the response from the external endpoint
    return NextResponse.json({ data: response.data });
  } catch (err: any) {
    console.error('Proxy request failed:', err.response?.data || err.message);
    const errorMessage = err.response?.data?.error || err.message || 'Proxy request failed';
    return NextResponse.error();
  }
}

