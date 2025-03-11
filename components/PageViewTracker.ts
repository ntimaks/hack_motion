"use client";

import { useEffect } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { getUserId, sendAnalyticsEvent } from '@/utils/analytics';

interface PageViewTrackerProps {
    userAgent: string;
}

export default function PageViewTracker({ userAgent }: PageViewTrackerProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const goal = searchParams.get("goal") || "break 80";

    useEffect(() => {
        // Track page view when component mounts
        const trackPageView = async () => {
            const userId = getUserId();
            const url = `${window.location.origin}${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;

            await sendAnalyticsEvent({
                eventType: 'page_view',
                userId,
                timestamp: Date.now(),
                url,
                userAgent,
                deviceInfo: {
                    screen: `${window.innerWidth}x${window.innerHeight}`,
                    language: navigator.language,
                },
                referrer: document.referrer,
                goalType: goal,
            });
        };

        trackPageView();
    }, [pathname, searchParams, userAgent, goal]);

    return null; // This component doesn't render anything
}