import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import WelcomePage from './pages/WelcomePage.jsx'
import ChildProfilePage from './pages/ChildProfilePage.jsx'
import HomeDashboard from './pages/HomeDashboard.jsx'

import ABCWorldPage from './pages/abc-world/ABCWorldPage.jsx'
import NumberKingdomPage from './pages/number-kingdom/NumberKingdomPage.jsx'
import ColorGardenPage from './pages/color-garden/ColorGardenPage.jsx'
import AnimalSafariPage from './pages/animal-safari/AnimalSafariPage.jsx'
import ShapeAdventurePage from './pages/shape-adventure/ShapeAdventurePage.jsx'

import VoiceLearningPage from './pages/voice-learning/VoiceLearningPage.jsx'
import RewardsAchievementsPage from './pages/rewards/RewardsAchievementsPage.jsx'
import ParentDashboardPage from './pages/parent-dashboard/ParentDashboardPage.jsx'
import SettingsPage from './pages/settings/SettingsPage.jsx'

// Mini Games - reference the HomeDashboard for the mini-games route,
// since there's no single MiniGamesWorld component
// The individual games are accessible through the Home Dashboard

// Global CSS
import './styles/globals.css';

// Application routes
const router = createBrowserRouter([
  {
    path: '/',
  element: <HomeDashboard />
  },
  {
    path: '/welcome',
    element: <WelcomePage />,
  },
  {
    path: '/child-profile',
    element: <ChildProfilePage />,
  },
  {
    path: '/home',
    element: <HomeDashboard />,
  },
  {
    path: '/abc-world',
    element: <ABCWorldPage />,
  },
  {
    path: '/number-kingdom',
    element: <NumberKingdomPage />,
  },
  {
    path: '/color-garden',
    element: <ColorGardenPage />,
  },
  {
    path: '/animal-safari',
    element: <AnimalSafariPage />,
  },
  {
    path: '/shape-adventure',
    element: <ShapeAdventurePage />,
  },
  {
    path: '/voice-learning',
    element: <VoiceLearningPage />,
  },
  {
    path: '/rewards',
    element: <RewardsAchievementsPage />,
  },
  {
    path: '/parent-dashboard',
    element: <ParentDashboardPage />,
  },
  {
    path: '/settings',
    element: <SettingsPage />,
  },
  {
    path: '/mini-games',
    element: <HomeDashboard />,
  },
]);

// Render React application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);