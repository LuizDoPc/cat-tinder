import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {Assets} from '../../assets';

export interface CatCardProps {
  image: {
    id: string;
    url: string;
  };
  nextImage: {
    id: string;
    url: string;
  };
  name: string;
  origin: string;
  affection_level: number;
  likeAnimationStyle: any;
  dislikeAnimationStyle: any;
}

export const CatCard = ({
  name,
  image,
  nextImage,
  origin,
  affection_level,
  likeAnimationStyle,
  dislikeAnimationStyle,
}: CatCardProps) => {
  return (
    <View style={styles.container} testID="cat-card">
      {!!nextImage && (
        <Image
          key={nextImage.id}
          source={{uri: nextImage.url, cache: 'force-cache'}}
          style={styles.nextImage}
        />
      )}
      <Image
        key={image.id}
        source={{uri: image.url, cache: 'force-cache'}}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.catName}>{name}</Text>
          <Text style={styles.catOrigin}>{origin}</Text>
        </View>
        <Text style={styles.rightText}>{affection_level}</Text>
      </View>

      {!!likeAnimationStyle && (
        <Animated.Image
          source={Assets.like}
          style={[
            {
              position: 'absolute',
              top: 150,
              left: 80,
              height: 140,
              width: 205,
            },
            likeAnimationStyle,
          ]}
        />
      )}

      {!!dislikeAnimationStyle && (
        <Animated.Image
          source={Assets.dislike}
          style={[
            {
              position: 'absolute',
              top: 150,
              left: 80,
              height: 140,
              width: 205,
            },
            dislikeAnimationStyle,
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',

    marginTop: 30,
    borderRadius: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',

    backgroundColor: '#fff',
    borderRadius: 20,
  },
  nextImage: {
    width: '100%',
    height: '100%',

    borderRadius: 20,
    display: 'none',
  },
  infoContainer: {
    width: '85%',
    height: 50,

    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: 10,
    paddingHorizontal: 15,
    marginTop: -50,

    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  leftContainer: {},
  catName: {
    fontWeight: '600',
  },
  catOrigin: {
    color: 'grey',
    fontSize: 10,
  },
  rightText: {
    fontWeight: '600',
  },
});
