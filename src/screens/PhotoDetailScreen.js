import React, { PureComponent } from 'react';
import { View, StyleSheet, Image, StatusBar } from 'react-native';

import theme from '../constants/theme';

// temporal data will then be fetched from the mocked server
const mockData = {
  id: '001',
  fullUrl: 'https://wallpapercave.com/wp/sS1W57t.jpg'
};

class PhotoDetailScreen extends PureComponent {
  static navigationOptions = {
    title: null,
    headerStyle: {
      backgroundColor: theme.black
    },
    headerTransparent: true
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={theme.black} />
        <Image resizeMode="contain" style={styles.photo} source={{ uri: mockData.fullUrl }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.black
  },
  photo: {
    height: '100%',
    width: '100%'
  }
});

export default PhotoDetailScreen;
