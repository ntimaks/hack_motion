"use client"

import { ArrowRight } from "lucide-react"
import { useSearchParams } from "next/navigation"

export default function LeftSection() {
    const searchParams = useSearchParams()
    const goal = searchParams.get("goal") || "break 80"

    const getGoalText = () => {
        switch (goal.toLowerCase()) {
            case "par":
                return "Break Par"
            case "80":
                return "Break 80"
            case "90":
                return "Break 90"
            case "100":
                return "Break 100"
            default:
                return "Break ??"
        }
    }

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h2 className="text-[32px] font-medium text-black">
                    We have put together a swing improvement solution to help you{" "}
                    <span className="text-[#5773FF]">{getGoalText()}</span>
                </h2>
            </div>

            <div className="space-y-4">
                <h3 className="text-black text-[24px] font-normal">Pack includes:</h3>

                <div className="border-t border-gray-300"></div>

                <div className="space-y-2 border-l-4 border-[#5773FF] pl-4">
                    <p className="text-black text-[16px]">Swing Analyzer - HackMotion Core</p>
                    <p className="text-black text-[16px]">Drills by coach Tyler Ferrell</p>
                    <p className="text-black text-[16px]">Game improvement plan by HackMotion</p>
                </div>

                <button className="bg-[#5773FF] text-white text-[16px] px-6 py-3 rounded-full flex items-center gap-2 hover:bg-[#5773FF] transition-colors">
                    Start Now
                    <ArrowRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    )
}

