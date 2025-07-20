"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

interface Route {
  origin: string
  destination: string
  demand: number
  avgPrice: number
  priceChange: number
  bookings: number
}

interface PopularRoutesTableProps {
  routes: Route[]
}

export default function PopularRoutesTable({ routes }: PopularRoutesTableProps) {
  const sortedRoutes = routes.sort((a, b) => b.demand - a.demand).slice(0, 10)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="h-5 w-5" />
          <span>Popular Routes</span>
        </CardTitle>
        <CardDescription>Top 10 routes by demand and booking volume</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Route</TableHead>
              <TableHead className="text-right">Demand</TableHead>
              <TableHead className="text-right">Bookings</TableHead>
              <TableHead className="text-right">Avg Price</TableHead>
              <TableHead className="text-right">Price Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedRoutes.map((route, index) => (
              <TableRow key={`${route.origin}-${route.destination}`}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      #{index + 1}
                    </Badge>
                    <span>
                      {route.origin} → {route.destination}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-1">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        route.demand > 80 ? "bg-red-500" : route.demand > 60 ? "bg-yellow-500" : "bg-green-500"
                      }`}
                    />
                    <span>{route.demand}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">{route.bookings.toLocaleString()}</TableCell>
                <TableCell className="text-right">${route.avgPrice}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={route.priceChange > 0 ? "destructive" : "default"}>
                    {route.priceChange > 0 ? "+" : ""}
                    {route.priceChange}%
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
