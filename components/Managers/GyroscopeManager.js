/**
 * GyroscopeManager
 *
 * Created by Patrick Williams in beautiful Seattle, WA.
 */
'use strict';

import React from 'react';
import {
  Text,
  View,
  DeviceEventEmitter
} from 'react-native';

var SpringButton = require('../Buttons/SpringButton');

var {
  Gyroscope
} = require('NativeModules');

var gyroscopeListener;

Gyroscope.setGyroUpdateInterval(0.1);

var GyroscopeManager = React.createClass({
  getInitialState: function () {
    return {
      x: 0,
      y: 0,
      z: 0,
      gyro: false
    }
  },
  componentDidMount: function () {
    gyroscopeListener = DeviceEventEmitter.addListener('GyroData', function (data) {
      this.setState({
        x: data.rotationRate.x.toFixed(5),
        y: data.rotationRate.y.toFixed(5),
        z: data.rotationRate.z.toFixed(5)
      });
    }.bind(this));
  },
  componentWillUnmount: function () {
    gyroscopeListener.remove();
    Gyroscope.stopGyroUpdates();
  },
  handleStart: function () {
    Gyroscope.startGyroUpdates();
    this.setState({
      gyro: true
    });
  },
  handleStop: function () {
    Gyroscope.stopGyroUpdates();
    this.setState({
      x: 0,
      y: 0,
      z: 0,
      gyro: false
    });
  },
  render: function() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text>x: {this.state.x}</Text>
        <Text>y: {this.state.y}</Text>
        <Text>z: {this.state.z}</Text>
        <Text />
        {
          (this.state.gyro) ?
          <SpringButton action={this.handleStop} style={{backgroundColor: 'red'}} title="Stop" /> :
          <SpringButton action={this.handleStart} style={{backgroundColor: 'green'}} title="Start" />
        }
      </View>
    );
  }
});

module.exports = GyroscopeManager;