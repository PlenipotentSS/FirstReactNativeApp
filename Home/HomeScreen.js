'use strict';

import React from 'react';
import {
  AppRegistry,
  Animated,
  NavigatorIOS,
  StyleSheet,
  Text,
  View
} from 'react-native';

//queue for loading timer
var LOADING = {};

//timer mixin for ease
var TimerMixin = require('react-timer-mixin');

var SpringButton = require('./SpringButton');

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openingScales: [new Animated.Value(0),new Animated.Value(0),new Animated.Value(0)]
    };
  }

  componentDidMount() {
    Animated.stagger(200,[            // spring to start and twirl after decay finishes
      Animated.spring(
        this.state.openingScales[0],
        {
          toValue: 1
        }
      ),
      Animated.parallel([          // after decay, in parallel:
        Animated.spring(
          this.state.openingScales[1],
          {
            toValue: 1
          }
        ),
        Animated.spring(
          this.state.openingScales[2],
          {
            toValue: 1
          }
        )
      ]),
    ]).start(); 
  }

  render() {
    let firstScale = this.state.openingScales[0]
    let secondScale = this.state.openingScales[1]
    let thirdScale = this.state.openingScales[2]
    return (
      <View style={styles.container}>
        <Animated.View style={{
            transform: [
              {scale: firstScale}
            ]
          }}
        >
          <SpringButton />
        </Animated.View>
        <Animated.View style={{
            transform: [
              {scale: secondScale}
            ]
          }}
        >
          <SpringButton />
        </Animated.View>
        <Animated.View style={{
            transform: [
              {scale: thirdScale}
            ]
          }}
        >
          <SpringButton />
        </Animated.View>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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

module.exports = HomeScreen;