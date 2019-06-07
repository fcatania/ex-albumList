import React, { PureComponent } from 'react';
import { View, StyleSheet, Image, StatusBar, ActivityIndicator, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as albumActions from '../actions/albums';
import theme from '../constants/theme';

class PhotoDetailScreen extends PureComponent {
  static navigationOptions = {
    title: null,
    headerStyle: {
      backgroundColor: theme.black
    },
    headerTransparent: true
  }

  constructor(props) {
    super(props);
    this.renderContent = this.renderContent.bind(this);
  }

  componentWillMount() {
    const { navigation, fetchPhotoDetail } = this.props;
    const photoId = navigation.getParam('photoId');
    fetchPhotoDetail(photoId);
  }

  renderContent() {
    const { isFetching, success, error, photo } = this.props;
    let content = null;
    if (isFetching) {
      content = (
        <View style={styles.centeredContentContainer}>
          <ActivityIndicator size="large" color={theme.white} />
        </View>
      );
    }
    if (success) {
      content = (
        <View style={styles.container}>
          <Image resizeMode="contain" style={styles.photo} source={{ uri: photo.fullUrl }} />
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
    return (
      <React.Fragment>
        <StatusBar backgroundColor={theme.black} />
        {this.renderContent()}
      </React.Fragment>
    );
  }
}

PhotoDetailScreen.propTypes = {
  photo: PropTypes.shape().isRequired,
  isFetching: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  fetchPhotoDetail: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.black
  },
  centeredContentContainer: {
    flex: 1,
    backgroundColor: theme.black,
    justifyContent: 'center',
    alignItems: 'center'
  },
  photo: {
    height: '100%',
    width: '100%'
  }
});

const mapStateToProps = ({ albumReducer }) => ({
  isFetching: albumReducer.photoDetail.isFetching,
  success: albumReducer.photoDetail.success,
  error: albumReducer.photoDetail.error,
  photo: albumReducer.photoDetail.data
});

const mapDispatchToProps = dispatch => (
  bindActionCreators(albumActions, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(PhotoDetailScreen);
