"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import NavigationBar from "@/components/navigation-bar"
import { 
  BookOpen, 
  Clock, 
  Star, 
  Trophy, 
  Edit3, 
  Settings,
  Target,
  Save,
  X,
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Bell,
  Shield,
  Trash2,
  AlertTriangle,
  Upload,
  Camera
} from "lucide-react"
import { useState, useRef } from "react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState("")
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const editFileInputRef = useRef<HTMLInputElement>(null)

  // Mock user data - in a real app this would come from your auth system
  const [user, setUser] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "/api/placeholder/150/150",
    joinDate: "March 2023",
    bio: "Passionate about learning and creating study materials. Love exploring new topics and helping others learn.",
    level: "Advanced",
    streak: 45,
    totalStudyTime: "127 hours",
    decksCreated: 23,
    decksStudied: 156,
    averageScore: 87
  })

  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const [settings, setSettings] = useState({
    emailNotifications: true,
    studyReminders: true,
    achievementAlerts: false,
    publicProfile: true
  })

  const recentActivity = [
    {
      id: 1,
      type: "study",
      title: "Biology Chapter 5",
      time: "2 hours ago",
      score: 92
    },
    {
      id: 2,
      type: "create",
      title: "Spanish Vocabulary",
      time: "1 day ago",
      cards: 45
    },
    {
      id: 3,
      type: "study",
      title: "Chemistry Formulas",
      time: "2 days ago",
      score: 78
    },
    {
      id: 4,
      type: "create",
      title: "History Timeline",
      time: "3 days ago",
      cards: 32
    }
  ]

  const handleSaveProfile = () => {
    setUser(prev => ({ ...prev, ...editForm }))
    setIsEditing(false)
    // Clear any selected image from edit mode
    setSelectedImage(null)
    setImagePreview(null)
  }

  const handleCancelEdit = () => {
    setEditForm({
      name: user.name,
      email: user.email,
      bio: user.bio
    })
    setIsEditing(false)
    // Clear any selected image from edit mode
    setSelectedImage(null)
    setImagePreview(null)
  }

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords don't match!")
      return
    }
    // Here you would typically make an API call to change the password
    alert("Password changed successfully!")
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    })
  }

  const handleSettingChange = (setting: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [setting]: value }))
  }

  const handleDeleteAccount = () => {
    if (deleteConfirmation !== "DELETE") {
      alert("Please type 'DELETE' to confirm account deletion")
      return
    }
    
    // Here you would typically make an API call to delete the account
    alert("Account deleted successfully!")
    // Redirect to home page or login page
    window.location.href = "/"
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB')
        return
      }

      setSelectedImage(file)
      
      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveImage = () => {
    if (selectedImage && imagePreview) {
      // Here you would typically upload the image to your server
      // and get back a URL to store in the user's profile
      setUser(prev => ({ ...prev, avatar: imagePreview }))
      setSelectedImage(null)
      setImagePreview(null)
      alert('Profile image updated successfully!')
    }
  }

  const handleRemoveImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    if (editFileInputRef.current) {
      editFileInputRef.current.value = ''
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const triggerEditFileInput = () => {
    editFileInputRef.current?.click()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      <div className="p-6 max-w-6xl mx-auto">
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {showSettings ? "Settings" : "Profile"}
              </h1>
              <p className="text-gray-600">
                {showSettings ? "Manage your account settings" : "Manage your account and view your progress"}
              </p>
            </div>
            <div className="flex space-x-2">
              {!showSettings && (
                <>
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)} variant="outline">
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button onClick={handleSaveProfile} className="bg-green-600 hover:bg-green-700">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button onClick={handleCancelEdit} variant="outline">
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </>
              )}
              <Button 
                onClick={() => setShowSettings(!showSettings)} 
                variant={showSettings ? "default" : "outline"}
              >
                <Settings className="w-4 h-4 mr-2" />
                {showSettings ? "Back to Profile" : "Settings"}
              </Button>
            </div>
          </div>

          {showSettings ? (
            /* Settings Section */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Profile Image Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Camera className="w-5 h-5 mr-2" />
                    Profile Image
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar className="w-20 h-20">
                        <AvatarImage 
                          src={imagePreview || user.avatar} 
                          alt={user.name} 
                        />
                        <AvatarFallback className="text-lg">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <button
                        onClick={triggerFileInput}
                        className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                      >
                        <Camera className="w-3 h-3 text-white" />
                      </button>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-2">
                        Upload a new profile image. Supported formats: JPG, PNG, GIF. Max size: 5MB.
                      </p>
                      <div className="flex space-x-2">
                        <Button onClick={triggerFileInput} size="sm" variant="outline">
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Image
                        </Button>
                        {selectedImage && (
                          <>
                            <Button onClick={handleSaveImage} size="sm" className="bg-green-600 hover:bg-green-700">
                              <Save className="w-4 h-4 mr-2" />
                              Save
                            </Button>
                            <Button onClick={handleRemoveImage} size="sm" variant="outline">
                              <X className="w-4 h-4 mr-2" />
                              Cancel
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  {selectedImage && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm text-blue-800">
                        <strong>Selected:</strong> {selectedImage.name} ({(selectedImage.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Account Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={editForm.name} 
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={editForm.email} 
                      disabled
                      className="bg-gray-100 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed at this time</p>
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <textarea 
                      id="bio" 
                      className="w-full p-3 border border-gray-300 rounded-md resize-none"
                      rows={3}
                      value={editForm.bio} 
                      onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Password Change */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lock className="w-5 h-5 mr-2" />
                    Change Password
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input 
                        id="currentPassword" 
                        type={showPassword ? "text" : "password"}
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input 
                        id="newPassword" 
                        type={showNewPassword ? "text" : "password"}
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <div className="relative">
                      <Input 
                        id="confirmPassword" 
                        type={showConfirmPassword ? "text" : "password"}
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <Button onClick={handlePasswordChange} className="w-full">
                    Change Password
                  </Button>
                </CardContent>
              </Card>

              {/* Notification Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Notification Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-600">Receive email updates about your account</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                      className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Study Reminders</p>
                      <p className="text-sm text-gray-600">Get reminded to study your decks</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.studyReminders}
                      onChange={(e) => handleSettingChange('studyReminders', e.target.checked)}
                      className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Achievement Alerts</p>
                      <p className="text-sm text-gray-600">Get notified when you earn achievements</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.achievementAlerts}
                      onChange={(e) => handleSettingChange('achievementAlerts', e.target.checked)}
                      className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Privacy Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Privacy Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Public Profile</p>
                      <p className="text-sm text-gray-600">Allow others to view your profile</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.publicProfile}
                      onChange={(e) => handleSettingChange('publicProfile', e.target.checked)}
                      className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Delete Account */}
              <Card className="lg:col-span-2 border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-700">
                    <Trash2 className="w-5 h-5 mr-2" />
                    Delete Account
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-red-100 border border-red-300 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-red-800 mb-1">Warning: This action cannot be undone</h4>
                        <p className="text-sm text-red-700">
                          Deleting your account will permanently remove all your data, including:
                        </p>
                        <ul className="text-sm text-red-700 mt-2 space-y-1">
                          <li>• All your flashcard decks</li>
                          <li>• Study progress and statistics</li>
                          <li>• Achievements and badges</li>
                          <li>• Account settings and preferences</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {showDeleteConfirmation ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="deleteConfirmation" className="text-red-700">
                          Type "DELETE" to confirm
                        </Label>
                        <Input 
                          id="deleteConfirmation"
                          value={deleteConfirmation}
                          onChange={(e) => setDeleteConfirmation(e.target.value)}
                          placeholder="Type DELETE to confirm"
                          className="border-red-300 focus:border-red-500 focus:ring-red-500"
                        />
                      </div>
                      <div className="flex space-x-3">
                        <Button 
                          onClick={handleDeleteAccount}
                          disabled={deleteConfirmation !== "DELETE"}
                          className="bg-red-600 hover:bg-red-700 disabled:bg-red-300"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Permanently Delete Account
                        </Button>
                        <Button 
                          onClick={() => {
                            setShowDeleteConfirmation(false)
                            setDeleteConfirmation("")
                          }}
                          variant="outline"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => setShowDeleteConfirmation(true)}
                      variant="outline"
                      className="border-red-300 text-red-700 hover:bg-red-100"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete My Account
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            /* Profile Section */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="relative inline-block mb-4">
                        <Avatar className="w-24 h-24">
                          <AvatarImage 
                            src={imagePreview || user.avatar} 
                            alt={user.name} 
                          />
                          <AvatarFallback className="text-2xl">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {isEditing && (
                          <button
                            onClick={triggerEditFileInput}
                            className="absolute -bottom-1 -right-1 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors shadow-lg"
                          >
                            <Camera className="w-4 h-4 text-white" />
                          </button>
                        )}
                      </div>
                      {isEditing ? (
                        <div className="space-y-3">
                          <Input 
                            value={editForm.name}
                            onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                            className="text-center text-xl font-semibold"
                          />
                          <Input 
                            value={editForm.email}
                            disabled
                            className="text-center text-sm bg-gray-100 cursor-not-allowed"
                          />
                          <p className="text-xs text-gray-500">Email cannot be changed</p>
                        </div>
                      ) : (
                        <>
                          <h2 className="text-xl font-semibold mb-1">{user.name}</h2>
                          <p className="text-gray-600 text-sm mb-2">{user.email}</p>
                        </>
                      )}
                      <Badge variant="secondary" className="mb-3">
                        {user.level}
                      </Badge>
                      <p className="text-sm text-gray-600 mb-4">
                        Member since {user.joinDate}
                      </p>
                      {isEditing ? (
                        <textarea 
                          value={editForm.bio}
                          onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                          className="w-full p-2 text-sm text-gray-700 leading-relaxed border border-gray-300 rounded resize-none"
                          rows={3}
                        />
                      ) : (
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {user.bio}
                        </p>
                      )}
                      {isEditing && selectedImage && (
                        <div className="mt-4 space-y-2">
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p className="text-sm text-blue-800">
                              <strong>Selected:</strong> {selectedImage.name} ({(selectedImage.size / 1024 / 1024).toFixed(2)} MB)
                            </p>
                          </div>
                          <div className="flex space-x-2 justify-center">
                            <Button onClick={handleSaveImage} size="sm" className="bg-green-600 hover:bg-green-700">
                              <Save className="w-4 h-4 mr-2" />
                              Save Image
                            </Button>
                            <Button onClick={handleRemoveImage} size="sm" variant="outline">
                              <X className="w-4 h-4 mr-2" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                    <input
                      ref={editFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Stats and Activity */}
              <div className="lg:col-span-2 space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Clock className="w-5 h-5 text-orange-600" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{user.streak}</p>
                      <p className="text-xs text-gray-600">Day Streak</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{user.totalStudyTime}</p>
                      <p className="text-xs text-gray-600">Study Time</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Edit3 className="w-5 h-5 text-green-600" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{user.decksCreated}</p>
                      <p className="text-xs text-gray-600">Decks Created</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Star className="w-5 h-5 text-purple-600" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{user.averageScore}%</p>
                      <p className="text-xs text-gray-600">Avg Score</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                              activity.type === 'study' ? 'bg-blue-100' : 'bg-green-100'
                            }`}>
                              {activity.type === 'study' ? (
                                <BookOpen className="w-4 h-4 text-blue-600" />
                              ) : (
                                <Edit3 className="w-4 h-4 text-green-600" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{activity.title}</p>
                              <p className="text-sm text-gray-600">{activity.time}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            {activity.type === 'study' ? (
                              <Badge variant="secondary">{activity.score}%</Badge>
                            ) : (
                              <Badge variant="outline">{activity.cards} cards</Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Trophy className="w-5 h-5 mr-2" />
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 rounded-lg border-2 bg-green-50 border-green-200">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 bg-green-100">
                          <BookOpen className="w-6 h-6 text-green-600" />
                        </div>
                        <p className="text-sm font-medium text-green-800">First Deck</p>
                      </div>
                      
                      <div className="text-center p-4 rounded-lg border-2 bg-green-50 border-green-200">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 bg-green-100">
                          <Clock className="w-6 h-6 text-green-600" />
                        </div>
                        <p className="text-sm font-medium text-green-800">7-Day Streak</p>
                      </div>
                      
                      <div className="text-center p-4 rounded-lg border-2 bg-green-50 border-green-200">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 bg-green-100">
                          <Star className="w-6 h-6 text-green-600" />
                        </div>
                        <p className="text-sm font-medium text-green-800">Perfect Score</p>
                      </div>
                      
                      <div className="text-center p-4 rounded-lg border-2 bg-gray-50 border-gray-200">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 bg-gray-100">
                          <Trophy className="w-6 h-6 text-gray-400" />
                        </div>
                        <p className="text-sm font-medium text-gray-500">Study Master</p>
                      </div>
                      
                      <div className="text-center p-4 rounded-lg border-2 bg-green-50 border-green-200">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 bg-green-100">
                          <Edit3 className="w-6 h-6 text-green-600" />
                        </div>
                        <p className="text-sm font-medium text-green-800">Creator</p>
                      </div>
                      
                      <div className="text-center p-4 rounded-lg border-2 bg-gray-50 border-gray-200">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 bg-gray-100">
                          <Target className="w-6 h-6 text-gray-400" />
                        </div>
                        <p className="text-sm font-medium text-gray-500">Consistency</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
