import React, {ReactElement, ReactNode} from 'react';
import {View, Text} from 'react-native';
import {baseScreenView} from '../common/styles/screenStyles';

export function QuotesList(): ReactElement {
  return (
    <View style={baseScreenView}>
      <Text style={{color: 'black'}}>Testing 123...</Text>
    </View>
  );
}
