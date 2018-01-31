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

import { loginUser } from './actions/login';

class Login extends Component<{}> {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      email: '',
      name: ''
    }
  }

  onSubmit() {
    const {email, name} = this.state;
    let message = null;
    if(_.isEmpty(name) && _.isEmpty(email)) {
      message = "Name and Email is Required"
    } else {
      if (_.isEmpty(name)) {
        message = "Name is Required"
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
      this.props.actions.loginUser(email, name).then(() => Actions.chat())
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
                     You will see next screen once you will enter your email and name
                  </Text>
                </Body>
              </CardItem>
            </Card>

            <Form>
              <Item>
                <Input
                  placeholder="Name"
                  maxLength = {30}
                  onChangeText={(text) => {this.setState({name: text}); }}
                  value={this.state.name}
                />
              </Item>
              <Item>
                <Input
                  placeholder="Email"
                  onChangeText={(text) => {this.setState({email: text}); }}
                  value={this.state.email}
                />
              </Item>
              <Item>
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
    actions: bindActionCreators({ loginUser }, dispatch),
  }
);

export default connect(null, mapDispatchToProps)(Login);
