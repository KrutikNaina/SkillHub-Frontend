// App.jsx
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

// Public Components
import Navbar from './components/Navbar'

// Landing Page Components
import Hero from './components/Hero'
import About from './components/About'
import Features from './components/Features'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'
import Login from './components/Login'

// Dashboard Pages (with their own layout/header)
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import ProgressLog from './pages/ProgressLog'
import EditProfile from './pages/EditProfile'
import Milestones from './pages/Milestones'
import SkillRepository from './pages/SkillRepository'
import AddSkillModal from './pages/AddSkillModal'
import SkillDetails from './pages/SkillDetails'
import AddMilestone from "./pages/AddMilestone"; 
import Feed from "./pages/Feed"; 


function AppWrapper() {
  const [isLoggedIn] = useState(true)
  const location = useLocation()

  // All dashboard-related paths (that use their own layout/header)

  const isCustomDashboardLayout = /^\/(dashboard|profile|progress-log|feed|repository|milestones|skill-repository|skills|edit-profile|add-skillModal)/.test(
    location.pathname
  )

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-gray-800 font-sans">
      {/* Show public navbar only on non-dashboard pages and non-login */}
      {!isCustomDashboardLayout && location.pathname !== '/login' && (
        <Navbar isLoggedIn={isLoggedIn} />
      )}

      <Routes>
        {/* Public landing page */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
              <Features />
              <Testimonials />
              <CTA />
              <Footer />
            </>
          }
        />

        <Route path="/login" element={<Login />} />

        {/* Dashboard Pages with their own layout/header */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/progress-log" element={<ProgressLog />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/milestones" element={<Milestones />} />
        <Route path="/skill-repository" element={<SkillRepository />} />
        <Route path="/skills/:id" element={<SkillDetails />} />
        <Route path="/add-skillModal" element={<AddSkillModal />} />
        <Route path="/add-milestone" element={<AddMilestone />} />
        <Route path="/feed" element={< Feed />} />

      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  )
}
