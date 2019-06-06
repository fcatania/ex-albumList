import React from 'react';
import { ImageBackground, Text, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const AlbumCoverCard = ({ bgImageSource, title, photoAmount, onPress }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <ImageBackground source={bgImageSource} style={styles.bgImage}>
      <Text style={styles.titleStyle}>{title}</Text>
      <Text style={styles.descriptionStyle}>{`${photoAmount} photos`}</Text>
    </ImageBackground>
  </TouchableWithoutFeedback>
);

AlbumCoverCard.propTypes = {
  bgImageSource: PropTypes.shape().isRequired,
  title: PropTypes.string.isRequired,
  photoAmount: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default AlbumCoverCard;
