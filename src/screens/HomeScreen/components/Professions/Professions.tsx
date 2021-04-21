import React, { useCallback, useRef, useState } from 'react';
import { useUpdateEffect } from 'react-use';
import { useSavedQualifications } from 'libs/savedqualifications';
import { Maybe, Profession, Qualification } from 'libs/graphql';
import { Mode } from '../ModeSelector/ModeSelector';

import { FlatListProps, RefreshControl, StyleSheet } from 'react-native';
import { List, View } from 'native-base';
import Item from './Item';
import QualificationModal from './QualificationModal';
import ListEmpty from './ListEmpty';

export interface ProfessionsProps
  extends Pick<FlatListProps<Profession>, 'refreshing' | 'onRefresh'> {
  professions: Profession[];
  mode: Mode;
  search: string;
}

const noop = () => {};

const Professions = ({
  professions,
  refreshing,
  onRefresh,
  mode,
  search,
}: ProfessionsProps) => {
  const listRef = useRef<any>(null);
  const { isSaved } = useSavedQualifications();
  const [filteredProfessions, setFilteredProfessions] = useState<
    Maybe<Profession[]>
  >(null);
  const [selectedQualification, setSelectedQualification] = useState<
    Maybe<Qualification>
  >(null);
  const [showModal, setShowModal] = useState(false);
  useUpdateEffect(() => {
    listRef.current?._root?.scrollToOffset({ offset: 0, animated: false });
  }, [mode]);
  useUpdateEffect(() => {
    if (!search && mode === Mode.All && filteredProfessions) {
      setFilteredProfessions(null);
      return;
    }

    const newFilteredProfessions: Profession[] = [];
    professions.forEach(profession => {
      const qualifications = profession.qualifications.filter(
        qualification =>
          (!search ||
            qualification.name.toLowerCase().includes(search) ||
            qualification.code.toLowerCase().includes(search)) &&
          (mode === Mode.All || isSaved(qualification.id)),
      );
      if (qualifications.length > 0) {
        newFilteredProfessions.push({ ...profession, qualifications });
      }
    });
    setFilteredProfessions(newFilteredProfessions);
  }, [professions, search, mode, isSaved]);

  const handlePress = useCallback(
    (qualification: Qualification) => {
      setSelectedQualification(qualification);
      setShowModal(true);
    },
    [setShowModal, setSelectedQualification],
  );
  const renderItem = useCallback(
    ({ item }: { item: Profession }) => {
      return <Item profession={item} onPress={handlePress} />;
    },
    [handlePress],
  );
  const keyExtractor = useCallback(item => item.id, []);

  return (
    <View style={styles.container}>
      <List
        ref={listRef}
        dataArray={filteredProfessions ?? professions}
        contentContainerStyle={styles.contentContainer}
        renderItem={renderItem}
        ListEmptyComponent={<ListEmpty />}
        keyExtractor={keyExtractor}
        maxToRenderPerBatch={5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing ?? false}
            onRefresh={onRefresh ?? noop}
          />
        }
        initialNumToRender={5}
      />
      <QualificationModal
        onPressBackdrop={() => setShowModal(false)}
        qualification={selectedQualification}
        visible={showModal}
      />
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
