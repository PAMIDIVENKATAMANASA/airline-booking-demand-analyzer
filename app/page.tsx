import { Suspense } from "react"
import DashboardHeader from "@/components/dashboard-header"
import FlightDataDashboard from "@/components/flight-data-dashboard"
import LoadingSpinner from "@/components/loading-spinner"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<LoadingSpinner />}>
          <FlightDataDashboard />
        </Suspense>
      </main>
    </div>
  )
}
