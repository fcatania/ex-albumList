import React, { PureComponent } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import AlbumCoverCard from '../components/AlbumCoverCard/AlbumCoverCard';
import * as albumActions from '../actions/albums';
import { ALBUM_LIST_SCREEN_TITLE } from '../constants/constants';

class AlbumListScreen extends PureComponent {
  static navigationOptions = {
    title: ALBUM_LIST_SCREEN_TITLE,
    headerBackTitle: null
  }

  constructor(props) {
    super(props);
    this.goToPhotoList = this.goToPhotoList.bind(this);
    this.renderAlbumCard = this.renderAlbumCard.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  componentDidMount() {
    const { fetchAlbumList } = this.props;
    fetchAlbumList();
  }

  goToPhotoList(index) {
    const { navigation, albums } = this.props;
    const albumPressed = albums[index];
    navigation.navigate('PhotoList', { album: albumPressed });
  }

  renderAlbumCard({ item, index }) {
    return (
      <AlbumCoverCard {...item} index={index} onPress={this.goToPhotoList} />
    );
  }

  renderContent() {
    const { isFetching, success, error, albums } = this.props;
    let content = null;
    if (isFetching) {
      content = (
        <View style={styles.centeredContentContainer}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    if (success) {
      content = (
        <View style={styles.container}>
          <FlatList
            data={albums}
            renderItem={this.renderAlbumCard}
            keyExtractor={item => item.id}
          />
        </View>
      );
    }
    if (error) {
      content = (
        <View style={styles.centeredContentContainer}>
          <Text>Error. Reintentar en unos minutos.</Text>
        </View>
      );
    }
    return content;
  }

  render() {
    return this.renderContent();
  }
}

AlbumListScreen.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  isFetching: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  fetchAlbumList: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14
  },
  centeredContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
