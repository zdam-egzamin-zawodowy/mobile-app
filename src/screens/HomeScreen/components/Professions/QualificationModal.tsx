import React, { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { polishPlurals } from 'polish-plurals';
import { useSavedQualifications } from 'libs/savedqualifications';
import { Maybe, Qualification } from 'libs/graphql';
import { QUESTIONS } from 'config/app';
import { Screen } from 'config/routing';

import { ScrollView, StyleSheet } from 'react-native';
import {
  Body,
  Button,
  Card,
  CardItem,
  Icon,
  Right,
  Text,
  View,
} from 'native-base';
import Modal, { ModalProps } from 'common/Modal/Modal';

export type QualificationModalProps = {
  qualification: Maybe<Qualification>;
} & Pick<ModalProps, 'visible' | 'onPressBackdrop'>;

const QualificationModal = ({
  qualification,
  onPressBackdrop,
  visible,
}: QualificationModalProps) => {
  const navigation = useNavigation();
  const { savedQualifications, saveQualification } = useSavedQualifications();
  const isSaved = useMemo(() => {
    if (!qualification) {
      return false;
    }
    return savedQualifications.some(id => id === qualification.id);
  }, [savedQualifications, qualification]);

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onPressBackdrop={onPressBackdrop}
    >
      <View style={styles.container}>
        <Card style={styles.card}>
          <ScrollView pointerEvents={'box-none'}>
            <CardItem header bordered style={styles.cardHeader}>
              <Body style={styles.body}>
                <Text>
                  {qualification?.name} ({qualification?.code})
                </Text>
              </Body>
              <Right>
                <Button
                  small
                  transparent
                  onPress={
                    qualification
                      ? () => saveQualification(qualification.id, !isSaved)
                      : undefined
                  }
                >
                  <Icon
                    type="Entypo"
                    name={isSaved ? 'star' : 'star-outlined'}
                    style={styles.icon}
                  />
                </Button>
              </Right>
            </CardItem>
            <CardItem>
              <Body>
                {QUESTIONS.map(question => (
                  <Button
                    style={[styles.marginBottom]}
                    onPress={() => {
                      if (onPressBackdrop) {
                        onPressBackdrop();
                      }
                      navigation.navigate(Screen.TEST, {
                        qualificationID: qualification?.id ?? 0,
                        limit: question,
                      });
                    }}
                    key={question}
                    full
                  >
                    <Text style={styles.buttonText}>
                      Test {question}{' '}
                      {polishPlurals('pytanie', 'pytania', 'pytań', question)}
                    </Text>
                  </Button>
                ))}
                <Button full onPress={onPressBackdrop}>
                  <Text>Anuluj</Text>
                </Button>
              </Body>
            </CardItem>
          </ScrollView>
        </Card>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    paddingHorizontal: 15,
  },
  card: {
    width: '100%',
    maxWidth: 420,
  },
  buttonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  marginBottom: {
    marginBottom: 6,
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
  },
  star: {
    flex: 1,
  },
  body: { flex: 3, alignSelf: 'center' },
  icon: { fontSize: 30 },
});

export default QualificationModal;
