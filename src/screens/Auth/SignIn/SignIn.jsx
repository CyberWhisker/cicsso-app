import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Card, TextInput, Title, Subheading, Menu, Divider, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

function SignIn() {
  const [dataForm, setDataForm] = useState({
    first_name: '',
    last_name: '',
    middle_name: '',
    email: '',
    year: '',
    section: '',
    password: '',
    confirm_password: '',
  });

  const [yearMenuVisible, setYearMenuVisible] = useState(false);
  const [sectionMenuVisible, setSectionMenuVisible] = useState(false);

  const navigation = useNavigation();

  const handleChange = (field, value) => {
    setDataForm(prevState => ({ ...prevState, [field]: value }));
  };

  const years = ['2021', '2022', '2023', '2024'];
  const sections = ['A', 'B', 'C', 'D'];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Card style={styles.card}>
          <Card.Content style={styles.content}>
            <Title style={styles.title}>Sign In</Title>
            <Subheading style={styles.subheading}>Please enter your details</Subheading>
            <TextInput
              label="Email"
              value={dataForm.email}
              onChangeText={(text) => handleChange('email', text)}
              style={styles.textInput}
              mode="outlined"
              keyboardType="email-address"
            />
            <TextInput
              label="First Name"
              value={dataForm.first_name}
              onChangeText={(text) => handleChange('first_name', text)}
              style={styles.textInput}
              mode="outlined"
            />
            <TextInput
              label="Middle Name"
              value={dataForm.middle_name}
              onChangeText={(text) => handleChange('middle_name', text)}
              style={styles.textInput}
              mode="outlined"
            />
            <TextInput
              label="Last Name"
              value={dataForm.last_name}
              onChangeText={(text) => handleChange('last_name', text)}
              style={styles.textInput}
              mode="outlined"
            />
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12,}}>
              <View style={{width: '45%'}}>
                <Menu
                  visible={yearMenuVisible}
                  onDismiss={() => setYearMenuVisible(false)}
                  anchor={
                    <TextInput
                      label="Year"
                      value={dataForm.year}
                      onTouchEnd={() => setYearMenuVisible(true)}
                      mode="outlined"
                      editable={false}
                    />
                  }
                >
                  {years.map(year => (
                    <Menu.Item
                      key={year}
                      onPress={() => {
                        handleChange('year', year);
                        setYearMenuVisible(false);
                      }}
                      title={year}
                    />
                  ))}
                </Menu>
              </View>
              <View style={{width: '45%'}}>
                <Menu
                  visible={sectionMenuVisible}
                  onDismiss={() => setSectionMenuVisible(false)}
                  anchor={
                    <TextInput
                      label="Section"
                      value={dataForm.section}
                      onTouchEnd={() => setSectionMenuVisible(true)}
                      mode="outlined"
                      editable={false}
                    />
                  }
                >
                  {sections.map(section => (
                    <Menu.Item
                      key={section}
                      onPress={() => {
                        handleChange('section', section);
                        setSectionMenuVisible(false);
                      }}
                      title={section}
                    />
                  ))}
                </Menu>
              </View>
            </View>
            <TextInput
              label="Password"
              value={dataForm.password}
              onChangeText={(text) => handleChange('password', text)}
              style={styles.textInput}
              mode="outlined"
              secureTextEntry
            />
            <TextInput
              label="Confirm Password"
              value={dataForm.confirm_password}
              onChangeText={(text) => handleChange('confirm_password', text)}
              style={styles.textInput}
              mode="outlined"
              secureTextEntry
            />
          </Card.Content>
          <Card.Actions style={styles.actions}>
            <Button mode="contained" onPress={() => { /* Handle registration */ }}>
              Register
            </Button>
            <Button mode="contained" onPress={() => navigation.navigate('LogIn')}>
              Login
            </Button>
          </Card.Actions>
        </Card>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export default SignIn;

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
    flexDirection: 'row', // Align buttons horizontally
    gap: 8, // Space between buttons
  },
});
