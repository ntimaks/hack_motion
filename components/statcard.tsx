export default function StatCard({ title, value, icon, color }: StatCardProps) {
    const colorClasses = {
        blue: "bg-blue-50 border-blue-200",
        green: "bg-green-50 border-green-200",
        purple: "bg-purple-50 border-purple-200",
    }

    return (
        <div className={`rounded-lg shadow border p-6 ${colorClasses[color]}`}>
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-700">{title}</h3>
                {icon}
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
        </div>
    )
}

interface StatCardProps {
    title: string
    value: number
    icon: React.ReactNode
    color: "blue" | "green" | "purple"
}