import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

type Props = {
  label: string;
  date: Date;
  onConfirm: (date: Date) => void;
};

const DatePicker = ({ label, date, onConfirm }: Props) => {
  const [show, setShow] = useState(false);

  const validDate = date instanceof Date ? date : new Date();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    onConfirm(currentDate);
  };

  return (
    <View
      style={{
        minWidth: '100%',
        margin: 10,
        backgroundColor: '#fffbfe',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#6d6875',
      }}
    >
      <Text
        style={{
          position: 'absolute',
          backgroundColor: '#f2f2f2',
          top: -10,
          left: 10,
          paddingHorizontal: 5,
          fontSize: 12,
          color: '#6d6875',
        }}
      >
        {label}
      </Text>
      <TouchableOpacity
        style={{
          minWidth: '100%',
          borderRadius: 4,
          backgroundColor: 'transparent',
          padding: 10,
        }}
        onPress={() => setShow(true)}
      >
        <Text>{date.toString()}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={validDate}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DatePicker;

