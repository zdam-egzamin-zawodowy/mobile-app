import React, { useState } from 'react';
import { FlatListProps, RefreshControl } from 'react-native';
import { Maybe, Profession, Qualification } from 'libs/graphql';

import { List, View } from 'native-base';
import Item from './Item';
import QualificationModal from './QualificationModal';

export interface ProfessionsProps
  extends Pick<FlatListProps<Profession>, 'refreshing' | 'onRefresh'> {
  professions: Profession[];
}

const Professions = ({
  professions,
  refreshing,
  onRefresh,
}: ProfessionsProps) => {
  const [selectedQualification, setSelectedQualification] = useState<
    Maybe<Qualification>
  >(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <List
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
