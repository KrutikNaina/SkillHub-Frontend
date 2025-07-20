// App.jsx
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

import Navbar from './components/Navbar'
import DashboardNavbar from './components/DashboardNavbar'

// Landing Page Components
import Hero from './components/Hero'
import About from './components/About'
import Features from './components/Features'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'
import Login from './components/Login'


// Pages
import Profile from './pages/Profile'
import ProgressLog from './pages/ProgressLog'
import EditProfile from './pages/EditProfile'
import Milestones from './pages/Milestones'
import SkillRepository from './pages/SkillRepository'
import AddSkillModal from './pages/AddSkillModal'

function AppWrapper() {
  const [isLoggedIn] = useState(true)
  const location = useLocation()

  const isDashboardPage = ['/profile', '/logs', '/repository', '/milestones', 'skill-repository'].includes(location.pathname)

  
  return (
    <>
      <div className="min-h-screen bg-[#f4f6fa] text-gray-800 font-sans">

        {isDashboardPage ? (
          <DashboardNavbar />
        ) : location.pathname !== '/login' ? (
          <Navbar isLoggedIn={isLoggedIn} />
        ) : null}

        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Features />
              <Testimonials />
              <CTA />
              <Footer />
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logs" element={<ProgressLog />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/milestones" element={<Milestones />} />
          <Route path="/skill-repository" element={<SkillRepository />} />
          <Route path="/add-skillModal" element={<AddSkillModal />} />


        </Routes>
      </div>
    </>
  )
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  )
}


