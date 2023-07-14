import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image,
} from 'react-native';

import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';


const EditContact = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const isFocused = useIsFocused();
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [landline, setLandline] = useState('');
    const [fav, setFav] = useState('0');
    const [img, setImg] = useState('');

    useEffect(() => {
        setName(route.params.data.name);
        setMobile(route.params.data.mobile);
        setLandline(route.params.data.landline);
        setFav(route.params.data.fav);
        setImg(route.params.data.img);
    }, [isFocused]);


    return (
        <View style={styles.container}>

            <View style={{ width: '55%', height: 200, backgroundColor: 'yellow', marginTop: 50 }}>
                <Image source={{ uri: img }}
                    style={{ width: '100%', height: 200 }}
                />
            </View>

            <View style={styles.viewArea}>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{ fontSize: 20, color: 'black' }}>Name   :  </Text>
                    <Text style={styles.input}>{name}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, color: 'black' }}>Mobile  :  </Text>
                    <Text style={styles.input}>{mobile}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, color: 'black' }}>Landline :</Text>
                    <Text style={styles.input}>{landline}</Text>
                </View>

            </View>

            <View style={{ flex: 1, justifyContent: 'flex-end', width: '100%' }}>
                <TouchableHighlight>
                    <View style={styles.button}>
                        <Text style={{ fontSize: 25, color: 'white' }} onPress={() => navigation.navigate('ContactsList')}>BACK</Text>
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
    viewArea: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
        marginLeft:150
        // marginTop: 40
    },
    input: {
        width: 280,
        margin: 5,
        padding: 8,
        fontSize: 25,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#696969',
        padding: 8,
        margin: 2
    },
    favbutton: {
        justifyContent: 'flex-end',
        padding: 10,
        position: 'absolute',
        left: 150
    },
    staricons: {
        width: 35,
        height: 35,
    }
});
export default EditContact;