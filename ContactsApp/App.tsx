import React from 'react';
import AddContact from './components/AddContact';
import FavouriteContacts from './components/FavouriteContacts';
import ContactsList from './components/ContactsList';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import EditContact from './components/EditContact';
import ViewContact from './components/ViewContact';

const Drawer = createDrawerNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          drawerActiveBackgroundColor: '#dcdcdc',
        }}>
        <Drawer.Screen
          name="ContactsList"
          component={ContactsList}
          options={{
            title: 'CONTACT LIST',
          }}
        />
        <Drawer.Screen
          name="Favourite"
          component={FavouriteContacts}
          options={{
            title: 'FAVOURITE CONTACTS',
          }}
        />
        <Drawer.Screen
          name="AddContact"
          component={AddContact}
          options={{
            title: 'ADD CONTACT',
          }}
        />
        <Drawer.Screen
          name="EditContact"
          component={EditContact}
          options={{
            title: 'UPDATE CONTACT',
            drawerItemStyle: {
              display: 'none',
            },
          }}
        />
        <Drawer.Screen
          name="viewContact"
          component={ViewContact}
          options={{
            title: 'VIEW CONTACT',
            drawerItemStyle: {
              display: 'none',
            },
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
