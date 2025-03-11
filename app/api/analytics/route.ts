import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { AnalyticsEvent } from '@/utils/analytics';
import { analyticsStore } from '@/utils/devAnalyticsStore';

const ANALYTICS_FILE = path.join(process.cwd(), 'analytics-data.json');

// Initialize the file if it doesn't exist
if (!fs.existsSync(ANALYTICS_FILE)) {
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify([]));
}

export async function POST(request: NextRequest) {
    try {
        const event: AnalyticsEvent = await request.json();

        // Detailed logging
        console.log('---------------------------');
        console.log('Analytics event received:');
        console.log('Type:', event.eventType);
        console.log('User ID:', event.userId);
        console.log('URL:', event.url);
        console.log('Additional data:', event.additionalData);
        console.log('---------------------------');

        // Add server-side data like IP address if not already present
        if (!event.ipAddress) {
            const forwardedFor = request.headers.get('x-forwarded-for');
            event.ipAddress = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';
        }

        // Add timestamp if not set
        if (!event.timestamp) {
            event.timestamp = Date.now();
        }

        // Store the event
        analyticsStore.addEvent(event);

        // Example of sending to a hypothetical analytics service
        // await sendToAnalyticsService(event);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error processing analytics event:', error);
        return NextResponse.json(
            { error: 'Failed to process analytics event' },
            { status: 500 }
        );
    }
}

// Example function to send to your actual analytics service
async function sendToAnalyticsService(event: AnalyticsEvent) {
    // In production, replace with your actual analytics service API call
    // For example:
    // await fetch('https://analytics.yourservice.com/events', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json', 'API-Key': process.env.ANALYTICS_API_KEY },
    //   body: JSON.stringify(event)
    // });
}