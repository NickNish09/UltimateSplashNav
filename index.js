import Home from './src/scratch/Scratch';
import SignIn from './src/auth/SignIn';
import Profile from './src/profile/Profile';
import App from './App';

import { Navigation } from "react-native-navigation";

Navigation.registerComponent(`App`, () => App);
Navigation.registerComponent(`Home`, () => Home);
Navigation.registerComponent(`SignIn`, () => SignIn);
Navigation.registerComponent(`Profile`, () => Profile);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component:{
        name: "App"
      }
    }
  })
});
