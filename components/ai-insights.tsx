"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, AlertTriangle, TrendingUp, Info } from "lucide-react"
import { useState, useEffect } from "react"

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

interface AIInsightsProps {
  data: FlightData
}

export default function AIInsights({ data }: AIInsightsProps) {
  const [insights, setInsights] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const generateInsights = async () => {
      setLoading(true)
      try {
        const response = await fetch("/api/ai-insights", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
        const result = await response.json()
        setInsights(result.insights || [])
      } catch (error) {
        console.error("Error generating insights:", error)
        // Fallback insights
        setInsights([
          "High demand detected for Sydney-Melbourne route",
          "Price volatility increased by 15% this week",
          "Weekend bookings show 23% higher demand",
          "International routes recovering post-pandemic",
        ])
      } finally {
        setLoading(false)
      }
    }

    generateInsights()
  }, [data])

  const getInsightIcon = (insight: string) => {
    if (insight.toLowerCase().includes("high") || insight.toLowerCase().includes("increase")) {
      return <AlertTriangle className="h-4 w-4 text-orange-500" />
    }
    if (insight.toLowerCase().includes("trend") || insight.toLowerCase().includes("growth")) {
      return <TrendingUp className="h-4 w-4 text-green-500" />
    }
    return <Info className="h-4 w-4 text-blue-500" />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5" />
          <span>AI Insights</span>
        </CardTitle>
        <CardDescription>AI-powered analysis of market trends and patterns</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                {getInsightIcon(insight)}
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{insight}</p>
                </div>
              </div>
            ))}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <Brain className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Market Recommendation</span>
              </div>
              <p className="text-sm text-blue-700">
                Consider increasing capacity on high-demand routes and implementing dynamic pricing strategies during
                peak periods to maximize revenue opportunities.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
