import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, Image, TouchableOpacity} from 'react-native';
import { BottomNavigation } from 'react-native-material-ui';
import History from './history';
import Home from './home';
import Profile from './profile';


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
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleCalculate = this.handleCalculate.bind(this);
  }

  handleChange = name => event => {
    console.log('Number(event) is ', Number(event))
    // let number = event;
    // number = number.toFixed(2);
    this.setState({
      [name]: Number(event),
    })
  }

  handleCalculate() {
    console.log('calculating');
    // console.log('this.inputAmount is ', this.inputAmount)
    // return this.inputAmount
    console.log(this.state);
    let data = { home: this.state.homeCountry.slice(0, 3), foreign: this.state.foreignCountry.slice(0,3)}
    let total; 
    fetch('http://localhost5000/getRate', {
      method:'GET',
      body: JSON.stringify(data),  
    }).then(res => res.json())
    .then((rate) => {
      console.log('FX rate in calculate is ', fxRate);
      this.setState({
        fxRate: rate
      });
      fetch('http://localhost5000/getTaxRate', {
        method: 'GET',
        body: JSON.stringify({currencyCode: this.foreignCountry.slice(0, 3)}),
      }).then(res => res.json())
      .then((result) => {
        const { id, taxRate } = result;
        total = this.state.inputAmount * (1 + this.state.inputTip * 0.01) * rate * taxRate
        this.setState({
          total: total
        })
        if (this.user !== null) {
          fetch('http://localhost5000/recordTransaction', {
            method: 'POST',
            body: JSON.stringify({
              userId: this.user, 
              countryId: id, 
              timestamp: new Date(),
              conversionRate: this.state.fxRate,
              transaction: total
            }),
          }).then((res) => console.log('response is: ', res))
        }
      }) 
    })
  }

  render(){
    const { active, user, inputAmount, inputTip, foreignCountry, homeCountry, total, fxRate } = this.state;

    return (
      <View style={styles.container}>
        <Home active={active} user={user} inputAmount={inputAmount} inputTip={inputTip} foreignCountry={foreignCountry} homeCountry={homeCountry} total={total} fxRate={fxRate} handleChange={this.handleChange} handleCalculate={this.handleCalculate} />
        <History active={active}/>
        <Profile active={active} />
        <View style={styles.bottom}>
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