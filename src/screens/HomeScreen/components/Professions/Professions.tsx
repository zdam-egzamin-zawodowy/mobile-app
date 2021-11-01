import React, { useCallback, useEffect, useState } from 'react';
import { useSavedQualifications } from 'libs/savedqualifications';
import { Maybe, Qualification } from 'libs/graphql';
import { Mode } from '../ModeSelector/ModeSelector';
import useScrollTopOnSearchOrModeChange from './useScrollTopOnSearchOrModeChange';
import useProfessions from './useProfessions';

import { StyleSheet } from 'react-native';
import { View } from 'native-base';
import List, { Item } from './List/List';
import QualificationModal from './QualificationModal';
import NetworkConnectionAlert from './NetworkConnectionAlert';

export type ProfessionsProps = {
  mode: Mode;
  search: string;
};

const ID_SEPARATOR = '.';
const getQualificationAndProfessionID = (str: string): [number, number] => {
  const [professionID, qualificationID] = str.split(ID_SEPARATOR);
  return [parseInt(professionID, 10), parseInt(qualificationID, 10)];
};

const Professions = ({ mode, search }: ProfessionsProps) => {
  const [selectedQualification, setSelectedQualification] = useState<
    Maybe<Qualification>
  >(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [listItems, setListItems] = useState<Item[]>([]);
  const {
    refetch,
    refetching,
    professions,
    error,
    loading: professionsLoading,
  } = useProfessions();
  const { isSaved } = useSavedQualifications();
  const listRef = useScrollTopOnSearchOrModeChange(search, mode);

  const handlePress = useCallback(
    (id: string) => {
      const [professionID, qualificationID] = getQualificationAndProfessionID(
        id,
      );

      const profession = professions.find(p => p.id === professionID);
      if (!profession) {
        return;
      }

      const qualification = profession.qualifications.find(
        q => q.id === qualificationID,
      );
      if (!qualification) {
        return;
      }

      setSelectedQualification(qualification);
      setIsModalVisible(true);
    },
    [setIsModalVisible, setSelectedQualification, professions],
  );

  useEffect(() => {
    if (professionsLoading) {
      return;
    }

    let items: Item[] = [];

    professions.forEach(profession => {
      const qualifications = profession.qualifications
        .filter(
          qualification =>
            (!search ||
              qualification.name.toLowerCase().includes(search) ||
              qualification.code.toLowerCase().includes(search)) &&
            (mode === Mode.ALL || isSaved(qualification.id)),
        )
        .map(
          (qualification): Item => {
            return {
              text: `${qualification.name} (${qualification.code})`,
              itemDivider: false,
              itemHeader: false,
              id: `${profession.id}${ID_SEPARATOR}${qualification.id}`,
              onPress: handlePress,
            };
          },
        );

      if (qualifications.length === 0) {
        return;
      }

      items = [
        ...items,
        {
          text: profession.name,
          itemHeader: true,
          itemDivider: true,
          id: 'P' + profession.id,
        } as Item,
        ...qualifications,
      ];
    });

    setListItems(items);
    setIsLoading(false);
  }, [professions, search, mode, isSaved, handlePress, professionsLoading]);

  return (
    <View style={styles.container}>
      <List
        ref={listRef}
        items={listItems}
        refreshing={refetching}
        onRefresh={refetch}
        loading={isLoading}
        contentContainerStyle={styles.contentContainer}
      />
      <QualificationModal
        onPressBackdrop={() => setIsModalVisible(false)}
        qualification={selectedQualification}
        visible={isModalVisible}
      />
      <NetworkConnectionAlert error={error} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

export default Professions;
