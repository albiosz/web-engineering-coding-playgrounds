/**
 * Test Setup File for Vitest
 *
 * This file is run before each test file and sets up the testing environment.
 * It includes:
 * - Jest DOM matchers for enhanced assertions
 * - Mock implementations for browser APIs (localStorage, etc.)
 */

import '@testing-library/jest-dom';

/**
 * Mock localStorage implementation
 * Provides a simple in-memory storage for tests
 */
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string): string | null => {
      return store[key] || null;
    },
    setItem: (key: string, value: string): void => {
      store[key] = value;
    },
    removeItem: (key: string): void => {
      delete store[key];
    },
    clear: (): void => {
      store = {};
    },
    get length(): number {
      return Object.keys(store).length;
    },
    key: (index: number): string | null => {
      return Object.keys(store)[index] || null;
    },
  };
})();

// Assign the mock to the global window object
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

/**
 * Reset localStorage before each test
 */
beforeEach(() => {
  localStorage.clear();
});
