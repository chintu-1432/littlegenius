
import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useMascot } from '../../components/mascot/useMascot'
import { FunkyButton } from '../../components/buttons/FunkyButton'
import { EducationalCard } from '../../components/cards/EducationalCard'
import { awardRewards } from '../../utils/rewards'

const VoiceLearningPage = () => {
  const { celebrate } = useMascot()

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  const numbers = [
    'One', 'Two', 'Three', 'Four', 'Five',
    'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen',
    'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen',
    'Nineteen', 'Twenty'
  ]

  const animals = [
    { name: 'Lion', icon: '🦁' },
    { name: 'Elephant', icon: '🐘' },
    { name: 'Dog', icon: '🐶' },
    { name: 'Cat', icon: '🐱' },
    { name: 'Cow', icon: '🐄' },
    { name: 'Bird', icon: '🐦' },
    { name: 'Monkey', icon: '🐵' },
    { name: 'Rabbit', icon: '🐰' },
  ]

  const [currentLetterIndex, setCurrentLetterIndex] = useState(0)
  const [currentNumberIndex, setCurrentNumberIndex] = useState(0)
  const [selectedAnimal, setSelectedAnimal] = useState(null)
  const [recognizedText, setRecognizedText] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [maleVoice, setMaleVoice] = useState(null)

  const [hasRecognition] = useState(
    () => typeof window !== 'undefined' &&
      ('SpeechRecognition' in window ||
       'webkitSpeechRecognition' in window)
  )

  const currentLetter = letters[currentLetterIndex]
  const currentNumber = numbers[currentNumberIndex]

  // Find an available English male-style voice
  useEffect(() => {
    if (!('speechSynthesis' in window)) return

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices()
      const englishVoices = voices.filter(v =>
        v.lang.toLowerCase().startsWith('en')
      )

      const preferredPatterns = [
        /Microsoft David/i,
        /Google UK English Male/i,
        /Microsoft Mark/i,
        /Microsoft Guy/i,
        /Daniel/i,
        /Alex/i,
        /male/i,
      ]

      let selectedVoice = null

      for (const pattern of preferredPatterns) {
        selectedVoice = englishVoices.find(v =>
          pattern.test(v.name)
        )
        if (selectedVoice) break
      }

      selectedVoice =
        selectedVoice ||
        englishVoices.find(v => v.lang === 'en-US') ||
        englishVoices.find(v => v.lang === 'en-GB') ||
        englishVoices[0] ||
        null

      setMaleVoice(selectedVoice)
    }

    loadVoices()
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices)

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices)
      window.speechSynthesis.cancel()
    }
  }, [])

  // Pronunciation function
  const speakText = (text) => {
    if (!('speechSynthesis' in window)) {
      alert('Your browser does not support voice learning.')
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

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }

  // Letter pronunciation
  const pronounceLetter = () => {
    speakText(`The letter ${currentLetter}`)
  }

  const nextLetter = () => {
    const next = (currentLetterIndex + 1) % letters.length
    setCurrentLetterIndex(next)
    speakText(`The letter ${letters[next]}`)
  }

  // Number pronunciation
  const pronounceNumber = () => {
    speakText(`The number ${currentNumber}`)
  }

  const nextNumber = () => {
    const next = (currentNumberIndex + 1) % numbers.length
    setCurrentNumberIndex(next)
    speakText(`The number ${numbers[next]}`)
  }

  // Animal pronunciation
  const pronounceAnimal = (animal) => {
    setSelectedAnimal(animal)
    speakText(`This is a ${animal.name}`)
  }

  // Speech recognition
  const startListening = () => {
    const Recognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition

    if (!Recognition) {
      alert('Speech recognition is not supported in this browser.')
      return
    }

    const recognition = new Recognition()

    recognition.lang = 'en-US'
    recognition.continuous = false
    recognition.interimResults = false

    setIsListening(true)
    setRecognizedText('')

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim()

      setRecognizedText(transcript)
      setIsListening(false)

      const expectedWords = [
        currentLetter.toLowerCase(),
        currentNumber.toLowerCase(),
        ...(selectedAnimal ? [selectedAnimal.name.toLowerCase()] : [])
      ]

      const answer = transcript.toLowerCase().replace(/[.!?,]/g, '')

      const isCorrect = expectedWords.some(word =>
        answer === word ||
        answer.includes(word)
      )

      if (isCorrect) {
        speakText('Excellent! Great job! Keep learning!')
        celebrate()
      } else {
        speakText('Good try! Listen carefully and try again.')
      }
    }

    recognition.onerror = () => {
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    try {
      recognition.start()
    } catch (error) {
      setIsListening(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      padding: '2rem',
      background: 'linear-gradient(135deg, #f0f4ff, #fceeff)',
    }}>

      <nav className="navbar mb-4">
        <div className="container-fluid">
          <NavLink to="/home" className="navbar-brand">
            ← Back Home
          </NavLink>

          <span style={{
            color: '#8057E5',
            fontFamily: "'Fredoka', cursive",
            fontSize: '1.2rem',
          }}>
            🎤 Voice Learning
          </span>
        </div>
      </nav>

      <div className="container">

        <div className="text-center mb-5">
          <h1 style={{
            color: '#8057E5',
            fontFamily: "'Fredoka', cursive",
            fontSize: '2.8rem',
          }}>
            Let's Learn With Our Voice! 🎙️
          </h1>

          <p style={{ color: '#666' }}>
            Listen, speak and have fun learning!
          </p>
        </div>

        <div className="row g-4">

          {/* Letter learning */}
          <div className="col-md-6">
            <EducationalCard
              title="🔤 Letter Learning"
              description="Learn the English alphabet."
              style={{ background: '#fff', borderColor: '#8057E5' }}
            >
              <div className="text-center p-3">
                <div style={{
                  fontFamily: "'Fredoka', cursive",
                  fontSize: '6rem',
                  color: '#8057E5',
                }}>
                  {currentLetter}
                </div>

                <FunkyButton block onClick={pronounceLetter}>
                  🔊 {isSpeaking ? 'Speaking...' : 'Listen to Letter'}
                </FunkyButton>

                <FunkyButton
                  variant="secondary"
                  block
                  onClick={nextLetter}
                  style={{ marginTop: '12px' }}
                >
                  Next Letter →
                </FunkyButton>
              </div>
            </EducationalCard>
          </div>

          {/* Number learning */}
          <div className="col-md-6">
            <EducationalCard
              title="🔢 Number Learning"
              description="Learn numbers from 1 to 20."
              style={{ background: '#fff', borderColor: '#55C7F2' }}
            >
              <div className="text-center p-3">
                <div style={{
                  fontFamily: "'Fredoka', cursive",
                  fontSize: '3.5rem',
                  color: '#2196C4',
                }}>
                  {currentNumberIndex + 1}
                </div>

                <h3 style={{ color: '#555' }}>
                  {currentNumber}
                </h3>

                <FunkyButton block onClick={pronounceNumber}>
                  🔊 Listen to Number
                </FunkyButton>

                <FunkyButton
                  variant="secondary"
                  block
                  onClick={nextNumber}
                  style={{ marginTop: '12px' }}
                >
                  Next Number →
                </FunkyButton>
              </div>
            </EducationalCard>
          </div>

          {/* Animal learning */}
          <div className="col-12">
            <EducationalCard
              title="🐾 Animal Pronunciation"
              description="Choose an animal and listen to its name."
              style={{ background: '#fff', borderColor: '#FF83B5' }}
            >
              <div className="row g-3">
                {animals.map(animal => (
                  <div className="col-6 col-md-3" key={animal.name}>
                    <button
                      onClick={() => pronounceAnimal(animal)}
                      style={{
                        width: '100%',
                        padding: '18px 8px',
                        background: selectedAnimal?.name === animal.name
                          ? '#f4eaff'
                          : '#fff7fb',
                        border: '2px solid #f0c9df',
                        borderRadius: '16px',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ fontSize: '2.5rem' }}>
                        {animal.icon}
                      </div>

                      <strong style={{ color: '#555' }}>
                        {animal.name}
                      </strong>

                      <div style={{ color: '#8057E5', marginTop: '8px' }}>
                        🔊 Say Name
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </EducationalCard>
          </div>

          {/* Speaking practice */}
          <div className="col-12">
            <EducationalCard
              title="🎙️ Speaking Practice"
              description="Speak into your microphone and practice your learning."
              style={{ background: '#fff', borderColor: '#70DDB0' }}
            >
              <div className="text-center p-3">
                <div style={{ fontSize: '3rem' }}>
                  {isListening ? '🎤' : '🗣️'}
                </div>

                <p style={{ color: '#555' }}>
                  {isListening
                    ? 'I am listening... Speak now!'
                    : 'Press the button and say a letter, number or selected animal name.'}
                </p>

                <FunkyButton
                  block
                  onClick={startListening}
                  style={{
                    background: isListening ? '#E74C3C' : '#36B779',
                    color: '#fff',
                  }}
                >
                  {isListening ? 'Listening...' : '🎤 Start Speaking'}
                </FunkyButton>

                {recognizedText && (
                  <div className="mt-3 p-3 rounded"
                    style={{ background: '#e9f8ee' }}>
                    <strong style={{ color: '#278A58' }}>
                      You said: {recognizedText}
                    </strong>
                  </div>
                )}
              </div>
            </EducationalCard>
          </div>

        </div>
      </div>
    </div>
  )
}

export default VoiceLearningPage
