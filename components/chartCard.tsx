"use client"

import type React from "react"
import { useEffect, useState } from "react"

const ChartCard: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 640)
        }
        checkScreenSize()
        window.addEventListener("resize", checkScreenSize)
        return () => window.removeEventListener("resize", checkScreenSize)
    }, [])

    return (
        <div className={`rounded-[8px] bg-[#F7F7F7] w-full p-6 relative ${isMobile ? "aspect-square" : "h-[300px]"} transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg`}>
            {/* Y-axis labels - Different for mobile and desktop */}
            {isMobile ? (
                <>
                    <div className="absolute left-6 top-8 text-[14px] text-gray-700 font-medium">100+</div>
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[14px] text-gray-700 font-medium">
                        Break 100
                    </div>
                    <div className="absolute left-6 bottom-8 text-[14px] text-gray-700 font-medium">Break 90</div>
                </>
            ) : (
                <>
                    <div className="absolute left-4 top-6 text-sm text-gray-600 font-medium">Break 90</div>
                    <div className="absolute left-4 top-[180px] text-sm text-gray-600 font-medium">Break 80</div>
                    <div className="absolute left-4 bottom-6 text-sm text-gray-600 font-medium">Break 75</div>
                </>
            )}

            {/* Horizontal dotted lines */}
            {isMobile ? (
                <>
                    <div className="absolute left-[120px] right-6 top-[60px] border-t border-dashed border-gray-300"></div>
                    <div className="absolute left-[120px] right-6 top-1/2 border-t border-dashed border-gray-300"></div>
                    <div className="absolute left-[120px] right-6 bottom-[60px] border-t border-dashed border-gray-300"></div>
                </>
            ) : (
                <>
                    <div className="absolute left-[85px] right-4 top-[30px] border-t border-dashed border-gray-300"></div>
                    <div className="absolute left-[85px] right-4 top-[190px] border-t border-dashed border-gray-300"></div>
                    <div className="absolute left-[85px] right-4 bottom-[30px] border-t border-dashed border-gray-300"></div>
                </>
            )}

            {/* The curve - using SVG for the smooth curve */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                {isMobile ? (
                    <path d="M 35 15 C 45 15, 55 15, 65 50 S 85 85, 90 85" fill="none" stroke="#5b6ef5" strokeWidth="0.8" />
                ) : (
                    <path d="M 18 10 C 30 10, 40 10, 50 50 S 80 90, 96 90" fill="none" stroke="#5b6ef5" strokeWidth="0.8" />
                )}
            </svg>

            {/* "Now" label with black box */}
            {isMobile ? (
                <div className="absolute left-[35%] top-[22%]">
                    <div className="relative">
                        <div
                            className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 
              border-l-[8px] border-l-transparent 
              border-r-[8px] border-r-transparent 
              border-b-[8px] border-black"
                        ></div>
                        <div className="bg-black text-white px-4 py-2 rounded-md text-base font-medium">Now</div>
                    </div>
                </div>
            ) : (
                <div className="absolute left-[115px] top-[70px]">
                    <div className="relative">
                        <div
                            className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 
              border-l-[8px] border-l-transparent 
              border-r-[8px] border-r-transparent 
              border-b-[8px] border-black"
                        ></div>
                        <div className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium">Now</div>
                    </div>
                </div>
            )}

            {/* "After HackMotion" label with blue box */}
            {isMobile ? (
                <div className="absolute right-[15%] top-[58%]">
                    <div className="relative">
                        <div
                            className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 
              border-l-[8px] border-l-transparent 
              border-r-[8px] border-r-transparent 
              border-b-[8px] border-[#5b6ef5]"
                        ></div>
                        <div className="bg-[#5b6ef5] text-white px-4 py-2 rounded-md text-base font-medium whitespace-nowrap">
                            After HackMotion
                        </div>
                    </div>
                </div>
            ) : (
                <div className="absolute right-[40px] bottom-[45px]">
                    <div className="relative">
                        <div
                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 
              border-l-[8px] border-l-transparent 
              border-r-[8px] border-r-transparent 
              border-t-[8px] border-[#5b6ef5]"
                        ></div>
                        <div className="bg-[#5b6ef5] text-white px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap">
                            After HackMotion
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ChartCard
