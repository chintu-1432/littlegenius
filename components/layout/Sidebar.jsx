
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faHouse,
  faBook,
  faHashtag,
  faPalette,
  faPaw,
  faLeaf,
  faMusic,
  faTrophy,
  faGear,
  faUsers
} from '@fortawesome/free-solid-svg-icons';

const sections = [
  { path: '/home', icon: faHouse, label: 'Home' },
  { path: '/abc-world', icon: faBook, label: 'ABC World' },
  { path: '/number-kingdom', icon: faHashtag, label: 'Number Kingdom' },
  { path: '/color-garden', icon: faPalette, label: 'Color Garden' },
  { path: '/animal-safari', icon: faPaw, label: 'Animal Safari' },
  { path: '/shape-adventure', icon: faLeaf, label: 'Shape Adventure' },
  { path: '/mini-games', icon: faMusic, label: 'Mini Games' },
  { path: '/voice-learning', icon: faMusic, label: 'Voice Learning' },
  { path: '/rewards', icon: faTrophy, label: 'Rewards' },
  { path: '/parent-dashboard', icon: faUsers, label: 'Parent' },
  { path: '/settings', icon: faGear, label: 'Settings' },
];

export function SidebarLayout({ children }) {
  return (
    <aside
      className="col-md-3 col-lg-2 bg-gradient d-none d-lg-block"
      style={{
        height: 'calc(100vh - 120px)',
        borderRight: '1px solid #e3e6f0'
      }}
    >
      <div className="position-sticky pt-3">
        <nav className="nav flex-column pt-3">
          {sections.map((section) => (
            <NavLink
              key={section.path}
              to={section.path}
              className={({ isActive }) =>
                `nav-link py-2 px-3 rounded mb-1 text-start ${
                  isActive ? 'active' : ''
                }`
              }
              style={{
                color: '#555',
                fontFamily: "'Nunito', sans-serif",
                fontSize: '0.875rem',
                transition: 'all 0.2s',
              }}
            >
              <FontAwesomeIcon
                icon={section.icon}
                className="me-2"
                style={{ fontSize: '0.75rem' }}
              />
              {section.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
