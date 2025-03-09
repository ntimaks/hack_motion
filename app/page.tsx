import ClubFaceControlCard from "@/components/clubFaceControlCard";
import SwingImprovement from "@/components/swingImprovementCard";
import VideoSection from "@/components/videoSection";
import ChartCard from "@/components/chartCard";
import LeftSection from "@/components/leftSection";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-black bg-[#E6E6E6] 
      px-4 pt-8 pb-4 md:p-[95px] gap-8 md:gap-10">

      <div className="flex flex-col md:flex-row w-full gap-8 md:gap-[32px]">
        <LeftSection />
        {/* Card  Section*/}
        <div className="flex flex-col" style={{ width: '100%', maxWidth: '565.5px', gap: '16px' }}>
          <ChartCard />
          <div className="flex flex-col md:flex-row w-full md:w-[565.5px] gap-4 md:gap-[16px] md:h-[274.5px]">
            <SwingImprovement />
            <ClubFaceControlCard />
          </div>
        </div>
      </div>

      <VideoSection />
    </div>
  );
}
