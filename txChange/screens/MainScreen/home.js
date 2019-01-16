import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, Image, TouchableOpacity} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';
import { Button } from 'react-native-material-ui';

const countryList = [
  {value: 'USD US Dollar'},
  {value: 'EUR Euro'},
  {value: 'JPY Yen'},
  {value: 'GBP Pound Sterling'},
  {value: 'AUD Australian Dollar'},
  {value: 'CAD Canadian Dollar'},
  {value: 'CHF Swiss Franc'},
  {value: 'CNY Yuan'}
]

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const active = (
      <View>
          <Dropdown
            label = 'Home Country'
            data = {countryList}
          />
          <Dropdown
            label = 'Destination Country'
            data = {countryList}
          />
          <TextField
            label='Amount'
            // value={this.state.inputAmount}
            placeholder='0.00'
            onChangeText={this.props.handleChange('inputAmount')}
          />  
          <TextField
            label='Tip %'
          // value={this.state.inputAmount}
            placeholder='10'
            onChangeText={this.props.handleChange('inputTip')}
          /> 
          <Text></Text>
          <Button style={{ container: { 
            backgroundColor: 'rgb(0, 188, 212)', 
            width: '40%', 
            marginLeft: '55%', 
            marginRight: '5%'}}} 
            text='Calculate' 
          />
      </View>
    )
    
    return (
      <View>
        {this.props.active === 'home' ? active : <Text>Home Not Active</Text>}
      </View>
    );
  }
}

export default Home;
