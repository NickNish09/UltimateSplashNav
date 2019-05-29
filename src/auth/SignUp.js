import React, { Component } from "react";
import styles from "./Styles";
import {View, ToastAndroid, Alert, ActivityIndicator} from "react-native";
import { colors, fonts } from "../styles/base";
import { Input, Text, Divider, Button } from "react-native-elements";
import api from "../services/api";
import deviceStorage from "../services/storage";
import {USER_KEY} from "../services/config";
import {Navigation} from "react-native-navigation";
import { CSComponent } from "react-central-state";
import {goToHome} from "../services/setRoot";

class SignUp extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      firsName: "",
      nickName: "",
      isSigninInProgress: false
    }
  }

  updateWith() {
    return ["user", "userSignedIn"];
  }

  signInSuccess(token) {
    deviceStorage.saveItem(USER_KEY, token);
    goToHome();
  }

  signUp = async () => {
    let self = this;
    const email = this.state.email;
    const password = this.state.password;
    const name = this.state.firstName;
    const nick_name = this.state.nickName;
    this.setState({isSigninInProgress: true});
    // this.setState({spinner: true});

    if(email !== "" && password !== "" && name !== "" && nick_name !== ""){
      try {
        // login with provider
        api.post("v1/cadastro.json", {
          user: {
            email: email,
            password: password,
            name: name,
            nick: nick_name,
          }
        })
          .then(function (response) {
            ToastAndroid.show('Cadastro feito com sucesso! Entrando...', ToastAndroid.SHORT);
            self.setCentralState({ user: response.data, userSignedIn: true });
            self.signInSuccess(response.data.token);
            this.setState({isSigninInProgress: false});
            // self.setState({spinner: false});
          })
          .catch(function (error) {
            ToastAndroid.show('Erro ao se cadastrar', ToastAndroid.SHORT);
            console.log('erro: '+error);
            this.setState({isSigninInProgress: false});
            // self.setState({spinner: false});
          });
      } catch (err) {
        console.log('error:', err);
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
    let self = this;

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
            underlineColorAndroid="transparent"
            inputContainerStyle={{ borderBottomWidth: 0 }}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Input
            placeholder="Nome"
            onChangeText={firstName => this.setState({ firstName })}
            value={this.state.firstName}
            placeholderTextColor="white"
            inputStyle={{
              backgroundColor: colors.dark_gray,
              borderRadius: 5,
              padding: 10,
              color: "white",
              marginVertical: 10
            }}
            underlineColorAndroid="transparent"
            inputContainerStyle={{ borderBottomWidth: 0 }}
          />
          <Input
            placeholder="Nick no Lol"
            onChangeText={nickName => this.setState({ nickName })}
            value={this.state.nickName}
            placeholderTextColor="white"
            inputStyle={{
              backgroundColor: colors.dark_gray,
              borderRadius: 5,
              padding: 10,
              color: "white",
              marginVertical: 10
            }}
            underlineColorAndroid="transparent"
            inputContainerStyle={{ borderBottomWidth: 0 }}
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
            underlineColorAndroid="transparent"
            inputContainerStyle={{ borderBottomWidth: 0 }}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />

          <Input
            placeholder="Confirmar Senha"
            onChangeText={password_confirmation => this.setState({ password_confirmation })}
            value={this.state.password_confirmation}
            placeholderTextColor="white"
            inputStyle={{
              backgroundColor: colors.dark_gray,
              borderRadius: 5,
              padding: 10,
              color: "white",
              marginVertical: 10
            }}
            underlineColorAndroid="transparent"
            inputContainerStyle={{ borderBottomWidth: 0 }}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
        </View>

        <Divider style={{ marginVertical: 20, marginHorizontal: 10 }} />

        {!this.state.isSigninInProgress ?
          <Button
            title="Fazer cadastro"
            buttonStyle={{
              backgroundColor: colors.secondary,
              marginHorizontal: 15,
              marginVertical: 10
            }}
            disabled={this.state.isSigninInProgress}
            titleStyle={{ color: "black" }}
            onPress={() => {
              if(this.state.password === this.state.password_confirmation){
                self.signUp().done();
              } else {
                Alert.alert(
                  'Senhas não conferem',
                  `Redigite sua senha e confirmação`,
                  [
                    {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  ],
                  { cancelable: true }
                )
              }
            }}
          /> : <ActivityIndicator size="large" color={colors.primary} />
        }

      </View>
    );
  }
}

export default CSComponent(SignUp);
