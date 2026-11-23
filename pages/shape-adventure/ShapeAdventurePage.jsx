
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useMascot } from '../../components/mascot/useMascot'
import './ShapeAdventurePage.css'
import { awardRewards } from '../../utils/rewards'

const shapes = [
  {
    name: 'Circle',
    answer: 0,
    unit: 'corners',
    question: 'How many corners does a circle have?',
    description: 'A circle is round and has no corners.',
    color: '#8057E5',
    illustration: '🔵',
    example: 'A round clock',
  },
  {
    name: 'Square',
    answer: 4,
    unit: 'sides',
    question: 'How many sides does a square have?',
    description: 'A square has four equal sides and four corners.',
    color: '#35A9DF',
    illustration: '🟦',
    example: 'A floor tile',
  },
  {
    name: 'Triangle',
    answer: 3,
    unit: 'sides',
    question: 'How many sides does a triangle have?',
    description: 'A triangle has three straight sides and three corners.',
    color: '#E6A928',
    illustration: '🔺',
    example: 'A pizza slice',
  },
  {
    name: 'Rectangle',
    answer: 4,
    unit: 'sides',
    question: 'How many sides does a rectangle have?',
    description: 'A rectangle has four sides and four corners.',
    color: '#E879A8',
    illustration: '▰',
    example: 'A book',
  },
  {
    name: 'Star',
    answer: 5,
    unit: 'points',
    question: 'How many points does a five-pointed star have?',
    description: 'A star has five beautiful points.',
    color: '#D69A25',
    illustration: '⭐',
    example: 'A star in the night sky',
  },
  {
    name: 'Heart',
    answer: 0,
    unit: 'corners',
    question: 'How many sharp corners does a heart have?',
    description: 'A heart is a lovely curved shape.',
    color: '#E85E8B',
    illustration: '❤️',
    example: 'A heart-shaped balloon',
  },
  {
    name: 'Oval',
    answer: 0,
    unit: 'corners',
    question: 'How many corners does an oval have?',
    description: 'An oval is a smooth, stretched round shape.',
    color: '#ED914C',
    illustration: '🥚',
    example: 'An egg',
  },
  {
    name: 'Diamond',
    answer: 4,
    unit: 'sides',
    question: 'How many sides does a diamond shape have?',
    description: 'A diamond shape has four straight sides.',
    color: '#5D9EDC',
    illustration: '🔷',
    example: 'A kite',
  },
  {
    name: 'Pentagon',
    answer: 5,
    unit: 'sides',
    question: 'How many sides does a pentagon have?',
    description: 'A pentagon is a shape with five sides.',
    color: '#9871D5',
    illustration: '⬟',
    example: 'A five-sided badge',
  },
  {
    name: 'Hexagon',
    answer: 6,
    unit: 'sides',
    question: 'How many sides does a hexagon have?',
    description: 'A hexagon has six straight sides.',
    color: '#36A8B9',
    illustration: '⬡',
    example: 'A honeycomb cell',
  },
]

// Same choices for every shape
const answerOptions = [0, 3, 4, 5, 6, 10]

const ShapeAdventurePage = () => {
  const { celebrate } = useMascot()

  const [currentShapeIndex, setCurrentShapeIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [answered, setAnswered] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  const shape = shapes[currentShapeIndex]
  const progress = ((currentShapeIndex + 1) / shapes.length) * 100

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel()
    }
  }, [])

  const speak = (text) => {
    if (!('speechSynthesis' in window)) return

    window.speechSynthesis.cancel()

    const speech = new SpeechSynthesisUtterance(text)
    speech.lang = 'en-US'
    speech.rate = 0.82
    speech.pitch = 1
    speech.volume = 1

    speech.onstart = () => setIsSpeaking(true)
    speech.onend = () => setIsSpeaking(false)
    speech.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(speech)
  }

  const introduceShape = () => {
    speak(`${shape.name}. ${shape.description}`)
  }

  const nextShape = () => {
    const next = (currentShapeIndex + 1) % shapes.length
    setCurrentShapeIndex(next)
    setFeedback('')
    setAnswered(false)
    speak(`Let's learn about the ${shapes[next].name}`)
  }

  const previousShape = () => {
    const previous =
      (currentShapeIndex - 1 + shapes.length) % shapes.length

    setCurrentShapeIndex(previous)
    setFeedback('')
    setAnswered(false)
    speak(`Let's learn about the ${shapes[previous].name}`)
  }

  const handleAnswer = (selectedAnswer) => {
    if (answered) return

    if (selectedAnswer === shape.answer) {
      setScore(prev => prev + 10)
      awardRewards({ stars: 5 })
      setFeedback('correct')
      setAnswered(true)
      celebrate()
      speak('Amazing! That is correct. Well done!')
    } else {
      setFeedback('wrong')
      speak('Good try! Have another go!')
    }
  }

  return (
    <div className="shape-world">

      {/* Floating decorations */}
      <div className="shape-floating shape-float-one">⭐</div>
      <div className="shape-floating shape-float-two">🔵</div>
      <div className="shape-floating shape-float-three">🔺</div>
      <div className="shape-floating shape-float-four">🟣</div>

      {/* Navigation */}
      <nav className="shape-navbar">
        <NavLink to="/home" className="shape-back">
          ← Back Home
        </NavLink>

        <div className="shape-brand">
          🔷 Shape Adventure
        </div>

        <div className="shape-score">
          ⭐ {score}
        </div>
      </nav>

      <main className="shape-container">

        {/* Heading */}
        <header className="shape-heading">
          <span className="shape-eyebrow">
            WELCOME LITTLE EXPLORER
          </span>

          <h1>Discover Magical Shapes!</h1>

          <p>
            Learn shapes, explore their features and play fun games!
          </p>
        </header>

        {/* Progress */}
        <section className="shape-progress-card">
          <div className="shape-progress-info">
            <span>Your Learning Journey</span>
            <strong>
              {currentShapeIndex + 1} / {shapes.length}
            </strong>
          </div>

          <div className="shape-progress-track">
            <div
              className="shape-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        {/* Main card */}
        <section className="shape-learning-card">

          <div className="shape-category">
            ✨ MEET YOUR NEW SHAPE
          </div>

          <div
            className="shape-display"
            key={shape.name}
            style={{ '--shape-color': shape.color }}
          >
            <div className="shape-glow" />

            <div className="shape-art">
              {shape.illustration}
            </div>

            <span className="shape-sparkle sparkle-one">✨</span>
            <span className="shape-sparkle sparkle-two">⭐</span>
          </div>

          <div className="shape-information">
            <span className="shape-small-label">
              TODAY'S DISCOVERY
            </span>

            <h2 style={{ color: shape.color }}>
              {shape.name}
            </h2>

            <p>{shape.description}</p>

            <div className="shape-example">
              <span>💡</span>
              <span>
                Find this shape in: <strong>{shape.example}</strong>
              </span>
            </div>

            <button
              className="shape-listen-button"
              onClick={introduceShape}
              style={{ background: shape.color }}
            >
              🔊 {isSpeaking ? 'Speaking...' : 'Listen & Learn'}
            </button>
          </div>

          {/* Quiz */}
          <div className="shape-quiz">
            <div className="shape-quiz-heading">
              <span>🎮</span>
              <div>
                <h3>Little Shape Challenge</h3>
                <p>Choose the correct answer!</p>
              </div>
            </div>

            <div className="shape-question">
              {shape.question}
            </div>

            <div className="shape-options">
              {answerOptions.map(option => (
                <button
                  key={option}
                  className={`shape-option ${
                    feedback === 'correct' && option === shape.answer
                      ? 'shape-option-correct'
                      : ''
                  } ${
                    feedback === 'wrong' && option !== shape.answer
                      ? ''
                      : ''
                  }`}
                  onClick={() => handleAnswer(option)}
                  disabled={answered}
                >
                  {option}
                </button>
              ))}
            </div>

            {feedback === 'correct' && (
              <div className="shape-feedback shape-correct-message">
                🎉 Fantastic! You earned 10 stars!
              </div>
            )}

            {feedback === 'wrong' && (
              <div className="shape-feedback shape-wrong-message">
                💛 Nice try! Think again!
              </div>
            )}
          </div>

          {/* Navigation buttons */}
          <div className="shape-navigation">
            <button
              className="shape-previous"
              onClick={previousShape}
            >
              ← Previous
            </button>

            <button
              className="shape-next"
              onClick={nextShape}
            >
              Next Shape →
            </button>
          </div>

        </section>

        <div className="shape-tip">
          💡 Little challenge: Can you find a {shape.name.toLowerCase()}
          {' '}shape around you?
        </div>

        <footer className="shape-footer">
          Made with 💜 for little learners
        </footer>

      </main>
    </div>
  )
}

export default ShapeAdventurePage
