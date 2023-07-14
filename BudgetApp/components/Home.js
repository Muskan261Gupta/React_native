import React, { useState } from 'react';
import { addEntry } from './redux/action';
import { useDispatch } from 'react-redux';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
} from 'react-native';


const Home = (props) => {
    const [itemName, setItemName] = useState();
    const [planned, setPlanned] = useState();
    const [actual, setActual] = useState();
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    const handleAddEntry = () => {
        const data = { itemName, planned, actual };
        // console.warn("data : ",data);
        dispatch(addEntry(data));
        setItemName('');
        setPlanned('');
        setActual('');
        setShow(true);
    }

    const close = () => {
        // console.warn("closed");
        setShow(false);
    }

    return (
        <View style={styles.container}>
            {
                show ?
                    <View style={styles.status}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }} >Item Added</Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red', marginRight: 7 }} onPress={close}>X</Text>
                    </View> :
                    null
            }

            <View style={styles.formArea}>
                <TextInput style={styles.input} placeholder="Enter Item Name" value={itemName} onChangeText={(text) => setItemName(text)} />
                <TextInput style={styles.input} keyboardType="numeric" value={planned} onChangeText={(text) => setPlanned(text)} placeholder="Enter Planned Amount" />
                <TextInput style={styles.input} keyboardType="numeric" value={actual} onChangeText={(text) => setActual(text)} placeholder="Enter Actual Amount" />
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <TouchableHighlight>
                    <View style={styles.button}>
                        <Text style={{ fontSize: 20, color: 'white' }} onPress={handleAddEntry}>Save Item</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight>
                    <View style={styles.button}>
                        <Text style={{ fontSize: 20, color: 'white' }} onPress={() => props.navigation.navigate('List')}>Show Items</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#afeeee',
    },
    header: {
        backgroundColor: '#000080',
        padding: 15,
        flex: 0.2,
    },
    formArea: {
        alignItems: 'center',
        marginTop: 30,
    },
    input: {
        borderColor: 'black',
        borderWidth: 2,
        width: 300,
        margin: 5,
        padding: 15,
        borderRadius: 5,
        fontSize: 20,
        borderStyle: 'dotted',
        backgroundColor: 'white'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'black',
        padding: 20,
        margin: 5,
        borderRadius: 30
    },
    status: {
        backgroundColor: 'yellow',
        height: 40,
        marginHorizontal: 40,
        marginTop: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 0.15,
        flexDirection: 'row',
        paddingHorizontal: 10

    }
});

export default Home;