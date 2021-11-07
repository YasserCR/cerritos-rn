import React, {useState, useRef} from 'react';
import {StyleSheet, View, Text, Image, ImageBackground} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-easy-toast';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const image = {uri: '../assets/background.jpeg'};

export default function Auth() {
  const toastRef = useRef();
  const [isLogin, setIsLogin] = useState(true);

  const changeForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.view}>
        <Text style={styles.welcome}>¡Bienvenido a </Text>
        <Text style={styles.welcome}>mercado visión!</Text>
        <ImageBackground source={image} style={styles.background} />
        <Image
          style={styles.logo}
          source={require('../assets/logo-simple.png')}
        />
        {isLogin ? (
          <LoginForm changeForm={changeForm} toastRef={toastRef} />
        ) : (
          <RegisterForm changeForm={changeForm} toastRef={toastRef} />
        )}
        <Toast ref={toastRef} position="center" opacity={0.9} />
      </View>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: '60%',
    height: 240,
    marginTop: 10,
    marginBottom: 20,
    marginRight: 50,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  welcome: {
    fontSize: 20,
    fontFamily: 'monospace',
    alignItems: 'center',
  },
});
