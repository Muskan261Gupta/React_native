import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Alert,
    Image
} from 'react-native';

import { openDatabase } from 'react-native-sqlite-storage';
import { useNavigation } from '@react-navigation/native';

let db = openDatabase({ name: 'ContactList.db' });
const AddContact = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [landline, setLandline] = useState('');
    const [fav, setFav] = useState('0');
    const [img, setImg] = useState('');

    const saveContact = () => {
        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO All_Contacts (name, mobile, landline,fav, img) VALUES (?,?,?,?,?)',
                [name, mobile, landline, fav, img],
                (tx, results) => {
                    // console.log('Results', results);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Success',
                            'Your Contact has been Saved !',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => navigation.navigate('ContactsList'),
                                },
                            ],
                            { cancelable: false },
                        );
                    } else Alert.alert('Registration Failed');
                },
                error => {
                    console.log(error);
                },
            );
        });
    };


    useEffect(() => {
        db.transaction(txn => {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='All_Contacts'",
                [],
                (tx, res) => {
                    // console.log('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS All_Contacts', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS All_Contacts(user_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), mobile VARCHAR(50), landline VARCHAR(100), fav VARCHAR(10), img VARCHAR(250))',
                            [],
                        );
                    } else { console.log("New table created !"); }
                },
                error => {
                    console.log(error);
                },
            );
        });
    }, []);
    
    return (
        <View style={styles.container}>
            {
                fav == '0' ?
                    <View>
                        <TouchableHighlight onPress={addFav}>
                            <View style={styles.favbutton}>
                                <Image
                                    source={require('./assets/star.png')}
                                    style={styles.icons}
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
                                    style={styles.icons}
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
                    <Text style={{ fontSize: 20, color: 'black' }}>ImgURL:  </Text>
                    <TextInput
                        style={styles.input}
                        value={img}
                        onChangeText={txt => setImg(txt)}
                    />
                </View>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end', width: 450 }}>
                <TouchableHighlight>
                    <View style={styles.button}>
                        <Text style={{ fontSize: 25, color: 'white' }} onPress={() => saveContact()}>Save</Text>
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
        marginTop: 150,
        flex: 1,
        justifyContent: 'flex-end',
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
        marginTop: 30
    },
    icons: {
        width: 35,
        height: 35,
    },
    favbutton: {
        justifyContent: 'flex-end',
        padding: 10,
        position: 'absolute',
        left: 150
    }
});
export default AddContact;