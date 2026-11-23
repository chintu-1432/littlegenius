import React, { useState } from 'react'
import { useMascot } from '../../components/mascot/useMascot'
import { FunkyButton } from '../../components/buttons/FunkyButton'

const ColorMatchingGame = () => {
  const { celebrate } = useMascot()
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [gameOver, setGameOver] = useState(false)

  const colors = [
    { name: 'Red', hex: '#FF4444' },
    { name: 'Blue', hex: '#3B5998' },
    { name: 'Yellow', hex: '#FCE883' },
    { name: 'Green', hex: '#4CAF50' },
    { name: 'Purple', hex: '#8057E5' },
    { name: 'Orange', hex: '#FF8C00' },
  ]

  const [currentColor, setCurrentColor] = useState(colors[Math.floor(Math.random() * colors.length)])
  const [options, setOptions] = useState([])

  const generateOptions = () => {
    const correctIndex = Math.floor(Math.random() * colors.length)
    const allOptions = colors.map(color => ({
      name: color.name,
      hex: color.hex,
      isCorrect: false,
    }))

    // Set correct option
    allOptions[correctIndex].isCorrect = true

    // Shuffle
    for (let i = allOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]]
    }

    setOptions(allOptions)
  }

  const newRound = () => {
    setCurrentColor(colors[Math.floor(Math.random() * colors.length)])
    setScore(0)
    setLevel(1)
    generateOptions()
  }

  const handleColorSelect = (selectedName) => {
    const selectedOption = options.find(o => o.name === selectedName)
    if (selectedOption && selectedOption.isCorrect) {
      setScore(prev => prev + 10 * level)
      levelUp()
      celebrate()
    } else {
      setGameOver(true)
    }
    setTimeout(newRound, 1500)
  }

  const levelUp = () => {
    setLevel(prev => Math.min(prev + 1, 5))
  }

  return (
    <div style={{ minHeight: '100vh', padding: '2rem', background: 'linear-gradient(180deg, #fffdf5 0%, #f0f4f8 100%)' }}>
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
            Color Matching • Score: {score} • Level: {level}
          </span>
        </div>
      </nav>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <EducationalCard
              title="🎨 Color Matching"
              description="Match the color name to its correct color"
              style={{ borderColor: '#FFD95A' }}
            >
              <div
                style={{
                  width: '120px',
                  height: '80px',
                  margin: '2rem auto',
                  backgroundColor: currentColor.hex,
                  borderRadius: '8px',
                }}
              />

              <p
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  color: '#555',
                  textAlign: 'center',
                  margin: '0.5rem 0',
                }}
              >
                Match the color:
              </p>

              {/* Color options */}
              <div className="d-flex gap-2 flex-wrap justify-content-center">
                {options.map(opt => (
                  <FunkyButton
                    key={opt.name}
                    onClick={() => handleColorSelect(opt.name)}
                    style={{ flex: 1, minWidth: '70px', fontSize: '0.875rem' }}
                  >
                    {opt.name}
                  </FunkyButton>
                ))}
              </div>

              <small
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  color: '#666',
                  display: 'block',
                  marginTop: '1rem',
                }}
              >
                Level {level}: Each correct match = 10 points
              </small>
            </EducationalCard>
          </div>
        </div>
      </div>

      <div className="mt-5 text-center">
        <FunkyButton
          onClick=newRound
          style={{ width: '150px' }}
        >
          New Round
        </FunkyButton>
      </div>
    </div>
  )
}

export default ColorMatchingGame