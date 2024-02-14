import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useHeaderHeight} from '@react-navigation/elements';
import React, {ReactElement, useState} from 'react';
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
  const storeText = useAddQuoteStore(state => state.text);
  const [text, setText] = useState(storeText ?? '');
  const headerHeight = useHeaderHeight();

  const {mutate: addQuote} = useAddQuoteMutation();

  const movie = useAddQuoteStore(state => state.movie);
  const character = useAddQuoteStore(state => state.character);
  const setStoreText = useAddQuoteStore(state => state.setText);
  const reset = useAddQuoteStore(state => state.reset);

  const goToSelectMovie = () => {
    setStoreText(text);
  };
  const goToSelectCharacter = () => {
    setStoreText(text);
  };

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
        blurOnSubmit={true}
        defaultValue={text}
        onChangeText={setText}
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
