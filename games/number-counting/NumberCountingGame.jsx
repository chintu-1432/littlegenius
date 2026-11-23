import React, { useState } from 'react'
import { useMascot } from '../../components/mascot/useMascot'
import { FunkyButton } from '../../components/buttons/FunkyButton'

const NumberCountingGame = () => {
  const { celebrate } = useMascot()
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [gameOver, setGameOver] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const maxNumbers = level * 5 + 5
  const [currentNumber, setCurrentNumber] = useState(Math.floor(Math.random() * maxNumbers) + 1)
  const [answer, setAnswer] = useState('')

  const handleInputChange = (e) => {
    setAnswer(e.target.value)
  }

  const checkAnswer = () => {
    const numAnswer = parseInt(answer)
    if (numAnswer === currentNumber) {
      setScore(prev => prev + level * 10)
      celebrate()
      setLevel(prev => Math.min(prev + 1, 10))
      setTimeout(() => {
        setCurrentNumber(Math.floor(Math.random() * (setLevel * 5 + 5)) + 1)
        setAnswer('')
      }, 1500)
    } else {
      setGameOver(true)
      setTimeout(() => setGameOver(false), 2000)
    }
  }

  const restartGame = () => {
    setScore(0)
    setLevel(1)
    setGameOver(false)
    setShowResult(false)
    setCurrentNumber(Math.floor(Math.random() * 10) + 1)
    setAnswer('')
  }

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
            Number Counting • Score: {score} • Level: {level}
          </span>
        </div>
      </nav>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <EducationalCard
              title="🔢 Number Counting"
              description="Type the number you see and earn points"
              style={{ borderColor: '#55C7F2' }}
            >
              <div
                style={{
                  textAlign: 'center',
                  padding: '3rem 1rem',
                  margin: '2rem 0',
                  background: 'linear-gradient(135deg, #55C7F220, transparent)',
                  borderRadius: '20px',
                  minHeight: '150px',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Fredoka', cursive",
                    fontSize: '8rem',
                    color: '#55C7F2',
                  }}
                >
                  {currentNumber}
                </span>
              </div>

              <p
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  color: '#555',
                  textAlign: 'center',
                  margin: '0.5rem 0',
                }}
              >
                How many objects? Type the number above:
              </p>

              <div className="d-flex gap-2 justify-content-center">
                <input
                  type="number"
                  value={answer}
                  onChange={handleInputChange}
                  className="form-control"
                  style={{
                    width: '100px',
                    fontFamily: "'Fredoka', cursive",
                    fontSize: '1.5rem',
                    textAlign: 'center',
                  }}
                  min="0"
                  max={maxNumbers}
                />
                <FunkyButton
                  onClick={checkAnswer}
                  style={{ minWidth: '80px' }}
                >
                  Check
                </FunkyButton>
              </div>

              {/* Result display */}
              {showResult && (
                <div className="mt-4 p-3 rounded" style={{
                  background: gameOver ? '#FF83B520' : '#70DDB020',
                  border: gameOver ? '1px solid #FF83B5' : '1px solid #70DDB0'
                }}>
                  {gameOver ? (
                    <p
                      style={{
                        fontFamily: "'Nunito', sans-serif",
                        color: '#FF83B5',
                        margin: '0',
                      }}
                    >
                      Game Over! Final score: {score}.
                    </p>
                  ) : (
                    <p
                      style={{
                        fontFamily: "'Nunito', sans-serif",
                        color: '#70DDB0',
                        margin: '0',
                      }}
                    >
                      Correct! +{level * 10} points
                    </p>
                  )}
                </div>
              )}

              <small
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  color: '#666',
                  display: 'block',
                  marginTop: '1rem',
                }}
              >
                Levels: Each 10 points = +1 level
              </small>
            </EducationalCard>
          </div>
        </div>
      </div>

      <div className="mt-5 text-center">
        <FunkyButton
          onClick={restartGame}
          style={{ width: '150px' }}
        >
          Play Again
        </FunkyButton>
      </div>
    </div>
  )
}

export default NumberCountingGame