import React, {Component} from 'react';
import { StyleSheet, ImageBackground, View} from 'react-native';
import { goToAuth, goToHome } from './src/services/setRoot';
import SplashScreen from "react-native-splash-screen";
import { CSComponent } from "react-central-state";
import api from './src/services/api';
import deviceStorage from "./src/services/storage";
import {Image} from "react-native-elements";

class App extends Component {

  async componentDidMount(){
    await this.loadToken();
    api.defaults.headers.common["Authorization"] = this.state.token;
    if(this.state.token !== undefined){
      api.post("v1/token_login.json", {
        token: this.state.token
      })
        .then(response => {
          console.log(response);
          this.setCentralState({user: response.data, userSignedIn: true});
          goToHome();
        })
        .catch(err => {
          console.log(err);
          this.setCentralState({userSignedIn: false});
          goToAuth();
        });
    } else {
      goToAuth();
    }
    SplashScreen.hide();
  }

  updateWith() {
    return ["user", "userSignedIn"];
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
        <ImageBackground source={require('./src/assets/images/splash_background.png')} style={styles.backgroundImage}>
          <Image style={{height: 100, width: '100%'}} source={require('./src/assets/images/fenix_logo.png')}/>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#06060b',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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

export default CSComponent(App)
