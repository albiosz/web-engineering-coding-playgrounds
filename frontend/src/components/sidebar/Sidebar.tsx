import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUsers,
  faProjectDiagram,
  faBlog,
  faBars,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import './sidebar.css';

/**
 * Navigation item interface for type safety
 */
interface NavItem {
  /** Display label for the navigation item */
  label: string;
  /** URL/path for the navigation link */
  href: string;
  /** Font Awesome icon to display */
  icon: typeof faHome;
}

/**
 * Storage key for persisting sidebar collapsed state in localStorage
 */
const SIDEBAR_COLLAPSED_KEY = 'sidebar-collapsed';

/**
 * Navigation items configuration
 * Contains all navigation links displayed in the sidebar
 */
const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#', icon: faHome },
  { label: 'Our team', href: '#', icon: faUsers },
  { label: 'Projects', href: '#', icon: faProjectDiagram },
  { label: 'Blog', href: '#', icon: faBlog },
];

/**
 * Sidebar Component
 *
 * A modern, collapsible left-side navigation component that provides:
 * - Navigation links with Font Awesome icons
 * - Collapsible/expandable toggle mechanism
 * - Active page highlighting
 * - localStorage persistence for collapsed state
 * - Responsive design (hidden on mobile, visible on tablet and desktop)
 *
 * @example
 * ```tsx
 * <Sidebar />
 * ```
 */
export const Sidebar: React.FC = () => {
  /**
   * Tracks whether the sidebar is collapsed
   * Initialized from localStorage if available, defaults to false (expanded)
   */
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
      return stored ? JSON.parse(stored) === true : false;
    } catch {
      // If localStorage is unavailable or parsing fails, default to expanded
      return false;
    }
  });

  /**
   * Tracks the currently active navigation item
   * Used to highlight the current page in the navigation
   */
  const [activeItem, setActiveItem] = useState<string>('Home');

  /**
   * Persist collapsed state to localStorage whenever it changes
   */
  useEffect(() => {
    try {
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, JSON.stringify(isCollapsed));
    } catch {
      // Silently fail if localStorage is unavailable
      console.warn('Unable to persist sidebar state to localStorage');
    }
  }, [isCollapsed]);

  /**
   * Toggle the sidebar collapsed state
   * Uses useCallback for performance optimization
   */
  const toggleSidebar = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  /**
   * Handle navigation item click
   * Sets the clicked item as active for highlighting
   *
   * @param label - The label of the clicked navigation item
   */
  const handleNavClick = useCallback(
    (label: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setActiveItem(label);
    },
    []
  );

  return (
    <aside
      className={`sidebar ${isCollapsed ? 'sidebar--collapsed' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Sidebar Toggle Button */}
      <button
        className="sidebar__toggle"
        onClick={toggleSidebar}
        aria-expanded={!isCollapsed}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <FontAwesomeIcon
          icon={isCollapsed ? faBars : faChevronLeft}
          className="sidebar__toggle-icon"
        />
      </button>

      {/* Navigation Links List */}
      <nav className="sidebar__nav">
        <ul className="sidebar__list">
          {NAV_ITEMS.map((item) => (
            <li key={item.label} className="sidebar__item">
              <a
                href={item.href}
                className={`sidebar__link ${
                  activeItem === item.label ? 'sidebar__link--active' : ''
                }`}
                onClick={handleNavClick(item.label)}
                title={item.label}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className="sidebar__icon"
                  aria-hidden="true"
                />
                <span className="sidebar__label">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
