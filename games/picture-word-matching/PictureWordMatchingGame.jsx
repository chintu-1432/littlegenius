import React, { useState } from 'react'
import { useMascot } from '../../components/mascot/useMascot'
import { FunkyButton } from '../../components/buttons/FunkyButton'

const PictureWordMatchingGame = () => {
  const { celebrate } = useMascot()
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [gameOver, setGameOver] = useState(false)

  const wordsAndPictures = [
    { word: 'Apple', picture: '🍎', category: 'Food' },
    { word: 'Ball', picture: '⚽', category: 'Toy' },
    { word: 'Cat', picture: '🐱', category: 'Animal' },
    { word: 'Dog', picture: '🐶', category: 'Animal' },
    { word: 'Sun', picture: '☀️', category: 'Nature' },
    { word: 'Tree', picture: '🌳', category: 'Nature' },
    { word: 'Bird', picture: '🐦', category: 'Animal' },
    { word: 'Fish', picture: '🐟', category: 'Animal' },
  ]

  const [currentSet, setCurrentSet] = useState(() => generateRound())

  const generateRound = () => {
    const item = wordsAndPictures[Math.floor(Math.random() * wordsAndPictures.length)]
    const allWords = wordsAndPictures.map(w => w.word)
    const correctIndex = Math.floor(Math.random() * allWords.length)

    const options = allWords.map(w => ({
      word: w,
      isCorrect: w === item.word,
    }))

    // Shuffle
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[options[i], options[j]] = [options[j], options[i]]
    }

    return { item, options }
  }

  const newRound = () => {
    setCurrentSet(generateRound())
    setScore(0)
    setLevel(1)
    setGameOver(false)
  }

  const handleWordSelect = (word) => {
    const { item, options } = currentSet
    const selectedOption = options.find(o => o.word === word)

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
            Picture & Word • Score: {score} • Level: {level}
          </span>
        </div>
      </nav>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <EducationalCard
              title="📸 Picture & Word Matching"
              description="Match the word to the correct picture"
              style={{ borderColor: '#FF83B5' }}
            >
              <p
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  color: '#555',
                  textAlign: 'center',
                  margin: '1rem 0',
                }}
              >
                Match the word to the picture:
              </p>

              {/* Picture */}
              <div
                style={{
                  textAlign: 'center',
                  margin: '2rem 0',
                }}
              >
                <span
                  style={{
                    fontSize: '4rem',
                  }}
                >
                  {currentSet.item.picture}
                </span>
              </div>

              {/* Word options */}
              <div className="d-flex gap-2 flex-wrap justify-content-center">
                {options.map(opt => (
                  <FunkyButton
                    key={opt.word}
                    onClick={() => handleWordSelect(opt.word)}
                    style={{ flex: 1, minWidth: '80px', fontSize: '0.875rem' }}
                  >
                    {opt.word}
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

export default PictureWordMatchingGame