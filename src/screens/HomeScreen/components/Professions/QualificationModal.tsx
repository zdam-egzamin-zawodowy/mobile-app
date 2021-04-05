import React from 'react';
import { Maybe, Qualification } from 'libs/graphql';
import { QUESTIONS } from 'config/app';

import { StyleSheet } from 'react-native';
import {
  Body,
  Button,
  Card,
  CardItem,
  Left,
  Text,
  View,
  Icon,
  Right,
} from 'native-base';
import Modal, { ModalProps } from 'common/Modal/Modal';
import { polishPlurals } from 'polish-plurals';

export interface QualificationModalProps
  extends Pick<ModalProps, 'visible' | 'onPressBackdrop'> {
  qualification: Maybe<Qualification>;
}

const QualificationModal = ({
  qualification,
  onPressBackdrop,
  visible,
}: QualificationModalProps) => {
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
              <Button small transparent>
                <Icon
                  type="Entypo"
                  name={true ? 'star' : 'star-outlined'}
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
  },
  button: {
    flex: 1,
    height: 'auto',
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
