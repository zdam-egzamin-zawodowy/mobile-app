import React, { useCallback, useState } from 'react';
import { useEffectOnce, useUpdateEffect } from 'react-use';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { context as Context } from './context';

export interface SavedQualificationsProviderProps {
  children?: React.ReactNode;
}

const ASYNC_STORAGE_KEY = 'saved_qualifications';

export const SavedQualificationsProvider = ({
  children,
}: SavedQualificationsProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [savedQualifications, setSavedQualifications] = useState<number[]>([]);
  const asyncStorage = useAsyncStorage(ASYNC_STORAGE_KEY);

  useEffectOnce(() => {
    asyncStorage
      .getItem()
      .then(data => {
        const parsed = JSON.parse(data ?? '[]');
        if (parsed && Array.isArray(parsed)) {
          setSavedQualifications(parsed);
        }
      })
      .catch(e => {
        if (__DEV__) {
          console.log('loadSavedQualifications', e);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  });

  useUpdateEffect(() => {
    asyncStorage.setItem(JSON.stringify(savedQualifications)).catch(e => {
      if (__DEV__) {
        console.log('saveQualifications', e);
      }
    });
  }, [savedQualifications]);

  const saveQualification = useCallback(
    (id: number, save: boolean) => {
      setSavedQualifications(
        save
          ? ids => [...ids, id]
          : ids => ids.filter(otherID => otherID !== id),
      );
    },
    [setSavedQualifications],
  );

  if (loading) {
    return null;
  }

  return (
    <Context.Provider value={{ savedQualifications, saveQualification }}>
      {children}
    </Context.Provider>
  );
};
