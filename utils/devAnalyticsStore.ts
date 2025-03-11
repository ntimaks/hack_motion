// Create a simple store at utils/devAnalyticsStore.ts
// This is only for development - not for production use

export const analyticsStore = {
    events: [] as any[],

    addEvent(event: any) {
        this.events.push({
            ...event,
            recordedAt: new Date()
        });
        console.log(`Event recorded: ${event.eventType}`);
        console.log(`Total events: ${this.events.length}`);
    },

    getEvents() {
        return this.events;
    },

    clear() {
        this.events = [];
        console.log('Analytics store cleared');
    }
};
