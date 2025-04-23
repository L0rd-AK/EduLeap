'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User, Lock, Bell, Shield } from 'lucide-react'; // Import icons
import React, { useState } from 'react';

export default function ProfilePage() {
  // Placeholder state for user data
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('123-456-7890');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const handleUpdateDetails = () => {
    console.log('Updating profile details:', { name, email, phone });
    // Implement update logic
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmNewPassword) {
      console.error('New passwords do not match');
      // Optionally show a user-friendly error message
      return;
    }
    console.log('Changing password:', { currentPassword, newPassword });
    // Implement password change logic
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white">Profile Settings</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">Manage your account details and preferences.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-8">
          {/* Personal Details */}
          <div className="grid gap-4">
             <div className="flex items-center gap-2">
                 <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Personal Details</h3>
             </div>
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">Phone</Label>
              <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <Button onClick={handleUpdateDetails} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2">Update Details</Button>
          </div>

          {/* Password Reset */}
          <div className="grid gap-4">
             <div className="flex items-center gap-2">
                <Lock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Change Password</h3>
             </div>
            <div className="grid gap-2">
              <Label htmlFor="current-password" className="text-gray-700 dark:text-gray-300">Current Password</Label>
              <Input id="current-password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-purple-500 focus:border-purple-500" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password" className="text-gray-700 dark:text-gray-300">New Password</Label>
              <Input id="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-purple-500 focus:border-purple-500" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-new-password" className="text-gray-700 dark:text-gray-300">Confirm New Password</Label>
              <Input id="confirm-new-password" type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-purple-500 focus:border-purple-500" />
            </div>
            <Button onClick={handleChangePassword} disabled={!currentPassword || !newPassword || !confirmNewPassword} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2">Change Password</Button>
          </div>

          {/* Notification Preferences */}
          <div className="grid gap-4">
             <div className="flex items-center gap-2">
                 <Bell className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Notification Preferences</h3>
             </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications" className="text-gray-700 dark:text-gray-300">Email Notifications</Label>
              <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} className="data-[state=checked]:bg-teal-600 dark:data-[state=checked]:bg-teal-500" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-notifications" className="text-gray-700 dark:text-gray-300">SMS Notifications</Label>
              <Switch id="sms-notifications" checked={smsNotifications} onCheckedChange={setSmsNotifications} className="data-[state=checked]:bg-teal-600 dark:data-[state=checked]:bg-teal-500" />
            </div>
          </div>

          {/* Login History and Security Settings (Placeholder) */}
          <div className="grid gap-4">
             <div className="flex items-center gap-2">
                 <Shield className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Security Settings</h3>
             </div>
            <p className="text-gray-600 dark:text-gray-400">Placeholder for login history and other security-related settings (e.g., two-factor authentication, active sessions).</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
