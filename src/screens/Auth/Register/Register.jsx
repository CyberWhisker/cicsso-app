import React, { useContext, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Card, TextInput, Title, Subheading, Text, useTheme, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../context/AuthContext';
import { Dropdown } from 'react-native-paper-dropdown';

function Register() {
  const { register } = useContext(AuthContext);
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    extensionName: '',
    studentId: '',
    program: '',
    type: '',
    year: '',
    section: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const {
      firstName, lastName, program, email, year,
      studentId, type, section, password, confirmPassword
    } = formData;

    const newErrors = {};
    if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Valid email is required';
    if (!firstName) newErrors.firstName = 'First Name is required';
    if (!lastName) newErrors.lastName = 'Last Name is required';
    if (!program) newErrors.program = 'Program is required';
    if (!year) newErrors.year = 'Year is required';
    if (!section) newErrors.section = 'Section is required';
    if (!studentId) newErrors.studentId = 'Student ID is required';
    if (!type) newErrors.type = 'Type is required';
    if (!password || password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      register(formData);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleNavigateToLogin = () => {
    navigation.navigate('Login');
  };

  const PROGRAMS = [
    { label: 'BS Information Technology', value: 'BS Information Technology' },
    { label: 'BS Information System', value: 'BS Information System' },
  ];

  const TYPES = [
    { label: 'Regular', value: 'Regular' },
    { label: 'Irregular', value: 'Irregular' },
  ];

  const YEARS = [
    { label: '1st', value: '1st' },
    { label: '2nd', value: '2nd' },
    { label: '3rd', value: '3rd' },
    { label: '4th', value: '4th' },
  ];

  const SECTIONS = [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
    { label: 'D', value: 'D' },
    { label: 'E', value: 'E' },
    { label: 'F', value: 'F' },
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>

        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <Card style={styles.card}>
            <Card.Content style={styles.content}>
              <View style={{ alignItems: 'center' }}>
                <Avatar.Image source={require('../../../../assets/images/appImg/Logo.png')} size={100} style={styles.avatar} />
                <Title style={styles.title}>Register</Title>
                <Subheading style={[styles.subheading, { color: colors.primary }]}>Please enter your details</Subheading>
              </View>

              {/* User Information */}
              <TextInput
                label="First Name"
                value={formData.firstName}
                onChangeText={(text) => handleChange('firstName', text.toUpperCase())}
                style={styles.textInput}
                mode="outlined"
                error={!!errors.firstName}
              />
              {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

              <TextInput
                label="Middle Name"
                value={formData.middleName}
                onChangeText={(text) => handleChange('middleName', text.toUpperCase())}
                style={styles.textInput}
                mode="outlined"
              />

              <TextInput
                label="Last Name"
                value={formData.lastName}
                onChangeText={(text) => handleChange('lastName', text.toUpperCase())}
                style={styles.textInput}
                mode="outlined"
                error={!!errors.lastName}
              />
              {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

              <TextInput
                label="Extension Name (Optional)"
                value={formData.extensionName}
                onChangeText={(text) => handleChange('extensionName', text.toUpperCase())}
                style={styles.textInput}
                mode="outlined"
              />

              {/* Student Information */}
              <TextInput
                label="Student ID"
                value={formData.studentId}
                onChangeText={(text) => handleChange('studentId', text)}
                style={styles.textInput}
                mode="outlined"
                error={!!errors.studentId}
              />
              {errors.studentId && <Text style={styles.errorText}>{errors.studentId}</Text>}

              <Dropdown
                label="Program"
                options={PROGRAMS}
                value={formData.program}
                mode="outlined"
                onSelect={(value) => handleChange('program', value)}
              />
              {errors.program && <Text style={styles.errorText}>{errors.program}</Text>}

              <Dropdown
                label="Type"
                options={TYPES}
                value={formData.type}
                mode="outlined"
                onSelect={(value) => handleChange('type', value)}
              />
              {errors.type && <Text style={styles.errorText}>{errors.type}</Text>}

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: '48%' }}>
                  <Dropdown
                    label="Year"
                    options={YEARS}
                    value={formData.year}
                    mode="outlined"
                    onSelect={(value) => handleChange('year', value)}
                  />
                  {errors.year && <Text style={styles.errorText}>{errors.year}</Text>}
                </View>

                <View style={{ width: '48%' }}>
                  <Dropdown
                    label="Section"
                    options={SECTIONS}
                    value={formData.section}
                    mode="outlined"
                    onSelect={(value) => handleChange('section', value)}
                  />
                  {errors.section && <Text style={styles.errorText}>{errors.section}</Text>}
                </View>
              </View>

              {/* Account Information */}
              <TextInput
                label="Email"
                value={formData.email}
                onChangeText={(text) => handleChange('email', text)}
                style={styles.textInput}
                mode="outlined"
                keyboardType="email-address"
                error={!!errors.email}
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

              <TextInput
                label="Password"
                value={formData.password}
                onChangeText={(text) => handleChange('password', text)}
                style={styles.textInput}
                mode="outlined"
                secureTextEntry
                error={!!errors.password}
              />
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

              <TextInput
                label="Confirm Password"
                value={formData.confirmPassword}
                onChangeText={(text) => handleChange('confirmPassword', text)}
                style={styles.textInput}
                mode="outlined"
                secureTextEntry
                error={!!errors.confirmPassword}
              />
              {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

            </Card.Content>

            <Card.Content style={styles.actions}>
              <Text onPress={handleNavigateToLogin} style={{ color: colors.primary }}>I already have an account</Text>
              <Button mode="contained" onPress={handleSubmit}>Register</Button>
            </Card.Content>
          </Card>
        </KeyboardAvoidingView>
      </ScrollView>
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
    elevation: 4,
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
  },
  textInput: {
    width: '100%',
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  }
});
