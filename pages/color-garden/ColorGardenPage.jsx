import { FunkyButton } from '../../components/buttons/FunkyButton'
import { EducationalCard } from '../../components/cards/EducationalCard'

import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './ColorGardenPage.css'

const colors = [
  { name: 'Red', hex: '#FF4545', emoji: '🍎', description: 'Red like a juicy apple!', object: 'Apple' },
  { name: 'Blue', hex: '#388BFA', emoji: '🌊', description: 'Blue like the beautiful ocean!', object: 'Ocean' },
  { name: 'Yellow', hex: '#FFD447', emoji: '☀️', description: 'Yellow like the shining sun!', object: 'Sun' },
  { name: 'Green', hex: '#35B779', emoji: '🍃', description: 'Green like fresh leaves!', object: 'Leaves' },
  { name: 'Purple', hex: '#9866E8', emoji: '🍇', description: 'Purple like sweet grapes!', object: 'Grapes' },
  { name: 'Orange', hex: '#FF963D', emoji: '🍊', description: 'Orange like a tasty orange!', object: 'Orange fruit' },
  { name: 'Pink', hex: '#F27BAF', emoji: '🌸', description: 'Pink like a pretty flower!', object: 'Flower' },
  { name: 'Brown', hex: '#986545', emoji: '🐻', description: 'Brown like a friendly bear!', object: 'Bear' },
  { name: 'Black', hex: '#252525', emoji: '🌙', description: 'Black like the night sky!', object: 'Night sky' },
  { name: 'White', hex: '#FFFFFF', emoji: '☁️', description: 'White like soft clouds!', object: 'Cloud' },
  { name: 'Gray', hex: '#9299A5', emoji: '🐘', description: 'Gray like a gentle elephant!', object: 'Elephant' },
]

const ColorGardenPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [maleVoice, setMaleVoice] = useState(null)
  const [speaking, setSpeaking] = useState(false)

  const current = colors[currentIndex]
  const progress = ((currentIndex + 1) / colors.length) * 100
  const darkText = ['Yellow', 'White'].includes(current.name)

  // Prefer a recognizable male English voice.
  const findMaleVoice = () => {
    const voices = window.speechSynthesis.getVoices()
    const englishVoices = voices.filter(v => v.lang.toLowerCase().startsWith('en'))

    const preferredNames = [
      /microsoft david/i,
      /google uk english male/i,
      /microsoft mark/i,
      /microsoft guy/i,
      /daniel/i,
      /alex/i,
      /male/i,
    ]

    for (const pattern of preferredNames) {
      const match = englishVoices.find(v => pattern.test(v.name))
      if (match) return match
    }

    return englishVoices.find(v => v.lang === 'en-US') ||
      englishVoices.find(v => v.lang === 'en-GB') ||
      englishVoices[0] ||
      null
  }

  useEffect(() => {
    if (!('speechSynthesis' in window)) return

    const loadVoices = () => {
      const voice = findMaleVoice()
      if (voice) setMaleVoice(voice)
    }

    loadVoices()
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices)

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices)
      window.speechSynthesis.cancel()
    }
  }, [])

  // Clear and child-friendly pronunciation
  const speak = (text) => {
    if (!('speechSynthesis' in window)) {
      alert('Voice learning is not supported in this browser.')
      return
    }

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)

    if (maleVoice) {
      utterance.voice = maleVoice
    }

    utterance.lang = maleVoice?.lang || 'en-US'
    utterance.rate = 0.82
    utterance.pitch = 0.95
    utterance.volume = 1

    utterance.onstart = () => setSpeaking(true)
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }

  const nextColor = () => {
    window.speechSynthesis.cancel()
    const next = (currentIndex + 1) % colors.length
    setCurrentIndex(next)
    setScore(prev => prev + 5)
    speak(colors[next].name)
  }

  const previousColor = () => {
    window.speechSynthesis.cancel()
    const previous = (currentIndex - 1 + colors.length) % colors.length
    setCurrentIndex(previous)
    speak(colors[previous].name)
  }

  const repeatColor = () => {
    speak(current.name)
  }

  const startLearning = () => {
    speak(`${current.name}. ${current.description}`)
  }

  return (
    <div className="color-world">

      <div className="color-topbar">
        <NavLink to="/home" className="back-link">
          <span>←</span> Home
        </NavLink>

        <div className="brand-name">
          🌈 Color Garden
        </div>

        <div className="score-pill">
          ⭐ {score}
        </div>
      </div>

      <main className="color-main">

        <div className="color-heading">
          <span className="little-label">WELCOME, LITTLE EXPLORER!</span>
          <h1>Let's Discover Colors!</h1>
          <p>Every color has a beautiful story. Let's learn together!</p>
        </div>

        <section className="color-learning-card">

          <div className="color-card-top">
            <span className="lesson-number">
              LESSON {currentIndex + 1} / {colors.length}
            </span>
            <span className="star-label">✨ Keep learning!</span>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div
            className={`color-display ${darkText ? 'light-color' : ''}`}
            style={{ backgroundColor: current.hex }}
          >
            <div className="color-orbit orbit-one" />
            <div className="color-orbit orbit-two" />

            <div className="color-object">
              <span className="color-emoji">{current.emoji}</span>
              <h2>{current.name}</h2>
            </div>
          </div>

          <div className="color-information">
            <span className="discovery-label">TODAY'S COLOR</span>

            <h2>{current.name}!</h2>

            <p>{current.description}</p>

            <button className="voice-button" onClick={repeatColor}>
              <span>{speaking ? '🔊' : '🎙️'}</span>
              {speaking ? 'Speaking...' : 'Listen to Pronunciation'}
            </button>

            <button className="sentence-button" onClick={startLearning}>
              🔊 Hear the full lesson
            </button>
          </div>

          <div className="color-navigation">
            <button className="previous-button" onClick={previousColor}>
              ← Previous
            </button>

            <button className="next-button" onClick={nextColor}>
              Next Color <span>→</span>
            </button>
          </div>

        </section>

        <div className="learning-tip">
          <span>💡</span>
          <p>
            <strong>Little challenge:</strong> Can you find something
            {` ${current.name.toLowerCase()} `}around you?
          </p>
        </div>

        <div className="color-footer">
          Made with 💜 for little learners
        </div>

      </main>
    </div>
  )
}

export default ColorGardenPage
