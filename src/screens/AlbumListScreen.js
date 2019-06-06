import React, { PureComponent } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import AlbumCoverCard from '../components/AlbumCoverCard/AlbumCoverCard';

import { ALBUM_LIST_SCREEN_TITLE } from '../constants/constants';

// temporal data will then be fetched from the mocked server
const mockData = [
  { id: '00', bgImageSource: { uri: 'https://static.boredpanda.com/blog/wp-content/uploads/2015/06/road-landscape-photography-andy-lee-fb__700.jpg' }, title: 'Nieve y Montaña', photoAmount: '10' },
  { id: '01', bgImageSource: { uri: 'https://c.tadst.com/gfx/1200x630/sunset-refraction.jpg?1' }, title: 'Atardecer', photoAmount: '24' },
  { id: '02', bgImageSource: { uri: 'https://media.minutouno.com/adjuntos/150/imagenes/036/144/0036144729.jpg' }, title: 'Tengo hambre', photoAmount: '8' }
];

class AlbumListScreen extends PureComponent {
  static navigationOptions = {
    title: ALBUM_LIST_SCREEN_TITLE
  }

  renderAlbumCard({ item }) {
    return (
      <AlbumCoverCard {...item} onPress={() => {}} />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={mockData}
          renderItem={this.renderAlbumCard}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14
  }
});

export default AlbumListScreen;
