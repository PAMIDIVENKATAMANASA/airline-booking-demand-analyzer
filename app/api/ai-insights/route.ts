import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate insights based on the data
    const insights = []

    // Analyze routes
    const highDemandRoutes = data.routes.filter((route: any) => route.demand > 70)
    if (highDemandRoutes.length > 0) {
      insights.push(`${highDemandRoutes.length} routes showing high demand (>70%). Consider increasing capacity.`)
    }

    // Analyze price trends
    const priceIncreases = data.routes.filter((route: any) => route.priceChange > 10)
    if (priceIncreases.length > 0) {
      insights.push(`${priceIncreases.length} routes experienced significant price increases (>10%).`)
    }

    // Analyze booking patterns
    const totalBookings = data.insights.totalBookings
    if (totalBookings > 50000) {
      insights.push("Strong booking volume indicates healthy market demand.")
    } else {
      insights.push("Booking volume below average - consider promotional strategies.")
    }

    // Seasonal insights
    const currentMonth = new Date().getMonth()
    if (currentMonth >= 5 && currentMonth <= 7) {
      // Winter months
      insights.push("Winter travel season - domestic routes typically see increased demand.")
    } else if (currentMonth >= 11 || currentMonth <= 1) {
      // Summer months
      insights.push("Summer holiday season - international and leisure routes peak.")
    }

    // Market recommendations
    insights.push("Implement dynamic pricing strategies during peak demand periods.")
    insights.push("Monitor competitor pricing on high-demand routes for optimization opportunities.")

    return NextResponse.json({ insights })
  } catch (error) {
    console.error("Error generating AI insights:", error)
    return NextResponse.json({ error: "Failed to generate insights" }, { status: 500 })
  }
}
