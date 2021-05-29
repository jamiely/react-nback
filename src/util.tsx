import React, { useState, useEffect, useRef } from 'react';

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export function useInterval(callback: Function, delay: number | null) {
  const savedCallback = useRef<Function>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if(!savedCallback) return;
      if(!savedCallback.current) return;

      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// Adapted from
// https://www.caktusgroup.com/blog/2020/07/01/usekeypress-hook-react/
/**
 * useKeyPress
 * @param {string} key - the name of the key to respond to, compared against event.key
 * @param {function} action - the action to perform on key press
 */
 export function useKeyPress(keys: string[], action: Function, dependencies: any[]) {
  useEffect(() => {
    function onKeyup(e: KeyboardEvent) {
      if(keys.indexOf(e.key) === -1) return;
      action();
    }
    window.addEventListener('keyup', onKeyup);
    return () => window.removeEventListener('keyup', onKeyup);
  }, dependencies);
}
