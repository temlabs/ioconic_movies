import React, {
  ReactElement,
  ReactNode,
  useDeferredValue,
  useState,
} from 'react';
import {
  View,
  Text,
  ListRenderItem,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import {baseScreenView} from '../../common/styles/screenStyles';
import demoQuotes from '../../demo/quotes';
import {QuotesListItem} from './components/QuotesListItem';
import DraggableFlatList, {
  RenderItem,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {QuoteListItem} from '../quoteTypes';
import {useQuotesQuery} from '../useQuotesQuery';
import {useQuotesOrderMutation} from '../useQuotesOrderMutation';
import {AddQuoteButton} from './components/AddQuoteButton';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import screens from '../../config/screens';

export function QuotesList({
  navigation,
}: NativeStackScreenProps<any, typeof screens.QUOTES_LIST>): ReactElement {
  // const [data, setData] = useState(demoQuotes);
  const {data: quotes} = useQuotesQuery();
  const {mutate: updateQuotesOrder} = useQuotesOrderMutation();

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
          style={{
            opacity: info.isActive ? 0.7 : 1,
            width: '92%',
            alignSelf: 'center',
          }}>
          <QuotesListItem {...props} position={position} />
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return quotes ? (
    <View style={baseScreenView}>
      <DraggableFlatList<QuoteListItem>
        showsVerticalScrollIndicator={false}
        containerStyle={listContainer}
        data={quotes}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <View style={{height: 5, width: '100%'}} />
        )}
        onDragEnd={({data}) => {
          updateQuotesOrder(data);
        }}
      />
      <View style={buttonContainer}>
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
  overflow: 'visible',
};

const buttonContainer: ViewStyle = {
  // width: '100%',
  // maxWidth: 400,
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
  position: 'absolute',
  alignSelf: 'flex-end',
  bottom: 20,
  right: 20,
};
