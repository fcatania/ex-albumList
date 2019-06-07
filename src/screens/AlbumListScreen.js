import React, { PureComponent } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import AlbumCoverCard from '../components/AlbumCoverCard/AlbumCoverCard';
import albumActions from '../actions/albums';
import { ALBUM_LIST_SCREEN_TITLE } from '../constants/constants';

// temporal data will then be fetched from the mocked server
const mockPhotosArray = [
  { id: '000', thumbnailUrl: 'https://www.pressandjournal.co.uk/wp-content/uploads/sites/2/2016/12/road-558x372.jpg' },
  { id: '001', thumbnailUrl: 'https://www.pressandjournal.co.uk/wp-content/uploads/sites/2/2016/12/road-558x372.jpg' },
  { id: '002', thumbnailUrl: 'https://www.pressandjournal.co.uk/wp-content/uploads/sites/2/2016/12/road-558x372.jpg' },
  { id: '003', thumbnailUrl: 'https://www.pressandjournal.co.uk/wp-content/uploads/sites/2/2016/12/road-558x372.jpg' },
  { id: '004', thumbnailUrl: 'https://www.pressandjournal.co.uk/wp-content/uploads/sites/2/2016/12/road-558x372.jpg' }
];

const mockData = [
  { id: '00', coverUrl: 'https://static.boredpanda.com/blog/wp-content/uploads/2015/06/road-landscape-photography-andy-lee-fb__700.jpg', title: 'Nieve y Montaña', photos: mockPhotosArray, description: 'Este album esta re cheto y re piola porque lo hice yo solito.' },
  { id: '01', coverUrl: 'https://c.tadst.com/gfx/1200x630/sunset-refraction.jpg?1', title: 'Atardeceres', photos: [], description: 'Este album esta re cheto y re piola porque lo hice yo solito.' },
  { id: '02', coverUrl: 'https://media.minutouno.com/adjuntos/150/imagenes/036/144/0036144729.jpg', title: 'Asaduki', photos: [], description: 'Este album esta re cheto y re piola porque lo hice yo solito.' }
];

class AlbumListScreen extends PureComponent {
  static navigationOptions = {
    title: ALBUM_LIST_SCREEN_TITLE,
    headerBackTitle: null
  }

  constructor(props) {
    super(props);
    this.goToPhotoList = this.goToPhotoList.bind(this);
    this.renderAlbumCard = this.renderAlbumCard.bind(this);
  }

  componentDidMount() {
    const { fetchAlbumList } = this.props;
    fetchAlbumList();
  }

  goToPhotoList(index) {
    const { navigation } = this.props;
    const albumPressed = mockData[index];
    navigation.navigate('PhotoList', { album: albumPressed });
  }

  renderAlbumCard({ item, index }) {
    return (
      <AlbumCoverCard {...item} index={index} onPress={this.goToPhotoList} />
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

AlbumListScreen.propTypes = {
  fetchAlbumList: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14
  }
});

const mapStateToProps = ({ albumReducer }) => ({
  isFetching: albumReducer.isFetching,
  success: albumReducer.success,
  error: albumReducer.error,
  albums: albumReducer.data
});

const mapDispatchToProps = dispatch => (
  bindActionCreators(albumActions, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(AlbumListScreen);
