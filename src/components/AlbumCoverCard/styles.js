import { StyleSheet } from 'react-native';

import theme from '../../constants/theme';

const styles = StyleSheet.create({
  bgImage: {
    width: '100%',
    height: 175,
    overflow: 'hidden',
    borderRadius: 20,
    marginTop: 16,
    justifyContent: 'flex-end'
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.white,
    marginLeft: 14
  },
  descriptionStyle: {
    fontSize: 16,
    color: theme.white,
    marginLeft: 14,
    marginBottom: 14
  }
});

export default styles;
