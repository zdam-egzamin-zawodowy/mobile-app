import React from 'react';
import { useVariables } from 'libs/native-base';

import { StyleSheet } from 'react-native';
import { Icon, View, H3, Text, NativeBase } from 'native-base';

export enum AlertVariant {
  Info = 'info',
  Warning = 'warning',
}

export interface AlertProps extends Pick<NativeBase.View, 'style'> {
  variant?: AlertVariant;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}

const Alert = ({
  variant = AlertVariant.Info,
  title,
  description,
  style,
  actions,
}: AlertProps) => {
  const variables = useVariables();

  const renderIcon = () => {
    const defaultProps = {
      style: [{ color: variables.inverseTextColor }, styles.icon],
    };
    switch (variant) {
      case AlertVariant.Info:
        return <Icon type="Feather" name="info" {...defaultProps} />;
      case AlertVariant.Warning:
        return <Icon type="AntDesign" name="warning" {...defaultProps} />;
    }
  };

  const getBgColor = () => {
    switch (variant) {
      case AlertVariant.Info:
        return variables.brandInfo;
      case AlertVariant.Warning:
        return variables.brandWarning;
    }
  };

  return (
    <View
      padder
      style={[{ backgroundColor: getBgColor() }, styles.container, style]}
    >
      <View>{renderIcon()}</View>
      <View style={styles.textContainer}>
        <H3 style={[{ color: variables.inverseTextColor }]}>{title}</H3>
        {description && (
          <Text
            style={[{ color: variables.inverseTextColor }, styles.description]}
          >
            {description}
          </Text>
        )}
        {actions && <View style={styles.actionsContainer}>{actions}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  icon: {
    fontSize: 30,
    marginRight: 10,
  },
  description: {
    marginTop: 5,
  },
  textContainer: {
    flexShrink: 1,
  },
  actionsContainer: {
    marginTop: 5,
  },
});

export default Alert;
