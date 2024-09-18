import React, { useContext, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Card, TextInput, Title, Subheading, Menu, Text, useTheme, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { storeUser } from '../../../api/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../../context/AuthContext';

function Register() {
  const {register} = useContext(AuthContext)
  const { colors } = useTheme();
  const [dataForm, setDataForm] = useState({
    name: '',
    email: '',
    year: '',
    section: '',
    password: '',
    confirm_password: '',
  });

  const [yearMenuVisible, setYearMenuVisible] = useState(false);
  const [sectionMenuVisible, setSectionMenuVisible] = useState(false);
  const [errors, setErrors] = useState({});
  
  const navigation = useNavigation();

  const handleChange = (field, value) => {
    setDataForm(prevState => ({ ...prevState, [field]: value }));
  };

  const validateForm = () => {
    const { name, email, year, section, password, confirm_password } = dataForm;
    const newErrors = {};
    
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!year) newErrors.year = 'Year is required';
    if (!section) newErrors.section = 'Section is required';
    if (!password) newErrors.password = 'Password is required';
    if (password !== confirm_password) newErrors.confirm_password = 'Passwords do not match';

    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      register(dataForm)
    } else {
      setErrors(validationErrors);
    }
  };

  const years = ['1st Year', '2nd Year', '3r Year', '4th Year'];
  const sections = ['A', 'B', 'C', 'D'];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Card style={styles.card}>
          <Card.Content style={styles.content}>
            
            <View style={{alignItems: 'center'}}>
                <Avatar.Image source={require('../../../../assets/images/appImg/Logo.png')} size={100} style={styles.avatar} />
                <Title style={styles.title}>Sign In</Title>
                <Subheading style={[styles.subheading, { color: colors.primary, textAlign: 'center' }]}>Please enter your details</Subheading>
            </View>
            <TextInput
              label="Full Name"
              value={dataForm.name}
              onChangeText={(text) => handleChange('name', text)}
              style={styles.textInput}
              mode="outlined"
              error={!!errors.name}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            <TextInput
              label="Email"
              value={dataForm.email}
              onChangeText={(text) => handleChange('email', text)}
              style={styles.textInput}
              mode="outlined"
              keyboardType="email-address"
              error={!!errors.email}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
              <View style={{ width: '45%' }}>
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
                      error={!!errors.year}
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
              <View style={{ width: '45%' }}>
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
                      error={!!errors.section}
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
              error={!!errors.password}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            <TextInput
              label="Confirm Password"
              value={dataForm.confirm_password}
              onChangeText={(text) => handleChange('confirm_password', text)}
              style={styles.textInput}
              mode="outlined"
              secureTextEntry
              error={!!errors.confirm_password}
            />
            {errors.confirm_password && <Text style={styles.errorText}>{errors.confirm_password}</Text>}
          </Card.Content>
          <Card.Content style={styles.actions}>
            <Text mode="outlined" onPress={() => navigation.navigate('Login')} style={{ color: colors.primary }}>
              I have an account
            </Text>
            <Button mode="contained" onPress={handleSubmit}>
              Register
            </Button>
          </Card.Content>
        </Card>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export default Register;

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
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center'
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    flexDirection: 'row', // Align buttons horizontally
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
  }
});
