import React from 'react';
import {
  Modal as RNModal,
  ModalProps as RNModalProps,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export type ModalProps = RNModalProps & {
  backdrop?: boolean;
  onPressBackdrop?: () => void;
  children?: React.ReactNode;
};

const Modal = ({
  backdrop = true,
  onPressBackdrop,
  children,
  ...rest
}: ModalProps) => {
  return (
    <RNModal {...rest}>
      {backdrop && (
        <TouchableWithoutFeedback onPress={onPressBackdrop}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
      )}
      {children}
    </RNModal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.4)',
  },
});

export default Modal;
