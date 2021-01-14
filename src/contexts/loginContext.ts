import React from 'react';

export default React.createContext({
  isLoginModalOpen: false,
  openLoginModal: () => {},
  closeLoginModal: () => {},
});
