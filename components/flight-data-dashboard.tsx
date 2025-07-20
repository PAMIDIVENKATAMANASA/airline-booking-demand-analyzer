"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import FlightTrendsChart from "@/components/flight-trends-chart"
import PopularRoutesTable from "@/components/popular-routes-table"
import PriceTrendsChart from "@/components/price-trends-chart"
import DemandHeatmap from "@/components/demand-heatmap"
import AIInsights from "@/components/ai-insights"
import { RefreshCw, Filter, Download } from "lucide-react"

interface FlightData {
  routes: Array<{
    origin: string
    destination: string
    demand: number
    avgPrice: number
    priceChange: number
    bookings: number
  }>
  trends: Array<{
    date: string
    bookings: number
    avgPrice: number
    demand: number
  }>
  insights: {
    topRoute: string
    priceIncrease: number
    peakDemand: string
    totalBookings: number
  }
}

export default function FlightDataDashboard() {
  const [data, setData] = useState<FlightData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedCity, setSelectedCity] = useState<string>("all")
  const [dateRange, setDateRange] = useState<string>("7d")
  const [refreshing, setRefreshing] = useState(false)

  const fetchData = async () => {
    setRefreshing(true)
    try {
      const response = await fetch(`/api/flight-data?city=${selectedCity}&range=${dateRange}`)
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error("Error fetching flight data:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [selectedCity, dateRange])

  const handleRefresh = () => {
    fetchData()
  }

  const handleExport = () => {
    if (data) {
      const dataStr = JSON.stringify(data, null, 2)
      const dataBlob = new Blob([dataStr], { type: "application/json" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = `airline-data-${new Date().toISOString().split("T")[0]}.json`
      link.click()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters and Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Data Filters & Controls</span>
          </CardTitle>
          <CardDescription>Customize your analysis by selecting specific cities and time ranges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium">City Focus</label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  <SelectItem value="sydney">Sydney</SelectItem>
                  <SelectItem value="melbourne">Melbourne</SelectItem>
                  <SelectItem value="brisbane">Brisbane</SelectItem>
                  <SelectItem value="perth">Perth</SelectItem>
                  <SelectItem value="adelaide">Adelaide</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Range</label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                  <SelectItem value="90d">Last 3 Months</SelectItem>
                  <SelectItem value="1y">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleRefresh} disabled={refreshing} variant="outline">
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
                Refresh Data
              </Button>
              <Button onClick={handleExport} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Badge variant="secondary">{dateRange}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.insights.totalBookings.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12.5% from previous period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Route</CardTitle>
              <Badge variant="outline">Popular</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.insights.topRoute}</div>
              <p className="text-xs text-muted-foreground">Highest demand route</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Price Change</CardTitle>
              <Badge variant={data.insights.priceIncrease > 0 ? "destructive" : "default"}>
                {data.insights.priceIncrease > 0 ? "↑" : "↓"}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data.insights.priceIncrease > 0 ? "+" : ""}
                {data.insights.priceIncrease}%
              </div>
              <p className="text-xs text-muted-foreground">Average price change</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Peak Demand</CardTitle>
              <Badge variant="secondary">Time</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.insights.peakDemand}</div>
              <p className="text-xs text-muted-foreground">Highest booking period</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Charts and Visualizations */}
      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FlightTrendsChart data={data.trends} />
          <PriceTrendsChart data={data.trends} />
        </div>
      )}

      {/* Tables and Detailed Data */}
      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PopularRoutesTable routes={data.routes} />
          </div>
          <div>
            <AIInsights data={data} />
          </div>
        </div>
      )}

      {/* Demand Heatmap */}
      {data && <DemandHeatmap routes={data.routes} />}
    </div>
  )
}
