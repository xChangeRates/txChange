import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, Image, TouchableOpacity} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Button } from 'react-native-material-ui';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
})

class Profile extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const active = (
      <View
      style={{
        marginTop: '20%',
      }}>
        <TextField 
          label='Email'
          // value={this.state.inputAmount}
          placeholder='Enter email'
          // onChangeText={this.props.handleChange('inputAmount')}
        /> 
        <TextField
          label='Password'
          // value={this.state.inputAmount}
          placeholder='Enter password'
          // onChangeText={this.props.handleChange('inputAmount')}
        /> 
        <Text></Text>
        <View style={styles.buttonContainer}>
        <Button style={{ container: { 
          backgroundColor: 'rgb(0, 188, 212)', 
          width: '30%', 
          marginLeft: '15%', 
        }}} 
          text='Sign Up' 
        />
        {/* <Text></Text> */}
        <Button style={{ container: { 
          backgroundColor: 'rgb(0, 188, 212)', 
          width: '30%', 
          marginRight: '15%'
        }}} 
          text='Log In' 
        />
        </View>
        <View style={styles.container}>
          <Image style={{ marginTop: '20%' }} source={require('./../../assets/google.png')} />
        </View>
      </View> 
    )




    return (
      <View>
        {this.props.active === 'profile' ? active : <Text>Profile Not Active</Text>}
      </View>
    );
  }
}

export default Profile;