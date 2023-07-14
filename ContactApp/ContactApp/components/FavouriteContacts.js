import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    Image,
    Alert
} from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { openDatabase } from 'react-native-sqlite-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
let db = openDatabase({ name: 'ContactList.db' });

const FavouriteContacts = () => {
    const [list, setlist] = useState([]);
    const isFocused = useIsFocused();
    const navigation = useNavigation();

    useEffect(() => {
        getData();
    }, [isFocused]);

    const getData = () => {
        db.transaction(tx => {
            const fav = '1';
            tx.executeSql('SELECT * FROM All_Contacts where fav=? ORDER BY name', [fav], (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i) {
                    // console.log(results.rows.item(i));
                    temp.push(results.rows.item(i));
                }
                setlist(temp);
            });
        });
    };

    const deleteContact = id => {
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM  All_Contacts where user_id=?',
                [id],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Success',
                            'Contact deleted successfully',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => {
                                        getData();
                                    },
                                },
                            ],
                            { cancelable: false },
                        );
                    } else {
                        Alert.alert('Please insert a valid User Id');
                    }
                },
            );
        });
    };


    return (
        <ScrollView scrollEnabled={true} style={styles.container}>
            <FlatList
                data={list}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity style={styles.item}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={{ uri: item.img }}
                                    style={{ width: 70, height: 70, backgroundColor: 'grey' }}
                                />
                                <Text style={{ fontSize: 23, marginLeft: 40, fontWeight: 'bold' }}>{item.name}</Text>
                               
                            </View>

                            <View style={styles.belowView}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('EditContact'
                                            , {
                                                data: {
                                                    name: item.name,
                                                    mobile: item.mobile,
                                                    landline: item.landline,
                                                    id: item.user_id,
                                                    fav: item.fav,
                                                    img: item.img,
                                                },
                                            }
                                        );
                                    }}
                                >
                                    <Image
                                        source={require('./assets/edit.png')}
                                        style={styles.icons}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('viewContact'
                                            , {
                                                data: {
                                                    name: item.name,
                                                    mobile: item.mobile,
                                                    landline: item.landline,
                                                    id: item.user_id,
                                                    fav: item.fav,
                                                    img: item.img,
                                                },
                                            }
                                        );
                                    }}
                                >
                                    <Image
                                        source={require('./assets/View.png')}
                                        style={styles.icons}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        deleteContact(item.user_id);
                                    }}
                                >
                                    <Image
                                        source={require('./assets/delete.png')}
                                        style={styles.icons}
                                    />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        backgroundColor:'#fff0f5'
    },
    item: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 10,
        marginTop: 10
    },
    belowView: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 8,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        height: 50,
    },
    icons: {
        width: 30,
        height: 30,
    }
});

export default FavouriteContacts;
