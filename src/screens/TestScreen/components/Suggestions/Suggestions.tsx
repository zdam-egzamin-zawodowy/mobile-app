import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { polishPlurals } from 'polish-plurals';
import { Qualification } from 'libs/graphql';
import { QUESTIONS } from 'config/app';
import { Screen } from 'config/routing';

import { StyleSheet } from 'react-native';
import { H1, View, H3, Card, CardItem, Text, Button, Body } from 'native-base';
import Content from '../Content/Content';

export type SuggestionsProps = {
  qualifications: Qualification[];
};

const Suggestions = ({ qualifications }: SuggestionsProps) => {
  const navigation = useNavigation();

  return (
    <Content>
      <H1
        style={[
          styles.textCenter,
          qualifications.length === 0 ? styles.fullHeight : {},
        ]}
      >
        Do wybranej kwalifikacji nie zostały dodane żadne pytania.
      </H1>
      {qualifications.length > 0 && (
        <View style={styles.similarQualificationsContainer}>
          <H3 style={[styles.textCenter, styles.similarQualificationsHeading]}>
            Podobne kwalifikacje:
          </H3>
          {qualifications.map(qualification => {
            return (
              <Card key={qualification.id}>
                <CardItem header bordered>
                  <Body>
                    {qualification.formula && (
                      <Text note>{qualification.formula}</Text>
                    )}
                    <Text>
                      {qualification.name} ({qualification.code})
                    </Text>
                  </Body>
                </CardItem>
                <CardItem>
                  <Body>
                    {QUESTIONS.map(question => {
                      return (
                        <Button
                          key={question}
                          onPress={() => {
                            navigation.navigate(Screen.TEST, {
                              qualificationID: qualification.id,
                              limit: question,
                            });
                          }}
                          full
                          style={styles.button}
                        >
                          <Text>
                            Test {question}{' '}
                            {polishPlurals(
                              'pytanie',
                              'pytania',
                              'pytań',
                              question,
                            )}
                          </Text>
                        </Button>
                      );
                    })}
                  </Body>
                </CardItem>
              </Card>
            );
          })}
        </View>
      )}
    </Content>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  textCenter: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  fullHeight: {
    flex: 1,
  },
  similarQualificationsContainer: {
    marginTop: 20,
  },
  button: {
    marginBottom: 3,
  },
  similarQualificationsHeading: {
    marginBottom: 10,
  },
});

export default Suggestions;
