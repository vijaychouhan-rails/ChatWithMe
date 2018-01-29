/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import Backend from './Backend';

export default class App extends Component<{}> {
  state = {
   messages: [],
 }

 onSend(messages = []) {
   this.setState(previousState => ({
     messages: GiftedChat.append(previousState.messages, messages),
   }))
 }

 render() {
   return (
     <GiftedChat
       messages={this.state.messages}
       onSend={messages => this.onSend(messages)}
       user={{
         _id: 1,
       }}
     />
   )
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
