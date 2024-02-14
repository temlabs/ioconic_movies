import React, {ReactElement, ReactNode, useState} from 'react';
import {
  View,
  Text,
  ListRenderItem,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import {baseScreenView} from '../common/styles/screenStyles';
import demoQuotes from '../demo/quotes';
import {QuotesListItem} from './components/QuotesListItem';
import DraggableFlatList, {
  RenderItem,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {QuoteListItem} from '../quotes/quoteTypes';

export function QuotesList(): ReactElement {
  const [data, setData] = useState(demoQuotes);

  const keyExtractor = (item: QuoteListItem, index: number) => item.id;
  const renderItem: RenderItem<QuoteListItem> = info => {
    const {item: props} = info;
    const index = info.getIndex();
    const position = index !== undefined ? (index + 1).toString() : '- -';
    return (
      <ScaleDecorator activeScale={1.05}>
        <TouchableOpacity
          onLongPress={info.drag}
          disabled={info.isActive}
          style={{opacity: info.isActive ? 0.7 : 1}}>
          <QuotesListItem {...props} position={position} />
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };
  return (
    <View style={baseScreenView}>
      <DraggableFlatList<QuoteListItem>
        showsVerticalScrollIndicator={false}
        containerStyle={listContainer}
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <View style={{height: 5, width: '100%'}} />
        )}
        onDragEnd={({data}) => setData(data)}
      />
    </View>
  );
}

const listContainer: ViewStyle = {
  width: '92%',
  maxWidth: 400,
  alignSelf: 'center',
  overflow: 'visible',
};
