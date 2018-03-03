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
import { connect } from 'react-redux';
import randomColor from 'randomcolor';
import Backend from '../Backend';

class Chat extends Component<{}> {
  state = {
   messages: [],
   loadEarlier: true,
   isLoadingEarlier: true,
 }

 constructor(props) {
   super(props);
   this.renderBubble = this.renderBubble.bind(this);
   this.renderSend = this.renderSend.bind(this);
   this.loadEarlierMessages = this.loadEarlierMessages.bind(this);
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
     this.setState
     ((previousState) => {
       return {
         messages: GiftedChat.append(previousState.messages, message),
         isLoadingEarlier: false,
       }
     })
   })
 }

 loadEarlierMessages() {
   this.setState({
     isLoadingEarlier: true,
   })
   Backend.loadMessages((message) => {
     this.setState((previousState) => {
       console.log("=============previousState=========", previousState, message)
       return {
         messages: GiftedChat.append(previousState.messages, message),
       }
     })
   })
 }

 render() {
   const uid = this.props.user.get('uid');
   const email = this.props.user.get('email');

   return (
     <GiftedChat
       placeholder="Type your beautiful message"
       isLoadingEarlier={this.state.isLoadingEarlier}
       loadEarlier
       isAnimated
       showUserAvatar
       messages={this.state.messages}
       renderBubble={this.renderBubble}
       renderSend={this.renderSend}
       onLoadEarlier={() => this.loadEarlierMessages()}
       onSend={(message) => {
         Backend.sendMessage(message);
       }}
       user={{
         _id: uid,
         name: email,
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

const mapStateToProps = state => (
  {
    user: state.getIn(['userAuth']),
  }
);

export default connect(mapStateToProps)(Chat);
