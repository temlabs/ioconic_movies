import React, {ReactElement, useEffect, useState} from 'react';
import {View, ViewStyle, TouchableOpacity} from 'react-native';
import {baseScreenView} from '../../common/styles/screenStyles';
import {QuotesListItem} from './components/QuotesListItem';
import DraggableFlatList, {
  RenderItem,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {Quote, QuoteListItem} from '../quoteTypes';
import {useQuotesQuery} from '../useQuotesQuery';
import {useQuotesOrderMutation} from '../useQuotesOrderMutation';
import {AddQuoteButton} from './components/AddQuoteButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import screens from '../../config/screens';
import {useHeaderHeight} from '@react-navigation/elements';

export function QuotesList({
  navigation,
}: NativeStackScreenProps<any, typeof screens.QUOTES_LIST>): ReactElement {
  const headerHeight = useHeaderHeight();

  const [localQuotes, setLocalQuotes] = useState<Quote[]>();
  const {data: quotes} = useQuotesQuery();
  const {mutate: updateQuotesOrder} = useQuotesOrderMutation();

  useEffect(() => {
    if (quotes) {
      setLocalQuotes(quotes);
    }
  }, [quotes]);

  const keyExtractor = (item: QuoteListItem) => item.id;
  const renderItem: RenderItem<QuoteListItem> = info => {
    const {item: props} = info;
    const index = info.getIndex();
    const position = index !== undefined ? (index + 1).toString() : '- -';
    return (
      <ScaleDecorator activeScale={1.05}>
        <TouchableOpacity
          onLongPress={info.drag}
          disabled={info.isActive}
          style={listButton(info.isActive)}>
          <QuotesListItem {...props} position={position} />
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return localQuotes ? (
    <View style={{...baseScreenView, paddingTop: headerHeight}}>
      <DraggableFlatList<QuoteListItem>
        showsVerticalScrollIndicator={false}
        containerStyle={listContainer}
        data={localQuotes}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <View style={{height: 5, width: '100%'}} />
        )}
        ListFooterComponent={() => <View style={{height: 84, width: '100%'}} />}
        onDragEnd={({data}) => {
          setLocalQuotes(data);
          updateQuotesOrder(data);
        }}
      />
      <View style={addQuoteButtonContainer}>
        <AddQuoteButton
          onPress={() => navigation.navigate(screens.ADD_QUOTE)}
        />
      </View>
    </View>
  ) : (
    <></>
  );
}

const listContainer: ViewStyle = {
  width: '100%',
  maxWidth: 400,
  alignSelf: 'center',
  overflow: 'hidden',
};

const listButton: (isActive: boolean) => ViewStyle = isActive => ({
  opacity: isActive ? 0.7 : 1,
  width: '92%',
  alignSelf: 'center',
});

const addQuoteButtonContainer: ViewStyle = {
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
  position: 'absolute',
  alignSelf: 'flex-end',
  bottom: 20,
  right: 20,
};
