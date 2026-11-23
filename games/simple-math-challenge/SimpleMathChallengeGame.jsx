import React, { useState } from 'react'
import { useMascot } from '../../components/mascot/useMascot'
import { FunkyButton } from '../../components/buttons/FunkyButton'

const SimpleMathChallengeGame = () => {
  const { celebrate } = useMascot()
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [gameOver, setGameOver] = useState(false)

  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 20) + 1
    const num2 = Math.floor(Math.random() * 20) + 1
    const operation = Math.random() > 0.5 ? '+' : '-'

    let correctAnswer
    if (operation === '+') {
      correctAnswer = num1 + num2
    } else {
      correctAnswer = Math.max(num1, num2) - Math.min(num1, num2)
    }

    return {
      question: `${num1} ${operation} ${num2}`,
      answer: correctAnswer,
    }
  }

  const [question, setQuestion] = useState(generateQuestion())

  const handleAnswer = (selectedAnswer) => {
    const isCorrect = parseInt(selectedAnswer) === question.answer
    if (isCorrect) {
      setScore(prev => prev + 10 * level)
      levelUp()
      celebrate()
    } else {
      setGameOver(true)
    }
    setTimeout(() => setQuestion(generateQuestion()), 1500)
  }

  const levelUp = () => {
    setLevel(prev => Math.min(prev + 1, 5))
  }

  const restartGame = () => {
    setScore(0)
    setLevel(1)
    setGameOver(false)
    setQuestion(generateQuestion())
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
            Math Challenge • Score: {score} • Level: {level}
          </span>
        </div>
      </nav>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <EducationalCard
              title="🧮 Simple Math"
              description="Solve the addition or subtraction problem"
              style={{ borderColor: '#FFD95A' }}
            >
              <p
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  color: '#555',
                  textAlign: 'center',
                  margin: '1.5rem 0',
                }}
              >
                {question.question} = ?
              </p>

              {/* Answer options */}
              <div className="d-flex gap-2 flex-wrap justify-content-center">
                <FunkyButton
                  onClick={() => handleAnswer('10')}
                  style={{ flex: 1, minWidth: '50px' }}
                >
                  10
                </FunkyButton>
                <FunkyButton
                  onClick={() => handleAnswer('15')}
                  style={{ flex: 1, minWidth: '50px' }}
                >
                  15
                </FunkyButton>
                <FunkyButton
                  onClick={() => handleAnswer('20')}
                  style={{ flex: 1, minWidth: '50px' }}
                >
                  20
                </FunkyButton>
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
          onClick=restartGame
          style={{ width: '150px' }}
        >
          Play Again
        </FunkyButton>
      </div>
    </div>
  )
}

export default SimpleMathChallengeGame