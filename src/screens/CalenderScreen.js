import React from 'react';
import {View, Text} from 'react-native';
import tw from 'twrnc';
import Container from '../components/Container';
import Header from '../components/Header';
import TopHeaderDivider from '../components/TopHeaderDivider';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Calendar, CalendarList, Agenda, AgendaList} from 'react-native-calendars';
import moduleName from 'moment';

export default function CalenderScreen() {
  const _header = () => (
    <View style={tw`flex flex-row`}>
      <FontAwesome5
        name="calendar-alt"
        style={tw`text-[#020202] my-auto text-lg`}
      />
      <Text style={tw`text-[#020202] my-auto ml-2 text-sm font-semibold`}>
        Events
      </Text>
    </View>
  );
  return (
    <Container>
      <Header hideLogin={true} title={'Calender'} />
      <TopHeaderDivider>{_header()}</TopHeaderDivider>
      <View style={tw`h-full bg-[#212129]`}>
        <Calendar
          // Specify style for calendar container element. Default = {}
          style={{
            borderWidth: 0,
            height: 350,
          }}
          disabledDaysIndexes={[0, 6]}
          // Specify theme properties to override specific styles for calendar parts. Default = {}
          theme={{
            backgroundColor: '#212129',
            calendarBackground: '#212129',
            textSectionTitleColor: '#fff',
            textSectionTitleDisabledColor: '#fff',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#fff',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            disabledArrowColor: '#fff',
            monthTextColor: '#C3C3C3',
            indicatorColor: '#fff',
            // textDayFontFamily: 'monospace', 2d4150
            // textMonthFontFamily: 'monospace',
            // textDayHeaderFontFamily: 'monospace',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
            arrowColor: 'white',
            'stylesheet.calendar.header': {
              week: {
                marginTop: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            },

          }}
          markedDates={{
            '2021-12-16': {selected: true, marked: true, selectedColor: ''},
            '2021-12-17': {marked: true},
            '2021-12-18': {marked: true, dotColor: 'red', activeOpacity: 0},
            '2021-12-19': {disabled: true, disableTouchEvent: true}
          }}
        />

      </View>
    </Container>
  );
}
