import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

type Props = {
  label: string;
  dateTime: Date;
  onConfirm: (dateTime: Date) => void;
};

const DateTimePickerComponent = ({ label, dateTime, onConfirm }: Props) => {
  const [show, setShow] = useState(false);

  const validDateTime = dateTime instanceof Date ? dateTime : new Date();

  const onChange = (event, selectedDateTime) => {
    const currentDateTime = selectedDateTime || validDateTime;
    setShow(Platform.OS === 'ios');
    onConfirm(currentDateTime);
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
        <Text>{validDateTime.toLocaleString()}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={validDateTime}
          mode="datetime"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DateTimePickerComponent;

