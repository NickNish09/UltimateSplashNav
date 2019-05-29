import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { goToAuth, goToHome } from './src/services/setRoot';
import SplashScreen from "react-native-splash-screen";
import api from './src/services/api';
import deviceStorage from "./src/services/storage";

export default class App extends Component {

  async componentDidMount(){
    await this.loadToken();
    api.defaults.headers.common["Authorization"] = this.state.token;
    if(this.state.token !== undefined){
      goToHome();
    } else {
      goToAuth();
    }
    SplashScreen.hide();
  }

  async loadToken() {
    try {
      const value = await deviceStorage.loadToken();
      if (value !== null) {
        this.setState({
          token: value,
          loading: false
        });
      } else {
        this.setState({
          loading: false
        });
      }
    } catch (error) {
      alert("Erro na sincronização do token", error.message);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>cafebabe</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
