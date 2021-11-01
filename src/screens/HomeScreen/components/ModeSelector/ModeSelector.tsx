import React from 'react';
import { Button, Segment, Text } from 'native-base';

export enum Mode {
  ALL,
  SAVED,
}

export type ModeSelectorProps = {
  mode: Mode;
  onChangeMode: (mode: Mode) => void;
};

const ModeSelector = ({ mode, onChangeMode }: ModeSelectorProps) => {
  return (
    <Segment>
      <Button
        first
        onPress={() => onChangeMode(Mode.ALL)}
        active={mode === Mode.ALL}
      >
        <Text allowFontScaling={false}>Wszystkie</Text>
      </Button>
      <Button
        onPress={() => onChangeMode(Mode.SAVED)}
        active={mode === Mode.SAVED}
      >
        <Text allowFontScaling={false}>Zapisane</Text>
      </Button>
    </Segment>
  );
};

export default ModeSelector;
