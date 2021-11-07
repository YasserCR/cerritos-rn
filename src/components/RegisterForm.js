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

export default function RegisterForm(props) {
  const {changeForm, toastRef} = props;
  // eslint-disable-next-line no-undef
  const [formData, setFormData] = useState(defaultValue());
  // eslint-disable-next-line no-undef
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);

  const register = () => {
    let errors = {};
    if (!formData.email || !formData.password || !formData.repeatPassword) {
      toastRef.current.show('Todos los campos son obligatorios');
    } else if (!formData.email) {
      errors.email = true;
    } else if (!formData.password) {
      errors.password = true;
    } else if (!formData.repeatPassword) {
      errors.repeatPassword = true;
    } else if (!validateEmail(formData.email)) {
      toastRef.current.show('Introduce un correo valido');
      errors.email = true;
    } else if (formData.password !== formData.repeatPassword) {
      toastRef.current.show('Las contraseñas tienen que ser iguales');
      errors.password = true;
      errors.repeatPassword = true;
    } else if (formData.password.length < 6) {
      toastRef.current.show(
        'La contraseña debe de tener al menos 6 caracteres',
      );
      errors.password = true;
      errors.repeatPassword = true;
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          setFormError({
            email: true,
            password: true,
            repeatPassword: true,
          });
          setLoading(false);
          toastRef.current.show('El email ya está en uso');
        });
    }
    setFormError(errors);
  };

  return (
    <>
      <TextInput
        style={[styles.input, formError.email && styles.errorInput]}
        placeholder="Correo electrónico"
        placeholderTextColor="#969696"
        onChange={e => setFormData({...formData, email: e.nativeEvent.text})}
      />

      <TextInput
        style={[styles.input, formError.password && styles.errorInput]}
        placeholder="Contraseña"
        placeholderTextColor="#969696"
        secureTextEntry={true}
        onChange={e => setFormData({...formData, password: e.nativeEvent.text})}
      />

      <TextInput
        style={[styles.input, formError.repeatPassword && styles.errorInput]}
        placeholder="Repetir contraseña"
        placeholderTextColor="#969696"
        secureTextEntry={true}
        onChange={e =>
          setFormData({...formData, repeatPassword: e.nativeEvent.text})
        }
      />

      <TouchableOpacity onPress={register}>
        <Text style={styles.btnText}>Registrarse</Text>
        <Loading isVisible={loading} text="Creando cuenta" />
      </TouchableOpacity>

      <View style={styles.login}>
        <TouchableOpacity onPress={changeForm}>
          <Text style={styles.btnText}>Inicia sesión aquí</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

function defaultValue() {
  return {
    email: '',
    password: '',
    repeatPassword: '',
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
  login: {
    flex: 1,
    marginBottom: 10,
    marginTop: 25,
  },
  errorInput: {
    borderColor: '#000000',
  },
  iconRight: {
    color: '#c1c1c1',
  },
  inputForm: {
    width: '100%',
    marginTop: 20,
  },
});
