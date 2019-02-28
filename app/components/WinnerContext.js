import { createContext } from 'react';

const WinnerContext = createContext('');

export const WinnerProvider = WinnerContext.Provider;
export const WinnerConsumer = WinnerContext.Consumer;
export default WinnerContext;