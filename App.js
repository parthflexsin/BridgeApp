/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  NativeModules,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

const { TaskManager } = NativeModules

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animating: false
    }
  }
  async componentDidMount() {

  }

  onCalculate = async () => {
    this.setState({ animating: true })
    try {
      let tasks = await TaskManager.cpuFunctions() //await = "wait this line finished"
      this.setState({ animating: false })
      setTimeout(() => {
        alert(`Result of CPU-intensive task is = ${tasks[0].value}`)
      }, 300);
    } catch (error) {
      this.setState({ animating: false })
      setTimeout(() => {
        alert(`Error's: ${error.code}, userInfo = ${JSON.stringify(error.userInfo)}`)
      }, 300);
    }
  }

  render() {
    const { animating } = this.state
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.onCalculate} style={{ height: 50, width: 100, backgroundColor: "#3399cc", borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: "#fff", fontWeight: '700', fontSize: 15 }}>Calculate</Text>
          </TouchableOpacity>
          {animating && <ActivityIndicator size="large" color="red" />}
        </SafeAreaView>
      </>
    );
  };
};

const styles = StyleSheet.create({
});

export default App;
