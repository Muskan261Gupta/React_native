import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    Image,
    Alert,
    TouchableHighlight,
    TextInput
} from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { openDatabase } from 'react-native-sqlite-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
let db = openDatabase({ name: 'ContactList.db' });

const ContactsList = () => {
    const [list, setlist] = useState([]);
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const [oldList, setoldList] = useState([]);
    const [search, setsearch] = useState('');

    useEffect(() => {
        getData();
    }, [isFocused]);

    const onSearch = (text) => {
        if (text == '') {
            setlist(oldList);
        } else {
            let templist = list.filter(item => {
                return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
            })
            setlist(templist);
        }
    }

    const getData = () => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM All_Contacts ORDER BY name ASC', [], (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i) {
                    // console.log(results.rows.item(i));
                    temp.push(results.rows.item(i));
                }
                setlist(temp);
                setoldList(temp);
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
                            'Sure, you want to delete this !',
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
        <View style={styles.container}>
            <TextInput placeholder='   Search Contacts.....' style={{
                width: '50%', height: 40, borderRadius: 20, borderWidth: 1, borderColor: 'black',
                left: 90, marginTop: 5, justifyContent: 'center', backgroundColor: 'cornsilk', fontSize: 17
            }}
                value={search} onChangeText={txt => {
                    onSearch(txt);
                    setsearch(txt);
                }} />
            <ScrollView scrollEnabled={true}>
                <FlatList
                    data={list}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={styles.item}>
                                <View style={{ flex: 1, flexDirection: 'row' ,alignItems:'center'}}>
                                    <Image source={{ uri: item.img }}
                                        style={{ width: 65, height: 65, backgroundColor: 'grey' }}
                                    />
                                    <Text style={{fontSize:23,marginLeft:40, fontWeight:'bold' }}>{item.name}</Text>
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
            <View style={{ marginBottom: 50 }}>
                <TouchableHighlight onPress={() => navigation.navigate('AddContact')}>
                    <View style={styles.addbutton}>
                        <Image
                            source={require('./assets/plusSign.png')}
                            style={{ width: 50, height: 50 }}
                        />
                    </View>
                </TouchableHighlight>
            </View>
        </View>
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
    },
    addbutton: {
        position: 'absolute',
        right: 30
    }
});

export default ContactsList;