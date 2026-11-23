import React from 'react'

export const FunkyButton = ({ children, onClick, variant = 'primary', size = 'md', className = '', ...props }) => {
  const variants = {
    primary: 'bg-gradient-primary text-white',
    secondary: 'bg-secondary text-white',
    success: 'bg-success text-white',
    danger: 'bg-danger text-white',
    warning: 'bg-warning text-dark',
    info: 'bg-info text-white',
    light: 'bg-light text-dark',
    dark: 'bg-dark text-white',
  }
  const sizes = {
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-5 py-4',
  }

  return (
    <button
      onClick={onClick}
      className={`btn ${variants[variant]} ${sizes[size]} rounded-pill ${className}`}
      style={{
        fontFamily: "'Fredoka', cursive",
        fontWeight: 600,
        transition: 'all 0.2s ease',
        transform: 'scale(1)',
        boxShadow: '0 2px 8px rgba(128, 87, 229, 0.3)',
      }}
      {...props}
    >
      {children}
    </button>
  )
}
