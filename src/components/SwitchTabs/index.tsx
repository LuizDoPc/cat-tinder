import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Assets} from '../../assets';

interface SwitchTabsProps {
  onPressLeft: () => void;
  onPressRight: () => void;
  currentActive: 'left' | 'right';
}

export const SwitchTabs = ({
  onPressLeft,
  onPressRight,
  currentActive,
}: SwitchTabsProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPressLeft}
        style={[
          styles.iconContainer,
          currentActive === 'left'
            ? styles.iconContainerEnabled
            : styles.iconContainerDisabled,
        ]}
        testID="left-icon">
        <Image
          source={Assets.tinder}
          style={
            currentActive === 'left' ? styles.iconActive : styles.iconDisabled
          }
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressRight}
        style={[
          styles.iconContainer,
          currentActive === 'right'
            ? styles.iconContainerEnabled
            : styles.iconContainerDisabled,
        ]}
        testID="right-icon">
        <Image
          source={Assets.star}
          style={
            currentActive === 'right' ? styles.iconActive : styles.iconDisabled
          }
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#E3E3E4',
    padding: 2,
    borderRadius: 40,
  },
  iconActive: {
    width: 15,
    height: 15,
  },
  iconDisabled: {
    width: 15,
    height: 15,
    tintColor: '#BFBFC1',
  },
  iconContainer: {
    borderRadius: 50,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  iconContainerDisabled: {
    backgroundColor: '#E3E2E4',
  },
  iconContainerEnabled: {
    backgroundColor: '#fff',
  },
});
