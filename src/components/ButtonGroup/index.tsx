import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Assets} from '../../assets';

interface ButtonGroupProps {
  onPressLeft: () => void;
  onPressRight: () => void;
}

export const ButtonGroup = ({onPressLeft, onPressRight}: ButtonGroupProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPressLeft}
        style={styles.iconContainer}
        testID="dislike">
        <Image source={Assets.close} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressRight}
        style={[styles.iconContainer, styles.rightIconContainer]}
        testID="like">
        <Image source={Assets.heart} style={[styles.icon, styles.rightIcon]} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 2,
    borderRadius: 40,
    marginTop: '20%',
  },
  icon: {
    width: 20,
    height: 20,
  },
  iconContainer: {
    width: 50,
    height: 50,

    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 100,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,

    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  rightIconContainer: {
    marginLeft: 50,
  },
  rightIcon: {
    width: 30,
    height: 30,
    tintColor: '#6BD78E',
  },
});
