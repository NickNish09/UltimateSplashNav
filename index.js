import Home from './src/home/Home';
import SignIn from './src/auth/SignIn';
import SignUp from './src/auth/SignUp';
import Profile from './src/profile/Profile';
import Screen1 from './src/screen1/Screen1';
import Screen2 from './src/screen2/Screen2';
import App from './App';

import { Navigation } from "react-native-navigation";

Navigation.registerComponent(`App`, () => App);
Navigation.registerComponent(`Home`, () => Home);
Navigation.registerComponent(`SignIn`, () => SignIn);
Navigation.registerComponent(`SignUp`, () => SignUp);
Navigation.registerComponent(`Profile`, () => Profile);
Navigation.registerComponent(`Screen1`, () => Screen1);
Navigation.registerComponent(`Screen2`, () => Screen2);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component:{
        name: "App"
      }
    }
  })
});
