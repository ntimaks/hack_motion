interface PageViewData {
    userId?: string;
    pageTitle: string;
    goalType: string;
}

interface ButtonClickData {
    goalType: string;
}

export const trackPageView = (data: PageViewData) => {
    console.log('Page view tracked:', data);
};

export const trackButtonClick = (buttonId: string, buttonText: string, data: ButtonClickData) => {
    console.log('Button click tracked:', { buttonId, buttonText, ...data });
}; 