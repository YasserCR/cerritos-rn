import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import firebase from '../utils/firebase';

export default function UserLogged() {
  return (
    <View>
      <Text>Sesión iniciada</Text>
      <Text onPress={() => firebase.auth().signOut()}>Cerrar sesión</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
