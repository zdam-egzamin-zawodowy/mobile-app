import React, { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { polishPlurals } from 'polish-plurals';
import { useSavedQualifications } from 'libs/savedqualifications';
import { Maybe, Qualification } from 'libs/graphql';
import { QUESTIONS } from 'config/app';

import { StyleSheet } from 'react-native';
import {
  Body,
  Button,
  Card,
  CardItem,
  Text,
  View,
  Icon,
  Right,
} from 'native-base';
import Modal, { ModalProps } from 'common/Modal/Modal';
import { Screen } from '../../../../config/routing';

export interface QualificationModalProps
  extends Pick<ModalProps, 'visible' | 'onPressBackdrop'> {
  qualification: Maybe<Qualification>;
}

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
      <View style={styles.modalContentContainer}>
        <Card>
          <CardItem header bordered style={styles.cardHeader}>
            <Body style={{ flex: 3, alignSelf: 'center' }}>
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
                  style={{ fontSize: 30 }}
                />
              </Button>
            </Right>
          </CardItem>
          <CardItem>
            <Body>
              <View style={styles.buttonContainer}>
                <Button
                  full
                  style={[styles.button, styles.marginRight]}
                  onPress={onPressBackdrop}
                >
                  <Text>Anuluj</Text>
                </Button>
                {QUESTIONS.map((question, index) => (
                  <Button
                    style={[
                      styles.button,
                      index === QUESTIONS.length - 1 ? {} : styles.marginRight,
                    ]}
                    onPress={() => {
                      if (onPressBackdrop) {
                        onPressBackdrop();
                      }
                      navigation.navigate(Screen.Test, {
                        qualificationID: qualification?.id ?? 0,
                        limit: question,
                      });
                    }}
                    key={question}
                  >
                    <Text style={styles.buttonText}>
                      Test {question}{' '}
                      {polishPlurals('pytanie', 'pytania', 'pytań', question)}
                    </Text>
                  </Button>
                ))}
              </View>
            </Body>
          </CardItem>
        </Card>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContentContainer: {
    justifyContent: 'center',
    flexGrow: 1,
    paddingHorizontal: 15,
    maxWidth: 420,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  buttonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 1,
  },
  button: {
    height: 'auto',
    flex: 1,
  },
  marginRight: {
    marginRight: 6,
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
  },
  star: {
    flex: 1,
  },
});

export default QualificationModal;
