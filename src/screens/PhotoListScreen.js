import React, { PureComponent } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';

import { PHOTO_LIST_SCREEN_DEFAULT_TITLE, PHOTO_LIST_COLUMN_COUNT } from '../constants/constants';

const { width } = Dimensions.get('window');

class PhotoListScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const album = navigation.getParam('album');
    return {
      title: album.title || PHOTO_LIST_SCREEN_DEFAULT_TITLE,
      headerBackTitle: null
    };
  }

  constructor(props) {
    super(props);
    this.goToPhotoDetail = this.goToPhotoDetail.bind(this);
    this.renderPhoto = this.renderPhoto.bind(this);
  }

  goToPhotoDetail(id) {
    const { navigation } = this.props;
    navigation.navigate('PhotoDetail', { photoId: id });
  }

  renderPhoto({ item }) {
    return (
      <TouchableWithoutFeedback onPress={() => { this.goToPhotoDetail(item.id); }}>
        <Image style={styles.photo} source={{ uri: item.thumbnailUrl }} />
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const { navigation } = this.props;
    const { photos } = navigation.getParam('album');
    return (
      <View style={styles.container}>
        <FlatList
          data={photos}
          renderItem={this.renderPhoto}
          numColumns={PHOTO_LIST_COLUMN_COUNT}
          keyExtractor={item => item.id}
          style={styles.photosContainer}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  photosContainer: {
    padding: 1
  },
  photo: {
    height: (width - 8) / PHOTO_LIST_COLUMN_COUNT,
    width: (width - 8) / PHOTO_LIST_COLUMN_COUNT,
    margin: 1
  }
});

export default PhotoListScreen;
