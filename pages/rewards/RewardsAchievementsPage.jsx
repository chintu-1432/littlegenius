
import React, { useState, useEffect } from 'react'
import { useMascot } from '../../components/mascot/useMascot'
import { FunkyButton } from '../../components/buttons/FunkyButton'
import { NavLink } from 'react-router-dom'
import { EducationalCard } from '../../components/cards/EducationalCard'
import {
  getRewards,
  completeDailyReward
} from '../../utils/rewards'

const RewardsAchievementsPage = () => {
  const { celebrate } = useMascot()

  // All reward information comes from rewards.js
  const [rewardData, setRewardData] = useState(() => getRewards())
  const [message, setMessage] = useState('')

  // Refresh rewards whenever another learning page awards stars
  useEffect(() => {
    const updateRewards = () => {
      setRewardData(getRewards())
    }

    window.addEventListener('rewardsUpdated', updateRewards)

    // Also refresh when the browser tab becomes active
    window.addEventListener('focus', updateRewards)

    return () => {
      window.removeEventListener('rewardsUpdated', updateRewards)
      window.removeEventListener('focus', updateRewards)
    }
  }, [])

  const {
    stars,
    coins,
    achievements,
    dailyStreak,
    lastPlayed
  } = rewardData

  const getToday = () => {
    return new Date().toLocaleDateString('en-CA')
  }

  const dailyCompleted = lastPlayed === getToday()

  // Daily challenge
  const handleDailyChallenge = () => {
    const result = completeDailyReward()

    setRewardData(getRewards())
    setMessage(result.message)

    if (result.success) {
      celebrate()
    }
  }

  // Reset all reward progress
  const handleReset = () => {
    const confirmed = window.confirm(
      'Are you sure you want to reset all stars, coins, achievements and daily streak?'
    )

    if (!confirmed) return

    const keys = [
      'stars',
      'coins',
      'achievements',
      'dailyStreak',
      'lastPlayed'
    ]

    keys.forEach(key => localStorage.removeItem(key))

    setRewardData(getRewards())
    setMessage('Your rewards and achievements have been reset.')

    window.dispatchEvent(new Event('rewardsUpdated'))
  }

  // Achievement information
  const achievementDetails = [
    {
      id: 'star-collector-10',
      title: 'First 10 Stars',
      description: 'Earn your first 10 stars.',
      icon: '🌟',
      requirement: '10 Stars'
    },
    {
      id: 'star-collector-50',
      title: '50 Star Champion',
      description: 'Collect 50 stars.',
      icon: '🏆',
      requirement: '50 Stars'
    },
    {
      id: 'star-collector-100',
      title: '100 Star Superstar',
      description: 'Collect 100 stars.',
      icon: '👑',
      requirement: '100 Stars'
    },
    {
      id: 'coin-collector-10',
      title: 'First 10 Coins',
      description: 'Collect 10 coins.',
      icon: '🪙',
      requirement: '10 Coins'
    }
  ]

  return (
    <div className="rewards-page">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&display=swap');

        .rewards-page {
          min-height: 100vh;
          padding-bottom: 45px;
          background: linear-gradient(135deg, #f5f1ff, #eef8ff, #fff5fa);
          color: #40345f;
          font-family: 'Nunito', sans-serif;
        }

        .rewards-navbar {
          background: rgba(255,255,255,.95);
          padding: 18px 6%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 5px 20px rgba(70,50,120,.08);
        }

        .rewards-brand {
          font-family: 'Fredoka', cursive;
          color: #8057e5;
          font-size: 26px;
          font-weight: 700;
          text-decoration: none;
        }

        .rewards-back {
          background: #f1eaff;
          color: #8057e5;
          padding: 11px 20px;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 800;
          transition: .25s;
        }

        .rewards-back:hover {
          background: #8057e5;
          color: white;
          transform: translateY(-3px);
        }

        .rewards-hero {
          text-align: center;
          padding: 45px 15px 25px;
        }

        .rewards-tag {
          display: inline-block;
          padding: 10px 22px;
          border-radius: 30px;
          background: #e9dfff;
          color: #8057e5;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        .rewards-hero h1 {
          font-family: 'Fredoka', cursive;
          color: #8057e5;
          font-size: clamp(32px, 5vw, 48px);
          margin: 18px 0 8px;
        }

        .rewards-hero p {
          color: #85809b;
          font-size: 17px;
        }

        .rewards-container {
          width: min(900px, 92%);
          margin: auto;
        }

        .rewards-main-card {
          background: white;
          border-radius: 30px;
          padding: 30px;
          box-shadow: 0 18px 45px rgba(80,60,140,.12);
          border: 2px solid white;
          animation: rewardAppear .5s ease;
        }

        .rewards-title {
          text-align: center;
          font-family: 'Fredoka', cursive;
          font-size: 29px;
          color: #8057e5;
        }

        .rewards-subtitle {
          text-align: center;
          color: #938ba5;
          margin-bottom: 25px;
        }

        .rewards-balance {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
          margin: 25px 0;
        }

        .reward-box {
          text-align: center;
          padding: 25px 12px;
          border-radius: 23px;
          transition: .3s;
        }

        .reward-box:hover {
          transform: translateY(-6px);
        }

        .stars-box {
          background: linear-gradient(135deg, #fff4c9, #ffeb9e);
        }

        .coins-box {
          background: linear-gradient(135deg, #dff6ff, #c7eaff);
        }

        .reward-icon {
          font-size: 38px;
        }

        .reward-value {
          font-family: 'Fredoka', cursive;
          font-size: 48px;
          font-weight: 700;
          color: #604b8f;
        }

        .reward-label {
          font-weight: 900;
          color: #76698d;
        }

        .reward-section {
          margin-top: 30px;
          padding: 23px;
          border-radius: 22px;
          background: #f8f5ff;
        }

        .reward-section h2 {
          font-family: 'Fredoka', cursive;
          color: #8057e5;
          font-size: 25px;
          margin-bottom: 8px;
        }

        .reward-section-description {
          color: #938ba5;
          margin-bottom: 18px;
          font-size: 14px;
        }

        .achievement-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }

        .achievement-item {
          padding: 18px;
          border-radius: 18px;
          background: white;
          border: 2px solid #eee8ff;
          transition: .25s;
        }

        .achievement-item.unlocked {
          background: linear-gradient(135deg, #fff5ce, #fff0bd);
          border-color: #ffdc75;
        }

        .achievement-item:hover {
          transform: translateY(-4px);
        }

        .achievement-icon {
          font-size: 34px;
        }

        .achievement-item h3 {
          font-family: 'Fredoka', cursive;
          font-size: 18px;
          color: #68518f;
          margin: 9px 0 5px;
        }

        .achievement-item p {
          color: #9187a3;
          font-size: 13px;
          margin: 0;
        }

        .achievement-status {
          display: inline-block;
          margin-top: 12px;
          padding: 5px 11px;
          border-radius: 20px;
          background: #eeeaff;
          color: #8057e5;
          font-size: 11px;
          font-weight: 900;
        }

        .achievement-item.unlocked .achievement-status {
          background: #d5f5dc;
          color: #27834a;
        }

        .streak-card {
          padding: 25px;
          border-radius: 22px;
          background: linear-gradient(135deg, #e4f8e9, #d7f4ff);
          margin-top: 25px;
          text-align: center;
        }

        .streak-card h2 {
          font-family: 'Fredoka', cursive;
          color: #238b65;
          font-size: 26px;
        }

        .streak-number {
          font-family: 'Fredoka', cursive;
          font-size: 55px;
          color: #238b65;
          margin: 10px 0;
        }

        .streak-description {
          color: #537b70;
          font-weight: 700;
        }

        .streak-reward {
          display: inline-block;
          margin: 10px 0 18px;
          padding: 9px 17px;
          background: rgba(255,255,255,.7);
          color: #26835f;
          border-radius: 20px;
          font-weight: 900;
        }

        .reward-message {
          padding: 14px;
          background: #e5f8ec;
          color: #23834c;
          border-radius: 15px;
          text-align: center;
          font-weight: 900;
          margin-top: 20px;
          animation: rewardAppear .3s ease;
        }

        .reward-reset {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 17px;
          background: #ffeded;
          color: #d63d3d;
          font-weight: 900;
          cursor: pointer;
          transition: .25s;
        }

        .reward-reset:hover {
          background: #f44336;
          color: white;
          transform: translateY(-3px);
        }

        .rewards-footer {
          text-align: center;
          color: #938ba5;
          margin-top: 30px;
        }

        @keyframes rewardAppear {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media(max-width: 600px) {
          .rewards-navbar { padding: 15px 4%; }
          .rewards-brand { font-size: 20px; }
          .rewards-back { padding: 9px 12px; font-size: 13px; }
          .rewards-main-card { padding: 18px; }
          .rewards-balance { gap: 10px; }
          .reward-value { font-size: 38px; }
          .achievement-grid { grid-template-columns: 1fr; }
          .reward-section { padding: 17px; }
        }
      `}</style>

      {/* Navigation */}
      <nav className="rewards-navbar">
        <NavLink to="/" className="rewards-brand">
          🧠 LITTLE GENIUS
        </NavLink>

        <NavLink to="/" className="rewards-back">
          ← Back Home
        </NavLink>
      </nav>

      {/* Hero */}
      <header className="rewards-hero">
        <span className="rewards-tag">
          ✨ YOUR MAGICAL REWARDS
        </span>

        <h1>Rewards & Achievements 🏆</h1>

        <p>Every little step makes you a superstar!</p>
      </header>

      <main className="rewards-container">
        <div className="rewards-main-card">

          <h2 className="rewards-title">
            🎁 Your Treasure Collection
          </h2>

          <p className="rewards-subtitle">
            Keep learning and collect amazing rewards!
          </p>

          {/* Stars and Coins */}
          <div className="rewards-balance">
            <div className="reward-box stars-box">
              <div className="reward-icon">⭐</div>
              <div className="reward-value">{stars}</div>
              <div className="reward-label">Total Stars</div>
            </div>

            <div className="reward-box coins-box">
              <div className="reward-icon">🪙</div>
              <div className="reward-value">{coins}</div>
              <div className="reward-label">Total Coins</div>
            </div>
          </div>

          {/* Achievements */}
          <section className="reward-section">
            <h2>🏅 My Achievements</h2>

            <p className="reward-section-description">
              Unlock badges by collecting stars and coins.
            </p>

            <div className="achievement-grid">
              {achievementDetails.map(item => {
                const unlocked = achievements.includes(item.id)

                return (
                  <div
                    key={item.id}
                    className={`achievement-item ${unlocked ? 'unlocked' : ''}`}
                  >
                    <div className="achievement-icon">
                      {unlocked ? item.icon : '🔒'}
                    </div>

                    <h3>{item.title}</h3>

                    <p>{item.description}</p>

                    <span className="achievement-status">
                      {unlocked ? '✓ UNLOCKED' : item.requirement}
                    </span>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Daily Challenge */}
          <section className="streak-card">
            <h2>🔥 Daily Learning Challenge</h2>

            <p className="streak-description">
              Learn every day and build your learning streak!
            </p>

            <div className="streak-number">
              {dailyStreak} 🔥
            </div>

            <p className="streak-description">
              Day{dailyStreak !== 1 ? 's' : ''} in a row
            </p>

            <div className="streak-reward">
              🎁 Reward: 5 Stars + 2 Coins
            </div>

            <FunkyButton
              onClick={handleDailyChallenge}
              disabled={dailyCompleted}
              style={{
                width: '100%',
                background: dailyCompleted
                  ? '#9daea3'
                  : 'linear-gradient(110deg, #38b978, #55c7a0)',
                color: 'white',
                opacity: dailyCompleted ? 0.8 : 1
              }}
            >
              {dailyCompleted
                ? '✓ Challenge Completed Today'
                : '🎯 Complete Daily Challenge'}
            </FunkyButton>
          </section>

          {/* Feedback */}
          {message && (
            <div className="reward-message" role="status">
              {message}
            </div>
          )}

          {/* Reset */}
          <section className="reward-section">
            <h2>🔄 Reset Progress</h2>

            <p className="reward-section-description">
              Reset your stars, coins, achievements and daily streak.
            </p>

            <button
              className="reward-reset"
              onClick={handleReset}
            >
              Reset All Progress
            </button>
          </section>

        </div>
      </main>

      <footer className="rewards-footer">
        🌟 Keep Learning, Keep Shining! 🌟
        <p>© 2026 LITTLE GENIUS – AI Learning World</p>
      </footer>

    </div>
  )
}

export default RewardsAchievementsPage
