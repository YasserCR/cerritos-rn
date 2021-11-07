import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {validateEmail} from '../utils/validations';
import firebase from '../utils/firebase';
import Loading from './Loading';

export default function LoginForm(props) {
  const {changeForm, toastRef} = props;
  const [formData, setFormData] = useState(defaultValue());
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState({});

  const login = () => {
    let errors = {};
    if (!formData.email || !formData.password) {
      toastRef.current.show('Todos los campos son obligatorios');
    } else if (!formData.email) {
      toastRef.current.show('Introduce un correo');
      errors.email = true;
    } else if (!formData.password) {
      toastRef.current.show('Introduce una contraseña');
      errors.password = true;
    } else if (!validateEmail(formData.email)) {
      toastRef.current.show('Introduce un correo valido');
      errors.email = true;
    } else {
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          setLoading(false);
          toastRef.current.show('Sesión iniciada correctamente');
        })
        .catch(() => {
          setLoading(false);
          toastRef.current.show('Email o contraseña incorrecta');
          setFormError({
            email: true,
            password: true,
          });
        });
    }
    setFormError(errors);
  };

  const onChange = (e, type) => {
    setFormData({...formData, [type]: e.nativeEvent.text});
  };

  return (
    <>
      <TextInput
        style={[styles.input, formError.email && styles.errorInput]}
        placeholder="Correo electrónico"
        placeholderTextColor="#969696"
        onChange={e => onChange(e, 'email')}
      />
      <TextInput
        style={[styles.input, formError.password && styles.errorInput]}
        placeholder="Contraseña"
        placeholderTextColor="#969696"
        secureTextEntry={true}
        onChange={e => onChange(e, 'password')}
      />
      <TouchableOpacity onPress={login}>
        <Text style={styles.btnText}>Iniciar sesión</Text>
        <Loading isVisible={loading} text="Iniciando sesion" />
      </TouchableOpacity>

      <View style={styles.register}>
        <TouchableOpacity onPress={changeForm}>
          <Text style={styles.btnText}>Registrate</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
function defaultValue() {
  return {
    email: '',
    password: '',
  };
}

const styles = StyleSheet.create({
  btnText: {
    color: '#fff',
    fontSize: 18,
  },
  input: {
    height: 50,
    color: '#000000',
    width: '80%',
    marginBottom: 25,
    backgroundColor: '#f4faf8',
    paddingHorizontal: 20,
    borderRadius: 50,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#f4faf8',
  },
  register: {
    flex: 1,
    marginBottom: 10,
    marginTop: 100,
  },
  errorInput: {
    borderColor: '#000000',
  },
});
