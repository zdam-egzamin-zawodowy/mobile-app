import { createContext } from 'react';

export type ContextState = {
  savedQualifications: number[];
  saveQualification: (id: number, save: boolean) => Promise<void> | void;
};

export const context = createContext<ContextState>({
  savedQualifications: [],
  saveQualification: () => {},
});
context.displayName = 'SavedQualificationsContext';
