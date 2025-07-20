"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Map } from "lucide-react"

interface Route {
  origin: string
  destination: string
  demand: number
  avgPrice: number
  priceChange: number
  bookings: number
}

interface DemandHeatmapProps {
  routes: Route[]
}

export default function DemandHeatmap({ routes }: DemandHeatmapProps) {
  const cities = ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Darwin", "Hobart"]

  const getDemandLevel = (city: string) => {
    const cityRoutes = routes.filter((route) => route.origin === city || route.destination === city)
    const avgDemand = cityRoutes.reduce((sum, route) => sum + route.demand, 0) / cityRoutes.length
    return avgDemand || 0
  }

  const getDemandColor = (demand: number) => {
    if (demand > 80) return "bg-red-500"
    if (demand > 60) return "bg-orange-500"
    if (demand > 40) return "bg-yellow-500"
    if (demand > 20) return "bg-green-500"
    return "bg-blue-500"
  }

  const getDemandLabel = (demand: number) => {
    if (demand > 80) return "Very High"
    if (demand > 60) return "High"
    if (demand > 40) return "Medium"
    if (demand > 20) return "Low"
    return "Very Low"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Map className="h-5 w-5" />
          <span>Demand Heatmap</span>
        </CardTitle>
        <CardDescription>Geographic distribution of airline booking demand across Australian cities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cities.map((city) => {
            const demand = getDemandLevel(city)
            return (
              <div key={city} className="text-center">
                <div
                  className={`w-16 h-16 mx-auto rounded-full ${getDemandColor(demand)} flex items-center justify-center text-white font-bold text-sm mb-2`}
                >
                  {Math.round(demand)}%
                </div>
                <div className="text-sm font-medium">{city}</div>
                <div className="text-xs text-gray-500">{getDemandLabel(demand)}</div>
              </div>
            )
          })}
        </div>
        <div className="mt-6 flex items-center justify-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Very Low</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Low</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Medium</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span>High</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Very High</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
