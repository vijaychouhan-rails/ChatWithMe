import React from 'react';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import store from './configureStore';
import { Router, Scene } from 'react-native-router-flux';
import Login from './Login';
import SignUp from './SignUp';
import Chat from './Chat';

const RouterWithRedux = connect()(Router);

const AppNavigator = () => (
  <Provider store={store}>
    <RouterWithRedux>
      <Scene>
        <Scene
          key="login"
          component={Login}
          initial
          title="login"
        />
        <Scene
          component={Login}
          title="Users"
          key="users"
        />
        <Scene
          component={SignUp}
          title="SignUp"
          key="signUp"
        />
        <Scene
          component={Chat}
          title="Chat"
          key="chat"
        />
      </Scene>
    </RouterWithRedux>
  </Provider>
);

export default AppNavigator;
