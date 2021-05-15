import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useUpdateEffect } from 'react-use';
import { useSavedQualifications } from 'libs/savedqualifications';
import { Maybe, Profession, Qualification } from 'libs/graphql';
import { Mode } from '../ModeSelector/ModeSelector';

import {
  FlatList,
  FlatListProps,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { View } from 'native-base';
import ListItem, { ListItemProps } from './ListItem';
import ListEmpty from './ListEmpty';
import QualificationModal from './QualificationModal';

export interface ListProps
  extends Pick<FlatListProps<Profession>, 'refreshing' | 'onRefresh'> {
  professions: Profession[];
  mode: Mode;
  search: string;
}

const noop = () => {};

const ID_SEPARATOR = '.';
const getQualificationAndProfessionID = (str: string): [number, number] => {
  const [professionID, qualificationID] = str.split(ID_SEPARATOR);
  return [parseInt(professionID, 10), parseInt(qualificationID, 10)];
};

const MyList = ({
  professions,
  refreshing,
  onRefresh,
  mode,
  search,
}: ListProps) => {
  const listRef = useRef<any>(null);
  const [selectedQualification, setSelectedQualification] = useState<
    Maybe<Qualification>
  >(null);
  const [showModal, setShowModal] = useState(false);
  const { isSaved } = useSavedQualifications();
  useUpdateEffect(() => {
    listRef.current?._root?.scrollToOffset({ offset: 0, animated: false });
  }, [mode, search]);
  const handlePress = useCallback(
    (id: string) => {
      const [professionID, qualificationID] = getQualificationAndProfessionID(
        id,
      );
      const profession = professions.find(p => p.id === professionID);
      if (profession) {
        const qualification = profession.qualifications.find(
          q => q.id === qualificationID,
        );
        if (qualification) {
          setSelectedQualification(qualification);
          setShowModal(true);
        }
      }
    },
    [setShowModal, setSelectedQualification, professions],
  );
  const renderItem = useCallback(({ item }: { item: ListItemProps }) => {
    return <ListItem {...item} />;
  }, []);
  const keyExtractor = useCallback(item => item.id, []);
  const listItems = useMemo(() => {
    let items: ListItemProps[] = [];
    professions.forEach(profession => {
      const qualifications = profession.qualifications
        .filter(
          qualification =>
            (!search ||
              qualification.name.toLowerCase().includes(search) ||
              qualification.code.toLowerCase().includes(search)) &&
            (mode === Mode.All || isSaved(qualification.id)),
        )
        .map(
          (qualification): ListItemProps => {
            return {
              text: `${qualification.name} (${qualification.code})`,
              itemDivider: false,
              itemHeader: false,
              id: `${profession.id}${ID_SEPARATOR}${qualification.id}`,
              onPress: handlePress,
            };
          },
        );
      if (qualifications.length > 0) {
        items = [
          ...items,
          {
            text: profession.name,
            itemHeader: true,
            itemDivider: true,
            id: 'P' + profession.id,
          } as ListItemProps,
          ...qualifications,
        ];
      }
    });
    return items;
  }, [professions, search, mode, isSaved, handlePress]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={listItems}
        contentContainerStyle={styles.contentContainer}
        renderItem={renderItem}
        ListEmptyComponent={<ListEmpty />}
        keyExtractor={keyExtractor}
        maxToRenderPerBatch={5}
        onEndReachedThreshold={0.75}
        refreshControl={
          <RefreshControl
            refreshing={refreshing ?? false}
            onRefresh={onRefresh ?? noop}
          />
        }
        initialNumToRender={10}
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

export default MyList;
