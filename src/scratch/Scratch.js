import React, {Component} from 'react';
import { Text, View } from 'react-native';
import ScratchView from 'react-native-scratch';
import orianna_img from '../assets/images/orianna.png';

export default class Scratch extends Component {

  onImageLoadFinished = ({ id, success }) => {
    // Do something
  };

  onScratchProgressChanged = ({ value, id }) => {
    // Do domething like showing the progress to the user
  };

  onScratchDone = ({ isScratchDone, id }) => {
    // Do something
  };

  onScratchTouchStateChanged = ({ id, touchState }) => {
    // Example: change a state value to stop a containing
    // FlatList from scrolling while scratching
    this.setState({ scrollEnabled: !touchState });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Text>Raspadinha</Text>
        <ScratchView
        id={1} // ScratchView id (Optional)
        brushSize={30} // Default is 10% of the smallest dimension (width/height)
        threshold={30} // Report full scratch after 70 percentage, change as you see fit. Default is 50
        fadeOut={true} // Disable the fade out animation when scratch is done. Default is true
        placeholderColor="#aaace0" // Scratch color while image is loading (or while image not present)
        imageUrl="https://i.imgur.com/6qNjIgz.jpg" // A url to your image (Optional)
        resourceName="akali" // An image resource name (without the extension like '.png/jpg etc') in the native bundle of the app (drawble for Android, Images.xcassets in iOS) (Optional)
        resizeMode="cover" // Resize the image to fit or fill the scratch view. Default is stretch
        onImageLoadFinished={this.onImageLoadFinished} // Event to indicate that the image has done loading
        onTouchStateChanged={this.onScratchTouchStateChanged} // Touch event (to stop a containing FlatList for example)
        onScratchProgressChanged={this.onScratchProgressChanged} // Scratch progress event while scratching
        onScratchDone={this.onScratchDone} // Scratch is done event
        />
      </View>
    );
  }
}
