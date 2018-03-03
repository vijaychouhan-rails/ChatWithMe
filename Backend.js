import firebase from 'firebase';
import DeviceInfo from 'react-native-device-info'
import store from './src/configureStore';

const currentUser = () => store.getState().getIn(['userAuth']).toJS();

class Backend {
  uid = DeviceInfo.getUniqueID();
  messageRef = null;
  page = 0;
  constructor() {
    firebase.initializeApp({
      apiKey: "AIzaSyBLcGjd51hl3UfMbPQxodnF28-_4vG-vpE",
      authDomain: "chatwithmedemo.firebaseapp.com",
      databaseURL: "https://chatwithmedemo.firebaseio.com",
      storageBucket: "chatwithmedemo.appspot.com",
    })
    // firebase.auth().signInAnonymously().catch((error) => {
    //   // this.setUid(Math.random(10000)*100000000)
    // })
  }

  getFireBase() {
    return firebase;
  }

  // login() {
  //   .signInWithEmailAndPassword(email, password)
  //   .then((user) => {
  //     // If you need to do anything with the user, do it here
  //     // The user will be logged in automatically by the
  //     // `onAuthStateChanged` listener we set up in App.js earlier
  //   })
  //   .catch((error) => {
  //     const { code, message } = error;
  //     // For details of error codes, see the docs
  //     // The message contains the default Firebase string
  //     // representation of the error
  //   });
  // }

  setUid() {}

  getUid(value) {
    email = currentUser().email;
    console.log("email", email);
    this.uid = email.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0)
    return this.uid;
  }

  getName() {
    return currentUser().name;
  }

  loadMessages(callback) {
    this.page = this.page + 1;
    console.log("===========page===============", this.page)
    this.messagesRef = firebase.database().ref('messages');
    this.messagesRef.off();
    const onReceive = (data) => {
      const message = data.val();
      callback({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.user._id,
          name: message.user.name,
        }
      })
    }
    // this.messagesRef.limitToLast(20).startAt(1).on('child_added', onReceive);
    this.messagesRef.limitToLast(20).on('child_added', onReceive);
  }

  sendMessage(message) {
    for(let i = 0; i < message.length; i++) {
      this.messagesRef.push({
        text: message[i].text,
        user: message[i].user,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      });
    }
  }

  closeChat() {
    if (this.messagesRef) {
      this.messagesRef.off();
    }
  }
}

export default new Backend();
