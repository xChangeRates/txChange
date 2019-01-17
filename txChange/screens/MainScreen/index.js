import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, Image, TouchableOpacity} from 'react-native';
import { BottomNavigation } from 'react-native-material-ui';
import History from './history';
import Home from './home';
import Profile from './profile';
const axios = require('axios')

const styles = StyleSheet.create({
  container: {
    marginTop: '20%',
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    // marginBottom: 0
  }
});

class MainScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
        active: 'home',
        user: null,
        inputAmount: 0,
        inputTip: 0,
        foreignCountry : '',
        homeCountry: '',
        total: 0,
        fxRate: 0,
        emailText: '',
        passwordText: '',
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCalculate = this.handleCalculate.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
  }

  handleLogin = name => event => {
    this.setState({
      [name]: event
    })
  }

  handleAuth() {
    console.log('authenticating');
    axios.post('http://localhost:5000/login', {
      email: this.state.emailText,
      password: this.state.passwordText
    })
    .then(response => console.log('handleAuth response is: ', response))
  }

  selectCountry = name => event => {
        // console.log('event.slice(0, 3) is ', event.slice(0, 3))
    this.setState({
      [name]: event.slice(0, 3),
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: Number(event),
    })
  }

  handleCalculate() {
    let total; 
    axios.get('http://localhost:5000/getRate', {
      params: {
        home: this.state.homeCountry,
        foreign: this.state.foreignCountry
      }
    })
    .then(responseRate => {
      let rate = responseRate.data.rate;
      this.setState({
        fxRate: rate
      })
      axios.get('http://localhost:5000/getTaxRate', {
        params: {
          currencyCode: this.state.foreignCountry
        }
      })
      .then(responseTax => {
        let taxRate = responseTax.data.taxRate
        total = this.state.inputAmount * (1 + this.state.inputTip * 0.01) * rate * (1 + taxRate * 0.01)
        this.setState({
          total: total
        })
        if (this.state.user) {
          axios.post('http://localhost:5000/recordTransaction', {
              userId: this.state.user, 
              countryId: id, 
              timestamp: new Date(),
              conversionRate: this.state.fxRate,
              transaction: total              
          })
          .then(response => console.log(response))
        }
      })
    });
  }

  render(){
    const { active, user, inputAmount, inputTip, foreignCountry, homeCountry, total, fxRate } = this.state;

    return (
      <View style={styles.container}>
        <Home active={active} user={user} inputAmount={inputAmount} inputTip={inputTip} foreignCountry={foreignCountry} homeCountry={homeCountry} total={total} fxRate={fxRate} selectCountry={this.selectCountry} handleChange={this.handleChange} handleCalculate={this.handleCalculate} />
        <History active={active} user={user} />
        <Profile active={active} handleLogin={this.handleLogin} user={user} handleAuth={this.handleAuth} />
        <View style={styles.bottom} >
        <BottomNavigation style={{ container: {
          backgroundColor: 'rgb(0, 188, 212)',
          // position: 'absolute',
          bottom: 0
        }}}>
          <BottomNavigation.Action
            key="home"
            icon="home"
            label="Home"
            onPress={() => this.setState({ active: 'home' })}
          />
          <BottomNavigation.Action
            key="history"
            icon="history"
            label="History"
            onPress={() => this.setState({ active: 'history' })}
          />
          <BottomNavigation.Action
            key="profile"
            icon="person"
            label="Profile"
            onPress={() => this.setState({ active: 'profile' })}
          />
        </BottomNavigation>  
        </View>
      </View>

    )
  }
}

export default MainScreen;