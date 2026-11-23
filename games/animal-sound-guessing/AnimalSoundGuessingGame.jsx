import React, { useState } from 'react'
import { useMascot } from '../../components/mascot/useMascot'
import { FunkyButton } from '../../components/buttons/FunkyButton'

const AnimalSoundGuessingGame = () => {
  const { celebrate } = useMascot()
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [gameOver, setGameOver] = useState(false)

  const animals = [
    { name: 'Cow', sound: 'Moo', illustration: '🐄', category: 'Farm' },
    { name: 'Lion', sound: 'Roar', illustration: '🦁', category: 'Wild' },
    { name: 'Elephant', sound: 'Trumpet', illustration: '🐘', category: 'Wild' },
    { name: 'Dolphin', sound: 'Click', illustration: '🐬', category: 'Sea' },
    { name: 'Dog', sound: 'Woof', illustration: '🐶', category: 'Pets' },
    { name: 'Cat', sound: 'Meow', illustration: '🐱', category: 'Pets' },
  ]

  const [currentAnimal, setCurrentAnimal] = useState(animals[Math.floor(Math.random() * animals.length)])
  const [options, setOptions] = useState([])

  const generateOptions = () => {
    const correctIndex = Math.floor(Math.random() * animals.length)
    const allOptions = animals.map(animal => ({
      name: animal.name,
      category: animal.category,
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
    setCurrentAnimal(animals[Math.floor(Math.random() * animals.length)])
    setOptions([])
    generateOptions()
  }

  const handleAnimalSelect = (animalName) => {
    const selectedOption = options.find(o => o.name === animalName)
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
            Animal Sound Guess • Score: {score} • Level: {level}
          </span>
        </div>
      </nav>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <EducationalCard
              title="🔊 Animal Sound Guessing"
              description="Guess the animal from its sound"
              style={{ borderColor: '#FF83B5' }}
            >
              <div
                style={{
                  textAlign: 'center',
                  padding: '2rem 1rem',
                  margin: '2rem 0',
                  background: 'linear-gradient(135deg, #FF83B520, transparent)',
                  borderRadius: '15px',
                  minHeight: '120px',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Fredoka', cursive",
                    fontSize: '4rem',
                    color: '#FF83B5',
                  }}
                >
                  {currentAnimal.illustration}
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
                What animal makes this sound?
              </p>

              {/* Sound button */}
              <div className="text-center mb-4">
                <FunkyButton
                  onClick={() => {
                    // Simple sound feedback
                    const sounds = {
                      Cow: '🐄 Moo',
                      Lion: '🦁 Roar',
                      Elephant: '🐘 Trumpet',
                      Dolphin: '🐬 Click',
                      Dog: '🐶 Woof',
                      Cat: '🐱 Meow',
                    }
                    alert(sounds[currentAnimal.name])
                  }}
                  style={{ width: '100%', marginTop: '1rem' }}
                >
                  🔊 Play Sound
                </FunkyButton>
              </div>

              {/* Animal options */}
              <div className="d-flex gap-2 flex-wrap justify-content-center">
                {options.map(opt => (
                  <FunkyButton
                    key={opt.name}
                    onClick={() => handleAnimalSelect(opt.name)}
                    style={{ flex: 1, minWidth: '80px', fontSize: '0.875rem' }}
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
                Level {level}: Each correct guess = 10 points
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

export default AnimalSoundGuessingGame