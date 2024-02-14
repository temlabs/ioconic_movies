import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QuotesList} from './src/orderQuotes/QuotesList';
import screens from './src/config/screens';
import {baseScreenView} from './src/common/styles/screenStyles';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import {clientPersister} from './src/clientStorage/clientStorageConfig';
import {queryClient} from './src/tanstack/tanstackConfig';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <PersistQueryClientProvider
      persistOptions={{persister: clientPersister}}
      client={queryClient}>
      <NavigationContainer>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            // backgroundColor={backgroundStyle.backgroundColor}
          />
          <View style={baseScreenView}>
            <Stack.Navigator>
              <Stack.Screen name={screens.QUOTES_LIST} component={QuotesList} />
            </Stack.Navigator>
          </View>
        </SafeAreaView>
      </NavigationContainer>
    </PersistQueryClientProvider>
  );
}

export default App;
