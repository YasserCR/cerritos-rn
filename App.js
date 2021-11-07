import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, StatusBar, LogBox, Text} from 'react-native';
import {decode, encode} from 'base-64';
import Auth from './src/components/Auth';
import UserLogged from './src/components/UserLogged';
import firebase from './src/utils/firebase';
import 'firebase/auth';

if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

LogBox.ignoreLogs(
  [
    'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
  ],
  [
    "Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.",
  ],
  ['AsyncStorage has been extracted from react-native core '],
);

export default function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(response => {
      setUser(response);
    });
  }, []);

  if (user === undefined) return null;

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.background}>
        {user ? <UserLogged /> : <Auth />}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#f8a809',
    height: '100%',
  },
});
