// app/analytics-dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { AnalyticsEvent } from '@/utils/analytics';

export default function AnalyticsDashboard() {
    const [events, setEvents] = useState<AnalyticsEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const response = await fetch('/api/analytics/view');
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching analytics data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchEvents();
    }, []);

    return (
        <div className="p-8 h-screen">
            <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>

            {loading ? (
                <p>Loading analytics data...</p>
            ) : (
                <div>
                    <p className="mb-4">Total events tracked: {events.length}</p>

                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Page Views: {events.filter(e => e.eventType === 'page_view').length}</h2>
                        <h2 className="text-xl font-semibold">Video Watches: {events.filter(e => e.eventType === 'video_watch').length}</h2>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-2">Recent Events</h2>
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border">Type</th>
                                    <th className="px-4 py-2 border">Time</th>
                                    <th className="px-4 py-2 border">User ID</th>
                                    <th className="px-4 py-2 border">URL</th>
                                    <th className="px-4 py-2 border">Goal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.slice(-10).reverse().map((event, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2 border">{event.eventType}</td>
                                        <td className="px-4 py-2 border">{new Date(event.timestamp).toLocaleString()}</td>
                                        <td className="px-4 py-2 border">{event.userId}</td>
                                        <td className="px-4 py-2 border">{event.url}</td>
                                        <td className="px-4 py-2 border">{event.goalType}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}