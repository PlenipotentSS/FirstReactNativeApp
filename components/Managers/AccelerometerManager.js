/**
 * AccelerometerManager
 *
 * Created by Patrick Williams in beautiful Seattle, WA.
 */
'use strict';

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  DeviceEventEmitter
} from 'react-native';

var SpringButton = require('../Buttons/SpringButton');

var {
  Accelerometer
} = require('NativeModules');

var accelerometerListener;

Accelerometer.setAccelerometerUpdateInterval(0.1);

var AccelerometerManager = React.createClass({
  getInitialState: function () {
    return {
      x: 0,
      y: 0,
      z: 0,
      gyro: false
    }
  },
  componentDidMount: function () {
    accelerometerListener = DeviceEventEmitter.addListener('AccelerationData', function (data) {
      this.setState({
        x: data.acceleration.x.toFixed(5),
        y: data.acceleration.y.toFixed(5),
        z: data.acceleration.z.toFixed(5)
      });
    }.bind(this));
  },
  componentWillUnmount: function () {
    accelerometerListener.remove();
    Accelerometer.stopAccelerometerUpdates();
  },
  handleStart: function () {
    Accelerometer.startAccelerometerUpdates();
    this.setState({
      gyro: true
    });
  },
  handleStop: function () {
    Accelerometer.stopAccelerometerUpdates();
    this.setState({
      x: 0,
      y: 0,
      z: 0,
      gyro: false
    });
  },
  getTrigger: function() {
    if (this.state.gyro) {
      return (
        <SpringButton action={this.handleStop} style={{backgroundColor: 'red'}} title="Stop" />
      )
    } else {
      return (
        <SpringButton action={this.handleStart} style={{backgroundColor: 'green'}} title="Start" />
      )
    }
  },
  render: function() {
    return (
      <View style={styles.accContainer}>
        <Text>x: {this.state.x}</Text>
        <Text>y: {this.state.y}</Text>
        <Text>z: {this.state.z}</Text>
        <Text />
        {this.getTrigger()}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  accContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  stopButton: {
    color: 'red', 
    margin: 20
  },
  startButton: {
    color: 'green', 
    margin: 20
  }
});

module.exports = AccelerometerManager;