import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import * as Animatable from 'react-native-animatable';
const Calender = () => {
  return (
    <View>
      <CalenderComponent />
    </View>
  );
};

export default Calender;

class CalenderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }
  render() {
    const {selectedStartDate} = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (
      <Animatable.View style={styles.container} animation="fadeInDown">
        <CalendarPicker
          animation="fadeInDown"
          onDateChange={this.onDateChange}
          restrictMonthNavigation
        />

        <View>
          <Text>SELECTED DATE:{startDate}</Text>
        </View>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
});
