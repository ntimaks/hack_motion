import Star from "@/public/star";

export default function ClubFaceControlCard() {
    return (
        <div className="bg-white rounded-[8px] p-6 pb-8 w-full transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
            <h3 className="text-[24px] mb-3">Can clubface control improve your swing?</h3>
            <div className="border-t border-gray-200 my-4"></div>

            <div className="flex flex-col items-center justify-center">
                <div className="relative w-32 h-32 justify-center items-center">

                    {/* Curved line */}
                    <div className="flex items-center justify-center">
                        <svg width="127" height="92" viewBox="0 0 127 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.61716 89.5834L6.58622 84.6892L4.98958 79.6366L3.83937 74.4641L3.14435 69.211L2.9098 63.9174L3.13753 58.6234L3.8258 53.3695L4.96934 48.1955L6.55948 43.1409L8.58411 38.244L11.0278 33.5423L13.872 29.0715L17.095 24.8656L20.6724 20.9566L24.5768 17.3742L28.7786 14.1458L33.2457 11.2958L37.9443 8.84604L42.8385 6.81511L47.8911 5.21847L53.0636 4.06826L58.3166 3.37324L63.6103 3.1387L68.9042 3.36642L74.1582 4.05468L79.3322 5.19823L84.3868 6.78837L89.2836 8.813L93.9853 11.2567L98.4562 14.1009L102.662 17.3239L106.571 20.9013L110.153 24.8057L113.382 29.0075L116.232 33.4746L118.682 38.1732L120.713 43.0674L122.309 48.12L123.459 53.2925L124.154 58.5455L124.389 63.8392L124.161 69.1331L123.473 74.3871L122.329 79.5611L120.739 84.6157L118.715 89.5125" stroke="#5773FF" stroke-opacity="0.2" stroke-width="4.45455" stroke-linecap="round" />
                        </svg>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center pb-5">
                        <span className="text-[35.64px] font-medium text-[#5773FF]">Yes!</span>
                    </div>
                    <div className="flex mt-1 gap-1 w-full justify-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}