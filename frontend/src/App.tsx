import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/sidebar/Sidebar.tsx';
import { SearchForm } from './components/search-form/SearchForm.tsx';
import { Header } from './components/header/Header.tsx';
import { Footer } from './components/footer/Footer.tsx';
import { TypesOfBear } from './components/types-of-bear-table/TypesOfBear.tsx';
import { Intro } from './components/intro/Intro.tsx';
import { HabitatsAndEatingHabits } from './components/habitats-and-eating-habits/HabitatsAndEatingHabits.tsx';
import { MatingRituals } from './components/mating-rituals/MatingRituals.tsx';
import { AboutAuthor } from './components/about-author/AboutAuthor.tsx';
import { MoreBears } from './components/more-bears/MoreBears.tsx';
import { RelatedPages } from './components/related-pages/RelatedPages.tsx';

/**
 * Storage key for persisting sidebar collapsed state
 * Must match the key used in Sidebar component
 */
const SIDEBAR_COLLAPSED_KEY = 'sidebar-collapsed';

/**
 * App Component
 *
 * Main application component that orchestrates the layout structure.
 * Features:
 * - Collapsible left sidebar navigation
 * - Search form at top of page
 * - Responsive layout that adapts to sidebar state
 * - Header and footer integration
 *
 * Layout Structure:
 * - Sidebar (fixed left side, hidden on mobile)
 * - Main content area that adjusts based on sidebar state
 *   - Header
 *   - Search Form
 *   - Main content (article + secondary aside)
 *   - Footer
 *
 * @example
 * ```tsx
 * <App />
 * ```
 */
export const App: React.FC = () => {
  /**
   * Track sidebar collapsed state for layout adjustments
   * Synced with Sidebar component via localStorage
   */
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
      return stored ? JSON.parse(stored) === true : false;
    } catch {
      return false;
    }
  });

  /**
   * Listen for localStorage changes to sync sidebar state
   * This allows the App component to react when Sidebar toggles
   */
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const stored = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
        setIsSidebarCollapsed(stored ? JSON.parse(stored) === true : false);
      } catch {
        setIsSidebarCollapsed(false);
      }
    };

    // Listen for storage events (for cross-tab sync)
    window.addEventListener('storage', handleStorageChange);

    // Also poll for changes since storage events don't fire in same window
    const interval = setInterval(handleStorageChange, 100);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  /**
   * CSS class for the app layout based on sidebar state
   */
  const appLayoutClass = useCallback(() => {
    return `app-layout ${isSidebarCollapsed ? 'app-layout--sidebar-collapsed' : ''}`;
  }, [isSidebarCollapsed]);

  return (
    <div className={appLayoutClass()}>
      {/* Left Sidebar Navigation - Hidden on mobile */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="app-content">
        <Header />
        <SearchForm />

        <main>
          <article>
            <Intro />
            <TypesOfBear />
            <HabitatsAndEatingHabits />
            <MatingRituals />
            <AboutAuthor />
            <MoreBears />
          </article>

          <aside className="secondary">
            <RelatedPages />
          </aside>
        </main>

        <Footer />
      </div>
    </div>
  );
};
