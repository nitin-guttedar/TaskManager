/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import AuthScreen from './src/screens/AuthScreen'
import TaskList from './src/screens/TaskList'
import TaskDetails from './src/screens/TaskDetails'
import AddTask from './src/screens/AddTask'

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Auth'>
        <Stack.Screen name='Auth' component={AuthScreen} options={{ headerShown: false }} />
        <Stack.Screen name='TaskList' component={TaskList} options={{ headerShown: false }} />
        <Stack.Screen name='Task Details' component={TaskDetails} options={{ headerShown: false }} />
        <Stack.Screen name='Add Task' component={AddTask} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
