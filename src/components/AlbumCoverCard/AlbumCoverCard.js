import React from 'react';
import { ImageBackground, Text, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const AlbumCoverCard = ({ index, coverUrl, title, photos, onPress }) => (
  <TouchableWithoutFeedback onPress={() => { onPress(index); }}>
    <ImageBackground source={{ uri: coverUrl }} style={styles.bgImage}>
      <Text style={styles.titleStyle}>{title}</Text>
      <Text style={styles.descriptionStyle}>{`${photos.length} photos`}</Text>
    </ImageBackground>
  </TouchableWithoutFeedback>
);

AlbumCoverCard.propTypes = {
  index: PropTypes.number.isRequired,
  coverUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onPress: PropTypes.func.isRequired
};

export default AlbumCoverCard;
