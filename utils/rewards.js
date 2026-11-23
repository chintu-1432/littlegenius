
const read = (key, fallback) => {
  try {
    const value = localStorage.getItem(key)
    return value !== null ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

const write = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getRewards = () => ({
  stars: read('stars', 0),
  coins: read('coins', 0),
  achievements: read('achievements', []),
  dailyStreak: read('dailyStreak', 0),
  lastPlayed: read('lastPlayed', '')
})

export const awardRewards = ({ stars = 0, coins = 0 } = {}) => {
  const current = getRewards()

  const newStars = current.stars + stars
  const newCoins = current.coins + coins

  const achievements = [...current.achievements]

  const milestones = [
    { id: 'star-collector-10', condition: newStars >= 10 },
    { id: 'star-collector-50', condition: newStars >= 50 },
    { id: 'star-collector-100', condition: newStars >= 100 },
    { id: 'coin-collector-10', condition: newCoins >= 10 }
  ]

  milestones.forEach(item => {
    if (item.condition && !achievements.includes(item.id)) {
      achievements.push(item.id)
    }
  })

  write('stars', newStars)
  write('coins', newCoins)
  write('achievements', achievements)

  window.dispatchEvent(new Event('rewardsUpdated'))

  return {
    stars: newStars,
    coins: newCoins,
    achievements
  }
}

export const completeDailyReward = () => {
  const current = getRewards()

  const today = new Date().toLocaleDateString('en-CA')

  if (current.lastPlayed === today) {
    return {
      success: false,
      message: 'You have already completed today’s challenge!'
    }
  }

  const yesterdayDate = new Date()
  yesterdayDate.setDate(yesterdayDate.getDate() - 1)

  const yesterday = yesterdayDate.toLocaleDateString('en-CA')

  const newStreak =
    current.lastPlayed === yesterday
      ? current.dailyStreak + 1
      : 1

  write('dailyStreak', newStreak)
  write('lastPlayed', today)

  awardRewards({ stars: 5, coins: 2 })

  return {
    success: true,
    dailyStreak: newStreak,
    message: 'Amazing! You earned 5 stars and 2 coins!'
  }
}
