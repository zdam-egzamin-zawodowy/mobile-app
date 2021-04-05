import { createContext } from 'react';

export type ContextState = {
  savedQualifications: number[];
  saveQualification: (id: number, save: boolean) => void;
  isSaved: (id: number) => boolean;
};

export const context = createContext<ContextState>({
  savedQualifications: [],
  saveQualification: () => {},
  isSaved: () => false,
});
context.displayName = 'SavedQualificationsContext';
