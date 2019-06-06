import React from 'react';
import { StatusBar } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import AppReducer from './src/reducers';
import theme from './src/constants/theme';
import AlbumListScreen from './src/screens/AlbumListScreen';

const store = createStore(AppReducer, applyMiddleware(thunk));

const AppNavigator = createStackNavigator({
  AlbumList: {
    screen: AlbumListScreen
  }
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: theme.primaryColor,
    },
    headerTintColor: theme.white,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
});

const AppContainer = createAppContainer(AppNavigator);

StatusBar.setBackgroundColor(theme.darkPrimaryColor);
StatusBar.setBarStyle('light-content');

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

export default App;
