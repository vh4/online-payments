// src/app/api/pln/pascabayar/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

const API_URL = process.env.RB_URL || '';

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return new NextResponse(
      JSON.stringify({ message: 'Method Not Allowed' }),
      { status: 405 }
    );
  }

  try {
    const body = await req.json();

    const { data } = await axios.post(API_URL, body, {
      headers: { 'Content-Type': 'application/json' },
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('PLN API Error:', error);
    return new NextResponse(
      JSON.stringify({ message: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}
