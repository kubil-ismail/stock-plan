import { useEffect } from 'react';

export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  options: {
    metaKey?: boolean;
    ctrlKey?: boolean;
    shiftKey?: boolean;
    enabled?: boolean;
  } = {}
) {
  const { metaKey = false, ctrlKey = false, shiftKey = false, enabled = true } = options;

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const isMetaKey = metaKey ? event.metaKey || event.ctrlKey : true;
      const isCtrlKey = ctrlKey ? event.ctrlKey : true;
      const isShiftKey = shiftKey ? event.shiftKey : !event.shiftKey;

      if (
        event.key.toLowerCase() === key.toLowerCase() &&
        (metaKey ? (event.metaKey || event.ctrlKey) : !event.metaKey && !event.ctrlKey) &&
        (ctrlKey ? event.ctrlKey : true) &&
        isShiftKey
      ) {
        event.preventDefault();
        callback();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [key, callback, metaKey, ctrlKey, shiftKey, enabled]);
}
