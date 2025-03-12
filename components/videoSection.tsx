"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown, ChevronUp, Play, Pause } from "lucide-react"
import { getUserId, sendAnalyticsEvent } from "@/utils/analytics"
import { useSearchParams } from 'next/navigation'

interface Section {
    id: string
    name: string
    time: number
    description: string
}

interface VideoSectionProps {
    videoSrc?: string
    title?: string
    sections?: Section[]
    totalDuration?: number
}

export default function VideoSection({
    videoSrc = "/video.mp4",
    title = "The best solution for you: Impact Training Program",
    sections = [
        { id: "static", name: "Static top drill", time: 5, description: "Get a feel for the optimal wrist position at Top of your swing" },
        { id: "dynamic", name: "Dynamic top drill", time: 14, description: "Practice the transition from backswing to downswing with proper wrist angles" },
        { id: "challenge", name: "Top full swing challenge", time: 24, description: "Apply what you've learned in a full swing sequence with feedback" }
    ],
    totalDuration = 30
}: VideoSectionProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const timelineRef = useRef<HTMLDivElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [activeSection, setActiveSection] = useState<string | null>(null)
    const [showControls, setShowControls] = useState(false)
    const [videoError, setVideoError] = useState(false)
    const searchParams = useSearchParams()
    const goal = searchParams.get("goal") || "break 80"

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play().catch(error => {
                    console.error("Error playing video:", error)
                    setVideoError(true)
                })
            }
        }
    }

    const jumpToSection = (sectionId: string) => {
        const section = sections.find(s => s.id === sectionId)
        if (videoRef.current && section) {
            videoRef.current.currentTime = section.time
            if (!isPlaying) {
                videoRef.current.play().catch(error => {
                    console.error("Error playing video:", error)
                    setVideoError(true)
                })
            }
            setActiveSection(sectionId)
        }
    }

    const toggleSection = (sectionId: string) => {
        setActiveSection(activeSection === sectionId ? null : sectionId)
        jumpToSection(sectionId)
    }

    const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!timelineRef.current || !videoRef.current) return

        const rect = timelineRef.current.getBoundingClientRect()
        const clickPosition = (e.clientX - rect.left) / rect.width
        const newTime = clickPosition * (duration || totalDuration)

        videoRef.current.currentTime = newTime
    }

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const handleTimeUpdate = () => {
            setCurrentTime(video.currentTime)

            // Set active section based on current time
            for (let i = sections.length - 1; i >= 0; i--) {
                if (video.currentTime >= sections[i].time) {
                    setActiveSection(sections[i].id)
                    break
                }
            }
        }

        const handlePlayState = () => setIsPlaying(!video.paused)
        const handleLoadedMetadata = () => setDuration(video.duration)
        const handleError = () => setVideoError(true)

        video.addEventListener("timeupdate", handleTimeUpdate)
        video.addEventListener("play", handlePlayState)
        video.addEventListener("pause", handlePlayState)
        video.addEventListener("loadedmetadata", handleLoadedMetadata)
        video.addEventListener("error", handleError)

        return () => {
            video.removeEventListener("timeupdate", handleTimeUpdate)
            video.removeEventListener("play", handlePlayState)
            video.removeEventListener("pause", handlePlayState)
            video.removeEventListener("loadedmetadata", handleLoadedMetadata)
            video.removeEventListener("error", handleError)
        }
    }, [sections])

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const handleVideoEnd = async () => {
            const userId = getUserId()
            const pathname = window.location.pathname
            const url = `${window.location.origin}${pathname}${window.location.search}`

            await sendAnalyticsEvent({
                eventType: 'video_watch',
                userId,
                timestamp: Date.now(),
                url,
                userAgent: navigator.userAgent,
                deviceInfo: {
                    screen: `${window.innerWidth}x${window.innerHeight}`,
                    language: navigator.language,
                },
                goalType: goal,
                additionalData: {
                    videoTitle: title,
                    videoDuration: video.duration,
                    completedSections: sections.map(s => s.id),
                }
            })
        }

        video.addEventListener('ended', handleVideoEnd)

        return () => {
            video.removeEventListener('ended', handleVideoEnd)
        }
    }, [sections, title, goal])

    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60)
        const seconds = Math.floor(timeInSeconds % 60)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }

    return (
        <div className="max-w-6xl mx-auto w-full p-6 px-0 sm:px-6">
            <h1 className="text-[32px] font-medium text-[#5773FF] mb-8 md:text-4xl sm:text-3xl">
                {title}
            </h1>

            <div className="border-t border-gray-300 my-4 w-full"></div>

            <div className="flex flex-col gap-8 mt-8 lg:flex-row">
                {/* Video player */}
                <div className="flex-1">
                    <div
                        className="relative aspect-video bg-black overflow-hidden "
                        onMouseEnter={() => setShowControls(true)}
                        onMouseLeave={() => setShowControls(false)}
                    >
                        {videoError ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-black text-white">
                                <p>Video could not be loaded. Please try again later.</p>
                            </div>
                        ) : (
                            <video
                                ref={videoRef}
                                className="w-full h-full object-cover"
                                src={videoSrc}
                                onClick={togglePlay}
                                preload="auto"
                                playsInline
                                aria-label="Golf training video"
                            ></video>
                        )}

                        {/* Video controls overlay */}
                        <div
                            className={`absolute inset-0 flex flex-col justify-between transition-opacity duration-300 ${showControls || !isPlaying || videoError ? 'opacity-100' : 'opacity-0'
                                }`}
                            aria-hidden={!showControls && isPlaying && !videoError}
                        >
                            {/* Play/Pause button and Timeline container */}
                            {!videoError && (
                                <>
                                    {/* Play/Pause button in absolute position */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <button
                                            onClick={togglePlay}
                                            className="bg-black/30 rounded-full p-4 hover:bg-black/50 transition-colors pointer-events-auto"
                                            aria-label={isPlaying ? "Pause video" : "Play video"}
                                        >
                                            {isPlaying ?
                                                <Pause className="w-10 h-10 text-white" /> :
                                                <Play className="w-10 h-10 text-white" />
                                            }
                                        </button>
                                    </div>

                                    {/* Timeline container at the bottom */}
                                    <div className="bg-gradient-to-t from-black/70 to-transparent p-4 pt-12 mt-auto">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-white">{formatTime(currentTime)}</span>
                                            <div
                                                ref={timelineRef}
                                                className="relative h-2 flex-1 bg-white/30 rounded-full cursor-pointer"
                                                onClick={handleTimelineClick}
                                                role="slider"
                                                aria-label="Video progress"
                                                aria-valuemin={0}
                                                aria-valuemax={duration || totalDuration}
                                                aria-valuenow={currentTime}
                                            >
                                                {/* Section markers */}
                                                {sections.map(section => (
                                                    <div
                                                        key={section.id}
                                                        className="absolute top-0 w-1 h-full bg-white rounded-full"
                                                        style={{ left: `${(section.time / (duration || totalDuration)) * 100}%` }}
                                                        title={section.name}
                                                    />
                                                ))}

                                                {/* Progress bar */}
                                                <div
                                                    className="absolute top-0 left-0 h-full bg-[#5773FF] rounded-full"
                                                    style={{ width: `${(currentTime / (duration || totalDuration)) * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-sm text-white">{formatTime(duration || totalDuration)}</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sections sidebar */}
                <div className="w-full lg:w-80 relative mt-6 lg:mt-0">
                    {/* Progress bar - vertical on desktop */}
                    <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-4 bg-white rounded-full">
                        <div
                            className="absolute left-0 top-2 bottom-0 w-[5px] bg-[#5773FF] rounded-full transition-all duration-300 left-1/2 -translate-x-1/2"
                            style={{ height: `${(currentTime / (duration || totalDuration)) * 100}%` }}
                        ></div>
                    </div>

                    {/* Progress bar - horizontal on mobile */}
                    <div className="block lg:hidden absolute left-0 top-0 w-full h-4 bg-white rounded-full">
                        <div
                            className="absolute left-2 top-1/2 -translate-y-1/2 h-[5px] bg-[#5773FF] rounded-full transition-all duration-300"
                            style={{ width: `${(currentTime / (duration || totalDuration)) * 100}%` }}
                        ></div>
                    </div>

                    <div className="ml-6 lg:ml-6 mt-4 lg:mt-0 pt-5">
                        {sections.map((section, index) => (
                            <div key={section.id} className="mb-6 border-b border-gray-300 pb-4">
                                {index > 0 && <div className="h-px bg-gray-200 w-full my-4"></div>}

                                <button
                                    onClick={() => toggleSection(section.id)}
                                    className={`flex items-start text-left font-medium text-xl mb-2 hover:text-[#5773FF] ${currentTime >= section.time ? "text-[#5773FF]" : "text-gray-400"
                                        }`}
                                    aria-expanded={activeSection === section.id}
                                >
                                    {activeSection === section.id ?
                                        <ChevronUp className="mr-2 flex-shrink-0" /> :
                                        <ChevronDown className="mr-2 flex-shrink-0" />
                                    }
                                    {section.name}
                                </button>

                                {activeSection === section.id && (
                                    <div className="pl-7 text-gray-800 animate-fadeIn">
                                        {section.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
