import React, { useState } from 'react'
import { useMascot } from '../../components/mascot/useMascot'
import { FunkyButton } from '../../components/buttons/FunkyButton'

const FindMissingLetterGame = () => {
  const { celebrate } = useMascot()
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [gameOver, setGameOver] = useState(false)

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const [currentSet, setCurrentSet] = useState(() => generateMissingLetterSet())

  const generateMissingLetterSet = () => {
    const fullAlphabet = alphabet.split('')
    const missingIndex = Math.floor(Math.random() * fullAlphabet.length)
    const missingLetter = fullAlphabet[missingIndex]

    const presentLetters = fullAlphabet
      .filter((_, i) => i !== missingIndex)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)

    return {
      missingLetter,
      options: [...presentLetters, missingLetter].sort(() => Math.random() - 0.5),
    }
  }

  const newRound = () => {
    setCurrentSet(generateMissingLetterSet())
    setScore(0)
    setLevel(1)
    setGameOver(false)
  }

  const handleLetterSelect = (letter) => {
    const { missingLetter, options } = currentSet
    const correctOption = options.find(o => o === missingLetter)

    if (letter === missingLetter) {
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
    <div style={{ minHeight: '100vh', padding: '2rem', background: 'linear-gradient(180deg, #f0f4f8 0%, #e8f0f7 100%)' }}>
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
            Find Missing Letter • Score: {score} • Level: {level}
          </span>
        </div>
      </nav>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <EducationalCard
              title="🔠 Find Missing Letter"
              description="Identify the missing letter in the sequence"
              style={{ borderColor: '#8057E5' }}
            >
              <p
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  color: '#555',
                  textAlign: 'center',
                  margin: '1rem 0',
                }}
              >
                Which letter is missing?
              </p>

              {/* Letters display */}
              <div className="d-flex gap-2 flex-wrap justify-content-center">
                {currentSet.options.map((letter, index) => (
                  <FunkyButton
                    key={index}
                    onClick={() => handleLetterSelect(letter)}
                    style={{ flex: 1, minWidth: '50px', fontSize: '1.25rem' }}
                  >
                    {letter}
                  </FunkyButton>
                ))}
              </div>

              <div
                style={{
                  marginTop: '2rem',
                  padding: '1rem',
                  background: 'linear-gradient(135deg, #8057E520, transparent)',
                  borderRadius: '10px',
                  minHeight: '60px',
                  textAlign: 'center',
                }}
              >
                _ {currentSet.missingLetter}
              </div>

              <small
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  color: '#666',
                  display: 'block',
                  marginTop: '1rem',
                }}
              >
                Level {level}: Each correct answer = 10 points
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
          New Game
        </FunkyButton>
      </div>
    </div>
  )
}

export default FindMissingLetterGame