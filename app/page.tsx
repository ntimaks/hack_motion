import ClubFaceControlCard from "@/components/clubFaceControlCard";
import SwingImprovement from "@/components/swingImprovementCard";
import VideoSection from "@/components/videoSection";
import ChartCard from "@/components/chartCard";
import LeftSection from "@/components/leftSection";
import { Suspense } from 'react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-black bg-[#E6E6E6] 
      px-4 pt-8 pb-4 lg:p-[95px] gap-8 lg:gap-10 ">

      <div className="flex flex-col lg:flex-row w-full gap-8 lg:gap-[32px] items-center lg:items-start">
        <Suspense fallback={<div>Loading...</div>}>
          <LeftSection />
        </Suspense>
        {/* Card Section*/}
        <div className="flex flex-col mx-auto lg:mx-0" style={{ width: '100%', maxWidth: '565.5px', gap: '16px' }}>
          <ChartCard />
          <div className="flex flex-col lg:flex-row w-full lg:w-[565.5px] gap-4 lg:gap-[16px] lg:h-[274.5px]">
            <SwingImprovement />
            <ClubFaceControlCard />
          </div>
        </div>
      </div>

      <VideoSection />
    </div>
  );
}
