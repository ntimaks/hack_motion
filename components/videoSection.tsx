"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown, ChevronUp, Play, Pause } from "lucide-react"

export default function GolfTrainingProgram() {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
        static: false,
        dynamic: false,
        challenge: false,
    })

    // Timestamp definitions (in seconds)
    const timestamps = {
        static: 5,
        dynamic: 14,
        challenge: 24,
        total: 30, // Assuming total video length is 30 seconds
    }

    // Toggle section manually
    const toggleSection = (section: string) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }))
    }

    // Calculate progress based on video time
    const calculateProgress = () => {
        return (currentTime / timestamps.total) * 100
    }

    // Play/pause video
    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play().catch(error => {
                    console.error("Error trying to play the video:", error);
                });
            }
            setIsPlaying(!isPlaying)
        }
    }

    // Update time and handle section opening based on timestamps
    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const handleTimeUpdate = () => {
            const time = video.currentTime
            setCurrentTime(time)

            // Open sections based on timestamps
            if (time >= timestamps.static && time < timestamps.dynamic) {
                setOpenSections({
                    static: true,
                    dynamic: false,
                    challenge: false,
                })
            } else if (time >= timestamps.dynamic && time < timestamps.challenge) {
                setOpenSections({
                    static: true,
                    dynamic: true,
                    challenge: false,
                })
            } else if (time >= timestamps.challenge) {
                setOpenSections({
                    static: true,
                    dynamic: true,
                    challenge: true,
                })
            }
        }

        video.addEventListener("timeupdate", handleTimeUpdate)
        video.addEventListener("play", () => setIsPlaying(true))
        video.addEventListener("pause", () => setIsPlaying(false))

        return () => {
            video.removeEventListener("timeupdate", handleTimeUpdate)
            video.removeEventListener("play", () => setIsPlaying(true))
            video.removeEventListener("pause", () => setIsPlaying(false))
        }
    }, [timestamps])

    // Jump to specific timestamp when clicking on a section
    const jumpToTimestamp = (section: string) => {
        if (videoRef.current && timestamps[section as keyof typeof timestamps]) {
            videoRef.current.currentTime = timestamps[section as keyof typeof timestamps]
            if (!isPlaying) {
                videoRef.current.play().catch(error => {
                    console.error("Error trying to play the video:", error);
                });
                setIsPlaying(true)
            }
        }
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-[48px] font-medium text-[#5773FF] mb-8">The best solution for you: Impact Training Program</h1>

            <div className="border-t border-gray-300 my-4"></div>

            <div className="flex gap-8 mt-8">
                <div className="flex-1">
                    <div className="relative aspect-video w-full bg-black overflow-hidden">
                        <video
                            ref={videoRef}
                            className="w-[746px] h-[510px] object-cover"
                            src="/video.mp4"
                            onClick={togglePlay}
                            preload="auto"
                            playsInline
                        ></video>

                        <button
                            onClick={togglePlay}
                            className="absolute inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"
                        >
                            {isPlaying ?
                                <Pause className="w-16 h-16 text-white" /> :
                                <Play className="w-16 h-16 text-white" />
                            }
                        </button>
                    </div>
                </div>

                <div className="w-80 relative">
                    {/* Progress bar container */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-full">
                        {/* Animated fill */}
                        <div
                            className="absolute left-0 top-0 w-full bg-blue-500 rounded-full transition-all duration-300 ease-in-out"
                            style={{ height: `${calculateProgress()}%` }}
                        ></div>
                    </div>

                    <div className="ml-6">
                        {/* Static top drill */}
                        <div className="mb-6">
                            <button
                                onClick={() => {
                                    toggleSection("static")
                                    jumpToTimestamp("static")
                                }}
                                className={`flex items-center font-medium text-xl mb-2 hover:text-[#5773FF] ${currentTime >= timestamps.static ? "text-[#5773FF]" : "text-gray-400"
                                    }`}
                            >
                                {openSections.static ? <ChevronUp className="mr-2" /> : <ChevronDown className="mr-2" />}
                                Static top drill
                            </button>

                            {openSections.static && (
                                <div className="pl-7 text-gray-800 animate-fadeIn">
                                    Get a feel for the optimal wrist position at Top of your swing
                                </div>
                            )}
                        </div>

                        {/* Divider line */}
                        <div className="h-px bg-gray-200 w-full my-4"></div>

                        {/* Dynamic top drill */}
                        <div className="mb-6">
                            <button
                                onClick={() => {
                                    toggleSection("dynamic")
                                    jumpToTimestamp("dynamic")
                                }}
                                className={`flex items-center font-medium text-xl mb-2 hover:text-[#5773FF] ${currentTime >= timestamps.dynamic ? "text-[#5773FF]" : "text-gray-400"
                                    }`}
                            >
                                {openSections.dynamic ? <ChevronUp className="mr-2" /> : <ChevronDown className="mr-2" />}
                                Dynamic top drill
                            </button>

                            {openSections.dynamic && (
                                <div className="pl-7 text-gray-800 animate-fadeIn">
                                    Practice the transition from backswing to downswing with proper wrist angles
                                </div>
                            )}
                        </div>

                        {/* Divider line */}
                        <div className="h-px bg-gray-200 w-full my-4"></div>

                        {/* Top full swing challenge */}
                        <div className="mb-6">
                            <button
                                onClick={() => {
                                    toggleSection("challenge")
                                    jumpToTimestamp("challenge")
                                }}
                                className={`flex items-center font-medium text-xl mb-2 hover:text-[#5773FF] ${currentTime >= timestamps.challenge ? "text-[#5773FF]" : "text-gray-400"
                                    }`}
                            >
                                {openSections.challenge ? <ChevronUp className="mr-2" /> : <ChevronDown className="mr-2" />}
                                Top full swing challenge
                            </button>

                            {openSections.challenge && (
                                <div className="pl-7 text-gray-800 animate-fadeIn">
                                    Apply what you've learned in a full swing sequence with feedback
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

