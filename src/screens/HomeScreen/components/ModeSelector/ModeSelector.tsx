import React from 'react';
import { Button, Segment, Text } from 'native-base';

export enum Mode {
  All,
  Saved,
}

export interface ModeSelectorProps {
  mode: Mode;
  onChangeMode: (mode: Mode) => void;
}

const ModeSelector = ({ mode, onChangeMode }: ModeSelectorProps) => {
  return (
    <Segment>
      <Button
        first
        onPress={() => onChangeMode(Mode.All)}
        active={mode === Mode.All}
      >
        <Text allowFontScaling={false}>Wszystkie</Text>
      </Button>
      <Button
        onPress={() => onChangeMode(Mode.Saved)}
        active={mode === Mode.Saved}
      >
        <Text allowFontScaling={false}>Zapisane</Text>
      </Button>
    </Segment>
  );
};

export default ModeSelector;
