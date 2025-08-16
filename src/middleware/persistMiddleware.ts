// src/middleware/persistMiddleware.ts
import { Middleware } from '@reduxjs/toolkit';

const PERSIST_KEY = 'crypto-portfolio:persistedState';
const WHITELIST = ['filters', 'portfolio', 'ui'] as const;

/**
 * Middleware: serializes and writes a small slice of state to localStorage after each action.
 */
export const persistMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  try {
    if (typeof window === 'undefined' || !window.localStorage) return result;

    const state = (store as any).getState();
    const subset: Record<string, unknown> = {};

    for (const key of WHITELIST) {
      if (state && typeof state[key] !== 'undefined') subset[key] = state[key];
    }

    localStorage.setItem(PERSIST_KEY, JSON.stringify(subset));
  } catch (err) {
    // don't crash the app on storage errors
    // keep a console error for debugging
    // eslint-disable-next-line no-console
    console.error('persistMiddleware error:', err);
  }

  return result;
};

/**
 * Load persisted state (used as preloadedState for configureStore).
 * Returns `undefined` if nothing persisted or on error.
 */
export const loadPersistedState = (): Record<string, unknown> | undefined => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return undefined;
    const raw = localStorage.getItem(PERSIST_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    return parsed;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('loadPersistedState error:', err);
    return undefined;
  }
};
