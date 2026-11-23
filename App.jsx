import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useMascot } from './components/mascot/useMascot'
import { SidebarLayout } from './components/layout/Sidebar'
import { FunkyButton } from './components/buttons/FunkyButton'
import { EducationalCard } from './components/cards/EducationalCard'

function App() {
  const { greet, celebrate } = useMascot()

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif" }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-gradient">
        <div className="container-fluid">
          <NavLink to="/welcome" className="navbar-brand">
            <span style={{ fontFamily: "'Fredoka', cursive", fontSize: '1.5rem' }}>
              🧠 LITTLE GENIUS
            </span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarnav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink to="/home" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/abc-world" className="nav-link">
                  ABC World
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/number-kingdom" className="nav-link">
                  Number Kingdom
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/color-garden" className="nav-link">
                  Color Garden
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/animal-safari" className="nav-link">
                  Animal Safari
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/shape-adventure" className="nav-link">
                  Shape Adventure
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/mini-games" className="nav-link">
                  Mini Games
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/voice-learning" className="nav-link">
                  Voice Learning
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/rewards" className="nav-link">
                  Rewards
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/parent-dashboard" className="nav-link">
                  Parent
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/settings" className="nav-link">
                  Settings
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="py-4">
        <Container>
          <Row>
            <Col md="9" lg="8">
              <h1
                style={{
                  fontFamily: "'Fredoka', cursive",
                  color: '#8057E5',
                  textAlign: 'center',
                  marginBottom: '1.5rem',
                }}
              >
                 Welcome to Little Genius! 🧠
              </h1>
            </Col>
            <Col md="3" lg="2">
              <div
                style={{
                  textAlign: 'center',
                  padding: '1rem',
                  background: 'rgba(128, 87, 229, 0.1)',
                  borderRadius: '12px',
                  marginTop: '1rem',
                }}
              >
                <small
                  style={{
                    color: '#55C7F2',
                    fontFamily: "'Nunito', sans-serif",
                  }}
                >
                  Stars: {localStorage.getItem('stars') || 0}
                </small>
              </div>
            </Col>
          </Row>
        </Container>
      </main>

      <footer className="mt-auto py-3 bg-light">
        <div className="container-fluid">
          <small
            style={{
              textAlign: 'center',
              color: '#666',
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            © {new Date().getFullYear()} LITTLE GENIUS – AI Learning World
          </small>
        </div>
      </footer>
    </div>
  )
}

export default App