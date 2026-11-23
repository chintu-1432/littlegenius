import React, { useState } from 'react'
import { useMascot } from '../../components/mascot/useMascot'
import { FunkyButton } from '../../components/buttons/FunkyButton'

const MemoryCardMatchingGame = () => {
  const { celebrate } = useMascot()
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [gameOver, setGameOver] = useState(false)
  const [showCards, setShowCards] = useState(false)
  const [firstCard, setFirstCard] = useState(null)
  const [matchedPairs, setMatchedPairs] = useState(0)

  const symbols = ['🐱', '🐶', '🐭', '🐰', '🐸', '🐹', '🐻', '🐼', '🐨', '🐧']
  const cardSymbols = [...symbols, ...symbols].sort(() => Math.random() - 0.5)
  const activeCards = cardSymbols.slice(0, level * 2 + 4)

  const handleCardClick = (symbol) => {
    if (gameOver || showCards && firstCard && firstCard === symbol) return

    setShowCards(prev => !prev)

    if (!firstCard) {
      setFirstCard(symbol)
    } else if (firstCard !== symbol) {
      if (firstCard === symbol) {
        setMatchedPairs(prev => prev + 1)
        setScore(prev => prev + 10 * level)
        celebrate()
        setTimeout(() => {
          setShowCards(false)
          setFirstCard(null)
        }, 500)
      } else {
        // Wrong match - hide after short time
        setTimeout(() => {
          setShowCards(false)
          setFirstCard(null)
        }, 1000)
      }
    }
  }

  const levelUp = () => {
    setLevel(prev => Math.min(prev + 1, 5))
  }

  const restartGame = () => {
    setScore(0)
    setLevel(1)
    setGameOver(false)
    setShowCards(false)
    setMatchedPairs(0)
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
            Memory Match • Score: {score} • Level: {level} • Pairs: {matchedPairs}
          </span>
        </div>
      </nav>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <EducationalCard
              title="🧩 Memory Card Matching"
              description="Match pairs of identical cards"
              style={{ borderColor: '#70DDB0' }}
            >
              <p
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  color: '#555',
                  textAlign: 'center',
                  margin: '1rem 0',
                }}
              >
                Find the matching pairs!
              </p>

              {/* Game info */}
              <small
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  color: '#666',
                  marginBottom: '1rem',
                }}
              >
                Level {level}: {matchedPairs} of {level * 2 + 2} pairs found
              </small>

              {/* Cards grid */}
              <div className="d-flex flex-wrap gap-2 justify-content-center">
                {activeCards.map((symbol, index) => (
                  <FunkyButton
                    key={index}
                    onClick={() => handleCardClick(symbol)}
                    style={{
                      width: '60px',
                      height: '60px',
                      fontSize: '2rem',
                      background: showCards ? 'white' : '#e9ecef',
                      color: showCards ? '#333' : '#666',
                      borderRadius: '8px',
                    }}
                  >
                    {showCards || index < 2 ? symbol : '?'}
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
                Click two matching cards to score points!
              </small>
            </EducationalCard>
          </div>
        </div>
      </div>

      <div className="mt-5 text-center">
        <FunkyButton
          onClick=() => { if (!gameOver) levelUp() }
          style={{ width: '150px' }}
        >
          Next Level
        </FunkyButton>
      </div>
    </div>
  )
}

export default MemoryCardMatchingGame