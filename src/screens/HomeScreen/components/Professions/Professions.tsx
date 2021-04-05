import React, { useRef, useState } from 'react';
import { Maybe, Profession, Qualification } from 'libs/graphql';

import { FlatListProps, RefreshControl } from 'react-native';
import { List, View } from 'native-base';
import Item from './Item';
import QualificationModal from './QualificationModal';
import { useUpdateEffect } from 'react-use';

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

  return (
    <View style={{ flex: 1 }}>
      <List
        ref={listRef}
        dataArray={professions}
        renderItem={({ item }: { item: Profession }) => {
          return (
            <Item
              profession={item}
              onPress={qualification => {
                setSelectedQualification(qualification);
                setShowModal(true);
              }}
            />
          );
        }}
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

export default Professions;
