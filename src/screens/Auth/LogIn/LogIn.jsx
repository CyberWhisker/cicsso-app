import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Avatar, Button, Card, TextInput, Title, Subheading } from 'react-native-paper';

state = {
    email: '',
    password: '',
};

handleEmailChange = (email) => {
    this.setState({ email });
};

handlePasswordChange = (password) => {
    this.setState({ password });
};

function LogIn() {
    const navigation = useNavigation();
    const { email, password } = this.state;
    const logo = require('../../../../assets/images/appImg/Logo.png');
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
          <Card style={styles.card}>
            <Card.Content style={styles.content}>
              <Avatar.Image source={logo} size={100} style={styles.avatar} />
              <Title style={styles.title}>Log In</Title>
              <Subheading style={styles.subheading}>Please enter your details</Subheading>
              <TextInput
              label="Email"
              value={email}
              onChangeText={this.handleEmailChange}
              style={styles.textInput}
              mode="outlined"
              keyboardType="email-address"
              />
              <TextInput
              label="Password"
              value={password}
              onChangeText={this.handlePasswordChange}
              style={styles.textInput}
              mode="outlined"
              secureTextEntry
              />
            </Card.Content>
            <Card.Actions style={styles.actions}>
              <Button mode="outlined" onPress={() => navigation.navigate('SignIn')}>
              Register
              </Button>
              <Button mode="contained" onPress={() => { /* Handle login */ }}>
              Login
              </Button>
            </Card.Actions>
          </Card>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    )
}

export default LogIn

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    padding: 16,
    borderRadius: 8,
    elevation: 4, // Adds shadow for better appearance
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  avatar: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 16,
    marginBottom: 16,
    color: '#555', // Subtle text color
  },
  textInput: {
    width: '100%',
    marginBottom: 12,
  },
  actions: {
    justifyContent: 'center',
    paddingVertical: 8,
  },
});
