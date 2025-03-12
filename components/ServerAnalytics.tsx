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
        if (!hasTrackedPageView.current) {
            trackPageView({
                userId,
                pageTitle: document.title,
                goalType: goal,
            });
            hasTrackedPageView.current = true;
        }

        const startButton = document.querySelector('button:contains("Start Now")');
        if (startButton) {
            startButton.addEventListener('click', () => {
                trackButtonClick('start-now-button', 'Start Now', {
                    goalType: goal,
                });
            });
        }

        return () => {
            if (startButton) {
                startButton.removeEventListener('click', () => { });
            }
        };
    }, [userId, goal]);

    return null;
}