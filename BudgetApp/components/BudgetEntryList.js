import React from 'react';
import { useSelector } from 'react-redux';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
const BudgetEntryList = () => {

    const totalItems = useSelector((state) => state.reducer)
    // console.warn(totalItems);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.listHead}>
                <Text style={styles.textHead}>Item</Text>
                <Text style={styles.textHead}>Planned</Text>
                <Text style={styles.textHead}>Actual</Text>
            </View>

            {
                totalItems.length ?
                    totalItems.map((item, index) =>
                        <View style={styles.list}>
                            <Text style={styles.text}>{item.itemName}</Text>
                            <Text style={styles.text}>{item.planned}</Text>
                            <Text style={styles.text}>{item.actual}</Text>
                        </View>
                    )
                    :
                    <View style={styles.list}>
                        <Text style={styles.text}>No Item Added</Text>
                    </View>
            }
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#afeeee',
    },
    list: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 8,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: '#ffefd5',
        height: 80,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 10

    },
    text: {
        alignItems: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        padding: 10,
        margin: 2,
    },
    textHead: {
        alignItems: 'center',
        fontSize: 25,
        color: 'white',
        padding: 1,
        margin: 1,
    },
    listHead: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 10,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: '#000080',
        height: 50,
        borderRadius: 5,
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 10
    }
});

export default BudgetEntryList;