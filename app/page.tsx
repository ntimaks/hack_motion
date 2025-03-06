import ClubFaceControlCard from "@/components/clubFaceControlCard";
import SwingImprovement from "@/components/swingImprovementCard";
export default function Home() {
  return (
    <div className="flex flex-row items-center justify-center h-screen text-black bg-[#E6E6E6] gap-10">

      <div className="flex flex-row" style={{ width: '565.5px', gap: '16px', height: '274.5px' }}>
        <SwingImprovement />
        <ClubFaceControlCard />

      </div>
    </div>
  );
}
