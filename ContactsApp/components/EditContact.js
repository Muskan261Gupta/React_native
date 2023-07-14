import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Alert,
    Image,
    TouchableOpacity
} from 'react-native';

import { openDatabase } from 'react-native-sqlite-storage';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
let db = openDatabase({ name: 'ContactList.db' });

const EditContact = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const isFocused = useIsFocused();
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [landline, setLandline] = useState('');
    const [fav, setFav] = useState('0');
    const [img, setImg] = useState('');
    const id = route.params.data.id;

    useEffect(() => {
        setName(route.params.data.name);
        setMobile(route.params.data.mobile);
        setLandline(route.params.data.landline);
        setFav(route.params.data.fav);
        setImg(route.params.data.img);
        getData();
    }, [isFocused]);

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
                                        navigation.navigate('ContactsList');

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

    const getData = () => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM All_Contacts ORDER BY name ASC', [], (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i) {
                    // console.log(results.rows.item(i));
                    temp.push(results.rows.item(i));
                }
                setlist(temp);
            });
        });
    };

    const updateData = () => {
        db.transaction(tx => {
            tx.executeSql(
                'UPDATE All_Contacts set name=?, mobile=? , landline=?, fav=? ,img=? where user_id=?',
                [name, mobile, landline, fav,img, route.params.data.id],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Success',
                            'Contact updated successfully',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => navigation.navigate('ContactsList'),
                                },
                            ],
                            { cancelable: false },
                        );
                    } else alert('Updation Failed');
                },
            );
        });
    }

    const addFav = () => {
        if (fav == '0') {
            setFav('1');
        }
        if (fav == '1') {
            setFav('0');
        }
    }

    return (
        <View style={styles.container}>
            {
                fav == '0' ?
                    <View>
                        <TouchableHighlight onPress={addFav}>
                            <View style={styles.favbutton}>
                                <Image
                                    source={require('./assets/star.png')}
                                    style={styles.staricons}
                                />
                            </View>
                        </TouchableHighlight>
                    </View>
                    :
                    <View>
                        <TouchableHighlight onPress={addFav}>
                            <View style={styles.favbutton}>
                                <Image
                                    source={require('./assets/FillStar.png')}
                                    style={styles.staricons}
                                />
                            </View>
                        </TouchableHighlight>
                    </View>
            }
            <View style={styles.formArea}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, color: 'black' }}>Name   :  </Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={txt => setName(txt)}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, color: 'black' }}>Mobile  :  </Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={mobile}
                        onChangeText={txt => setMobile(txt)}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, color: 'black' }}>Landline :</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={landline}
                        onChangeText={txt => setLandline(txt)}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, color: 'black' }}>ImageURL:</Text>
                    <TextInput
                        style={styles.input}
                        value={img}
                        onChangeText={txt => setImg(txt)}
                    />
                </View>
            </View>

            <View style={{ flex: 1, justifyContent: 'flex-end', width: '100%' }}>
                <TouchableOpacity
                    onPress={() => {
                        deleteContact(id);
                    }}
                >
                    <Image
                        source={require('./assets/delete.png')}
                        style={styles.icons}
                    />
                </TouchableOpacity>
                <TouchableHighlight>
                    <View style={styles.button}>
                        <Text style={{ fontSize: 25, color: 'white' }} onPress={updateData}>UPDATE</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:'#fff0f5'
    },
    formArea: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
        marginTop:40
    },
    input: {
        borderLeftColor: 'grey',
        borderTopColor: 'grey',
        borderLeftWidth: 2,
        borderTopWidth: 2,
        width: 280,
        margin: 5,
        padding: 8,
        borderRadius: 5,
        fontSize: 20,
        borderStyle: 'solid',
        backgroundColor: 'white'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#696969',
        padding: 8,
        margin: 2
    },
    imgBorder: {
        borderWidth: 1.5,
        borderColor: 'black',
        width: 100,
        height: 100,
        borderRadius: 100,
        marginTop: 50
    },
    favbutton: {
        justifyContent: 'flex-end',
        padding: 10,
        position: 'absolute',
        left: 150
    },
    icons: {
        width: 40,
        height: 40,
        position: 'relative',
        left: '47%'
    },
    staricons: {
        width: 35,
        height: 35,
    }
});
export default EditContact;