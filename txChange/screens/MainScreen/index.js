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
        inputAmount: 0,
        inputTip: 0,
        destCountry : '',
        homeCountry: '',
    }
  }

  handleChange = name => event => {
    console.log('typeof event', Number(event))
    // let number = event;
    // number = number.toFixed(2);
    this.setState({
      [name]: Number(event),
    })
  }

  render(){
    const { active, inputAmount, inputTip, destCountry, homeCountry } = this.state;

    // const countryItems = Object.keys(currencyMap).map(currency => {
    //   return <Picker.Item key={currency} value={currency} label={currencyMap[currency].label}/>
    // })

    return (
      <View style={styles.container}>
        <Home active={active} inputAmount={inputAmount}inputTip={inputTip} destCountry={destCountry} homeCountry={homeCountry} handleChange={this.handleChange}/>
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