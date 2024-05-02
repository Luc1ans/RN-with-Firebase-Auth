import { Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import firebase from 'firebase';
import React, { useState, useEffect } from 'react';

import { Card } from 'react-native-paper';

const config = {
  apiKey: 'AIzaSyCp2okk2cq66Ai92ZkCiI3ec3KT-muXZCw',
  authDomain: 'asheketchum-569c6.firebaseapp.com',
  projectId: 'asheketchum-569c6',
  storageBucket: 'asheketchum-569c6.appspot.com',
  messagingSenderId: '445298222063',
  appId: '1:445298222063:web:865613363f5dec54b68c1a',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

const App = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [mensagemCadastro, setMensagemCadastro] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUsuarioLogado(user);
      } else {
        setUsuarioLogado(null);
      }
    });
    return unsubscribe;
  }, []);

  function fazerLogin() {
    auth
      .signInWithEmailAndPassword(email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        setEmail('');
        setSenha('');
        setMensagemCadastro('');
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  function criarUsuario() {
    auth
      .createUserWithEmailAndPassword(email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        setMensagemCadastro('Usuário cadastrado');
        setEmail('');
        setSenha('');
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {})
      setMensagemCadastro('')
      
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          onChangeText={setSenha}
          value={senha}
          placeholder="Senha"
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={fazerLogin} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        {mensagemCadastro ? <Text style={styles.mensagemCadastro}>{mensagemCadastro}</Text> : null}
      </View>
      {usuarioLogado && (
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfo}>
            {'\n'}
            {'\n'} Usuário logado: {usuarioLogado.email}
            {'\n'}
          </Text>
          <TouchableOpacity onPress={handleLogout} style={styles.button}>
            <Text style={styles.buttonText}>Sair</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.header}>
        <Text style={styles.headerText}>Não tem uma conta? Cadastre-se</Text>
        <TouchableOpacity onPress={criarUsuario} style={styles.buttonCadastrar}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  header: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  form: {
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonCadastrar: {
    backgroundColor: 'blue',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userInfoContainer: {
    alignItems: 'center',
  },
  userInfo: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
  },
  mensagemCadastro: {
    textAlign: 'center',
    color: 'green',
    marginTop: 10,
  },
});

export default App;
