export interface AnalyticsEvent {
    eventType: 'page_view' | 'video_watch';
    userId: string;
    timestamp: number;
    url: string;
    userAgent?: string;
    deviceInfo?: {
        screen?: string;
        language?: string;
    };
    ipAddress?: string;
    referrer?: string;
    goalType?: string; // From your URL params
    additionalData?: Record<string, any>;
}

// Generate a unique user ID or get existing from storage
export const getUserId = (): string => {
    if (typeof window !== 'undefined') {
        const existingId = localStorage.getItem('user_id');
        if (existingId) return existingId;

        const newId = generateUniqueId();
        localStorage.setItem('user_id', newId);
        return newId;
    } else {
        return generateUniqueId();
    }
};

const generateUniqueId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const sendAnalyticsEvent = async (event: AnalyticsEvent): Promise<void> => {
    try {
        console.log('Analytics event being sent:', event);
        await fetch('/api/analytics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        });
        console.log('Analytics event sent successfully');
    } catch (error) {
        console.error('Failed to send analytics event:', error);
    }
};