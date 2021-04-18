import React, { useCallback, useRef, useState } from 'react';
import { useUpdateEffect } from 'react-use';
import { Maybe, Profession, Qualification } from 'libs/graphql';

import { FlatListProps, RefreshControl, StyleSheet } from 'react-native';
import { List, View } from 'native-base';
import Item from './Item';
import QualificationModal from './QualificationModal';
import ListEmpty from './ListEmpty';

export interface ProfessionsProps
  extends Pick<FlatListProps<Profession>, 'refreshing' | 'onRefresh'> {
  professions: Profession[];
}

const Professions = ({
  professions,
  refreshing,
  onRefresh,
}: ProfessionsProps) => {
  const listRef = useRef<any>(null);
  const [selectedQualification, setSelectedQualification] = useState<
    Maybe<Qualification>
  >(null);
  const [showModal, setShowModal] = useState(false);

  useUpdateEffect(() => {
    listRef.current?._root?.scrollToOffset({ offset: 0, animated: false });
  }, [professions]);

  const handlePress = useCallback(
    (qualification: Qualification) => {
      setSelectedQualification(qualification);
      setShowModal(true);
    },
    [setShowModal, setSelectedQualification],
  );

  return (
    <View style={styles.container}>
      <List
        ref={listRef}
        dataArray={professions}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }: { item: Profession }) => {
          return <Item profession={item} onPress={handlePress} />;
        }}
        ListEmptyComponent={<ListEmpty />}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing ?? false}
            onRefresh={onRefresh ?? (() => {})}
          />
        }
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
