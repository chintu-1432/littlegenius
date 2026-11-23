

import React, { useState, useRef } from 'react'
import { useMascot } from '../../components/mascot/useMascot'
import { FunkyButton } from '../../components/buttons/FunkyButton'
import { EducationalCard } from '../../components/cards/EducationalCard'
import { numberData } from '../../modules/numbers-data'
import { NavLink } from 'react-router-dom'
import { awardRewards } from '../../utils/rewards'

const NumberKingdomPage = () => {
  const { greet, celebrate } = useMascot()

  const [currentNumber, setCurrentNumber] = useState(1)
  const [score, setScore] = useState(0)
  const [showGame, setShowGame] = useState(false)
  const [question, setQuestion] = useState(null)
  const [feedback, setFeedback] = useState('')
  const [answered, setAnswered] = useState(false)

  const current = numberData.find(
    item => item.number === currentNumber
  ) || {
    number: currentNumber,
    name: currentNumber.toString(),
    illustration: `Learn to count ${currentNumber}`
  }

  const speechRef = useRef(null)

const speak = (text) => {
  if (!('speechSynthesis' in window)) return

  // Stop any previous speech
  window.speechSynthesis.cancel()

  const speech = new SpeechSynthesisUtterance(text)

  speech.lang = 'en-US'
  speech.rate = 0.8
  speech.pitch = 1.15
  speech.volume = 1

  speechRef.current = speech

  window.speechSynthesis.speak(speech)
}

  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    const operation = Math.random() > 0.5 ? '+' : '-'

    const answer = operation === '+'
      ? num1 + num2
      : Math.abs(num1 - num2)

    const wrongAnswers = new Set()

    while (wrongAnswers.size < 2) {
      const wrong = Math.max(
        0,
        answer + Math.floor(Math.random() * 9) - 4
      )

      if (wrong !== answer) {
        wrongAnswers.add(wrong)
      }
    }

    const options = [answer, ...wrongAnswers]
      .sort(() => Math.random() - 0.5)

    setQuestion({
      expression: `${num1} ${operation} ${num2}`,
      answer,
      options
    })

    setFeedback('')
    setAnswered(false)
    setShowGame(true)
  }

  const handleAnswer = (selectedAnswer) => {
    if (answered || !question) return

    setAnswered(true)

    if (selectedAnswer === question.answer) {
      setScore(prev => prev + 10)
      awardRewards({ stars: 5 })
      setFeedback('🎉 Amazing! Correct Answer!')
      celebrate()
      speak('Wonderful! You got the correct answer!')
    } else {
      setFeedback(`😊 Good try! The correct answer is ${question.answer}`)
      speak(`Good try! The correct answer is ${question.answer}`)
    }
  }

  const nextNumber = () => {
  const next = currentNumber >= 100 ? 1 : currentNumber + 1

  setCurrentNumber(next)
  setShowGame(false)
  setQuestion(null)
  setFeedback('')
  setAnswered(false)

  // Automatically speak the next number once
  const nextData = numberData.find(item => item.number === next)
  const numberName = nextData?.name || next.toString()

  speak(`Number ${next}. ${numberName}`)
}

  const previousNumber = () => {
    const previous = currentNumber <= 1 ? 100 : currentNumber - 1
    setCurrentNumber(previous)
    setShowGame(false)
    setQuestion(null)
    setFeedback('')
    setAnswered(false)
  }

  const startLearning = () => {
    speak(`This is number ${currentNumber}. ${current.illustration}`)
  }

  return (
    <div className="number-page">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&display=swap');

        .number-page {
          min-height: 100vh;
          padding-bottom: 45px;
          background: linear-gradient(135deg, #f5f1ff, #eef8ff, #fff5fa);
          font-family: 'Nunito', sans-serif;
          color: #40345f;
          overflow: hidden;
        }

        .number-navbar {
          min-height: 85px;
          background: rgba(255,255,255,.92);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px 6%;
          box-shadow: 0 4px 20px rgba(80,60,130,.07);
          position: relative;
          z-index: 2;
        }

        .number-brand {
          color: #8057e9;
          font-family: 'Fredoka', cursive;
          font-size: 27px;
          font-weight: 700;
          text-decoration: none;
        }

        .number-back {
          color: #7654d8;
          font-weight: 800;
          text-decoration: none;
          padding: 11px 20px;
          border-radius: 25px;
          background: #f1eaff;
          transition: .3s;
        }

        .number-back:hover {
          background: #8057e9;
          color: white;
          transform: translateY(-3px);
        }

        .number-hero {
          text-align: center;
          padding: 45px 15px 25px;
          animation: numberFade .7s ease;
        }

        .number-tag {
          display: inline-block;
          background: #e9dfff;
          color: #8057e9;
          border-radius: 30px;
          padding: 10px 22px;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        .number-hero h1 {
          font-family: 'Fredoka', cursive;
          color: #8057e9;
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 700;
          margin: 18px 0 8px;
        }

        .number-hero p {
          color: #827b9a;
          font-size: 17px;
        }

        .number-container {
          width: min(900px, 92%);
          margin: 15px auto;
        }

        .number-card {
          background: rgba(255,255,255,.9);
          border-radius: 32px;
          padding: 35px;
          box-shadow: 0 18px 50px rgba(90,70,150,.12);
          text-align: center;
          border: 2px solid white;
          animation: numberFloat .6s ease;
        }

       .number-count {
  width: 230px;
  height: 230px;
  margin: 25px auto;
  border-radius: 45px;
  background: linear-gradient(135deg, #8958ed, #50b8f5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: 'Fredoka', cursive;
  font-size: 115px;
  font-weight: 700;
  box-shadow: 0 18px 35px rgba(120, 90, 220, .25);
  animation: numberPop .45s ease;
  transition: .3s;
}

.number-count:hover {
  transform: translateY(-7px) rotate(-2deg);
}
        .number-name {
          font-family: 'Fredoka', cursive;
          font-size: 30px;
          color: #7953d7;
          font-weight: 600;
        }

        .number-description {
          color: #85809b;
          font-size: 17px;
          margin: 8px 0 20px;
        }

        .number-actions {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
          margin: 22px 0;
        }

        .number-action {
          border: none;
          padding: 13px 23px;
          border-radius: 18px;
          background: #f0eaff;
          color: #7653d6;
          font-weight: 800;
          cursor: pointer;
          transition: .3s;
        }

        .number-action:hover {
          transform: translateY(-4px);
          background: #e4d8ff;
        }

        .number-primary {
          background: linear-gradient(110deg, #8258e9, #4daaf0);
          color: white;
          box-shadow: 0 8px 20px rgba(110,80,210,.2);
        }

        .number-primary:hover {
          color: white;
          filter: brightness(1.07);
        }

        .number-progress {
          height: 12px;
          background: #eee9fa;
          border-radius: 20px;
          overflow: hidden;
          margin: 25px 0 10px;
        }

        .number-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #8b5bea, #50b5f3);
          border-radius: 20px;
          transition: width .5s ease;
        }

        .number-stats {
          display: flex;
          justify-content: center;
          gap: 15px;
          flex-wrap: wrap;
          margin: 25px 0;
        }

        .number-stat {
          background: white;
          padding: 14px 25px;
          border-radius: 18px;
          color: #7653d6;
          font-weight: 800;
          box-shadow: 0 5px 20px rgba(90,70,150,.07);
        }

        .number-game {
          margin-top: 30px;
          padding: 25px;
          border-radius: 25px;
          background: linear-gradient(135deg, #f2ebff, #eaf7ff);
          animation: numberFade .4s ease;
        }

        .number-game h2 {
          font-family: 'Fredoka', cursive;
          color: #7653d6;
          font-size: 28px;
        }

        .number-question {
          font-family: 'Fredoka', cursive;
          font-size: 42px;
          color: #42345f;
          margin: 15px;
        }

        .number-options {
          display: flex;
          justify-content: center;
          gap: 15px;
          flex-wrap: wrap;
        }

        .number-option {
          min-width: 85px;
          padding: 15px 25px;
          border: 2px solid #d9c9ff;
          border-radius: 18px;
          background: white;
          color: #7653d6;
          font-family: 'Fredoka', cursive;
          font-size: 25px;
          font-weight: 700;
          cursor: pointer;
          transition: .2s;
        }

        .number-option:hover:not(:disabled) {
          transform: scale(1.08);
          background: #8057e9;
          color: white;
        }

        .number-option:disabled {
          cursor: not-allowed;
          opacity: .7;
        }

        .number-feedback {
          margin: 18px 0;
          font-weight: 900;
          font-size: 18px;
          color: #7653d6;
        }

        .number-footer {
          text-align: center;
          color: #9189a8;
          margin-top: 30px;
          font-weight: 700;
        }

        @keyframes numberFloat {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes numberFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes numberPop {
          0% { transform: scale(.7); }
          70% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }

        @media(max-width: 600px) {
          .number-navbar { padding: 15px 4%; }
          .number-brand { font-size: 21px; }
          .number-back { padding: 9px 13px; font-size: 13px; }
          .number-card { padding: 22px 14px; }
          .number-count { width: 170px; height: 170px; font-size: 90px; }
          .number-hero { padding-top: 30px; }
          .number-question { font-size: 34px; }
          .number-option { min-width: 70px; }
        }
      `}</style>

      {/* Navigation */}
      <nav className="number-navbar">
        <NavLink to="/" className="number-brand">
          🧠 LITTLE GENIUS
        </NavLink>

        <NavLink to="/" className="number-back">
          ← Back Home
        </NavLink>
      </nav>

      {/* Heading */}
      <section className="number-hero">
        <span className="number-tag">🔢 YOUR MAGICAL NUMBER WORLD</span>
        <h1>Welcome to Number Kingdom! 🎈</h1>
        <p>Learn numbers, count objects and become a math champion!</p>
      </section>

      <main className="number-container">

        {/* Number learning card */}
        <div className="number-card">

          <span className="number-tag">
            ✨ NUMBER {currentNumber} OF 100
          </span>

          <div className="number-count" key={currentNumber}>
            {currentNumber}
          </div>

          <div className="number-name">
            {current.name}
          </div>

          <p className="number-description">
            {current.illustration}
          </p>

          <div className="number-actions">
            <button
              className="number-action"
              onClick={startLearning}
            >
              🔊 Listen
            </button>

            <button
              className="number-action"
              onClick={() => speak(`Number ${currentNumber}`)}
            >
              🗣️ Say Number
            </button>
          </div>

          <div className="number-progress">
            <div
              className="number-progress-fill"
              style={{ width: `${currentNumber}%` }}
            />
          </div>

          <p style={{ color: '#89819e', fontWeight: 800 }}>
            Learning progress: {currentNumber}%
          </p>

          <div className="number-actions">
            <button
              className="number-action"
              onClick={previousNumber}
            >
              ← Previous
            </button>

            <button
              className="number-action number-primary"
              onClick={nextNumber}
            >
              Next Number →
            </button>
          </div>

          <div className="number-stats">
            <div className="number-stat">
              ⭐ Score: {score}
            </div>

            <div className="number-stat">
              🔢 Number: {currentNumber}/100
            </div>
          </div>

          <button
            className="number-action number-primary"
            onClick={generateQuestion}
          >
            🎮 Play Math Quiz
          </button>

          {/* Math quiz */}
          {showGame && question && (
            <div className="number-game">
              <h2>🧠 Little Math Challenge!</h2>

              <p style={{ color: '#817998' }}>
                Choose the correct answer!
              </p>

              <div className="number-question">
                {question.expression} = ?
              </div>

              <div className="number-options">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    className="number-option"
                    disabled={answered}
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {feedback && (
                <div className="number-feedback">
                  {feedback}
                </div>
              )}

              {answered && (
                <button
                  className="number-action number-primary"
                  onClick={generateQuestion}
                >
                  🔄 Next Question
                </button>
              )}

              <button
                className="number-action"
                onClick={() => setShowGame(false)}
              >
                ✖ Close Quiz
              </button>
            </div>
          )}
        </div>
      </main>

      <div className="number-footer">
        🌟 Keep Learning, Keep Smiling! 🌟
        <p>© 2026 LITTLE GENIUS – AI Learning World</p>
      </div>

    </div>
  )
}

export default NumberKingdomPage
