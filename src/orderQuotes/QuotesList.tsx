import React, {ReactElement, ReactNode} from 'react';
import {View, Text} from 'react-native';
import {baseScreenView} from '../common/styles/screenStyles';
import demoQuotes from '../demo/quotes';
import {QuotesListItem} from './components/QuotesListItem';

export function QuotesList(): ReactElement {
  const testQuote = demoQuotes[0];
  return (
    <View style={baseScreenView}>
      <Text style={{color: 'black'}}>Testing 123...</Text>
      <QuotesListItem {...testQuote} position={1} />
    </View>
  );
}
