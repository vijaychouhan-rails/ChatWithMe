import React, { Component } from 'react';
import {
  Container,
  Button,
  Text,
  Content,
  Card,
  CardItem,
  Body,
  Form,
  Item,
  Input,
} from 'native-base';
import isEmail from 'validator/lib/isEmail';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import {
  Alert,
} from 'react-native';

import { signUpUser } from './actions/login';

class SignUp extends Component<{}> {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      email: '',
      password: ''
    }
  }

  onSubmit() {
    const {email, password} = this.state;
    let message = null;
    if(_.isEmpty(password) && _.isEmpty(email)) {
      message = "Password and Email is Required"
    } else {
      if (_.isEmpty(password)) {
        message = "Password is Required"
      }

      if (_.isEmpty(email)) {
        message = "Email is Required"
      } else {
        if (!isEmail(email)){
          message = "Invalid Email"
        }
      }
    }

    if (!_.isEmpty(message)) {
      Alert.alert(
        'Validation Error',
        message,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: true }
      )
    } else {
      this.props.actions.signUpUser(email, password).then((res) => {
        if(res.success) {
          Actions.chat()
        } else {
          alert(res.error)
        }
      })
    }

  }

  render() {
     return (
       <Container style={{backgroundColor: 'white'}}>
         <Content>
           <Card>
              <CardItem>
                <Body>
                  <Text>
                     Signup and get access.
                  </Text>
                </Body>
              </CardItem>
            </Card>

            <Form>
              <Item>
                <Input
                  placeholder="Email"
                  onChangeText={(text) => {this.setState({email: text}); }}
                  value={this.state.email}
                />
              </Item>
              <Item>
                <Input
                  placeholder="Password"
                  maxLength = {30}
                  onChangeText={(text) => {this.setState({password: text}); }}
                  value={this.state.password}
                  secureTextEntry
                />
              </Item>
              <Item last>
                <Button onPress={() => { this.onSubmit() }} style={{marginTop: 10}}>
                  <Text>Submit! </Text>
                </Button>
              </Item>
            </Form>

          </Content>
       </Container>
     )
   }
}

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators({ signUpUser }, dispatch),
  }
);

export default connect(null, mapDispatchToProps)(SignUp);
