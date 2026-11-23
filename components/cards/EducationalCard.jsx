import React from 'react'

export const EducationalCard = ({ title, description, children, icon, variant = 'primary', style = {} }) => {
  const variants = {
    primary: 'bg-gradient-primary text-white',
    secondary: 'bg-secondary text-white',
    success: 'bg-success text-white',
    info: 'bg-info text-white',
  }

  return (
    <div className={`card ${variants[variant]} mb-4 rounded-3 overflow-hidden h-100`} style={style}>
      <div className="card-body p-4 d-flex flex-column">
        {icon && <div className="icon-box mb-3">{icon}</div>}
        <h5 className="card-title mb-2">{title}</h5>
        <p className="card-text flex-grow-1 small">{description}</p>
        {children}
      </div>
    </div>
  )
}
