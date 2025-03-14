// app/api/analytics/view/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ANALYTICS_FILE = path.join(process.cwd(), 'analytics-data.json');

if (!fs.existsSync(ANALYTICS_FILE)) {
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify([]));
}

export async function GET(request: NextRequest) {
    try {
        const data = fs.readFileSync(ANALYTICS_FILE, 'utf8');
        const events = JSON.parse(data);
        return NextResponse.json(events);
    } catch (error) {
        console.error('Error reading analytics data:', error);
        return NextResponse.json({ error: 'Failed to read analytics data' }, { status: 500 });
    }
}