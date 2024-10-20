// useOpenMenu.js
import { useCallback } from 'react';

export const useOpenAsideMenu = (asideMenuRef) => {
  return useCallback(() => {
    asideMenuRef.current.checked = true;
  }, [asideMenuRef])
}
