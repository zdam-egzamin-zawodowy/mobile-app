import { useContext } from 'react';
import { context } from './context';

export const useSavedQualifications = () => {
  return useContext(context);
};
