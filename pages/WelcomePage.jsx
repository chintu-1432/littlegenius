
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FunkyButton } from '../components/buttons/FunkyButton'
import { EducationalCard } from '../components/cards/EducationalCard'

const WelcomePage = () => {
  const navigate = useNavigate()

  const learningWorlds = [
    {
      title: '🔤 ABC World',
      description: 'Learn letters A-Z with pronunciation, tracing, and quizzes.',
      icon: '🔤',
      color: '#8057E5',
      path: '/abc-world',
    },
    {
      title: '🔢 Number Kingdom',
      description: 'Count from 1-100 with fun games and activities.',
      icon: '🔢',
      color: '#55C7F2',
      path: '/number-kingdom',
    },
    {
      title: '🎨 Color Garden',
      description: 'Discover beautiful colors and learn color mixing.',
      icon: '🎨',
      color: '#FFD95A',
      path: '/color-garden',
    },
  ]

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        padding: '2rem',
      }}
    >
      <div className="text-center py-5">
        <h1
          style={{
            fontFamily: "'Fredoka', cursive",
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            background: 'linear-gradient(135deg, #8057E5, #55C7F2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem',
          }}
        >
          Welcome to LITTLE GENIUS! 🧠
        </h1>

        <p
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: '1.25rem',
            color: '#555',
            maxWidth: '650px',
            margin: '0 auto',
          }}
        >
          A magical learning playground where children explore alphabets,
          numbers, colors, animals, and shapes through games, animations,
          and voice interactions.
        </p>
      </div>

      <div className="container mt-5">
        <div className="row g-4 justify-content-center">
          {learningWorlds.map((world) => (
            <div className="col-md-6 col-lg-4" key={world.path}>
              <EducationalCard
                title={world.title}
                description={world.description}
                icon={
                  <span style={{ fontSize: '3rem' }}>
                    {world.icon}
                  </span>
                }
                style={{
                  border: `2px solid ${world.color}`,
                  background: '#ffffff',
                  minHeight: '300px',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                }}
              />

              <div className="text-center">
                <FunkyButton
                  onClick={() => navigate(world.path)}
                  style={{
                    marginTop: '0.5rem',
                    background: world.color,
                    color: '#ffffff',
                  }}
                >
                  Start Learning →
                </FunkyButton>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 text-center">
        <small
          style={{
            color: '#666',
            fontFamily: "'Nunito', sans-serif",
          }}
        >
          Select a learning world above to begin your adventure! ✨
        </small>
      </div>
    </div>
  )
}

export default WelcomePage
