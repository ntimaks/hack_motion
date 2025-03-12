import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { AnalyticsEvent } from '@/utils/analytics';
import { analyticsStore } from '@/utils/devAnalyticsStore';

const ANALYTICS_FILE = path.join(process.cwd(), 'analytics-data.json');

if (!fs.existsSync(ANALYTICS_FILE)) {
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify([]));
}

export async function POST(request: NextRequest) {
    try {
        const event: AnalyticsEvent = await request.json();

        console.log('---------------------------');
        console.log('Analytics event received:');
        console.log('Type:', event.eventType);
        console.log('User ID:', event.userId);
        console.log('URL:', event.url);
        console.log('Additional data:', event.additionalData);
        console.log('---------------------------');

        if (!event.ipAddress) {
            const forwardedFor = request.headers.get('x-forwarded-for');
            event.ipAddress = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';
        }

        if (!event.timestamp) {
            event.timestamp = Date.now();
        }

        analyticsStore.addEvent(event);

        try {
            let events = [];
            if (fs.existsSync(ANALYTICS_FILE)) {
                const data = fs.readFileSync(ANALYTICS_FILE, 'utf8');
                events = JSON.parse(data);
            }
            events.push(event);
            fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(events, null, 2));
            console.log('Event saved to file successfully');
        } catch (fileError) {
            console.error('Error saving event to file:', fileError);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error processing analytics event:', error);
        return NextResponse.json(
            { error: 'Failed to process analytics event' },
            { status: 500 }
        );
    }
}

