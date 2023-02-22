import { createContext, Dispatch, ReactNode, useContext, useReducer, useMemo } from 'react';
import { GlobalContextState, GlobalContextAction, GlobalContextDispatch } from './types';

import Reducer from './reducer';

export const initialState: GlobalContextState = {
  user: {
    userId: '',
    userName: '',
    userPhoto: ''
  }
};

export const globalStoreContext = createContext<{
  state: GlobalContextState;
  dispatch: Dispatch<GlobalContextAction>;
}>({
  state: initialState,
  dispatch: () => {}
});

export const GlobalStoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return <globalStoreContext.Provider value={value}>{children}</globalStoreContext.Provider>;
};

export const useGlobalStoreContext: () => {
  state: GlobalContextState;
  dispatch: GlobalContextDispatch;
} = () => {
  const { state, dispatch } = useContext(globalStoreContext);
  return { state, dispatch };
};
