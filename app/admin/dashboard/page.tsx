import type { Metadata } from "next"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export const metadata: Metadata = {
  title: "Admin Dashboard - Nowzer",
  description: "Administrative dashboard for managing school content.",
}

export default function AdminDashboardPage() {
  return <AdminDashboard />
}
