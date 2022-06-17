import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Assets} from '../../assets';

export const BottomTab = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        let icon;

        if (route.name === 'Home') {
          icon = Assets.paws;
        }
        if (route.name === 'Chat') {
          icon = Assets.chat;
        }
        if (route.name === 'Profile') {
          icon = Assets.user;
        }

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            key={index}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.item}>
            <Image
              source={icon}
              style={[
                styles.icon,
                {
                  tintColor: isFocused ? '#F0467E' : '#000',
                },
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: Dimensions.get('window').width / 2 - 70,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    height: 40,
    width: 140,
    paddingHorizontal: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    width: 15,
    height: 15,
  },
});
