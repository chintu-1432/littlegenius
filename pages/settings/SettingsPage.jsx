
import React, { useState, useEffect } from 'react'
import { FunkyButton } from '../../components/buttons/FunkyButton'
import { NavLink } from 'react-router-dom'
import { EducationalCard } from '../../components/cards/EducationalCard'

const loadStorage = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key)
    return item !== null ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

const SettingsPage = () => {
  const [childName, setChildName] = useState(
    () => loadStorage('childName', 'My Child')
  )

  const [themePreference, setThemePreference] = useState(
    () => loadStorage('themePreference', 'light')
  )

  const [fontSize, setFontSize] = useState(
    () => loadStorage('fontSize', 'medium')
  )

  const [notifications, setNotifications] = useState(
    () => loadStorage('notifications', true)
  )

  const [soundEnabled, setSoundEnabled] = useState(
    () => loadStorage('soundEnabled', true)
  )

  const [savedMessage, setSavedMessage] = useState('')

  const saveSetting = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
    setSavedMessage('✓ Settings saved successfully!')

    setTimeout(() => setSavedMessage(''), 2000)
  }

  // Apply selected theme immediately
  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      themePreference
    )

    return () => {
      document.documentElement.removeAttribute('data-theme')
    }
  }, [themePreference])

  const changeTheme = (theme) => {
    setThemePreference(theme)
    saveSetting('themePreference', theme)
  }

  const changeFontSize = (size) => {
    setFontSize(size)
    saveSetting('fontSize', size)
  }

  const handleReset = () => {
    const confirmReset = window.confirm(
      'Are you sure you want to reset your settings?'
    )

    if (!confirmReset) return

    const defaults = {
      childName: 'My Child',
      themePreference: 'light',
      fontSize: 'medium',
      notifications: true,
      soundEnabled: true
    }

    Object.entries(defaults).forEach(([key, value]) => {
      localStorage.setItem(key, JSON.stringify(value))
    })

    setChildName(defaults.childName)
    setThemePreference(defaults.themePreference)
    setFontSize(defaults.fontSize)
    setNotifications(defaults.notifications)
    setSoundEnabled(defaults.soundEnabled)

    setSavedMessage('✓ Settings restored to default!')
  }

  return (
    <div className={`settings-page ${themePreference}`}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&display=swap');

        .settings-page {
          --bg: linear-gradient(135deg, #f5f1ff, #eef8ff, #fff5fa);
          --card: #ffffff;
          --text: #40345f;
          --muted: #85809b;
          --section: #8057e5;
          --input: #f8f6ff;
          --border: #e9e1ff;
          --soft: #f1eaff;
          min-height: 100vh;
          padding-bottom: 45px;
          background: var(--bg);
          color: var(--text);
          font-family: 'Nunito', sans-serif;
          transition: background .35s, color .35s;
        }

        .settings-page.dark {
          --bg: linear-gradient(135deg, #17152a, #20243b, #242037);
          --card: #29263f;
          --text: #f5f0ff;
          --muted: #c0bad4;
          --section: #c1a5ff;
          --input: #37324f;
          --border: #494064;
          --soft: #3c335a;
        }

        .settings-nav {
          min-height: 85px;
          background: var(--card);
          padding: 15px 6%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 5px 20px rgba(70,50,120,.08);
        }

        .settings-brand {
          font-family: 'Fredoka', cursive;
          color: #8057e5;
          font-size: 27px;
          font-weight: 700;
          text-decoration: none;
        }

        .settings-back {
          background: var(--soft);
          color: var(--section);
          text-decoration: none;
          padding: 11px 20px;
          border-radius: 25px;
          font-weight: 800;
          transition: .25s;
        }

        .settings-back:hover {
          background: #8057e5;
          color: white;
          transform: translateY(-3px);
        }

        .settings-hero {
          text-align: center;
          padding: 45px 15px 25px;
        }

        .settings-tag {
          display: inline-block;
          padding: 10px 22px;
          border-radius: 30px;
          background: var(--soft);
          color: var(--section);
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        .settings-hero h1 {
          font-family: 'Fredoka', cursive;
          color: var(--section);
          font-size: clamp(32px, 5vw, 48px);
          margin: 18px 0 8px;
        }

        .settings-hero p {
          color: var(--muted);
          font-size: 17px;
        }

        .settings-container {
          width: min(760px, 92%);
          margin: auto;
        }

        .settings-card {
          background: var(--card);
          padding: 32px;
          border-radius: 30px;
          border: 1px solid var(--border);
          box-shadow: 0 18px 45px rgba(80,60,140,.12);
          animation: settingsAppear .5s ease;
        }

        .settings-section {
          padding: 22px 0;
          border-bottom: 1px solid var(--border);
        }

        .settings-section:last-child {
          border-bottom: none;
        }

        .settings-section h3 {
          font-family: 'Fredoka', cursive;
          color: var(--section);
          font-size: 23px;
          margin-bottom: 14px;
        }

        .settings-description {
          color: var(--muted);
          font-size: 14px;
          margin-bottom: 15px;
        }

        .settings-input {
          width: 100%;
          padding: 14px 17px;
          border-radius: 15px;
          border: 2px solid var(--border);
          outline: none;
          background: var(--input);
          color: var(--text);
          font-family: 'Nunito', sans-serif;
          font-size: 16px;
          transition: .25s;
        }

        .settings-input:focus {
          border-color: #9468ed;
          box-shadow: 0 0 0 3px rgba(128,87,229,.12);
        }

        .settings-options {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .settings-choice {
          flex: 1;
          min-width: 110px;
          padding: 17px 12px;
          border-radius: 18px;
          border: 2px solid var(--border);
          background: var(--input);
          color: var(--text);
          cursor: pointer;
          font-family: 'Nunito', sans-serif;
          font-weight: 800;
          transition: .25s;
        }

        .settings-choice:hover {
          transform: translateY(-4px);
          border-color: #9468ed;
        }

        .settings-choice.active {
          background: linear-gradient(120deg, #8258e9, #54b1f1);
          border-color: transparent;
          color: white;
          box-shadow: 0 8px 18px rgba(120,80,220,.2);
        }

        .settings-theme-icon {
          display: block;
          font-size: 30px;
          margin-bottom: 7px;
        }

        .settings-toggle {
          width: 100%;
          padding: 15px 18px;
          border-radius: 17px;
          background: var(--input);
          border: 1px solid var(--border);
          color: var(--text);
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          font-weight: 800;
          transition: .25s;
        }

        .settings-toggle:hover {
          border-color: #9468ed;
          transform: translateY(-2px);
        }

        .settings-status {
          padding: 6px 13px;
          border-radius: 20px;
          background: #e0f8e9;
          color: #20834a;
          font-size: 12px;
          font-weight: 900;
        }

        .settings-status.off {
          background: #ffe6e6;
          color: #c43d3d;
        }

        .settings-reset {
          width: 100%;
          border: none;
          padding: 15px;
          border-radius: 17px;
          background: #ffeded;
          color: #d63d3d;
          font-weight: 900;
          font-family: 'Nunito', sans-serif;
          cursor: pointer;
          transition: .25s;
        }

        .settings-reset:hover {
          background: #f44336;
          color: white;
          transform: translateY(-3px);
        }

        .settings-saved {
          text-align: center;
          color: #299b62;
          font-weight: 900;
          margin: 15px 0;
          min-height: 22px;
        }

        .settings-footer {
          text-align: center;
          color: var(--muted);
          margin-top: 30px;
          font-size: 14px;
        }

        @keyframes settingsAppear {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media(max-width: 600px) {
          .settings-nav { padding: 15px 4%; }
          .settings-brand { font-size: 21px; }
          .settings-back { padding: 9px 13px; font-size: 13px; }
          .settings-card { padding: 20px 16px; }
          .settings-options { gap: 8px; }
          .settings-choice { min-width: 90px; }
        }
      `}</style>

      {/* Navigation */}
      <nav className="settings-nav">
        <NavLink to="/" className="settings-brand">
          🧠 LITTLE GENIUS
        </NavLink>

        <NavLink to="/" className="settings-back">
          ← Back Home
        </NavLink>
      </nav>

      {/* Heading */}
      <header className="settings-hero">
        <span className="settings-tag">⚙️ PERSONALIZE YOUR EXPERIENCE</span>
        <h1>Settings & Preferences ✨</h1>
        <p>Make your learning world comfortable and magical!</p>
      </header>

      <main className="settings-container">
        <EducationalCard
          title="⚙️ Your Settings"
          description="Manage your Little Genius experience"
          style={{
            background: 'var(--card)',
            color: 'var(--text)',
            border: '1px solid var(--border)',
            borderRadius: '30px',
            padding: '10px'
          }}
        >
          <div className="settings-card">

            {/* Child Profile */}
            <section className="settings-section">
              <h3>👧 Child Profile</h3>
              <p className="settings-description">
                Personalize your child's learning experience.
              </p>

              <label htmlFor="childName" className="settings-description">
                Child's Name
              </label>

              <input
                id="childName"
                className="settings-input"
                type="text"
                value={childName}
                placeholder="Enter child's name"
                onChange={(e) => {
                  setChildName(e.target.value)
                  saveSetting('childName', e.target.value)
                }}
              />
            </section>

            {/* Theme */}
            <section className="settings-section">
              <h3>🎨 Appearance</h3>
              <p className="settings-description">
                Choose the theme you like.
              </p>

              <div className="settings-options">
                <button
                  className={`settings-choice ${themePreference === 'light' ? 'active' : ''}`}
                  onClick={() => changeTheme('light')}
                >
                  <span className="settings-theme-icon">☀️</span>
                  Light Mode
                </button>

                <button
                  className={`settings-choice ${themePreference === 'dark' ? 'active' : ''}`}
                  onClick={() => changeTheme('dark')}
                >
                  <span className="settings-theme-icon">🌙</span>
                  Dark Mode
                </button>
              </div>

              <p className="settings-description" style={{ marginTop: 12 }}>
                Current theme: <strong>{themePreference === 'dark' ? 'Dark Mode 🌙' : 'Light Mode ☀️'}</strong>
              </p>
            </section>

            {/* Font Size */}
            <section className="settings-section">
              <h3>🔠 Font Size</h3>
              <p className="settings-description">
                Select a comfortable text size.
              </p>

              <div className="settings-options">
                {['small', 'medium', 'large'].map(size => (
                  <button
                    key={size}
                    className={`settings-choice ${fontSize === size ? 'active' : ''}`}
                    onClick={() => changeFontSize(size)}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </button>
                ))}
              </div>
            </section>

            {/* Notifications */}
            <section className="settings-section">
              <h3>🔔 Notifications</h3>

              <button
                className="settings-toggle"
                onClick={() => {
                  const value = !notifications
                  setNotifications(value)
                  saveSetting('notifications', value)
                }}
              >
                <span>Notifications</span>
                <span className={`settings-status ${notifications ? '' : 'off'}`}>
                  {notifications ? 'ON' : 'OFF'}
                </span>
              </button>
            </section>

            {/* Sound */}
            <section className="settings-section">
              <h3>🔊 Sound Settings</h3>

              <button
                className="settings-toggle"
                onClick={() => {
                  const value = !soundEnabled
                  setSoundEnabled(value)
                  saveSetting('soundEnabled', value)

                  if (!value && 'speechSynthesis' in window) {
                    window.speechSynthesis.cancel()
                  }
                }}
              >
                <span>Learning Sounds</span>
                <span className={`settings-status ${soundEnabled ? '' : 'off'}`}>
                  {soundEnabled ? 'ON' : 'OFF'}
                </span>
              </button>
            </section>

            {/* Reset */}
            <section className="settings-section">
              <h3>🔄 Reset Preferences</h3>
              <p className="settings-description">
                Restore your settings to their default values.
              </p>

              <button
                className="settings-reset"
                onClick={handleReset}
              >
                Reset All Settings
              </button>
            </section>

            <div className="settings-saved" aria-live="polite">
              {savedMessage}
            </div>

          </div>
        </EducationalCard>
      </main>

      <footer className="settings-footer">
        🌟 Made for Little Learners 🌟
        <p>© 2026 LITTLE GENIUS – AI Learning World</p>
      </footer>

    </div>
  )
}

export default SettingsPage
