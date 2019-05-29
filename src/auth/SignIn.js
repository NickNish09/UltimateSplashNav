import React, { Component } from "react";
import {View, Text, ToastAndroid, Alert, ActivityIndicator } from "react-native";
import styles from "./Styles";
import { colors, fonts } from "../styles/base";
import {Input, Divider, Button } from "react-native-elements";
import { Navigation } from "react-native-navigation";
import api from "../services/api";
import deviceStorage from "../services/storage";
import { CSComponent } from "react-central-state";
import {USER_KEY} from "../services/config";
import {goToHome} from "../services/setRoot";

class SignIn extends Component {

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    this.state = {
      email: "",
      password: "",
      switchValue: false,
      isSigninInProgress: false,
      userInfo: {},
    }
  }

  componentDidMount(){
  }

  updateWith() {
    return ["user", "userSignedIn"];
  }

  goToSignUp = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "SignUp",
        options: {
          topBar: {
            visible: true,
            drawBehind: false,
            animate: true,
            background: {
              color: colors.primary_dark
            },
            backButton: {
              color: "white"
            },
            title: {
              text: "Cadastro",
              color: "white"
            }
          }
        }
      }
    });
  };

  signInSuccess(token) {
    deviceStorage.saveItem(USER_KEY, token);
    goToHome();
  }

  signInClassic = async () => {
    let self = this;
    const email = this.state.email;
    const password = this.state.password;
    this.setState({isSigninInProgress: true});
    // this.setState({spinner: true});

    if(email !== "" && password !== ""){
      try {
        // login with provider
        api.post("v1/login.json", {
          email: email,
          password: password,
        })
          .then(function (response) {
            ToastAndroid.show('Autenticação feita com sucesso! Entrando...', ToastAndroid.SHORT);
            self.setCentralState({ user: response.data, userSignedIn: true });
            self.signInSuccess(response.data.token);
            this.setState({isSigninInProgress: false});
            // self.setState({spinner: false});
          })
          .catch(function (error) {
            ToastAndroid.show('Erro ao se autenticar', ToastAndroid.SHORT);
            console.log('erro: '+error);
            this.setState({isSigninInProgress: false});
            // self.setState({spinner: false});
          });
      } catch (err) {
        console.log('error:', err)
        this.setState({isSigninInProgress: false});
      }
    } else {
      Alert.alert(
        'Preencha todos os campos',
        `Alguns campos estão em branco. Complete eles para efetuar o cadastro`,
        [
          {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ],
        { cancelable: true }
      );
      this.setState({isSigninInProgress: false});
    }
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: colors.dark, paddingVertical: 20 }
        ]}
      >
        <View>
          <Text
            style={{
              color: "white",
              fontSize: fonts.md_md,
              paddingHorizontal: 15,
              marginBottom: 20,
              letterSpacing: 3
            }}
          >
            SKINS
            <Text
              style={{
                color: colors.secondary,
                fontSize: fonts.md_md,
                fontWeight: "bold",
                letterSpacing: 3
              }}
            >
              GRÁTIS
            </Text>
          </Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Input
            placeholder="Endereço de e-mail"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            placeholderTextColor="white"
            inputStyle={{
              backgroundColor: colors.dark_gray,
              borderRadius: 5,
              padding: 10,
              color: "white",
              marginVertical: 10
            }}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Input
            placeholder="Senha"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            placeholderTextColor="white"
            inputStyle={{
              backgroundColor: colors.dark_gray,
              borderRadius: 5,
              padding: 10,
              color: "white",
              marginVertical: 10
            }}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
        </View>

        <Divider style={{ marginVertical: 20, marginHorizontal: 10 }} />

        {!this.state.isSigninInProgress ? <Button
          title="Entrar"
          buttonStyle={{
            backgroundColor: colors.secondary,
            marginHorizontal: 15,
            marginVertical: 10
          }}
          disabled={this.state.isSigninInProgress}
          titleStyle={{ color: "black" }}
          onPress={() => this.signInClassic().done()}
        /> : <ActivityIndicator size="large" color={colors.primary} />}

        <View
          style={{
            justifyContent: "center",
            paddingHorizontal: 15,
            marginVertical: 20
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            Não tem conta?
            <Text
              style={{
                color: colors.secondary,
                fontSize: 16
              }}
              onPress={this.goToSignUp}
            >
               Faça seu cadastro
            </Text>
          </Text>
        </View>
      </View>
    );
  }
}

export default CSComponent(SignIn);
