import React, { useState } from 'react'
import { useMascot } from '../../components/mascot/useMascot'
import { FunkyButton } from '../../components/buttons/FunkyButton'

const JigsawPuzzleGame = () => {
  const { celebrate } = useMascot()
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [gameOver, setGameOver] = useState(false)
  const [pieces, setPieces] = useState([])
  const [dropped, setDropped] = useState(0)

  const shapes = [
    '🔵 Circle', '🟢 Square', '🟡 Triangle', '🟣 Rectangle',
    '⭐ Star', '❤️ Heart', '🟠 Oval', '🟦 Diamond'
  ]

  const initializePieces = (shapeName) => {
    const numPieces = level + 3
    const pieceTypes = Array.from({ length: numPieces }, (_, i) => i % shapes.length)
    const pieces = pieceTypes.map(type => ({
      id: i,
      type,
      x: Math.random(),
      y: Math.random(),
      isCorrect: Math.random() > 0.3,
    }))
    setPieces(pieces)
  }

  const handlePieceDrop = (pieceId) => {
    const piece = pieces.find(p => p.id === pieceId)
    if (piece) {
      setDropped(prev => prev + 1)
      if (piece.isCorrect) {
        setScore(prev => prev + 10 * level)
        celebrate()
        setTimeout(() => {
          initializePieces()
          setDropped(0)
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
    setDropped(0)
    initializePieces('Jigsaw')
  }

  // Initialize on mount
  useState(() => initializePieces('Jigsaw'))

  return (
    <div style={{ minHeight: '100vh', padding: '2rem', background: 'linear-gradient(180deg, #f5f7fa 0%, #e4e8f0 100%)' }}>
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
            Jigsaw Puzzle • Score: {score} • Level: {level}
          </span>
        </div>
      </nav>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <EducationalCard
              title="🧩 Jigsaw Puzzle"
              description="Place puzzle pieces in the correct position"
              style={{ borderColor: '#FF976B' }}
            >
              <p
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  color: '#555',
                  textAlign: 'center',
                  margin: '1rem 0',
                }}
              >
                Drag pieces to complete the picture
              </p>

              {/* Score and level info */}
              <small
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  color: '#666',
                  marginBottom: '1rem',
                }}
              >
                Level {level}: Each correct placement = 10 points
              </small>

              {/* Puzzle pieces */}
              <div className="d-flex flex-wrap gap-2 justify-content-center">
                {pieces.map((piece) => (
                  <FunkyButton
                    key={piece.id}
                    onClick={() => handlePieceDrop(piece.id)}
                    style={{
                      width: '50px',
                      height: '50px',
                      fontSize: '1.5rem',
                      background: piece.isCorrect ? '#70DDB0' : '#e9ecef',
                      color: piece.isCorrect ? 'white' : '#333',
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}
                  >
                    {piece.isCorrect ? '✓' : '?'}
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
                {dropped} pieces placed correctly
              </small>
            </EducationalCard>
          </div>
        </div>
      </div>

      <div className="mt-5 text-center">
        <FunkyButton
          onClick=restartGame
          style={{ width: '150px' }}
        >
          New Puzzle
        </FunkyButton>
      </div>
    </div>
  )
}

export default JigsawPuzzleGame