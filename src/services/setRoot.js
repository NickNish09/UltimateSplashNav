import {Navigation} from "react-native-navigation";

export const goToAuth = () => Navigation.setRoot({
  root: {
    component: {
      name: "SignIn"
    }
  }
});

export const goToHome = () => Navigation.setRoot({
  root: {
    component: {
      name: "Home"
    }
  }
});
