import React, {useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import {ButtonGroup} from '../components/ButtonGroup';
import {CatCard, CatCardProps} from '../components/CatCard';
import {SwitchTabs} from '../components/SwitchTabs';
import {useAnimateCards} from '../hooks/useAnimateCards';
import {useGetCatData} from '../hooks/useGetCatData';
import {voteService} from '../services';

export const HomeScreen = () => {
  const [currentActive, setCurrentActive] = useState<'left' | 'right'>('left');

  const handleSwipeLeft = async (item: CatCardProps) => {
    await voteService(item.image.id, 0);
  };

  const handleSwipeRight = async (item: CatCardProps) => {
    await voteService(item.image.id, 1);
  };

  const {catData, isLoading} = useGetCatData();
  const {
    currentItem,
    nextItem,
    slideCard,
    currentItemAnimatedStyle,
    nextItemAnimatedStyle,
    likeAnimationStyle,
    dislikeAnimationStyle,
    gestureHandler,
  } = useAnimateCards(catData, handleSwipeLeft, handleSwipeRight);

  return (
    <SafeAreaView style={{backgroundColor: '#FBFAFE'}}>
      <View style={styles.container}>
        <SwitchTabs
          onPressLeft={() => {
            setCurrentActive('left');
          }}
          onPressRight={() => {
            setCurrentActive('right');
          }}
          currentActive={currentActive}
        />

        {isLoading ? (
          <View style={{height: 450, justifyContent: 'center'}}>
            <ActivityIndicator />
          </View>
        ) : (
          <>
            <View style={styles.nextItemContainer}>
              {nextItem && (
                <Animated.View
                  style={[nextItemAnimatedStyle, styles.animatedContainer]}>
                  <CatCard {...nextItem} />
                </Animated.View>
              )}
            </View>
            {currentItem ? (
              <PanGestureHandler onGestureEvent={gestureHandler}>
                <Animated.View
                  style={[currentItemAnimatedStyle, styles.animatedContainer]}>
                  <CatCard
                    {...currentItem}
                    nextImage={nextItem?.image || {}}
                    likeAnimationStyle={likeAnimationStyle}
                    dislikeAnimationStyle={dislikeAnimationStyle}
                  />
                </Animated.View>
              </PanGestureHandler>
            ) : (
              <View style={{height: 450, justifyContent: 'center'}}>
                <Text>No more cats :(</Text>
              </View>
            )}
          </>
        )}
        <ButtonGroup
          onPressLeft={() => {
            slideCard('left');
            handleSwipeLeft(currentItem);
          }}
          onPressRight={() => {
            slideCard('right');
            handleSwipeRight(currentItem);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FBFAFE',
    height: '100%',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  animatedContainer: {
    width: '100%',
    height: '60%',
  },
  nextItemContainer: {
    ...StyleSheet.absoluteFillObject,
    marginHorizontal: 20,
    top: 50,
  },
});
