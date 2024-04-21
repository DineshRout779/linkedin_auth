/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';

const INTIAL_STATE = {
  user: JSON.parse(localStorage.getItem('user')) || null,
};

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [state, setState] = useState(INTIAL_STATE);

  useEffect(() => {
    if (state.user) {
      console.log('setting up: ', state.user);
      localStorage.setItem('user', JSON.stringify(state.user));
    }
  }, [state]);

  console.log(state);

  return (
    <AuthContext.Provider value={{ state, setState }}>
      {children}
    </AuthContext.Provider>
  );
};
