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
import { GiftedChat } from 'react-native-gifted-chat';
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

 componentDidMount() {
   Backend.loadMessages((message) => {
     this.setState((previousState) => {
       return {
         messages: GiftedChat.append(previousState.messages, message),
       }
     })
   })
 }

 render() {
   return (
     <GiftedChat
       messages={this.state.messages}
       onSend={(message) => {
         Backend.sendMessage(message);
       }}
       user={{
         _id: Backend.getUid(),
         name: `vijay${Backend.getUid()}`,
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
