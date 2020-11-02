import { createContext } from 'react'


export const AppContext = createContext();

export const AppProvider = AppContext.Provider;

export const AppConsumer = AppContext.Consumer;