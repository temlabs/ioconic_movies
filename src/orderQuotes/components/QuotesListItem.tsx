import React from 'react';
import {View, Text, ViewStyle, TextStyle} from 'react-native';
import {QuoteListItem} from '../../quotes/quoteTypes';

export function QuotesListItem(props: Required<QuoteListItem>) {
  return (
    <View style={containerStyle}>
      <Text style={positionStyle}>{props.position}</Text>
      <View style={contentContainerStyle}>
        <Text>{props.text}</Text>
        <View style={detailContainerStyle}>
          <Text style={detailText}>{props.character.name}</Text>
          <Text style={detailText}>
            {props.movie.title}, {props.movie.releaseYear}
          </Text>
        </View>
      </View>
    </View>
  );
}

const containerStyle: ViewStyle = {
  width: '100%',
  flexDirection: 'row',
  gap: 20,
  justifyContent: 'space-between',
  backgroundColor: '#ADD8E6',
  borderRadius: 8,
  paddingHorizontal: 5,
  paddingVertical: 20,
};

const positionStyle: TextStyle = {
  minWidth: '10%',
  // flexGrow: 1,
  fontSize: 24,
  fontWeight: '600',
  textAlign: 'center',
  verticalAlign: 'middle',
};

const contentContainerStyle: ViewStyle = {
  flexDirection: 'column',
  gap: 5,
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexShrink: 1,
  flexGrow: 1,
};

const detailContainerStyle: ViewStyle = {
  gap: 3,
};

const detailText: TextStyle = {
  fontSize: 12,
};
