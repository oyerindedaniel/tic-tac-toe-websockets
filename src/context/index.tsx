import { createContext, Dispatch, ReactNode, useContext, useReducer, useMemo } from 'react';
import { GlobalContextState, GlobalContextAction, GlobalContextDispatch } from './types';
import { localStorageName } from './constants';
import { generateID } from '@/utils';

import Reducer from './reducer';

let localStorageState;
if (typeof window !== 'undefined') {
  localStorageState = localStorage.getItem(localStorageName);
}

export const initialState: GlobalContextState = localStorageState
  ? {
      ...JSON.parse(localStorageState)
    }
  : {
      user: {
        userId: '',
        userName: '',
        userPhotoId: generateID(10)
      },
      socketIO: {
        isConnected: false
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
