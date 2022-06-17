import React, {useState} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';
import {ButtonGroup} from '../components/ButtonGroup';

import {CatCard, CatCardProps} from '../components/CatCard';
import {SwitchTabs} from '../components/SwitchTabs';
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
          <View style={{width: '100%', height: '75%'}}>
            <CatCard {...catData[0]} />
          </View>
        )}
        <ButtonGroup
          onPressLeft={() => {
            handleSwipeLeft();
          }}
          onPressRight={() => {
            slideCard('right');
            handleSwipeRight();
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
