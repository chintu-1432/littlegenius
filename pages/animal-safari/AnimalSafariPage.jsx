
import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useMascot } from '../../components/mascot/useMascot'
import { animalsData } from '../../modules/animals-data'
import './AnimalSafariPage.css'
import { awardRewards } from '../../utils/rewards'

const AnimalSafariPage = () => {
  const { celebrate } = useMascot()

  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0)
  const [showGame, setShowGame] = useState(false)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)

  const animal = animalsData[currentAnimalIndex]
  const progress = ((currentAnimalIndex + 1) / animalsData.length) * 100

  // Speak animal name using browser voice
  const speakAnimal = (text) => {
    if (!('speechSynthesis' in window)) return

    window.speechSynthesis.cancel()

    const speech = new SpeechSynthesisUtterance(text)
    speech.lang = 'en-US'
    speech.rate = 0.85
    speech.pitch = 1
    speech.volume = 1

    speech.onstart = () => setIsSpeaking(true)
    speech.onend = () => setIsSpeaking(false)
    speech.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(speech)
  }

  useEffect(() => {
    return () => window.speechSynthesis?.cancel()
  }, [])

  const nextAnimal = () => {
    const next = (currentAnimalIndex + 1) % animalsData.length

    setCurrentAnimalIndex(next)
    setShowGame(false)
    setFeedback('')
    speakAnimal(animalsData[next].name)
  }

  const previousAnimal = () => {
    const previous =
      (currentAnimalIndex - 1 + animalsData.length) % animalsData.length

    setCurrentAnimalIndex(previous)
    setShowGame(false)
    setFeedback('')
    speakAnimal(animalsData[previous].name)
  }

  const playSound = () => {
    setShowGame(true)
    setFeedback('')

    // Speaks the animal name and its sound label.
    // This is pronunciation, not an actual animal recording.
    speakAnimal(`${animal.name}. ${animal.sound}`)
  }

  const handleAnswer = (guess) => {
    if (guess.toLowerCase() === animal.sound.toLowerCase()) {
      setScore(prev => prev + 10)
      awardRewards({ stars: 5 })
      setFeedback('correct')
      celebrate()
      speakAnimal('Excellent! You got it right!')
    } else {
      setFeedback('wrong')
      speakAnimal('Good try! Try again!')
    }
  }

  if (!animal) {
    return <div className="safari-error">No animals available. Please check animals-data.js.</div>
  }

  return (
    <div className="safari-world">

      {/* Floating decorations */}
      <div className="jungle-decoration leaf-one">🌿</div>
      <div className="jungle-decoration leaf-two">🍃</div>
      <div className="jungle-decoration leaf-three">🌴</div>
      <div className="jungle-decoration leaf-four">🌿</div>

      {/* Navigation */}
      <nav className="safari-navbar">
        <NavLink to="/home" className="safari-back">
          ← Back Home
        </NavLink>

        <div className="safari-brand">
          🦁 Animal Safari
        </div>

        <div className="safari-score">
          ⭐ {score}
        </div>
      </nav>

      <main className="safari-container">

        {/* Heading */}
        <header className="safari-heading">
          <span className="safari-label">WELCOME LITTLE EXPLORER</span>

          <h1>Explore the Animal Kingdom!</h1>

          <p>
            Meet amazing animals, discover their world and learn their names!
          </p>
        </header>

        {/* Progress */}
        <div className="safari-progress-card">
          <div className="safari-progress-info">
            <span>Adventure Progress</span>
            <strong>
              {currentAnimalIndex + 1} / {animalsData.length}
            </strong>
          </div>

          <div className="safari-progress-track">
            <div
              className="safari-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Main animal card */}
        <section className="animal-learning-card">

          <div className="animal-category">
            🐾 {animal.category || 'Amazing Animal'}
          </div>

          <div className="animal-stage" key={animal.name}>
            <div className="animal-stage-circle">
              <span className="animal-illustration">
                {animal.illustration}
              </span>
            </div>

            <span className="animal-decoration animal-star">✨</span>
            <span className="animal-decoration animal-heart">💚</span>
          </div>

          <div className="animal-information">
            <span className="animal-small-label">MEET YOUR NEW FRIEND</span>

            <h2>{animal.name}</h2>

            <p className="animal-fact">
              {animal.fact}
            </p>

            <button
              className="animal-sound-button"
              onClick={playSound}
            >
              {isSpeaking ? '🔊 Speaking...' : '🔊 Listen & Learn'}
            </button>

            <button
              className="animal-name-button"
              onClick={() => speakAnimal(animal.name)}
            >
              🎙️ Pronounce Animal Name
            </button>
          </div>

          {/* Animal quiz */}
          <div className="animal-quiz">
            <button
              className="quiz-toggle"
              onClick={() => {
                setShowGame(prev => !prev)
                setFeedback('')
              }}
            >
              🎮 {showGame ? 'Close Animal Quiz' : 'Play Animal Quiz'}
            </button>

            {showGame && (
              <div className="quiz-content">
                <h3>What sound does {animal.name} make?</h3>

                <p>Choose the correct answer!</p>

                <div className="quiz-options">
  {['Moo', 'Roar', 'Meow', 'Woof'].map(sound => (
    <button
      key={sound}
      className={`quiz-option ${
        feedback === 'correct' && sound === animal.sound
          ? 'correct-option'
          : ''
      }`}
      onClick={() => handleAnswer(sound)}
      disabled={feedback === 'correct'}
    >
      {sound}
    </button>
  ))}
</div>

                {feedback === 'correct' && (
                  <div className="quiz-feedback correct-feedback">
                    🎉 Fantastic! You earned 10 stars!
                  </div>
                )}

                {feedback === 'wrong' && (
                  <div className="quiz-feedback wrong-feedback">
                    💛 Nice try! Have another go!
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation buttons */}
          <div className="animal-navigation">
            <button
              className="animal-previous"
              onClick={previousAnimal}
            >
              ← Previous
            </button>

            <button
              className="animal-next"
              onClick={nextAnimal}
            >
              Next Animal →
            </button>
          </div>

        </section>

        <div className="safari-tip">
          💡 Little Explorer: Can you find an animal around you?
        </div>

        <footer className="safari-footer">
          Made with 💚 for little animal lovers
        </footer>

      </main>
    </div>
  )
}

export default AnimalSafariPage
