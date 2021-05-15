import React, { useState } from 'react';

import { Container } from 'native-base';
import Header from './components/Header/Header';
import ModeSelector, { Mode } from './components/ModeSelector/ModeSelector';
import Professions from './components/Professions/Professions';

const HomeScreen = () => {
  const [search, setSearch] = useState('');
  const [mode, setMode] = useState(Mode.All);

  return (
    <Container>
      <Header onSearch={setSearch} />
      <ModeSelector mode={mode} onChangeMode={setMode} />
      <Professions mode={mode} search={search} />
    </Container>
  );
};

export default HomeScreen;
