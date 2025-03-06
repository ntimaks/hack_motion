import Consistency from "@/public/Consistency";
import Distance from "@/public/Distance";
import GolfIcon from "@/public/GolfIcon";
export default function SwingImprovement() {
    return (
        <div className="bg-white rounded-[8px] p-6 pb-8 w-full">
            <h3 className="text-[24px] mb-3">Swing Improvement</h3>


            <div className="space-y-[16px]">
                <div className="border-t border-gray-200 my-4"></div>
                {/* Consistency */}
                <div className="flex items-center gap-3">
                    <div className="w-[36px] h-[36px] bg-[#5773FF33] rounded-[10px] flex items-center justify-center">
                        <Consistency />
                    </div>
                    <div className="flex-1 flex flex-col h-[36px] justify-between ">
                        <div className="text-[16px] font-medium">Consistency</div>
                        <div className="h-[6px] bg-[#E6E6E6] rounded-[72px] relative">
                            <div className="h-full w-[45%] bg-[#5773FF] rounded-[72px] absolute top-0 left-0"></div>
                            <div className="h-full w-[30%] bg-[#5773FF33] rounded-r-[72px] absolute top-0 left-[44%]"></div>
                        </div>
                    </div>
                </div>

                {/* Distance */}
                <div className="flex items-center gap-3">
                    <div className="w-[36px] h-[36px] bg-[#5773FF33] rounded-[10px] flex items-center justify-center">
                        <Distance />
                    </div>
                    <div className="flex-1 flex flex-col h-[36px] justify-between ">
                        <div className="text-[16px] font-medium">Distance</div>
                        <div className="h-[6px] bg-[#E6E6E6] rounded-[72px] relative">
                            <div className="h-full w-[45%] bg-[#5773FF] rounded-[72px] absolute top-0 left-0"></div>
                            <div className="h-full w-[30%] bg-[#5773FF33] rounded-r-[72px] absolute top-0 left-[44%]"></div>
                        </div>
                    </div>
                </div>

                {/* Ball Flight */}
                <div className="flex items-center gap-[12px]">
                    <div className="w-[36px] h-[36px] bg-[#5773FF33] rounded-[10px] flex items-center justify-center">
                        <GolfIcon />
                    </div>
                    <div className="flex-1 flex flex-col h-[36px] justify-between ">
                        <div className="text-[16px] font-medium">Ball Flight</div>
                        <div className="h-[6px] bg-[#E6E6E6] rounded-[72px] relative">
                            <div className="h-full w-[45%] bg-[#5773FF] rounded-[72px] absolute top-0 left-0"></div>
                            <div className="h-full w-[30%] bg-[#5773FF33] rounded-r-[72px] absolute top-0 left-[44%]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
