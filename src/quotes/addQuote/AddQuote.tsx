import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useHeaderHeight} from '@react-navigation/elements';
import React, {ReactElement} from 'react';
import {
  InteractionManager,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {baseScreenView} from '../../common/styles/screenStyles';
import screens from '../../config/screens';
import {NavigationButton} from './components/NavigationButton';
import {useAddQuoteStore} from './useAddQuoteStore';
import {useAddQuoteMutation} from '../useAddQuoteMutation';

export function AddQuote({
  navigation,
}: NativeStackScreenProps<any, typeof screens.QUOTES_LIST>): ReactElement {
  const headerHeight = useHeaderHeight();

  const {mutate: addQuote} = useAddQuoteMutation();

  const text = useAddQuoteStore(state => state.text);
  const movie = useAddQuoteStore(state => state.movie);
  const character = useAddQuoteStore(state => state.character);
  const setText = useAddQuoteStore(state => state.setText);
  const reset = useAddQuoteStore(state => state.reset);

  const goToSelectMovie = () => {};
  const goToSelectCharacter = () => {};

  const submitQuote = () => {
    if (!character || !movie || !text) {
      return;
    }

    addQuote({character, movie, text, id: Date.now().toString()});
    navigation.navigate(screens.QUOTES_LIST);
    InteractionManager.runAfterInteractions(() => {
      reset();
    });
  };

  return (
    <View style={{...baseScreenView, paddingTop: headerHeight}}>
      <TextInput
        autoFocus={true}
        style={textInputStyle}
        textAlignVertical={'top'}
        textAlign={'left'}
        multiline={true}
        onBlur={e => setText(e.nativeEvent.text)}
        blurOnSubmit={true}
        defaultValue={text}
      />
      <View>
        <NavigationButton
          onPress={goToSelectMovie}
          label="Select a movie"
          value={movie?.title}
        />
        <NavigationButton
          onPress={goToSelectCharacter}
          label="Select a character"
          value={character?.name}
        />
        <TouchableOpacity onPress={submitQuote} style={submitButton}>
          <Text>Create quote</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const textInputStyle: ViewStyle = {
  width: '100%',
  paddingHorizontal: 5,
  height: '35%',
  borderBottomColor: 'grey',
  borderBottomWidth: 1,
};

const submitButton: ViewStyle = {
  backgroundColor: '#ADD8E6',
  width: '90%',
  maxWidth: 400,
  alignItems: 'center',
  alignSelf: 'center',
  paddingVertical: 10,
  paddingHorizontal: 5,
  borderRadius: 8,
};
