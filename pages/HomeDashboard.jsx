
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useMascot } from '../components/mascot/useMascot'

const HomeDashboard = () => {
  const navigate = useNavigate()
  const { celebrate } = useMascot()

  const [stars, setStars] = useState(0)
  const [completed, setCompleted] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [greeting, setGreeting] = useState('Welcome back, Little Explorer!')
  const [speaking, setSpeaking] = useState(false)

  const modules = [
    {
      path: '/abc-world',
      title: 'ABC World',
      description: 'Learn letters A–Z with pronunciation, tracing and quizzes.',
      icon: '🔤',
      color: '#8057E5',
      background: '#F0E9FF',
      label: 'Letters',
      progress: 75,
    },
    {
      path: '/number-kingdom',
      title: 'Number Kingdom',
      description: 'Discover numbers, counting and fun math activities.',
      icon: '🔢',
      color: '#229BCB',
      background: '#E5F7FF',
      label: 'Numbers',
      progress: 60,
    },
    {
      path: '/color-garden',
      title: 'Color Garden',
      description: 'Explore beautiful colors and learn color mixing.',
      icon: '🎨',
      color: '#D89A19',
      background: '#FFF6D9',
      label: 'Colors',
      progress: 45,
    },
    {
      path: '/animal-safari',
      title: 'Animal Safari',
      description: 'Meet amazing animals and discover their sounds.',
      icon: '🦁',
      color: '#E76B9C',
      background: '#FFEAF2',
      label: 'Animals',
      progress: 80,
    },
    {
      path: '/shape-adventure',
      title: 'Shape Adventure',
      description: 'Discover circles, squares, triangles and more.',
      icon: '🔷',
      color: '#249D75',
      background: '#E4F8EF',
      label: 'Shapes',
      progress: 35,
    },
    {
      path: '/mini-games',
      title: 'Mini Games',
      description: 'Play exciting games while learning new things.',
      icon: '🎮',
      color: '#E9824B',
      background: '#FFF0E6',
      label: 'Games',
      progress: 20,
    },
  ]

  useEffect(() => {
    setStars(Number(localStorage.getItem('stars') || 0))

    const savedCompleted = JSON.parse(
      localStorage.getItem('completedModules') || '[]'
    )

    setCompleted(Array.isArray(savedCompleted) ? savedCompleted : [])
  }, [])

  const speak = (message) => {
    if (!('speechSynthesis' in window)) {
      setGreeting('Your browser does not support voice greetings.')
      return
    }

    window.speechSynthesis.cancel()

    const speech = new SpeechSynthesisUtterance(message)
    speech.lang = 'en-US'
    speech.rate = 0.88
    speech.pitch = 1.1
    speech.volume = 1

    speech.onstart = () => setSpeaking(true)
    speech.onend = () => setSpeaking(false)
    speech.onerror = () => setSpeaking(false)

    window.speechSynthesis.speak(speech)
  }

  const startModule = (path) => {
    setMenuOpen(false)
    navigate(path)
  }

  const markComplete = (module) => {
    if (completed.includes(module.path)) return

    const updated = [...completed, module.path]

    setCompleted(updated)
    localStorage.setItem('completedModules', JSON.stringify(updated))

    const updatedStars = stars + 10
    setStars(updatedStars)
    localStorage.setItem('stars', String(updatedStars))

    celebrate()
  }

  const totalProgress = Math.round(
    modules.reduce((total, item) => total + item.progress, 0) /
      modules.length
  )

  return (
    <div style={styles.page}>

      {/* Floating background decorations */}
      <div style={styles.decorations} aria-hidden="true">
        <span style={{ ...styles.float, top: '12%', left: '3%' }}>⭐</span>
        <span style={{ ...styles.float, top: '34%', right: '4%' }}>🌈</span>
        <span style={{ ...styles.float, top: '62%', left: '2%' }}>✨</span>
        <span style={{ ...styles.float, top: '82%', right: '5%' }}>🎈</span>
        <span style={{ ...styles.float, top: '48%', left: '92%' }}>💖</span>
      </div>

      {/* Navigation */}
      <nav style={styles.navbar}>
        <NavLink to="/" style={styles.logo}>
          🧠 LITTLE GENIUS
        </NavLink>

        <button
          style={styles.menuButton}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <div
          style={{
            ...styles.navLinks,
            ...(menuOpen ? styles.navLinksOpen : {}),
          }}
        >
          <NavLink to="/" style={styles.navLink} onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/voice-learning" style={styles.navLink} onClick={() => setMenuOpen(false)}>
            Voice Learning
          </NavLink>
          <NavLink to="/rewards" style={styles.navLink} onClick={() => setMenuOpen(false)}>
            Rewards
          </NavLink>
          <NavLink to="/parent-dashboard" style={styles.navLink} onClick={() => setMenuOpen(false)}>
            Parents
          </NavLink>
          <NavLink to="/settings" style={styles.navLink} onClick={() => setMenuOpen(false)}>
            Settings
          </NavLink>
        </div>

        <div style={styles.starPill}>⭐ {stars} Stars</div>
      </nav>

      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>
            ✨ YOUR MAGICAL LEARNING WORLD
          </div>

          <h1 style={styles.heroTitle}>
            Hello, Little Explorer!
            <span style={styles.heroHighlight}>
              Let's Learn & Play!
            </span>
          </h1>

          <p style={styles.heroDescription}>
            Every day is a new adventure. Explore letters, numbers,
            colors, animals and shapes in your magical learning world.
          </p>

          <div style={styles.heroButtons}>
            <button
              style={styles.primaryButton}
              onClick={() => startModule('/abc-world')}
            >
              🚀 Start Learning
            </button>

            <button
              style={styles.secondaryButton}
              onClick={() => speak('Hello little explorer! Welcome to Little Genius. Let us learn and play together!')}
            >
              {speaking ? '🔊 Speaking...' : '🎤 Talk to GENI'}
            </button>
          </div>

          <div style={styles.heroFeatures}>
            <span>🌈 Fun Activities</span>
            <span>⭐ Earn Stars</span>
            <span>🎮 Play & Learn</span>
          </div>
        </div>

        {/* Mascot */}
        <div style={styles.mascotArea}>
          <div style={styles.mascotGlow} />

          <div style={styles.mascotCircle}>
            <span style={styles.mascot}>🦉</span>
          </div>

          <div style={styles.mascotMessage}>
            Hi! I'm GENI 👋
          </div>

          <span style={{ ...styles.mascotDecoration, top: '4%', right: '9%' }}>⭐</span>
          <span style={{ ...styles.mascotDecoration, bottom: '18%', left: '5%' }}>✨</span>
          <span style={{ ...styles.mascotDecoration, top: '24%', left: '4%' }}>💜</span>
        </div>
      </section>

      {/* Learning summary */}
      <section style={styles.summarySection}>
        <div style={styles.summaryCard}>
          <span style={styles.summaryIcon}>📚</span>
          <div>
            <strong>{modules.length}</strong>
            <span>Learning Worlds</span>
          </div>
        </div>

        <div style={styles.summaryCard}>
          <span style={styles.summaryIcon}>🏆</span>
          <div>
            <strong>{stars}</strong>
            <span>Total Stars</span>
          </div>
        </div>

        <div style={styles.summaryCard}>
          <span style={styles.summaryIcon}>✅</span>
          <div>
            <strong>{completed.length}</strong>
            <span>Completed Worlds</span>
          </div>
        </div>

        <div style={styles.summaryCard}>
          <span style={styles.summaryIcon}>📈</span>
          <div>
            <strong>{totalProgress}%</strong>
            <span>Learning Progress</span>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section style={styles.learningSection}>
        <div style={styles.sectionHeading}>
          <span style={styles.sectionLabel}>CHOOSE YOUR ADVENTURE</span>
          <h2>Explore Your Learning Worlds 🌍</h2>
          <p>Choose a world and discover something wonderful today!</p>
        </div>

        <div style={styles.moduleGrid}>
          {modules.map((module, index) => {
            const isCompleted = completed.includes(module.path)

            return (
              <article
                key={module.path}
                style={{
                  ...styles.moduleCard,
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div style={styles.moduleTop}>
                  <span
                    style={{
                      ...styles.moduleIcon,
                      background: module.background,
                    }}
                  >
                    {module.icon}
                  </span>

                  <span
                    style={{
                      ...styles.moduleTag,
                      color: module.color,
                      background: module.background,
                    }}
                  >
                    {module.label}
                  </span>
                </div>

                <h3 style={styles.moduleTitle}>{module.title}</h3>

                <p style={styles.moduleDescription}>
                  {module.description}
                </p>

                <div style={styles.progressInfo}>
                  <span>Learning Progress</span>
                  <strong>{module.progress}%</strong>
                </div>

                <div style={styles.progressTrack}>
                  <div
                    style={{
                      ...styles.progressFill,
                      width: `${module.progress}%`,
                      background: module.color,
                    }}
                  />
                </div>

                <div style={styles.cardButtons}>
                  <button
                    style={{
                      ...styles.exploreButton,
                      background: module.color,
                    }}
                    onClick={() => startModule(module.path)}
                  >
                    Explore Now →
                  </button>

                  <button
                    style={{
                      ...styles.completeButton,
                      color: isCompleted ? '#25834D' : module.color,
                      background: isCompleted ? '#E3F7E9' : module.background,
                    }}
                    onClick={() => markComplete(module)}
                    disabled={isCompleted}
                  >
                    {isCompleted ? '✓ Completed' : '+ Finish'}
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* Motivational banner */}
      <section style={styles.banner}>
        <div>
          <span style={styles.bannerLabel}>🌟 KEEP EXPLORING!</span>
          <h2>You're doing an amazing job!</h2>
          <p>Every little step makes you a brilliant learner.</p>
        </div>

        <div style={styles.bannerEmoji}>🏆</div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerLogo}>🧠 LITTLE GENIUS</div>
        <p>Learn • Play • Explore • Grow</p>
        <small>
          © {new Date().getFullYear()} LITTLE GENIUS – AI Learning World
        </small>
      </footer>

      {/* Internal responsive CSS and animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800;900&display=swap');

        * {
          box-sizing: border-box;
        }

        .genius-module-card {
          animation: cardEntrance 0.7s ease both;
        }

        @keyframes cardEntrance {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes floatAround {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-20px) rotate(8deg); }
        }

        @keyframes mascotFloat {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-14px) rotate(3deg); }
        }

        @keyframes glowPulse {
          0%, 100% { transform: scale(0.94); opacity: .35; }
          50% { transform: scale(1.08); opacity: .6; }
        }

        @keyframes progressGrow {
          from { width: 0; }
        }

        @media (max-width: 850px) {
          .home-hero {
            grid-template-columns: 1fr !important;
            text-align: center;
          }

          .home-hero-buttons,
          .home-hero-features {
            justify-content: center !important;
          }

          .home-module-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }

          .home-nav-links {
            display: none !important;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            padding: 18px;
            box-shadow: 0 10px 20px #45356b18;
          }

          .home-nav-links.mobile-open {
            display: flex !important;
            flex-direction: column;
            align-items: stretch;
          }

          .home-menu-button {
            display: block !important;
          }
        }

        @media (max-width: 520px) {
          .home-hero {
            padding: 38px 18px !important;
          }

          .home-hero-title {
            font-size: 37px !important;
          }

          .home-module-grid {
            grid-template-columns: 1fr !important;
          }

          .home-summary {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .home-banner {
            flex-direction: column;
            text-align: center;
          }

          .home-mascot-circle {
            width: 190px !important;
            height: 190px !important;
          }

          .home-mascot {
            font-size: 110px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .home-dashboard *,
          .home-dashboard *::before,
          .home-dashboard *::after {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(140deg, #F7F3FF, #F0F9FF, #FFF8EE)',
    color: '#403751',
    fontFamily: "'Nunito', sans-serif",
    overflow: 'hidden',
    position: 'relative',
  },
  decorations: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
  },
  float: {
    position: 'absolute',
    fontSize: '36px',
    opacity: 0.2,
    animation: 'floatAround 6s ease-in-out infinite',
  },
  navbar: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '15px',
    padding: '15px 5%',
    background: 'rgba(255,255,255,0.92)',
    backdropFilter: 'blur(15px)',
    boxShadow: '0 4px 20px rgba(60,40,100,0.06)',
  },
  logo: {
    color: '#8057E5',
    fontFamily: "'Fredoka', cursive",
    fontSize: '23px',
    fontWeight: 700,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
  },
  navLinksOpen: {
    display: 'flex',
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    padding: '18px',
    flexDirection: 'column',
    background: 'white',
    boxShadow: '0 10px 20px rgba(60,40,100,0.10)',
  },
  navLink: {
    color: '#69647A',
    fontSize: '13px',
    fontWeight: 800,
    textDecoration: 'none',
  },
  menuButton: {
    display: 'none',
    border: 'none',
    background: '#F0EAFF',
    color: '#8057E5',
    padding: '9px 13px',
    borderRadius: '10px',
    fontSize: '22px',
    cursor: 'pointer',
  },
  starPill: {
    background: '#FFF1CB',
    color: '#946D1E',
    padding: '10px 16px',
    borderRadius: '30px',
    fontWeight: 900,
    whiteSpace: 'nowrap',
  },
  hero: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 0.9fr',
    alignItems: 'center',
    gap: '30px',
    padding: '65px 8%',
    position: 'relative',
    zIndex: 1,
  },
  heroContent: {
    animation: 'cardEntrance .8s ease both',
  },
  heroBadge: {
    display: 'inline-block',
    padding: '10px 16px',
    borderRadius: '30px',
    background: '#EEE8FF',
    color: '#8057E5',
    fontSize: '11px',
    fontWeight: 900,
    letterSpacing: '1px',
  },
  heroTitle: {
    fontFamily: "'Fredoka', cursive",
    fontSize: 'clamp(38px, 5vw, 61px)',
    lineHeight: 1.12,
    color: '#43375E',
    margin: '22px 0',
  },
  heroHighlight: {
    display: 'block',
    color: '#8057E5',
  },
  heroDescription: {
    color: '#77738A',
    fontSize: '16px',
    lineHeight: 1.8,
    maxWidth: '540px',
  },
  heroButtons: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginTop: '25px',
  },
  primaryButton: {
    border: 'none',
    borderRadius: '14px',
    padding: '15px 23px',
    background: 'linear-gradient(110deg, #8057E5, #55A8EB)',
    color: 'white',
    fontFamily: "'Fredoka', cursive",
    fontSize: '17px',
    cursor: 'pointer',
    boxShadow: '0 8px 20px #8057E540',
  },
  secondaryButton: {
    border: '1px solid #E5DDF8',
    borderRadius: '14px',
    padding: '15px 20px',
    background: 'white',
    color: '#8057E5',
    fontFamily: "'Fredoka', cursive",
    fontSize: '16px',
    cursor: 'pointer',
  },
  heroFeatures: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '17px',
    marginTop: '25px',
    color: '#807A94',
    fontSize: '13px',
    fontWeight: 900,
  },
  mascotArea: {
    minHeight: '340px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  mascotGlow: {
    position: 'absolute',
    width: '270px',
    height: '270px',
    borderRadius: '50%',
    background: '#C9B7FF',
    filter: 'blur(60px)',
    animation: 'glowPulse 4s ease-in-out infinite',
  },
  mascotCircle: {
    position: 'relative',
    width: '245px',
    height: '245px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(145deg, white, #EEE6FF)',
    boxShadow: '0 20px 50px #5D429D25',
    animation: 'mascotFloat 3s ease-in-out infinite',
  },
  mascot: {
    fontSize: '140px',
  },
  mascotMessage: {
    position: 'relative',
    marginTop: '20px',
    padding: '12px 20px',
    background: 'white',
    borderRadius: '30px',
    color: '#8057E5',
    fontFamily: "'Fredoka', cursive",
    fontSize: '17px',
    boxShadow: '0 5px 18px #503C7815',
  },
  mascotDecoration: {
    position: 'absolute',
    fontSize: '30px',
    animation: 'floatAround 4s ease-in-out infinite',
  },
  summarySection: {
    position: 'relative',
    zIndex: 1,
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: '15px',
    padding: '10px 7% 35px',
  },
  summaryCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '13px',
    background: 'white',
    padding: '18px',
    borderRadius: '18px',
    boxShadow: '0 7px 22px #46336F0D',
  },
  summaryIcon: {
    fontSize: '30px',
  },
  learningSection: {
    position: 'relative',
    zIndex: 1,
    padding: '35px 7% 65px',
  },
  sectionHeading: {
    textAlign: 'center',
    marginBottom: '35px',
  },
  sectionLabel: {
    color: '#8057E5',
    fontSize: '11px',
    fontWeight: 900,
    letterSpacing: '3px',
  },
  moduleGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '20px',
  },
  moduleCard: {
    background: 'white',
    border: '1px solid #EEE9F5',
    borderRadius: '22px',
    padding: '23px',
    boxShadow: '0 8px 24px #4332690D',
    animation: 'cardEntrance .7s ease both',
    transition: 'transform .25s, box-shadow .25s',
  },
  moduleTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moduleIcon: {
    width: '68px',
    height: '68px',
    borderRadius: '19px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '38px',
  },
  moduleTag: {
    padding: '7px 12px',
    borderRadius: '30px',
    fontSize: '11px',
    fontWeight: 900,
  },
  moduleTitle: {
    fontFamily: "'Fredoka', cursive",
    fontSize: '23px',
    color: '#403751',
    margin: '17px 0 7px',
  },
  moduleDescription: {
    color: '#858094',
    fontSize: '13px',
    lineHeight: 1.7,
    minHeight: '45px',
  },
  progressInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '17px 0 8px',
    color: '#898398',
    fontSize: '12px',
    fontWeight: 800,
  },
  progressTrack: {
    height: '8px',
    background: '#F0EDF5',
    borderRadius: '20px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: '20px',
    transition: 'width .8s ease',
  },
  cardButtons: {
    display: 'flex',
    gap: '8px',
    marginTop: '20px',
  },
  exploreButton: {
    flex: 1,
    border: 'none',
    borderRadius: '11px',
    color: 'white',
    padding: '12px 8px',
    fontWeight: 900,
    cursor: 'pointer',
  },
  completeButton: {
    border: 'none',
    borderRadius: '11px',
    padding: '12px 10px',
    fontWeight: 900,
    cursor: 'pointer',
    fontSize: '12px',
  },
  banner: {
    position: 'relative',
    zIndex: 1,
    margin: '0 7% 55px',
    padding: '30px 35px',
    borderRadius: '23px',
    background: 'linear-gradient(110deg, #8057E5, #55A8EB)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
    boxShadow: '0 14px 35px #8057E52E',
  },
  bannerLabel: {
    fontSize: '11px',
    letterSpacing: '2px',
    fontWeight: 900,
  },
  bannerEmoji: {
    fontSize: '75px',
  },
  footer: {
    textAlign: 'center',
    padding: '35px 15px',
    background: 'rgba(255,255,255,.8)',
    color: '#858094',
  },
  footerLogo: {
    color: '#8057E5',
    fontFamily: "'Fredoka', cursive",
    fontSize: '23px',
    fontWeight: 700,
  },
}

export default HomeDashboard
