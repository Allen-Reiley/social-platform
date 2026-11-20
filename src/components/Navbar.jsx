import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { getInitials } from '../utils/validation';
import styles from './Navbar.module.css';

/**
 * Navbar Component
 * Renders the persistent header navigation bar using React Router NavLink components.
 * Strictly adheres to client-side routing with zero full-page reloads.
 */
function Navbar() {
  const { user } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toggle mobile navigation drawer
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  // Close mobile navigation drawer upon selecting a link
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar} aria-label="Main Navigation">
        {/* Brand identity using React Router Link */}
        <Link to="/" className={styles.brand} onClick={closeMobileMenu}>
          <div className={styles.logoBadge} aria-hidden="true">
            RC
          </div>
          <span>Richfield Connect</span>
        </Link>

        {/* Mobile Hamburger Button */}
        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
          type="button"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Client-side Navigation Links using NavLink */}
        <ul className={`${styles.navLinks} ${mobileMenuOpen ? styles.navLinksOpen : ''}`}>
          <li className={styles.navItem}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
              onClick={closeMobileMenu}
              end
            >
              Home
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/feed"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
              onClick={closeMobileMenu}
            >
              Feed
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
              onClick={closeMobileMenu}
            >
              Sign Up
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
              onClick={closeMobileMenu}
            >
              Profile
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
              onClick={closeMobileMenu}
            >
              About
            </NavLink>
          </li>

          {/* Quick profile indicator if student is registered */}
          {user && (
            <li className={styles.navItem}>
              <Link
                to="/profile"
                className={styles.userBadge}
                onClick={closeMobileMenu}
                title={`Logged in as ${user.fullName}`}
              >
                <div className={styles.initialsBubble}>{getInitials(user.fullName)}</div>
                <span>{user.fullName.split(' ')[0]}</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
