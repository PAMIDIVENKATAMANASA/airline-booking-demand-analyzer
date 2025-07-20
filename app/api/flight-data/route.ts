import { type NextRequest, NextResponse } from "next/server"

// Mock data generator for airline booking data
function generateMockFlightData(city: string, range: string) {
  const cities = ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Darwin", "Hobart"]
  const routes = []

  // Generate popular routes
  for (let i = 0; i < cities.length; i++) {
    for (let j = 0; j < cities.length; j++) {
      if (i !== j) {
        const origin = cities[i]
        const destination = cities[j]

        // Filter by city if specified
        if (city !== "all" && origin.toLowerCase() !== city && destination.toLowerCase() !== city) {
          continue
        }

        routes.push({
          origin,
          destination,
          demand: Math.floor(Math.random() * 100) + 1,
          avgPrice: Math.floor(Math.random() * 500) + 200,
          priceChange: (Math.random() - 0.5) * 20,
          bookings: Math.floor(Math.random() * 1000) + 100,
        })
      }
    }
  }

  // Generate trend data
  const days = range === "7d" ? 7 : range === "30d" ? 30 : range === "90d" ? 90 : 365
  const trends = []

  for (let i = days; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)

    trends.push({
      date: date.toISOString().split("T")[0],
      bookings: Math.floor(Math.random() * 2000) + 500,
      avgPrice: Math.floor(Math.random() * 100) + 300,
      demand: Math.floor(Math.random() * 100) + 1,
    })
  }

  // Calculate insights
  const topRoute = routes.sort((a, b) => b.demand - a.demand)[0]
  const avgPriceChange = routes.reduce((sum, route) => sum + route.priceChange, 0) / routes.length
  const totalBookings = routes.reduce((sum, route) => sum + route.bookings, 0)

  return {
    routes: routes.slice(0, 20), // Limit to top 20 routes
    trends,
    insights: {
      topRoute: `${topRoute.origin} → ${topRoute.destination}`,
      priceIncrease: Math.round(avgPriceChange * 10) / 10,
      peakDemand: "Weekend",
      totalBookings,
    },
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get("city") || "all"
    const range = searchParams.get("range") || "7d"

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const data = generateMockFlightData(city, range)

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error generating flight data:", error)
    return NextResponse.json({ error: "Failed to fetch flight data" }, { status: 500 })
  }
}
