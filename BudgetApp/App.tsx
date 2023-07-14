import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './components/Home';
import BudgetEntryList from './components/BudgetEntryList';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#000080',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: 'bold'
          },
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Budget Entry',
          }}
        />
        <Stack.Screen
          name="List"
          component={BudgetEntryList}
          options={{
            title: 'Budget Entry List',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
