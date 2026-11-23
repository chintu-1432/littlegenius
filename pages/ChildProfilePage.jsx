import React from 'react'
import { useMascot } from '../components/mascot/useMascot'
import { FunkyButton } from '../components/buttons/FunkyButton'
import { EducationalCard } from '../components/cards/EducationalCard'

const ChildProfilePage = () => {
  const { greet, celebrate } = useMascot()

  const profiles = [
    { name: 'Alice', age: '5', favorite: 'ABC World' },
    { name: 'Ben', age: '4', favorite: 'Number Kingdom' },
    { name: 'Cara', age: '6', favorite: 'Color Garden' },
    { name: 'Dan', age: '3', favorite: 'Animal Safari' },
    { name: 'Eva', age: '5', favorite: 'Shape Adventure' },
  ]

  return (
    <div style={{ minHeight: '100vh', padding: '2rem', background: 'linear-gradient(180deg, #f0f4f8 0%, #e4e8f0 100%)' }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-gradient mb-4">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand">
            <span style={{ fontFamily: "'Fredoka', cursive", fontSize: '1.25rem' }}>
              ← Back Home
            </span>
          </NavLink>
          <span
            style={{
              fontFamily: "'Nunito', sans-serif",
              color: '#666',
              fontSize: '0.875rem',
            }}
          >
            Child Profile Selection
          </span>
        </div>
      </nav>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <EducationalCard
              title="👨‍👩‍👧 Child Profile"
              description="Select a child profile to continue learning"
              style={{ borderColor: '#8057E5' }}
            >
              <p
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  color: '#555',
                  textAlign: 'center',
                  margin: '1.5rem 0',
                }}
              >
                Select a child below to personalize their learning journey:
              </p>

              <div className="d-flex flex-wrap gap-3 justify-content-center">
                {profiles.map((profile, index) => (
                  <EducationalCard
                    key={index}
                    style={{
                      padding: '1rem',
                      margin: '0.5rem 0',
                      background: 'rgba(128, 87, 229, 0.1)',
                      border: '1px solid #8057E5',
                      borderRadius: '10px',
                      textAlign: 'center',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Fredoka', cursive",
                        fontSize: '1.5rem',
                        color: '#8057E5',
                        display: 'block',
                        marginBottom: '0.5rem',
                    }}
                    >
                      {profile.name}
                    </span>
                    <small
                      style={{
                        fontFamily: "'Nunito', sans-serif",
                        color: '#666',
                        fontSize: '0.875rem',
                      }}
                    >
                      Age: {profile.age} • Favorite: {profile.favorite}
                    </small>
                    <FunkyButton
                      style={{
                        width: '100%',
                        marginTop: '0.5rem',
                        background: '#55C7F2',
                        color: 'white',
                      }}
                    >
                      Select
                    </FunkyButton>
                  </EducationalCard>
                ))}
              </div>
            </EducationalCard>
          </div>
        </div>
      </div>

      <div className="mt-5 text-center">
        <small
          style={{
            color: '#666',
            fontFamily: "'Nunito', sans-serif",
          }}
        >
          Choose a profile to begin your personalized learning adventure!
        </small>
      </div>
    </div>
  )
}

export default ChildProfilePage