
"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Your name" defaultValue="John Doe" />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" defaultValue="john@example.com" />
        </div>

        <Button className="mt-4">Save Changes</Button>
      </div>
    </div>
  )
}
