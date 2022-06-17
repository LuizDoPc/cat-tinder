import {useEffect, useMemo, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {PanGestureHandlerGestureEvent} from 'react-native-gesture-handler';
import {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {CatCardProps} from '../components/CatCard';

const ROTATION_ANGLE = 60;
const SWIPE_LIMIT = 150;

type onSwipeFunc = (item: CatCardProps) => void;

export const useAnimateCards = (
  catData: CatCardProps[],
  onSwipeLeft: onSwipeFunc,
  onSwipeRight: onSwipeFunc,
) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentItem = useMemo(
    () => catData[currentIndex],
    [catData, currentIndex],
  );
  const nextItem = useMemo(
    () => catData[currentIndex + 1],
    [catData, currentIndex],
  );

  const translateX = useSharedValue(0);
  const {width: screenWidth} = useWindowDimensions();
  const hiddenTranslateX = 2 * screenWidth;

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {startX: number}
  >({
    onStart: (_, context) => {
      context.startX = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
    },
    onEnd: event => {
      if (Math.abs(event.translationX) < SWIPE_LIMIT) {
        translateX.value = withSpring(0);
        return;
      }

      const onSwipe = event.translationX > 0 ? onSwipeRight : onSwipeLeft;

      onSwipe && runOnJS(onSwipe)(currentItem);

      if (catData.length === currentIndex) {
        translateX.value = hiddenTranslateX;
      } else {
        translateX.value = withTiming(
          Math.sign(event.translationX) * hiddenTranslateX,
          {duration: 200},
          () => runOnJS(setCurrentIndex)(currentIndex + 1),
        );
      }
    },
  });

  const slideCard = (direction: 'right' | 'left') => {
    translateX.value = withTiming(
      direction === 'left' ? -hiddenTranslateX : hiddenTranslateX,
      {duration: 500},
      () => runOnJS(setCurrentIndex)(currentIndex + 1),
    );
  };

  const rotate = useDerivedValue(
    () =>
      interpolate(
        translateX.value,
        [0, hiddenTranslateX],
        [0, ROTATION_ANGLE],
      ) + 'deg',
  );

  const currentItemAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
      {
        rotate: rotate.value,
      },
    ],
  }));
  const nextItemAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          translateX.value,
          [-hiddenTranslateX, 0, hiddenTranslateX],
          [1, 0.8, 1],
        ),
      },
    ],
    opacity: interpolate(
      translateX.value,
      [-hiddenTranslateX, 0, hiddenTranslateX],
      [1, 0.6, 1],
    ),
  }));

  const likeAnimationStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, screenWidth - 200], [0, 1]),
  }));

  const dislikeAnimationStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, -screenWidth + 200], [0, 1]),
  }));

  useEffect(() => {
    translateX.value = 0;
  }, [currentIndex, translateX]);

  return {
    currentItem,
    translateX,
    slideCard,
    hiddenTranslateX,
    nextItem,
    currentItemAnimatedStyle,
    nextItemAnimatedStyle,
    likeAnimationStyle,
    dislikeAnimationStyle,
    gestureHandler,
  };
};
