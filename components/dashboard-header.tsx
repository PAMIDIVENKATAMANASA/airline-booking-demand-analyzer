import { Plane, TrendingUp, BarChart3 } from "lucide-react"

export default function DashboardHeader() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Airline Market Demand Analyzer</h1>
              <p className="text-gray-600">Real-time insights for airline booking trends across Australia</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-green-600">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-medium">Live Data</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-600">
              <BarChart3 className="h-5 w-5" />
              <span className="text-sm font-medium">Analytics Active</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
