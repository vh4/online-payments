// src/app/api/pln/pascabayar/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

const API_URL = 'https://c-dev-api.rajabiller.com/api_partnerlink.php';

// Handle POST requests
export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return new NextResponse(
      JSON.stringify({ message: 'Method Not Allowed' }),
      { status: 405 }
    );
  }

  try {
    const body = await req.json(); // Parse request body

    const { data } = await axios.post(API_URL, body, {
      headers: { 'Content-Type': 'application/json' },
    });

    return NextResponse.json(data); // Send successful response
  } catch (error: any) {
    console.error('PLN API Error:', error);
    return new NextResponse(
      JSON.stringify({ message: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}
