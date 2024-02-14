import React from 'react';
import {View, TouchableOpacity, ViewStyle, Text, TextStyle} from 'react-native';

interface Props {
  onPress: () => void;
}

export function AddQuoteButton({onPress}: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={text}>New</Text>
    </TouchableOpacity>
  );
}

const buttonStyle: ViewStyle = {
  height: 64,
  width: 64,
  borderRadius: 32,
  backgroundColor: 'blue',
  justifyContent: 'center',
  alignItems: 'center',
};

const text: TextStyle = {
  color: 'white',
  fontSize: 16,
};
