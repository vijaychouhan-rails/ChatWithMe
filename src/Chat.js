/**
 * Sample React Native Chat
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import randomColor from 'randomcolor';
import Backend from '../Backend';

export default class Chat extends Component<{}> {
  state = {
   messages: [],
 }

 constructor(props) {
   super(props);
   this.renderBubble = this.renderBubble.bind(this);
   this.renderSend = this.renderSend.bind(this);
 }

 onSend(messages = []) {
   this.setState(previousState => ({
     messages: GiftedChat.append(previousState.messages, messages),
   }))
 }

 renderSend(props) {
    return (
      <Send
        {...props}
      >
        <View style={{marginRight: 50, marginBottom: 50}} style={{}}>
            <Image source={require('./images/send.png')} style={{height: 30, width: 30, bottom: 8, marginRight: 10}}/>
        </View>
      </Send>
    );
  }

 renderBubble (props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: 'coral'
          },
          left: {
            backgroundColor: randomColor()
          }
        }}
      />
    )
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
       placeholder="Type your beautiful message"
       isLoadingEarlier
       loadEarlier
       isAnimated
       showUserAvatar
       messages={this.state.messages}
       renderBubble={this.renderBubble}
       renderSend={this.renderSend}
       onSend={(message) => {
         Backend.sendMessage(message);
       }}
       user={{
         _id: Backend.getUid(),
         name: Backend.getName(),
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
