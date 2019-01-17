import React, {Component} from 'react';
import {View, Text, StyleSheet } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  row: { height: 40 },
  text: { margin: 6 }
});

class History extends Component {
  constructor(props) {
    super(props);
    // testing table library
    this.state = {
      tableHead: ['Date', 'Foreign', 'Home', 'FX Rate', 'Amount'],
      tableData: [['01/15/19', 'WW🏳️‍🌈', 'US🇺🇸', '0.8634', '$100,000.00']],
      widthArr: [75, 60, 60, 80, 100]
    }
  }

  render() {
    const { tableHead, tableData, widthArr } = this.state;
    const active = (
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 0.5, borderColor: '#c8e1ff'}}>
          <Row data={tableHead} widthArr={widthArr} style={styles.head} textStyle={styles.text}/>
          <Rows data={tableData} widthArr={widthArr} style={styles.row} textStyle={styles.text}/>
          {/* <Rows data={state.tableData} textStyle={styles.text}/> */}
        </Table>
      </View>
  
    )
 
    return (
      <View>
        {this.props.active === 'history' ? active : <Text>Not Active</Text>}
      </View>
    );

  }
}

export default History;
