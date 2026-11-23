import React, { useState } from 'react'
import { FunkyButton } from '../../components/buttons/FunkyButton'
import { NavLink } from 'react-router-dom'
import { EducationalCard } from '../../components/cards/EducationalCard'
const ParentDashboardPage = () => {
  // Load from localStorage
  const loadStorage = (key, defaultValue) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (e) {
      return defaultValue
    }
  }

  const saveStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.error('localStorage error:', e)
    }
  }

  const progress = loadStorage('learningProgress', [])
  const completedLessons = loadStorage('completedLessons', [])
  const quizResults = loadStorage('quizResults', [])
  const achievements = loadStorage('achievements', [])
  const timeSpent = loadStorage('timeSpent', 0)
  const soundVolume = loadStorage('soundVolume', 0.8)
  const screenTimeLimit = loadStorage('screenTimeLimit', 60)

  const [verificationEntered, setVerificationEntered] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [verifySuccess, setVerifySuccess] = useState(false)

  // Parent verification
  const verifyParent = () => {
    // Simple verification - in a real app this would be more secure
    if (verificationCode === 'parent123') {
      setVerifySuccess(true)
      setVerificationEntered(false)
      setVerificationCode('')
    } else {
      setVerifySuccess(false)
    }
  }

  const addTimeSpent = (minutes) => {
    const newTime = (timeSpent || 0) + minutes
    saveStorage('timeSpent', newTime)
  }

  const addCompletedLesson = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      const updatedLessons = [...completedLessons, lessonId]
      saveStorage('completedLessons', updatedLessons)
      // Update progress
      const updatedProgress = progress.map(p => {
        if (p.lessonId === lessonId) {
          return { ...p, completed: true, timeSpent: (p.timeSpent || 0) + 30 }
        }
        return p
      })
      saveStorage('learningProgress', updatedProgress)
    }
  }

  const addQuizResult = (result) => {
    const updatedResults = [...quizResults, {
      ...result,
      date: new Date().toISOString(),
    }]
    saveStorage('quizResults', updatedResults)
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
            Parent Dashboard
          </span>
        </div>
      </nav>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <EducationalCard
              title="👨‍👩‍👧 Parent Dashboard"
              description="Monitor your child's learning progress"
              style={{ borderColor: '#8057E5' }}
            >

              {/* Verification section */}
              {!verifySuccess && (
                <div className="mb-4 p-3 rounded" style={{ background: '#e3f2fd' }}>
                  <h6
                    style={{
                      fontFamily: "'Fredoka', cursive",
                      color: '#1976d2',
                      margin: '0 0 1rem 0',
                    }}
                  >
                    Parent Verification
                  </h6>
                  <p
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      color: '#333',
                      margin: '0.5rem 0',
                    }}
                  >
                    Enter verification code to access sensitive settings:
                  </p>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="form-control"
                    style={{
                      width: '100%',
                      fontFamily: "'Nunito', sans-serif",
                      margin: '0.5rem 0',
                      padding: '0.5rem',
                    }}
                    placeholder="parent123"
                  />
                  <FunkyButton
                    onClick={verifyParent}
                    style={{
                      width: '100%',
                      marginTop: '0.5rem',
                      background: '#1976d2',
                      color: 'white',
                    }}
                  >
                    Verify
                  </FunkyButton>
                  {verifySuccess && (
                    <p
                      style={{
                        fontFamily: "'Nunito', sans-serif",
                        color: '#2e7d32',
                        marginTop: '0.5rem',
                      }}
                    >
                      Verified! Welcome parent.
                    </p>
                  )}
                </div>
              )}

              {/* Learning Progress */}
              {verifySuccess && (
                <div className="mb-4">
                  <h6
                    style={{
                      fontFamily: "'Fredoka', cursive",
                      color: '#8057E5',
                      marginBottom: '1rem',
                    }}
                  >
                    Learning Progress
                  </h6>
                  <small
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      color: '#555',
                      display: 'block',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Lessons Completed: {completedLessons.length}
                  </small>
                  <div
                    style={{
                      height: '20px',
                      background: '#e0e0e0',
                      borderRadius: '10px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: progress.length > 0 ? (progress.length / 20) * 100 : 0,
                        height: '100%',
                        background: 'linear-gradient(135deg, #8057E5, #55C7F2)',
                        transition: 'width 0.3s',
                      }}
                    />
                  </div>
                  <small
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      color: '#666',
                      marginTop: '0.5rem',
                      display: 'block',
                    }}
                  >
                    {Math.round((progress.length / 20) * 100)}% complete
                  </small>
                </div>
              )}

              {/* Completed Lessons */}
              {verifySuccess && (
                <div className="mb-4">
                  <h6
                    style={{
                      fontFamily: "'Fredoka', cursive",
                      color: '#8057E5',
                      marginBottom: '1rem',
                    }}
                  >
                    Completed Lessons
                  </h6>
                  {completedLessons.map((lessonId, index) => (
                    <div
                      key={index}
                      style={{
                        marginBottom: '0.5rem',
                        padding: '0.5rem',
                        background: '#f5f5f5',
                        borderRadius: '4px',
                      }}
                    >
                      Lesson {lessonId}
                    </div>
                  ))}
                </div>
              )}

              {/* Quiz Results */}
              {verifySuccess && (
                <div>
                  <h6
                    style={{
                      fontFamily: "'Fredoka', cursive",
                      color: '#8057E5',
                      marginBottom: '1rem',
                    }}
                  >
                    Quiz Results
                  </h6>
                  {quizResults.slice(-5).map((result, index) => (
                    <div
                      key={index}
                      style={{
                        marginBottom: '0.5rem',
                        padding: '0.5rem',
                        background: '#f5f5f5',
                        borderRadius: '4px',
                      }}
                    >
                      {result.lesson}: {result.score}% - {result.date.slice(0, 10)}
                    </div>
                  ))}
                </div>
              )}

              {/* Time Spent */}
              {verifySuccess && (
                <div className="mb-4">
                  <h6
                    style={{
                      fontFamily: "'Fredoka', cursive",
                      color: '#8057E5',
                      marginBottom: '1rem',
                    }}
                  >
                    Time Spent Learning
                  </h6>
                  <small
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      color: '#555',
                      display: 'block',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Total: {(timeSpent || 0)} minutes
                  </small>
                  <div
                    style={{
                      height: '20px',
                      background: '#e0e0e0',
                      borderRadius: '10px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: (timeSpent || 0) / 120 * 100,
                        height: '100%',
                        background: 'linear-gradient(135deg, #55C7F2, #70DDB0)',
                        transition: 'width 0.3s',
                      }}
                    />
                  </div>
                  <small
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      color: '#666',
                      marginTop: '0.5rem',
                      display: 'block',
                    }}
                  >
                    {(timeSpent || 0) / 60} hours learned
                  </small>
                </div>
              )}

              {/* Screen Time Reminders */}
              {verifySuccess && (
                <div className="mb-4">
                  <h6
                    style={{
                      fontFamily: "'Fredoka', cursive",
                      color: '#8057E5',
                      marginBottom: '1rem',
                    }}
                  >
                    Screen Time Reminders
                  </h6>
                  <small
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      color: '#555',
                      display: 'block',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Daily limit: {screenTimeLimit} minutes
                  </small>
                  <FunkyButton
                    onClick={() => saveStorage('screenTimeLimit', (screenTimeLimit || 60) + 10)}
                    style={{
                      width: '100%',
                      marginTop: '0.5rem',
                    }}
                  >
                    Increase Limit to {(screenTimeLimit || 60) + 10} min
                  </FunkyButton>
                </div>
              )}

              {/* Sound Controls */}
              {verifySuccess && (
                <div className="mb-4">
                  <h6
                    style={{
                      fontFamily: "'Fredoka', cursive",
                      color: '#8057E5',
                      marginBottom: '1rem',
                    }}
                  >
                    Sound Controls
                  </h6>
                  <small
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      color: '#555',
                      display: 'block',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Volume: {Math.round((soundVolume || 0.8) * 100)}%
                  </small>
                  <FunkyButton
                    onClick={() => saveStorage('soundVolume', (soundVolume || 0.8) - 0.1)}
                    style={{
                      width: '100%',
                      marginTop: '0.5rem',
                    }}
                  >
                    Lower Volume
                  </FunkyButton>
                  <FunkyButton
                    onClick={() => saveStorage('soundVolume', Math.min(1, (soundVolume || 0.8) + 0.1))}
                    style={{
                      width: '100%',
                      marginTop: '0.5rem',
                    }}
                  >
                    Raise Volume
                  </FunkyButton>
                </div>
              )}

              {/* Profile Settings */}
              {verifySuccess && (
                <div>
                  <h6
                    style={{
                      fontFamily: "'Fredoka', cursive",
                      color: '#8057E5',
                      marginBottom: '1rem',
                    }}
                  >
                    Profile Settings
                  </h6>
                  <small
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      color: '#555',
                      display: 'block',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Reset progress option available
                  </small>
                </div>
              )}
            </EducationalCard>
          </div>
        </div>
      </div>

      <div className="mt-5 text-center">
        <small
          style={{
            color: '#666',
            fontFamily: "'Nunito', sans-serif",
          }}
        >
          Local frontend demonstration - not secure server-side authentication
        </small>
      </div>
    </div>
  )
}

export default ParentDashboardPage