import React, {Component} from 'react';
import { Text, View } from 'react-native';
import {Button} from "react-native-elements";
import {colors} from "../styles/base";
import deviceStorage from "../services/storage";
import { CSComponent } from "react-central-state";
import {USER_KEY} from "../services/config";
import {goToAuth} from "../services/setRoot";

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: ""
    };
  }

  updateWith() {
    return ["user", "userSignedIn"];
  }

  signOut = async () => {
    try {
      await deviceStorage.removeValue(USER_KEY);
      alert("Saindo...", "efetuando logout.");
      this.setCentralState({ user: {}, userSignedIn: false });
      goToAuth();
    } catch (err) {
      alert("Erro ao sair", err.message);
    }
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Text>Perfil</Text>
        <Text>{this.centralState.user.first_name}</Text>
        <Text>{this.centralState.user.email}</Text>
        <Button
          title="Sign Out"
          rounded
          type="outline"
          onPress={this.signOut}
          buttonStyle={{ backgroundColor: colors.tertiary, marginTop: 15 }}
          titleStyle={{ color: "white" }}
        />
      </View>
    );
  }
}

export default CSComponent(Profile);
