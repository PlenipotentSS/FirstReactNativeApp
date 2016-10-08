'use strict';

import React from 'react';
import {
  AppRegistry,
  Animated,
  NavigatorIOS,
  AlertIOS,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Video from 'react-native-video';

class VideoScreen extends React.Component {
  state = {
    rate: 1,
    volume: 1,
    muted: true,
    resizeMode: 'cover',
    duration: 0.0,
    currentTime: 0.0,
    controls: false,
    paused: false,
    skin: 'custom'
  };

  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
  }

  onLoad(data) {
    this.setState({duration: data.duration});
  }

  onProgress(data) {
    this.setState({currentTime: data.currentTime});
  }

  render() {
    const videoStyle = styles.nativeVideoControls;
    let videoURI = "https://github.com/react-native-community/react-native-video/raw/master/example/broadchurch.mp4";
    return (
      <View>
        <Video
          source={{uri: videoURI}}
          style={videoStyle}
          rate={this.state.rate}
          paused={this.state.paused}
          volume={this.state.volume}
          muted={this.state.muted}
          resizeMode={this.state.resizeMode}
          onLoad={this.onLoad}
          onProgress={this.onProgress}
          onEnd={() => { console.log('Done') }}
          repeat={true}
          controls={this.state.controls}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  nativeVideoControls: {
    top: 184,
    height: 300
  }
})

module.exports = VideoScreen