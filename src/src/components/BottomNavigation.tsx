/**
 * Bottom Navigation Component
 * Native Android-style bottom navigation bar
 */

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NavItem } from '../types';

// Navigation items configuration
const navItems: NavItem[] = [
  { path: '/', icon: 'fa-home', label: 'Home' },
  { path: '/ingredients', icon: 'fa-carrot', label: 'Create' },
  { path: '/favorites', icon: 'fa-heart', label: 'Favorites' },
];

const BottomNavigation: React.FC = () => {
  const location = useLocation();

  // Don't show on welcome page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <nav className="bottom-nav" role="navigation" aria-label="Main navigation">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `nav-item ${isActive ? 'active' : ''}`
          }
          aria-label={item.label}
        >
          <i className={`fas ${item.icon}`}></i>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNavigation;
