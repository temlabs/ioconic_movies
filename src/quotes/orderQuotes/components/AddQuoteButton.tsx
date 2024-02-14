import React from 'react';
import {View, TouchableOpacity, ViewStyle} from 'react-native';

interface Props {
  onPress: () => void;
}

export function AddQuoteButton({onPress}: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}></TouchableOpacity>
  );
}

const buttonStyle: ViewStyle = {
  height: 44,
  width: 44,
  borderRadius: 22,
  backgroundColor: 'blue',
};
