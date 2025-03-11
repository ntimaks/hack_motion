'use client';

import { useEffect, useRef } from 'react';
import { trackPageView, trackButtonClick } from '@/lib/analytics';
import { useSearchParams } from 'next/navigation';

interface ServerAnalyticsProps {
    userId?: string;
}

export default function ServerAnalytics({ userId }: ServerAnalyticsProps) {
    const hasTrackedPageView = useRef(false);
    const searchParams = useSearchParams();
    const goal = searchParams.get('goal') || 'break 80';

    useEffect(() => {
        // Only track page view once per component mount
        if (!hasTrackedPageView.current) {
            trackPageView({
                userId,
                pageTitle: document.title,
                goalType: goal,
            });
            hasTrackedPageView.current = true;
        }

        // Set up button click tracking for the "Start Now" button
        const startButton = document.querySelector('button:contains("Start Now")');
        if (startButton) {
            startButton.addEventListener('click', () => {
                trackButtonClick('start-now-button', 'Start Now', {
                    goalType: goal,
                });
            });
        }

        // Clean up event listeners
        return () => {
            if (startButton) {
                startButton.removeEventListener('click', () => { });
            }
        };
    }, [userId, goal]);

    // This component doesn't render anything
    return null;
}