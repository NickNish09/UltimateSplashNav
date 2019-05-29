import React, {Component} from 'react';
import { Text, View } from 'react-native';

export default class SignIn extends Component {


  render() {
    return (
      <View style={{flex: 1}}>
        <Text>SignIn</Text>

        {/*<ScratchView*/}
        {/*id={1} // ScratchView id (Optional)*/}
        {/*brushSize={32} // Default is 10% of the smallest dimension (width/height)*/}
        {/*threshold={30} // Report full scratch after 70 percentage, change as you see fit. Default is 50*/}
        {/*fadeOut={true} // Disable the fade out animation when scratch is done. Default is true*/}
        {/*placeholderColor="#AAAAAA" // Scratch color while image is loading (or while image not present)*/}
        {/*imageUrl="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Akali_9.jpg" // A url to your image (Optional)*/}
        {/*resourceName="akali" // An image resource name (without the extension like '.png/jpg etc') in the native bundle of the app (drawble for Android, Images.xcassets in iOS) (Optional)*/}
        {/*resizeMode="cover" // Resize the image to fit or fill the scratch view. Default is stretch*/}
        {/*onImageLoadFinished={this.onImageLoadFinished} // Event to indicate that the image has done loading*/}
        {/*onTouchStateChanged={this.onScratchTouchStateChanged} // Touch event (to stop a containing FlatList for example)*/}
        {/*onScratchProgressChanged={this.onScratchProgressChanged} // Scratch progress event while scratching*/}
        {/*onScratchDone={this.onScratchDone} // Scratch is done event*/}
        {/*/>*/}
      </View>
    );
  }
}
