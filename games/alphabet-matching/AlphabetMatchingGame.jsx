import React, { useState } from 'react'
import { useMascot } from '../../components/mascot/useMascot'
import { FunkyButton } from '../../components/buttons/FunkyButton'

const AlphabetMatchingGame = () => {
  const { celebrate } = useMascot()
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [gameOver, setGameOver] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [correctStreak, setCorrectStreak] = useState(0)

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const [currentLetter, setCurrentLetter] = useState(letters[Math.floor(Math.random() * letters.length)])
  const [options, setOptions] = useState([])

  // Generate options for matching
  const generateOptions = () => {
    const correctIndex = Math.floor(Math.random() * 4)
    const allLetters = letters.split('')

    const options = allLetters.map((letter, index) => ({
      letter,
      isCorrect: index === correctIndex,
    }))

    // Shuffle
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[options[i], options[j]] = [options[j], options[i]]
    }

    setOptions(options)
  }

  // Start new round
  const newRound = () => {
    setCurrentLetter(letters[Math.floor(Math.random() * letters.length)])
    setCorrectStreak(0)
    generateOptions()
  }

  const handleSelection = (letter) => {
    const option = options.find(o => o.letter === letter)
    if (option && option.isCorrect) {
      setScore(prev => prev + 10 * level)
      setCorrectStreak(prev => prev + 1)
      levelUp()
      celebrate()
    } else {
      setCorrectStreak(0)
      if (correctStreak >= 3) {
        setLevel(prev => Math.min(prev + 1, 5))
      }
      setGameOver(true)
    }
    setShowResult(true)
  }

  const levelUp = () => {
    setLevel(prev => Math.min(prev + 1, 5))
    setTimeout(newRound, 1000)
  }

  const restartGame = () => {
    setScore(0)
    setLevel(1)
    setGameOver(false)
    setShowResult(false)
    newRound()
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
            Alphabet Matching • Score: {score} • Level: {level}
          </span>
        </div>
      </nav>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <EducationalCard
              title="🔤 Alphabet Matching"
              description="Match the uppercase letter with its lowercase pair"
              style={{ borderColor: '#8057E5' }}
            >
              <div
                style={{
                  textAlign: 'center',
                  padding: '2rem 1rem',
                  margin: '2rem 0',
                  background: 'linear-gradient(135deg, #8057E520, transparent)',
                  borderRadius: '15px',
                  minHeight: '120px',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Fredoka', cursive",
                    fontSize: '6rem',
                    color: '#8057E5',
                  }}
                >
                  {currentLetter}
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
                Find the matching letter:
              </p>

              {/* Letter options */}
              <div className="d-flex gap-2 flex-wrap justify-content-center mb-3">
                {options.map(opt => (
                  <FunkyButton
                    key={opt.letter}
                    onClick={() => handleSelection(opt.letter)}
                    style={{ flex: 1, minWidth: '50px', fontSize: '1rem' }}
                  >
                    {opt.letter}
                  </FunkyButton>
                ))}
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
                      Game Over! You scored {score} points.
                    </p>
                  ) : (
                    <p
                      style={{
        fontFamily: "'Nunito', sans-serif",
                        color: '#70DDB0',
                        margin: '0',
                      }}
                    >
                      Correct! +10 points
                    </p>
                  )}
                </div>
              )}

              {/* Controls */}
              <div className="mt-4">
                {!gameOver && !showResult && (
                  <FunkyButton
                    onClick={newRound}
                    style={{ width: '150px' }}
                  >
                    Start New Round
                  </FunkyButton>
                )}
                {gameOver || showResult && (
                  <FunkyButton
                    onClick={restartGame}
                    style={{ width: '150px', marginTop: '0.5rem' }}
                  >
                    Play Again
                  </FunkyButton>
                )}
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
          Match uppercase letters to earn points!
        </small>
      </div>
    </div>
  )
}

export default AlphabetMatchingGame