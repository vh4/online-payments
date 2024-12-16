// src/app/api/pln/pascabayar/route.ts
import { NextResponse } from 'next/server';
export async function GET() {
	return new NextResponse(
		JSON.stringify({ message: '_health' }),
		{ status: 200 }
	  );
}
