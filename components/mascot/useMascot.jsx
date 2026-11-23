import { useState, useEffect } from 'react'

export function useMascot() {
  const [isCelebrating, setIsCelebrating] = useState(false)
  const [mascotExpression, setMasotExpression] = useState('normal')

  const greet = () => {
    setMasotExpression('happy')
    setTimeout(() => setMasotExpression('normal'), 2000)
  }

  const celebrate = () => {
    setIsCelebrating(true)
    setMasotExpression('celebration')
    createConfetti()
    setTimeout(() => {
      setIsCelebrating(false)
      setMasotExpression('normal')
    }, 3000)
  }

  const createConfetti = () => {
    const colors = ['#8057E5', '#55C7F2', '#FFD95A', '#FF83B5', '#70DDB0']
    for (let i = 0; i < 20; i++) {
      const confetti = document.createElement('div')
      confetti.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${Math.random() * 100}%;
        top: -10px;
        z-index: 10000;
        pointer-events: none;
        animation: fall 3s ease-out forwards
      `
      confetti.style.animationDelay = `${i * 0.1}s`
      document.body.appendChild(confetti)
      setTimeout(() => confetti.remove(), 3000)
    }
    const style = document.createElement('style')
    style.textContent = `
      @keyframes fall {
        to {
          transform: translateY(100%) rotate(720deg);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)
  }

  return { greet, celebrate, isCelebrating, mascotExpression }
}
