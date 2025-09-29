import type { Metadata } from "next"
import { AdminLogin } from "@/components/admin/admin-login"

export const metadata: Metadata = {
  title: "Admin Login - Nowzer",
  description: "Secure admin access for Nowzer staff.",
}

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <AdminLogin />
    </div>
  )
}
