import { AsyncStorage } from 'react-native';

const clear = () => AsyncStorage.clear();

const setItem = (key, body) => AsyncStorage.setItem(key, JSON.stringify(body));

const getItem = key => AsyncStorage.getItem(key);

export { clear, setItem, getItem };
