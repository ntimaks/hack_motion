"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { BarChart3, Eye, Film, Clock, User, LinkIcon, Target, Loader2, ArrowDown, ArrowUp } from "lucide-react"
import type { AnalyticsEvent } from "@/utils/analytics"
import StatCard from "@/components/statcard"

export default function AnalyticsDashboard() {
    const [events, setEvents] = useState<AnalyticsEvent[]>([])
    const [loading, setLoading] = useState(true)
    const [sortField, setSortField] = useState<string>("timestamp")
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

    useEffect(() => {
        async function fetchEvents() {
            try {
                const response = await fetch("/api/analytics/view")
                const data = await response.json()
                setEvents(data)
            } catch (error) {
                console.error("Error fetching analytics data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchEvents()
    }, [])

    const pageViews = events.filter((e) => e.eventType === "page_view").length
    const videoWatches = events.filter((e) => e.eventType === "video_watch").length

    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortDirection("desc")
        }
    }

    const sortedEvents = [...events].sort((a, b) => {
        if (sortField === "timestamp") {
            return sortDirection === "asc"
                ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
                : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        }

        if (sortField === "eventType") {
            return sortDirection === "asc" ? a.eventType.localeCompare(b.eventType) : b.eventType.localeCompare(a.eventType)
        }

        return 0
    })

    const recentEvents = sortedEvents.slice(0, 10)

    return (
        <div className="min-h-screen">


            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-64">
                        <Loader2 className="h-8 w-8 text-blue-600 animate-spin mb-4" />
                        <p className="text-gray-600">Loading analytics data...</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatCard
                                title="Total Events"
                                value={events.length}
                                icon={<BarChart3 className="h-6 w-6 text-blue-600" />}
                                color="blue"
                            />
                            <StatCard
                                title="Page Views"
                                value={pageViews}
                                icon={<Eye className="h-6 w-6 text-green-600" />}
                                color="green"
                            />
                            <StatCard
                                title="Video Watches"
                                value={videoWatches}
                                icon={<Film className="h-6 w-6 text-purple-600" />}
                                color="purple"
                            />
                        </div>

                        {/* Recent Events Table */}
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-200">
                                <h2 className="text-lg font-medium text-gray-800">Recent Events</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <TableHeader
                                                label="Type"
                                                field="eventType"
                                                sortField={sortField}
                                                sortDirection={sortDirection}
                                                onSort={handleSort}
                                                icon={<Target className="h-4 w-4 text-gray-500" />}
                                            />
                                            <TableHeader
                                                label="Time"
                                                field="timestamp"
                                                sortField={sortField}
                                                sortDirection={sortDirection}
                                                onSort={handleSort}
                                                icon={<Clock className="h-4 w-4 text-gray-500" />}
                                            />
                                            <TableHeader label="User ID" icon={<User className="h-4 w-4 text-gray-500" />} />
                                            <TableHeader label="URL" icon={<LinkIcon className="h-4 w-4 text-gray-500" />} />
                                            <TableHeader label="Goal" icon={<Target className="h-4 w-4 text-gray-500" />} />
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {recentEvents.map((event, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${event.eventType === "page_view"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-purple-100 text-purple-800"
                                                            }`}
                                                    >
                                                        {event.eventType}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(event.timestamp).toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.userId}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                                                    {event.url}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.goalType || "-"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}





interface TableHeaderProps {
    label: string
    field?: string
    sortField?: string
    sortDirection?: "asc" | "desc"
    onSort?: (field: string) => void
    icon: React.ReactNode
}

function TableHeader({ label, field, sortField, sortDirection, onSort, icon }: TableHeaderProps) {
    const isSorted = field && sortField === field

    return (
        <th
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            onClick={() => field && onSort && onSort(field)}
        >
            <div className="flex items-center gap-1 cursor-pointer">
                {icon}
                <span>{label}</span>
                {isSorted && (sortDirection === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
            </div>
        </th>
    )
}

